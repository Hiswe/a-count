'use strict'

const gulp                  = require( `gulp` )
const $                     = require( `gulp-load-plugins` )()
const browserSync           = require( `browser-sync` ).create()
const { reload }            = browserSync
const nodemon               = require( `nodemon` )
const webpack               = require( `webpack` )
const args                  = require( `yargs` ).argv

const isDev       = args.prod !== true
const jsBasedir   = __dirname + '/js'
const bundler     = webpack( require(`./webpack.config.js`) )

const onError = err => {
  $.util.beep()
  if (err.annotated)      { $.util.log(err.annotated) }
  else if (err.message)   { $.util.log(err.message) }
  else                    { $.util.log(err) }
  return this.emit('end')
}

////////
// JS
////////

////////
// CSS
////////

const autoprefixer  = require( 'autoprefixer' )

const css = _ => {
  return gulp
  .src( 'css/index.styl' )
  .pipe( $.plumber(onError) )
  .pipe( $.sourcemaps.init() )
  .pipe($.stylus({
    'include css': true,
    compress: false,
    define: {
      isProd: false,
    }
  }))
  .pipe( $.postcss([
    autoprefixer( {} ),
  ]) )
  .pipe( $.sourcemaps.write() )
  .pipe( $.rename('concompte.css') )
  .pipe( gulp.dest('public') )
  .pipe( reload({stream: true}) )

}

css.description = `Build CSS`

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

const watch = _ => {
  gulp.watch( `views/**/*.jade`, css )
  gulp.watch( `css/**/*.styl`, css)
  // isomorphic app doesn't need module hot reload
  bundler.watch(  {}, (err, stats) => {
    // console.log(stats);
    if (!err) reload()
  })
}

const bs = _ => {
  return browserSync.init(null, {
    proxy:      `http://localhost:3000`,
    open:       false,
    port:       7000,
    ghostMode:  false,
  })
}

const runServer = cb => {
  return nodemon({
    script: `index.js`,
    ext:    `js json jsx`,
    watch: [
      'server.js',
      'index.js',
      'shared/**/*',
      'server/**/*',
      'db/**/*',
      'views/**/*'
    ],
    env: {
      'NODE_ENV': 'development' ,
    }
  }).on('start', _ => {
    // https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#comment-1457582
    if (init) {
      init = false
      cb()
    }
  })
}

const dev = _ => {
  runServer()
  watch()
  bs()
}

gulp.task( 'css', css )
gulp.task( 'dev', dev )
