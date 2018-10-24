'use strict'

const gulp = require( `gulp` )
const $    = require( `gulp-load-plugins` )()

const apiDoc = done => {
  $.apidoc({
    src   : `server/`,
    dest  : `doc/`,
    config: `./`,
  }, done)
}

gulp.task( `api-doc`, apiDoc )

const watch = () => {
  gulp.watch( `server/**/**.js`, apiDoc )
}

gulp.task( `watch`, watch )
