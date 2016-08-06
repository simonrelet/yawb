'use strict';

const pug = require('pug');
const fs = require('fs-promise');

module.exports = function(options) {
  const template = pug.compileFile(options.template, { pretty: '  ' });
  return Promise.resolve(template(options.locals))
    .then(res => fs.writeFile(options.filename, res));
};
