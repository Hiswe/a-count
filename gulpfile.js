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
const bundler     = webpack( require(`./webpack.config.js`) )

function onError(err) {
  beep()
  if (err.annotated)      { log(err.annotated) }
  else if (err.message)   { log(err.message) }
  else                    { log(err) }
  return this.emit('end')
}

////////
// WEBPACK BUILD
////////

const build = done  => {
  bundler.run((err, stats) => {
    if (err) return done( err )
    const info = stats.toJson()
    if ( stats.hasErrors() ) return done( stats.toString({colors: true}) )
    done()
  })
}

build.description = `Bundle front-app (JS & CSS) & app server`

gulp.task( `build`, build )

////////
// DEV
////////

let hash
let watchInit = true
const watch = done => {
  bundler.watch({
    watch: true,
    progress: true,
    ignored: /node_modules/,
  }, (err, stats) => {
    log(`webpack watch bundle…`)
    if (watchInit) {
      watchInit = false
      done()
    }
    if (err) return onError( err )
    const info = stats.toJson()
    if ( stats.hasErrors() ) return log( info.errors )
    if ( stats.hasWarnings() ) log( info.warnings )
    if ( hash !== stats.hash ) {
      hash = stats.hash
      log(`…BUNDLED`)
      setTimeout( reload, 400 )
    }
  })
}

const bs = done => {
  browserSync.init({
    proxy:      `http://localhost:3000`,
    open:       false,
    port:       7000,
    ghostMode:  false,
  })
  done()
}

let apiInit = true
const runApi = done => {
  // https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#comment-1457582
  $.nodemon({
    script: `api/index.js`,
    ext:    `js json`,
    watch: [ `api/**/*.js`],
    env: { 'NODE_ENV': 'development' }
  }).on('start', () => {
    if ( !apiInit ) return
    apiInit = false
    log( `api init done` )
    done()
  })
}

gulp.task( `runApi`, runApi )

let serverInit = true
const runServer = done => {
  $.nodemon({
    script: `dist/server.js`,
    ext:    `js`,
    watch: [ `dist/server.js` ],
    env: { 'NODE_ENV': 'development' }
  }).on('start', () => {
    if ( !serverInit ) return
    serverInit = false
    log( `server init done` )
    done()
  })
}

gulp.task( `runServer`, runServer )

// run two instance of nodemon
// • https://github.com/JacksonGariety/gulp-nodemon/issues/6#issuecomment-330788506
const runApplications = done => {
  $.multiProcess( [`runApi`, `runServer`], done )
}

const dev = gulp.series( build, watch, runApplications, bs )

gulp.task( 'dev', dev )
