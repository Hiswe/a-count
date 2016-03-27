'use strict';

var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var browserSync   = require('browser-sync');
var run           = require('run-sequence');
var args          = require('yargs').argv;
// var isDev         = args.dev != null;
var isDev         = args.prod !== true;
var jsBasedir     = __dirname + '/js';


function onError(err) {
  $.util.beep();
  if (err.annotated) { return $.util.log(err.annotated); }
  if (err.message) {   return $.util.log(err.message); }
  return $.util.log(err);
}

////////
// JS
////////

var browserify    = require('browserify');
var babelify      = require('babelify');
var watchify      = require('watchify');
var envify        = require('envify');
var jadeify       = require('jadeify');
var source        = require('vinyl-source-stream');
var vinylBuffer   = require('vinyl-buffer');

// https://github.com/vigetlabs/gulp-starter/issues/75#issuecomment-70672188

//----- LIBRARIES

var npmLibs       = [
  // 'jquery',
  // 'autosize',
  // 'epiceditor/src/editor',
  // 'marked',
  'react',
  'react-router',
];

gulp.task('js-lib', function () {
  var b = browserify({
    debug: true,
    // need to parse for envify
    // noParse: npmLibs,
  });

  npmLibs.forEach(function(lib) {
      b.require(lib);
  });

  b.transform(envify({
    _: 'purge',
    NODE_ENV: isDev ? 'development' : 'production',
  }))

  return b
    .bundle()
    .pipe(source('concompte-lib.js'))
    .pipe(gulp.dest('public'));
});

//----- FRONT APPLICATION

gulp.task('js-app', function () {

  var b = browserify({
    cache:        {},
    packageCache: {},
    debug:        isDev,
    entries:      ['./js/index.js']
  })
  .external(npmLibs)
  // .transform(envify({
  //   _: 'purge',
  //   NODE_ENV: isDev ? 'development' : 'production',
  //   LOG: isDev,
  // }))
  .transform(babelify, {
    presets: ['es2015', 'react'],
    // plugins: ['transform-object-assign'],
  })

  if (isDev) {
    b = watchify(b);
    b.on('update', function () {
      bundleShare(b);
    });
  }

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
}

gulp.task('js', ['js-lib', 'js-app']);

////////
// CSS
////////

var autoprefixer  = require('autoprefixer');

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

gulp.task('dev', ['js'], function () {
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
    script: 'index.js',
    ext: 'js json jsx',
    watch: ['server.js', 'index.js',  'shared/**/*', 'server/**/*', 'db/**/*', 'views/**/*'],
    env:    { 'NODE_ENV': 'development' }
  }).on('start', function () {
    // https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#comment-1457582
    if (init) {
      init = false;
      cb();
    }
  });
});
