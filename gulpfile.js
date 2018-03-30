const gulp        = require( `gulp` )
const $           = require( `gulp-load-plugins` )()

const ICON_SVG_SRC    = `server/public/icons`
const ICON_SVG_DEST   = `server`
const ICON_CSS_DEST   = `shared/components/ui`
const ICON_DEMO_DEST  = `dist`

const icons = () => {
  return gulp
  .src( `${ ICON_SVG_SRC }/*.svg` )
  .pipe( $.cheerio({
    run: $$ => {
      // remove Google's background path
      $$( `path[fill=none]` ).remove()
    },
    parserOptions: {
      xmlMode: true,
    },
  }) )
  .pipe( $.rename( path => {
    const { basename }    = path
    const materialNameReg = /ic_([^\d]*)_black_24px/
    const isMaterialIcon  = materialNameReg.test( basename )
    if (!isMaterialIcon) return
    path.basename = materialNameReg.exec(basename)[1].replace(/_/g, `-`)
  }) )
  .pipe( $.svgSymbols({
    id:         `icon-%f`,
    class:      `.icon-%f`,
    templates:  [
      `default-svg`,
      `default-css`,
      `default-demo`,
    ],
    svgAttrs:   {
      class: `svg-icon-library`,
    },
  }) )
  .pipe( $.rename({basename: `svg-icons`}) )
  .pipe( $.if( /[.]svg$/, gulp.dest(ICON_SVG_DEST)) )
  .pipe( $.if( /[.]css$/, gulp.dest(ICON_CSS_DEST)) )
  .pipe( $.if( /[.]html$/, gulp.dest(ICON_DEMO_DEST)) )
}
icons.description = `bundle SVG files`

gulp.task( `icons`, icons )
