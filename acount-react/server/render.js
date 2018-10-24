import fs                      from 'fs'
import path                    from 'path'
import serializeJS             from 'serialize-javascript'
import IntlPolyfill            from 'intl'
import areIntlLocalesSupported from 'intl-locales-supported'

import config from './config.js'

// I18N SETUP
// • node only has `en` locales
// • polyfill the other languages
//   https://formatjs.io/guides/runtime-environments/#polyfill-node
// TODO: move it to routing-koa-react
if ( !areIntlLocalesSupported([`en`, `fr`]) ) {
  Intl.NumberFormat   = IntlPolyfill.NumberFormat
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
}

// only pass a subset of the config. enough for the client side
// • Use serialize-javascript over JSON.stringify()
//   https://www.npmjs.com/package/serialize-javascript#overview
const CLIENT_CONFIG  = serializeJS( {
  API_URL:          config.API_URL,
  COOKIE_NAME:      config.COOKIE_NAME,
  HOST_URL:         config.HOST_URL,
  APP_NAME:         config.APP_NAME,
}, { isJSON: true } )
const SVG_ICONS_PATH = path.join(__dirname, './public/svg-icons.svg')
const SVG_ICONS      = fs.readFileSync( SVG_ICONS_PATH, `utf8`)

// TODO: try to put script tags in React-Helmet also
export function reactApp({ store, content, helmet}) {
  const INITIAL_STATE = serializeJS( store.getState(), { isJSON: true } )
  return `<!DOCTYPE html>
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
    <script src="/vendor.application-client.js"></script>
    <script src="/application-client.js"></script>
  </body>
</html>`
}

function renderStackTrace( stacktrace ) {
  if ( !stacktrace )   return ``
  if ( config.isProd ) return ``
  stacktrace = Array.isArray( stacktrace ) ? stacktrace.join(`\n`) : stacktrace
  return `<hr />
  <pre>${stacktrace}</pre>`
}

export function errorPage({reason, stacktrace}) {

return `<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <main role="main">
      <h1>[SERVER] error</h1>
      <h2>${ reason }</h2>
      ${ renderStackTrace(stacktrace) }
    </main>
  </body>
</html>`
}
