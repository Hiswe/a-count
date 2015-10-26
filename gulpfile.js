'use strict';

var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');
var browserSync   = require('browser-sync').create();
var vinylBuffer   = require('vinyl-buffer');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var jadeify       = require('jadeify');

var jsBasedir     = __dirname + '/js';
var npmLibs       = [
  'jquery',
  'autosize',
  'epiceditor/src/editor',
  'marked',
];

function onError(err) {
  $.util.beep();
  if (err.annotated) { return $.util.log(err.annotated); }
  if (err.message) {   return $.util.log(err.message); }
  return $.util.log(err);
}

////////
// JS
////////

// https://github.com/vigetlabs/gulp-starter/issues/75#issuecomment-70672188

//----- LIBRARIES

gulp.task('js-lib', function () {
  var b = browserify({
    debug: true,
    noParse: npmLibs,
  });

  npmLibs.forEach(function(lib) {
      b.require(lib);
  });

  return b
    .bundle()
    .pipe(source('concompte-lib.js'))
    .pipe(gulp.dest('public'));
});

//----- FRONT APPLICATION

gulp.task('js-app', function () {
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: ['.js'],
    paths: ['./node_modules','./js/'],
    debug: true
  });
  b.transform(babelify.configure({optional: ['runtime'] }));
  // can't compile mixins
  // https://github.com/jadejs/jade/issues/1950
  b.transform(jadeify, { compileDebug: true, pretty: true });

  npmLibs.forEach(function(lib) {
    b.external(lib);
  });

  // // TODO use node_env instead of "global.buildNoWatch"
  // if ( !global.buildNoWatch ) {
  //     b = watchify(b);
  //     b.on('update', function() {
  //         gutil.log("Watchify detected change -> Rebuilding bundle");
  //         return bundleShare(b);
  //     });
  // }

  b.require('index.js', {expose: 'concompte'});

  return bundleShare(b);

});

function bundleShare(b) {
  return b
    .bundle()
    .on('error', function (err) {
      console.log(err.message);
      $.util.beep();
      this.emit('end');
    })
    .pipe(source('concompte.js'))
    .pipe(vinylBuffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public'))
    // // TODO use node_env instead of "global.buildNoWatch"
    // .pipe(gulpif(!global.buildNoWatch, livereload()));
}

gulp.task('js', ['js-lib', 'js-app']);

////////
// CSS
////////

gulp.task('css', function () {
  return gulp.src('css/index.styl')
    .pipe($.plumber({errorHandler: onError}))
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

gulp.task('dev', function () {
  gulp.watch([
    'js/**/*.js',
    'shared/*.js',
    'views/**/*.jade',
  ],                                ['js-app', browserSync.reload]);
  gulp.watch('css/**/*.styl',       ['css']);
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy:      'http://localhost:3000',
    open:       false,
    port:       7000,
    ghostMode:  false,
  });
});

var init = true;
gulp.task('nodemon', ['dev'], function (cb) {
  return $.nodemon({
    script: 'server.js',
    nodeArgs: ['--harmony'],
    ext: 'js json',
    watch: ['server.js', 'shared/**/*', 'server/**/*', 'db/**/*'],
    env:    { 'NODE_ENV': 'development' }
  }).on('start', function () {
    // https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#comment-1457582
    if (init) {
      init = false;
      cb();
    }
  });
});
