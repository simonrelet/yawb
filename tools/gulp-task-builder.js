'use strict';

const utils = require('gulp-util');
const colors = require('colors/safe');

function getLogger(task) {
  return msg => utils.log(colors.blue(`[${task}]`), msg);
}

module.exports = function(gulp) {
  return (task, deps, cb) => {
    if (typeof deps === 'function') {
      gulp.task(task, done => deps(done, getLogger(task)));
    } else {
      gulp.task(task, deps, done => cb(done, getLogger(task)));
    }
  };
};
