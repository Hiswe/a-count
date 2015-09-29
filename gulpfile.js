'use strict';

var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');

////////
// CSS
////////

gulp.task('css', function () {
  return gulp.src('css/index.styl')
    .pipe($.sourcemaps.init())
      .pipe($.stylus({
        'include css': true,
        compress: false,
        define: {
          isProd: false,
        }
      }))
      .pipe($.postcss([
        autoprefixer({
          browsers: ['> 1%', 'IE 9'],
        }),
      ]))
      .pipe($.rename('concompte.css'))
      .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('public'));
});

////////
// DEV
////////

// gulp.task('dev', ['browser-sync'], function () {
gulp.task('dev', function () {
  // gulp.watch('js/**/*.js',              ['js', browserSync.reload]);
  gulp.watch('css/**/*.styl',           ['css']);
});

var init = true;
gulp.task('nodemon', ['dev'], function (cb) {
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
