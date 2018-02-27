'use strict'

const gulp        = require( `gulp` )
const $           = require( `gulp-load-plugins` )()
const browserSync = require( `browser-sync` ).create()
const { reload }  = browserSync
const nodemon     = require( `nodemon` )
const webpack     = require( `webpack` )
const args        = require( `yargs` ).argv
const beep        = require( `beeper` )
const log         = require( `fancy-log` )

const isDev       = args.prod !== true
const jsBasedir   = __dirname + '/js'
const bundler     = webpack( require(`./webpack.config.js`) )

function onError(err) {
  beep()
  if (err.annotated)      { log(err.annotated) }
  else if (err.message)   { log(err.message) }
  else                    { log(err) }
  return this.emit('end')
}

////////
// CSS
////////

const autoprefixer  = require( 'autoprefixer' )

function css() {
  return gulp
  .src( 'css/index.scss' )
  .pipe( $.plumber(onError) )
  .pipe( $.sourcemaps.init() )
  .pipe( $.sass() )
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

let hash
const watch = () => {
  gulp.watch( `css/**/*.{scss,css}`, css)
  // isomorphic app doesn't need module hot reload
  bundler.watch({
    watch: true,
    progress: true,
    ignored: /node_modules/,
  }, (err, stats) => {
    log(`webpack watch bundle…`)
    if (err) return onError( err )
    const info = stats.toJson()
    if ( stats.hasErrors() ) return log( info.errors )
    if ( stats.hasWarnings() ) log( info.warnings )
    if ( hash !== stats.hash ) {
      hash = stats.hash
      log(`…BUNDLED`)
    }
  })
}

const bs = _ => {
  return browserSync.init({
    proxy:      `http://localhost:3000`,
    open:       false,
    port:       7000,
    ghostMode:  false,
  })
}

let init = true
const runServer = done => {
  bundler.run((err, stats) => {
    if (err) return onError( err )
    const info = stats.toJson()
    if ( stats.hasErrors() ) return log( info.errors )
    log( `webpack initial bundle` )

    $.nodemon({
      script: `index.js`,
      ext:    `js json jsx`,
      watch: [
        `index.js`,
        `dist/*`,
        // 'shared/**/*',
        // 'server/**/*',
        // 'api/**/*',
      ],
      env: {
        'NODE_ENV': 'development' ,
      }
    }).on('start', _ => {
      // https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#comment-1457582
      if (init) {
        init = false
        log( `server init done` )
        done()
      }
    })
  })


}

const dev = gulp.series(runServer, watch, bs )

gulp.task( 'build', gulp.parallel(css) )
gulp.task( 'css', css )
gulp.task( 'dev', dev )
