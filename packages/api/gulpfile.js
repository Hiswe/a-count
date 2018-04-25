'use strict'

const path = require('path')
const gulp = require( `gulp` )
const $    = require( `gulp-load-plugins` )()

const apiDoc = done => {
  $.apidoc({
    src   : `server/`,
    dest  : `doc/`,
    config: path.join( __dirname, `/apidoc.json`),
  }, done)
}

gulp.task( `api-doc`, apiDoc )

const watch = () => {
  gulp.watch( `server/**/**.js`, apiDoc )
}

gulp.task( `watch`, watch )
