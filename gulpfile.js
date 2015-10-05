'use strict';

var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');
var browserSync   = require('browser-sync').create();
var browserify    = require('browserify');
var vinylBuffer   = require('vinyl-buffer');
var source        = require('vinyl-source-stream');
var babelify      = require('babelify');

var jsBasedir     = __dirname + '/js';
var npmLibs       = [
  'jquery',
];


////////
// JS
////////

//----- LIBRARIES

// gulp.task('js-lib', function () {
//   return browserify({
//     basedir: jsBasedir,
//     noParse: npmLibs,
//   })
//   .require(npmLibs)
//   .bundle()
//   .pipe(source('conconpte-lib.js'))
//   .pipe(gulp.dest('public'));
// });

//----- FRONT APPLICATION

gulp.task('js', function () {
  return browserify({
    entries: jsBasedir + '/index.js',
    basedir: jsBasedir,
    debug: true,
    noParse: npmLibs,
  })
  // .external(npmLibs)
  // load the runtime to be able to use Object.assign
  // http://stackoverflow.com/questions/28400253/how-can-i-get-object-assign-to-work-in-the-browser-when-using-6to5
  .transform(babelify.configure({optional: ['runtime'] }))
  // .transform(envify({
  //   _: 'purge',
  //   NODE_ENV: isProd ? 'production' : isDev ? 'development' : void(0),
  //   LOG: hasLog || isDev ? true : false,
  // }))
  .bundle()
  .on('error', function (err) {
    console.log(err.message);
    $.util.beep();
    this.emit('end');
  })
  .pipe(source('concompte.js'))
  .pipe(vinylBuffer())
  // should convert streams to buffer…
  // https://www.npmjs.com/package/vinyl-buffer
  .pipe($.sourcemaps.init({loadMaps: true}))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('public'));
});



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
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

////////
// ASSETS
////////

//----- FONTS

// gulp.task('fonts', function () {
//   return gulp
//     .src('theme-dev/fonts.list')
//     .pipe($.googleWebfonts())
//     .pipe($.if(/[.]woff$/, gulp.dest('theme/assets')))
// });

// gulp.task('assets', ['fonts']);

////////
// DEV
////////

// gulp.task('dev', ['browser-sync'], function () {
gulp.task('dev', function () {
  // gulp.watch('js/**/*.js',              ['js', browserSync.reload]);
  gulp.watch('css/**/*.styl',           ['css']);
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    open: false,
    port: 7000,
  });
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
