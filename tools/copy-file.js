'use strict';

const path = require('path');
const fs = require('fs-promise');

module.exports = function(options) {
  const basename = path.basename(options.src);
  return fs.readFile(options.src, 'utf8')
    .then(content => fs.writeFile(path.resolve(options.dst, basename), content));
};
