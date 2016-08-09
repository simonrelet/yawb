'use strict';

const config = require('./config');
const argv = require('minimist')(process.argv.slice(2), {
  alias: { port: 'p' },
  default: { port: config.dev.port }
});

const del = require('del');
const copyFile = require('./tools/copy-file');
const genHtml = require('./tools/generate-html');
const path = require('path');
const resolve = require('./tools/path-resolve')([ __dirname ]);
const task = require('./tools/gulp-task-builder.js')(require('gulp'));
const webpack = require('./tools/webpack-promise');
const webpackDevServer = require('./tools/webpack-dev-server-promise');
const webpackDevConfig = require('./configs/webpack-dev.config.js');
const webpackProdConfig = require('./configs/webpack-prod.config.js');

const paths = {
  outputDir: resolve([ 'dist' ]),
  devEntry: resolve([ 'dev-helper', 'index.jsx' ]),
  devHtml: resolve([ 'dev-helper', 'index.html' ]),
  entry: resolve([ 'app', 'index.jsx' ]),
  templateHtml: resolve([ 'tools', 'html.pug' ]),
  outputHtml: resolve([ 'dist', 'index.html' ]),
  react: resolve([ 'node_modules', 'react', 'dist', 'react.min.js' ]),
  reactDOM: resolve([ 'node_modules', 'react-dom', 'dist', 'react-dom.min.js' ])
};

task('start', (done, logger) => {
  const options = {
    config: webpackDevConfig({
      port: argv.port,
      outputDir: paths.outputDir,
      entry: paths.devEntry,
      html: paths.devHtml
    }),
    port: argv.port,
    devServerOptions: {
      stats: { colors: true }
    }
  };

  webpackDevServer(options)
    .then(() => {
      logger(`Open a browser on http://localhost:${argv.p}`);
      done();
    })
    .catch(err => {
      logger(err);
      done(err);
    });
});

task('build', (done, logger) => {
  const options = {
    config: webpackProdConfig({
      varName: config.build.var,
      filename: config.build.filename,
      outputDir: paths.outputDir,
      entry: paths.entry
    }),
    statsOptions: {
      colors: true
    }
  };

  webpack(options)
    .then(logger)
    .then(() => genHtml({
      template: paths.templateHtml,
      filename: paths.outputHtml,
      locals: {
        appName: config.appName,
        style: `${config.build.filename}.css`,
        app: `${config.build.filename}.js`,
        varName: config.build.var
      }
    }))
    .then(() => copyFile({ src: paths.react, dst: paths.outputDir }))
    .then(() => copyFile({ src: paths.reactDOM, dst: paths.outputDir }))
    .then(() => done())
    .catch(err => {
      logger(err);
      done(err);
    });
});

task('clean', (done, logger) => {
  const filesToDelete = [ paths.outputDir ];

  del(filesToDelete).then(files => {
    if (files.length > 0) {
      files = files.map(file => path.relative(__dirname, file));
      logger(`Deleted file(s):\n\n  ${files.join('\n  ')}\n`);
    }
    done();
  });
});
