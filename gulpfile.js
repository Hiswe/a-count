'use strict'

const gulp        = require( `gulp` )
const $           = require( `gulp-load-plugins` )()

const ICON_SVG_SRC   = `server/public/icons`
const ICON_SVG_DEST  = `server/public`
const ICON_CSS_DEST  = `shared/components/ui`
const PAPER_SVG_SRC  = `server/public/paper-part`
const PAPER_SVG_DEST = `server/public`
const ICON_DEMO_DEST = `.tmp`

const icons = () => {
  return gulp
  .src( `${ ICON_SVG_SRC }/*.svg` )
  .pipe( $.cheerio({
    run: $$ => {
      // remove Google's background path
      $$( `path[fill=none]` ).remove()
      // icon-arrow-downward was having a fill of #010101…
      $$( `path[fill=#010101]`).removeAttr( `fill` )
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
    fontSize:   16,
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
icons.description = `bundle SVG icons`

const paperParts = () => {
  return gulp
  .src( `${  PAPER_SVG_SRC }/*.svg` )
  .pipe( $.cheerio({
    run: $$ => {
      const $root           = $$(`svg`)
      // set the right width & height
      const [height, width] = $root.attr( `viewBox` ).split(` `).reverse()
      $root.attr(`height`, `${height}px`)
      $root.attr(`width`, `${width}px`)
      $root.attr(`xmlns:xlink`, null)
      $root.attr(`xml:space`, null)
      $root.attr(`xmlns:serif`, null)
      $root.attr(`version`, null)

      // remove background path
      $$( `rect[style="fill:none;"]` ).remove()
      // remove unnecessary clipPath
      $$( `clipPath` ).remove()
      const $clipPathGroup = $$( `g[clip-path]` )
      $clipPathGroup.replaceWith( $clipPathGroup.children() )
    },
    parserOptions: {
      xmlMode: true,
    },
  }) )
  .pipe( $.rename({ prefix: `paper-part-` }))
  .pipe( gulp.dest(PAPER_SVG_DEST) )
  .pipe( $.rename( path => {
    return path.basename = path.basename.replace(`paper-part-`, '')
  }) )
  .pipe( $.svgSymbols({
    id:         `paper-part-%f`,
    class:      `.paper-part-%f`,
    templates:  [
      `default-demo`,
    ],
  }) )
  .pipe( $.rename({basename: `paper-part`}) )
  .pipe( $.if( /[.]html$/, gulp.dest(ICON_DEMO_DEST)) )
}
icons.description = `bundle SVG shred paper backgrounds`

gulp.task( `paper-parts`, paperParts )
gulp.task( `icons`, icons )

gulp.task( `svg`, gulp.parallel(icons, paperParts) )
