'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var init = true;
gulp.task('nodemon', function (cb) {
  return $.nodemon({
    script: 'server.js',
    nodeArgs: ['--harmony'],
    ext: 'js json',
    watch: ['server.js', 'server/**/*', 'db/**/*'],
    env:    { 'NODE_ENV': 'development' }
  }).on('start', function () {
    // https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#comment-1457582
    if (init) {
      init = false;
      cb();
    }
  });
});
