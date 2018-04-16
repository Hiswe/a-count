import fs from 'fs'
import path from 'path'
import serializeJS from 'serialize-javascript'

import config from './config.js'

// only pass a subset of the config. enough for the client side
// • Use serialize-javascript over JSON.stringify()
//   https://www.npmjs.com/package/serialize-javascript#overview
const CLIENT_CONFIG  = serializeJS( {
  API_URL:          config.API_URL,
  API_COOKIE_NAME:  config.API_COOKIE_NAME,
  HOST_URL:         config.HOST_URL,
  APP_NAME:         config.APP_NAME,
}, { isJSON: true } )
const SVG_ICONS_PATH = path.join(__dirname, './svg-icons.svg')
const SVG_ICONS      = fs.readFileSync( SVG_ICONS_PATH, `utf8`)

export function reactApp( { store, content, helmet} ) {
  const INITIAL_STATE = serializeJS( store.getState(), { isJSON: true } )
  return `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${ helmet.title.toString() }
    ${ helmet.meta.toString() }
    ${ helmet.link.toString() }
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    ${ SVG_ICONS }
    <div id="react-main-mount">${ content }</div>
    <script>
      window.__CONFIG__ = ${ CLIENT_CONFIG }
      window.__INITIAL_STATE__ = ${ INITIAL_STATE }
    </script>
    <script src="/vendor.concompte.js"></script>
    <script src="/concompte.js"></script>
  </body>
</html>`
}
