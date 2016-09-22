'use strict';

const resolve = require('../tools/path-resolve')([ __dirname, '..' ]);

module.exports = function() {
  return {
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.jsx\.html$/,
          exclude: /node_modules/,
          loader: 'babel-loader!html-to-react'
        },
        {
          test: /\.svg$/,
          loader: 'file-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },

    resolve: {
      root: resolve([ 'app' ]),
      extensions: [ '', '.js', '.jsx', '.jsx.html', '.scss', '.json' ]
    }
  };
};
