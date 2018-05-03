require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(__webpack_require__(1));

var _util = __webpack_require__(2);

var _chalk = _interopRequireDefault(__webpack_require__(3));

var _moment = _interopRequireDefault(__webpack_require__(4));

var _koa = _interopRequireDefault(__webpack_require__(5));

var _koaBody = _interopRequireDefault(__webpack_require__(6));

var _koaStatic = _interopRequireDefault(__webpack_require__(7));

var _koaCompress = _interopRequireDefault(__webpack_require__(8));

var _koaLogger = _interopRequireDefault(__webpack_require__(9));

var _koaJson = _interopRequireDefault(__webpack_require__(10));

var _koaRouter = _interopRequireDefault(__webpack_require__(11));

var _koaSslify = _interopRequireDefault(__webpack_require__(12));

var _koaHelmet = _interopRequireDefault(__webpack_require__(13));

var _config = _interopRequireDefault(__webpack_require__(14));

var _log = _interopRequireDefault(__webpack_require__(16));

var _routingApiBackup = _interopRequireDefault(__webpack_require__(17));

var _routingKoaReact = _interopRequireDefault(__webpack_require__(26));

var render = _interopRequireWildcard(__webpack_require__(35));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//////
// SERVER CONFIG
//////
const app = new _koa.default();
exports.default = app;
app.use((0, _koaHelmet.default)());
app.use((0, _koaBody.default)());
app.use((0, _koaCompress.default)());
app.use((0, _koaStatic.default)(_path.default.join(__dirname, `./public`)));
app.use((0, _koaJson.default)());
app.use((0, _koaLogger.default)()); //////
// ROUTING
//////
//----- HTTPS REDIRECT

if (_config.default.enforceHttps) app.use((0, _koaSslify.default)(_config.default.enforceHttps)); //----- ERROR HANDLING

app.use(async (ctx, next) => {
  try {
    await next(); // 404 are already handled by REACT
    // no need to render the 404 here ^^
  } catch (err) {
    console.log((0, _util.inspect)(err, {
      colors: true
    }));
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = render.errorPage({
      reason: err.message,
      stacktrace: err.stacktrace || err.stack || false
    });
  }
});
const router = new _koaRouter.default(); //-----  MOUNT NO-FETCH BACKUP

router.use(_routingApiBackup.default.routes()); //----- MOUNT REACT ROUTER

router.use(_routingKoaReact.default.routes()); //----- MOUNT ROUTER TO APPLICATION

app.use(router.routes()); // app.use( router.allowedMethods() )
//----- LAUNCH THE MAGIC

const server = app.listen(_config.default.PORT, function endInit() {
  console.log(`APP Server is listening on port`, _chalk.default.cyan(server.address().port), `on mode`, _chalk.default.cyan(_config.default.NODE_ENV));
}); //////
// EXPORTS
//////
/* WEBPACK VAR INJECTION */}.call(this, "server"))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-compress");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-logger");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("koa-json");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("koa-sslify");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("koa-helmet");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rc = _interopRequireDefault(__webpack_require__(15));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = (0, _rc.default)(`acountApp`, {
  API_URL: `http://127.0.0.1:4040/v1`,
  COOKIE_NAME: `a-count_webapp`,
  HOST_URL: `http://localhost:3000`,
  APP_NAME: `a-count`,
  // enforceHttps will be passed to
  // • https://www.npmjs.com/package/koa-sslify
  enforceHttps: false
});
exports.default = config;
config.PORT = config.PORT || process.env.PORT || 3000;
config.NODE_ENV = config.NODE_ENV || "production" || `development`;
config.isDev = config.NODE_ENV === `development`;
config.isProd = config.NODE_ENV === `production`;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("rc");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = __webpack_require__(2);

var _chalk = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _util.debuglog)(`server`);
log(_chalk.default.green(`init logging`));
var _default = log;
exports.default = _default;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(__webpack_require__(11));

var _lodash = _interopRequireDefault(__webpack_require__(18));

var _config = _interopRequireDefault(__webpack_require__(14));

var isoFetch = _interopRequireWildcard(__webpack_require__(19));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default(); //////
// NO FETCH BACKUP
//////
// • in case of direct get/post without react handling
// • or JS isn't activated on the client side
// • in any case this is OPTIONAL IF WE want to DEFER everything to the FRONT REACT APP

exports.default = router;

const proxyRequest = async (ctx, next) => {
  const {
    url,
    body,
    header
  } = ctx.request;
  const fetchOptions = {
    url,
    body
  };
  const method = ctx.request.method.toLowerCase();
  const {
    response,
    payload
  } = await isoFetch[method](fetchOptions, header.cookie);

  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      message: `[FROM API] ${payload.message}`,
      stacktrace: response.stacktrace
    };
  } // If the API send an access token, copy it to a cookie
  // • needed to maintain authentication without JS activated


  const accessToken = payload.access_token; // copy authorization header even if it's an empty string

  if (!(0, _lodash.default)(accessToken)) {
    ctx.cookies.set(_config.default.COOKIE_NAME, accessToken);
    delete payload.access_token;
  } // Save payload to state for further reuse


  ctx.state.payload = payload;
  next();
}; //----- USER


router.get(`/account/logout`, proxyRequest, async (ctx, next) => {
  const {
    payload
  } = ctx.state;
  ctx.redirect(`/account/login`);
}).post(`/account/register`, proxyRequest, async (ctx, next) => {
  const {
    payload
  } = ctx.state;
  ctx.redirect(`/`);
}).post(`/account/forgot`, proxyRequest, async (ctx, next) => {
  const {
    payload
  } = ctx.state;
  ctx.redirect(`/account/forgot`);
}).post(`/account/reset`, proxyRequest, async (ctx, next) => {
  const {
    payload
  } = ctx.state;
  ctx.redirect(`/`);
}).post(`/account/login`, proxyRequest, async (ctx, next) => {
  const {
    payload
  } = ctx.state;
  ctx.redirect(`/`);
}).post(`/account/settings`, proxyRequest, async (ctx, next) => {
  const {
    payload
  } = ctx.state;
  ctx.redirect(ctx.request.url);
}); //----- CUSTOMERS

router.post(`/customers/new`, proxyRequest, async (ctx, next) => {
  const {
    payload
  } = ctx.state;
  ctx.redirect(`/customers/${payload.id}`);
}).post(`/customers/:id`, proxyRequest, async (ctx, next) => {
  const {
    url
  } = ctx.request;
  ctx.redirect(ctx.request.url);
}); //----- QUOTATIONS

router.post(`/quotations/new`, proxyRequest, async (ctx, next) => {
  const {
    payload
  } = ctx.state;
  ctx.redirect(`/quotations/${payload.id}`);
}).post(`/quotations/:id`, proxyRequest, async (ctx, next) => {
  const {
    url
  } = ctx.request;
  ctx.redirect(ctx.request.url);
}).post(`/quotations/:id/create-invoice`, proxyRequest, async (ctx, next) => {
  const {
    id
  } = ctx.params;
  ctx.redirect(`/quotations/${id}`);
}); //----- INVOICES

router.post(`/invoices/:id`, proxyRequest, async (ctx, next) => {
  const {
    url
  } = ctx.request;
  ctx.redirect(ctx.request.url);
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("lodash.isnil");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.get = void 0;

__webpack_require__(20);

var _lodash = _interopRequireDefault(__webpack_require__(21));

var _lodash2 = _interopRequireDefault(__webpack_require__(18));

var _urlJoin = _interopRequireDefault(__webpack_require__(22));

var _jsCookie = _interopRequireDefault(__webpack_require__(23));

var _queryString = _interopRequireDefault(__webpack_require__(24));

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Thin wrapper around the fetch API
// • We return both the response & the JSON
//   The response can be used server-side for accessing the Header (for example)
//   Useful if we need to access the cookies
// • Cookie param is used server side:
//   We dont' have access to them there ^^
//   https://github.com/matthew-andrews/isomorphic-fetch/issues/83
const defaultOptions = {
  credentials: `include`,
  headers: {}
};

function create(method) {
  const fetchOptions = (0, _lodash.default)({}, defaultOptions, {
    method: method.toUpperCase()
  }); // we communicate to the API only in json

  if (method === `post`) {
    fetchOptions.headers[`Content-Type`] = `application/json`;
  }

  return async function (options, jwt = false) {
    const {
      url,
      body,
      query
    } = options; // set body on post

    if (method === `post`) fetchOptions.body = JSON.stringify(body); // set the right authorization header
    // • if jwt is present it will because the server read from the cookie
    //   and passed it here

    if (!jwt && process.env.BROWSER) {
      jwt = _jsCookie.default.get(_isomorphicConfig.default.COOKIE_NAME);
    }

    fetchOptions.headers.Authorization = `Bearer ${jwt}`; // Build fetch url
    // • we need to append the query string as the fetch API doesn't handle other ways

    let fetchUrl = (0, _urlJoin.default)(_isomorphicConfig.default.API_URL, url);
    if (query) fetchUrl = (0, _urlJoin.default)(fetchUrl, `?${_queryString.default.stringify(query)}`);

    try {
      const response = await fetch(fetchUrl, fetchOptions);
      const payload = await response.json();

      if (!response.ok) {
        (0, _lodash.default)(payload, {
          error: true,
          status: response.status,
          statusText: response.statusText
        });
      } // copy access token to a cookie
      // • we will need this cookie for universal render


      if (process.env.BROWSER) {
        const accessToken = payload.access_token;

        if (!(0, _lodash2.default)(accessToken)) {
          _jsCookie.default.set(_isomorphicConfig.default.COOKIE_NAME, accessToken);

          delete payload.access_token;
        }
      }

      return {
        response,
        payload
      };
    } catch (err) {
      const error = (0, _lodash.default)({
        error: true,
        status: 500,
        statusText: err.message
      }, err);
      return {
        payload: error
      };
    }
  };
} //----- EXPORTS


const get = create(`get`);
exports.get = get;
const post = create(`post`);
exports.post = post;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("url-join");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _config.default;
  }
});

var _config = _interopRequireDefault(__webpack_require__(14));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(__webpack_require__(3));

var _koaRouter = _interopRequireDefault(__webpack_require__(11));

var _react = _interopRequireDefault(__webpack_require__(27));

var _server = __webpack_require__(28);

var _reactRouterDom = __webpack_require__(29);

var _reactRouterConfig = __webpack_require__(30);

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reduxThunk = _interopRequireDefault(__webpack_require__(33));

var _reactHelmet = __webpack_require__(34);

var _config = _interopRequireDefault(__webpack_require__(14));

var _log = _interopRequireDefault(__webpack_require__(16));

var render = _interopRequireWildcard(__webpack_require__(35));

var _routes = _interopRequireDefault(__webpack_require__(40));

var _combinedReducers = _interopRequireDefault(__webpack_require__(140));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default(); // simple server side action logger
// • for the creation of a custom middleware see:
//   https://redux.js.org/api-reference/applymiddleware#example:-custom-logger-middleware

exports.default = router;

const reduxActionLogger = ({
  getState
}) => {
  return next => action => {
    (0, _log.default)(`dispatch →`, action.type);
    const returnValue = next(action);
    const hasError = returnValue.payload.error;
    const color = hasError ? _chalk.default.red : _chalk.default.green;
    (0, _log.default)(`dispatch ←`, color(action.type));
    return returnValue;
  };
};

router.get('*', async (ctx, next) => {
  const {
    url
  } = ctx;
  const jwt = ctx.cookies.get(_config.default.COOKIE_NAME); // wait for every component to fetch his data

  const store = (0, _redux.createStore)(_combinedReducers.default, {}, (0, _redux.applyMiddleware)(_reduxThunk.default, reduxActionLogger));
  const branch = (0, _reactRouterConfig.matchRoutes)(_routes.default, url);
  const initFetches = branch.filter(({
    route
  }) => route.component.fetchData instanceof Function).map(({
    route,
    match
  }) => {
    // Pass here the JWT
    // fetch will need it to maintain authentication
    return route.component.fetchData({
      jwt,
      dispatch: store.dispatch,
      params: match.params // TODO: should pass the query string also
      // query:

    });
  });
  await Promise.all(initFetches); // staticContext is mutable & provided only on server-side rendering
  // • Because it's mutable, it will change during the React's server rendering process
  // • So that's a good way to pass data from react-router-config to the server

  const staticContext = {}; // Finally render!

  const content = (0, _server.renderToString)(_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_reactRouterDom.StaticRouter, {
    location: url,
    context: staticContext
  }, (0, _reactRouterConfig.renderRoutes)(_routes.default)))); // render tags outside the app (meta, links…)
  // • https://www.npmjs.com/package/react-helmet#server-usage

  const helmet = _reactHelmet.Helmet.renderStatic(); // reflect status from react-router to koa


  if (staticContext.status === 302) {
    ctx.status = 302;
    (0, _log.default)(`redirect`);
    return ctx.redirect(staticContext.url);
  }

  if (staticContext.status === 404) {
    ctx.status = 404;
  }

  ctx.body = render.reactApp({
    store,
    // those will be used to initialize the store client side
    content,
    // the right HTML produced by react ^^
    helmet // for HEAD tags

  });
});

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactApp = reactApp;
exports.errorPage = errorPage;

var _fs = _interopRequireDefault(__webpack_require__(36));

var _path = _interopRequireDefault(__webpack_require__(1));

var _serializeJavascript = _interopRequireDefault(__webpack_require__(37));

var _intl = _interopRequireDefault(__webpack_require__(38));

var _intlLocalesSupported = _interopRequireDefault(__webpack_require__(39));

var _config = _interopRequireDefault(__webpack_require__(14));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// I18N SETUP
// • node only has `en` locales
// • polyfill the other languages
//   https://formatjs.io/guides/runtime-environments/#polyfill-node
if (!(0, _intlLocalesSupported.default)([`en`, `fr`])) {
  Intl.NumberFormat = _intl.default.NumberFormat;
  Intl.DateTimeFormat = _intl.default.DateTimeFormat;
} // only pass a subset of the config. enough for the client side
// • Use serialize-javascript over JSON.stringify()
//   https://www.npmjs.com/package/serialize-javascript#overview


const CLIENT_CONFIG = (0, _serializeJavascript.default)({
  API_URL: _config.default.API_URL,
  COOKIE_NAME: _config.default.COOKIE_NAME,
  HOST_URL: _config.default.HOST_URL,
  APP_NAME: _config.default.APP_NAME
}, {
  isJSON: true
});

const SVG_ICONS_PATH = _path.default.join(__dirname, './public/svg-icons.svg');

const SVG_ICONS = _fs.default.readFileSync(SVG_ICONS_PATH, `utf8`);

function reactApp({
  store,
  content,
  helmet
}) {
  const INITIAL_STATE = (0, _serializeJavascript.default)(store.getState(), {
    isJSON: true
  });
  return `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    ${SVG_ICONS}
    <div id="react-main-mount">${content}</div>
    <script>
      window.__CONFIG__ = ${CLIENT_CONFIG}
      window.__INITIAL_STATE__ = ${INITIAL_STATE}
    </script>
    <script src="/vendor.application-client.js"></script>
    <script src="/application-client.js"></script>
  </body>
</html>`;
}

function renderStackTrace(stacktrace) {
  if (!stacktrace) return ``;
  if (_config.default.isProd) return ``;
  stacktrace = Array.isArray(stacktrace) ? stacktrace.join(`\n`) : stacktrace;
  return `<hr />
  <pre>${stacktrace}</pre>`;
}

function errorPage({
  reason,
  stacktrace
}) {
  return `<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <main role="main">
      <h1>[SERVER] error</h1>
      <h2>${reason}</h2>
      ${renderStackTrace(stacktrace)}
    </main>
  </body>
</html>`;
}
/* WEBPACK VAR INJECTION */}.call(this, "server"))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("intl");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("intl-locales-supported");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticationRequired = _interopRequireDefault(__webpack_require__(41));

var _authenticationForbidden = _interopRequireDefault(__webpack_require__(42));

var _root = _interopRequireDefault(__webpack_require__(43));

var _pageLogin = _interopRequireDefault(__webpack_require__(62));

var _pageRegister = _interopRequireDefault(__webpack_require__(72));

var _pageSetPassword = _interopRequireDefault(__webpack_require__(73));

var _pageForgot = _interopRequireDefault(__webpack_require__(74));

var _pageReset = _interopRequireDefault(__webpack_require__(75));

var _pageSettings = _interopRequireDefault(__webpack_require__(76));

var _pageHome = _interopRequireDefault(__webpack_require__(92));

var _pageList = _interopRequireDefault(__webpack_require__(102));

var _pageQuotation = _interopRequireDefault(__webpack_require__(103));

var _pageInvoice = _interopRequireDefault(__webpack_require__(106));

var _pageList2 = _interopRequireDefault(__webpack_require__(115));

var _pageNew = _interopRequireDefault(__webpack_require__(116));

var _pageEdit = _interopRequireDefault(__webpack_require__(124));

var _pagePreview = _interopRequireDefault(__webpack_require__(125));

var _pageList3 = _interopRequireDefault(__webpack_require__(126));

var _pageEdit2 = _interopRequireDefault(__webpack_require__(127));

var _pagePreview2 = _interopRequireDefault(__webpack_require__(131));

var _pageList4 = _interopRequireDefault(__webpack_require__(132));

var _pageNew2 = _interopRequireDefault(__webpack_require__(134));

var _pageEdit3 = _interopRequireDefault(__webpack_require__(137));

var _pageNotFound = _interopRequireDefault(__webpack_require__(139));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = [{
  component: _root.default,
  routes: [{
    path: `/account/login`,
    exact: true,
    component: (0, _authenticationForbidden.default)(_pageLogin.default)
  }, {
    path: `/account/register`,
    exact: true,
    component: (0, _authenticationForbidden.default)(_pageRegister.default)
  }, {
    path: `/account/set-password`,
    exact: true,
    component: (0, _authenticationForbidden.default)(_pageSetPassword.default)
  }, {
    path: `/account/forgot`,
    exact: true,
    component: (0, _authenticationForbidden.default)(_pageForgot.default)
  }, {
    path: `/account/reset`,
    exact: true,
    component: (0, _authenticationForbidden.default)(_pageReset.default)
  }, {
    path: `/`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageHome.default)
  }, {
    path: `/archives`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageList.default)
  }, {
    path: `/archives/quotations/:id`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageQuotation.default)
  }, {
    path: `/archives/invoices/:id`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageInvoice.default)
  }, {
    path: `/account/settings`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageSettings.default)
  }, {
    path: `/quotations`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageList2.default)
  }, {
    path: `/quotations/new`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageNew.default)
  }, {
    path: `/quotations/:id`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageEdit.default)
  }, {
    path: `/quotations/:id/preview`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pagePreview.default)
  }, {
    path: `/invoices`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageList3.default)
  }, {
    path: `/invoices/:id`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageEdit2.default)
  }, {
    path: `/invoices/:id/preview`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pagePreview2.default)
  }, {
    path: `/customers`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageList4.default)
  }, {
    path: `/customers/new`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageNew2.default)
  }, {
    path: `/customers/:id`,
    exact: true,
    component: (0, _authenticationRequired.default)(_pageEdit3.default)
  }, {
    path: `*`,
    component: _pageNotFound.default
  }]
}];
var _default = routes;
exports.default = _default;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationRequired = authenticationRequired;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Protect the route if NOT authenticate
// • based on https://crysislinux.com/limit-access-to-redux-apps-with-higher-order-components/
const PUBLIC_ROOT = `/account/login`;

function authenticationRequired(Component) {
  // TODO: shouldn't redirect if already on login page…
  function AuthRequired(props) {
    const {
      staticContext
    } = props;
    if (props.isAuthenticated) return _react.default.createElement(Component, props);

    if (staticContext) {
      staticContext.status = 302;
      staticContext.url = PUBLIC_ROOT;
    }

    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: PUBLIC_ROOT
    });
  } // Hoist “Component.fetchData”
  // • needed by the the server to fetch the right data


  if (Component.fetchData) {
    AuthRequired.fetchData = Component.fetchData;
  }

  function state2prop(state) {
    return {
      isAuthenticated: state.account.get(`isAuthenticated`)
    };
  }

  return (0, _reactRedux.connect)(state2prop)(AuthRequired);
}

var _default = authenticationRequired;
exports.default = _default;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationForbidden = authenticationForbidden;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Protect the route if AUTHENTICATE
// • the opposite of authentication-required ;)
// • based on https://crysislinux.com/limit-access-to-redux-apps-with-higher-order-components/
const PRIVATE_ROOT = `/`;

function authenticationForbidden(Component) {
  function AuthForbidden(props) {
    const {
      staticContext
    } = props;
    if (!props.isAuthenticated) return _react.default.createElement(Component, props);

    if (staticContext) {
      staticContext.status = 302;
      staticContext.url = PRIVATE_ROOT;
    }

    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: PRIVATE_ROOT
    });
  } // Hoist “Component.fetchData”
  // • needed by the the server to fetch the right data


  if (Component.fetchData) {
    AuthForbidden.fetchData = Component.fetchData;
  }

  function state2prop(state) {
    return {
      isAuthenticated: state.account.get(`isAuthenticated`)
    };
  }

  return (0, _reactRedux.connect)(state2prop)(AuthForbidden);
}

var _default = authenticationForbidden;
exports.default = _default;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRouterConfig = __webpack_require__(30);

var _reactIntl = __webpack_require__(44);

var _reactRedux = __webpack_require__(32);

var _reactHelmet = __webpack_require__(34);

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(25));

var locales = _interopRequireWildcard(__webpack_require__(45));

var _errorBoundary = _interopRequireDefault(__webpack_require__(48));

var _main = _interopRequireDefault(__webpack_require__(50));

var _list = _interopRequireDefault(__webpack_require__(55));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Root extends _react.default.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      route,
      lang
    } = this.props; // key is needed for dynamic language selection
    // • https://github.com/yahoo/react-intl/wiki/Components#dynamic-language-selection

    return _react.default.createElement(_reactIntl.IntlProvider, {
      locale: lang,
      key: lang,
      messages: locales[lang]
    }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmet.Helmet, {
      defaultTitle: _isomorphicConfig.default.APP_NAME,
      titleTemplate: `${_isomorphicConfig.default.APP_NAME} – %s`,
      meta: [{
        'http-equiv': `Content-Language`,
        content: lang
      }, {
        'http-equiv': `X-UA-Compatible`,
        content: `IE=edge`
      }, {
        name: `viewport`,
        content: `width=device-width, initial-scale=1.0`
      }]
    }, _react.default.createElement("html", {
      lang: lang
    }), _react.default.createElement("link", {
      rel: "stylesheet",
      href: `/application-client.css`
    }), _react.default.createElement("link", {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png"
    })), _react.default.createElement("h1", {
      className: "main-logo"
    }, _isomorphicConfig.default.APP_NAME), _react.default.createElement(_main.default, null), _react.default.createElement(_errorBoundary.default, null, (0, _reactRouterConfig.renderRoutes)(route.routes)), _react.default.createElement(_list.default, null)));
  }

}

function state2props(state) {
  const lang = state.account.get(`user.lang`) || `en`;
  return {
    lang
  };
}

var _default = (0, _reactRedux.connect)(state2props)(Root);

exports.default = _default;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "en", {
  enumerable: true,
  get: function () {
    return _en.default;
  }
});
Object.defineProperty(exports, "fr", {
  enumerable: true,
  get: function () {
    return _fr.default;
  }
});

var _en = _interopRequireDefault(__webpack_require__(46));

var _fr = _interopRequireDefault(__webpack_require__(47));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  '_.quotations': `quotations`,
  '_.invoices': `invoices`,
  '_.invoices.paid': `paid`,
  '_.invoices.left': `left`,
  '_.amount': `amount`,
  '_.count': `count`,
  '_.left-to-pay': `left to be paid`,
  '_.archive': `archive`,
  '_.save': `save`,
  '_.create': `create`,
  '_.print': `print`,
  '_.edit': `edit`,
  '_.print-notice': `In Firefox browser, don't forget to check the <b>Print Background Color</b> checkbox`,
  'account.login.title': `login`,
  'account.login.button': `connect`,
  'account.register.title': `register`,
  'account.register.notice': `After submitting, you will receive by email a confirmation link to set your password`,
  'account.register.button': `create and account`,
  'account.forgot.title': `Forgotten password?`,
  'account.forgot.notice': `After submitting, you will receive by email a reset link`,
  'account.forgot.button': `Send the link`,
  'account.reset.title': `Password reset`,
  'account.reset.notice': `Please set your new password`,
  'account.reset.button': `Reset`,
  'account.set-password.title': `Setup your password`,
  'account.set-password.button': `Set password`,
  'configuration.tab.from': `from`,
  'configuration.tab.default-product': `Default product`,
  'configuration.tab.mentions': `Footer mentions`,
  'configuration.tab.reference': `Reference`,
  'configuration.mentions.quotations': `For the quotations`,
  'configuration.mentions.invoices': `For the invoices`,
  'configuration.button.save': `Update`,
  'configuration.reference.warning': `
    Changing <strong>the starting number</strong> will renumber all references of the type concerned.
    <br />
    Be cautious!`,
  'customer.button.create': `Create a customer`,
  'customer.button.update': `update`,
  'customer.button.new': `new customer`,
  'customer.button.list': `customer list`,
  'customer.tab.configuration': `configure header`,
  'customer.total.quotation': `quotation total`,
  'customer.total.invoice': `invoice total`,
  'customer.total.to-be-paid': `to be paid`,
  'customer.total.progress': `progress`,
  'field.email': `email`,
  'field.password': `password`,
  'field.name': `name`,
  'field.address': `address`,
  'field.customer': `customer`,
  'field.tax': `tax`,
  'field.subject': `subject`,
  'field.description': `description`,
  'field.quantity': `quantity`,
  'field.currency': `currency`,
  'field.prefix': `prefix`,
  'field.start-at': `start at`,
  'field.language': `language`,
  'field.default-price': `default price`,
  'invoices.tab.payments': `Payments`,
  'invoices.tab.preview': `Invoice Preview`,
  'invoices.button.save': `Update Invoice`,
  'invoices.button.quotation': `Show quotation`,
  'invoices.button.preview': `preview invoice`,
  'invoices.button.archive': `archive`,
  'invoices.event': `event`,
  'invoices.event.#': `#`,
  'invoices.event.description': `description`,
  'invoices.event.payment': `payment`,
  'invoices.event.date': `date`,
  'invoices.event.amount': `amount`,
  'invoices.event.sent': `sent`,
  'key-pres.customer': `customer`,
  'key-pres.sent': `sent at`,
  'key-pres.validated': `validated at`,
  'key-pres.signed': `signed at`,
  'key-pres.total': `total`,
  'key-pres.associated.quote': `associated quotation`,
  'key-pres.associated.invoice': `associated invoice`,
  'key-pres.left-to-pay': `left to pay`,
  'notifications.user.welcome': `Welcome {name}`,
  'notifications.user.mail-sent': `An email has been sent to {email}`,
  'notifications.quotation.saved': `The quotation has been saved`,
  'notifications.quotation.error': `An error occurred while backing up`,
  'notifications.quotation.create-invoice.success': `Invoice created`,
  'notifications.quotation.create-invoice.error': `An error as occurred while creating invoice`,
  'notifications.invoice.saved': `The invoice has been saved`,
  'notifications.invoice.error': `An error occurred while backing up`,
  'notifications.customer.saved': `The customer has been saved`,
  'notifications.generic.saved': `saved`,
  'notifications.generic.error': `• something went wrong •`,
  'page.home': `home`,
  'page.quotations': `quotations`,
  'page.quotations.new': `new quotation`,
  'page.quotations.edit': `edit quotation – {reference}`,
  'page.quotations.preview': `quotation – {reference}`,
  'page.invoices': `invoices`,
  'page.invoices.edit': `edit invoice - {reference}`,
  'page.invoices.preview': `invoice – {reference}`,
  'page.customers': `customers`,
  'page.customers.new': `new customer`,
  'page.customers.edit': `customer : {name}`,
  'page.settings': `settings`,
  'page.connected': `connected as:<br/>{email}`,
  'page.logout': `logout`,
  'page.login': `login`,
  'page.register': `register`,
  'page.forgot': `forgotten password`,
  'page.error': `something went wrong`,
  'page.error.production-hint': `try to reload the page`,
  'page.archived': `archives`,
  'paper-sheet.reference.quotation': `Quotation`,
  'paper-sheet.reference.invoice': `Invoice`,
  'paper-sheet.reference.date': `date: `,
  'paper-sheet.party.from': `From:`,
  'paper-sheet.party.to': `To:`,
  'paper-sheet.party.no-name.from': `define your name in the settings`,
  'paper-sheet.party.no-address.from': `define your address in the settings`,
  'paper-sheet.party.no-name.to': `customer without name`,
  'paper-sheet.party.no-address.to': `customer without address`,
  'paper-sheet.subject': `Subject:`,
  'product.place-holder': `type to create a new line`,
  'quotation.create': `create`,
  'quotation.ready-to-invoice': `quote ready for invoicing`,
  'quotation.invoice.create': `create invoice`,
  'quotation.invoice.show': `show invoice`,
  'quotation.button.create': `Create quotation`,
  'quotation.button.update': `Update the quotation`,
  'quotation.button.archive': `Archive`,
  'quotation.button.new': `New quotation`,
  'quotation.button.list': `list quotations`,
  'quotation.button.preview': `preview quotation`,
  'spinner.loading': `loading…`,
  'stepper.sent': `sent at:`,
  'stepper.validated': `validated at:`,
  'stepper.signed': `signed at:`,
  'stepper.customer': `customer:`,
  'stepper.total': `total:`,
  'table.header.id': `#`,
  'table.header.name': `name`,
  'table.header.customer': `customer`,
  'table.header.status': `status`,
  'table.header.tax': `tax`,
  'table.header.quotation': `quotation`,
  'table.header.quotation-associated': `associated quotation`,
  'table.header.quotations': `quotations`,
  'table.header.invoice': `invoice`,
  'table.header.invoices': `invoices`,
  'table.header.description': `description`,
  'table.header.quantity': `quantity`,
  'table.header.unit-price': `unit price`,
  'table.header.sent': `sent`,
  'table.header.validated': `validated`,
  'table.header.signed': `signed`,
  'table.header.cumulative-amount': `cumulative amount`,
  'table.amount-ht': `pre-tax amount`,
  'table.amount-taxes': `taxes`,
  'table.amount': `amount`,
  'table.amount.paid': `paid`,
  'table.amount.left-to-pay': `left`,
  'table.empty': `none (yet)`,
  'table.pagination': `{start} – {end} of {total}`,
  'table.rows-per-page': `rows per page:`
};
exports.default = _default;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  '_.quotations': `devis`,
  '_.invoices': `factures`,
  '_.amount': `montant`,
  '_.invoices.paid': `payé`,
  '_.invoices.left': `à payer`,
  '_.count': `nombre`,
  '_.left-to-pay': `reste à payer`,
  '_.archive': `archiver`,
  '_.save': `sauver`,
  '_.create': `créer`,
  '_.print': `imprimer`,
  '_.edit': `modifier`,
  '_.print-notice': `Dans le navigateur Firefox, n'oubliez pas de cocher la case <b>Imprimer la couleur d'arrière-plan</b>`,
  'account.login.title': `connexion`,
  'account.login.button': `se connecter`,
  'account.register.title': `Créer un compte`,
  'account.register.button': `créer`,
  'account.register.notice': `Après l'envoie du formulaire', vous recevrez par email un lien de confirmation pour définir votre mot de passe`,
  'account.forgot.title': `Mot de passe oublié ?`,
  'account.forgot.notice': `Après avoir validé, vous recevrez par email un lien de réinitialisation`,
  'account.forgot.button': `Envoyer le lien`,
  'account.reset.title': `Réinitialisation du mot de passe`,
  'account.reset.notice': `Veuillez rentrer votre nouveau mot de passe`,
  'account.reset.button': `Réinitialiser`,
  'account.set-password.title': `Définition du mot de passe`,
  'account.set-password.button': `Définir le mot de passe`,
  'configuration.tab.from': `Émetteur`,
  'configuration.tab.default-product': `Produit par défaut`,
  'configuration.tab.mentions': `Bas de page`,
  'configuration.tab.reference': `Référence`,
  'configuration.mentions.quotations': `Pour les devis`,
  'configuration.mentions.invoices': `Pour les factures`,
  'configuration.button.save': `Mettre à jour`,
  'configuration.reference.warning': `
    Changer <strong>le chiffre de début</strong> renumérotera toutes les références du type concerné.
    <br />
    Soyez prudent !`,
  'customer.button.create': `Créer le client`,
  'customer.button.update': `Mettre à jour`,
  'customer.button.new': `nouveau client`,
  'customer.button.list': `list des clients`,
  'invoices.button.archive': `archiver`,
  'customer.tab.configuration': `Édition l'entête`,
  'customer.total.quotation': `total devis`,
  'customer.total.invoice': `total factures`,
  'customer.total.to-be-paid': `reste à payer`,
  'customer.total.progress': `progression`,
  'field.email': `email`,
  'field.password': `mot de passe`,
  'field.name': `nom`,
  'field.address': `adresse`,
  'field.customer': `client`,
  'field.tax': `taxe`,
  'field.subject': `objet`,
  'field.description': `description`,
  'field.quantity': `quantité`,
  'field.currency': `devise`,
  'field.prefix': `préfixe`,
  'field.start-at': `commence à`,
  'field.language': `langue`,
  'field.default-price': `prix par défaut`,
  'invoices.tab.payments': `Paiements`,
  'invoices.tab.preview': `Aperçu de la facture`,
  'invoices.button.save': `Mettre à jour`,
  'invoices.button.quotation': `Voir le devis`,
  'invoices.button.preview': `prévisualiser la facture`,
  'invoices.button.list': `liste des devis`,
  'invoices.event': `évènement`,
  'invoices.event.#': `n˚`,
  'invoices.event.description': `description`,
  'invoices.event.payment': `paiement`,
  'invoices.event.date': `date`,
  'invoices.event.amount': `montant`,
  'invoices.event.sent': `envoyé`,
  'key-pres.customer': `client`,
  'key-pres.sent': `envoyé le`,
  'key-pres.validated': `validé le`,
  'key-pres.signed': `signé le`,
  'key-pres.total': `total`,
  'key-pres.associated.quote': `devis associé`,
  'key-pres.associated.invoice': `facture associée`,
  'key-pres.left-to-pay': `reste à payer`,
  'notifications.user.welcome': `Bienvenue {name}`,
  'notifications.user.mail-sent': `Un email a été envoyé à {email}`,
  'notifications.quotation.saved': `Le devis a été sauvegardé`,
  'notifications.quotation.error': `Une erreur est survenue lors de la sauvegarde`,
  'notifications.quotation.create-invoice.success': `Facture créée`,
  'notifications.quotation.create-invoice.error': `Une erreur est survenue lors de la création de la facture`,
  'notifications.invoice.saved': `La facture a été sauvegardé`,
  'notifications.invoice.error': `Une erreur est survenue lors de la sauvegarde`,
  'notifications.customer.saved': `Le client a été sauvegardé`,
  'notifications.generic.saved': `enregistrement effectué`,
  'notifications.generic.error': `• une erreur est survenue •`,
  'page.home': `accueil`,
  'page.quotations': `devis`,
  'page.quotations.new': `nouveau devis`,
  'page.quotations.edit': `devis – {reference}`,
  'page.quotations.preview': `devis – {reference}`,
  'page.invoices': `factures`,
  'page.invoices.edit': `facture – {reference}`,
  'page.invoices.preview': `facture – {reference}`,
  'page.customers': `clients`,
  'page.customers.new': `nouveau client`,
  'page.customers.edit': `client : {name}`,
  'page.settings': `configuration`,
  'page.connected': `connecté en tant que :<br/>{email}`,
  'page.logout': `déconnexion`,
  'page.login': `connexion`,
  'page.register': `enregistrement`,
  'page.forgot': `mot de passe oublié`,
  'page.error': `Une erreur est survenue`,
  'page.error.production-hint': `essayez de recharger la page`,
  'page.archived': `archives`,
  'paper-sheet.reference.quotation': `Devis`,
  'paper-sheet.reference.invoice': `Facture`,
  'paper-sheet.reference.date': `date : `,
  'paper-sheet.party.from': `Émetteur :`,
  'paper-sheet.party.to': `Adressé à :`,
  'paper-sheet.party.no-name.from': `définissez votre nom dans les réglages`,
  'paper-sheet.party.no-address.from': `définissez votre adresse dans les réglages`,
  'paper-sheet.party.no-name.to': `client sans nom`,
  'paper-sheet.party.no-address.to': `client sans adresse`,
  'paper-sheet.subject': `Objet :`,
  'product.place-holder': `tapez pour créer une nouvelle ligne`,
  'quotation.create': `créer`,
  'quotation.ready-to-invoice': `Devis prêts pour facturation`,
  'quotation.invoice.create': `créer la facture`,
  'quotation.invoice.show': `voir la facture`,
  'quotation.button.create': `Créer le devis`,
  'quotation.button.update': `Mettre à jour le devis`,
  'quotation.button.archive': `Archiver`,
  'quotation.button.new': `Nouveau devis`,
  'quotation.button.list': `liste des devis`,
  'quotation.button.preview': `prévisualiser le devis`,
  'spinner.loading': `chargement…`,
  'stepper.sent': `envoyé le :`,
  'stepper.validated': `validé le :`,
  'stepper.signed': `signé le :`,
  'stepper.customer': `client :`,
  'stepper.total': `total :`,
  'table.header.id': `#`,
  'table.header.name': `nom`,
  'table.header.customer': `client`,
  'table.header.status': `statut`,
  'table.header.tax': `taxe`,
  'table.header.quotation': `devis`,
  'table.header.quotation-associated': `devis associé`,
  'table.header.quotations': `devis`,
  'table.header.invoice': `facture`,
  'table.header.invoices': `factures`,
  'table.header.description': `description`,
  'table.header.quantity': `quantité`,
  'table.header.unit-price': `prix unitaire`,
  'table.header.sent': `envoyé`,
  'table.header.validated': `validé`,
  'table.header.signed': `signé`,
  'table.header.cumulative-amount': `montant cumulé`,
  'table.amount-ht': `montant HT`,
  'table.amount-taxes': `taxes`,
  'table.amount': `total`,
  'table.amount.paid': `payé`,
  'table.amount.left-to-pay': `reste`,
  'table.empty': `vide (pour l'instant)`,
  'table.pagination': `{start} – {end} sur {total}`,
  'table.rows-per-page': `lignes par page :`
};
exports.default = _default;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _boarding = _interopRequireDefault(__webpack_require__(49));

var _reactIntl = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorStack(props) {
  const {
    error,
    errorInfo
  } = props;
  return _react.default.createElement("div", {
    style: {
      whiteSpace: 'pre-wrap'
    }
  }, error && error.toString(), _react.default.createElement("br", null), errorInfo.componentStack);
}

class ErrorBoundary extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    }); // You can also log error messages to an error reporting service here
  }

  render() {
    const {
      errorInfo,
      error
    } = this.state;

    if (this.state.errorInfo) {
      // Error path
      return _react.default.createElement(_boarding.default, {
        title: _react.default.createElement(_reactIntl.FormattedMessage, {
          id: "page.error"
        })
      }, process.env.IS_PROD && _react.default.createElement(_reactIntl.FormattedMessage, {
        id: "page.error.production-hint"
      }), process.env.IS_DEV && _react.default.createElement(ErrorStack, {
        error: error,
        errorInfo: errorInfo
      }));
    } // Normally, just render children


    return this.props.children;
  }

}

exports.default = ErrorBoundary;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LayoutBoarding;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactHelmet = __webpack_require__(34);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `boarding`;

function LayoutBoarding(props) {
  return _react.default.createElement("main", {
    role: "main",
    className: `${BASE_CLASS}`
  }, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("html", {
    className: "dark-background"
  })), _react.default.createElement("div", {
    className: `${BASE_CLASS}__card`
  }, props.title && _react.default.createElement("h2", {
    className: `${BASE_CLASS}__title`
  }, props.title), _react.default.createElement("div", {
    className: `${BASE_CLASS}__content`
  }, props.children)));
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRouterDom = __webpack_require__(29);

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var account = _interopRequireWildcard(__webpack_require__(51));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `nav-main`;
const ITEM_CLASS = `${BASE_CLASS}__item`;
const ACTIVE_CLASS = `is-active`;

class LogoutButton extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout({});
  }

  render() {
    return _react.default.createElement("a", {
      href: "/account/logout",
      onClick: this.logout
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "page.logout"
    }));
  }

}

function ConnectedNav(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("li", {
    className: ITEM_CLASS
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/",
    exact: true,
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.home"
  }))), _react.default.createElement("li", {
    className: ITEM_CLASS
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/quotations",
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.quotations"
  }))), _react.default.createElement("li", {
    className: ITEM_CLASS
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/invoices",
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.invoices"
  }))), _react.default.createElement("li", {
    className: ITEM_CLASS
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/customers",
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.customers"
  }))), _react.default.createElement("li", {
    className: ITEM_CLASS
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/archives",
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.archived"
  }))), _react.default.createElement("li", {
    className: ITEM_CLASS
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/account/settings",
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.settings"
  }))), _react.default.createElement("li", {
    className: `${ITEM_CLASS} ${ITEM_CLASS}--separator`
  }, _react.default.createElement(_reactIntl.FormattedHTMLMessage, {
    id: "page.connected",
    values: {
      email: props.email
    }
  })), _react.default.createElement("li", {
    className: ITEM_CLASS
  }, _react.default.createElement(LogoutButton, {
    logout: props.logout
  })));
}

function ConnectionNav(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("li", {
    className: "nav-main__item"
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/account/login",
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.login"
  }))), _react.default.createElement("li", {
    className: "nav-main__item"
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/account/register",
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.register"
  }))), _react.default.createElement("li", {
    className: "nav-main__item"
  }, _react.default.createElement(_reactRouterDom.NavLink, {
    to: "/account/forgot",
    activeClassName: ACTIVE_CLASS
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "page.forgot"
  }))));
}

function MainNav(props) {
  const {
    isAuthenticated
  } = props;
  return _react.default.createElement("nav", {
    className: BASE_CLASS
  }, _react.default.createElement("ul", {
    className: `${BASE_CLASS}__in`
  }, isAuthenticated ? _react.default.createElement(ConnectedNav, props) : _react.default.createElement(ConnectionNav, props)));
}

function state2props(state) {
  return {
    isAuthenticated: state.account.get(`isAuthenticated`),
    email: state.account.get(`user.email`)
  };
}

function dispatch2props(dispatch) {
  return (0, _redux.bindActionCreators)({
    logout: account.logout
  }, dispatch);
} // withRouter is needed for the <NavLink> to catch-up route changes
// • https://reacttraining.com/react-router/web/api/withRouter


var _default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(state2props, dispatch2props)(MainNav));

exports.default = _default;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.updateSettings = exports.reset = exports.setPassword = exports.forgot = exports.register = exports.logout = exports.login = exports.statistics = exports.auth = exports.UPDATE = exports.REGISTER = exports.LOGOUT = exports.RESET = exports.SET_PASSWORD = exports.FORGOT = exports.LOGIN = exports.STATISTICS = exports.AUTH = void 0;

var _crio = _interopRequireDefault(__webpack_require__(52));

var _createActionNames = _interopRequireDefault(__webpack_require__(53));

var _fetchDispatch = _interopRequireDefault(__webpack_require__(54));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NAME = `account`;
const AUTH = (0, _createActionNames.default)(NAME, `get`, `auth`);
exports.AUTH = AUTH;
const STATISTICS = (0, _createActionNames.default)(NAME, `get`, `statistics`);
exports.STATISTICS = STATISTICS;
const LOGIN = (0, _createActionNames.default)(NAME, `post`, `login`);
exports.LOGIN = LOGIN;
const FORGOT = (0, _createActionNames.default)(NAME, `post`, `forgot`);
exports.FORGOT = FORGOT;
const SET_PASSWORD = (0, _createActionNames.default)(NAME, `post`, `set-password`);
exports.SET_PASSWORD = SET_PASSWORD;
const RESET = (0, _createActionNames.default)(NAME, `post`, `reset`);
exports.RESET = RESET;
const LOGOUT = (0, _createActionNames.default)(NAME, `get`, `logout`);
exports.LOGOUT = LOGOUT;
const REGISTER = (0, _createActionNames.default)(NAME, `post`, `register`);
exports.REGISTER = REGISTER;
const UPDATE = (0, _createActionNames.default)(NAME, `post`, `one`);
exports.UPDATE = UPDATE;
const initialState = (0, _crio.default)({
  isSaving: false,
  isAuthenticated: false,
  user: {},
  statistics: {}
}); //////
// REDUCER
//////

function reducer(state = initialState, action) {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case AUTH.SUCCESS:
    case LOGIN.SUCCESS:
    case SET_PASSWORD.SUCCESS:
    case RESET.SUCCESS:
      state = state.set(`isAuthenticated`, true);
      return state.set(`user`, payload.user);

    case AUTH.ERROR:
    case LOGOUT.SUCCESS:
      state = state.set(`isAuthenticated`, false);
      return state.set(`user`, {});

    case STATISTICS.SUCCESS:
      return state.set(`statistics`, payload);

    case UPDATE.LOADING:
      return state.set(`isSaving`, true);

    case UPDATE.DONE:
      return state.set(`isSaving`, false);

    case UPDATE.SUCCESS:
      return state.set(`user`, payload.user);

    default:
      return state;
  }
} //////
// ACTION CREATORS
//////


const auth = (params, cookie) => async dispatch => {
  const options = {
    url: `/${NAME}/auth`
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: AUTH,
    fetch: {
      options,
      cookie
    }
  });
};

exports.auth = auth;

const statistics = (params, cookie) => async dispatch => {
  const options = {
    url: `/${NAME}/statistics`
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: STATISTICS,
    fetch: {
      options,
      cookie
    }
  });
};

exports.statistics = statistics;

const login = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const options = {
    url: `/${NAME}/login`,
    body
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LOGIN,
    fetch: {
      options,
      cookie
    }
  });
};

exports.login = login;

const logout = (params, cookie) => async dispatch => {
  const options = {
    url: `/${NAME}/logout`
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LOGOUT,
    fetch: {
      options,
      cookie
    }
  });
};

exports.logout = logout;

const register = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const options = {
    url: `/${NAME}/register`,
    body
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: REGISTER,
    fetch: {
      options,
      cookie
    }
  });
};

exports.register = register;

const forgot = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const options = {
    url: `/${NAME}/forgot`,
    body
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: FORGOT,
    fetch: {
      options,
      cookie
    }
  });
};

exports.forgot = forgot;

const setPassword = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const options = {
    url: `/${NAME}/set-password`,
    body
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: SET_PASSWORD,
    fetch: {
      options,
      cookie
    }
  });
};

exports.setPassword = setPassword;

const reset = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const options = {
    url: `/${NAME}/reset`,
    body
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: RESET,
    fetch: {
      options,
      cookie
    }
  });
};

exports.reset = reset;

const updateSettings = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const options = {
    url: `${NAME}/settings`,
    body
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: UPDATE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.updateSettings = updateSettings;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("crio");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createActionNames;

var _crio = _interopRequireDefault(__webpack_require__(52));

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const APP_PREFIX = `@${_isomorphicConfig.default.APP_NAME}`;
const prefixes = (0, _crio.default)({
  loading: `loading`,
  done: `done`,
  success: `success`,
  error: `error`
}); // Small utility to generate multiple dispatches type
// • always get a “/loading” and ”/done”
// • get on of “/success” or “/error” depending on the fetch result
// This could have been handled by a middleware too
// • https://github.com/pburtchaell/redux-promise-middleware
// • but I want to keep as much as I can away from libraries

function createActionNames(domain, method, name) {
  const _method = method ? `/${method}` : ``;

  return {
    method: method,
    LOADING: `${APP_PREFIX}/${domain}${_method}/${name}/${prefixes.loading}`,
    DONE: `${APP_PREFIX}/${domain}${_method}/${name}/${prefixes.done}`,
    SUCCESS: `${APP_PREFIX}/${domain}${_method}/${name}/${prefixes.success}`,
    ERROR: `${APP_PREFIX}/${domain}${_method}/${name}/${prefixes.error}`
  };
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchDispatch;

var _crio = _interopRequireDefault(__webpack_require__(52));

var _lodash = _interopRequireDefault(__webpack_require__(21));

var isoFetch = _interopRequireWildcard(__webpack_require__(19));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function fetchDispatch(params) {
  const {
    dispatch,
    fetch,
    actions,
    meta = {}
  } = params;
  const {
    options,
    cookie
  } = fetch;
  const {
    method = `get`
  } = actions;
  dispatch({
    type: actions.LOADING,
    payload: {
      loading: true
    }
  });

  try {
    const {
      payload
    } = await isoFetch[method](options, cookie);
    dispatch({
      type: actions.DONE,
      meta,
      payload: {}
    });

    if (payload.error) {
      dispatch({
        type: actions.ERROR,
        meta: (0, _lodash.default)({
          _fetchDispatchErrorType: `RESPONSE_ERROR`
        }, meta),
        error: true,
        payload: payload
      });
    } else {
      dispatch({
        type: actions.SUCCESS,
        meta,
        payload: payload
      });
    }
  } catch (err) {
    dispatch({
      type: actions.DONE,
      meta,
      payload: {}
    });
    dispatch({
      type: actions.ERROR,
      meta: (0, _lodash.default)({
        _fetchDispatchErrorType: `FETCH_ERROR`
      }, meta),
      error: true,
      payload: err
    });
  }
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _item = _interopRequireDefault(__webpack_require__(56));

var notifications = _interopRequireWildcard(__webpack_require__(57));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `notifications`;
const NOTIFICATION_LIFETIME = 5000;

function Notifications(props) {
  const {
    notifications,
    hasNotifications
  } = props;
  if (!hasNotifications) return null;
  return _react.default.createElement("aside", {
    className: BASE_CLASS
  }, notifications.map(n => _react.default.createElement(_item.default, {
    key: n._id,
    handleRemove: props.handleRemove,
    notification: n
  })));
}

function state2prop(state) {
  const {
    notifications
  } = state;
  const hasNotifications = Array.isArray(notifications) && notifications.length > 0;
  const result = {
    hasNotifications,
    notifications
  };
  return result;
}

const dispatch2prop = dispatch => {
  return (0, _redux.bindActionCreators)({
    handleRemove: notifications.removeOne
  }, dispatch);
};

var _default = (0, _reactRedux.connect)(state2prop, dispatch2prop)(Notifications);

exports.default = _default;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `notification`;
const NOTIFICATION_LIFETIME = 5000;

class Notification extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    const {
      error
    } = this.props.notification;
    const type = error ? `error` : `information`;
    this.state = {
      type
    };
    this.autoRemove = this.autoRemove.bind(this);
  }

  componentDidMount() {
    const {
      notification,
      handleRemove
    } = this.props;
    this.timerId = setTimeout(this.autoRemove, NOTIFICATION_LIFETIME);
  }

  componentWillUnmount() {
    this.timerId && clearTimeout(this.timerId);
    this.timerId = false;
  }

  autoRemove() {
    const {
      notification,
      handleRemove
    } = this.props;
    handleRemove(notification);
  }

  render() {
    const {
      notification,
      handleRemove
    } = this.props;

    const {
      i18nId,
      _id,
      additionalContent
    } = notification,
          values = _objectWithoutProperties(notification, ["i18nId", "_id", "additionalContent"]);

    const {
      type
    } = this.state;
    return _react.default.createElement("div", {
      onClick: e => handleRemove(notification),
      className: `${BASE_CLASS} ${BASE_CLASS}--${type}`
    }, _react.default.createElement("h4", {
      className: `${BASE_CLASS}__title`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: i18nId,
      values: values
    })), additionalContent && _react.default.createElement("div", {
      className: `${BASE_CLASS}__content`
    }, additionalContent));
  }

}

exports.default = Notification;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.removeOne = exports.ALL_POST = exports.REMOVE = void 0;

var _crio = _interopRequireDefault(__webpack_require__(52));

var _shortid = _interopRequireDefault(__webpack_require__(58));

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(25));

var _createActionNames = _interopRequireDefault(__webpack_require__(53));

var _quotations = __webpack_require__(59);

var _invoices = __webpack_require__(60);

var _customers = __webpack_require__(61);

var _account = __webpack_require__(51);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NAME = `notifications`;
const REMOVE = `@${_isomorphicConfig.default.APP_NAME}/${NAME}/remove`;
exports.REMOVE = REMOVE;
const ALL_POST = (0, _createActionNames.default)(`[_a-zA-Z0-9]+`, `post`, `[_a-zA-Z0-9]+`);
exports.ALL_POST = ALL_POST;
const postSuccessRegexp = new RegExp(`^${ALL_POST.SUCCESS}$`);
const postErrorRegexp = new RegExp(`^${ALL_POST.ERROR}$`);
const initialState = (0, _crio.default)([]);

function notifySuccess(state, i18nId, values = {}) {
  return state.push(_objectSpread({
    _id: (0, _shortid.default)(),
    i18nId
  }, values));
}

function notifyError(state, i18nId, values = {}) {
  return state.push(_objectSpread({
    _id: (0, _shortid.default)(),
    error: true,
    i18nId
  }, values));
}

function reducer(state = initialState, action) {
  const {
    type,
    payload,
    error
  } = action;

  if (postErrorRegexp.test(type)) {
    console.error(`error`);
    console.log(payload);
  }

  switch (type) {
    case REMOVE:
      {
        const index = state.indexOf(payload);
        return state.splice(index, 1);
      }
    //----- USER

    case _account.LOGIN.SUCCESS:
    case _account.RESET.SUCCESS:
      {
        const {
          user
        } = payload;
        const name = user.name || user.email;
        return notifySuccess(state, `notifications.user.welcome`, {
          name
        });
      }

    case _account.REGISTER.SUCCESS:
    case _account.FORGOT.SUCCESS:
      {
        const {
          email
        } = payload;
        return notifySuccess(state, `notifications.user.mail-sent`, {
          email
        });
      }
    //----- QUOTATIONS

    case _quotations.SAVE_ONE.SUCCESS:
      {
        return notifySuccess(state, `notifications.quotation.saved`);
      }

    case _quotations.SAVE_ONE.ERROR:
      {
        return notifyError(state, `notifications.quotation.error`);
      }

    case _quotations.CREATE_INVOICE.SUCCESS:
      {
        return notifySuccess(state, `notifications.quotation.create-invoice.success`);
      }

    case _quotations.CREATE_INVOICE.SUCCESS:
      {
        return notifyError(state, `notifications.quotation.create-invoice.error`);
      }
    //----- INVOICES

    case _invoices.SAVE_ONE.SUCCESS:
      {
        return notifySuccess(state, `notifications.invoice.saved`);
      }

    case _invoices.SAVE_ONE.ERROR:
      {
        return notifyError(state, `notifications.invoice.error`);
      }
    //----- CUSTOMERS

    case _customers.SAVE_ONE.SUCCESS:
      {
        return notifySuccess(state, `notifications.customer.saved`);
      }

    case _customers.SAVE_ONE.ERROR:
      {
        return notifyError(state, `notifications.customer.error`, {
          additionalContent: payload.message
        });
      }
  } //----- CATCH ALL
  // • if no custom notification has been handled, make a general one


  if (postErrorRegexp.test(type)) {
    return notifyError(state, 'notifications.generic.error', {
      additionalContent: payload.message
    });
  }

  if (postSuccessRegexp.test(type)) {
    return notifySuccess(state, 'notifications.generic.saved');
  }

  return state;
}

const removeOne = params => async dispatch => {
  dispatch({
    type: REMOVE,
    payload: params
  });
};

exports.removeOne = removeOne;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.createInvoice = exports.archiveOne = exports.saveOne = exports.getOne = exports.listForCustomer = exports.listReadyToInvoice = exports.listArchived = exports.listActive = exports.LOADING = exports.CREATE_INVOICE = exports.ARCHIVE_QUOTE = exports.SAVE_ONE = exports.GET_ONE = exports.LIST_FOR_CUSTOMER = exports.LIST_GET_READY_INVOICE = exports.LIST_ARCHIVED = exports.LIST_ACTIVE = void 0;

var _crio = _interopRequireDefault(__webpack_require__(52));

var _lodash = _interopRequireDefault(__webpack_require__(18));

var _createActionNames = _interopRequireDefault(__webpack_require__(53));

var _fetchDispatch = _interopRequireDefault(__webpack_require__(54));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NAME = `quotations`;
const LIST_ACTIVE = (0, _createActionNames.default)(NAME, `get`, `list-active`);
exports.LIST_ACTIVE = LIST_ACTIVE;
const LIST_ARCHIVED = (0, _createActionNames.default)(NAME, `get`, `list-archived`);
exports.LIST_ARCHIVED = LIST_ARCHIVED;
const LIST_GET_READY_INVOICE = (0, _createActionNames.default)(NAME, `get`, `list-ready-to-invoice`);
exports.LIST_GET_READY_INVOICE = LIST_GET_READY_INVOICE;
const LIST_FOR_CUSTOMER = (0, _createActionNames.default)(NAME, `get`, `list-for-customer`);
exports.LIST_FOR_CUSTOMER = LIST_FOR_CUSTOMER;
const GET_ONE = (0, _createActionNames.default)(NAME, `get`, `one`);
exports.GET_ONE = GET_ONE;
const SAVE_ONE = (0, _createActionNames.default)(NAME, `post`, `one`);
exports.SAVE_ONE = SAVE_ONE;
const ARCHIVE_QUOTE = (0, _createActionNames.default)(NAME, `post`, `archive`);
exports.ARCHIVE_QUOTE = ARCHIVE_QUOTE;
const CREATE_INVOICE = (0, _createActionNames.default)(NAME, `post`, `convert`);
exports.CREATE_INVOICE = CREATE_INVOICE;
const LOADING = (0, _crio.default)({
  isLoading: true,
  reference: `loading…`,
  products: []
});
exports.LOADING = LOADING;
const initialState = (0, _crio.default)({
  isSaving: false,
  meta: {
    active: {},
    archived: {},
    readyToInvoice: {}
  },
  active: [],
  archived: [],
  readyToInvoice: [],
  current: LOADING
});

function reducer(state = initialState, action) {
  const {
    type,
    payload,
    meta
  } = action;

  switch (type) {
    case LIST_ACTIVE.SUCCESS:
    case LIST_FOR_CUSTOMER.SUCCESS:
      state = state.set(`active`, payload.rows);
      return state.set(`meta.active`, payload.meta);

    case LIST_ARCHIVED.SUCCESS:
      state = state.set(`archived`, payload.rows);
      return state.set(`meta.archived`, payload.meta);

    case LIST_GET_READY_INVOICE.SUCCESS:
      state = state.set(`readyToInvoice`, payload.rows);
      return state.set(`meta.readyToInvoice`, payload.meta);
    // Be sure to reset current
    // • we don't want a “show” page to have legacy datas to begin with

    case LIST_ACTIVE.LOADING:
    case LIST_ARCHIVED.LOADING:
    case LIST_GET_READY_INVOICE.LOADING:
    case LIST_FOR_CUSTOMER.LOADING:
    case GET_ONE.LOADING:
      return state.set(`current`, LOADING);

    case SAVE_ONE.LOADING:
    case ARCHIVE_QUOTE.LOADING:
    case CREATE_INVOICE.LOADING:
      return state.set(`isSaving`, true);

    case SAVE_ONE.DONE:
    case ARCHIVE_QUOTE.DONE:
    case CREATE_INVOICE.DONE:
      return state.set(`isSaving`, false);

    case GET_ONE.SUCCESS:
    case SAVE_ONE.SUCCESS:
      return state.set(`current`, payload);

    case ARCHIVE_QUOTE.SUCCESS:
      {
        const {
          id
        } = meta;

        const removeId = quotation => quotation.id !== id;

        const active = state.get(`active`).filter(removeId);
        const readyToInvoice = state.get(`readyToInvoice`).filter(removeId);
        const updated = state.set(`active`, active).set(`readyToInvoice`, readyToInvoice).set(`current`, payload);
        return updated;
      }

    case CREATE_INVOICE.SUCCESS:
      {
        const {
          id
        } = meta; // maybe the quotation isn't already in the listing

        const index = state.get(`readyToInvoice`).findIndex(quot => quot.id === id);
        const updated = index < 0 ? state : state.set(`readyToInvoice[${index}]`, payload); // always update the current quotation

        return updated.set(`current`, payload);
      }

    default:
      return state;
  }
}

const listActive = (params = {}, cookie) => async dispatch => {
  const options = _objectSpread({
    url: `${NAME}`
  }, params);

  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LIST_ACTIVE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.listActive = listActive;

const listArchived = (params = {}, cookie) => async dispatch => {
  const options = _objectSpread({
    url: `${NAME}/archived`
  }, params);

  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LIST_ARCHIVED,
    fetch: {
      options,
      cookie
    }
  });
};

exports.listArchived = listArchived;

const listReadyToInvoice = (params = {}, cookie) => async dispatch => {
  const options = _objectSpread({
    url: `${NAME}/ready-to-invoice`
  }, params);

  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LIST_GET_READY_INVOICE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.listReadyToInvoice = listReadyToInvoice;

const listForCustomer = (params = {}, cookie) => async dispatch => {
  const {
    id
  } = params,
        rest = _objectWithoutProperties(params, ["id"]);

  const options = _objectSpread({
    url: `/customers/${id}/${NAME}`
  }, rest);

  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LIST_FOR_CUSTOMER,
    fetch: {
      options,
      cookie
    }
  });
};

exports.listForCustomer = listForCustomer;

const getOne = (params, cookie) => async dispatch => {
  let {
    id
  } = params;
  id = id ? id : `new`;
  const options = {
    url: `${NAME}/${id}`
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: GET_ONE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.getOne = getOne;

const saveOne = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const {
    id
  } = body;
  const isNew = (0, _lodash.default)(id);
  const urlId = isNew ? `new` : id;
  const options = {
    url: `${NAME}/${urlId}`,
    body
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    meta: {
      isNew
    },
    actions: SAVE_ONE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.saveOne = saveOne;

const archiveOne = (params, cookie) => async dispatch => {
  const {
    id
  } = params;
  const options = {
    url: `${NAME}/${id}/archive`,
    body: {}
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    meta: {
      id
    },
    actions: ARCHIVE_QUOTE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.archiveOne = archiveOne;

const createInvoice = (params, cookie) => async dispatch => {
  const {
    id
  } = params;
  const options = {
    url: `${NAME}/${id}/create-invoice`,
    body: {}
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    meta: {
      id
    },
    actions: CREATE_INVOICE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.createInvoice = createInvoice;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.archiveOne = exports.saveOne = exports.getOne = exports.listForCustomer = exports.listArchived = exports.listActive = exports.EMPTY = exports.ARCHIVE = exports.SAVE_ONE = exports.GET_ONE = exports.LIST_FOR_CUSTOMER = exports.LIST_ARCHIVED = exports.LIST_ACTIVE = void 0;

var _crio = _interopRequireDefault(__webpack_require__(52));

var _lodash = _interopRequireDefault(__webpack_require__(18));

var _createActionNames = _interopRequireDefault(__webpack_require__(53));

var _fetchDispatch = _interopRequireDefault(__webpack_require__(54));

var _quotations = __webpack_require__(59);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NAME = `invoices`;
const LIST_ACTIVE = (0, _createActionNames.default)(NAME, `get`, `list-active`);
exports.LIST_ACTIVE = LIST_ACTIVE;
const LIST_ARCHIVED = (0, _createActionNames.default)(NAME, `get`, `list-archived`);
exports.LIST_ARCHIVED = LIST_ARCHIVED;
const LIST_FOR_CUSTOMER = (0, _createActionNames.default)(NAME, `get`, `list-for-customer`);
exports.LIST_FOR_CUSTOMER = LIST_FOR_CUSTOMER;
const GET_ONE = (0, _createActionNames.default)(NAME, `get`, `one`);
exports.GET_ONE = GET_ONE;
const SAVE_ONE = (0, _createActionNames.default)(NAME, `post`, `one`);
exports.SAVE_ONE = SAVE_ONE;
const ARCHIVE = (0, _createActionNames.default)(NAME, `post`, `archive`);
exports.ARCHIVE = ARCHIVE;
const EMPTY = (0, _crio.default)({
  isLoading: true,
  reference: `loading…`,
  products: []
});
exports.EMPTY = EMPTY;
const initialState = (0, _crio.default)({
  isSaving: false,
  meta: {
    active: {},
    archived: {}
  },
  active: [],
  archived: [],
  current: EMPTY
});

function reducer(state = initialState, action) {
  const {
    type,
    payload,
    meta
  } = action;

  switch (type) {
    case LIST_ACTIVE.SUCCESS:
    case LIST_FOR_CUSTOMER.SUCCESS:
      state = state.set(`active`, payload.rows);
      return state.set(`meta.active`, payload.meta);

    case LIST_ARCHIVED.SUCCESS:
      state = state.set(`archived`, payload.rows);
      return state.set(`meta.archived`, payload.meta);

    case LIST_ACTIVE.LOADING:
    case LIST_ARCHIVED.LOADING:
    case LIST_FOR_CUSTOMER.LOADING:
    case GET_ONE.LOADING:
      return state.set(`current`, EMPTY);

    case GET_ONE.SUCCESS:
      return state.set(`current`, payload);

    case ARCHIVE.SUCCESS:
      {
        const {
          id
        } = meta;

        const removeId = invoice => invoice.id !== id;

        const active = state.get(`active`).filter(removeId);
        const updated = state.set(`active`, active).set(`current`, payload);
        return updated;
      }

    case SAVE_ONE.LOADING:
      return state.set(`isSaving`, true);

    case SAVE_ONE.DONE:
      return state.set(`isSaving`, false);

    case SAVE_ONE.SUCCESS:
      return state.set(`current`, payload);

    default:
      return state;
  }
}

const listActive = (params = {}, cookie) => async dispatch => {
  const options = _objectSpread({
    url: `${NAME}`
  }, params);

  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LIST_ACTIVE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.listActive = listActive;

const listArchived = (params = {}, cookie) => async dispatch => {
  const options = _objectSpread({
    url: `${NAME}/archived`
  }, params);

  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LIST_ARCHIVED,
    fetch: {
      options,
      cookie
    }
  });
};

exports.listArchived = listArchived;

const listForCustomer = (params = {}, cookie) => async dispatch => {
  const {
    id
  } = params,
        rest = _objectWithoutProperties(params, ["id"]);

  const options = _objectSpread({
    url: `/customers/${id}/${NAME}`
  }, rest);

  await (0, _fetchDispatch.default)({
    dispatch,
    actions: LIST_FOR_CUSTOMER,
    fetch: {
      options,
      cookie
    }
  });
};

exports.listForCustomer = listForCustomer;

const getOne = (params, cookie) => async dispatch => {
  const {
    id
  } = params;
  const options = {
    url: `${NAME}/${id}`
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: GET_ONE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.getOne = getOne;

const saveOne = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const {
    id
  } = body;
  const options = {
    url: `${NAME}/${id}`,
    body
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    actions: SAVE_ONE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.saveOne = saveOne;

const archiveOne = (params, cookie) => async dispatch => {
  const {
    id
  } = params;
  const options = {
    url: `${NAME}/${id}/archive`,
    body: {}
  };
  await (0, _fetchDispatch.default)({
    dispatch,
    meta: {
      id
    },
    actions: ARCHIVE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.archiveOne = archiveOne;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.saveOne = exports.getOne = exports.getAll = exports.SAVE_ONE = exports.GET_ONE = exports.GET_ALL = void 0;

var _crio = _interopRequireDefault(__webpack_require__(52));

var _lodash = _interopRequireDefault(__webpack_require__(18));

var _createActionNames = _interopRequireDefault(__webpack_require__(53));

var _fetchDispatch = _interopRequireDefault(__webpack_require__(54));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NAME = `customers`;
const GET_ALL = (0, _createActionNames.default)(NAME, `get`, `all`);
exports.GET_ALL = GET_ALL;
const GET_ONE = (0, _createActionNames.default)(NAME, `get`, `one`);
exports.GET_ONE = GET_ONE;
const SAVE_ONE = (0, _createActionNames.default)(NAME, `post`, `one`);
exports.SAVE_ONE = SAVE_ONE;
const initialState = (0, _crio.default)({
  isSaving: false,
  active: [],
  meta: {
    all: {}
  },
  current: {}
});

function reducer(state = initialState, action) {
  const {
    type,
    payload,
    meta
  } = action;

  switch (type) {
    case GET_ALL.SUCCESS:
      state = state.set(`active`, payload.rows);
      return state.set(`meta.active`, payload.meta);

    case GET_ONE.LOADING:
      return state.set(`current`, {
        isLoading: true,
        name: `loading…`
      });

    case GET_ONE.SUCCESS:
      return state.set(`current`, payload);

    case SAVE_ONE.LOADING:
      return state.set(`isSaving`, true);

    case SAVE_ONE.DONE:
      return state.set(`isSaving`, false);

    case SAVE_ONE.SUCCESS:
      return state.set(`current`, payload);

    default:
      return state;
  }
}

const getAll = (params = {}, cookie) => async dispatch => {
  const options = _objectSpread({
    url: `${NAME}`
  }, params);

  return await (0, _fetchDispatch.default)({
    dispatch,
    actions: GET_ALL,
    fetch: {
      options,
      cookie
    }
  });
};

exports.getAll = getAll;

const getOne = (params, cookie) => async dispatch => {
  let {
    id
  } = params;
  id = id ? id : `new`;
  const options = {
    url: `${NAME}/${id}`
  };
  return await (0, _fetchDispatch.default)({
    dispatch,
    actions: GET_ONE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.getOne = getOne;

const saveOne = (params, cookie) => async dispatch => {
  const {
    body
  } = params;
  const {
    id
  } = body;
  const isNew = (0, _lodash.default)(id);
  const urlId = isNew ? `new` : id;
  const options = {
    url: `${NAME}/${urlId}`,
    body
  };
  return await (0, _fetchDispatch.default)({
    dispatch,
    meta: {
      isNew
    },
    actions: SAVE_ONE,
    fetch: {
      options,
      cookie
    }
  });
};

exports.saveOne = saveOne;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var account = _interopRequireWildcard(__webpack_require__(51));

var _boarding = _interopRequireDefault(__webpack_require__(49));

var _form = _interopRequireDefault(__webpack_require__(65));

var _buttons = __webpack_require__(66);

var _field = __webpack_require__(70);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Login extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true
    });
    this.props.login({
      body
    });
  }

  render() {
    const {
      props
    } = this;
    const titleProps = {
      id: `account.login.title`
    };
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_boarding.default, {
      title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
    }, _react.default.createElement(_form.default, {
      id: "login",
      action: "/account/login",
      onSubmit: this.handleSubmit
    }, _react.default.createElement(_field.Input, {
      name: "email",
      label: "field.email",
      type: "email",
      defaultValue: ""
    }), _react.default.createElement(_field.Input, {
      name: "password",
      label: "field.password",
      type: "password",
      defaultValue: ""
    }), _react.default.createElement(_buttons.Button, {
      type: "submit"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.login.button",
      defaultMessage: "Connect"
    })))));
  }

}

function dispatch2prop(dispatch) {
  return (0, _redux.bindActionCreators)({
    login: account.login
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(null, dispatch2prop)((0, _connectDataFetcher.default)({
  Component: Login,
  actionCreators: []
}));

exports.default = _default;

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("form-serialize");

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectDataFetchers;

var _react = _interopRequireDefault(__webpack_require__(27));

var account = _interopRequireWildcard(__webpack_require__(51));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect data fetcher
// • we need to collect data for the components to render properly
//   …both on the server and the client side
// • the static “fetchData” is mainly dedicated to the server
//   but we alias it for the client side with _fetchDataOnClient :)
// • BUT we don't want those data to be fetch another time on client side initialization
//   hence the IS_FIRST_MOUNT_AFTER_LOAD
// • coming from:
//   https://reactjsnews.com/isomorphic-react-in-real-life#data-fetching
let IS_FIRST_MOUNT_AFTER_LOAD = true;

function connectDataFetchers({
  Component,
  actionCreators
}) {
  // be sure we have an array to begin with
  actionCreators = Array.isArray(actionCreators) ? actionCreators : [actionCreators]; // always query the authentication

  actionCreators.unshift(account.auth);
  return class DataFetchersWrapper extends _react.default.Component {
    // Don't pass the full store
    // • passing only dispatch will make server & client iso in what they get
    static fetchData({
      dispatch,
      params = {},
      query = {},
      jwt
    }) {
      return Promise.all(actionCreators.map(actionCreator => {
        return dispatch(actionCreator(params, jwt));
      }));
    }

    componentDidUpdate(prevProps) {
      const {
        location
      } = this.props;
      const {
        location: prevLocation
      } = prevProps;
      const isUrlChanged = location.pathname !== prevLocation.pathname || location.search !== prevLocation.search;
      if (isUrlChanged) this._fetchDataOnClient();
    }

    componentDidMount() {
      if (!IS_FIRST_MOUNT_AFTER_LOAD) return this._fetchDataOnClient();
      IS_FIRST_MOUNT_AFTER_LOAD = false;
    }

    _fetchDataOnClient() {
      const {
        params
      } = this.props.match;
      DataFetchersWrapper.fetchData({
        dispatch: this.props.dispatch,
        params
      });
    }

    render() {
      return _react.default.createElement(Component, this.props);
    }

  };
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = Form;
exports.FormActions = FormActions;
exports.default = exports.BASE_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `form`;
exports.BASE_CLASS = BASE_CLASS;

function Form(props) {
  const {
    id,
    className,
    isSaving,
    children
  } = props,
        others = _objectWithoutProperties(props, ["id", "className", "isSaving", "children"]);

  const FORM_CLASS = [BASE_CLASS, id];
  if (isSaving) FORM_CLASS.push(`${BASE_CLASS}--is-saving`);
  if (className) FORM_CLASS.push(className);
  return _react.default.createElement("form", _extends({
    id: id,
    method: "post",
    className: FORM_CLASS.join(` `)
  }, others), children);
}

var _default = Form;
exports.default = _default;

function FormActions(props) {
  return _react.default.createElement("div", {
    className: `${BASE_CLASS}__actions`
  }, props.children);
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;
exports.BtnIcon = BtnIcon;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _classnames = _interopRequireDefault(__webpack_require__(67));

var _svgIcons = _interopRequireDefault(__webpack_require__(68));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `button`;

function Button(props) {
  const {
    className,
    to,
    secondary,
    linkAlike,
    danger
  } = props,
        others = _objectWithoutProperties(props, ["className", "to", "secondary", "linkAlike", "danger"]);

  const COMP_CLASS = (0, _classnames.default)(className, {
    [BASE_CLASS]: true,
    [`${BASE_CLASS}--link`]: linkAlike,
    [`${BASE_CLASS}--secondary`]: secondary,
    [`${BASE_CLASS}--danger`]: danger
  });

  if (to) {
    return _react.default.createElement(_reactRouterDom.Link, _extends({
      to: to,
      className: COMP_CLASS
    }, others), props.children);
  }

  return _react.default.createElement("button", _extends({
    className: COMP_CLASS
  }, others), props.children);
}

const BTN_ICON_CLASS = `${BASE_CLASS}--icon`;

function BtnIcon(props) {
  const {
    className,
    svgId,
    secondary,
    linkAlike,
    danger,
    label
  } = props,
        others = _objectWithoutProperties(props, ["className", "svgId", "secondary", "linkAlike", "danger", "label"]);

  const COMP_CLASS = (0, _classnames.default)(className, {
    [BTN_ICON_CLASS]: true,
    [`${BTN_ICON_CLASS}-secondary`]: secondary,
    [`${BTN_ICON_CLASS}-link`]: linkAlike,
    [`${BTN_ICON_CLASS}-danger`]: danger,
    [`${BTN_ICON_CLASS}--icon`]: className
  });
  return _react.default.createElement(Button, _extends({
    className: COMP_CLASS
  }, others), _react.default.createElement(_svgIcons.default, {
    svgId: svgId
  }), label && _react.default.createElement("span", {
    className: `${BASE_CLASS}__notice`
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: label
  })));
}

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = Icon;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(67));

var _propTypes = _interopRequireDefault(__webpack_require__(69));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `svg-icon`;

function Icon(props) {
  const {
    svgId,
    className
  } = props,
        other = _objectWithoutProperties(props, ["svgId", "className"]);

  const COMP_CLASS = (0, _classnames.default)(BASE_CLASS, `icon-${svgId}`, className);
  return _react.default.createElement("svg", _extends({
    role: "img",
    className: COMP_CLASS
  }, other), _react.default.createElement("use", {
    xlinkHref: `#icon-${svgId}`
  }));
}

Icon.propTypes = {
  svgId: _propTypes.default.string.isRequired
};
var _default = Icon;
exports.default = _default;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idToClassName = idToClassName;
exports.CheckBox = CheckBox;
exports.Select = exports.Textarea = exports.Input = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(18));

var _crio = _interopRequireDefault(__webpack_require__(52));

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var _svgIcons = __webpack_require__(68);

var _textareaAutoResize = __webpack_require__(71);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `field`; //////
// UTILS
//////

function isEmpty(value) {
  return (0, _lodash.default)(value) || value === ``;
} // ensure that we have a value in case of controlled component
// • this will avoid warnings…
//   …from switching from controlled to uncontrolled components


function ensureValue(value) {
  return (0, _lodash.default)(value) ? `` : value;
} // foo[0] => foo-0


function idToClassName(id) {
  return id.replace(/\]$/, ``).replace(/[\[\]]/g, '-').toLowerCase();
} //////
// WRAPPER
//////
// inspired by
// • https://github.com/muicss/mui/blob/master/src/react/_textfieldHelpers.jsx


const fieldWrapper = ({
  ControlComponent,
  fieldType
}) => class extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    const {
      id,
      label,
      darkBg,
      onChange,
      onBlur
    } = props,
          rest = _objectWithoutProperties(props, ["id", "label", "darkBg", "onChange", "onBlur"]);

    const _id = id ? id : rest.name;

    const _id2class = idToClassName(_id);

    const {
      type
    } = props;
    const wrapperClassName = [BASE_CLASS, `${BASE_CLASS}--${_id2class}`, `${BASE_CLASS}--is-${fieldType}`];
    if (type) wrapperClassName.push(`${BASE_CLASS}--type-${type}`);
    if (darkBg) wrapperClassName.push(`${BASE_CLASS}--dark-background`);
    const wrapperProps = (0, _crio.default)({
      className: wrapperClassName.join(` `)
    });
    const labelProps = (0, _crio.default)({
      className: `${BASE_CLASS}__label`,
      htmlFor: _id,
      label: label
    });
    const controlProps = (0, _crio.default)(_objectSpread({
      id: _id,
      className: `${BASE_CLASS}__control`,
      onChange: this.handleChange,
      onBlur: this.handleBlur
    }, rest));

    if ((0, _lodash.default)(props.defaultValue)) {
      controlProps.value = ensureValue(props.value);
    }

    this.state = {
      wrapperProps,
      labelProps,
      controlProps,
      isEmpty: false,
      isTouched: false,
      isPristine: true
    };
  } // activate floating label only if JS on client-side
  // • without JS all label will be stuck by default


  componentDidMount() {
    const {
      controlProps
    } = this.state;
    const controlValue = `value` in controlProps ? controlProps.value : controlProps.defaultValue;
    const isEmptyValue = isEmpty(controlValue);
    this.setState(prevState => {
      return {
        isEmpty: isEmptyValue
      };
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      controlProps
    } = prevState;
    const isValueUpdate = nextProps.value !== controlProps.value;
    const isOptionsUpdate = nextProps.options !== controlProps.options;
    if (!isValueUpdate && !isOptionsUpdate) return null;
    const update = {
      controlProps,
      isEmpty: prevState.isEmpty
    };

    if (isOptionsUpdate) {
      update.controlProps = update.controlProps.set(`options`, nextProps.options);
    }

    if (isValueUpdate) {
      const value = ensureValue(nextProps.value);
      update.isEmpty = isEmpty(value);
      update.controlProps = update.controlProps.set(`value`, value);
    }

    return update;
  } //----- EVENTS


  handleChange(event) {
    const {
      props
    } = this; // Can't use event in async
    // • https://reactjs.org/docs/events.html#event-pooling

    const {
      value
    } = event.target;
    this.setState(prevState => {
      return {
        isEmpty: isEmpty(value),
        isPristine: false
      };
    }); // execute original callback

    if (typeof props.onChange === `function`) props.onChange(event);
  }

  handleBlur(event) {
    const {
      props
    } = this; // ignore if event is a window blur

    if (document.activeElement !== this.controlEl) {
      this.setState(prevState => {
        return {
          isTouched: true
        };
      });
    } // execute original callback


    if (typeof props.onBlur === `function`) props.onBlur(event);
  } //----- RENDER


  render() {
    const {
      state
    } = this;
    const {
      wrapperProps,
      labelProps,
      controlProps,
      isEmpty,
      isTouched
    } = state;
    const WrapperClassName = [wrapperProps.className, isEmpty ? `${BASE_CLASS}--is-empty` : `${BASE_CLASS}--is-not-empty`, isTouched ? `${BASE_CLASS}--is-touched` : `${BASE_CLASS}--is-not-touched`].join(` `);
    return _react.default.createElement("div", {
      className: WrapperClassName
    }, _react.default.createElement(ControlComponent, _extends({
      controlRef: el => {
        this.controlEl = el;
      }
    }, controlProps)), _react.default.createElement("label", {
      className: labelProps.className,
      htmlFor: labelProps.htmlFor
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: labelProps.label
    })));
  }

}; //////
// COMPONENTS
//////


const Input = fieldWrapper({
  ControlComponent: props => {
    const {
      controlRef
    } = props,
          rest = _objectWithoutProperties(props, ["controlRef"]);

    return _react.default.createElement("input", _extends({
      ref: controlRef
    }, rest));
  },
  fieldType: `input`
});
exports.Input = Input;
const Textarea = fieldWrapper({
  ControlComponent: props => {
    const {
      controlRef
    } = props,
          rest = _objectWithoutProperties(props, ["controlRef"]);

    return _react.default.createElement(_textareaAutoResize.TextareaAutoResize, _extends({
      ref: controlRef
    }, rest));
  },
  fieldType: `textarea`
}); // sometime <options> list doesn't come with the expected keys
// • make it possible to configure that with optionsKeys prop

exports.Textarea = Textarea;
const keyDefault = (0, _crio.default)({
  value: `value`,
  label: `label`
});
const Select = fieldWrapper({
  ControlComponent: props => {
    const {
      options,
      optionsKeys = keyDefault,
      controlRef
    } = props,
          rest = _objectWithoutProperties(props, ["options", "optionsKeys", "controlRef"]);

    const hasOptions = Array.isArray(options) && options.length > 0;
    return _react.default.createElement("select", _extends({
      ref: controlRef
    }, rest), hasOptions && options.map(c => _react.default.createElement("option", {
      key: `${controlRef}-${c.get(optionsKeys.value)}`,
      value: c.get(optionsKeys.value)
    }, c.get(optionsKeys.label))));
  },
  fieldType: `select`
});
exports.Select = Select;

function CheckBox(props) {
  const {
    name,
    defaultChecked
  } = props;
  const iconName = defaultChecked ? `check-box` : `check-box-outline-blank`;
  return _react.default.createElement("label", {
    className: `${BASE_CLASS} ${BASE_CLASS}--is-checkbox`
  }, _react.default.createElement("input", {
    className: `${BASE_CLASS}__control`,
    type: "checkbox",
    key: `${name}-${defaultChecked}`,
    name: name,
    defaultValue: "true",
    defaultChecked: defaultChecked
  }), _react.default.createElement(_svgIcons.Icon, {
    svgId: iconName
  }));
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TextareaAutoResize = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(67));

var _propTypes = _interopRequireDefault(__webpack_require__(69));

var Intl = _interopRequireWildcard(__webpack_require__(44));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BASE_CLASS = `textarea`;

class TextareaAutoResize extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      autoResize: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.el = _react.default.createRef();
  } // activate autoResize only if JS on client-side


  componentDidMount() {
    this.setState(prevState => ({
      autoResize: true
    }));
    this.recomputeTextareaSize();
  } //----- EVENTS


  handleChange(e) {
    const {
      props
    } = this;
    this.recomputeTextareaSize(); // execute original callback

    if (typeof props.onChange === `function`) props.onChange(e);
  } //----- UTILS
  // change textarea size if too much content
  // • https://maximilianhoffmann.com/posts/autoresizing-textareas


  recomputeTextareaSize() {
    const el = this.el.current;
    const originalRows = el.getAttribute(`rows`); // force a one-liner by default
    // • this make it easy to calculate the right height

    el.setAttribute(`rows`, `1`);
    el.style.height = `auto`;
    el.style.height = `${el.scrollHeight}px`;
    el.scrollTop = el.scrollHeight;
    el.setAttribute(`rows`, originalRows);
  }

  render() {
    const _this$props = this.props,
          {
      className,
      placeholder,
      onChange
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["className", "placeholder", "onChange"]);

    const {
      autoResize
    } = this.state;
    const COMP_CLASS = (0, _classnames.default)(className, {
      [BASE_CLASS]: true,
      [`${BASE_CLASS}--is-auto-resize`]: autoResize
    });
    const showPlaceholder = autoResize && placeholder;
    return _react.default.createElement("div", {
      className: COMP_CLASS
    }, _react.default.createElement("textarea", _extends({
      className: `${BASE_CLASS}__field`,
      onChange: this.handleChange,
      ref: this.el
    }, rest)), showPlaceholder && _react.default.createElement("p", {
      className: `${BASE_CLASS}__placeholder`
    }, _react.default.createElement(Intl.FormattedMessage, {
      id: placeholder
    })));
  }

}

exports.TextareaAutoResize = TextareaAutoResize;

_defineProperty(TextareaAutoResize, "propTypes", {
  placeHolder: _propTypes.default.string
});

var _default = TextareaAutoResize;
exports.default = _default;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _urlJoin = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(27));

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(25));

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var account = _interopRequireWildcard(__webpack_require__(51));

var _boarding = _interopRequireDefault(__webpack_require__(49));

var _form = _interopRequireDefault(__webpack_require__(65));

var _buttons = __webpack_require__(66);

var _field = __webpack_require__(70);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAIL_REDIRECT_URL = (0, _urlJoin.default)(_isomorphicConfig.default.HOST_URL, `/account/set-password`);

class Register extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true
    });
    this.props.register({
      body
    });
  }

  render() {
    const {
      props
    } = this;
    const titleProps = {
      id: `account.register.title`
    };
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_boarding.default, {
      title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
    }, _react.default.createElement(_form.default, {
      action: "/account/register",
      onSubmit: this.handleSubmit
    }, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.register.notice"
    })), _react.default.createElement("input", {
      type: "hidden",
      name: "redirectUrl",
      value: MAIL_REDIRECT_URL
    }), _react.default.createElement(_field.Input, {
      name: "email",
      label: "field.email",
      type: "email",
      defaultValue: ""
    }), _react.default.createElement(_buttons.Button, {
      type: "submit"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.register.button",
      defaultValue: "Create"
    })))));
  }

}

function dispatch2prop(dispatch) {
  return (0, _redux.bindActionCreators)({
    register: account.register
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(null, dispatch2prop)((0, _connectDataFetcher.default)({
  Component: Register,
  actionCreators: []
}));

exports.default = _default;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _queryString = _interopRequireDefault(__webpack_require__(24));

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var account = _interopRequireWildcard(__webpack_require__(51));

var _boarding = _interopRequireDefault(__webpack_require__(49));

var _form = _interopRequireDefault(__webpack_require__(65));

var _buttons = __webpack_require__(66);

var _field = __webpack_require__(70);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetPassword extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      token: _queryString.default.parse(props.location.search).token
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true
    });
    this.props.setPassword({
      body
    });
  }

  render() {
    const {
      props,
      state
    } = this;
    const titleProps = {
      id: `account.set-password.title`
    };
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_boarding.default, {
      title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
    }, _react.default.createElement(_form.default, {
      id: "new-password",
      action: "/account/reset",
      onSubmit: this.handleSubmit
    }, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.reset.notice"
    })), _react.default.createElement("input", {
      type: "hidden",
      name: "token",
      defaultValue: state.token
    }), _react.default.createElement(_field.Input, {
      name: "password",
      type: "password",
      label: "field.password",
      defaultValue: ""
    }), _react.default.createElement(_buttons.Button, {
      type: "submit"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.set-password.button"
    })))));
  }

}

function dispatch2prop(dispatch) {
  return (0, _redux.bindActionCreators)({
    setPassword: account.setPassword
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(null, dispatch2prop)((0, _connectDataFetcher.default)({
  Component: SetPassword,
  actionCreators: []
}));

exports.default = _default;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _urlJoin = _interopRequireDefault(__webpack_require__(22));

var _react = _interopRequireDefault(__webpack_require__(27));

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(25));

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var account = _interopRequireWildcard(__webpack_require__(51));

var _boarding = _interopRequireDefault(__webpack_require__(49));

var _form = _interopRequireDefault(__webpack_require__(65));

var _buttons = __webpack_require__(66);

var _field = __webpack_require__(70);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAIL_REDIRECT_URL = (0, _urlJoin.default)(_isomorphicConfig.default.HOST_URL, `/account/reset`);

class Forgot extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true
    });
    this.props.forgot({
      body
    });
  }

  render() {
    const {
      props
    } = this;
    const titleProps = {
      id: `account.forgot.title`
    };
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_boarding.default, {
      title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
    }, _react.default.createElement(_form.default, {
      id: "forgot",
      action: "/account/forgot",
      onSubmit: this.handleSubmit
    }, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.forgot.notice"
    })), _react.default.createElement("input", {
      type: "hidden",
      name: "redirectUrl",
      value: MAIL_REDIRECT_URL
    }), _react.default.createElement(_field.Input, {
      name: "email",
      label: "field.email",
      type: "email",
      defaultValue: ""
    }), _react.default.createElement(_buttons.Button, {
      type: "submit"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.forgot.button"
    })))));
  }

}

function dispatch2prop(dispatch) {
  return (0, _redux.bindActionCreators)({
    forgot: account.forgot
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(null, dispatch2prop)((0, _connectDataFetcher.default)({
  Component: Forgot,
  actionCreators: []
}));

exports.default = _default;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _queryString = _interopRequireDefault(__webpack_require__(24));

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var account = _interopRequireWildcard(__webpack_require__(51));

var _boarding = _interopRequireDefault(__webpack_require__(49));

var _form = _interopRequireDefault(__webpack_require__(65));

var _buttons = __webpack_require__(66);

var _field = __webpack_require__(70);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Reset extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      token: _queryString.default.parse(props.location.search).token
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true
    });
    this.props.reset({
      body
    });
  }

  render() {
    const {
      props,
      state
    } = this;
    const titleProps = {
      id: `account.reset.title`
    };
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_boarding.default, {
      title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
    }, _react.default.createElement(_form.default, {
      id: "login",
      action: "/account/reset",
      onSubmit: this.handleSubmit
    }, _react.default.createElement("p", null, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.reset.notice",
      defaultValue: "Set your new password here"
    })), _react.default.createElement("input", {
      type: "hidden",
      name: "token",
      defaultValue: state.token
    }), _react.default.createElement(_field.Input, {
      name: "password",
      type: "password",
      label: "field.password",
      defaultValue: ""
    }), _react.default.createElement(_buttons.Button, {
      type: "submit"
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "account.reset.button",
      defaultValue: "reset password"
    })))));
  }

}

function dispatch2prop(dispatch) {
  return (0, _redux.bindActionCreators)({
    reset: account.reset
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(null, dispatch2prop)((0, _connectDataFetcher.default)({
  Component: Reset,
  actionCreators: []
}));

exports.default = _default;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var customers = _interopRequireWildcard(__webpack_require__(61));

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var _settings = _interopRequireWildcard(__webpack_require__(79));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EditProfile(props) {
  const titleProps = {
    id: `page.settings`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonSubmit, {
    formId: _settings.FORM_ID,
    isSaving: props.isSaving,
    label: "configuration.button.save"
  })), _react.default.createElement(_settings.default, props));
}

function state2prop(state) {
  return {
    isSaving: state.account.get(`isSaving`)
  };
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: EditProfile,
  actionCreators: []
}));

exports.default = _default;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavSecondary = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `nav-secondary`;

class NavSecondary extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isStuck: false
    };
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  componentDidMount() {
    this.observeIntersection();
  }

  componentWillUnmount() {
    this.unobserveIntersection();
  } //----- EVENTS


  handleIntersection(entries) {
    const sentinelEntry = entries[0];
    const isStuck = sentinelEntry.intersectionRatio === 0;
    this.setState(prevState => {
      return {
        isStuck
      };
    });
  } //----- UTILS


  observeIntersection() {
    if (!window.IntersectionObserver) return;
    const {
      wrapper
    } = this;
    if (!wrapper) return;
    const sentinel = document.createElement(`div`);
    sentinel.classList.add(`${BASE_CLASS}__sentinel`);
    wrapper.insertBefore(sentinel, wrapper.firstChild);
    this.observer = new IntersectionObserver(this.handleIntersection);
    this.observer.observe(sentinel);
  }

  unobserveIntersection() {
    if (!window.IntersectionObserver) return;
    this.observer.disconnect();
  }

  render() {
    const {
      title,
      children
    } = this.props;
    const {
      isStuck
    } = this.state;
    const stickyClass = [`${BASE_CLASS}__sticky`];
    if (isStuck) stickyClass.push(`${stickyClass[0]}--is-stuck`);
    return _react.default.createElement("header", {
      className: BASE_CLASS,
      ref: el => this.wrapper = el
    }, _react.default.createElement("div", {
      className: stickyClass.join(' ')
    }, title && _react.default.createElement("h2", {
      className: `${BASE_CLASS}__title`
    }, title), children && _react.default.createElement("div", {
      className: `${BASE_CLASS}__actions`
    }, children)));
  }

}

exports.NavSecondary = NavSecondary;
var _default = NavSecondary;
exports.default = _default;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonList = ButtonList;
exports.ButtonPreview = ButtonPreview;
exports.Print = exports.ButtonPrint = ButtonPrint;
exports.ButtonEdit = ButtonEdit;
exports.New = exports.ButtonNew = ButtonNew;
exports.ButtonSubmit = ButtonSubmit;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var _buttons = __webpack_require__(66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function ButtonList(props) {
  const {
    type
  } = props,
        rest = _objectWithoutProperties(props, ["type"]);

  return _react.default.createElement(_buttons.BtnIcon, _extends({
    secondary: true,
    to: `/${props.type}`,
    svgId: "view-list"
  }, rest));
}

function ButtonPreview(props) {
  const {
    type,
    id
  } = props,
        rest = _objectWithoutProperties(props, ["type", "id"]);

  return _react.default.createElement(_buttons.BtnIcon, _extends({
    secondary: true,
    to: `/${type}/${id}/preview`,
    svgId: "receipt"
  }, rest));
}

function ButtonPrint(props) {
  return _react.default.createElement(_buttons.BtnIcon, _extends({
    secondary: true,
    svgId: "print",
    onClick: event => window.print(),
    label: "_.print"
  }, props));
}

function ButtonEdit(props) {
  const {
    type,
    document
  } = props,
        rest = _objectWithoutProperties(props, ["type", "document"]);

  const isArchived = document.get(`archivedAt`);
  if (isArchived) return null;
  const id = document.get(`id`);
  return _react.default.createElement(_buttons.BtnIcon, _extends({
    to: `/${type}/${id}`,
    svgId: "edit"
  }, rest));
}

function ButtonNew(props) {
  const {
    type,
    icon,
    message
  } = props,
        others = _objectWithoutProperties(props, ["type", "icon", "message"]);

  const iconId = type === `customers` ? `person-add` : `note-add`;
  const renderProps = {
    to: `/${type}/new`
  };
  if (icon) return _react.default.createElement(_buttons.BtnIcon, _extends({}, renderProps, {
    svgId: iconId
  }, others));
  return _react.default.createElement(_buttons.Button, _extends({}, renderProps, others), _react.default.createElement(_reactIntl.FormattedMessage, {
    id: message
  }));
}

function ButtonSubmit(props) {
  const {
    isSaving,
    formId
  } = props,
        rest = _objectWithoutProperties(props, ["isSaving", "formId"]);

  const iconId = isSaving ? `block` : `save`;
  return _react.default.createElement(_buttons.BtnIcon, _extends({
    form: formId,
    disabled: isSaving,
    type: "submit",
    svgId: iconId
  }, rest));
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FORM_ID = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var account = _interopRequireWildcard(__webpack_require__(51));

var _getInputValue = __webpack_require__(80);

var _form = __webpack_require__(65);

var _settings = _interopRequireDefault(__webpack_require__(82));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FORM_ID = `setting-form`;
exports.FORM_ID = FORM_ID;

class SettingForm extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.user
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const user = prevState.formData;
    const next = nextProps.user;
    const {
      isSaving
    } = nextProps;
    if (isSaving) return null; // update state on redux status change

    if (user === next) return null;
    return {
      formData: next
    };
  } //----- EVENTS


  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true,
      empty: true
    });
    this.props.updateSettings({
      body
    });
  }

  handleFormChange(event) {
    const {
      name,
      value
    } = (0, _getInputValue.getInputValue)(event.target);
    this.setState(prevState => {
      const updated = prevState.formData.set(name, value);
      return {
        formData: updated
      };
    });
  } //----- RENDER


  render() {
    const {
      formData
    } = this.state;
    const {
      isSaving
    } = this.props;
    const renderProps = {
      formData
    };
    return _react.default.createElement(_form.Form, {
      id: `${FORM_ID}`,
      action: `/account/settings`,
      isSaving: isSaving,
      onChange: this.handleFormChange,
      onSubmit: this.handleSubmit
    }, _react.default.createElement("input", {
      type: "hidden",
      name: "id",
      value: formData.get(`id`)
    }), _react.default.createElement("input", {
      type: "hidden",
      name: "quotationConfig[id]",
      value: formData.get(`quotationConfig.id`)
    }), _react.default.createElement("input", {
      type: "hidden",
      name: "invoiceConfig[id]",
      value: formData.get(`invoiceConfig.id`)
    }), _react.default.createElement("input", {
      type: "hidden",
      name: "productConfig[id]",
      value: formData.get(`productConfig.id`)
    }), _react.default.createElement(_settings.default, renderProps));
  }

}

function state2props(state) {
  return {
    user: state.account.get(`user`),
    isSaving: state.account.get(`isSaving`)
  };
}

function dispatch2props(dispatch) {
  return (0, _redux.bindActionCreators)({
    updateSettings: account.updateSettings
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(state2props, dispatch2props)(SettingForm);

exports.default = _default;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputValue = getInputValue;

var _computeTotal = __webpack_require__(81);

function getInputValue(target) {
  const {
    name,
    checked,
    type
  } = target;
  const value = type === `checkbox` ? checked : type === `number` ? (0, _computeTotal.enforceNumber)(target.value) : target.value;
  return {
    name,
    value
  };
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundToNearestQuarter = roundToNearestQuarter;
exports.enforceNumber = enforceNumber;
exports.productTotal = productTotal;
exports.totals = totals;

var _crio = _interopRequireDefault(__webpack_require__(52));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function roundToNearestQuarter(number) {
  const rounded = Math.round(number * 4) / 4;
  return parseFloat(rounded.toFixed(2), 10);
}

function enforceNumber(number) {
  number = typeof number !== `number` ? parseFloat(number, 10) : number;
  return isNaN(number) ? 0 : number;
}

function productTotal(product) {
  if (!product.checked) return 0; // don't mutate product

  const cleanedProduct = {};
  [`quantity`, `price`].forEach(key => {
    cleanedProduct[key] = enforceNumber(product[key]);
  });
  const {
    quantity,
    price
  } = cleanedProduct;
  return roundToNearestQuarter(quantity * price);
}

function totals(document) {
  const {
    products,
    tax = 0
  } = document;
  if (!_crio.default.isArray(products)) return document;
  const taxRate = enforceNumber(tax);
  const totalNet = products.reduce((acc, product) => acc + productTotal(product), 0);
  const totalTax = roundToNearestQuarter(totalNet * taxRate / 100);
  const total = totalNet + totalTax;
  return {
    totalNet,
    totalTax,
    total
  };
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SettingFormPres;
exports.FORM_ID = exports.BASE_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _crio = _interopRequireDefault(__webpack_require__(52));

var Intl = _interopRequireWildcard(__webpack_require__(44));

var compute = _interopRequireWildcard(__webpack_require__(81));

var Paper = _interopRequireWildcard(__webpack_require__(83));

var Tabs = _interopRequireWildcard(__webpack_require__(86));

var Field = _interopRequireWildcard(__webpack_require__(70));

var _alerts = __webpack_require__(87);

var _buttons = __webpack_require__(66);

var _form = __webpack_require__(65);

var _products = __webpack_require__(88);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BASE_CLASS = `setting-form`;
exports.BASE_CLASS = BASE_CLASS;
const FORM_ID = BASE_CLASS;
exports.FORM_ID = FORM_ID;
const customerExample = {
  name: `Customer name`,
  address: `123 6th St.
__Melbourne, FL 32904__
AUSTRALIA`
};
const currencies = [{
  value: `USD`,
  label: `USD`
}, {
  value: `EUR`,
  label: `EUR`
}];
const languages = [{
  value: `fr`,
  label: `français`
}, {
  value: `en`,
  label: `english`
}];

function SettingFormPres(props) {
  const {
    formData
  } = props;
  const {
    quotationConfig,
    invoiceConfig,
    productConfig
  } = formData;
  const fakeQuotationReference = {
    type: `quotation`,
    product: {
      updatedAt: new Date().toUTCString(),
      reference: `${quotationConfig.prefix}${quotationConfig.startAt}`
    }
  };
  const fakeInvoiceReference = {
    type: `invoice`,
    product: {
      updatedAt: new Date().toUTCString(),
      reference: `${invoiceConfig.prefix}${invoiceConfig.startAt}`
    }
  };
  let fakeDocument = (0, _crio.default)({
    products: [{
      checked: true,
      description: `a __product__ example`,
      quantity: 2,
      price: productConfig.price
    }, _objectSpread({
      checked: true
    }, productConfig)],
    tax: quotationConfig.tax
  });
  fakeDocument = fakeDocument.merge(null, compute.totals(fakeDocument));
  return _react.default.createElement(Tabs.Wrapper, null, _react.default.createElement(Tabs.List, null, _react.default.createElement(Tabs.Tab, null, _react.default.createElement(Intl.FormattedMessage, {
    id: "configuration.tab.from"
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(Intl.FormattedMessage, {
    id: "configuration.tab.default-product"
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(Intl.FormattedMessage, {
    id: "configuration.tab.mentions"
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(Intl.FormattedMessage, {
    id: "configuration.tab.reference"
  }))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement("div", {
    className: `${BASE_CLASS}__user`
  }, _react.default.createElement(Field.Select, {
    name: "lang",
    label: "field.language",
    value: formData.lang,
    options: languages
  }), _react.default.createElement(Field.Select, {
    name: "currency",
    label: "field.currency",
    value: formData.currency,
    options: currencies
  }), _react.default.createElement(Paper.Sheet, {
    part: "top-left"
  }, _react.default.createElement(Paper.Party, {
    title: "from",
    people: formData
  })), _react.default.createElement("div", {
    className: `${BASE_CLASS}__user-form`
  }, _react.default.createElement(Field.Input, {
    name: "name",
    label: "field.name",
    value: formData.name
  }), _react.default.createElement(Field.Textarea, {
    name: "address",
    label: "field.address",
    value: formData.address
  })))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement("div", {
    className: `${BASE_CLASS}__product`
  }, _react.default.createElement("div", {
    className: `${BASE_CLASS}__product-form`
  }, _react.default.createElement(Field.Input, {
    name: "productConfig[quantity]",
    label: "field.quantity",
    type: "number",
    value: productConfig.quantity
  }), _react.default.createElement(Field.Input, {
    name: "productConfig[price]",
    label: "field.default-price",
    type: "number",
    value: productConfig.price
  }), _react.default.createElement(Field.Input, {
    name: "quotationConfig[tax]",
    label: "field.tax",
    type: "number",
    value: quotationConfig.tax
  })), _react.default.createElement(_products.ProductTable, {
    readOnly: true,
    document: fakeDocument
  }))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement("div", {
    className: `${BASE_CLASS}__mentions`
  }, _react.default.createElement(Field.Textarea, {
    name: "quotationConfig[mentions]",
    label: "configuration.mentions.quotations",
    value: quotationConfig.mentions
  }), _react.default.createElement(Paper.Sheet, {
    part: "bottom"
  }, _react.default.createElement(Paper.Mentions, {
    content: quotationConfig.mentions
  })), _react.default.createElement(Field.Textarea, {
    name: "invoiceConfig[mentions]",
    label: "configuration.mentions.invoices",
    value: invoiceConfig.mentions
  }), _react.default.createElement(Paper.Sheet, {
    part: "bottom"
  }, _react.default.createElement(Paper.Mentions, {
    content: invoiceConfig.mentions
  })))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement(_alerts.Alert, {
    danger: true
  }, _react.default.createElement(Intl.FormattedHTMLMessage, {
    id: "configuration.reference.warning"
  })), _react.default.createElement("div", {
    className: `${BASE_CLASS}__references`
  }, _react.default.createElement("dl", {
    className: `${BASE_CLASS}__references-section`
  }, _react.default.createElement("dt", {
    className: `${BASE_CLASS}__sub-title`
  }, _react.default.createElement(Intl.FormattedMessage, {
    id: "page.quotations"
  })), _react.default.createElement("dd", {
    className: `${BASE_CLASS}__references-content`
  }, _react.default.createElement("div", {
    className: `${BASE_CLASS}__references-form`
  }, _react.default.createElement(Field.Input, {
    name: "quotationConfig[prefix]",
    label: "field.prefix",
    value: quotationConfig.prefix
  }), _react.default.createElement(Field.Input, {
    name: "quotationConfig[startAt]",
    label: "field.start-at",
    value: quotationConfig.startAt,
    type: "number",
    min: "0",
    step: "1"
  })), _react.default.createElement(Paper.Sheet, {
    part: "top-right"
  }, _react.default.createElement(Paper.Reference, fakeQuotationReference)))), _react.default.createElement("dl", {
    className: `${BASE_CLASS}__references-section`
  }, _react.default.createElement("dt", {
    className: `${BASE_CLASS}__sub-title`
  }, _react.default.createElement(Intl.FormattedMessage, {
    id: "page.invoices"
  })), _react.default.createElement("dd", {
    className: `${BASE_CLASS}__references-content`
  }, _react.default.createElement("div", {
    className: `${BASE_CLASS}__references-form`
  }, _react.default.createElement(Field.Input, {
    name: "invoiceConfig[prefix]",
    label: "field.prefix",
    value: invoiceConfig.prefix
  }), _react.default.createElement(Field.Input, {
    name: "invoiceConfig[startAt]",
    label: "field.start-at",
    value: invoiceConfig.startAt,
    type: "number",
    min: "0",
    step: "1"
  })), _react.default.createElement(Paper.Sheet, {
    part: "top-right"
  }, _react.default.createElement(Paper.Reference, fakeInvoiceReference)))))), _react.default.createElement(_form.FormActions, null, _react.default.createElement(_buttons.Button, {
    type: "submit"
  }, _react.default.createElement(Intl.FormattedMessage, {
    id: "configuration.button.save"
  }))));
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sheet = exports.PaperSheet = PaperSheet;
exports.Reference = Reference;
exports.Between = Between;
exports.Party = Party;
exports.Subject = Subject;
exports.Mentions = Mentions;
exports.User = exports.PartyUser = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var _reactRedux = __webpack_require__(32);

var _format = __webpack_require__(84);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `paper-sheet`;

function PaperSheet(props) {
  const {
    part,
    preview
  } = props;
  const className = [BASE_CLASS];
  if (part) className.push(`${BASE_CLASS}--part-${part}`);
  if (preview) className.push(`${BASE_CLASS}--preview-mode`);
  return _react.default.createElement("div", {
    className: className.join(` `)
  }, props.children);
}

function Reference(props) {
  const {
    type,
    product
  } = props;
  const {
    updatedAt,
    reference
  } = product;
  const REF_CLASS = `${BASE_CLASS}__reference`;
  return _react.default.createElement("header", {
    className: REF_CLASS
  }, _react.default.createElement("h3", {
    className: `${REF_CLASS}-type`
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: `paper-sheet.reference.${type}`
  })), _react.default.createElement("h4", {
    className: `${REF_CLASS}-id`
  }, "Ref. ", reference), _react.default.createElement("p", {
    className: `${REF_CLASS}-date`
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: `paper-sheet.reference.date`
  }), _react.default.createElement(_format.Day, {
    value: updatedAt
  })));
}

function Between(props) {
  return _react.default.createElement("div", {
    className: `${BASE_CLASS}__between`
  }, props.children);
}

function Party(props) {
  const {
    title,
    people = {}
  } = props;
  const PARTY_CLASS = `${BASE_CLASS}__party`;
  const address = people.address;
  return _react.default.createElement("aside", {
    className: `${PARTY_CLASS}`
  }, _react.default.createElement("p", {
    className: `${PARTY_CLASS}-title`
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: `paper-sheet.party.${title}`
  })), _react.default.createElement("h4", {
    className: `${PARTY_CLASS}-name`
  }, people.name ? people.name : _react.default.createElement("p", {
    className: `${PARTY_CLASS}-address ${PARTY_CLASS}-name--empty`
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: `paper-sheet.party.no-name.${title}`
  }))), address ? _react.default.createElement(_format.Markdown, {
    text: address
  }) : _react.default.createElement("p", {
    className: `${PARTY_CLASS}-address ${PARTY_CLASS}-address--empty`
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: `paper-sheet.party.no-address.${title}`
  })));
}

const PartyUser = (0, _reactRedux.connect)(state => ({
  user: state.account.get(`user`)
}))(props => _react.default.createElement(Party, {
  title: "from",
  people: props.user
}));
exports.User = exports.PartyUser = PartyUser;

function Subject(props) {
  const COMP_CLASS = `${BASE_CLASS}__subject`;
  return _react.default.createElement("div", {
    className: COMP_CLASS
  }, _react.default.createElement("span", {
    className: `${COMP_CLASS}-title`
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "paper-sheet.subject"
  })), _react.default.createElement("span", {
    className: `${COMP_CLASS}-content`
  }, props.value));
}

function Mentions(props) {
  const {
    content
  } = props;
  const MENTIONS_CLASS = `${BASE_CLASS}__mentions`;
  return _react.default.createElement("div", {
    className: `${MENTIONS_CLASS}`
  }, _react.default.createElement(_format.Markdown, {
    text: content
  }));
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmountPres = AmountPres;
exports.Num = exports.FormatNumber = FormatNumber;
exports.Percent = Percent;
exports.Day = Day;
exports.Markdown = Markdown;
exports.Amount = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _propTypes = _interopRequireDefault(__webpack_require__(69));

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _marked = _interopRequireDefault(__webpack_require__(85));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `format`;

function parseValue(value) {
  const parsed = parseFloat(value, 10);
  return Number.isFinite(value) ? value : !Number.isNaN(parsed) ? parsed : null;
} // react-intl doc
// • https://github.com/yahoo/react-intl/wiki/Components#formatteddate
// • https://github.com/yahoo/react-intl/wiki/Components#formattednumber


function AmountPres(props) {
  const {
    value,
    currency
  } = props,
        others = _objectWithoutProperties(props, ["value", "currency"]);

  others.style = `currency`;
  const safeValue = parseValue(value);
  return _react.default.createElement("span", {
    className: `${BASE_CLASS} ${BASE_CLASS}--currency`
  }, safeValue === null ? `–` : _react.default.createElement(_reactIntl.FormattedNumber, _extends({
    value: value,
    currency: currency
  }, others)));
}

const Amount = (0, _reactRedux.connect)(state => ({
  currency: state.account.get(`user.currency`)
}))(AmountPres);
exports.Amount = Amount;
Amount.propTypes = {
  value: _propTypes.default.number
};

function FormatNumber(props) {
  const {
    value,
    wrapperProps = {}
  } = props,
        others = _objectWithoutProperties(props, ["value", "wrapperProps"]);

  const safeValue = parseValue(value);
  return _react.default.createElement("span", _extends({
    className: `${BASE_CLASS} ${BASE_CLASS}--number`
  }, wrapperProps), safeValue === null ? `–` : _react.default.createElement(_reactIntl.FormattedNumber, _extends({
    value: value
  }, others)));
}

function Percent(props) {
  const {
    value,
    className
  } = props,
        others = _objectWithoutProperties(props, ["value", "className"]);

  others.style = `percent`;
  const safeValue = parseValue(value);
  const COMP_CLASS = [BASE_CLASS, `${BASE_CLASS}--percent`];
  if (className) COMP_CLASS.push(className);
  return _react.default.createElement("p", {
    className: COMP_CLASS.join(` `)
  }, safeValue === null ? `–` : _react.default.createElement(_reactIntl.FormattedNumber, _extends({
    value: value
  }, others)));
}

function Day(props) {
  if (!props.value) return _react.default.createElement("span", null, "\u2013");
  return _react.default.createElement(_reactIntl.FormattedDate, {
    value: props.value
  });
}

Day.propTypes = {
  value: _propTypes.default.string
};

function Markdown(props) {
  const {
    text
  } = props;
  const isText = typeof text === `string`;

  const __html = isText ? (0, _marked.default)(text, {
    breaks: true
  }) : ``;

  return _react.default.createElement("div", {
    className: "markdown",
    dangerouslySetInnerHTML: {
      __html
    }
  });
}

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.Tabs = Tabs;
exports.Header = exports.TabListHeader = TabListHeader;
exports.Tab = Tab;
exports.Panel = exports.TabPanel = TabPanel;
exports.List = exports.TabList = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BASE_CLASS = `tabs`;

function Tabs(props) {
  return _react.default.createElement("div", {
    className: BASE_CLASS
  }, props.children);
}

class TabList extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.tabsIds = [];
    this.makeTabs();
    this.state = {
      selected: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // we don't want the event to leak to main form
    event.stopPropagation(); // change tab ^^

    const {
      value
    } = event.target;
    this.setState(prevState => {
      return {
        selected: parseInt(value, 10)
      };
    });
  }

  makeTabs() {
    let count = 0;
    this.tabsContent = _react.default.Children.map(this.props.children, child => {
      const isTab = child.type === Tab;
      if (!isTab) return child;
      count = count + 1;
      const id = `tabs-${count}`;
      this.tabsIds.push(id);
      return _react.default.cloneElement(child, {
        htmlFor: id
      });
    });
  }

  render() {
    return _react.default.createElement(_react.default.Fragment, null, this.tabsIds.map((id, index) => _react.default.createElement("input", {
      className: `${BASE_CLASS}__input`,
      key: id,
      type: "radio",
      name: "tabs",
      value: index,
      id: id,
      checked: index === this.state.selected,
      onChange: this.handleChange
    })), _react.default.createElement("header", {
      className: `${BASE_CLASS}__list`
    }, this.tabsContent));
  }

}

exports.List = exports.TabList = TabList;

function TabListHeader(props) {
  return _react.default.createElement("div", {
    className: `${BASE_CLASS}__list_header`
  }, props.children);
}

function Tab(props) {
  return _react.default.createElement("label", _extends({
    className: `${BASE_CLASS}__list_tab`
  }, props), props.children);
}

function TabPanel(props) {
  return _react.default.createElement("section", {
    className: `${BASE_CLASS}__panel`
  }, props.children);
}

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = Alert;

var _react = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(67));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `alert`;

function Alert(props) {
  const {
    warning = false,
    danger = false,
    className
  } = props;
  const COMP_CLASS = (0, _classnames.default)(BASE_CLASS, {
    [`${BASE_CLASS}--warning`]: warning,
    [`${BASE_CLASS}--danger`]: danger
  }, className);
  return _react.default.createElement("div", {
    className: COMP_CLASS
  }, props.children);
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductLineEditable = ProductLineEditable;
exports.ProductLineDisplay = ProductLineDisplay;
exports.ProductTable = ProductTable;

var _react = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(67));

var _reactIntl = __webpack_require__(44);

var _propTypes = _interopRequireDefault(__webpack_require__(69));

var _crio = _interopRequireDefault(__webpack_require__(52));

var compute = _interopRequireWildcard(__webpack_require__(81));

var Format = _interopRequireWildcard(__webpack_require__(84));

var _field = __webpack_require__(70);

var _textareaAutoResize = __webpack_require__(71);

var _buttons = __webpack_require__(66);

var Table = _interopRequireWildcard(__webpack_require__(89));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// only use defaultValue
// • handleChange is handled globally at the form level
function ProductLineEditable(props) {
  const {
    product,
    isLast,
    index,
    handleRemove
  } = props;
  const fieldPath = `products[${index}]`;
  const total = compute.productTotal(product);
  return _react.default.createElement(Table.Row, null, _react.default.createElement(Table.Cell, null, !isLast && _react.default.createElement(_field.CheckBox, {
    name: `${fieldPath}[checked]`,
    defaultChecked: product.get(`checked`)
  })), _react.default.createElement(Table.Cell, null, _react.default.createElement("input", {
    type: "hidden",
    name: `${fieldPath}[_id]`,
    value: product.get(`_id`)
  }), _react.default.createElement(_textareaAutoResize.TextareaAutoResize, {
    name: `${fieldPath}[description]`,
    defaultValue: product.get(`description`),
    placeholder: "product.place-holder"
  })), _react.default.createElement(Table.Cell, null, _react.default.createElement("input", {
    type: "number",
    min: "0",
    step: "0.25",
    name: `${fieldPath}[quantity]`,
    defaultValue: product.get(`quantity`)
  })), _react.default.createElement(Table.Cell, null, _react.default.createElement("input", {
    type: "number",
    min: "0",
    step: "0.5",
    name: `${fieldPath}[price]`,
    defaultValue: product.get(`price`)
  })), _react.default.createElement(Table.Cell, null, _react.default.createElement(Format.Amount, {
    value: total
  })), _react.default.createElement(Table.Cell, null, !isLast && _react.default.createElement(_buttons.BtnIcon, {
    linkAlike: true,
    onClick: e => handleRemove(index, fieldPath),
    type: "button",
    svgId: "delete"
  })));
}

ProductLineEditable.propTypes = {
  index: _propTypes.default.number.isRequired,
  product: _propTypes.default.object.isRequired,
  isLast: _propTypes.default.bool.isRequired,
  handleRemove: _propTypes.default.func.isRequired
};

function ProductLineDisplay(props) {
  const {
    product
  } = props;
  if (!product.checked) return null;
  const total = compute.productTotal(product);
  return _react.default.createElement(Table.Row, null, _react.default.createElement(Table.Cell, null), _react.default.createElement(Table.Cell, {
    type: "text"
  }, _react.default.createElement(Format.Markdown, {
    text: product.description
  })), _react.default.createElement(Table.Cell, {
    type: "number"
  }, _react.default.createElement(Format.Num, {
    value: product.quantity,
    minimumFractionDigits: 2
  })), _react.default.createElement(Table.Cell, {
    type: "number"
  }, _react.default.createElement(Format.Num, {
    value: product.price,
    minimumFractionDigits: 2
  })), _react.default.createElement(Table.Cell, {
    type: "amount"
  }, _react.default.createElement(Format.Amount, {
    value: total
  })), _react.default.createElement(Table.Cell, null));
}

ProductLineDisplay.propTypes = {
  product: _propTypes.default.object.isRequired
};

function ProductTotalFooter(props) {
  const {
    readOnly,
    document
  } = props; // in readOnly mode we remove toggle/remove buttons

  const colSpan = readOnly ? 3 : 4;
  return _react.default.createElement(Table.Footer, null, _react.default.createElement(Table.RowFooter, null, _react.default.createElement(Table.Cell, {
    colSpan: colSpan,
    type: "number"
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "table.amount-ht"
  })), _react.default.createElement(Table.Cell, {
    type: "amount"
  }, _react.default.createElement(Format.Amount, {
    value: document.totalNet
  })), !readOnly && _react.default.createElement(Table.Cell, null)), _react.default.createElement(Table.RowFooter, null, _react.default.createElement(Table.Cell, {
    colSpan: colSpan,
    type: "number"
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "table.amount-taxes"
  })), _react.default.createElement(Table.Cell, {
    type: "amount"
  }, _react.default.createElement(Format.Amount, {
    value: document.totalTax
  })), !readOnly && _react.default.createElement(Table.Cell, null)), _react.default.createElement(Table.RowFooter, null, _react.default.createElement(Table.Cell, {
    colSpan: colSpan,
    type: "number"
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "table.amount"
  })), _react.default.createElement(Table.Cell, {
    type: "amount"
  }, _react.default.createElement(Format.Amount, {
    value: document.total
  })), !readOnly && _react.default.createElement(Table.Cell, null)));
}

ProductTotalFooter.propTypes = {
  document: _propTypes.default.object,
  readOnly: _propTypes.default.bool
};
const ProductsColumns = [{
  id: `toggle`,
  label: false,
  type: `checkbox`
}, {
  id: `description`,
  label: `table.header.description`,
  type: `input`
}, {
  id: `quantity`,
  label: `table.header.quantity`,
  type: `input number`
}, {
  id: `price`,
  label: `table.header.unit-price`,
  type: `input number`
}, {
  id: `amount`,
  label: `table.amount`,
  type: `amount`
}, {
  id: `remove`,
  label: false,
  type: `action`
}];

function ProductTable(props) {
  const {
    readOnly,
    document,
    handleRemove
  } = props;
  const products = document.get(`products`);
  if (!_crio.default.isArray(products)) return null;
  const hideColumns = readOnly ? [`toggle`, `remove`] : [];
  const COMP_CLASS = (0, _classnames.default)(`table--product`, {
    [`table--print`]: readOnly
  });
  const ProductLine = readOnly ? ProductLineDisplay : ProductLineEditable;
  const productsLength = products.length;
  return _react.default.createElement(Table.Wrapper, {
    columns: ProductsColumns,
    hideColumns: hideColumns,
    className: COMP_CLASS,
    footer: _react.default.createElement(ProductTotalFooter, props)
  }, products.map((product, index) => {
    return _react.default.createElement(ProductLine, {
      key: product._id,
      index: index,
      product: product,
      isLast: index === productsLength - 1,
      handleRemove: handleRemove
    });
  }));
}

ProductTable.defaultProps = {
  readOnly: false
};
ProductTable.propTypes = {
  document: _propTypes.default.object,
  readOnly: _propTypes.default.bool // handleRemove: PropTypes.function,

};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Footer = exports.TableFooter = TableFooter;
exports.RowFooter = RowFooter;
exports.Cell = Cell;
exports.Row = Row;
exports.EmptyLine = EmptyLine;
exports.computeSortQuery = computeSortQuery;
exports.default = exports.Wrapper = exports.Table = exports.PaginatedTable = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(67));

var _propTypes = _interopRequireDefault(__webpack_require__(69));

var _reactIntl = __webpack_require__(44);

var _reactRouterDom = __webpack_require__(29);

var _pagination = __webpack_require__(90);

var _header = __webpack_require__(91);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `table`; // Create a context for passing col types all down
// • we may have a wrapper around a row (like quotationRow)
//   this will make it hard to pass down those properties with a React.Children.map

const TableContext = _react.default.createContext({
  columns: [],
  hideColumns: []
});

function TableFooter(props) {
  return _react.default.createElement("tfoot", {
    className: `${BASE_CLASS}__footer`
  }, props.children);
}

function RowFooter(props) {
  return _react.default.createElement("tr", {
    className: `${BASE_CLASS}__footer_row`
  }, props.children);
}

function Cell(props) {
  const {
    type
  } = props,
        rest = _objectWithoutProperties(props, ["type"]);

  const currentType = type ? type : `text`;
  const COMP_CLASS = (0, _classnames.default)(`${BASE_CLASS}__cell`, currentType.split(` `).map(t => `${BASE_CLASS}__cell--is-${t}`));
  return _react.default.createElement("td", _extends({
    className: COMP_CLASS
  }, rest), props.children);
}

Cell.propTypes = {
  type: _propTypes.default.string
};

function Row(props) {
  return _react.default.createElement(TableContext.Consumer, null, ({
    columns,
    hideColumns
  }) => _react.default.createElement("tr", {
    className: `${BASE_CLASS}__body_row`
  }, _react.default.Children.map(props.children, (cell, index) => {
    const column = columns[index]; // filter hidden columns

    if (hideColumns.includes(column.id)) return null; // pass the right types to cell

    return _react.default.cloneElement(cell, {
      type: cell.props.type || columns[index].type
    });
  })));
}

function EmptyLine(props) {
  const {
    columns,
    hideColumns
  } = props;
  const colSpan = columns.filter(column => !hideColumns.includes(column.id)).length;
  return _react.default.createElement("tr", {
    className: `${BASE_CLASS}__body_row`
  }, _react.default.createElement(Cell, {
    colSpan: colSpan,
    type: "empty"
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "table.empty"
  })));
}

function computeSortQuery(currentSorting, sort) {
  const isSameSort = currentSorting.sort === sort;
  if (!isSameSort) return {
    sort,
    dir: `ASC`
  };
  const isAscDir = currentSorting.dir === `ASC`;
  if (isAscDir) return {
    sort,
    dir: `DESC`
  };
  return {};
}

class PaginatedTable extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sort: undefined,
      dir: undefined
    };
    this.handleSort = this.handleSort.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleSort(event, sort) {
    event.preventDefault();
    if (!sort) return;
    const {
      handlePageSort,
      match
    } = this.props;
    if (!handlePageSort) return;
    const query = computeSortQuery(this.state, sort);
    handlePageSort(_objectSpread({
      query
    }, match.params));
    this.setState(prevState => ({
      sort: query.sort,
      dir: query.dir
    }));
  } // always pass URL params to redux actions
  // • needed for example by /customers/quotations


  handlePrev(event) {
    event.preventDefault();
    const {
      meta,
      handlePageSort,
      match
    } = this.props;
    if (!handlePageSort) return;
    if (!meta.previousPage) return;
    handlePageSort(_objectSpread({
      query: _objectSpread({
        page: meta.previousPage
      }, this.state)
    }, match.params));
  }

  handleNext(event) {
    event.preventDefault();
    const {
      meta,
      handlePageSort,
      match
    } = this.props;
    if (!handlePageSort) return;
    if (!meta.nextPage) return;
    handlePageSort(_objectSpread({
      query: _objectSpread({
        page: meta.nextPage
      }, this.state)
    }, match.params));
  }

  render() {
    const {
      props,
      state
    } = this;
    const {
      className,
      presentation,
      handlePageSort,
      hideOnEmpty
    } = props;
    const hasRows = _react.default.Children.count(props.children) > 0;
    const hasFooter = props.footer != null;
    const hasMeta = props.meta != null;
    const COMP_CLASS = (0, _classnames.default)(BASE_CLASS, className, presentation ? `${BASE_CLASS}--presentation` : false);
    if (hideOnEmpty && !hasRows) return null;
    return _react.default.createElement("div", {
      className: COMP_CLASS
    }, _react.default.createElement("table", {
      cellSpacing: "0",
      className: `${BASE_CLASS}__content`
    }, props.title && _react.default.createElement("caption", {
      className: `${BASE_CLASS}__title`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: props.title
    })), _react.default.createElement(_header.Thead, {
      columns: props.columns,
      hideColumns: props.hideColumns,
      handleSort: this.handleSort,
      sort: state.sort,
      dir: state.dir
    }), _react.default.createElement(TableContext.Provider, {
      value: {
        columns: props.columns,
        hideColumns: props.hideColumns
      }
    }, _react.default.createElement("tbody", {
      className: `${BASE_CLASS}__body`
    }, hasRows ? props.children : _react.default.createElement(EmptyLine, {
      columns: props.columns,
      hideColumns: props.hideColumns
    }))), hasFooter && props.footer), hasMeta && _react.default.createElement(_pagination.Pagination, {
      meta: props.meta,
      handlePrev: this.handlePrev,
      handleNext: this.handleNext
    }));
  }

} // we need to have access to the router
// • the redux actions may need to access to route params


exports.PaginatedTable = PaginatedTable;

_defineProperty(_defineProperty(PaginatedTable, "defaultProps", {
  hideColumns: []
}), "propTypes", {
  columns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  hideColumns: _propTypes.default.arrayOf(_propTypes.default.string),
  hideOnEmpty: _propTypes.default.bool,
  meta: _propTypes.default.object,
  handlePageSort: _propTypes.default.func,
  footer: _propTypes.default.element
});

const Table = (0, _reactRouterDom.withRouter)(PaginatedTable);
exports.Wrapper = exports.Table = Table;
var _default = Table;
exports.default = _default;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = Pagination;

var _react = _interopRequireDefault(__webpack_require__(27));

var _crio = _interopRequireDefault(__webpack_require__(52));

var _classnames = _interopRequireDefault(__webpack_require__(67));

var _reactIntl = __webpack_require__(44);

var _svgIcons = __webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `table__pagination`;
const ACTION_CLASS = `${BASE_CLASS}_action`;
const emptyPagination = (0, _crio.default)({
  start: `-`,
  end: `-`,
  total: `-`
});

function Pagination(props) {
  const {
    meta,
    handlePrev,
    handleNext
  } = props;
  const PREV_CLASS = (0, _classnames.default)(ACTION_CLASS, `${ACTION_CLASS}--prev`, meta.previousPage ? false : `${ACTION_CLASS}--disabled`);
  const NEXT_CLASS = (0, _classnames.default)(ACTION_CLASS, `${ACTION_CLASS}--next`, meta.nextPage ? false : `${ACTION_CLASS}--disabled`); // be sure to feed the a pagination to I18N
  // https://github.com/Hiswe/a-count/issues/65

  const pagination = emptyPagination.merge(null, meta);
  return _react.default.createElement("footer", {
    className: `${BASE_CLASS}`
  }, _react.default.createElement("div", {
    className: `${BASE_CLASS}_rows`
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "table.rows-per-page"
  }), _react.default.createElement("span", {
    className: `${BASE_CLASS}_rows-per-page`
  }, meta.limit)), _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "table.pagination",
    values: pagination
  }), _react.default.createElement("div", {
    className: `${BASE_CLASS}_actions`
  }, _react.default.createElement("div", {
    onClick: handlePrev,
    className: PREV_CLASS
  }, _react.default.createElement(_svgIcons.Icon, {
    svgId: "chevron-left"
  })), _react.default.createElement("div", {
    onClick: handleNext,
    className: NEXT_CLASS
  }, _react.default.createElement(_svgIcons.Icon, {
    svgId: "chevron-right"
  }))));
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thead = Thead;

var _react = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(67));

var _reactIntl = __webpack_require__(44);

var _reactRouterDom = __webpack_require__(29);

var _svgIcons = __webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `table__head`;

function Th(props) {
  const {
    column,
    onClick,
    isSorted,
    dir
  } = props;

  const {
    label,
    sort,
    type
  } = column,
        rest = _objectWithoutProperties(column, ["label", "sort", "type"]);

  const safeType = type ? type : `text`;
  const COMP_CLASS = (0, _classnames.default)(`${BASE_CLASS}_col`, safeType.split(` `).map(t => `${BASE_CLASS}_col--is-${t}`));
  return _react.default.createElement("th", _extends({
    onClick: onClick,
    className: COMP_CLASS
  }, rest), isSorted && _react.default.createElement(_svgIcons.Icon, {
    svgId: dir === `ASC` ? `arrow-upward` : `arrow-downward`
  }), label && _react.default.createElement(_reactIntl.FormattedMessage, {
    id: label.trim()
  }));
}

function Thead(props) {
  const {
    columns,
    hideColumns,
    handleSort,
    sort,
    dir
  } = props;
  return _react.default.createElement("thead", {
    className: BASE_CLASS
  }, _react.default.createElement("tr", {
    className: `${BASE_CLASS}_row`
  }, columns.map((column, index) => {
    if (hideColumns.includes(column.id)) return null;
    return _react.default.createElement(Th, {
      key: index,
      column: column,
      isSorted: column.sort && sort === column.sort,
      dir: dir,
      onClick: !column.sort ? null : event => handleSort(event, column.sort)
    });
  })));
}

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var account = _interopRequireWildcard(__webpack_require__(51));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var invoices = _interopRequireWildcard(__webpack_require__(60));

var _secondary = __webpack_require__(77);

var _secondaryButtons = __webpack_require__(78);

var _main = __webpack_require__(93);

var _list = __webpack_require__(94);

var _list2 = __webpack_require__(97);

var _charts = __webpack_require__(99);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Home(props) {
  const {
    statistics,
    quotationsReadyToInvoice,
    invoices
  } = props;
  const titleProps = {
    id: `page.home`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.NavSecondary, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonNew, {
    type: "quotations",
    message: "quotation.button.new"
  })), _react.default.createElement(_main.Main, null, _react.default.createElement(_main.Content, null, _react.default.createElement(_charts.HomeCharts, {
    statistics: statistics
  }), _react.default.createElement(_list2.ActiveQuotations, {
    title: "page.quotations"
  }), _react.default.createElement(_list2.QuotationsReadyToInvoice, null), _react.default.createElement(_list.ActiveInvoices, {
    title: "page.invoices"
  }))));
}

function state2props(state) {
  return {
    statistics: state.account.get(`statistics`)
  };
}

var _default = (0, _reactRedux.connect)(state2props)((0, _connectDataFetcher.default)({
  Component: Home,
  actionCreators: [quotations.listActive, quotations.listReadyToInvoice, invoices.listActive, account.statistics]
}));

exports.default = _default;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.Main = Main;
exports.Meta = Meta;
exports.Content = Content;
exports.ContentActions = ContentActions;

var _react = _interopRequireDefault(__webpack_require__(27));

var _classnames = _interopRequireDefault(__webpack_require__(67));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `main`;

function Main(props) {
  const {
    withMeta,
    children
  } = props;
  const COMP_CLASS = (0, _classnames.default)({
    [BASE_CLASS]: true,
    [`${BASE_CLASS}--has-meta`]: _react.default.Children.count(children) > 1
  });
  return _react.default.createElement("main", {
    role: "main",
    className: COMP_CLASS
  }, props.children);
}

function Meta(props) {
  return _react.default.createElement("header", {
    className: `${BASE_CLASS}__meta`
  }, props.children);
}

function Content(props) {
  return _react.default.createElement("article", {
    className: `${BASE_CLASS}__content`
  }, props.children);
}

function ContentActions(props) {
  return _react.default.createElement("div", {
    className: `${BASE_CLASS}__content_actions`
  }, props.children);
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerInvoices = exports.ArchivedInvoices = exports.ActiveInvoices = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRouterDom = __webpack_require__(29);

var _reactRedux = __webpack_require__(32);

var _redux = __webpack_require__(31);

var invoices = _interopRequireWildcard(__webpack_require__(60));

var _uiTable = __webpack_require__(89);

var _format = __webpack_require__(84);

var _progress = __webpack_require__(95);

var _buttons = __webpack_require__(96);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function InvoiceRow(props) {
  const {
    invoice
  } = props;
  const isArchived = invoice.get(`archivedAt`);
  const invoiceUrl = `${isArchived ? `/archives` : ``}/invoices/${invoice.id}`;
  return _react.default.createElement(_uiTable.Row, null, _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_reactRouterDom.Link, {
    to: invoiceUrl
  }, invoice.get(`reference`))), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_reactRouterDom.Link, {
    to: invoiceUrl
  }, invoice.get(`name`))), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_reactRouterDom.Link, {
    to: `/customers/${invoice.customerId}`
  }, invoice.get(`customer.name`))), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_reactRouterDom.Link, {
    to: `/quotations/${invoice.get('quotation.id')}/preview`
  }, invoice.get(`quotation.reference`))), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.Amount, {
    value: invoice.get(`total`)
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_progress.Progress, {
    tableLayout: true,
    value: invoice.get(`totalPaid`),
    max: invoice.get(`total`)
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_buttons.ArchiveInvoice, {
    icon: true,
    linkAlike: true,
    invoice: invoice
  })));
}

const invoiceColumns = [{
  id: `id`,
  label: `table.header.id`,
  sort: `index`,
  type: `id`
}, {
  id: `name`,
  label: `table.header.name`,
  sort: `name`,
  type: `text`
}, {
  id: `customer`,
  label: `table.header.customer`,
  sort: `customer.name`,
  type: `customer`
}, {
  id: `quotation`,
  label: `table.header.quotation`,
  sort: `quotation.index`,
  type: `id`
}, {
  id: `amount`,
  label: `table.amount`,
  sort: `total`,
  type: `amount`
}, {
  id: `paid`,
  label: `table.amount.paid`,
  sort: `totalPaid`,
  type: `progress`
}, {
  id: `archive`,
  label: false,
  sort: false,
  type: `action`
}];

function InvoiceList(props) {
  const {
    invoices = []
  } = props,
        others = _objectWithoutProperties(props, ["invoices"]);

  return _react.default.createElement(_uiTable.Table, _extends({
    presentation: true,
    columns: invoiceColumns
  }, others), invoices.map(invoice => _react.default.createElement(InvoiceRow, {
    key: invoice.id,
    invoice: invoice
  })));
}

const ActiveInvoices = (0, _reactRedux.connect)(state => ({
  invoices: state.invoices.get(`active`),
  meta: state.invoices.get(`meta.active`)
}), dispatch => (0, _redux.bindActionCreators)({
  handlePageSort: invoices.getAll
}, dispatch))(InvoiceList);
exports.ActiveInvoices = ActiveInvoices;
const ArchivedInvoices = (0, _reactRedux.connect)(state => ({
  invoices: state.invoices.get(`archived`),
  meta: state.invoices.get(`meta.archived`),
  hideColumns: [`archive`]
}), dispatch => (0, _redux.bindActionCreators)({
  handlePageSort: invoices.listArchived
}, dispatch))(InvoiceList);
exports.ArchivedInvoices = ArchivedInvoices;
const CustomerInvoices = (0, _reactRedux.connect)(state => ({
  invoices: state.invoices.get(`active`),
  meta: state.invoices.get(`meta.active`),
  hideColumns: [`customer`]
}), dispatch => (0, _redux.bindActionCreators)({
  handlePageSort: invoices.listForCustomer
}, dispatch))(InvoiceList);
exports.CustomerInvoices = CustomerInvoices;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = Progress;

var _react = _interopRequireDefault(__webpack_require__(27));

var _format = __webpack_require__(84);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `progress`;

function Progress(props) {
  const {
    max,
    value,
    tableLayout
  } = props;
  const percent = value / max;
  const cssPercent = Math.max(0, Math.min(100, percent * 100));
  const width = Number.isNaN(cssPercent) ? `0` : `${cssPercent}%`;
  const COMP_CLASS = [BASE_CLASS];
  if (tableLayout) COMP_CLASS.push(`${BASE_CLASS}--table-layout`);
  return _react.default.createElement("dl", {
    className: COMP_CLASS.join(` `)
  }, _react.default.createElement("dt", {
    className: `${BASE_CLASS}__label`
  }, _react.default.createElement(_format.Percent, {
    value: percent
  })), _react.default.createElement("dd", {
    className: `${BASE_CLASS}__bar`,
    style: {
      width
    }
  }));
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchiveInvoice = exports.ShowQuotation = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var invoices = _interopRequireWildcard(__webpack_require__(60));

var _buttons = __webpack_require__(66);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

//----- SHOW QUOTATION
function ButtonShowQuotation(props) {
  const {
    quotationId,
    isSaving
  } = props;
  if (!quotationId) return null;
  return _react.default.createElement(_buttons.Button, {
    secondary: true,
    to: `/quotations/${quotationId}/preview`,
    disabled: isSaving
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.button.quotation"
  }));
}

const ShowQuotation = (0, _reactRedux.connect)(state => ({
  quotationId: state.invoices.get(`current.quotation.id`),
  isSaving: state.invoices.get(`isSaving`)
}))(ButtonShowQuotation); //----- ARCHIVE

exports.ShowQuotation = ShowQuotation;

function ButtonArchiveInvoice(props) {
  const {
    invoice,
    archiveOne,
    isSaving,
    icon
  } = props,
        others = _objectWithoutProperties(props, ["invoice", "archiveOne", "isSaving", "icon"]);

  if (!invoice) return null;
  const archivedAt = invoice.get(`archivedAt`);
  if (archivedAt) return null;
  const id = invoice.get(`id`);

  const btnProps = _objectSpread({
    onClick: event => {
      event.preventDefault();
      archiveOne({
        id
      });
    },
    type: `submit`,
    formMethod: `post`,
    formAction: `/invoices/${id}/archive`,
    disabled: isSaving
  }, others);

  if (icon) return _react.default.createElement(_buttons.BtnIcon, _extends({
    svgId: "archive"
  }, btnProps));
  return _react.default.createElement(_buttons.Button, btnProps, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.button.archive"
  }));
}

const ArchiveInvoice = (0, _reactRedux.connect)(state => ({
  isSaving: state.invoices.get(`isSaving`)
}), dispatch => (0, _redux.bindActionCreators)({
  archiveOne: invoices.archiveOne
}, dispatch))(ButtonArchiveInvoice);
exports.ArchiveInvoice = ArchiveInvoice;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CustomerQuotations = exports.QuotationsReadyToInvoice = exports.ArchivedQuotations = exports.ActiveQuotations = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactRouterDom = __webpack_require__(29);

var quotations = _interopRequireWildcard(__webpack_require__(59));

var _uiTable = __webpack_require__(89);

var _format = __webpack_require__(84);

var _buttons = __webpack_require__(66);

var _buttons2 = __webpack_require__(98);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function QuotationRow(props) {
  const {
    quotation
  } = props;
  const id = quotation.get(`id`);
  const isArchived = quotation.get(`archivedAt`);
  const quotationUrl = `${isArchived ? `/archives` : ``}/quotations/${id}`;
  return _react.default.createElement(_uiTable.Row, null, _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_reactRouterDom.Link, {
    to: quotationUrl
  }, quotation.get(`reference`))), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_reactRouterDom.Link, {
    to: quotationUrl
  }, quotation.get(`name`))), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_reactRouterDom.Link, {
    to: `/customers/${quotation.get(`customerId`)}`
  }, quotation.get(`customer.name`))), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.Day, {
    value: quotation.get(`sendAt`)
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.Day, {
    value: quotation.get(`validatedAt`)
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.Day, {
    value: quotation.get(`signedAt`)
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_buttons2.ShowInvoice, {
    linkAlike: true,
    quotation: quotation
  }), _react.default.createElement(_buttons2.CreateInvoice, {
    linkAlike: true,
    quotation: quotation
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.Amount, {
    value: quotation.get(`total`)
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_buttons2.ArchiveQuotation, {
    icon: true,
    linkAlike: true,
    quotation: quotation
  })));
}

const quotationColumns = [{
  id: `id`,
  label: `table.header.id`,
  sort: `index`,
  type: `id`
}, {
  id: `name`,
  label: `table.header.name`,
  sort: `name`,
  type: `text`
}, {
  id: `customer`,
  label: `table.header.customer`,
  sort: `customer.name`,
  type: `customer`
}, {
  id: `sent`,
  label: `table.header.sent`,
  sort: `sendAt`,
  type: `date`
}, {
  id: `validated`,
  label: `table.header.validated`,
  sort: `validatedAd`,
  type: `date`
}, {
  id: `signed`,
  label: `table.header.signed`,
  sort: `signedAt`,
  type: `date`
}, {
  id: `invoice`,
  label: `table.header.invoice`,
  sort: `invoice.index`,
  type: `id`
}, {
  id: `amount`,
  label: `table.amount`,
  sort: `total`,
  type: `amount`
}, {
  id: `archive`,
  label: false,
  sort: false,
  type: `action`
}];

function QuotationsList(props) {
  const {
    quotations = []
  } = props,
        rest = _objectWithoutProperties(props, ["quotations"]);

  return _react.default.createElement(_uiTable.Table, _extends({
    presentation: true,
    columns: quotationColumns
  }, rest), quotations.map(quotation => _react.default.createElement(QuotationRow, {
    key: quotation.id,
    quotation: quotation
  })));
}

const ActiveQuotations = (0, _reactRedux.connect)(state => ({
  quotations: state.quotations.get(`active`),
  meta: state.quotations.get(`meta.active`),
  hideColumns: [`signed`, `invoice`]
}), dispatch => (0, _redux.bindActionCreators)({
  handlePageSort: quotations.listActive
}, dispatch))(QuotationsList);
exports.ActiveQuotations = ActiveQuotations;
const ArchivedQuotations = (0, _reactRedux.connect)(state => ({
  quotations: state.quotations.get(`archived`),
  meta: state.quotations.get(`meta.archived`),
  hideColumns: [`archive`]
}), dispatch => (0, _redux.bindActionCreators)({
  handlePageSort: quotations.listArchived
}, dispatch))(QuotationsList);
exports.ArchivedQuotations = ArchivedQuotations;
const QuotationsReadyToInvoice = (0, _reactRedux.connect)(state => ({
  quotations: state.quotations.get(`readyToInvoice`),
  meta: state.quotations.get(`meta.readyToInvoice`),
  title: `quotation.ready-to-invoice`,
  hideColumns: [`sent`, `validated`],
  hideOnEmpty: true
}), dispatch => (0, _redux.bindActionCreators)({
  handlePageSort: quotations.listReadyToInvoice
}, dispatch))(QuotationsList);
exports.QuotationsReadyToInvoice = QuotationsReadyToInvoice;
const CustomerQuotations = (0, _reactRedux.connect)(state => ({
  quotations: state.quotations.get(`active`),
  meta: state.quotations.get(`meta.active`),
  hideColumns: [`customer`]
}), dispatch => (0, _redux.bindActionCreators)({
  handlePageSort: quotations.listForCustomer
}, dispatch))(QuotationsList);
exports.CustomerQuotations = CustomerQuotations;
var _default = QuotationsList;
exports.default = _default;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchiveQuotation = exports.CreateInvoice = exports.ShowInvoice = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _redux = __webpack_require__(31);

var _reactIntl = __webpack_require__(44);

var quotations = _interopRequireWildcard(__webpack_require__(59));

var _buttons = __webpack_require__(66);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

//----- SHOW INVOICE
function ButtonShowInvoice(props) {
  const {
    quotation,
    isSaving,
    withMessage,
    dispatch
  } = props,
        rest = _objectWithoutProperties(props, ["quotation", "isSaving", "withMessage", "dispatch"]);

  if (!quotation) return null;
  const invoiceId = quotation.get(`invoiceId`);
  if (!invoiceId) return null;
  const isInvoiceArchived = quotation.get(`invoice.archivedAt`);
  return _react.default.createElement(_buttons.Button, _extends({
    secondary: true,
    to: `/invoices/${invoiceId}${isInvoiceArchived ? `/preview` : ``}`,
    disabled: isSaving
  }, rest), withMessage ? _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "quotation.invoice.show"
  }) : quotation.get(`invoice.reference`));
}

const ShowInvoice = (0, _reactRedux.connect)(state => ({
  isSaving: state.quotations.get(`isSaving`)
}))(ButtonShowInvoice); //----- CREATE INVOICE

exports.ShowInvoice = ShowInvoice;

function ButtonCreateInvoice(props) {
  const {
    quotation,
    createInvoice,
    isSaving
  } = props,
        others = _objectWithoutProperties(props, ["quotation", "createInvoice", "isSaving"]);

  if (!quotation) return null;
  const id = quotation.get(`id`);
  const isAvailable = quotation.get(`_canCreateInvoice`);
  if (!isAvailable) return null;

  const btnProps = _objectSpread({
    onClick: event => {
      event.preventDefault();
      createInvoice({
        id
      });
    },
    type: `submit`,
    formMethod: `post`,
    formAction: `/quotations/${id}/create-invoice`,
    disabled: isSaving
  }, others);

  return _react.default.createElement(_buttons.Button, _extends({
    secondary: true
  }, btnProps), _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "quotation.invoice.create"
  }));
}

const CreateInvoice = (0, _reactRedux.connect)(state => ({
  isSaving: state.quotations.get(`isSaving`)
}), dispatch => (0, _redux.bindActionCreators)({
  createInvoice: quotations.createInvoice
}, dispatch))(ButtonCreateInvoice); //----- ARCHIVE

exports.CreateInvoice = CreateInvoice;

function ButtonArchiveQuotation(props) {
  const {
    quotation,
    archiveOne,
    isSaving,
    icon
  } = props,
        others = _objectWithoutProperties(props, ["quotation", "archiveOne", "isSaving", "icon"]);

  if (!quotation) return null;
  const id = quotation.get(`id`);
  const isAvailable = quotation.get(`_canBeArchived`);
  if (!isAvailable) return null;

  const btnProps = _objectSpread({
    onClick: event => {
      event.preventDefault();
      archiveOne({
        id
      });
    },
    type: `submit`,
    formMethod: `post`,
    formAction: `/quotations/${id}/archive`,
    disabled: isSaving
  }, others);

  if (icon) return _react.default.createElement(_buttons.BtnIcon, _extends({
    svgId: "archive"
  }, btnProps));
  return _react.default.createElement(_buttons.Button, btnProps, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "quotation.button.archive"
  }));
}

const ArchiveQuotation = (0, _reactRedux.connect)(state => ({
  isSaving: state.quotations.get(`isSaving`)
}), dispatch => (0, _redux.bindActionCreators)({
  archiveOne: quotations.archiveOne
}, dispatch))(ButtonArchiveQuotation);
exports.ArchiveQuotation = ArchiveQuotation;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeCharts = HomeCharts;

var _react = _interopRequireDefault(__webpack_require__(27));

var _pieChart = __webpack_require__(100);

var _format = __webpack_require__(84);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `home-charts`;

function HomeCharts(props) {
  const {
    statistics
  } = props;
  return _react.default.createElement("div", {
    className: BASE_CLASS
  }, _react.default.createElement(_pieChart.PieChartDefs, null), _react.default.createElement(_pieChart.PieChart, {
    title: "_.count",
    slices: [{
      label: `_.quotations`,
      value: statistics.quotationsCount
    }, {
      label: `_.invoices`,
      value: statistics.invoicesCount
    }]
  }, _react.default.createElement(_format.FormatNumber, {
    wrapperProps: {
      style: {
        fontSize: `3rem`
      }
    },
    value: statistics.quotationsCount + statistics.invoicesCount
  })), _react.default.createElement(_pieChart.PieChart, {
    title: "_.amount",
    type: "currency",
    slices: [{
      label: `_.quotations`,
      value: statistics.quotationsTotal
    }, {
      label: `_.invoices.left`,
      value: statistics.invoicesTotalLeft
    }, {
      label: `_.invoices.paid`,
      value: statistics.invoicesTotalPaid
    }]
  }, _react.default.createElement(_format.Amount, {
    value: statistics.quotationsTotal + statistics.invoicesTotal
  })));
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieChartDefs = PieChartDefs;
exports.PieChart = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var _lodash = _interopRequireDefault(__webpack_require__(101));

var _format = __webpack_require__(84);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BASE_CLASS = `pie-chart`;

function computeTotal(total, slice) {
  if (!Number.isFinite(slice.value)) return 0;
  return slice.value + total;
} // don't repeat the defs on every SVG


function PieChartDefs(props) {
  return _react.default.createElement("svg", {
    viewBox: "-1 -1 2 2",
    className: `${BASE_CLASS}__defs`
  }, _react.default.createElement("defs", null, _react.default.createElement("clipPath", {
    id: "pie-clip-all"
  }, _react.default.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "1"
  }))));
}

class PieChart extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      slices: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const slices = nextProps.slices.map(slice => {
      slice.value = Number.isFinite(slice.value) ? slice.value : 0;
      return slice;
    });
    const total = slices.reduce(computeTotal, 0);
    return {
      total,
      slices: slices.map(slice => _objectSpread({}, slice, {
        // don't divide by 0 :D
        percent: total ? (0, _lodash.default)(slice.value / total, 4) : 0
      }))
    };
  }

  static getCoordinates(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [(0, _lodash.default)(x, 8), (0, _lodash.default)(y, 8)];
  }

  createSlices() {
    const {
      slices
    } = this.state;
    let cumulativePercent = 0;
    return slices.map((slice, index) => {
      if (slice.percent === 1) {
        return _react.default.createElement("circle", {
          key: "index",
          className: `${BASE_CLASS}__slice`,
          cx: "0",
          cy: "0",
          r: "1"
        });
      }

      const [startX, startY] = PieChart.getCoordinates(cumulativePercent); // each slice starts where the last slice ended, so keep a cumulative percent

      cumulativePercent = cumulativePercent + slice.percent;
      const [endX, endY] = PieChart.getCoordinates(cumulativePercent); // if the slice is more than 50%, take the large arc (the long way around)

      const largeArcFlag = slice.percent > .5 ? 1 : 0;
      const pathData = [`M ${startX} ${startY}`, `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`].join(` `);
      return _react.default.createElement("path", {
        className: `${BASE_CLASS}__slice`,
        key: index,
        d: pathData
      });
    });
  }

  createLabels() {
    const {
      slices
    } = this.state;
    return _react.default.createElement("ol", {
      className: `${BASE_CLASS}__list`
    }, slices.map((slice, index) => _react.default.createElement("li", {
      key: index,
      className: `${BASE_CLASS}__list_item`
    }, _react.default.createElement("div", {
      className: `${BASE_CLASS}__label`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: slice.label
    })), _react.default.createElement(_format.Percent, {
      className: `${BASE_CLASS}__value`,
      value: slice.percent
    }))));
  }

  render() {
    const {
      props
    } = this;
    return _react.default.createElement("div", {
      className: BASE_CLASS
    }, _react.default.createElement("p", {
      className: `${BASE_CLASS}__title`
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: props.title
    })), _react.default.createElement("figure", {
      className: `${BASE_CLASS}__pie-wrapper`
    }, _react.default.createElement("svg", {
      viewBox: "-1 -1 2 2",
      className: `${BASE_CLASS}__pie`
    }, _react.default.createElement("g", {
      clipPath: "url(#pie-clip-all)"
    }, _react.default.createElement("circle", {
      cx: "0",
      cy: "0",
      r: "1",
      className: `${BASE_CLASS}__pie-bg`
    }), this.createSlices())), props.children && _react.default.createElement("figcaption", {
      className: `${BASE_CLASS}__pie-caption`
    }, props.children)), this.createLabels());
  }

}

exports.PieChart = PieChart;

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("lodash.round");

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var invoices = _interopRequireWildcard(__webpack_require__(60));

var _secondary = __webpack_require__(77);

var _secondaryButtons = __webpack_require__(78);

var _main = __webpack_require__(93);

var _list = __webpack_require__(97);

var _list2 = __webpack_require__(94);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArchivedList(props) {
  const titleProps = {
    id: `page.archived`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.NavSecondary, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonNew, {
    type: "quotations",
    message: "quotation.button.new"
  })), _react.default.createElement(_main.Main, null, _react.default.createElement(_main.Content, null, _react.default.createElement(_list.ArchivedQuotations, {
    title: "page.quotations"
  }), _react.default.createElement(_list2.ArchivedInvoices, {
    title: "page.invoices"
  }))));
}

var _default = (0, _reactRedux.connect)()((0, _connectDataFetcher.default)({
  Component: ArchivedList,
  actionCreators: [quotations.listArchived, invoices.listArchived]
}));

exports.default = _default;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var _secondary = __webpack_require__(77);

var NavButtons = _interopRequireWildcard(__webpack_require__(78));

var LayoutMain = _interopRequireWildcard(__webpack_require__(93));

var _preview = __webpack_require__(104);

var KeyPres = _interopRequireWildcard(__webpack_require__(105));

var Format = _interopRequireWildcard(__webpack_require__(84));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ShowArchivedQuotation(props) {
  const {
    quotation
  } = props;
  const titleProps = {
    id: `page.archived`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title), _react.default.createElement("html", {
    className: "light-background"
  }))), _react.default.createElement(_secondary.NavSecondary, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(NavButtons.New, {
    type: "quotations",
    message: "quotation.button.new"
  }), _react.default.createElement(NavButtons.Print, null)), _react.default.createElement(LayoutMain.Wrapper, null, _react.default.createElement(LayoutMain.Meta, null, _react.default.createElement(KeyPres.Wrapper, null, _react.default.createElement(KeyPres.Label, {
    id: "key-pres.customer"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(_reactRouterDom.Link, {
    to: `/customers/${quotation.get(`customerId`)}`
  }, quotation.get(`customer.name`))), quotation.get(`invoiceId`) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(KeyPres.Label, {
    id: "key-pres.associated.invoice"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(_reactRouterDom.Link, {
    to: `/invoices/${quotation.get(`invoiceId`)}`
  }, quotation.get(`invoice.reference`)))), _react.default.createElement(KeyPres.Label, {
    id: "key-pres.sent"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Day, {
    value: quotation.get(`sendAt`)
  })), _react.default.createElement(KeyPres.Label, {
    id: "key-pres.validated"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Day, {
    value: quotation.get(`validatedAt`)
  })), _react.default.createElement(KeyPres.Label, {
    id: "key-pres.signed"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Day, {
    value: quotation.get(`signedAt`)
  })), _react.default.createElement(KeyPres.Label, {
    id: "key-pres.total"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Amount, {
    value: quotation.get(`total`)
  })))), _react.default.createElement(LayoutMain.Content, null, _react.default.createElement(_preview.Preview, {
    type: "quotation",
    document: quotation
  }))));
}

var _default = (0, _reactRedux.connect)(state => ({
  quotation: state.quotations.get(`current`)
}))((0, _connectDataFetcher.default)({
  Component: ShowArchivedQuotation,
  actionCreators: [quotations.getOne]
}));

exports.default = _default;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preview = Preview;
exports.PrintingNotice = PrintingNotice;

var _react = _interopRequireDefault(__webpack_require__(27));

var _propTypes = _interopRequireDefault(__webpack_require__(69));

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _paperSheet = __webpack_require__(83);

var _alerts = __webpack_require__(87);

var _products = __webpack_require__(88);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Preview(props) {
  const {
    document,
    type
  } = props;
  const products = document.get(`products`);
  if (!document || !products) return null;
  return _react.default.createElement(_paperSheet.PaperSheet, {
    preview: true
  }, _react.default.createElement(_paperSheet.Reference, {
    type: type,
    product: document
  }), _react.default.createElement(_paperSheet.Between, null, _react.default.createElement(_paperSheet.PartyUser, null), _react.default.createElement(_paperSheet.Party, {
    title: "to",
    people: document.get(`customer`)
  })), _react.default.createElement(_paperSheet.Subject, {
    value: document.get(`name`)
  }), _react.default.createElement(_products.ProductTable, {
    readOnly: true,
    document: document
  }), _react.default.createElement(_paperSheet.Mentions, {
    content: document.get(`${type}Config.mentions`)
  }));
}

Preview.propTypes = {
  document: _propTypes.default.object.isRequired,
  type: _propTypes.default.oneOf([`quotation`, `invoice`])
};

function PrintingNotice(props) {
  return _react.default.createElement(_alerts.Alert, {
    warning: true,
    className: "printing-notice"
  }, _react.default.createElement(_reactIntl.FormattedHTMLMessage, {
    id: "_.print-notice"
  }));
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.PresByKey = PresByKey;
exports.Label = exports.KeyLabel = KeyLabel;
exports.Value = exports.KeyValue = KeyValue;

var _react = _interopRequireDefault(__webpack_require__(27));

var _propTypes = _interopRequireDefault(__webpack_require__(69));

var _reactIntl = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `key-presentation`;

function PresByKey(props) {
  return _react.default.createElement("dl", {
    className: BASE_CLASS
  }, props.children);
}

function KeyLabel(props) {
  return _react.default.createElement("dt", {
    className: `${BASE_CLASS}__label`
  }, _react.default.createElement(_reactIntl.FormattedMessage, props));
}

KeyLabel.propTypes = {
  id: _propTypes.default.string.isRequired
};

function KeyValue(props) {
  return _react.default.createElement("dd", {
    className: `${BASE_CLASS}__value`
  }, props.children);
}

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var invoices = _interopRequireWildcard(__webpack_require__(60));

var _secondary = __webpack_require__(77);

var NavButtons = _interopRequireWildcard(__webpack_require__(78));

var Main = _interopRequireWildcard(__webpack_require__(93));

var Tabs = _interopRequireWildcard(__webpack_require__(86));

var _progress = __webpack_require__(95);

var _preview = __webpack_require__(104);

var _header = __webpack_require__(107);

var _eventsTable = __webpack_require__(108);

var Events = _interopRequireWildcard(__webpack_require__(114));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ShowArchivedInvoice(props) {
  const {
    invoice
  } = props;
  const payments = invoice.get(`payments`);
  const titleProps = {
    id: `page.archived`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title), _react.default.createElement("html", {
    className: "light-background"
  }))), _react.default.createElement(_secondary.NavSecondary, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(NavButtons.New, {
    type: "quotations",
    message: "quotation.button.new"
  }), _react.default.createElement(NavButtons.Print, null)), _react.default.createElement(Tabs.Wrapper, null, _react.default.createElement(Tabs.List, null, _react.default.createElement(Tabs.Header, null, _react.default.createElement(_header.InvoiceHeader, {
    invoice: invoice
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.tab.payments"
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.tab.preview"
  }))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement(_progress.Progress, {
    max: invoice.get(`total`),
    value: invoice.get(`totalPaid`)
  }), _react.default.createElement(_eventsTable.InvoiceEvents, {
    invoice: invoice,
    hideColumns: [`action`]
  }, _react.default.createElement(Events.Sent, {
    invoice: invoice
  }), payments.map((payment, index) => _react.default.createElement(Events.Payment, {
    key: payment._id,
    payment: payment,
    count: index + 1
  })))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement(_preview.Preview, {
    type: "invoice",
    document: invoice
  }))));
}

var _default = (0, _reactRedux.connect)(state => ({
  invoice: state.invoices.get(`current`)
}))((0, _connectDataFetcher.default)({
  Component: ShowArchivedInvoice,
  actionCreators: [invoices.getOne]
}));

exports.default = _default;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvoiceHeader = InvoiceHeader;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var Format = _interopRequireWildcard(__webpack_require__(84));

var KeyPres = _interopRequireWildcard(__webpack_require__(105));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InvoiceHeader(props) {
  const {
    invoice
  } = props;
  return _react.default.createElement(KeyPres.Wrapper, null, _react.default.createElement(KeyPres.Label, {
    id: "table.header.customer"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(_reactRouterDom.Link, {
    to: `/customers/${invoice.get('customerId')}`
  }, invoice.get(`customer.name`))), _react.default.createElement(KeyPres.Label, {
    id: "table.header.quotation-associated"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(_reactRouterDom.Link, {
    to: `/quotations/${invoice.get('quotation.id')}`
  }, invoice.get(`quotation.reference`))), _react.default.createElement(KeyPres.Label, {
    id: "table.amount"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Amount, {
    value: invoice.get(`total`)
  })), _react.default.createElement(KeyPres.Label, {
    id: "table.amount.paid"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Amount, {
    value: invoice.get(`totalPaid`)
  })), _react.default.createElement(KeyPres.Label, {
    id: "table.amount.left-to-pay"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Amount, {
    value: invoice.get(`totalLeft`)
  })));
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvoiceEvents = InvoiceEvents;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var _uiTable = __webpack_require__(89);

var _buttons = __webpack_require__(66);

var _datePicker = __webpack_require__(109);

var _format = __webpack_require__(84);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const eventsColumns = [{
  id: `id`,
  label: `invoices.event.#`,
  type: `id`
}, {
  id: `event`,
  label: `invoices.event`,
  type: `text`
}, {
  id: `description`,
  label: `invoices.event.description`,
  type: `input`
}, {
  id: `date`,
  label: `invoices.event.date`,
  type: `input date`
}, {
  id: `amount`,
  label: `invoices.event.amount`,
  type: `input amount`
}, {
  id: `action`,
  label: false,
  type: `action`
}];

function InvoiceEventsFooter(props) {
  const {
    invoice,
    hideColumns
  } = props;
  return _react.default.createElement(_uiTable.TableFooter, null, _react.default.createElement(_uiTable.RowFooter, null, _react.default.createElement(_uiTable.Cell, {
    colSpan: "4"
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "table.amount.paid"
  })), _react.default.createElement(_uiTable.Cell, {
    type: "amount"
  }, _react.default.createElement(_format.Amount, {
    value: invoice.get(`totalPaid`)
  })), !hideColumns && _react.default.createElement(_uiTable.Cell, null)), _react.default.createElement(_uiTable.RowFooter, null, _react.default.createElement(_uiTable.Cell, {
    colSpan: "4"
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "table.amount.left-to-pay"
  })), _react.default.createElement(_uiTable.Cell, {
    type: "amount"
  }, _react.default.createElement(_format.Amount, {
    value: invoice.get(`totalLeft`)
  })), !hideColumns && _react.default.createElement(_uiTable.Cell, null)));
}

function InvoiceEvents(props) {
  const {
    children
  } = props,
        rest = _objectWithoutProperties(props, ["children"]);

  return _react.default.createElement(_uiTable.Table, _extends({
    columns: eventsColumns,
    footer: _react.default.createElement(InvoiceEventsFooter, rest)
  }, rest), children);
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = DatePicker;

var _react = _interopRequireDefault(__webpack_require__(27));

var _moment = _interopRequireDefault(__webpack_require__(4));

var _DayPickerInput = _interopRequireDefault(__webpack_require__(110));

var _moment2 = _interopRequireWildcard(__webpack_require__(111));

__webpack_require__(112);

__webpack_require__(113);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

// using https://react-day-picker.js.org/
const disabledDays = {
  after: new Date()
};

function DatePicker(props) {
  const {
    handleDayChange,
    value
  } = props,
        inputProps = _objectWithoutProperties(props, ["handleDayChange", "value"]); // empty values should treated as invalid date
  // • maybe the serve doesn't send us a date all!


  const dateObject = (0, _moment.default)(value || ``);
  const dateValue = dateObject.isValid() ? dateObject.toDate() : ``;
  return _react.default.createElement(_DayPickerInput.default, {
    value: dateValue,
    locale: `fr`,
    formatDate: _moment2.formatDate,
    parseDate: _moment2.parseDate,
    clickUnselectsDay: true,
    format: "L",
    placeholder: `dd/mm/yyyy`,
    inputProps: inputProps,
    dayPickerProps: {
      disabledDays,
      locale: `fr`,
      localeUtils: _moment2.default
    },
    onDayChange: day => {
      handleDayChange && handleDayChange({
        name: inputProps.name,
        value: day || ``
      });
    }
  });
}

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = require("react-day-picker/DayPickerInput");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = require("react-day-picker/moment");

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("moment/locale/en-gb");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("moment/locale/fr");

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sent = InvoiceEventSentRead;
exports.Payment = InvoiceEventPaymentRead;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var Table = _interopRequireWildcard(__webpack_require__(89));

var Format = _interopRequireWildcard(__webpack_require__(84));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InvoiceEventSentRead(props) {
  const {
    invoice,
    handle
  } = props;
  return _react.default.createElement(Table.Row, null, _react.default.createElement(Table.Cell, null), _react.default.createElement(Table.Cell, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.event.sent"
  })), _react.default.createElement(Table.Cell, {
    type: "text"
  }, " \u2013 "), _react.default.createElement(Table.Cell, null, _react.default.createElement(Format.Day, {
    value: invoice.get(`sendAt`)
  })), _react.default.createElement(Table.Cell, {
    type: "number"
  }, " \u2013 "));
}

function InvoiceEventPaymentRead(props) {
  const {
    payment,
    count
  } = props;
  return _react.default.createElement(Table.Row, null, _react.default.createElement(Table.Cell, null, count), _react.default.createElement(Table.Cell, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.event.payment"
  })), _react.default.createElement(Table.Cell, {
    type: "text"
  }, payment.get(`message`)), _react.default.createElement(Table.Cell, {
    type: "date"
  }, _react.default.createElement(Format.Day, {
    value: payment.get(`date`)
  })), _react.default.createElement(Table.Cell, {
    type: "amount"
  }, _react.default.createElement(Format.Amount, {
    value: payment.get(`amount`)
  })));
}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var _main = __webpack_require__(93);

var _secondary = __webpack_require__(77);

var _secondaryButtons = __webpack_require__(78);

var _list = __webpack_require__(97);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = `quotations`;

function Quotations(props) {
  const titleProps = {
    id: `page.quotations`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.NavSecondary, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonNew, {
    type: TYPE,
    message: "quotation.button.new"
  })), _react.default.createElement(_main.Main, null, _react.default.createElement(_main.Content, null, _react.default.createElement(_list.ActiveQuotations, null), _react.default.createElement(_list.QuotationsReadyToInvoice, null))));
}

function state2prop(state) {
  return {};
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: Quotations,
  actionCreators: [quotations.listActive, quotations.listReadyToInvoice]
}));

exports.default = _default;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var customers = _interopRequireWildcard(__webpack_require__(61));

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var _form = _interopRequireDefault(__webpack_require__(117));

var _form2 = __webpack_require__(122);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = `quotations`;

function NewQuotation(props) {
  const titleProps = {
    id: `page.quotations.new`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonSubmit, {
    formId: _form2.FORM_ID,
    isSaving: props.isSaving,
    label: "quotation.button.create"
  }), _react.default.createElement(_secondaryButtons.ButtonList, {
    type: TYPE,
    label: "quotation.button.list"
  })), _react.default.createElement(_form.default, props));
}

function state2prop(state) {
  const {
    isSaving
  } = state.quotations;
  return {
    isSaving
  };
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: NewQuotation,
  actionCreators: [customers.getAll, quotations.getOne]
}));

exports.default = _default;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recomputeSteps = recomputeSteps;
exports.removeDefaultProducts = removeDefaultProducts;
exports.recomputeTotals = recomputeTotals;
exports.addEmptyLine = addEmptyLine;
exports.ensureProductId = ensureProductId;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var _crio = _interopRequireDefault(__webpack_require__(52));

var _lodash = _interopRequireDefault(__webpack_require__(118));

var _shortid = _interopRequireDefault(__webpack_require__(58));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var customers = _interopRequireWildcard(__webpack_require__(61));

var compute = _interopRequireWildcard(__webpack_require__(81));

var redirection = _interopRequireWildcard(__webpack_require__(119));

var _getInputValue = __webpack_require__(80);

var _filterArrayWithObject = __webpack_require__(120);

var _spinner = __webpack_require__(121);

var _form = __webpack_require__(122);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const STEPS = (0, _crio.default)([{
  key: `sendAt`,
  label: `stepper.sent`
}, {
  key: `validatedAt`,
  label: `stepper.validated`
}, {
  key: `signedAt`,
  label: `stepper.signed`
}]);

function recomputeSteps(formData) {
  const steps = STEPS.map(s => {
    const value = formData.get(s.key);
    return {
      value,
      key: s.key,
      label: s.label
    };
  });
  return formData.set(`steps`, steps);
} // • de-dupe defaultProduct lines
// • check _id for React


function removeDefaultProducts(formData) {
  const defaultProduct = formData.get(`productConfig`);
  const products = formData.get(`products`);
  if (!_crio.default.isArray(products)) return formData;
  if (!_crio.default.isObject(defaultProduct)) return formData;
  const cleanedProducts = (0, _filterArrayWithObject.filterArrayWithObject)({
    defaultObject: defaultProduct,
    array: products
  });
  return formData.set(`products`, cleanedProducts);
}

function recomputeTotals(formData) {
  const products = formData.get(`products`);
  if (!_crio.default.isArray(products)) return formData;
  const totals = compute.totals(formData);
  return formData.merge(null, totals);
} // • add an empty line a the end…
//   …in case a user just type something on the blank one


function addEmptyLine(formData) {
  const defaultProduct = formData.get(`productConfig`);
  const products = formData.get(`products`);
  if (!_crio.default.isArray(products)) return formData;
  if (!_crio.default.isObject(defaultProduct)) return formData;
  const emptyProduct = defaultProduct.set(`checked`, true);
  return formData.set(`products`, products.push(emptyProduct));
}

function ensureProductId(formData) {
  const products = formData.get(`products`);
  if (!_crio.default.isArray(products)) return formData;
  const withId = products.map(product => {
    if (!product.get(`_id`)) return product.set(`_id`, (0, _shortid.default)());
    return product;
  });
  return formData.set(`products`, withId);
}

class QuotationForm extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: quotations.LOADING,
      customer: (0, _crio.default)({}) // don't use any automated bind
      // • they are only in ES stage 2…
      //   …and it doesn't seem that it will make in stage 3
      //   https://github.com/tc39/proposal-class-fields/issues/80
      //   https://www.npmjs.com/package/@babel/plugin-proposal-class-properties
      // • but better to bind than relying on arrow functions in render()
      //   https://codeburst.io/how-to-not-react-common-anti-patterns-and-gotchas-in-react-40141fe0dcd#aef5

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateInvoice = this.handleCreateInvoice.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleProductRemove = this.handleProductRemove.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const next = nextProps.current;
    const current = prevState.formData;
    const {
      history,
      staticContext,
      customers,
      isSaving
    } = nextProps;
    if (isSaving) return null;
    if (current === next) return null; // redirects

    redirection.quotation({
      next,
      current,
      history,
      staticContext
    });
    return {
      formData: QuotationForm.recomputeFormData(next),
      customer: QuotationForm.getCustomerData(next, customers)
    };
  } //----- UTILS


  static getCustomerData(formData, customers) {
    if (!Array.isArray(customers)) return {};
    const {
      customerId
    } = formData; // if no customer is selected, just take the first one in the list

    if (!customerId) return customers[0];
    const customer = customers.find(c => c.id === customerId);
    return customer || {};
  } //----- EVENTS


  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true,
      empty: true
    });
    this.props.saveOne({
      body
    });
  }

  handleCreateInvoice(event) {
    event.preventDefault();
    this.props.createInvoice({
      id: this.props.current.get(`id`)
    });
  }

  handleFormChange(event) {
    const {
      name,
      value
    } = (0, _getInputValue.getInputValue)(event.target);
    this.setState((prevState, props) => {
      const updated = prevState.formData.set(name, value); // update customer state if we choose a new one

      if (name === `customerId`) return {
        formData: updated,
        customer: QuotationForm.getCustomerData(updated, props.customers) // Recompute products only if needed

      };
      const isProductChange = /^products\[\d+\]/.test(name);
      const isTaxChange = name === `tax`;
      if (!isProductChange && !isTaxChange) return {
        formData: updated
      };
      return {
        formData: QuotationForm.recomputeProducts(updated)
      };
    });
  }

  handleDayChange(target) {
    const {
      name,
      value
    } = target;
    this.setState(prevState => {
      const updated = prevState.formData.set(name, value);
      const withSteps = QuotationForm.recomputeSteps(updated);
      return {
        formData: withSteps
      };
    });
  }

  handleProductRemove(index, prefix) {
    const {
      formData
    } = this.state;
    const line = formData.get(prefix);
    if (!line) return;
    this.setState(prevState => {
      const products = prevState.formData.get(`products`);
      const updatedProducts = products.splice(index, 1);
      const updated = prevState.formData.set(`products`, updatedProducts);
      return {
        formData: QuotationForm.recomputeProducts(updated)
      };
    });
  } //----- RENDER


  render() {
    const {
      props,
      state
    } = this;
    const {
      formData
    } = state;
    const {
      isSaving
    } = props;
    const {
      isLoading
    } = formData;
    if (isLoading) return _react.default.createElement(_spinner.Spinner, null);
    const renderProps = {
      user: props.user,
      customers: props.customers,
      formData: formData,
      isSaving: isSaving,
      customer: state.customer,
      isNew: props.isNew,
      handle: {
        submit: this.handleSubmit,
        createInvoice: this.handleCreateInvoice,
        formChange: this.handleFormChange,
        dayChange: this.handleDayChange,
        productRemove: this.handleProductRemove
      }
    };
    return _react.default.createElement(_form.QuotationFormPres, renderProps);
  }

}

_defineProperty(_defineProperty(_defineProperty(QuotationForm, "recomputeSteps", recomputeSteps), "recomputeProducts", (0, _lodash.default)(removeDefaultProducts, recomputeTotals, addEmptyLine, ensureProductId)), "recomputeFormData", (0, _lodash.default)(QuotationForm.recomputeSteps, QuotationForm.recomputeProducts));

function state2prop(state) {
  const {
    current
  } = state.quotations;
  const isNew = current.id == null;
  return {
    isNew,
    isSaving: state.quotations.get(`isSaving`),
    current: state.quotations.get(`current`),
    customers: state.customers.get(`active`)
  };
}

function dispatch2prop(dispatch) {
  return (0, _redux.bindActionCreators)({
    getOne: quotations.getOne,
    saveOne: quotations.saveOne,
    createInvoice: quotations.createInvoice,
    getAllCustomers: customers.getAll
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(state2prop, dispatch2prop)(QuotationForm);

exports.default = _default;

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("lodash.flow");

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customer = exports.invoice = exports.quotation = exports.isArchived = exports.isNewInvoice = exports.isNewCustomer = exports.isNewQuotation = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(18));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// control if coming from a no ID model instance…
// …we update to an instance with ID
const checkKeyChange = key => ({
  next,
  current
}) => {
  const isLoading = current.isLoading || next.isLoading;
  if (isLoading) return false;
  const currentKey = current[key];
  const nextKey = next[key];
  const hasCurrent = !(0, _lodash.default)(currentKey);
  const hasNext = !(0, _lodash.default)(nextKey); // want to change route if:
  // • the previous doesn't have an ID (creation)
  // • the next one has (successful creation!)

  const isNewCreation = !hasCurrent && hasNext;
  const isDifferentId = hasCurrent && hasNext && currentKey !== nextKey;
  return isNewCreation ? true : isDifferentId;
};

const isNewQuotation = checkKeyChange(`id`);
exports.isNewQuotation = isNewQuotation;
const isNewCustomer = checkKeyChange(`id`);
exports.isNewCustomer = isNewCustomer;
const isNewInvoice = checkKeyChange(`invoiceId`);
exports.isNewInvoice = isNewInvoice;

const isArchived = ({
  next,
  current
}) => !(0, _lodash.default)(next.archivedAt);

exports.isArchived = isArchived;
const newCustomer = {
  test: isNewCustomer,
  to: next => `/customers/${next.id}`
};
const newQuotation = {
  test: isNewQuotation,
  to: next => `/quotations/${next.id}`
};
const archivedQuotation = {
  test: isArchived,
  to: next => `/archives/quotations/${next.id}`
};
const newInvoice = {
  test: isNewInvoice,
  to: next => `/invoices/${next.invoiceId}`
};
const archivedInvoice = {
  test: isArchived,
  to: next => `/archives/invoices/${next.id}`
};

const checkRedirections = datas => (hasRedirect, redirection) => {
  const {
    next,
    current,
    history,
    staticContext
  } = datas;
  if (hasRedirect) return hasRedirect;
  if (!redirection.test({
    next,
    current
  })) return false;
  const redirectUrl = redirection.to(next); // update static context for the server

  if (staticContext) {
    staticContext.status = 302;
    staticContext.url = redirectUrl;
  }

  return history.push(redirectUrl);
};

const quotation = datas => [newQuotation, newInvoice, archivedQuotation].reduce(checkRedirections(datas), false);

exports.quotation = quotation;

const invoice = datas => [archivedInvoice].reduce(checkRedirections(datas), false);

exports.invoice = invoice;

const customer = datas => [newCustomer].reduce(checkRedirections(datas), false);

exports.customer = customer;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.filterArrayWithObject = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(21));

var _crio = _interopRequireDefault(__webpack_require__(52));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// {foo: `bar`} [{foo: `bar`}, {foo: `baz`}] => [{foo: `baz`}]
const filterArrayWithObject = ({
  defaultObject,
  array
}) => {
  if (!_crio.default.isArray(array)) return (0, _crio.default)([]);
  if (!_crio.default.isObject(defaultObject)) return array;
  const defaultEntries = defaultObject.entries();
  const result = array // make sure that the object has the same keys as the comparison
  .map(entry => defaultObject.merge(null, entry)) // To achieve equal comparisons, cast to the same type
  .map(entry => {
    defaultEntries.forEach(([refKey, refValue]) => {
      const type = typeof refValue;

      switch (type) {
        case 'number':
          return entry = entry.set(refKey, parseFloat(entry[refKey], 10));

        case 'string':
          return entry = entry.set(refKey, `${entry[refKey]}`);
      }
    });
    return entry;
  }).filter(entry => {
    // check strict equivalence over all the defaultKeys
    const isSameAsDefault = defaultEntries.map(([refKey, refValue]) => refValue === entry.get(refKey)).reduce((acc, curr) => acc && curr, true);
    return !isSameAsDefault;
  });
  return result;
};

exports.filterArrayWithObject = filterArrayWithObject;
var _default = filterArrayWithObject;
exports.default = _default;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Spinner = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `spinner`;
const DELAY = 1000;

class Spinner extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false
    };
    this.showSpinner = this.showSpinner.bind(this);
  }

  componentDidMount() {
    this.timerId = setTimeout(this.showSpinner, DELAY);
  }

  componentWillUnmount() {
    this.timerId && clearTimeout(this.timerId);
    this.timerId = false;
  }

  showSpinner() {
    this.timerId && this.setState(prevState => ({
      showSpinner: true
    }));
  }

  render() {
    const COMP_CLASS = [BASE_CLASS];
    if (this.state.showSpinner) COMP_CLASS.push(`${BASE_CLASS}--is-loading`);
    return _react.default.createElement("aside", {
      className: COMP_CLASS.join(` `)
    }, _react.default.createElement(_reactIntl.FormattedMessage, {
      id: "spinner.loading"
    }));
  }

}

exports.Spinner = Spinner;
var _default = Spinner;
exports.default = _default;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuotationFormPres = QuotationFormPres;
exports.FORM_ID = exports.BASE_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var _main = __webpack_require__(93);

var _paperSheet = __webpack_require__(83);

var _form = __webpack_require__(65);

var _buttons = __webpack_require__(66);

var _field = __webpack_require__(70);

var _stepper = __webpack_require__(123);

var _svgIcons = _interopRequireDefault(__webpack_require__(68));

var _products = __webpack_require__(88);

var _buttons2 = __webpack_require__(98);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `quotation-form`;
exports.BASE_CLASS = BASE_CLASS;
const FORM_ID = BASE_CLASS;
exports.FORM_ID = FORM_ID;

function QuotationFormPres(props) {
  const {
    isSaving,
    customers,
    formData,
    customer,
    isNew,
    handle
  } = props;
  const {
    products
  } = formData;
  const hasProducts = Array.isArray(products);
  const productsLength = hasProducts ? products.length : 0;
  const submitI18nId = `quotation.button.${isNew ? 'create' : 'update'}`;
  return _react.default.createElement(_form.Form, {
    id: FORM_ID,
    isSaving: isSaving,
    onChange: handle.formChange,
    onSubmit: handle.submit
  }, _react.default.createElement(_main.Main, null, _react.default.createElement(_main.Meta, null, _react.default.createElement("div", {
    className: `${BASE_CLASS}__meta`
  }, !isNew && _react.default.createElement("input", {
    type: "hidden",
    defaultValue: formData.id,
    name: "id"
  }), _react.default.createElement(_stepper.Stepper, {
    steps: formData.steps,
    handleDayChange: handle.dayChange
  }), _react.default.createElement(_field.Select, {
    label: "field.customer",
    name: "customerId",
    value: formData.get(`customerId`),
    options: customers,
    optionsKeys: {
      value: `id`,
      label: `name`
    }
  }), _react.default.createElement(_field.Input, {
    name: "tax",
    label: "field.tax",
    type: "number",
    min: "0",
    step: "0.5",
    value: formData.get(`tax`)
  }))), _react.default.createElement(_main.Content, null, _react.default.createElement(_paperSheet.PaperSheet, null, _react.default.createElement(_paperSheet.Reference, {
    type: "quotation",
    product: formData
  }), _react.default.createElement(_paperSheet.Between, null, _react.default.createElement(_paperSheet.PartyUser, null), _react.default.createElement(_paperSheet.Party, {
    title: "to",
    people: customer
  })), _react.default.createElement(_field.Input, {
    name: "name",
    label: "field.subject",
    value: formData.name
  }), _react.default.createElement(_products.ProductTable, {
    document: formData,
    handleRemove: handle.productRemove
  }), _react.default.createElement(_paperSheet.Mentions, {
    content: formData.quotationConfig.mentions
  })), _react.default.createElement(_form.FormActions, null, _react.default.createElement(_buttons.Button, {
    type: "submit"
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: submitI18nId
  })), _react.default.createElement(_buttons2.CreateInvoice, {
    quotation: formData
  }), _react.default.createElement(_buttons2.ShowInvoice, {
    quotation: formData,
    withMessage: true
  }), _react.default.createElement(_buttons2.ArchiveQuotation, {
    danger: true,
    quotation: formData
  })))));
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = Step;
exports.Stepper = exports.RADIO_CLASS = exports.CHECKED_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var _datePicker = __webpack_require__(109);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const BASE_CLASS = `stepper`;
const CHECKED_CLASS = `${BASE_CLASS}--is-all-checked`;
exports.CHECKED_CLASS = CHECKED_CLASS;
const RADIO_CLASS = `${BASE_CLASS}__input`;
exports.RADIO_CLASS = RADIO_CLASS;
const CHECKBOX_NAME = `stepper-display-form`;

class Stepper extends _react.default.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentStep: 0,
      isAllChecked: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      steps
    } = nextProps;
    if (!Array.isArray(steps)) return prevState;
    const currentStep = Stepper.getSelectedIndex(steps);
    const isAllChecked = currentStep === steps.length;
    return {
      currentStep,
      isAllChecked
    };
  }

  static getSelectedIndex(steps) {
    let index = 0;
    const hasOneMissingStep = steps.some((step, i) => {
      const hasNoValue = step.value == null || step.value === ``;
      if (hasNoValue) index = i;
      return hasNoValue;
    });
    return hasOneMissingStep ? index : steps.length;
  }

  handleChange(event, index) {
    // we don't want the event to leak to main form
    event.stopPropagation(); // we still want to be able to show everything manually

    this.setState(prevState => {
      return {
        currentStep: index,
        isAllChecked: false
      };
    });
  }

  render() {
    const _this$props = this.props,
          {
      steps
    } = _this$props,
          otherProps = _objectWithoutProperties(_this$props, ["steps"]);

    const {
      currentStep,
      isAllChecked
    } = this.state;
    const COMP_CLASS = [BASE_CLASS];
    if (isAllChecked) COMP_CLASS.push(CHECKED_CLASS);
    return _react.default.createElement("div", {
      className: COMP_CLASS.join(` `)
    }, steps.map((step, index) => _react.default.createElement(Step, _extends({
      key: step.key,
      checked: index === currentStep,
      index: index,
      step: step,
      handleChange: event => this.handleChange(event, index)
    }, otherProps))));
  }

}

exports.Stepper = Stepper;

function Step(props) {
  const {
    step,
    checked,
    index,
    handleDayChange
  } = props;
  const id = `${step.key}-${index}`;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", {
    id: id,
    name: CHECKBOX_NAME,
    className: `${RADIO_CLASS}`,
    type: "radio",
    checked: checked,
    onChange: props.handleChange
  }), _react.default.createElement("div", {
    className: `${BASE_CLASS}__step`
  }, _react.default.createElement("label", {
    className: `${BASE_CLASS}__button`,
    htmlFor: id
  }, step.label && _react.default.createElement(_reactIntl.FormattedMessage, {
    id: step.label
  })), _react.default.createElement("div", {
    className: `${BASE_CLASS}__content`
  }, _react.default.createElement(_datePicker.DatePicker, {
    value: step.value,
    name: step.key,
    handleDayChange: e => handleDayChange(e)
  }))));
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var customers = _interopRequireWildcard(__webpack_require__(61));

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var _form = _interopRequireDefault(__webpack_require__(117));

var _form2 = __webpack_require__(122);

var _buttons = __webpack_require__(98);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const TYPE = `quotations`;

function EditQuotation(props) {
  const {
    quotation
  } = props,
        rest = _objectWithoutProperties(props, ["quotation"]);

  const {
    id
  } = props.match.params;
  const reference = quotation.get(`reference`);
  const titleProps = {
    id: `page.quotations.edit`,
    values: {
      reference
    }
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonSubmit, {
    formId: _form2.FORM_ID,
    isSaving: props.isSaving,
    label: "_.save"
  }), _react.default.createElement(_buttons.ShowInvoice, {
    withMessage: true,
    quotation: quotation
  }), _react.default.createElement(_buttons.ArchiveQuotation, {
    icon: true,
    danger: true,
    quotation: quotation,
    form: _form2.FORM_ID,
    label: "quotation.button.archive"
  }), _react.default.createElement(_buttons.CreateInvoice, {
    quotation: quotation,
    form: _form2.FORM_ID
  }), _react.default.createElement(_secondaryButtons.ButtonPreview, {
    type: TYPE,
    id: id,
    label: "quotation.button.preview"
  }), _react.default.createElement(_secondaryButtons.ButtonList, {
    type: TYPE,
    label: "quotation.button.list"
  }), _react.default.createElement(_secondaryButtons.ButtonNew, {
    type: TYPE,
    secondary: true,
    icon: true,
    label: "quotation.button.new"
  })), _react.default.createElement(_form.default, rest));
}

function state2prop(state) {
  return {
    quotation: state.quotations.get(`current`),
    isSaving: state.quotations.get(`isSaving`)
  };
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: EditQuotation,
  actionCreators: [quotations.getOne, customers.getAll]
}));

exports.default = _default;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var _main = __webpack_require__(93);

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var _alerts = __webpack_require__(87);

var _preview = __webpack_require__(104);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = `quotations`;

function PreviewQuotationPage(props) {
  const {
    id
  } = props.match.params;
  const {
    quotation
  } = props;
  const reference = quotation.get(`reference`);
  const titleProps = {
    id: `page.quotations.preview`,
    values: {
      reference
    }
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title), _react.default.createElement("html", {
    className: "dark-background"
  }))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonEdit, {
    type: TYPE,
    document: quotation,
    label: "_.edit"
  }), _react.default.createElement(_secondaryButtons.ButtonPrint, null), _react.default.createElement(_secondaryButtons.ButtonList, {
    type: TYPE,
    label: "quotation.button.list"
  }), _react.default.createElement(_secondaryButtons.ButtonNew, {
    type: TYPE,
    secondary: true,
    icon: true,
    label: "quotation.button.new"
  })), _react.default.createElement(_main.Main, null, _react.default.createElement(_main.Content, null, _react.default.createElement(_preview.PrintingNotice, null), _react.default.createElement(_preview.Preview, {
    type: "quotation",
    document: quotation
  }))));
}

function state2prop(state) {
  return {
    quotation: state.quotations.get(`current`)
  };
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: PreviewQuotationPage,
  actionCreators: [quotations.getOne]
}));

exports.default = _default;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var invoices = _interopRequireWildcard(__webpack_require__(60));

var _main = __webpack_require__(93);

var _secondary = __webpack_require__(77);

var _list = __webpack_require__(97);

var _list2 = __webpack_require__(94);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Invoices(props) {
  const titleProps = {
    id: `page.invoices`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.NavSecondary, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }), _react.default.createElement(_main.Main, null, _react.default.createElement(_main.Content, null, _react.default.createElement(_list2.ActiveInvoices, null), _react.default.createElement(_list.QuotationsReadyToInvoice, null))));
}

function state2props(state) {
  return {};
}

var _default = (0, _reactRedux.connect)(state2props)((0, _connectDataFetcher.default)({
  Component: Invoices,
  actionCreators: [invoices.listActive, quotations.listReadyToInvoice]
}));

exports.default = _default;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var invoices = _interopRequireWildcard(__webpack_require__(60));

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var _form = _interopRequireWildcard(__webpack_require__(128));

var _buttons = __webpack_require__(96);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const TYPE = `invoices`;

function EditInvoice(props) {
  const {
    id
  } = props.match.params;

  const {
    invoice
  } = props,
        rest = _objectWithoutProperties(props, ["invoice"]);

  const reference = invoice.get(`reference`);
  const titleProps = {
    id: `page.invoices.edit`,
    values: {
      reference
    }
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonSubmit, {
    formId: _form.FORM_ID,
    isSaving: props.isSaving,
    label: "_.save"
  }), _react.default.createElement(_buttons.ArchiveInvoice, {
    icon: true,
    danger: true,
    form: _form.FORM_ID,
    invoice: invoice,
    label: "invoices.button.archive"
  }), _react.default.createElement(_buttons.ShowQuotation, null), _react.default.createElement(_secondaryButtons.ButtonPreview, {
    type: TYPE,
    id: id,
    label: "invoices.button.preview"
  }), _react.default.createElement(_secondaryButtons.ButtonList, {
    type: TYPE,
    label: "invoices.button.list"
  })), _react.default.createElement(_form.default, rest));
}

function state2prop(state) {
  return {
    invoice: state.invoices.get(`current`),
    isSaving: state.invoices.get(`isSaving`)
  };
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: EditInvoice,
  actionCreators: [invoices.getOne]
}));

exports.default = _default;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FORM_ID = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _lodash = _interopRequireDefault(__webpack_require__(118));

var _crio = _interopRequireDefault(__webpack_require__(52));

var _shortid = _interopRequireDefault(__webpack_require__(58));

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var invoices = _interopRequireWildcard(__webpack_require__(60));

var redirection = _interopRequireWildcard(__webpack_require__(119));

var _getInputValue = __webpack_require__(80);

var _form = __webpack_require__(65);

var _spinner = __webpack_require__(121);

var _form2 = _interopRequireDefault(__webpack_require__(129));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FORM_ID = `invoice-form`;
exports.FORM_ID = FORM_ID;

function updatePayments(formData) {
  const payments = formData.get(`payments`);
  if (!_crio.default.isArray(payments)) return formData;
  const updatedPayments = payments.filter(payment => payment.message || payment.date || payment.amount).map(payment => {
    if (!payment._id) return payment.set(`_id`, (0, _shortid.default)());
    return payment;
  }).push((0, _crio.default)({
    _id: (0, _shortid.default)(),
    message: ``,
    date: ``,
    amount: 0
  }));
  return formData.set(`payments`, updatedPayments);
}

function removeLine({
  index,
  formData
}) {
  const payments = formData.get(`payments`);
  if (!_crio.default.isArray(payments)) return formData;
  return formData.set(`payments`, payments.splice(index, 1));
}

function recomputeTotals(formData) {
  const payments = formData.get(`payments`);
  if (!_crio.default.isArray(payments)) return formData;
  const total = formData.get(`total`);
  const paid = payments.reduce((acc, payment) => parseFloat(payment.amount, 10) + acc, 0);
  const left = total - paid;
  return formData.set(`totalPaid`, paid).set(`totalLeft`, left);
}

function updatePaymentsFieldPath(formData) {
  const payments = formData.get(`payments`);
  if (!_crio.default.isArray(payments)) return formData;
  const updated = payments.map((payment, index) => {
    return payment.set(`_fieldPath`, `payments[${index}]`);
  });
  return formData.set(`payments`, updated);
}

class InvoiceForm extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: InvoiceForm.updatePayments(props.invoice)
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleRemovePayment = this.handleRemovePayment.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const next = nextProps.invoice;
    const current = prevState.formData;
    const {
      history,
      staticContext,
      isSaving
    } = nextProps;
    if (isSaving) return null;
    if (current === next) return null; // redirects

    redirection.invoice({
      next,
      current,
      history,
      staticContext
    });
    return {
      formData: InvoiceForm.updatePayments(next)
    };
  } //----- UTILS


  static isPaymentFieldName(inputName) {
    return /^payments\[\d+\]/.test(inputName);
  }

  //----- EVENTS
  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true,
      empty: true
    });
    this.props.save({
      body
    });
  }

  handleFormChange(event) {
    const {
      name,
      value
    } = (0, _getInputValue.getInputValue)(event.target);
    this.setState(prevState => {
      let updated = prevState.formData.set(name, value);
      const isPaymentChange = InvoiceForm.isPaymentFieldName(name);
      if (isPaymentChange) updated = InvoiceForm.updatePayments(updated);
      return {
        formData: updated
      };
    });
  }

  handleDayChange(target) {
    return this.handleFormChange({
      target
    });
  }

  handleRemovePayment(index) {
    this.setState(prevState => {
      const {
        formData
      } = prevState;
      const updated = InvoiceForm.removeLine({
        formData,
        index
      });
      return {
        formData: updated
      };
    });
  } //----- RENDER


  render() {
    const {
      isSaving,
      isLoading
    } = this.props;
    const {
      formData
    } = this.state;
    if (isLoading) return _react.default.createElement(_spinner.Spinner, null);
    const renderProps = {
      invoice: formData,
      handle: {
        dayChange: this.handleDayChange,
        removePayment: this.handleRemovePayment
      }
    };
    return _react.default.createElement(_form.Form, {
      id: FORM_ID,
      isSaving: isSaving,
      onChange: this.handleFormChange,
      onSubmit: this.handleSubmit
    }, _react.default.createElement("input", {
      type: "hidden",
      defaultValue: formData.get(`id`),
      name: "id"
    }), _react.default.createElement(_form2.default, renderProps));
  }

}

_defineProperty(_defineProperty(InvoiceForm, "updatePayments", (0, _lodash.default)(updatePayments, updatePaymentsFieldPath, recomputeTotals)), "removeLine", (0, _lodash.default)(removeLine, updatePaymentsFieldPath, recomputeTotals));

function state2prop(state) {
  return {
    isSaving: state.invoices.get(`isSaving`),
    invoice: state.invoices.get(`current`),
    isLoading: state.invoices.get(`current.isLoading`)
  };
}

function dispatch2prop(dispatch) {
  return (0, _redux.bindActionCreators)({
    save: invoices.saveOne
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(state2prop, dispatch2prop)(InvoiceForm);

exports.default = _default;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InvoiceFormPres;
exports.BASE_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _form = __webpack_require__(65);

var _buttons = __webpack_require__(66);

var _progress = __webpack_require__(95);

var _preview = __webpack_require__(104);

var Tabs = _interopRequireWildcard(__webpack_require__(86));

var _buttons2 = __webpack_require__(96);

var _header = __webpack_require__(107);

var _eventsTable = __webpack_require__(108);

var EventsEditable = _interopRequireWildcard(__webpack_require__(130));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `invoice-form`;
exports.BASE_CLASS = BASE_CLASS;

function InvoiceFormPres(props) {
  const {
    invoice,
    handle
  } = props;
  const payments = invoice.get(`payments`);
  return _react.default.createElement(Tabs.Wrapper, null, _react.default.createElement(Tabs.List, null, _react.default.createElement(Tabs.Header, null, _react.default.createElement(_header.InvoiceHeader, {
    invoice: invoice
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.tab.payments"
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.tab.preview"
  }))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement(_progress.Progress, {
    max: invoice.get(`total`),
    value: invoice.get(`totalPaid`)
  }), _react.default.createElement(_eventsTable.InvoiceEvents, {
    invoice: invoice
  }, _react.default.createElement(EventsEditable.Sent, {
    invoice: invoice,
    handle: handle
  }), payments.map((payment, index) => _react.default.createElement(EventsEditable.Payment, {
    key: payment._id,
    payment: payment,
    index: index,
    notLast: index < payments.length - 1,
    handle: handle
  }))), _react.default.createElement(_form.FormActions, null, _react.default.createElement(_buttons.Button, {
    type: "submit"
  }, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.button.save"
  })), _react.default.createElement(_buttons2.ShowQuotation, null), _react.default.createElement(_buttons2.ArchiveInvoice, {
    danger: true,
    invoice: invoice
  }))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement(_preview.Preview, {
    type: "invoice",
    document: invoice
  })));
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sent = InvoiceEventSentEditable;
exports.Payment = InvoiceEventPaymentEditable;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactIntl = __webpack_require__(44);

var Table = _interopRequireWildcard(__webpack_require__(89));

var _datePicker = __webpack_require__(109);

var _buttons = __webpack_require__(66);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InvoiceEventSentEditable(props) {
  const {
    invoice,
    handle
  } = props;
  return _react.default.createElement(Table.Row, null, _react.default.createElement(Table.Cell, null), _react.default.createElement(Table.Cell, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.event.sent"
  })), _react.default.createElement(Table.Cell, {
    type: "text"
  }, " \u2013 "), _react.default.createElement(Table.Cell, null, _react.default.createElement(_datePicker.DatePicker, {
    name: "sendAt",
    value: invoice.get(`sendAt`),
    handleDayChange: handle.dayChange
  })), _react.default.createElement(Table.Cell, {
    type: "number"
  }, " \u2013 "), _react.default.createElement(Table.Cell, null));
}

function InvoiceEventPaymentEditable(props) {
  const {
    payment,
    handle,
    index,
    notLast
  } = props;
  return _react.default.createElement(Table.Row, {
    key: payment.get(`_id`)
  }, _react.default.createElement(Table.Cell, null, _react.default.createElement("input", {
    type: "hidden",
    name: `${payment._fieldPath}[_id]`,
    value: payment.get(`_id`)
  }), index + 1), _react.default.createElement(Table.Cell, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "invoices.event.payment"
  })), _react.default.createElement(Table.Cell, null, _react.default.createElement("input", {
    type: "text",
    key: `${payment._fieldPath}-${payment.get(`_id`)}-message`,
    name: `${payment._fieldPath}[message]`,
    defaultValue: payment.get(`message`)
  })), _react.default.createElement(Table.Cell, null, _react.default.createElement(_datePicker.DatePicker, {
    name: `${payment._fieldPath}[date]`,
    value: payment.get(`date`),
    handleDayChange: handle.dayChange
  })), _react.default.createElement(Table.Cell, null, _react.default.createElement("input", {
    type: "number",
    key: `${payment._fieldPath}-${payment.get(`_id`)}`,
    name: `${payment._fieldPath}[amount]`,
    defaultValue: payment.get(`amount`)
  })), _react.default.createElement(Table.Cell, null, notLast && _react.default.createElement(_buttons.BtnIcon, {
    linkAlike: true,
    onClick: e => handle.removePayment(index, payment._fieldPath),
    type: "button",
    svgId: "delete"
  })));
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var invoices = _interopRequireWildcard(__webpack_require__(60));

var _main = __webpack_require__(93);

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var _preview = __webpack_require__(104);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = `invoices`;

function PreviewInvoicePage(props) {
  const {
    invoice
  } = props;
  const reference = invoice.get(`reference`);
  const {
    id
  } = props.match.params;
  const titleProps = {
    id: `page.invoices.preview`,
    values: {
      reference
    }
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title), _react.default.createElement("html", {
    className: "dark-background"
  }))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonEdit, {
    type: TYPE,
    document: invoice,
    label: "_.edit"
  }), _react.default.createElement(_secondaryButtons.ButtonPrint, null), _react.default.createElement(_secondaryButtons.ButtonList, {
    type: TYPE,
    label: "invoices.button.list"
  })), _react.default.createElement(_main.Main, null, _react.default.createElement(_main.Content, null, _react.default.createElement(_preview.PrintingNotice, null), _react.default.createElement(_preview.Preview, {
    type: "invoice",
    document: invoice
  }))));
}

function state2prop(state) {
  return {
    invoice: state.invoices.get(`current`)
  };
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: PreviewInvoicePage,
  actionCreators: [invoices.getOne]
}));

exports.default = _default;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var customers = _interopRequireWildcard(__webpack_require__(61));

var _main = __webpack_require__(93);

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var _list = __webpack_require__(133);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = `customers`;

function Customers(props) {
  const titleProps = {
    id: `page.customers`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonNew, {
    type: TYPE,
    message: "customer.button.new"
  })), _react.default.createElement(_main.Main, null, _react.default.createElement(_main.Content, null, _react.default.createElement(_list.ActiveCustomers, null))));
}

var _default = (0, _reactRedux.connect)()((0, _connectDataFetcher.default)({
  Component: Customers,
  actionCreators: [customers.getAll]
}));

exports.default = _default;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCustomers = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRouterDom = __webpack_require__(29);

var _reactRedux = __webpack_require__(32);

var _redux = __webpack_require__(31);

var customers = _interopRequireWildcard(__webpack_require__(61));

var _uiTable = __webpack_require__(89);

var _format = __webpack_require__(84);

var _progress = __webpack_require__(95);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function CustomerRow(props) {
  const {
    customer
  } = props;
  const url = `/customers/${customer.id}`;
  return _react.default.createElement(_uiTable.Row, null, _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_reactRouterDom.Link, {
    to: url
  }, customer.name)), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.FormatNumber, {
    value: customer.quotationsCount
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.Amount, {
    value: customer.quotationsTotal
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.FormatNumber, {
    value: customer.invoicesCount
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_format.Amount, {
    value: customer.get(`invoicesTotal`)
  })), _react.default.createElement(_uiTable.Cell, null, _react.default.createElement(_progress.Progress, {
    tableLayout: true,
    value: customer.get(`invoicesTotalPaid`),
    max: customer.get(`invoicesTotal`)
  })));
}

const customerColumns = [{
  id: `name`,
  label: `table.header.name`,
  sort: `name`
}, {
  id: `quotations`,
  label: `table.header.quotations`,
  type: `number`
}, {
  id: `quotations-total`,
  label: `table.header.cumulative-amount`,
  type: `amount`
}, {
  id: `invoices`,
  label: `table.header.invoices`,
  type: `number`
}, {
  id: `invoices-total`,
  label: `table.header.cumulative-amount`,
  type: `amount`
}, {
  id: `invoices-paid`,
  label: `table.amount.paid`,
  type: `progress`
}];

function CustomerList(props) {
  const {
    customers = []
  } = props,
        rest = _objectWithoutProperties(props, ["customers"]);

  return _react.default.createElement(_uiTable.Table, _extends({
    presentation: true,
    columns: customerColumns
  }, rest), customers.map(customer => _react.default.createElement(CustomerRow, {
    key: customer.id,
    customer: customer
  })));
}

const ActiveCustomers = (0, _reactRedux.connect)(state => ({
  customers: state.customers.get(`active`),
  meta: state.customers.get(`meta.active`)
}), dispatch => (0, _redux.bindActionCreators)({
  handlePageSort: customers.getAll
}, dispatch))(CustomerList);
exports.ActiveCustomers = ActiveCustomers;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var customers = _interopRequireWildcard(__webpack_require__(61));

var _paperSheet = __webpack_require__(83);

var _main = __webpack_require__(93);

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var _form = _interopRequireWildcard(__webpack_require__(135));

var _form2 = _interopRequireDefault(__webpack_require__(136));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = `customers`;

const NewCustomer = props => {
  const {
    intl
  } = props;
  const titleProps = {
    id: `page.customers.new`
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonSubmit, {
    formId: _form.FORM_ID,
    isSaving: props.isSaving,
    label: "_.create"
  }), _react.default.createElement(_secondaryButtons.ButtonList, {
    type: TYPE,
    label: "customer.button.list"
  })), _react.default.createElement(_form.default, props, _react.default.createElement(_main.Main, {
    withMeta: true
  }, _react.default.createElement(_main.Meta, null, _react.default.createElement(_form.FormContext.Consumer, null, context => _react.default.createElement(_form2.default, context))), _react.default.createElement(_main.Content, null, _react.default.createElement(_paperSheet.PaperSheet, {
    part: "top"
  }, _react.default.createElement(_paperSheet.Between, null, _react.default.createElement(_paperSheet.PartyUser, null), _react.default.createElement(_form.FormContext.Consumer, null, context => _react.default.createElement(_paperSheet.Party, {
    title: "to",
    people: context.formData
  }))))))));
};

function state2prop(state) {
  return {
    isSaving: state.customers.get(`isSaving`),
    customer: state.customers.get(`current`)
  };
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: NewCustomer,
  actionCreators: [customers.getOne]
}));

exports.default = _default;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormContext = exports.FORM_ID = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactRouterDom = __webpack_require__(29);

var _formSerialize = _interopRequireDefault(__webpack_require__(63));

var customers = _interopRequireWildcard(__webpack_require__(61));

var redirection = _interopRequireWildcard(__webpack_require__(119));

var _spinner = _interopRequireDefault(__webpack_require__(121));

var _form = __webpack_require__(65);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FORM_ID = `customer-form`;
exports.FORM_ID = FORM_ID;

const FormContext = _react.default.createContext({});

exports.FormContext = FormContext;

class CustomerForm extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.customer
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const next = nextProps.customer;
    const current = prevState.formData;
    const {
      isSaving,
      history,
      staticContext
    } = nextProps;
    if (isSaving) return null;
    if (current === next) return null; // redirects

    const redirect = redirection.customer({
      next,
      current,
      history,
      staticContext
    });
    if (redirect) return null;
    return {
      formData: next
    };
  } //----- EVENTS


  handleSubmit(event) {
    event.preventDefault();
    const body = (0, _formSerialize.default)(event.target, {
      hash: true,
      empty: true
    });
    this.props.saveOne({
      body
    });
  }

  handleFormChange(event) {
    const {
      target
    } = event;
    const {
      name,
      value
    } = target;
    this.setState(prevState => {
      const updated = prevState.formData.set(name, value);
      return {
        formData: updated
      };
    });
  } //----- RENDER


  render() {
    const {
      formData
    } = this.state;
    const {
      isSaving
    } = this.props;
    const {
      isLoading
    } = formData;
    if (isLoading) return _react.default.createElement(_spinner.default, null);
    const formProps = {
      formData,
      isSaving
    };
    return _react.default.createElement(_form.Form, {
      id: `${FORM_ID}`,
      isSaving: isSaving,
      onSubmit: this.handleSubmit,
      onChange: this.handleFormChange
    }, formData.id && _react.default.createElement("input", {
      type: "hidden",
      value: formData.id,
      name: "id"
    }), _react.default.createElement(FormContext.Provider, {
      value: formProps
    }, this.props.children));
  }

}

function dispatch2props(dispatch) {
  return (0, _redux.bindActionCreators)({
    saveOne: customers.saveOne
  }, dispatch);
}

var _default = (0, _reactRedux.connect)(null, dispatch2props)(CustomerForm);

exports.default = _default;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CustomerFormPres;

var _react = _interopRequireDefault(__webpack_require__(27));

var _field = __webpack_require__(70);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CustomerFormPres(props) {
  const {
    formData
  } = props;
  return _react.default.createElement("div", {
    className: "customer-fields"
  }, _react.default.createElement(_field.Input, {
    name: "name",
    label: "field.name",
    value: formData.name
  }), _react.default.createElement(_field.Textarea, {
    name: "address",
    label: "field.address",
    value: formData.address
  }));
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _redux = __webpack_require__(31);

var _reactRedux = __webpack_require__(32);

var _reactIntl = __webpack_require__(44);

var _reactHelmet = __webpack_require__(34);

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(64));

var customers = _interopRequireWildcard(__webpack_require__(61));

var quotations = _interopRequireWildcard(__webpack_require__(59));

var invoices = _interopRequireWildcard(__webpack_require__(60));

var Paper = _interopRequireWildcard(__webpack_require__(83));

var _secondary = _interopRequireDefault(__webpack_require__(77));

var _secondaryButtons = __webpack_require__(78);

var Tabs = _interopRequireWildcard(__webpack_require__(86));

var _format = __webpack_require__(84);

var _progress = __webpack_require__(95);

var _list = __webpack_require__(97);

var _list2 = __webpack_require__(94);

var _form = _interopRequireWildcard(__webpack_require__(135));

var _form2 = _interopRequireDefault(__webpack_require__(136));

var _header = __webpack_require__(138);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = `customers`;

function EditCustomer(props) {
  const {
    customer
  } = props;
  const name = customer.get(`name`);
  const titleProps = {
    id: `page.customers.edit`,
    values: {
      name
    }
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactIntl.FormattedMessage, titleProps, title => _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, title))), _react.default.createElement(_secondary.default, {
    title: _react.default.createElement(_reactIntl.FormattedMessage, titleProps)
  }, _react.default.createElement(_secondaryButtons.ButtonSubmit, {
    formId: _form.FORM_ID,
    isSaving: props.isSaving,
    label: "_.save"
  }), _react.default.createElement(_secondaryButtons.ButtonList, {
    type: TYPE,
    label: "customer.button.list"
  }), _react.default.createElement(_secondaryButtons.ButtonNew, {
    type: TYPE,
    icon: true,
    secondary: true,
    label: "customer.button.new"
  })), _react.default.createElement(_form.default, props, _react.default.createElement(Tabs.Wrapper, null, _react.default.createElement(Tabs.List, null, _react.default.createElement(Tabs.Header, null, _react.default.createElement(_header.CustomerHeader, {
    customer: customer
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "_.quotations"
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "_.invoices"
  })), _react.default.createElement(Tabs.Tab, null, _react.default.createElement(_reactIntl.FormattedMessage, {
    id: "customer.tab.configuration"
  }))), _react.default.createElement(Tabs.Panel, null, _react.default.createElement(_list.CustomerQuotations, null)), _react.default.createElement(Tabs.Panel, null, _react.default.createElement(_list2.CustomerInvoices, null)), _react.default.createElement(Tabs.Panel, null, _react.default.createElement(_form.FormContext.Consumer, null, context => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_form2.default, context), _react.default.createElement(Paper.Sheet, {
    part: "top"
  }, _react.default.createElement(Paper.Between, null, _react.default.createElement(Paper.User, null), _react.default.createElement(Paper.Party, {
    title: "to",
    people: context.formData
  })))))))));
}

function state2prop(state) {
  return {
    isSaving: state.customers.get(`isSaving`),
    customer: state.customers.get(`current`)
  };
}

var _default = (0, _reactRedux.connect)(state2prop)((0, _connectDataFetcher.default)({
  Component: EditCustomer,
  actionCreators: [customers.getOne, quotations.listForCustomer, invoices.listForCustomer]
}));

exports.default = _default;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerHeader = CustomerHeader;

var _react = _interopRequireDefault(__webpack_require__(27));

var Format = _interopRequireWildcard(__webpack_require__(84));

var KeyPres = _interopRequireWildcard(__webpack_require__(105));

var _progress = __webpack_require__(95);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CustomerHeader(props) {
  const {
    customer
  } = props;
  return _react.default.createElement(KeyPres.Wrapper, null, _react.default.createElement(KeyPres.Label, {
    id: "customer.total.quotation"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Amount, {
    value: customer.get(`quotationsTotal`)
  })), _react.default.createElement(KeyPres.Label, {
    id: "customer.total.invoice"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Amount, {
    value: customer.get(`invoicesTotal`)
  })), _react.default.createElement(KeyPres.Label, {
    id: "customer.total.to-be-paid"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(Format.Amount, {
    value: customer.get(`invoicesTotalLeft`)
  })), _react.default.createElement(KeyPres.Label, {
    id: "customer.total.progress"
  }), _react.default.createElement(KeyPres.Value, null, _react.default.createElement(_progress.Progress, {
    value: customer.get(`invoicesTotalPaid`),
    max: customer.get(`invoicesTotal`)
  })));
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(27));

var _reactRouterDom = __webpack_require__(29);

var _reactHelmet = __webpack_require__(34);

var _boarding = _interopRequireDefault(__webpack_require__(49));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NotFound = () => // we need a route to have access to staticContext
_react.default.createElement(_reactRouterDom.Route, {
  render: ({
    staticContext
  }) => {
    // staticContext is server only
    // put some infos here so the server can know things
    if (staticContext) {
      staticContext.status = 404;
    }

    return _react.default.createElement(_boarding.default, {
      title: "404"
    }, _react.default.createElement("h2", null, "not found"));
  }
});

var _default = NotFound;
exports.default = _default;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = __webpack_require__(31);

var _customers = _interopRequireDefault(__webpack_require__(61));

var _quotations = _interopRequireDefault(__webpack_require__(59));

var _invoices = _interopRequireDefault(__webpack_require__(60));

var _notifications = _interopRequireDefault(__webpack_require__(57));

var _account = _interopRequireWildcard(__webpack_require__(51));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appReducer = (0, _redux.combineReducers)({
  customers: _customers.default,
  quotations: _quotations.default,
  invoices: _invoices.default,
  notifications: _notifications.default,
  account: _account.default
}); // make a global reducer
// • this will allow us to manipulate all the state for logout
//   https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992

const rootReducer = (state, action) => {
  if (action.type === _account.LOGOUT.SUCCESS) state = void 0;
  if (action.type === _account.AUTH.ERROR) state = void 0;
  return appReducer(state, action);
};

var _default = rootReducer;
exports.default = _default;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1dGlsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hhbGtcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2FcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtYm9keVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImtvYS1zdGF0aWNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtY29tcHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtbG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia29hLWpzb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2Etcm91dGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia29hLXNzbGlmeVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImtvYS1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvY29uZmlnLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJjXCIiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGluZy1hcGktYmFja3VwLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaC5pc25pbFwiIiwid2VicGFjazovLy8uL3NoYXJlZC9pc28tZmV0Y2guanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaXNvbW9ycGhpYy1mZXRjaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaC5tZXJnZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybC1qb2luXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianMtY29va2llXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicXVlcnktc3RyaW5nXCIiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2lzb21vcnBoaWMtY29uZmlnLXNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcm91dGluZy1rb2EtcmVhY3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3Qtcm91dGVyLWRvbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1jb25maWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXgtdGh1bmtcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1oZWxtZXRcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcmVuZGVyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VyaWFsaXplLWphdmFzY3JpcHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpbnRsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaW50bC1sb2NhbGVzLXN1cHBvcnRlZFwiIiwid2VicGFjazovLy8uL3NoYXJlZC9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2F1dGhlbnRpY2F0aW9uLXJlcXVpcmVkLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hdXRoZW50aWNhdGlvbi1mb3JiaWRkZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2xheW91dC9yb290LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWludGxcIiIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbG9jYWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbG9jYWxlcy9lbi5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbG9jYWxlcy9mci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvZXJyb3ItYm91bmRhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2xheW91dC9ib2FyZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbmF2L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2R1Y2tzL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3Jpb1wiIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy91dGlscy9jcmVhdGUtYWN0aW9uLW5hbWVzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy91dGlscy9mZXRjaC1kaXNwYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbm90aWZpY2F0aW9ucy9saXN0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9ub3RpZmljYXRpb25zL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2R1Y2tzL25vdGlmaWNhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2hvcnRpZFwiIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy9xdW90YXRpb25zLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy9pbnZvaWNlcy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvZHVja3MvY3VzdG9tZXJzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hY2NvdW50L3BhZ2UtbG9naW4uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZm9ybS1zZXJpYWxpemVcIiIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvY29ubmVjdC1kYXRhLWZldGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpL2J1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3NuYW1lc1wiIiwid2VicGFjazovLy8uL3NoYXJlZC91aS9zdmctaWNvbnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvcC10eXBlc1wiIiwid2VicGFjazovLy8uL3NoYXJlZC91aS9maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvdGV4dGFyZWEtYXV0by1yZXNpemUuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2FjY291bnQvcGFnZS1yZWdpc3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvYWNjb3VudC9wYWdlLXNldC1wYXNzd29yZC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvYWNjb3VudC9wYWdlLWZvcmdvdC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvYWNjb3VudC9wYWdlLXJlc2V0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hY2NvdW50L3BhZ2Utc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL25hdi9zZWNvbmRhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL25hdi9zZWNvbmRhcnktYnV0dG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvYWNjb3VudC9zZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdXRpbHMvZ2V0LWlucHV0LXZhbHVlLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91dGlscy9jb21wdXRlLXRvdGFsLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hY2NvdW50L3NldHRpbmdzLnByZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2xheW91dC9wYXBlci1zaGVldC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvZm9ybWF0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hcmtlZFwiIiwid2VicGFjazovLy8uL3NoYXJlZC91aS90YWJzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS9hbGVydHMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpLXRhYmxlL3Byb2R1Y3RzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS10YWJsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWktdGFibGUvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWktdGFibGUvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9ob21lL3BhZ2UtaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbGF5b3V0L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2ludm9pY2VzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpL3Byb2dyZXNzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pbnZvaWNlcy9idXR0b25zLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9xdW90YXRpb25zL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3F1b3RhdGlvbnMvYnV0dG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvaG9tZS9jaGFydHMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpL3BpZS1jaGFydC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2gucm91bmRcIiIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvYXJjaGl2ZS9wYWdlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2FyY2hpdmUvcGFnZS1xdW90YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpL3ByZXZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpL2tleS1wcmVzZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2FyY2hpdmUvcGFnZS1pbnZvaWNlLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pbnZvaWNlcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2ludm9pY2VzL2V2ZW50cy10YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvZGF0ZS1waWNrZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZGF5LXBpY2tlci9EYXlQaWNrZXJJbnB1dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRheS1waWNrZXIvbW9tZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9tZW50L2xvY2FsZS9lbi1nYlwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC9sb2NhbGUvZnJcIiIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvaW52b2ljZXMvZXZlbnRzLXJlYWQtb25seS5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvcXVvdGF0aW9ucy9wYWdlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3F1b3RhdGlvbnMvcGFnZS1uZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3F1b3RhdGlvbnMvZm9ybS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2guZmxvd1wiIiwid2VicGFjazovLy8uL3NoYXJlZC91dGlscy9jaGVjay1yZWRpcmVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdXRpbHMvZmlsdGVyLWFycmF5LXdpdGgtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS9zcGlubmVyLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9xdW90YXRpb25zL2Zvcm0ucHJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvc3RlcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvcXVvdGF0aW9ucy9wYWdlLWVkaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3F1b3RhdGlvbnMvcGFnZS1wcmV2aWV3LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pbnZvaWNlcy9wYWdlLWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2ludm9pY2VzL3BhZ2UtZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvaW52b2ljZXMvZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvaW52b2ljZXMvZm9ybS5wcmVzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pbnZvaWNlcy9ldmVudHMtZWRpdGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2ludm9pY2VzL3BhZ2UtcHJldmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvY3VzdG9tZXJzL3BhZ2UtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvY3VzdG9tZXJzL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2N1c3RvbWVycy9wYWdlLW5ldy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvY3VzdG9tZXJzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2N1c3RvbWVycy9mb3JtLnByZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2N1c3RvbWVycy9wYWdlLWVkaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2N1c3RvbWVycy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3BhZ2Utbm90LWZvdW5kLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy9jb21iaW5lZC1yZWR1Y2Vycy5qcyJdLCJuYW1lcyI6WyJhcHAiLCJLb2EiLCJ1c2UiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImNvbmZpZyIsImVuZm9yY2VIdHRwcyIsImN0eCIsIm5leHQiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiY29sb3JzIiwic3RhdHVzIiwic3RhdHVzQ29kZSIsImJvZHkiLCJyZW5kZXIiLCJlcnJvclBhZ2UiLCJyZWFzb24iLCJtZXNzYWdlIiwic3RhY2t0cmFjZSIsInN0YWNrIiwicm91dGVyIiwiUm91dGVyIiwiYXBpQmFja3VwUm91dGVzIiwicm91dGVzIiwicmVhY3RSb3V0ZXMiLCJzZXJ2ZXIiLCJsaXN0ZW4iLCJQT1JUIiwiZW5kSW5pdCIsImNoYWxrIiwiY3lhbiIsImFkZHJlc3MiLCJwb3J0IiwiTk9ERV9FTlYiLCJBUElfVVJMIiwiQ09PS0lFX05BTUUiLCJIT1NUX1VSTCIsIkFQUF9OQU1FIiwicHJvY2VzcyIsImVudiIsImlzRGV2IiwiaXNQcm9kIiwiZ3JlZW4iLCJwcm94eVJlcXVlc3QiLCJ1cmwiLCJoZWFkZXIiLCJyZXF1ZXN0IiwiZmV0Y2hPcHRpb25zIiwibWV0aG9kIiwidG9Mb3dlckNhc2UiLCJyZXNwb25zZSIsInBheWxvYWQiLCJpc29GZXRjaCIsImNvb2tpZSIsIm9rIiwic3RhdHVzVGV4dCIsImFjY2Vzc1Rva2VuIiwiYWNjZXNzX3Rva2VuIiwiY29va2llcyIsInNldCIsInN0YXRlIiwiZ2V0IiwicmVkaXJlY3QiLCJwb3N0IiwiaWQiLCJwYXJhbXMiLCJkZWZhdWx0T3B0aW9ucyIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImNyZWF0ZSIsInRvVXBwZXJDYXNlIiwib3B0aW9ucyIsImp3dCIsInF1ZXJ5IiwiSlNPTiIsInN0cmluZ2lmeSIsIkJST1dTRVIiLCJDb29raWVzIiwiQXV0aG9yaXphdGlvbiIsImZldGNoVXJsIiwicXVlcnlTdHJpbmciLCJmZXRjaCIsImpzb24iLCJlcnJvciIsInJlZHV4QWN0aW9uTG9nZ2VyIiwiZ2V0U3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicmV0dXJuVmFsdWUiLCJoYXNFcnJvciIsImNvbG9yIiwicmVkIiwic3RvcmUiLCJyZWR1Y2VyIiwidGh1bmsiLCJicmFuY2giLCJpbml0RmV0Y2hlcyIsImZpbHRlciIsInJvdXRlIiwiY29tcG9uZW50IiwiZmV0Y2hEYXRhIiwiRnVuY3Rpb24iLCJtYXAiLCJtYXRjaCIsImRpc3BhdGNoIiwiUHJvbWlzZSIsImFsbCIsInN0YXRpY0NvbnRleHQiLCJjb250ZW50IiwiaGVsbWV0IiwiSGVsbWV0IiwicmVuZGVyU3RhdGljIiwicmVhY3RBcHAiLCJJbnRsIiwiTnVtYmVyRm9ybWF0IiwiSW50bFBvbHlmaWxsIiwiRGF0ZVRpbWVGb3JtYXQiLCJDTElFTlRfQ09ORklHIiwiaXNKU09OIiwiU1ZHX0lDT05TX1BBVEgiLCJTVkdfSUNPTlMiLCJmcyIsInJlYWRGaWxlU3luYyIsIklOSVRJQUxfU1RBVEUiLCJodG1sQXR0cmlidXRlcyIsInRvU3RyaW5nIiwidGl0bGUiLCJtZXRhIiwibGluayIsImJvZHlBdHRyaWJ1dGVzIiwicmVuZGVyU3RhY2tUcmFjZSIsIkFycmF5IiwiaXNBcnJheSIsIlJvb3QiLCJleGFjdCIsIkxvZ2luIiwiUmVnaXN0ZXIiLCJTZXRQYXNzd29yZCIsIkZvcmdvdCIsIlJlc2V0IiwiSG9tZSIsIkFyY2hpdmVMaXN0IiwiQXJjaGl2ZVF1b3RhdGlvbiIsIkFyY2hpdmVJbnZvaWNlIiwiU2V0dGluZ3MiLCJRdW90YXRpb25zTGlzdCIsIlF1b3RhdGlvbnNOZXciLCJRdW90YXRpb25zRWRpdCIsIlF1b3RhdGlvbnNQcmV2aWV3IiwiSW52b2ljZXNMaXN0IiwiSW52b2ljZXNFZGl0IiwiSW52b2ljZXNQcmV2aWV3IiwiQ3VzdG9tZXJzTGlzdCIsIkN1c3RvbWVyTmV3IiwiQ3VzdG9tZXJFZGl0IiwiTm90Rm91bmQiLCJQVUJMSUNfUk9PVCIsImF1dGhlbnRpY2F0aW9uUmVxdWlyZWQiLCJDb21wb25lbnQiLCJBdXRoUmVxdWlyZWQiLCJwcm9wcyIsImlzQXV0aGVudGljYXRlZCIsInN0YXRlMnByb3AiLCJhY2NvdW50IiwiUFJJVkFURV9ST09UIiwiYXV0aGVudGljYXRpb25Gb3JiaWRkZW4iLCJBdXRoRm9yYmlkZGVuIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJsYW5nIiwibG9jYWxlcyIsIm5hbWUiLCJzdGF0ZTJwcm9wcyIsIkVycm9yU3RhY2siLCJlcnJvckluZm8iLCJ3aGl0ZVNwYWNlIiwiY29tcG9uZW50U3RhY2siLCJFcnJvckJvdW5kYXJ5IiwiY29tcG9uZW50RGlkQ2F0Y2giLCJzZXRTdGF0ZSIsIklTX1BST0QiLCJJU19ERVYiLCJjaGlsZHJlbiIsIkJBU0VfQ0xBU1MiLCJMYXlvdXRCb2FyZGluZyIsIklURU1fQ0xBU1MiLCJBQ1RJVkVfQ0xBU1MiLCJMb2dvdXRCdXR0b24iLCJsb2dvdXQiLCJiaW5kIiwiZSIsInByZXZlbnREZWZhdWx0IiwiQ29ubmVjdGVkTmF2IiwiZW1haWwiLCJDb25uZWN0aW9uTmF2IiwiTWFpbk5hdiIsImRpc3BhdGNoMnByb3BzIiwiTkFNRSIsIkFVVEgiLCJTVEFUSVNUSUNTIiwiTE9HSU4iLCJGT1JHT1QiLCJTRVRfUEFTU1dPUkQiLCJSRVNFVCIsIkxPR09VVCIsIlJFR0lTVEVSIiwiVVBEQVRFIiwiaW5pdGlhbFN0YXRlIiwiaXNTYXZpbmciLCJ1c2VyIiwic3RhdGlzdGljcyIsIlNVQ0NFU1MiLCJFUlJPUiIsIkxPQURJTkciLCJET05FIiwiYXV0aCIsImFjdGlvbnMiLCJsb2dpbiIsInJlZ2lzdGVyIiwiZm9yZ290Iiwic2V0UGFzc3dvcmQiLCJyZXNldCIsInVwZGF0ZVNldHRpbmdzIiwiQVBQX1BSRUZJWCIsInByZWZpeGVzIiwibG9hZGluZyIsImRvbmUiLCJzdWNjZXNzIiwiY3JlYXRlQWN0aW9uTmFtZXMiLCJkb21haW4iLCJfbWV0aG9kIiwiZmV0Y2hEaXNwYXRjaCIsIl9mZXRjaERpc3BhdGNoRXJyb3JUeXBlIiwiTk9USUZJQ0FUSU9OX0xJRkVUSU1FIiwiTm90aWZpY2F0aW9ucyIsIm5vdGlmaWNhdGlvbnMiLCJoYXNOb3RpZmljYXRpb25zIiwibiIsIl9pZCIsImhhbmRsZVJlbW92ZSIsImxlbmd0aCIsInJlc3VsdCIsImRpc3BhdGNoMnByb3AiLCJyZW1vdmVPbmUiLCJOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJhdXRvUmVtb3ZlIiwiY29tcG9uZW50RGlkTW91bnQiLCJ0aW1lcklkIiwic2V0VGltZW91dCIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY2xlYXJUaW1lb3V0IiwiaTE4bklkIiwiYWRkaXRpb25hbENvbnRlbnQiLCJ2YWx1ZXMiLCJSRU1PVkUiLCJBTExfUE9TVCIsInBvc3RTdWNjZXNzUmVnZXhwIiwiUmVnRXhwIiwicG9zdEVycm9yUmVnZXhwIiwibm90aWZ5U3VjY2VzcyIsInB1c2giLCJub3RpZnlFcnJvciIsInRlc3QiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJBQ0NPVU5UX0xPR0lOIiwiQUNDT1VOVF9SRVNFVCIsIkFDQ09VTlRfUkVHSVNURVIiLCJBQ0NPVU5UX0ZPUkdPVCIsIlFVT1RBVElPTl9TQVZFX09ORSIsIlFVT1RBVElPTl9DUkVBVEVfSU5WT0lDRSIsIklOVk9JQ0VfU0FWRV9PTkUiLCJDVVNUT01FUl9TQVZFX09ORSIsIkxJU1RfQUNUSVZFIiwiTElTVF9BUkNISVZFRCIsIkxJU1RfR0VUX1JFQURZX0lOVk9JQ0UiLCJMSVNUX0ZPUl9DVVNUT01FUiIsIkdFVF9PTkUiLCJTQVZFX09ORSIsIkFSQ0hJVkVfUVVPVEUiLCJDUkVBVEVfSU5WT0lDRSIsImlzTG9hZGluZyIsInJlZmVyZW5jZSIsInByb2R1Y3RzIiwiYWN0aXZlIiwiYXJjaGl2ZWQiLCJyZWFkeVRvSW52b2ljZSIsImN1cnJlbnQiLCJyb3dzIiwicmVtb3ZlSWQiLCJxdW90YXRpb24iLCJ1cGRhdGVkIiwiZmluZEluZGV4IiwicXVvdCIsImxpc3RBY3RpdmUiLCJsaXN0QXJjaGl2ZWQiLCJsaXN0UmVhZHlUb0ludm9pY2UiLCJsaXN0Rm9yQ3VzdG9tZXIiLCJyZXN0IiwiZ2V0T25lIiwic2F2ZU9uZSIsImlzTmV3IiwidXJsSWQiLCJhcmNoaXZlT25lIiwiY3JlYXRlSW52b2ljZSIsIkFSQ0hJVkUiLCJFTVBUWSIsImludm9pY2UiLCJHRVRfQUxMIiwiZ2V0QWxsIiwiaGFuZGxlU3VibWl0IiwiZXZlbnQiLCJ0YXJnZXQiLCJoYXNoIiwidGl0bGVQcm9wcyIsImFjdGlvbkNyZWF0b3JzIiwiSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCIsImNvbm5lY3REYXRhRmV0Y2hlcnMiLCJ1bnNoaWZ0IiwiRGF0YUZldGNoZXJzV3JhcHBlciIsImFjdGlvbkNyZWF0b3IiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJsb2NhdGlvbiIsInByZXZMb2NhdGlvbiIsImlzVXJsQ2hhbmdlZCIsInBhdGhuYW1lIiwic2VhcmNoIiwiX2ZldGNoRGF0YU9uQ2xpZW50IiwiRm9ybSIsImNsYXNzTmFtZSIsIm90aGVycyIsIkZPUk1fQ0xBU1MiLCJGb3JtQWN0aW9ucyIsIkJ1dHRvbiIsInRvIiwic2Vjb25kYXJ5IiwibGlua0FsaWtlIiwiZGFuZ2VyIiwiQ09NUF9DTEFTUyIsIkJUTl9JQ09OX0NMQVNTIiwiQnRuSWNvbiIsInN2Z0lkIiwibGFiZWwiLCJJY29uIiwib3RoZXIiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiaXNFbXB0eSIsInZhbHVlIiwiZW5zdXJlVmFsdWUiLCJpZFRvQ2xhc3NOYW1lIiwicmVwbGFjZSIsImZpZWxkV3JhcHBlciIsIkNvbnRyb2xDb21wb25lbnQiLCJmaWVsZFR5cGUiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVCbHVyIiwiZGFya0JnIiwib25DaGFuZ2UiLCJvbkJsdXIiLCJfaWQyY2xhc3MiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwid3JhcHBlclByb3BzIiwibGFiZWxQcm9wcyIsImh0bWxGb3IiLCJjb250cm9sUHJvcHMiLCJkZWZhdWx0VmFsdWUiLCJpc1RvdWNoZWQiLCJpc1ByaXN0aW5lIiwiY29udHJvbFZhbHVlIiwiaXNFbXB0eVZhbHVlIiwicHJldlN0YXRlIiwiZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzIiwibmV4dFByb3BzIiwiaXNWYWx1ZVVwZGF0ZSIsImlzT3B0aW9uc1VwZGF0ZSIsInVwZGF0ZSIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImNvbnRyb2xFbCIsIldyYXBwZXJDbGFzc05hbWUiLCJlbCIsIklucHV0IiwiY29udHJvbFJlZiIsIlRleHRhcmVhIiwia2V5RGVmYXVsdCIsIlNlbGVjdCIsIm9wdGlvbnNLZXlzIiwiaGFzT3B0aW9ucyIsImMiLCJDaGVja0JveCIsImRlZmF1bHRDaGVja2VkIiwiaWNvbk5hbWUiLCJUZXh0YXJlYUF1dG9SZXNpemUiLCJhdXRvUmVzaXplIiwiY3JlYXRlUmVmIiwicmVjb21wdXRlVGV4dGFyZWFTaXplIiwib3JpZ2luYWxSb3dzIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxUb3AiLCJwbGFjZWhvbGRlciIsInNob3dQbGFjZWhvbGRlciIsInBsYWNlSG9sZGVyIiwiTUFJTF9SRURJUkVDVF9VUkwiLCJ0b2tlbiIsInBhcnNlIiwiRWRpdFByb2ZpbGUiLCJGT1JNX0lEIiwiTmF2U2Vjb25kYXJ5IiwiaXNTdHVjayIsImhhbmRsZUludGVyc2VjdGlvbiIsIm9ic2VydmVJbnRlcnNlY3Rpb24iLCJ1bm9ic2VydmVJbnRlcnNlY3Rpb24iLCJlbnRyaWVzIiwic2VudGluZWxFbnRyeSIsImludGVyc2VjdGlvblJhdGlvIiwid2luZG93IiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJ3cmFwcGVyIiwic2VudGluZWwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RDaGlsZCIsIm9ic2VydmVyIiwib2JzZXJ2ZSIsImRpc2Nvbm5lY3QiLCJzdGlja3lDbGFzcyIsIkJ1dHRvbkxpc3QiLCJCdXR0b25QcmV2aWV3IiwiQnV0dG9uUHJpbnQiLCJwcmludCIsIkJ1dHRvbkVkaXQiLCJpc0FyY2hpdmVkIiwiQnV0dG9uTmV3IiwiaWNvbiIsImljb25JZCIsInJlbmRlclByb3BzIiwiQnV0dG9uU3VibWl0IiwiZm9ybUlkIiwiU2V0dGluZ0Zvcm0iLCJmb3JtRGF0YSIsImhhbmRsZUZvcm1DaGFuZ2UiLCJlbXB0eSIsImdldElucHV0VmFsdWUiLCJjaGVja2VkIiwicm91bmRUb05lYXJlc3RRdWFydGVyIiwibnVtYmVyIiwicm91bmRlZCIsIk1hdGgiLCJyb3VuZCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwiZW5mb3JjZU51bWJlciIsImlzTmFOIiwicHJvZHVjdFRvdGFsIiwicHJvZHVjdCIsImNsZWFuZWRQcm9kdWN0IiwiZm9yRWFjaCIsImtleSIsInF1YW50aXR5IiwicHJpY2UiLCJ0b3RhbHMiLCJ0YXgiLCJjcmlvIiwidGF4UmF0ZSIsInRvdGFsTmV0IiwicmVkdWNlIiwiYWNjIiwidG90YWxUYXgiLCJ0b3RhbCIsImN1c3RvbWVyRXhhbXBsZSIsImN1cnJlbmNpZXMiLCJsYW5ndWFnZXMiLCJTZXR0aW5nRm9ybVByZXMiLCJxdW90YXRpb25Db25maWciLCJpbnZvaWNlQ29uZmlnIiwicHJvZHVjdENvbmZpZyIsImZha2VRdW90YXRpb25SZWZlcmVuY2UiLCJ1cGRhdGVkQXQiLCJEYXRlIiwidG9VVENTdHJpbmciLCJwcmVmaXgiLCJzdGFydEF0IiwiZmFrZUludm9pY2VSZWZlcmVuY2UiLCJmYWtlRG9jdW1lbnQiLCJkZXNjcmlwdGlvbiIsIm1lcmdlIiwiY29tcHV0ZSIsImN1cnJlbmN5IiwibWVudGlvbnMiLCJQYXBlclNoZWV0IiwicGFydCIsInByZXZpZXciLCJSZWZlcmVuY2UiLCJSRUZfQ0xBU1MiLCJCZXR3ZWVuIiwiUGFydHkiLCJwZW9wbGUiLCJQQVJUWV9DTEFTUyIsIlBhcnR5VXNlciIsIlN1YmplY3QiLCJNZW50aW9ucyIsIk1FTlRJT05TX0NMQVNTIiwicGFyc2VWYWx1ZSIsInBhcnNlZCIsIk51bWJlciIsImlzRmluaXRlIiwiQW1vdW50UHJlcyIsInNhZmVWYWx1ZSIsIkFtb3VudCIsIkZvcm1hdE51bWJlciIsIlBlcmNlbnQiLCJEYXkiLCJNYXJrZG93biIsInRleHQiLCJpc1RleHQiLCJfX2h0bWwiLCJicmVha3MiLCJUYWJzIiwiVGFiTGlzdCIsInRhYnNJZHMiLCJtYWtlVGFicyIsInNlbGVjdGVkIiwic3RvcFByb3BhZ2F0aW9uIiwicGFyc2VJbnQiLCJjb3VudCIsInRhYnNDb250ZW50IiwiQ2hpbGRyZW4iLCJjaGlsZCIsImlzVGFiIiwiVGFiIiwiY2xvbmVFbGVtZW50IiwiVGFiTGlzdEhlYWRlciIsIlRhYlBhbmVsIiwiQWxlcnQiLCJ3YXJuaW5nIiwiUHJvZHVjdExpbmVFZGl0YWJsZSIsImlzTGFzdCIsImZpZWxkUGF0aCIsIm9iamVjdCIsImJvb2wiLCJmdW5jIiwiUHJvZHVjdExpbmVEaXNwbGF5IiwiUHJvZHVjdFRvdGFsRm9vdGVyIiwicmVhZE9ubHkiLCJjb2xTcGFuIiwiUHJvZHVjdHNDb2x1bW5zIiwiUHJvZHVjdFRhYmxlIiwiaGlkZUNvbHVtbnMiLCJQcm9kdWN0TGluZSIsInByb2R1Y3RzTGVuZ3RoIiwiZGVmYXVsdFByb3BzIiwiVGFibGVDb250ZXh0IiwiY3JlYXRlQ29udGV4dCIsImNvbHVtbnMiLCJUYWJsZUZvb3RlciIsIlJvd0Zvb3RlciIsIkNlbGwiLCJjdXJyZW50VHlwZSIsInNwbGl0IiwidCIsIlJvdyIsImNlbGwiLCJjb2x1bW4iLCJpbmNsdWRlcyIsIkVtcHR5TGluZSIsImNvbXB1dGVTb3J0UXVlcnkiLCJjdXJyZW50U29ydGluZyIsInNvcnQiLCJpc1NhbWVTb3J0IiwiZGlyIiwiaXNBc2NEaXIiLCJQYWdpbmF0ZWRUYWJsZSIsInVuZGVmaW5lZCIsImhhbmRsZVNvcnQiLCJoYW5kbGVQcmV2IiwiaGFuZGxlTmV4dCIsImhhbmRsZVBhZ2VTb3J0IiwicHJldmlvdXNQYWdlIiwicGFnZSIsIm5leHRQYWdlIiwicHJlc2VudGF0aW9uIiwiaGlkZU9uRW1wdHkiLCJoYXNSb3dzIiwiaGFzRm9vdGVyIiwiZm9vdGVyIiwiaGFzTWV0YSIsImFycmF5T2YiLCJlbGVtZW50IiwiVGFibGUiLCJBQ1RJT05fQ0xBU1MiLCJlbXB0eVBhZ2luYXRpb24iLCJzdGFydCIsImVuZCIsIlBhZ2luYXRpb24iLCJQUkVWX0NMQVNTIiwiTkVYVF9DTEFTUyIsInBhZ2luYXRpb24iLCJsaW1pdCIsIlRoIiwib25DbGljayIsImlzU29ydGVkIiwic2FmZVR5cGUiLCJ0cmltIiwiVGhlYWQiLCJxdW90YXRpb25zUmVhZHlUb0ludm9pY2UiLCJpbnZvaWNlcyIsInF1b3RhdGlvbnMiLCJNYWluIiwid2l0aE1ldGEiLCJNZXRhIiwiQ29udGVudCIsIkNvbnRlbnRBY3Rpb25zIiwiSW52b2ljZVJvdyIsImludm9pY2VVcmwiLCJjdXN0b21lcklkIiwiaW52b2ljZUNvbHVtbnMiLCJJbnZvaWNlTGlzdCIsIkFjdGl2ZUludm9pY2VzIiwiQXJjaGl2ZWRJbnZvaWNlcyIsIkN1c3RvbWVySW52b2ljZXMiLCJQcm9ncmVzcyIsIm1heCIsInRhYmxlTGF5b3V0IiwicGVyY2VudCIsImNzc1BlcmNlbnQiLCJtaW4iLCJ3aWR0aCIsIkJ1dHRvblNob3dRdW90YXRpb24iLCJxdW90YXRpb25JZCIsIlNob3dRdW90YXRpb24iLCJCdXR0b25BcmNoaXZlSW52b2ljZSIsImFyY2hpdmVkQXQiLCJidG5Qcm9wcyIsImZvcm1NZXRob2QiLCJmb3JtQWN0aW9uIiwiZGlzYWJsZWQiLCJRdW90YXRpb25Sb3ciLCJxdW90YXRpb25VcmwiLCJxdW90YXRpb25Db2x1bW5zIiwiQWN0aXZlUXVvdGF0aW9ucyIsIkFyY2hpdmVkUXVvdGF0aW9ucyIsIlF1b3RhdGlvbnNSZWFkeVRvSW52b2ljZSIsIkN1c3RvbWVyUXVvdGF0aW9ucyIsIkJ1dHRvblNob3dJbnZvaWNlIiwid2l0aE1lc3NhZ2UiLCJpbnZvaWNlSWQiLCJpc0ludm9pY2VBcmNoaXZlZCIsIlNob3dJbnZvaWNlIiwiQnV0dG9uQ3JlYXRlSW52b2ljZSIsImlzQXZhaWxhYmxlIiwiQ3JlYXRlSW52b2ljZSIsIkJ1dHRvbkFyY2hpdmVRdW90YXRpb24iLCJIb21lQ2hhcnRzIiwicXVvdGF0aW9uc0NvdW50IiwiaW52b2ljZXNDb3VudCIsImZvbnRTaXplIiwicXVvdGF0aW9uc1RvdGFsIiwiaW52b2ljZXNUb3RhbExlZnQiLCJpbnZvaWNlc1RvdGFsUGFpZCIsImludm9pY2VzVG90YWwiLCJjb21wdXRlVG90YWwiLCJzbGljZSIsIlBpZUNoYXJ0RGVmcyIsIlBpZUNoYXJ0Iiwic2xpY2VzIiwiZ2V0Q29vcmRpbmF0ZXMiLCJ4IiwiY29zIiwiUEkiLCJ5Iiwic2luIiwiY3JlYXRlU2xpY2VzIiwiY3VtdWxhdGl2ZVBlcmNlbnQiLCJzdGFydFgiLCJzdGFydFkiLCJlbmRYIiwiZW5kWSIsImxhcmdlQXJjRmxhZyIsInBhdGhEYXRhIiwiY3JlYXRlTGFiZWxzIiwiQXJjaGl2ZWRMaXN0IiwiU2hvd0FyY2hpdmVkUXVvdGF0aW9uIiwiUHJldmlldyIsIm9uZU9mIiwiUHJpbnRpbmdOb3RpY2UiLCJQcmVzQnlLZXkiLCJLZXlMYWJlbCIsIktleVZhbHVlIiwiU2hvd0FyY2hpdmVkSW52b2ljZSIsInBheW1lbnRzIiwicGF5bWVudCIsIkludm9pY2VIZWFkZXIiLCJldmVudHNDb2x1bW5zIiwiSW52b2ljZUV2ZW50c0Zvb3RlciIsIkludm9pY2VFdmVudHMiLCJkaXNhYmxlZERheXMiLCJhZnRlciIsIkRhdGVQaWNrZXIiLCJoYW5kbGVEYXlDaGFuZ2UiLCJpbnB1dFByb3BzIiwiZGF0ZU9iamVjdCIsImRhdGVWYWx1ZSIsImlzVmFsaWQiLCJ0b0RhdGUiLCJmb3JtYXREYXRlIiwicGFyc2VEYXRlIiwibG9jYWxlIiwibG9jYWxlVXRpbHMiLCJNb21lbnRMb2NhbGVVdGlscyIsImRheSIsIkludm9pY2VFdmVudFNlbnRSZWFkIiwiaGFuZGxlIiwiSW52b2ljZUV2ZW50UGF5bWVudFJlYWQiLCJUWVBFIiwiUXVvdGF0aW9ucyIsIk5ld1F1b3RhdGlvbiIsImN1c3RvbWVycyIsIlNURVBTIiwicmVjb21wdXRlU3RlcHMiLCJzdGVwcyIsInMiLCJyZW1vdmVEZWZhdWx0UHJvZHVjdHMiLCJkZWZhdWx0UHJvZHVjdCIsImlzT2JqZWN0IiwiY2xlYW5lZFByb2R1Y3RzIiwiZGVmYXVsdE9iamVjdCIsImFycmF5IiwicmVjb21wdXRlVG90YWxzIiwiYWRkRW1wdHlMaW5lIiwiZW1wdHlQcm9kdWN0IiwiZW5zdXJlUHJvZHVjdElkIiwid2l0aElkIiwiUXVvdGF0aW9uRm9ybSIsImN1c3RvbWVyIiwiaGFuZGxlQ3JlYXRlSW52b2ljZSIsImhhbmRsZVByb2R1Y3RSZW1vdmUiLCJoaXN0b3J5IiwicmVkaXJlY3Rpb24iLCJyZWNvbXB1dGVGb3JtRGF0YSIsImdldEN1c3RvbWVyRGF0YSIsImZpbmQiLCJpc1Byb2R1Y3RDaGFuZ2UiLCJpc1RheENoYW5nZSIsInJlY29tcHV0ZVByb2R1Y3RzIiwid2l0aFN0ZXBzIiwibGluZSIsInVwZGF0ZWRQcm9kdWN0cyIsInN1Ym1pdCIsImZvcm1DaGFuZ2UiLCJkYXlDaGFuZ2UiLCJwcm9kdWN0UmVtb3ZlIiwiZ2V0QWxsQ3VzdG9tZXJzIiwiY2hlY2tLZXlDaGFuZ2UiLCJjdXJyZW50S2V5IiwibmV4dEtleSIsImhhc0N1cnJlbnQiLCJoYXNOZXh0IiwiaXNOZXdDcmVhdGlvbiIsImlzRGlmZmVyZW50SWQiLCJpc05ld1F1b3RhdGlvbiIsImlzTmV3Q3VzdG9tZXIiLCJpc05ld0ludm9pY2UiLCJuZXdDdXN0b21lciIsIm5ld1F1b3RhdGlvbiIsImFyY2hpdmVkUXVvdGF0aW9uIiwibmV3SW52b2ljZSIsImFyY2hpdmVkSW52b2ljZSIsImNoZWNrUmVkaXJlY3Rpb25zIiwiZGF0YXMiLCJoYXNSZWRpcmVjdCIsInJlZGlyZWN0VXJsIiwiZmlsdGVyQXJyYXlXaXRoT2JqZWN0IiwiZGVmYXVsdEVudHJpZXMiLCJlbnRyeSIsInJlZktleSIsInJlZlZhbHVlIiwiaXNTYW1lQXNEZWZhdWx0IiwiY3VyciIsIkRFTEFZIiwiU3Bpbm5lciIsInNob3dTcGlubmVyIiwiUXVvdGF0aW9uRm9ybVByZXMiLCJoYXNQcm9kdWN0cyIsInN1Ym1pdEkxOG5JZCIsIkNIRUNLRURfQ0xBU1MiLCJSQURJT19DTEFTUyIsIkNIRUNLQk9YX05BTUUiLCJTdGVwcGVyIiwiY3VycmVudFN0ZXAiLCJpc0FsbENoZWNrZWQiLCJnZXRTZWxlY3RlZEluZGV4IiwiaGFzT25lTWlzc2luZ1N0ZXAiLCJzb21lIiwic3RlcCIsImkiLCJoYXNOb1ZhbHVlIiwib3RoZXJQcm9wcyIsIlN0ZXAiLCJFZGl0UXVvdGF0aW9uIiwiUHJldmlld1F1b3RhdGlvblBhZ2UiLCJJbnZvaWNlcyIsIkVkaXRJbnZvaWNlIiwidXBkYXRlUGF5bWVudHMiLCJ1cGRhdGVkUGF5bWVudHMiLCJkYXRlIiwiYW1vdW50IiwicmVtb3ZlTGluZSIsInBhaWQiLCJsZWZ0IiwidXBkYXRlUGF5bWVudHNGaWVsZFBhdGgiLCJJbnZvaWNlRm9ybSIsImhhbmRsZVJlbW92ZVBheW1lbnQiLCJpc1BheW1lbnRGaWVsZE5hbWUiLCJpbnB1dE5hbWUiLCJzYXZlIiwiaXNQYXltZW50Q2hhbmdlIiwicmVtb3ZlUGF5bWVudCIsIkludm9pY2VGb3JtUHJlcyIsIkludm9pY2VFdmVudFNlbnRFZGl0YWJsZSIsIkludm9pY2VFdmVudFBheW1lbnRFZGl0YWJsZSIsIm5vdExhc3QiLCJfZmllbGRQYXRoIiwiUHJldmlld0ludm9pY2VQYWdlIiwiQ3VzdG9tZXJzIiwiQ3VzdG9tZXJSb3ciLCJjdXN0b21lckNvbHVtbnMiLCJDdXN0b21lckxpc3QiLCJBY3RpdmVDdXN0b21lcnMiLCJOZXdDdXN0b21lciIsImludGwiLCJjb250ZXh0IiwiRm9ybUNvbnRleHQiLCJDdXN0b21lckZvcm0iLCJmb3JtUHJvcHMiLCJDdXN0b21lckZvcm1QcmVzIiwiRWRpdEN1c3RvbWVyIiwiQ3VzdG9tZXJIZWFkZXIiLCJhcHBSZWR1Y2VyIiwicm9vdFJlZHVjZXIiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3pFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFD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QUFPQyxJQUFQLEtBQWdCc0gsZ0JBQU9PLE9BQTNCLEVBQW9DeEosUUFBUSxLQUFLLENBQWI7QUFDcEMsTUFBSTBCLE9BQU9DLElBQVAsS0FBZ0JnSCxjQUFLYyxLQUF6QixFQUFnQ3pKLFFBQVEsS0FBSyxDQUFiO0FBQ2hDLFNBQU9zeEIsV0FBV3R4QixLQUFYLEVBQWtCMEIsTUFBbEIsQ0FBUDtBQUNELENBSkQ7O2VBTWU2dkIsVyIsImZpbGUiOiJhcHBsaWNhdGlvbi1zZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIHdhc20gbW9kdWxlc1xuIFx0dmFyIGluc3RhbGxlZFdhc21Nb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvYmplY3Qgd2l0aCBhbGwgY29tcGlsZWQgV2ViQXNzZW1ibHkuTW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy53ID0ge307XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCAgIHBhdGggICAgICAgICAgIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBpbnNwZWN0ICAgICAgfSBmcm9tICd1dGlsJ1xuaW1wb3J0ICAgY2hhbGsgICAgICAgICAgZnJvbSAnY2hhbGsnXG5pbXBvcnQgICBtb21lbnQgICAgICAgICBmcm9tICdtb21lbnQnXG5pbXBvcnQgICBLb2EgICAgICAgICAgICBmcm9tICdrb2EnXG5pbXBvcnQgICBib2R5UGFyc2VyICAgICBmcm9tICdrb2EtYm9keSdcbmltcG9ydCAgIHNlcnZlU3RhdGljICAgIGZyb20gJ2tvYS1zdGF0aWMnXG5pbXBvcnQgICBjb21wcmVzcyAgICAgICBmcm9tICdrb2EtY29tcHJlc3MnXG5pbXBvcnQgICBsb2dnZXIgICAgICAgICBmcm9tICdrb2EtbG9nZ2VyJ1xuaW1wb3J0ICAganNvbiAgICAgICAgICAgZnJvbSAna29hLWpzb24nXG5pbXBvcnQgICBSb3V0ZXIgICAgICAgICBmcm9tICdrb2Etcm91dGVyJ1xuaW1wb3J0ICAgZW5mb3JjZUh0dHBzICAgZnJvbSAna29hLXNzbGlmeSdcbmltcG9ydCAgIGhlbG1ldCAgICAgICAgIGZyb20gJ2tvYS1oZWxtZXQnXG5cbmltcG9ydCBjb25maWcgICAgICAgICAgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgbG9nICAgICAgICAgICAgIGZyb20gJy4vbG9nJ1xuaW1wb3J0IGFwaUJhY2t1cFJvdXRlcyBmcm9tICcuL3JvdXRpbmctYXBpLWJhY2t1cCdcbmltcG9ydCByZWFjdFJvdXRlcyAgICAgZnJvbSAnLi9yb3V0aW5nLWtvYS1yZWFjdCdcbmltcG9ydCAqIGFzIHJlbmRlciAgICAgZnJvbSAnLi9yZW5kZXInXG5cbi8vLy8vL1xuLy8gU0VSVkVSIENPTkZJR1xuLy8vLy8vXG5cbmNvbnN0IGFwcCA9IG5ldyBLb2EoKVxuXG5hcHAudXNlKCBoZWxtZXQoKSApXG5hcHAudXNlKCBib2R5UGFyc2VyKCkgKVxuYXBwLnVzZSggY29tcHJlc3MoKSApXG5hcHAudXNlKCBzZXJ2ZVN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBgLi9wdWJsaWNgKSkgKVxuYXBwLnVzZSgganNvbigpIClcbmFwcC51c2UoIGxvZ2dlcigpIClcblxuLy8vLy8vXG4vLyBST1VUSU5HXG4vLy8vLy9cblxuLy8tLS0tLSBIVFRQUyBSRURJUkVDVFxuXG5pZiAoIGNvbmZpZy5lbmZvcmNlSHR0cHMgKSBhcHAudXNlKCBlbmZvcmNlSHR0cHMoY29uZmlnLmVuZm9yY2VIdHRwcykgKVxuXG4vLy0tLS0tIEVSUk9SIEhBTkRMSU5HXG5cbmFwcC51c2UoIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCBuZXh0KClcbiAgICAvLyA0MDQgYXJlIGFscmVhZHkgaGFuZGxlZCBieSBSRUFDVFxuICAgIC8vIG5vIG5lZWQgdG8gcmVuZGVyIHRoZSA0MDQgaGVyZSBeXlxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyggaW5zcGVjdChlcnIsIHtjb2xvcnM6IHRydWV9KSApXG4gICAgY3R4LnN0YXR1cyAgPSBlcnIuc3RhdHVzQ29kZSB8fCBlcnIuc3RhdHVzIHx8IDUwMFxuICAgIGN0eC5ib2R5ICAgID0gcmVuZGVyLmVycm9yUGFnZSh7XG4gICAgICByZWFzb246IGVyci5tZXNzYWdlLFxuICAgICAgc3RhY2t0cmFjZTogZXJyLnN0YWNrdHJhY2UgfHwgZXJyLnN0YWNrIHx8IGZhbHNlLFxuICAgIH0pXG4gIH1cbn0pXG5cbmNvbnN0IHJvdXRlciAgPSBuZXcgUm91dGVyKClcblxuLy8tLS0tLSAgTU9VTlQgTk8tRkVUQ0ggQkFDS1VQXG5cbnJvdXRlci51c2UoIGFwaUJhY2t1cFJvdXRlcy5yb3V0ZXMoKSApXG5cbi8vLS0tLS0gTU9VTlQgUkVBQ1QgUk9VVEVSXG5cbnJvdXRlci51c2UoIHJlYWN0Um91dGVzLnJvdXRlcygpIClcblxuLy8tLS0tLSBNT1VOVCBST1VURVIgVE8gQVBQTElDQVRJT05cblxuYXBwLnVzZSggcm91dGVyLnJvdXRlcygpIClcbi8vIGFwcC51c2UoIHJvdXRlci5hbGxvd2VkTWV0aG9kcygpIClcblxuLy8tLS0tLSBMQVVOQ0ggVEhFIE1BR0lDXG5cbmNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oY29uZmlnLlBPUlQsIGZ1bmN0aW9uIGVuZEluaXQoKSB7XG4gIGNvbnNvbGUubG9nKFxuICAgIGBBUFAgU2VydmVyIGlzIGxpc3RlbmluZyBvbiBwb3J0YCxcbiAgICBjaGFsay5jeWFuKHNlcnZlci5hZGRyZXNzKCkucG9ydCksXG4gICAgYG9uIG1vZGVgLFxuICAgIGNoYWxrLmN5YW4oY29uZmlnLk5PREVfRU5WKVxuICApXG59KVxuXG4vLy8vLy9cbi8vIEVYUE9SVFNcbi8vLy8vL1xuXG5leHBvcnQgeyBhcHAgYXMgZGVmYXVsdCB9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtYm9keVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2Etc3RhdGljXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYS1jb21wcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtbG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYS1qc29uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYS1yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLXNzbGlmeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtaGVsbWV0XCIpOyIsImltcG9ydCByYyBmcm9tICdyYydcblxuY29uc3QgY29uZmlnICAgICAgPSByYyggYGFjb3VudEFwcGAsIHtcbiAgQVBJX1VSTDogICAgICAgICAgYGh0dHA6Ly8xMjcuMC4wLjE6NDA0MC92MWAsXG4gIENPT0tJRV9OQU1FOiAgICAgIGBhLWNvdW50X3dlYmFwcGAsXG4gIEhPU1RfVVJMOiAgICAgICAgIGBodHRwOi8vbG9jYWxob3N0OjMwMDBgLFxuICBBUFBfTkFNRTogICAgICAgICBgYS1jb3VudGAsXG4gIC8vIGVuZm9yY2VIdHRwcyB3aWxsIGJlIHBhc3NlZCB0b1xuICAvLyDigKIgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uva29hLXNzbGlmeVxuICBlbmZvcmNlSHR0cHM6ICAgICBmYWxzZSxcbn0pXG5cbmNvbmZpZy5QT1JUICAgICAgID0gY29uZmlnLlBPUlQgfHwgcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwXG5cbmNvbmZpZy5OT0RFX0VOViAgID0gY29uZmlnLk5PREVfRU5WIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IGBkZXZlbG9wbWVudGBcbmNvbmZpZy5pc0RldiAgICAgID0gY29uZmlnLk5PREVfRU5WID09PSBgZGV2ZWxvcG1lbnRgXG5jb25maWcuaXNQcm9kICAgICA9IGNvbmZpZy5OT0RFX0VOViA9PT0gYHByb2R1Y3Rpb25gXG5cbmV4cG9ydCB7IGNvbmZpZyBhcyBkZWZhdWx0IH1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJjXCIpOyIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBkZWJ1Z2xvZyB9IGZyb20gJ3V0aWwnXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5cbmNvbnN0IGxvZyA9IGRlYnVnbG9nKCBgc2VydmVyYCApXG5sb2coIGNoYWxrLmdyZWVuKGBpbml0IGxvZ2dpbmdgKSApXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1xuIiwiaW1wb3J0IFJvdXRlciBmcm9tICdrb2Etcm91dGVyJ1xuaW1wb3J0IGlzTmlsICBmcm9tICdsb2Rhc2guaXNuaWwnXG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgKiBhcyBpc29GZXRjaCBmcm9tICcuLi9zaGFyZWQvaXNvLWZldGNoJ1xuXG5jb25zdCByb3V0ZXIgID0gbmV3IFJvdXRlcigpXG5cbi8vLy8vL1xuLy8gTk8gRkVUQ0ggQkFDS1VQXG4vLy8vLy9cblxuLy8g4oCiIGluIGNhc2Ugb2YgZGlyZWN0IGdldC9wb3N0IHdpdGhvdXQgcmVhY3QgaGFuZGxpbmdcbi8vIOKAoiBvciBKUyBpc24ndCBhY3RpdmF0ZWQgb24gdGhlIGNsaWVudCBzaWRlXG4vLyDigKIgaW4gYW55IGNhc2UgdGhpcyBpcyBPUFRJT05BTCBJRiBXRSB3YW50IHRvIERFRkVSIGV2ZXJ5dGhpbmcgdG8gdGhlIEZST05UIFJFQUNUIEFQUFxuXG5jb25zdCBwcm94eVJlcXVlc3QgPSBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgdXJsLCBib2R5LCBoZWFkZXIgfSA9IGN0eC5yZXF1ZXN0XG4gIGNvbnN0IGZldGNoT3B0aW9ucyA9IHtcbiAgICB1cmwsXG4gICAgYm9keSxcbiAgfVxuICBjb25zdCBtZXRob2QgPSBjdHgucmVxdWVzdC5tZXRob2QudG9Mb3dlckNhc2UoKVxuICBjb25zdCB7IHJlc3BvbnNlLCBwYXlsb2FkIH0gPSBhd2FpdCBpc29GZXRjaFsgbWV0aG9kIF0oIGZldGNoT3B0aW9ucywgaGVhZGVyLmNvb2tpZSApXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyh7XG4gICAgICBzdGF0dXM6ICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgbWVzc2FnZTogICAgYFtGUk9NIEFQSV0gJHtwYXlsb2FkLm1lc3NhZ2V9YCxcbiAgICAgIHN0YWNrdHJhY2U6IHJlc3BvbnNlLnN0YWNrdHJhY2UsXG4gICAgfSlcbiAgfVxuXG4gIC8vIElmIHRoZSBBUEkgc2VuZCBhbiBhY2Nlc3MgdG9rZW4sIGNvcHkgaXQgdG8gYSBjb29raWVcbiAgLy8g4oCiIG5lZWRlZCB0byBtYWludGFpbiBhdXRoZW50aWNhdGlvbiB3aXRob3V0IEpTIGFjdGl2YXRlZFxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IHBheWxvYWQuYWNjZXNzX3Rva2VuXG4gIC8vIGNvcHkgYXV0aG9yaXphdGlvbiBoZWFkZXIgZXZlbiBpZiBpdCdzIGFuIGVtcHR5IHN0cmluZ1xuICBpZiAoICFpc05pbCggYWNjZXNzVG9rZW4gKSApIHtcbiAgICBjdHguY29va2llcy5zZXQoIGNvbmZpZy5DT09LSUVfTkFNRSwgYWNjZXNzVG9rZW4gKVxuICAgIGRlbGV0ZSBwYXlsb2FkLmFjY2Vzc190b2tlblxuICB9XG5cbiAgLy8gU2F2ZSBwYXlsb2FkIHRvIHN0YXRlIGZvciBmdXJ0aGVyIHJldXNlXG4gIGN0eC5zdGF0ZS5wYXlsb2FkID0gcGF5bG9hZFxuICBuZXh0KClcbn1cblxuLy8tLS0tLSBVU0VSXG5cbnJvdXRlclxuLmdldCggYC9hY2NvdW50L2xvZ291dGAsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHBheWxvYWQgfSA9IGN0eC5zdGF0ZVxuICBjdHgucmVkaXJlY3QoIGAvYWNjb3VudC9sb2dpbmAgKVxufSlcbi5wb3N0KCBgL2FjY291bnQvcmVnaXN0ZXJgLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBjdHguc3RhdGVcbiAgY3R4LnJlZGlyZWN0KCBgL2AgKVxufSlcbi5wb3N0KCBgL2FjY291bnQvZm9yZ290YCwgcHJveHlSZXF1ZXN0LCBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gY3R4LnN0YXRlXG4gIGN0eC5yZWRpcmVjdCggYC9hY2NvdW50L2ZvcmdvdGAgKVxufSlcbi5wb3N0KCBgL2FjY291bnQvcmVzZXRgLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBjdHguc3RhdGVcbiAgY3R4LnJlZGlyZWN0KCBgL2AgKVxufSlcbi5wb3N0KCBgL2FjY291bnQvbG9naW5gLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBjdHguc3RhdGVcbiAgY3R4LnJlZGlyZWN0KCBgL2AgKVxufSlcbi5wb3N0KCBgL2FjY291bnQvc2V0dGluZ3NgLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBjdHguc3RhdGVcbiAgY3R4LnJlZGlyZWN0KCBjdHgucmVxdWVzdC51cmwgKVxufSlcblxuLy8tLS0tLSBDVVNUT01FUlNcblxucm91dGVyXG4ucG9zdCggYC9jdXN0b21lcnMvbmV3YCwgcHJveHlSZXF1ZXN0LCBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gY3R4LnN0YXRlXG4gIGN0eC5yZWRpcmVjdCggYC9jdXN0b21lcnMvJHsgcGF5bG9hZC5pZCB9YCApXG59KVxuLnBvc3QoIGAvY3VzdG9tZXJzLzppZGAsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHVybCB9ID0gY3R4LnJlcXVlc3RcbiAgY3R4LnJlZGlyZWN0KCBjdHgucmVxdWVzdC51cmwgKVxufSlcblxuLy8tLS0tLSBRVU9UQVRJT05TXG5cbnJvdXRlclxuLnBvc3QoIGAvcXVvdGF0aW9ucy9uZXdgLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBjdHguc3RhdGVcbiAgY3R4LnJlZGlyZWN0KCBgL3F1b3RhdGlvbnMvJHsgcGF5bG9hZC5pZCB9YCApXG59KVxuLnBvc3QoIGAvcXVvdGF0aW9ucy86aWRgLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyB1cmwgfSA9IGN0eC5yZXF1ZXN0XG4gIGN0eC5yZWRpcmVjdCggY3R4LnJlcXVlc3QudXJsIClcbn0pXG4ucG9zdCggYC9xdW90YXRpb25zLzppZC9jcmVhdGUtaW52b2ljZWAsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IGlkIH0gID0gY3R4LnBhcmFtc1xuICBjdHgucmVkaXJlY3QoIGAvcXVvdGF0aW9ucy8keyBpZH1gIClcbn0pXG5cbi8vLS0tLS0gSU5WT0lDRVNcblxucm91dGVyXG4ucG9zdCggYC9pbnZvaWNlcy86aWRgLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyB1cmwgfSA9IGN0eC5yZXF1ZXN0XG4gIGN0eC5yZWRpcmVjdCggY3R4LnJlcXVlc3QudXJsIClcbn0pXG5cbmV4cG9ydCB7IHJvdXRlciBhcyBkZWZhdWx0IH1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaC5pc25pbFwiKTsiLCJpbXBvcnQgJ2lzb21vcnBoaWMtZmV0Y2gnXG5pbXBvcnQgbWVyZ2UgICAgICAgZnJvbSAnbG9kYXNoLm1lcmdlJ1xuaW1wb3J0IGlzTmlsICAgICAgIGZyb20gJ2xvZGFzaC5pc25pbCdcbmltcG9ydCB1cmxKb2luICAgICBmcm9tICd1cmwtam9pbidcbmltcG9ydCBDb29raWVzICAgICBmcm9tICdqcy1jb29raWUnXG5pbXBvcnQgcXVlcnlTdHJpbmcgZnJvbSAncXVlcnktc3RyaW5nJ1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vaXNvbW9ycGhpYy1jb25maWcnXG5cbi8vIFRoaW4gd3JhcHBlciBhcm91bmQgdGhlIGZldGNoIEFQSVxuLy8g4oCiIFdlIHJldHVybiBib3RoIHRoZSByZXNwb25zZSAmIHRoZSBKU09OXG4vLyAgIFRoZSByZXNwb25zZSBjYW4gYmUgdXNlZCBzZXJ2ZXItc2lkZSBmb3IgYWNjZXNzaW5nIHRoZSBIZWFkZXIgKGZvciBleGFtcGxlKVxuLy8gICBVc2VmdWwgaWYgd2UgbmVlZCB0byBhY2Nlc3MgdGhlIGNvb2tpZXNcbi8vIOKAoiBDb29raWUgcGFyYW0gaXMgdXNlZCBzZXJ2ZXIgc2lkZTpcbi8vICAgV2UgZG9udCcgaGF2ZSBhY2Nlc3MgdG8gdGhlbSB0aGVyZSBeXlxuLy8gICBodHRwczovL2dpdGh1Yi5jb20vbWF0dGhldy1hbmRyZXdzL2lzb21vcnBoaWMtZmV0Y2gvaXNzdWVzLzgzXG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICBjcmVkZW50aWFsczogYGluY2x1ZGVgLFxuICBoZWFkZXJzOiB7fSxcbn1cblxuZnVuY3Rpb24gY3JlYXRlKCBtZXRob2QgKSB7XG4gIGNvbnN0IGZldGNoT3B0aW9ucyA9IG1lcmdlKCB7fSwgZGVmYXVsdE9wdGlvbnMsIHtcbiAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gIH0pXG4gIC8vIHdlIGNvbW11bmljYXRlIHRvIHRoZSBBUEkgb25seSBpbiBqc29uXG4gIGlmICggbWV0aG9kID09PSBgcG9zdGAgKSB7XG4gICAgZmV0Y2hPcHRpb25zLmhlYWRlcnNbYENvbnRlbnQtVHlwZWBdID0gYGFwcGxpY2F0aW9uL2pzb25gXG4gIH1cblxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24oIG9wdGlvbnMsIGp3dCA9IGZhbHNlICkge1xuICAgIGNvbnN0IHsgdXJsLCBib2R5LCBxdWVyeSB9ID0gb3B0aW9uc1xuICAgIC8vIHNldCBib2R5IG9uIHBvc3RcbiAgICBpZiAoIG1ldGhvZCA9PT0gYHBvc3RgICkgZmV0Y2hPcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeSggYm9keSApXG4gICAgLy8gc2V0IHRoZSByaWdodCBhdXRob3JpemF0aW9uIGhlYWRlclxuICAgIC8vIOKAoiBpZiBqd3QgaXMgcHJlc2VudCBpdCB3aWxsIGJlY2F1c2UgdGhlIHNlcnZlciByZWFkIGZyb20gdGhlIGNvb2tpZVxuICAgIC8vICAgYW5kIHBhc3NlZCBpdCBoZXJlXG4gICAgaWYgKCAhand0ICYmIHByb2Nlc3MuZW52LkJST1dTRVIgKSB7XG4gICAgICBqd3QgPSBDb29raWVzLmdldCggY29uZmlnLkNPT0tJRV9OQU1FIClcbiAgICB9XG4gICAgZmV0Y2hPcHRpb25zLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHsgand0IH1gXG4gICAgLy8gQnVpbGQgZmV0Y2ggdXJsXG4gICAgLy8g4oCiIHdlIG5lZWQgdG8gYXBwZW5kIHRoZSBxdWVyeSBzdHJpbmcgYXMgdGhlIGZldGNoIEFQSSBkb2Vzbid0IGhhbmRsZSBvdGhlciB3YXlzXG4gICAgbGV0IGZldGNoVXJsID0gdXJsSm9pbiggY29uZmlnLkFQSV9VUkwsIHVybCApXG4gICAgaWYgKCBxdWVyeSApIGZldGNoVXJsID0gdXJsSm9pbiggZmV0Y2hVcmwsIGA/JHtxdWVyeVN0cmluZy5zdHJpbmdpZnkoIHF1ZXJ5ICl9YClcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSAgPSBhd2FpdCBmZXRjaCggZmV0Y2hVcmwsIGZldGNoT3B0aW9ucyApXG4gICAgICBjb25zdCBwYXlsb2FkICAgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIGlmICggIXJlc3BvbnNlLm9rICkge1xuICAgICAgICBtZXJnZSggcGF5bG9hZCwge1xuICAgICAgICAgIGVycm9yOiAgICAgIHRydWUsXG4gICAgICAgICAgc3RhdHVzOiAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBjb3B5IGFjY2VzcyB0b2tlbiB0byBhIGNvb2tpZVxuICAgICAgLy8g4oCiwqB3ZSB3aWxsIG5lZWQgdGhpcyBjb29raWUgZm9yIHVuaXZlcnNhbCByZW5kZXJcbiAgICAgIGlmICggcHJvY2Vzcy5lbnYuQlJPV1NFUiApIHtcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBwYXlsb2FkLmFjY2Vzc190b2tlblxuICAgICAgICBpZiAoICFpc05pbCggYWNjZXNzVG9rZW4gKSApIHtcbiAgICAgICAgICBDb29raWVzLnNldCggY29uZmlnLkNPT0tJRV9OQU1FLCBhY2Nlc3NUb2tlbiApXG4gICAgICAgICAgZGVsZXRlIHBheWxvYWQuYWNjZXNzX3Rva2VuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHJlc3BvbnNlLCBwYXlsb2FkIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgY29uc3QgZXJyb3IgPSBtZXJnZSh7XG4gICAgICAgIGVycm9yOiAgICAgIHRydWUsXG4gICAgICAgIHN0YXR1czogICAgIDUwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogZXJyLm1lc3NhZ2UsXG4gICAgICB9LCBlcnIgKVxuICAgICAgcmV0dXJuIHsgcGF5bG9hZDogZXJyb3IgfVxuICAgIH1cbiAgfVxufVxuXG4vLy0tLS0tIEVYUE9SVFNcblxuZXhwb3J0IGNvbnN0IGdldCAgPSBjcmVhdGUoIGBnZXRgICApXG5leHBvcnQgY29uc3QgcG9zdCA9IGNyZWF0ZSggYHBvc3RgIClcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlzb21vcnBoaWMtZmV0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoLm1lcmdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybC1qb2luXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzLWNvb2tpZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxdWVyeS1zdHJpbmdcIik7IiwiLy8gdGhpcyB3aWxsIHJlcGxhY2UgYW55IGltcG9ydCBvZiBpc29tb3JwaGljLWNvbmZpZy5qcyBvbiB0aGUgc2VydmVyXG5leHBvcnQgeyBkZWZhdWx0IH0gZnJvbSAnLi4vc2VydmVyL2NvbmZpZydcbiIsImltcG9ydCBjaGFsayAgZnJvbSAnY2hhbGsnXG5pbXBvcnQgUm91dGVyIGZyb20gJ2tvYS1yb3V0ZXInXG5pbXBvcnQgUmVhY3QgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJ1xuaW1wb3J0IHsgU3RhdGljUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IHJlbmRlclJvdXRlcywgbWF0Y2hSb3V0ZXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItY29uZmlnJ1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCB7IEhlbG1ldCB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZy5qcydcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cuanMnXG5pbXBvcnQgKiBhcyByZW5kZXIgZnJvbSAnLi9yZW5kZXInXG5pbXBvcnQgcm91dGVzIGZyb20gJy4uL3NoYXJlZC9yb3V0ZXMuanMnXG5pbXBvcnQgcmVkdWNlciBmcm9tICcuLi9zaGFyZWQvZHVja3MvY29tYmluZWQtcmVkdWNlcnMuanMnXG5cbmNvbnN0IHJvdXRlciAgICAgICAgID0gbmV3IFJvdXRlcigpXG5cbi8vIHNpbXBsZSBzZXJ2ZXIgc2lkZSBhY3Rpb24gbG9nZ2VyXG4vLyDigKIgZm9yIHRoZSBjcmVhdGlvbiBvZiBhIGN1c3RvbSBtaWRkbGV3YXJlIHNlZTpcbi8vICAgaHR0cHM6Ly9yZWR1eC5qcy5vcmcvYXBpLXJlZmVyZW5jZS9hcHBseW1pZGRsZXdhcmUjZXhhbXBsZTotY3VzdG9tLWxvZ2dlci1taWRkbGV3YXJlXG5jb25zdCByZWR1eEFjdGlvbkxvZ2dlciA9ICh7IGdldFN0YXRlIH0pID0+IHtcbiAgcmV0dXJuIG5leHQgPT4gYWN0aW9uID0+IHtcbiAgICBsb2coIGBkaXNwYXRjaCDihpJgLCBhY3Rpb24udHlwZSApXG4gICAgY29uc3QgcmV0dXJuVmFsdWUgPSBuZXh0KCBhY3Rpb24gKVxuICAgIGNvbnN0IGhhc0Vycm9yID0gcmV0dXJuVmFsdWUucGF5bG9hZC5lcnJvclxuICAgIGNvbnN0IGNvbG9yID0gaGFzRXJyb3IgPyBjaGFsay5yZWQgOiBjaGFsay5ncmVlblxuICAgIGxvZyggYGRpc3BhdGNoIOKGkGAsIGNvbG9yKGFjdGlvbi50eXBlKSApXG4gICAgcmV0dXJuIHJldHVyblZhbHVlXG4gIH1cbn1cblxucm91dGVyLmdldCggJyonLCBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgdXJsIH0gPSBjdHhcbiAgY29uc3Qgand0ICAgICA9IGN0eC5jb29raWVzLmdldCggY29uZmlnLkNPT0tJRV9OQU1FIClcbiAgLy8gd2FpdCBmb3IgZXZlcnkgY29tcG9uZW50IHRvIGZldGNoIGhpcyBkYXRhXG4gIGNvbnN0IHN0b3JlICAgICAgID0gY3JlYXRlU3RvcmUocmVkdWNlciwge30sIGFwcGx5TWlkZGxld2FyZSh0aHVuaywgcmVkdXhBY3Rpb25Mb2dnZXIpKVxuICBjb25zdCBicmFuY2ggICAgICA9IG1hdGNoUm91dGVzKHJvdXRlcywgdXJsKVxuICBjb25zdCBpbml0RmV0Y2hlcyA9IGJyYW5jaFxuICAgIC5maWx0ZXIoICh7cm91dGV9KSA9PiByb3V0ZS5jb21wb25lbnQuZmV0Y2hEYXRhIGluc3RhbmNlb2YgRnVuY3Rpb24gKVxuICAgIC5tYXAoICh7cm91dGUsIG1hdGNofSkgPT4ge1xuICAgICAgLy8gUGFzcyBoZXJlIHRoZSBKV1RcbiAgICAgIC8vIGZldGNoIHdpbGwgbmVlZCBpdCB0byBtYWludGFpbiBhdXRoZW50aWNhdGlvblxuICAgICAgcmV0dXJuIHJvdXRlLmNvbXBvbmVudC5mZXRjaERhdGEoe1xuICAgICAgICBqd3QsXG4gICAgICAgIGRpc3BhdGNoOiBzdG9yZS5kaXNwYXRjaCxcbiAgICAgICAgcGFyYW1zICA6IG1hdGNoLnBhcmFtcyxcbiAgICAgICAgLy8gVE9ETzogc2hvdWxkIHBhc3MgdGhlIHF1ZXJ5IHN0cmluZyBhbHNvXG4gICAgICAgIC8vIHF1ZXJ5OlxuICAgICAgfSlcbiAgICB9IClcbiAgYXdhaXQgUHJvbWlzZS5hbGwoIGluaXRGZXRjaGVzIClcblxuICAvLyBzdGF0aWNDb250ZXh0IGlzIG11dGFibGUgJiBwcm92aWRlZCBvbmx5IG9uIHNlcnZlci1zaWRlIHJlbmRlcmluZ1xuICAvLyDigKIgQmVjYXVzZSBpdCdzIG11dGFibGUsIGl0IHdpbGwgY2hhbmdlIGR1cmluZyB0aGUgUmVhY3QncyBzZXJ2ZXIgcmVuZGVyaW5nIHByb2Nlc3NcbiAgLy8g4oCiIFNvIHRoYXQncyBhIGdvb2Qgd2F5IHRvIHBhc3MgZGF0YSBmcm9tIHJlYWN0LXJvdXRlci1jb25maWcgdG8gdGhlIHNlcnZlclxuICBjb25zdCBzdGF0aWNDb250ZXh0ID0ge31cblxuICAvLyBGaW5hbGx5IHJlbmRlciFcbiAgY29uc3QgY29udGVudCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFN0YXRpY1JvdXRlciBsb2NhdGlvbj17dXJsfSBjb250ZXh0PXtzdGF0aWNDb250ZXh0fT5cbiAgICAgICAgey8qIHJlbmRlclJvdXRlcyB3aWxsIHJlbmRlciB0aGUgcmlnaHQgY29tcG9uZW50cyAqL31cbiAgICAgICAgeyByZW5kZXJSb3V0ZXMocm91dGVzKSB9XG4gICAgICA8L1N0YXRpY1JvdXRlcj5cbiAgICA8L1Byb3ZpZGVyPlxuICApXG4gIC8vIHJlbmRlciB0YWdzIG91dHNpZGUgdGhlIGFwcCAobWV0YSwgbGlua3PigKYpXG4gIC8vIOKAoiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9yZWFjdC1oZWxtZXQjc2VydmVyLXVzYWdlXG4gIGNvbnN0IGhlbG1ldCA9IEhlbG1ldC5yZW5kZXJTdGF0aWMoKVxuXG4gIC8vIHJlZmxlY3Qgc3RhdHVzIGZyb20gcmVhY3Qtcm91dGVyIHRvIGtvYVxuICBpZiAoIHN0YXRpY0NvbnRleHQuc3RhdHVzID09PSAzMDIgKSB7XG4gICAgY3R4LnN0YXR1cyA9IDMwMlxuICAgIGxvZyggYHJlZGlyZWN0YCApXG4gICAgcmV0dXJuIGN0eC5yZWRpcmVjdCggc3RhdGljQ29udGV4dC51cmwgKVxuICB9XG4gIGlmICggc3RhdGljQ29udGV4dC5zdGF0dXMgPT09IDQwNCApIHtcbiAgICBjdHguc3RhdHVzID0gNDA0XG4gIH1cblxuICBjdHguYm9keSA9IHJlbmRlci5yZWFjdEFwcCh7XG4gICAgc3RvcmUsICAgIC8vIHRob3NlIHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplIHRoZSBzdG9yZSBjbGllbnQgc2lkZVxuICAgIGNvbnRlbnQsICAvLyB0aGUgcmlnaHQgSFRNTCBwcm9kdWNlZCBieSByZWFjdCBeXlxuICAgIGhlbG1ldCwgICAvLyBmb3IgSEVBRCB0YWdzXG4gIH0pXG59KVxuXG5leHBvcnQgeyByb3V0ZXIgYXMgZGVmYXVsdCB9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWNvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1oZWxtZXRcIik7IiwiaW1wb3J0IGZzICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggICAgICAgICAgICAgICAgICAgIGZyb20gJ3BhdGgnXG5pbXBvcnQgc2VyaWFsaXplSlMgICAgICAgICAgICAgZnJvbSAnc2VyaWFsaXplLWphdmFzY3JpcHQnXG5pbXBvcnQgSW50bFBvbHlmaWxsICAgICAgICAgICAgZnJvbSAnaW50bCdcbmltcG9ydCBhcmVJbnRsTG9jYWxlc1N1cHBvcnRlZCBmcm9tICdpbnRsLWxvY2FsZXMtc3VwcG9ydGVkJ1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnLmpzJ1xuXG4vLyBJMThOIFNFVFVQXG4vLyDigKIgbm9kZSBvbmx5IGhhcyBgZW5gIGxvY2FsZXNcbi8vIOKAoiBwb2x5ZmlsbCB0aGUgb3RoZXIgbGFuZ3VhZ2VzXG4vLyAgIGh0dHBzOi8vZm9ybWF0anMuaW8vZ3VpZGVzL3J1bnRpbWUtZW52aXJvbm1lbnRzLyNwb2x5ZmlsbC1ub2RlXG5pZiAoICFhcmVJbnRsTG9jYWxlc1N1cHBvcnRlZChbYGVuYCwgYGZyYF0pICkge1xuICBJbnRsLk51bWJlckZvcm1hdCAgID0gSW50bFBvbHlmaWxsLk51bWJlckZvcm1hdFxuICBJbnRsLkRhdGVUaW1lRm9ybWF0ID0gSW50bFBvbHlmaWxsLkRhdGVUaW1lRm9ybWF0XG59XG5cbi8vIG9ubHkgcGFzcyBhIHN1YnNldCBvZiB0aGUgY29uZmlnLiBlbm91Z2ggZm9yIHRoZSBjbGllbnQgc2lkZVxuLy8g4oCiIFVzZSBzZXJpYWxpemUtamF2YXNjcmlwdCBvdmVyIEpTT04uc3RyaW5naWZ5KClcbi8vICAgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvc2VyaWFsaXplLWphdmFzY3JpcHQjb3ZlcnZpZXdcbmNvbnN0IENMSUVOVF9DT05GSUcgID0gc2VyaWFsaXplSlMoIHtcbiAgQVBJX1VSTDogICAgICAgICAgY29uZmlnLkFQSV9VUkwsXG4gIENPT0tJRV9OQU1FOiAgICAgIGNvbmZpZy5DT09LSUVfTkFNRSxcbiAgSE9TVF9VUkw6ICAgICAgICAgY29uZmlnLkhPU1RfVVJMLFxuICBBUFBfTkFNRTogICAgICAgICBjb25maWcuQVBQX05BTUUsXG59LCB7IGlzSlNPTjogdHJ1ZSB9IClcbmNvbnN0IFNWR19JQ09OU19QQVRIID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vcHVibGljL3N2Zy1pY29ucy5zdmcnKVxuY29uc3QgU1ZHX0lDT05TICAgICAgPSBmcy5yZWFkRmlsZVN5bmMoIFNWR19JQ09OU19QQVRILCBgdXRmOGApXG5cbmV4cG9ydCBmdW5jdGlvbiByZWFjdEFwcCh7IHN0b3JlLCBjb250ZW50LCBoZWxtZXR9KSB7XG4gIGNvbnN0IElOSVRJQUxfU1RBVEUgPSBzZXJpYWxpemVKUyggc3RvcmUuZ2V0U3RhdGUoKSwgeyBpc0pTT046IHRydWUgfSApXG4gIHJldHVybiBgPCFET0NUWVBFIGh0bWw+XG48aHRtbCAke2hlbG1ldC5odG1sQXR0cmlidXRlcy50b1N0cmluZygpfT5cbiAgPGhlYWQ+XG4gICAgJHsgaGVsbWV0LnRpdGxlLnRvU3RyaW5nKCkgfVxuICAgICR7IGhlbG1ldC5tZXRhLnRvU3RyaW5nKCkgfVxuICAgICR7IGhlbG1ldC5saW5rLnRvU3RyaW5nKCkgfVxuICA8L2hlYWQ+XG4gIDxib2R5ICR7aGVsbWV0LmJvZHlBdHRyaWJ1dGVzLnRvU3RyaW5nKCl9PlxuICAgICR7IFNWR19JQ09OUyB9XG4gICAgPGRpdiBpZD1cInJlYWN0LW1haW4tbW91bnRcIj4keyBjb250ZW50IH08L2Rpdj5cbiAgICA8c2NyaXB0PlxuICAgICAgd2luZG93Ll9fQ09ORklHX18gPSAkeyBDTElFTlRfQ09ORklHIH1cbiAgICAgIHdpbmRvdy5fX0lOSVRJQUxfU1RBVEVfXyA9ICR7IElOSVRJQUxfU1RBVEUgfVxuICAgIDwvc2NyaXB0PlxuICAgIDxzY3JpcHQgc3JjPVwiL3ZlbmRvci5hcHBsaWNhdGlvbi1jbGllbnQuanNcIj48L3NjcmlwdD5cbiAgICA8c2NyaXB0IHNyYz1cIi9hcHBsaWNhdGlvbi1jbGllbnQuanNcIj48L3NjcmlwdD5cbiAgPC9ib2R5PlxuPC9odG1sPmBcbn1cblxuZnVuY3Rpb24gcmVuZGVyU3RhY2tUcmFjZSggc3RhY2t0cmFjZSApIHtcbiAgaWYgKCAhc3RhY2t0cmFjZSApICAgcmV0dXJuIGBgXG4gIGlmICggY29uZmlnLmlzUHJvZCApIHJldHVybiBgYFxuICBzdGFja3RyYWNlID0gQXJyYXkuaXNBcnJheSggc3RhY2t0cmFjZSApID8gc3RhY2t0cmFjZS5qb2luKGBcXG5gKSA6IHN0YWNrdHJhY2VcbiAgcmV0dXJuIGA8aHIgLz5cbiAgPHByZT4ke3N0YWNrdHJhY2V9PC9wcmU+YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JQYWdlKHtyZWFzb24sIHN0YWNrdHJhY2V9KSB7XG5cbnJldHVybiBgPCFET0NUWVBFIGh0bWw+XG48aHRtbD5cbiAgPGhlYWQ+XG4gIDwvaGVhZD5cbiAgPGJvZHk+XG4gICAgPG1haW4gcm9sZT1cIm1haW5cIj5cbiAgICAgIDxoMT5bU0VSVkVSXSBlcnJvcjwvaDE+XG4gICAgICA8aDI+JHsgcmVhc29uIH08L2gyPlxuICAgICAgJHsgcmVuZGVyU3RhY2tUcmFjZShzdGFja3RyYWNlKSB9XG4gICAgPC9tYWluPlxuICA8L2JvZHk+XG48L2h0bWw+YFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VyaWFsaXplLWphdmFzY3JpcHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW50bFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpbnRsLWxvY2FsZXMtc3VwcG9ydGVkXCIpOyIsImltcG9ydCBhdXRoZW50aWNhdGlvblJlcXVpcmVkIGZyb20gJy4vYXV0aGVudGljYXRpb24tcmVxdWlyZWQnXG5pbXBvcnQgYXV0aGVudGljYXRpb25Gb3JiaWRkZW4gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi1mb3JiaWRkZW4nXG5cbmltcG9ydCBSb290IGZyb20gJy4vbGF5b3V0L3Jvb3QnXG5cbmltcG9ydCBMb2dpbiAgICAgICBmcm9tICcuL2FjY291bnQvcGFnZS1sb2dpbidcbmltcG9ydCBSZWdpc3RlciAgICBmcm9tICcuL2FjY291bnQvcGFnZS1yZWdpc3RlcidcbmltcG9ydCBTZXRQYXNzd29yZCBmcm9tICcuL2FjY291bnQvcGFnZS1zZXQtcGFzc3dvcmQnXG5pbXBvcnQgRm9yZ290ICAgICAgZnJvbSAnLi9hY2NvdW50L3BhZ2UtZm9yZ290J1xuaW1wb3J0IFJlc2V0ICAgICAgIGZyb20gJy4vYWNjb3VudC9wYWdlLXJlc2V0J1xuaW1wb3J0IFNldHRpbmdzICAgIGZyb20gJy4vYWNjb3VudC9wYWdlLXNldHRpbmdzJ1xuXG5pbXBvcnQgSG9tZSBmcm9tICcuL2hvbWUvcGFnZS1ob21lJ1xuXG5pbXBvcnQgQXJjaGl2ZUxpc3QgICAgICBmcm9tICcuL2FyY2hpdmUvcGFnZS1saXN0J1xuaW1wb3J0IEFyY2hpdmVRdW90YXRpb24gZnJvbSAnLi9hcmNoaXZlL3BhZ2UtcXVvdGF0aW9uJ1xuaW1wb3J0IEFyY2hpdmVJbnZvaWNlICAgZnJvbSAnLi9hcmNoaXZlL3BhZ2UtaW52b2ljZSdcblxuaW1wb3J0IFF1b3RhdGlvbnNMaXN0ICAgIGZyb20gJy4vcXVvdGF0aW9ucy9wYWdlLWxpc3QnXG5pbXBvcnQgUXVvdGF0aW9uc05ldyAgICAgZnJvbSAnLi9xdW90YXRpb25zL3BhZ2UtbmV3J1xuaW1wb3J0IFF1b3RhdGlvbnNFZGl0ICAgIGZyb20gJy4vcXVvdGF0aW9ucy9wYWdlLWVkaXQnXG5pbXBvcnQgUXVvdGF0aW9uc1ByZXZpZXcgZnJvbSAnLi9xdW90YXRpb25zL3BhZ2UtcHJldmlldydcblxuaW1wb3J0IEludm9pY2VzTGlzdCAgICBmcm9tICcuL2ludm9pY2VzL3BhZ2UtbGlzdCdcbmltcG9ydCBJbnZvaWNlc0VkaXQgICAgZnJvbSAnLi9pbnZvaWNlcy9wYWdlLWVkaXQnXG5pbXBvcnQgSW52b2ljZXNQcmV2aWV3IGZyb20gJy4vaW52b2ljZXMvcGFnZS1wcmV2aWV3J1xuXG5pbXBvcnQgQ3VzdG9tZXJzTGlzdCBmcm9tICcuL2N1c3RvbWVycy9wYWdlLWxpc3QnXG5pbXBvcnQgQ3VzdG9tZXJOZXcgICBmcm9tICcuL2N1c3RvbWVycy9wYWdlLW5ldydcbmltcG9ydCBDdXN0b21lckVkaXQgIGZyb20gJy4vY3VzdG9tZXJzL3BhZ2UtZWRpdCdcblxuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4vcGFnZS1ub3QtZm91bmQnXG5cbmNvbnN0IHJvdXRlcyA9IFt7XG4gIGNvbXBvbmVudDogUm9vdCxcbiAgcm91dGVzOiBbe1xuICAgIHBhdGg6IGAvYWNjb3VudC9sb2dpbmAsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvbkZvcmJpZGRlbiggTG9naW4gKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYWNjb3VudC9yZWdpc3RlcmAsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvbkZvcmJpZGRlbiggUmVnaXN0ZXIgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYWNjb3VudC9zZXQtcGFzc3dvcmRgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25Gb3JiaWRkZW4oIFNldFBhc3N3b3JkICksXG4gIH0sIHtcbiAgICBwYXRoOiBgL2FjY291bnQvZm9yZ290YCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uRm9yYmlkZGVuKCBGb3Jnb3QgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYWNjb3VudC9yZXNldGAsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvbkZvcmJpZGRlbiggUmVzZXQgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIEhvbWUgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYXJjaGl2ZXNgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggQXJjaGl2ZUxpc3QgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYXJjaGl2ZXMvcXVvdGF0aW9ucy86aWRgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggQXJjaGl2ZVF1b3RhdGlvbiApLFxuICB9LCB7XG4gICAgcGF0aDogYC9hcmNoaXZlcy9pbnZvaWNlcy86aWRgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggQXJjaGl2ZUludm9pY2UgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYWNjb3VudC9zZXR0aW5nc2AsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvblJlcXVpcmVkKCBTZXR0aW5ncyApLFxuICB9LCB7XG4gICAgcGF0aDogYC9xdW90YXRpb25zYCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIFF1b3RhdGlvbnNMaXN0ICksXG4gIH0sIHtcbiAgICBwYXRoOiBgL3F1b3RhdGlvbnMvbmV3YCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIFF1b3RhdGlvbnNOZXcgKSxcbiAgfSwge1xuICBwYXRoOiBgL3F1b3RhdGlvbnMvOmlkYCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIFF1b3RhdGlvbnNFZGl0ICksXG4gIH0sIHtcbiAgICBwYXRoOiBgL3F1b3RhdGlvbnMvOmlkL3ByZXZpZXdgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggUXVvdGF0aW9uc1ByZXZpZXcgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvaW52b2ljZXNgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggSW52b2ljZXNMaXN0ICksXG4gIH0sIHtcbiAgcGF0aDogYC9pbnZvaWNlcy86aWRgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggSW52b2ljZXNFZGl0ICksXG4gIH0sIHtcbiAgICBwYXRoOiBgL2ludm9pY2VzLzppZC9wcmV2aWV3YCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIEludm9pY2VzUHJldmlldyApLFxuICB9LCB7XG4gICAgcGF0aDogYC9jdXN0b21lcnNgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggQ3VzdG9tZXJzTGlzdCApLFxuICB9LCB7XG4gICAgcGF0aDogYC9jdXN0b21lcnMvbmV3YCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIEN1c3RvbWVyTmV3ICksXG4gIH0sIHtcbiAgcGF0aDogYC9jdXN0b21lcnMvOmlkYCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIEN1c3RvbWVyRWRpdCApLFxuICB9LCB7XG4gICAgcGF0aDogYCpgLFxuICAgIGNvbXBvbmVudDogTm90Rm91bmQsXG4gIH1dLFxufV1cblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbi8vIFByb3RlY3QgdGhlIHJvdXRlIGlmIE5PVCBhdXRoZW50aWNhdGVcbi8vIOKAoiBiYXNlZCBvbiBodHRwczovL2NyeXNpc2xpbnV4LmNvbS9saW1pdC1hY2Nlc3MtdG8tcmVkdXgtYXBwcy13aXRoLWhpZ2hlci1vcmRlci1jb21wb25lbnRzL1xuXG5jb25zdCBQVUJMSUNfUk9PVCA9IGAvYWNjb3VudC9sb2dpbmBcblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIENvbXBvbmVudCApIHtcblxuICAvLyBUT0RPOiBzaG91bGRuJ3QgcmVkaXJlY3QgaWYgYWxyZWFkeSBvbiBsb2dpbiBwYWdl4oCmXG5cbiAgZnVuY3Rpb24gQXV0aFJlcXVpcmVkKCBwcm9wcyApIHtcbiAgICBjb25zdCB7IHN0YXRpY0NvbnRleHQgfSA9IHByb3BzXG5cbiAgICBpZiAoIHByb3BzLmlzQXV0aGVudGljYXRlZCApIHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30vPlxuXG4gICAgaWYgKCBzdGF0aWNDb250ZXh0ICkge1xuICAgICAgc3RhdGljQ29udGV4dC5zdGF0dXMgPSAzMDJcbiAgICAgIHN0YXRpY0NvbnRleHQudXJsID0gUFVCTElDX1JPT1RcbiAgICB9XG4gICAgcmV0dXJuIDxSZWRpcmVjdCB0bz17IFBVQkxJQ19ST09UIH0gLz5cbiAgfVxuXG4gIC8vIEhvaXN0IOKAnENvbXBvbmVudC5mZXRjaERhdGHigJ1cbiAgLy8g4oCiIG5lZWRlZCBieSB0aGUgdGhlIHNlcnZlciB0byBmZXRjaCB0aGUgcmlnaHQgZGF0YVxuICBpZiAoIENvbXBvbmVudC5mZXRjaERhdGEgKSB7XG4gICAgQXV0aFJlcXVpcmVkLmZldGNoRGF0YSA9IENvbXBvbmVudC5mZXRjaERhdGFcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXRlMnByb3AoIHN0YXRlICkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0F1dGhlbnRpY2F0ZWQ6ICBzdGF0ZS5hY2NvdW50LmdldCggYGlzQXV0aGVudGljYXRlZGAgKSxcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29ubmVjdCggc3RhdGUycHJvcCApKCBBdXRoUmVxdWlyZWQgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBhdXRoZW50aWNhdGlvblJlcXVpcmVkXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbi8vIFByb3RlY3QgdGhlIHJvdXRlIGlmIEFVVEhFTlRJQ0FURVxuLy8g4oCiIHRoZSBvcHBvc2l0ZSBvZiBhdXRoZW50aWNhdGlvbi1yZXF1aXJlZCA7KVxuLy8g4oCiIGJhc2VkIG9uIGh0dHBzOi8vY3J5c2lzbGludXguY29tL2xpbWl0LWFjY2Vzcy10by1yZWR1eC1hcHBzLXdpdGgtaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvXG5cbmNvbnN0IFBSSVZBVEVfUk9PVCA9IGAvYFxuXG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRpb25Gb3JiaWRkZW4oIENvbXBvbmVudCApIHtcblxuICBmdW5jdGlvbiBBdXRoRm9yYmlkZGVuKCBwcm9wcyApIHtcbiAgICBjb25zdCB7IHN0YXRpY0NvbnRleHQgfSA9IHByb3BzXG5cbiAgICBpZiAoICFwcm9wcy5pc0F1dGhlbnRpY2F0ZWQgKSByZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9Lz5cblxuICAgIGlmICggc3RhdGljQ29udGV4dCApIHtcbiAgICAgIHN0YXRpY0NvbnRleHQuc3RhdHVzID0gMzAyXG4gICAgICBzdGF0aWNDb250ZXh0LnVybCA9IFBSSVZBVEVfUk9PVFxuICAgIH1cbiAgICByZXR1cm4gPFJlZGlyZWN0IHRvPXsgUFJJVkFURV9ST09UIH0gLz5cbiAgfVxuXG4gIC8vIEhvaXN0IOKAnENvbXBvbmVudC5mZXRjaERhdGHigJ1cbiAgLy8g4oCiIG5lZWRlZCBieSB0aGUgdGhlIHNlcnZlciB0byBmZXRjaCB0aGUgcmlnaHQgZGF0YVxuICBpZiAoIENvbXBvbmVudC5mZXRjaERhdGEgKSB7XG4gICAgQXV0aEZvcmJpZGRlbi5mZXRjaERhdGEgPSBDb21wb25lbnQuZmV0Y2hEYXRhXG4gIH1cblxuICBmdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBdXRoZW50aWNhdGVkOiAgc3RhdGUuYWNjb3VudC5nZXQoIGBpc0F1dGhlbnRpY2F0ZWRgICksXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbm5lY3QoIHN0YXRlMnByb3AgKSggQXV0aEZvcmJpZGRlbiApXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXV0aGVudGljYXRpb25Gb3JiaWRkZW5cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcmVuZGVyUm91dGVzIH0gZnJvbSAncmVhY3Qtcm91dGVyLWNvbmZpZydcbmltcG9ydCB7IEludGxQcm92aWRlciB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgY29uZmlnICAgICAgICBmcm9tICcuLi9pc29tb3JwaGljLWNvbmZpZydcbmltcG9ydCAqIGFzIGxvY2FsZXMgICAgICAgZnJvbSAnLi4vbG9jYWxlcydcbmltcG9ydCAgICAgIEVycm9yQm91bmRhcnkgZnJvbSAnLi4vZXJyb3ItYm91bmRhcnknXG5pbXBvcnQgICAgICBOYXZNYWluICAgICAgIGZyb20gJy4uL25hdi9tYWluJ1xuaW1wb3J0ICAgICAgTm90aWZpY2F0aW9ucyBmcm9tICcuLi9ub3RpZmljYXRpb25zL2xpc3QnXG5cbmltcG9ydCAnLi9yb290LnNjc3MnXG5cbmNsYXNzIFJvb3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcbiAgfVxuXG4gIHJlbmRlciggKSB7XG4gICAgY29uc3QgeyByb3V0ZSwgbGFuZyB9ID0gdGhpcy5wcm9wc1xuXG4gICAgLy8ga2V5IGlzIG5lZWRlZCBmb3IgZHluYW1pYyBsYW5ndWFnZSBzZWxlY3Rpb25cbiAgICAvLyDigKIgaHR0cHM6Ly9naXRodWIuY29tL3lhaG9vL3JlYWN0LWludGwvd2lraS9Db21wb25lbnRzI2R5bmFtaWMtbGFuZ3VhZ2Utc2VsZWN0aW9uXG4gICAgcmV0dXJuIChcbiAgICAgIDxJbnRsUHJvdmlkZXIgbG9jYWxlPXsgbGFuZyB9IGtleT17IGxhbmcgfSBtZXNzYWdlcz17IGxvY2FsZXNbIGxhbmcgXSB9ID5cbiAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICAgIHsvKiBSZWFjdC5TdHJpY3RNb2RlIHRocm93IGZvciBhbnk6XG4gICAgICAgICAgICAgIOKAoiBDb25uZWN0IGNvbXBvbmVudFxuICAgICAgICAgICAgICDigKIgUm91dGVcbiAgICAgICAgICAgICAg4oCiIFN3aXRjaFxuICAgICAgICAgICAqL31cbiAgICAgICAgICB7LyogPFJlYWN0LlN0cmljdE1vZGU+ICovfVxuICAgICAgICAgICAgPEhlbG1ldFxuICAgICAgICAgICAgICBkZWZhdWx0VGl0bGU9eyBjb25maWcuQVBQX05BTUUgfVxuICAgICAgICAgICAgICB0aXRsZVRlbXBsYXRlPXtgJHtjb25maWcuQVBQX05BTUV9IOKAkyAlc2B9XG4gICAgICAgICAgICAgIG1ldGE9e1tcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAnaHR0cC1lcXVpdic6IGBDb250ZW50LUxhbmd1YWdlYCxcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGxhbmcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAnaHR0cC1lcXVpdic6IGBYLVVBLUNvbXBhdGlibGVgLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogYElFPWVkZ2VgLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogICAgYHZpZXdwb3J0YCxcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGB3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wYCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aHRtbCBsYW5nPXsgbGFuZyB9IC8+XG4gICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPXtgL2FwcGxpY2F0aW9uLWNsaWVudC5jc3NgfSAvPlxuICAgICAgICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLnBuZ1wiIHR5cGU9XCJpbWFnZS9wbmdcIiAvPlxuICAgICAgICAgICAgPC9IZWxtZXQ+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwibWFpbi1sb2dvXCI+eyBjb25maWcuQVBQX05BTUUgfTwvaDE+XG4gICAgICAgICAgICA8TmF2TWFpbiAvPlxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnk+XG4gICAgICAgICAgICAgIHsvKiBjaGlsZCByb3V0ZXMgd29uJ3QgcmVuZGVyIHdpdGhvdXQgdGhpcyAqL31cbiAgICAgICAgICAgICAgey8qIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3JlYWN0LXJvdXRlci1jb25maWcjcmVuZGVycm91dGVzcm91dGVzLWV4dHJhcHJvcHMtLSAqL31cbiAgICAgICAgICAgICAgeyByZW5kZXJSb3V0ZXMocm91dGUucm91dGVzKSB9XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgICA8Tm90aWZpY2F0aW9ucyAvPlxuICAgICAgICAgIHsvKiA8L1JlYWN0LlN0cmljdE1vZGU+ICovfVxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgPC9JbnRsUHJvdmlkZXI+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3BzKCBzdGF0ZSApIHtcbiAgY29uc3QgbGFuZyA9IHN0YXRlLmFjY291bnQuZ2V0KCBgdXNlci5sYW5nYCApICB8fCBgZW5gXG4gIHJldHVybiB7IGxhbmcgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wcyApKCBSb290IClcblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaW50bFwiKTsiLCJleHBvcnQgeyBkZWZhdWx0IGFzIGVuIH0gZnJvbSAnLi9lbidcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZnIgfSBmcm9tICcuL2ZyJ1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAnXy5xdW90YXRpb25zJyAgICA6IGBxdW90YXRpb25zYCAgICAgICxcbiAgJ18uaW52b2ljZXMnICAgICAgOiBgaW52b2ljZXNgICAgICAgICAsXG4gICdfLmludm9pY2VzLnBhaWQnIDogYHBhaWRgICAgICAgICAgICAgLFxuICAnXy5pbnZvaWNlcy5sZWZ0JyA6IGBsZWZ0YCAgICAgICAgICAgICxcbiAgJ18uYW1vdW50JyAgICAgICAgOiBgYW1vdW50YCAgICAgICAgICAsXG4gICdfLmNvdW50JyAgICAgICAgIDogYGNvdW50YCAgICAgICAgICAgLFxuICAnXy5sZWZ0LXRvLXBheScgICA6IGBsZWZ0IHRvIGJlIHBhaWRgICxcbiAgJ18uYXJjaGl2ZScgICAgICAgOiBgYXJjaGl2ZWAgICAgICAgICAsXG4gICdfLnNhdmUnICAgICAgICAgIDogYHNhdmVgICAgICAgICAgICAgLFxuICAnXy5jcmVhdGUnICAgICAgICA6IGBjcmVhdGVgICAgICAgICAgICxcbiAgJ18ucHJpbnQnICAgICAgICAgOiBgcHJpbnRgICAgICAgICAgICAsXG4gICdfLmVkaXQnICAgICAgICAgIDogYGVkaXRgICAgICAgICAgICAgLFxuICAnXy5wcmludC1ub3RpY2UnICA6IGBJbiBGaXJlZm94IGJyb3dzZXIsIGRvbid0IGZvcmdldCB0byBjaGVjayB0aGUgPGI+UHJpbnQgQmFja2dyb3VuZCBDb2xvcjwvYj4gY2hlY2tib3hgICxcblxuICAnYWNjb3VudC5sb2dpbi50aXRsZScgICAgICAgICA6IGBsb2dpbmAsXG4gICdhY2NvdW50LmxvZ2luLmJ1dHRvbicgICAgICAgIDogYGNvbm5lY3RgLFxuICAnYWNjb3VudC5yZWdpc3Rlci50aXRsZScgICAgICA6IGByZWdpc3RlcmAsXG4gICdhY2NvdW50LnJlZ2lzdGVyLm5vdGljZScgICAgIDogYEFmdGVyIHN1Ym1pdHRpbmcsIHlvdSB3aWxsIHJlY2VpdmUgYnkgZW1haWwgYSBjb25maXJtYXRpb24gbGluayB0byBzZXQgeW91ciBwYXNzd29yZGAsXG4gICdhY2NvdW50LnJlZ2lzdGVyLmJ1dHRvbicgICAgIDogYGNyZWF0ZSBhbmQgYWNjb3VudGAsXG4gICdhY2NvdW50LmZvcmdvdC50aXRsZScgICAgICAgIDogYEZvcmdvdHRlbiBwYXNzd29yZD9gLFxuICAnYWNjb3VudC5mb3Jnb3Qubm90aWNlJyAgICAgICA6IGBBZnRlciBzdWJtaXR0aW5nLCB5b3Ugd2lsbCByZWNlaXZlIGJ5IGVtYWlsIGEgcmVzZXQgbGlua2AsXG4gICdhY2NvdW50LmZvcmdvdC5idXR0b24nICAgICAgIDogYFNlbmQgdGhlIGxpbmtgLFxuICAnYWNjb3VudC5yZXNldC50aXRsZScgICAgICAgICA6IGBQYXNzd29yZCByZXNldGAsXG4gICdhY2NvdW50LnJlc2V0Lm5vdGljZScgICAgICAgIDogYFBsZWFzZSBzZXQgeW91ciBuZXcgcGFzc3dvcmRgLFxuICAnYWNjb3VudC5yZXNldC5idXR0b24nICAgICAgICA6IGBSZXNldGAsXG4gICdhY2NvdW50LnNldC1wYXNzd29yZC50aXRsZScgIDogYFNldHVwIHlvdXIgcGFzc3dvcmRgLFxuICAnYWNjb3VudC5zZXQtcGFzc3dvcmQuYnV0dG9uJyA6IGBTZXQgcGFzc3dvcmRgLFxuXG4gICdjb25maWd1cmF0aW9uLnRhYi5mcm9tJyAgICAgICAgICAgIDogYGZyb21gICAgICAgICAgICAgICAsXG4gICdjb25maWd1cmF0aW9uLnRhYi5kZWZhdWx0LXByb2R1Y3QnIDogYERlZmF1bHQgcHJvZHVjdGAgICAsXG4gICdjb25maWd1cmF0aW9uLnRhYi5tZW50aW9ucycgICAgICAgIDogYEZvb3RlciBtZW50aW9uc2AgICAsXG4gICdjb25maWd1cmF0aW9uLnRhYi5yZWZlcmVuY2UnICAgICAgIDogYFJlZmVyZW5jZWAgICAgICAgICAsXG4gICdjb25maWd1cmF0aW9uLm1lbnRpb25zLnF1b3RhdGlvbnMnIDogYEZvciB0aGUgcXVvdGF0aW9uc2AsXG4gICdjb25maWd1cmF0aW9uLm1lbnRpb25zLmludm9pY2VzJyAgIDogYEZvciB0aGUgaW52b2ljZXNgICAsXG4gICdjb25maWd1cmF0aW9uLmJ1dHRvbi5zYXZlJyAgICAgICAgIDogYFVwZGF0ZWAgICAgICAgICAgICAsXG4gICdjb25maWd1cmF0aW9uLnJlZmVyZW5jZS53YXJuaW5nJyAgOiBgXG4gICAgQ2hhbmdpbmcgPHN0cm9uZz50aGUgc3RhcnRpbmcgbnVtYmVyPC9zdHJvbmc+IHdpbGwgcmVudW1iZXIgYWxsIHJlZmVyZW5jZXMgb2YgdGhlIHR5cGUgY29uY2VybmVkLlxuICAgIDxiciAvPlxuICAgIEJlIGNhdXRpb3VzIWAsXG5cbiAgJ2N1c3RvbWVyLmJ1dHRvbi5jcmVhdGUnICAgICA6IGBDcmVhdGUgYSBjdXN0b21lcmAgLFxuICAnY3VzdG9tZXIuYnV0dG9uLnVwZGF0ZScgICAgIDogYHVwZGF0ZWAgICAgICAgICAgICAsXG4gICdjdXN0b21lci5idXR0b24ubmV3JyAgICAgICAgOiBgbmV3IGN1c3RvbWVyYCAgICAgICxcbiAgJ2N1c3RvbWVyLmJ1dHRvbi5saXN0JyAgICAgICA6IGBjdXN0b21lciBsaXN0YCAgICAgLFxuICAnY3VzdG9tZXIudGFiLmNvbmZpZ3VyYXRpb24nIDogYGNvbmZpZ3VyZSBoZWFkZXJgICAsXG4gICdjdXN0b21lci50b3RhbC5xdW90YXRpb24nICAgOiBgcXVvdGF0aW9uIHRvdGFsYCAgICxcbiAgJ2N1c3RvbWVyLnRvdGFsLmludm9pY2UnICAgICA6IGBpbnZvaWNlIHRvdGFsYCAgICAgLFxuICAnY3VzdG9tZXIudG90YWwudG8tYmUtcGFpZCcgIDogYHRvIGJlIHBhaWRgICAgICAgICAsXG4gICdjdXN0b21lci50b3RhbC5wcm9ncmVzcycgICAgOiBgcHJvZ3Jlc3NgICAgICAgICAgICxcblxuICAnZmllbGQuZW1haWwnICAgICAgICAgOiBgZW1haWxgICAgICAgICAgLFxuICAnZmllbGQucGFzc3dvcmQnICAgICAgOiBgcGFzc3dvcmRgICAgICAgLFxuICAnZmllbGQubmFtZScgICAgICAgICAgOiBgbmFtZWAgICAgICAgICAgLFxuICAnZmllbGQuYWRkcmVzcycgICAgICAgOiBgYWRkcmVzc2AgICAgICAgLFxuICAnZmllbGQuY3VzdG9tZXInICAgICAgOiBgY3VzdG9tZXJgICAgICAgLFxuICAnZmllbGQudGF4JyAgICAgICAgICAgOiBgdGF4YCAgICAgICAgICAgLFxuICAnZmllbGQuc3ViamVjdCcgICAgICAgOiBgc3ViamVjdGAgICAgICAgLFxuICAnZmllbGQuZGVzY3JpcHRpb24nICAgOiBgZGVzY3JpcHRpb25gICAgLFxuICAnZmllbGQucXVhbnRpdHknICAgICAgOiBgcXVhbnRpdHlgICAgICAgLFxuICAnZmllbGQuY3VycmVuY3knICAgICAgOiBgY3VycmVuY3lgICAgICAgLFxuICAnZmllbGQucHJlZml4JyAgICAgICAgOiBgcHJlZml4YCAgICAgICAgLFxuICAnZmllbGQuc3RhcnQtYXQnICAgICAgOiBgc3RhcnQgYXRgICAgICAgLFxuICAnZmllbGQubGFuZ3VhZ2UnICAgICAgOiBgbGFuZ3VhZ2VgICAgICAgLFxuICAnZmllbGQuZGVmYXVsdC1wcmljZScgOiBgZGVmYXVsdCBwcmljZWAgLFxuXG4gICdpbnZvaWNlcy50YWIucGF5bWVudHMnICAgICAgOiBgUGF5bWVudHNgLFxuICAnaW52b2ljZXMudGFiLnByZXZpZXcnICAgICAgIDogYEludm9pY2UgUHJldmlld2AsXG4gICdpbnZvaWNlcy5idXR0b24uc2F2ZScgICAgICAgOiBgVXBkYXRlIEludm9pY2VgLFxuICAnaW52b2ljZXMuYnV0dG9uLnF1b3RhdGlvbicgIDogYFNob3cgcXVvdGF0aW9uYCxcbiAgJ2ludm9pY2VzLmJ1dHRvbi5wcmV2aWV3JyAgICA6IGBwcmV2aWV3IGludm9pY2VgLFxuICAnaW52b2ljZXMuYnV0dG9uLmFyY2hpdmUnICAgIDogYGFyY2hpdmVgLFxuICAnaW52b2ljZXMuZXZlbnQnICAgICAgICAgICAgIDogYGV2ZW50YCxcbiAgJ2ludm9pY2VzLmV2ZW50LiMnICAgICAgICAgICA6IGAjYCxcbiAgJ2ludm9pY2VzLmV2ZW50LmRlc2NyaXB0aW9uJyA6IGBkZXNjcmlwdGlvbmAsXG4gICdpbnZvaWNlcy5ldmVudC5wYXltZW50JyAgICAgOiBgcGF5bWVudGAsXG4gICdpbnZvaWNlcy5ldmVudC5kYXRlJyAgICAgICAgOiBgZGF0ZWAsXG4gICdpbnZvaWNlcy5ldmVudC5hbW91bnQnICAgICAgOiBgYW1vdW50YCxcbiAgJ2ludm9pY2VzLmV2ZW50LnNlbnQnICAgICAgICA6IGBzZW50YCxcblxuICAna2V5LXByZXMuY3VzdG9tZXInICAgICAgICAgICA6IGBjdXN0b21lcmAgICAgICAgICAgICAgLFxuICAna2V5LXByZXMuc2VudCcgICAgICAgICAgICAgICA6IGBzZW50IGF0YCAgICAgICAgICAgICAgLFxuICAna2V5LXByZXMudmFsaWRhdGVkJyAgICAgICAgICA6IGB2YWxpZGF0ZWQgYXRgICAgICAgICAgLFxuICAna2V5LXByZXMuc2lnbmVkJyAgICAgICAgICAgICA6IGBzaWduZWQgYXRgICAgICAgICAgICAgLFxuICAna2V5LXByZXMudG90YWwnICAgICAgICAgICAgICA6IGB0b3RhbGAgICAgICAgICAgICAgICAgLFxuICAna2V5LXByZXMuYXNzb2NpYXRlZC5xdW90ZScgICA6IGBhc3NvY2lhdGVkIHF1b3RhdGlvbmAgLFxuICAna2V5LXByZXMuYXNzb2NpYXRlZC5pbnZvaWNlJyA6IGBhc3NvY2lhdGVkIGludm9pY2VgICAgLFxuICAna2V5LXByZXMubGVmdC10by1wYXknICAgICAgICA6IGBsZWZ0IHRvIHBheWAgICAgICAgICAgLFxuXG4gICdub3RpZmljYXRpb25zLnVzZXIud2VsY29tZScgICAgICAgICAgICAgICAgICAgICA6IGBXZWxjb21lIHtuYW1lfWAsXG4gICdub3RpZmljYXRpb25zLnVzZXIubWFpbC1zZW50JyAgICAgICAgICAgICAgICAgICA6IGBBbiBlbWFpbCBoYXMgYmVlbiBzZW50IHRvIHtlbWFpbH1gLFxuICAnbm90aWZpY2F0aW9ucy5xdW90YXRpb24uc2F2ZWQnICAgICAgICAgICAgICAgICAgOiBgVGhlIHF1b3RhdGlvbiBoYXMgYmVlbiBzYXZlZGAsXG4gICdub3RpZmljYXRpb25zLnF1b3RhdGlvbi5lcnJvcicgICAgICAgICAgICAgICAgICA6IGBBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBiYWNraW5nIHVwYCxcbiAgJ25vdGlmaWNhdGlvbnMucXVvdGF0aW9uLmNyZWF0ZS1pbnZvaWNlLnN1Y2Nlc3MnIDogYEludm9pY2UgY3JlYXRlZGAsXG4gICdub3RpZmljYXRpb25zLnF1b3RhdGlvbi5jcmVhdGUtaW52b2ljZS5lcnJvcicgICA6IGBBbiBlcnJvciBhcyBvY2N1cnJlZCB3aGlsZSBjcmVhdGluZyBpbnZvaWNlYCxcbiAgJ25vdGlmaWNhdGlvbnMuaW52b2ljZS5zYXZlZCcgICAgICAgICAgICAgICAgICAgIDogYFRoZSBpbnZvaWNlIGhhcyBiZWVuIHNhdmVkYCxcbiAgJ25vdGlmaWNhdGlvbnMuaW52b2ljZS5lcnJvcicgICAgICAgICAgICAgICAgICAgIDogYEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGJhY2tpbmcgdXBgLFxuICAnbm90aWZpY2F0aW9ucy5jdXN0b21lci5zYXZlZCcgICAgICAgICAgICAgICAgICAgOiBgVGhlIGN1c3RvbWVyIGhhcyBiZWVuIHNhdmVkYCxcbiAgJ25vdGlmaWNhdGlvbnMuZ2VuZXJpYy5zYXZlZCcgICAgICAgICAgICAgICAgICAgIDogYHNhdmVkYCxcbiAgJ25vdGlmaWNhdGlvbnMuZ2VuZXJpYy5lcnJvcicgICAgICAgICAgICAgICAgICAgIDogYOKAoiBzb21ldGhpbmcgd2VudCB3cm9uZyDigKJgLFxuXG4gICdwYWdlLmhvbWUnICAgICAgICAgICAgICAgICAgOiBgaG9tZWAgLFxuICAncGFnZS5xdW90YXRpb25zJyAgICAgICAgICAgIDogYHF1b3RhdGlvbnNgICxcbiAgJ3BhZ2UucXVvdGF0aW9ucy5uZXcnICAgICAgICA6IGBuZXcgcXVvdGF0aW9uYCAsXG4gICdwYWdlLnF1b3RhdGlvbnMuZWRpdCcgICAgICAgOiBgZWRpdCBxdW90YXRpb24g4oCTIHtyZWZlcmVuY2V9YCAsXG4gICdwYWdlLnF1b3RhdGlvbnMucHJldmlldycgICAgOiBgcXVvdGF0aW9uIOKAkyB7cmVmZXJlbmNlfWAgLFxuICAncGFnZS5pbnZvaWNlcycgICAgICAgICAgICAgIDogYGludm9pY2VzYCAsXG4gICdwYWdlLmludm9pY2VzLmVkaXQnICAgICAgICAgOiBgZWRpdCBpbnZvaWNlIC0ge3JlZmVyZW5jZX1gICxcbiAgJ3BhZ2UuaW52b2ljZXMucHJldmlldycgICAgICA6IGBpbnZvaWNlIOKAkyB7cmVmZXJlbmNlfWAgLFxuICAncGFnZS5jdXN0b21lcnMnICAgICAgICAgICAgIDogYGN1c3RvbWVyc2AgLFxuICAncGFnZS5jdXN0b21lcnMubmV3JyAgICAgICAgIDogYG5ldyBjdXN0b21lcmAgLFxuICAncGFnZS5jdXN0b21lcnMuZWRpdCcgICAgICAgIDogYGN1c3RvbWVyIDoge25hbWV9YCAsXG4gICdwYWdlLnNldHRpbmdzJyAgICAgICAgICAgICAgOiBgc2V0dGluZ3NgICxcbiAgJ3BhZ2UuY29ubmVjdGVkJyAgICAgICAgICAgICA6IGBjb25uZWN0ZWQgYXM6PGJyLz57ZW1haWx9YCAsXG4gICdwYWdlLmxvZ291dCcgICAgICAgICAgICAgICAgOiBgbG9nb3V0YCAsXG4gICdwYWdlLmxvZ2luJyAgICAgICAgICAgICAgICAgOiBgbG9naW5gICxcbiAgJ3BhZ2UucmVnaXN0ZXInICAgICAgICAgICAgICA6IGByZWdpc3RlcmAgLFxuICAncGFnZS5mb3Jnb3QnICAgICAgICAgICAgICAgIDogYGZvcmdvdHRlbiBwYXNzd29yZGAgLFxuICAncGFnZS5lcnJvcicgICAgICAgICAgICAgICAgIDogYHNvbWV0aGluZyB3ZW50IHdyb25nYCAsXG4gICdwYWdlLmVycm9yLnByb2R1Y3Rpb24taGludCcgOiBgdHJ5IHRvIHJlbG9hZCB0aGUgcGFnZWAgLFxuICAncGFnZS5hcmNoaXZlZCcgICAgICAgICAgICAgIDogYGFyY2hpdmVzYCAsXG5cbiAgJ3BhcGVyLXNoZWV0LnJlZmVyZW5jZS5xdW90YXRpb24nICAgOiBgUXVvdGF0aW9uYCAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnJlZmVyZW5jZS5pbnZvaWNlJyAgICAgOiBgSW52b2ljZWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnJlZmVyZW5jZS5kYXRlJyAgICAgICAgOiBgZGF0ZTogYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5LmZyb20nICAgICAgICAgICAgOiBgRnJvbTpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5LnRvJyAgICAgICAgICAgICAgOiBgVG86YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLW5hbWUuZnJvbScgICAgOiBgZGVmaW5lIHlvdXIgbmFtZSBpbiB0aGUgc2V0dGluZ3NgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLWFkZHJlc3MuZnJvbScgOiBgZGVmaW5lIHlvdXIgYWRkcmVzcyBpbiB0aGUgc2V0dGluZ3NgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLW5hbWUudG8nICAgICAgOiBgY3VzdG9tZXIgd2l0aG91dCBuYW1lYCAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLWFkZHJlc3MudG8nICAgOiBgY3VzdG9tZXIgd2l0aG91dCBhZGRyZXNzYCAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnN1YmplY3QnICAgICAgICAgICAgICAgOiBgU3ViamVjdDpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcblxuICAncHJvZHVjdC5wbGFjZS1ob2xkZXInOiBgdHlwZSB0byBjcmVhdGUgYSBuZXcgbGluZWAsXG5cbiAgJ3F1b3RhdGlvbi5jcmVhdGUnICAgICAgICAgICA6IGBjcmVhdGVgICAgICAgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24ucmVhZHktdG8taW52b2ljZScgOiBgcXVvdGUgcmVhZHkgZm9yIGludm9pY2luZ2AgLFxuICAncXVvdGF0aW9uLmludm9pY2UuY3JlYXRlJyAgIDogYGNyZWF0ZSBpbnZvaWNlYCAgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5pbnZvaWNlLnNob3cnICAgICA6IGBzaG93IGludm9pY2VgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uYnV0dG9uLmNyZWF0ZScgICAgOiBgQ3JlYXRlIHF1b3RhdGlvbmAgICAgICAgICAgLFxuICAncXVvdGF0aW9uLmJ1dHRvbi51cGRhdGUnICAgIDogYFVwZGF0ZSB0aGUgcXVvdGF0aW9uYCAgICAgICxcbiAgJ3F1b3RhdGlvbi5idXR0b24uYXJjaGl2ZScgICA6IGBBcmNoaXZlYCAgICAgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uYnV0dG9uLm5ldycgICAgICAgOiBgTmV3IHF1b3RhdGlvbmAgICAgICAgICAgICAgLFxuICAncXVvdGF0aW9uLmJ1dHRvbi5saXN0JyAgICAgIDogYGxpc3QgcXVvdGF0aW9uc2AgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5idXR0b24ucHJldmlldycgICA6IGBwcmV2aWV3IHF1b3RhdGlvbmAgICAgICAgICAsXG5cbiAgJ3NwaW5uZXIubG9hZGluZycgIDogYGxvYWRpbmfigKZgICxcblxuICAnc3RlcHBlci5zZW50JyAgICAgIDogYHNlbnQgYXQ6YCAgICAgICxcbiAgJ3N0ZXBwZXIudmFsaWRhdGVkJyA6IGB2YWxpZGF0ZWQgYXQ6YCAsXG4gICdzdGVwcGVyLnNpZ25lZCcgICAgOiBgc2lnbmVkIGF0OmAgICAgLFxuICAnc3RlcHBlci5jdXN0b21lcicgIDogYGN1c3RvbWVyOmAgICAgICxcbiAgJ3N0ZXBwZXIudG90YWwnICAgICA6IGB0b3RhbDpgICAgICAgICAsXG5cbiAgJ3RhYmxlLmhlYWRlci5pZCcgICAgICAgICAgICAgICAgICAgOiBgI2AgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5uYW1lJyAgICAgICAgICAgICAgICAgOiBgbmFtZWAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5jdXN0b21lcicgICAgICAgICAgICAgOiBgY3VzdG9tZXJgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5zdGF0dXMnICAgICAgICAgICAgICAgOiBgc3RhdHVzYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci50YXgnICAgICAgICAgICAgICAgICAgOiBgdGF4YCAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdW90YXRpb24nICAgICAgICAgICAgOiBgcXVvdGF0aW9uYCAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdW90YXRpb24tYXNzb2NpYXRlZCcgOiBgYXNzb2NpYXRlZCBxdW90YXRpb25gICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdW90YXRpb25zJyAgICAgICAgICAgOiBgcXVvdGF0aW9uc2AgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5pbnZvaWNlJyAgICAgICAgICAgICAgOiBgaW52b2ljZWAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5pbnZvaWNlcycgICAgICAgICAgICAgOiBgaW52b2ljZXNgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5kZXNjcmlwdGlvbicgICAgICAgICAgOiBgZGVzY3JpcHRpb25gICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdWFudGl0eScgICAgICAgICAgICAgOiBgcXVhbnRpdHlgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci51bml0LXByaWNlJyAgICAgICAgICAgOiBgdW5pdCBwcmljZWAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5zZW50JyAgICAgICAgICAgICAgICAgOiBgc2VudGAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci52YWxpZGF0ZWQnICAgICAgICAgICAgOiBgdmFsaWRhdGVkYCAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5zaWduZWQnICAgICAgICAgICAgICAgOiBgc2lnbmVkYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5jdW11bGF0aXZlLWFtb3VudCcgICAgOiBgY3VtdWxhdGl2ZSBhbW91bnRgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC1odCcgICAgICAgICAgICAgICAgICAgOiBgcHJlLXRheCBhbW91bnRgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC10YXhlcycgICAgICAgICAgICAgICAgOiBgdGF4ZXNgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudCcgICAgICAgICAgICAgICAgICAgICAgOiBgYW1vdW50YCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC5wYWlkJyAgICAgICAgICAgICAgICAgOiBgcGFpZGAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC5sZWZ0LXRvLXBheScgICAgICAgICAgOiBgbGVmdGAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmVtcHR5JyAgICAgICAgICAgICAgICAgICAgICAgOiBgbm9uZSAoeWV0KWAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLnBhZ2luYXRpb24nICAgICAgICAgICAgICAgICAgOiBge3N0YXJ0fSDigJMge2VuZH0gb2Yge3RvdGFsfWAgLFxuICAndGFibGUucm93cy1wZXItcGFnZScgICAgICAgICAgICAgICA6IGByb3dzIHBlciBwYWdlOmAgICAgICAgICAgICAgLFxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAnXy5xdW90YXRpb25zJyAgICA6IGBkZXZpc2AgICAgICAgICAsXG4gICdfLmludm9pY2VzJyAgICAgIDogYGZhY3R1cmVzYCAgICAgICxcbiAgJ18uYW1vdW50JyAgICAgICAgOiBgbW9udGFudGAgICAgICAgLFxuICAnXy5pbnZvaWNlcy5wYWlkJyA6IGBwYXnDqWAgICAgICAgICAgLFxuICAnXy5pbnZvaWNlcy5sZWZ0JyA6IGDDoCBwYXllcmAgICAgICAgLFxuICAnXy5jb3VudCcgICAgICAgICA6IGBub21icmVgICAgICAgICAsXG4gICdfLmxlZnQtdG8tcGF5JyAgIDogYHJlc3RlIMOgIHBheWVyYCAsXG4gICdfLmFyY2hpdmUnICAgICAgIDogYGFyY2hpdmVyYCAgICAgICxcbiAgJ18uc2F2ZScgICAgICAgICAgOiBgc2F1dmVyYCAgICAgICAgLFxuICAnXy5jcmVhdGUnICAgICAgICA6IGBjcsOpZXJgICAgICAgICAgLFxuICAnXy5wcmludCcgICAgICAgICA6IGBpbXByaW1lcmAgICAgICAsXG4gICdfLmVkaXQnICAgICAgICAgIDogYG1vZGlmaWVyYCAgICAgICxcbiAgJ18ucHJpbnQtbm90aWNlJyAgOiBgRGFucyBsZSBuYXZpZ2F0ZXVyIEZpcmVmb3gsIG4nb3VibGlleiBwYXMgZGUgY29jaGVyIGxhIGNhc2UgPGI+SW1wcmltZXIgbGEgY291bGV1ciBkJ2FycmnDqHJlLXBsYW48L2I+YCAsXG5cbiAgJ2FjY291bnQubG9naW4udGl0bGUnICAgICAgICAgOiBgY29ubmV4aW9uYCxcbiAgJ2FjY291bnQubG9naW4uYnV0dG9uJyAgICAgICAgOiBgc2UgY29ubmVjdGVyYCxcbiAgJ2FjY291bnQucmVnaXN0ZXIudGl0bGUnICAgICAgOiBgQ3LDqWVyIHVuIGNvbXB0ZWAsXG4gICdhY2NvdW50LnJlZ2lzdGVyLmJ1dHRvbicgICAgIDogYGNyw6llcmAsXG4gICdhY2NvdW50LnJlZ2lzdGVyLm5vdGljZScgICAgIDogYEFwcsOocyBsJ2Vudm9pZSBkdSBmb3JtdWxhaXJlJywgdm91cyByZWNldnJleiBwYXIgZW1haWwgdW4gbGllbiBkZSBjb25maXJtYXRpb24gcG91ciBkw6lmaW5pciB2b3RyZSBtb3QgZGUgcGFzc2VgLFxuICAnYWNjb3VudC5mb3Jnb3QudGl0bGUnICAgICAgICA6IGBNb3QgZGUgcGFzc2Ugb3VibGnDqSA/YCxcbiAgJ2FjY291bnQuZm9yZ290Lm5vdGljZScgICAgICAgOiBgQXByw6hzIGF2b2lyIHZhbGlkw6ksIHZvdXMgcmVjZXZyZXogcGFyIGVtYWlsIHVuIGxpZW4gZGUgcsOpaW5pdGlhbGlzYXRpb25gLFxuICAnYWNjb3VudC5mb3Jnb3QuYnV0dG9uJyAgICAgICA6IGBFbnZveWVyIGxlIGxpZW5gLFxuICAnYWNjb3VudC5yZXNldC50aXRsZScgICAgICAgICA6IGBSw6lpbml0aWFsaXNhdGlvbiBkdSBtb3QgZGUgcGFzc2VgLFxuICAnYWNjb3VudC5yZXNldC5ub3RpY2UnICAgICAgICA6IGBWZXVpbGxleiByZW50cmVyIHZvdHJlIG5vdXZlYXUgbW90IGRlIHBhc3NlYCxcbiAgJ2FjY291bnQucmVzZXQuYnV0dG9uJyAgICAgICAgOiBgUsOpaW5pdGlhbGlzZXJgLFxuICAnYWNjb3VudC5zZXQtcGFzc3dvcmQudGl0bGUnICA6IGBEw6lmaW5pdGlvbiBkdSBtb3QgZGUgcGFzc2VgLFxuICAnYWNjb3VudC5zZXQtcGFzc3dvcmQuYnV0dG9uJyA6IGBEw6lmaW5pciBsZSBtb3QgZGUgcGFzc2VgLFxuXG4gICdjb25maWd1cmF0aW9uLnRhYi5mcm9tJyAgICAgICAgICAgOiBgw4ltZXR0ZXVyYCxcbiAgJ2NvbmZpZ3VyYXRpb24udGFiLmRlZmF1bHQtcHJvZHVjdCc6IGBQcm9kdWl0IHBhciBkw6lmYXV0YCxcbiAgJ2NvbmZpZ3VyYXRpb24udGFiLm1lbnRpb25zJyAgICAgICA6IGBCYXMgZGUgcGFnZWAsXG4gICdjb25maWd1cmF0aW9uLnRhYi5yZWZlcmVuY2UnICAgICAgOiBgUsOpZsOpcmVuY2VgLFxuICAnY29uZmlndXJhdGlvbi5tZW50aW9ucy5xdW90YXRpb25zJzogYFBvdXIgbGVzIGRldmlzYCxcbiAgJ2NvbmZpZ3VyYXRpb24ubWVudGlvbnMuaW52b2ljZXMnICA6IGBQb3VyIGxlcyBmYWN0dXJlc2AsXG4gICdjb25maWd1cmF0aW9uLmJ1dHRvbi5zYXZlJyAgICAgICAgOiBgTWV0dHJlIMOgIGpvdXJgLFxuICAnY29uZmlndXJhdGlvbi5yZWZlcmVuY2Uud2FybmluZycgIDogYFxuICAgIENoYW5nZXIgPHN0cm9uZz5sZSBjaGlmZnJlIGRlIGTDqWJ1dDwvc3Ryb25nPiByZW51bcOpcm90ZXJhIHRvdXRlcyBsZXMgcsOpZsOpcmVuY2VzIGR1IHR5cGUgY29uY2VybsOpLlxuICAgIDxiciAvPlxuICAgIFNveWV6IHBydWRlbnQgIWAsXG5cbiAgJ2N1c3RvbWVyLmJ1dHRvbi5jcmVhdGUnICAgICA6IGBDcsOpZXIgbGUgY2xpZW50YCAgLFxuICAnY3VzdG9tZXIuYnV0dG9uLnVwZGF0ZScgICAgIDogYE1ldHRyZSDDoCBqb3VyYCAgICAsXG4gICdjdXN0b21lci5idXR0b24ubmV3JyAgICAgICAgOiBgbm91dmVhdSBjbGllbnRgICAgLFxuICAnY3VzdG9tZXIuYnV0dG9uLmxpc3QnICAgICAgIDogYGxpc3QgZGVzIGNsaWVudHNgICxcbiAgJ2ludm9pY2VzLmJ1dHRvbi5hcmNoaXZlJyAgICA6IGBhcmNoaXZlcmAgICAgICAgICAsXG4gICdjdXN0b21lci50YWIuY29uZmlndXJhdGlvbicgOiBgw4lkaXRpb24gbCdlbnTDqnRlYCAsXG4gICdjdXN0b21lci50b3RhbC5xdW90YXRpb24nICAgOiBgdG90YWwgZGV2aXNgICAgICAgLFxuICAnY3VzdG9tZXIudG90YWwuaW52b2ljZScgICAgIDogYHRvdGFsIGZhY3R1cmVzYCAgICxcbiAgJ2N1c3RvbWVyLnRvdGFsLnRvLWJlLXBhaWQnICA6IGByZXN0ZSDDoCBwYXllcmAgICAgLFxuICAnY3VzdG9tZXIudG90YWwucHJvZ3Jlc3MnICAgIDogYHByb2dyZXNzaW9uYCAgICAgICxcblxuICAnZmllbGQuZW1haWwnICAgICAgICAgOiBgZW1haWxgICAgICAgICAgICAsXG4gICdmaWVsZC5wYXNzd29yZCcgICAgICA6IGBtb3QgZGUgcGFzc2VgICAgICxcbiAgJ2ZpZWxkLm5hbWUnICAgICAgICAgIDogYG5vbWAgICAgICAgICAgICAgLFxuICAnZmllbGQuYWRkcmVzcycgICAgICAgOiBgYWRyZXNzZWAgICAgICAgICAsXG4gICdmaWVsZC5jdXN0b21lcicgICAgICA6IGBjbGllbnRgICAgICAgICAgICxcbiAgJ2ZpZWxkLnRheCcgICAgICAgICAgIDogYHRheGVgICAgICAgICAgICAgLFxuICAnZmllbGQuc3ViamVjdCcgICAgICAgOiBgb2JqZXRgICAgICAgICAgICAsXG4gICdmaWVsZC5kZXNjcmlwdGlvbicgICA6IGBkZXNjcmlwdGlvbmAgICAgICxcbiAgJ2ZpZWxkLnF1YW50aXR5JyAgICAgIDogYHF1YW50aXTDqWAgICAgICAgICxcbiAgJ2ZpZWxkLmN1cnJlbmN5JyAgICAgIDogYGRldmlzZWAgICAgICAgICAgLFxuICAnZmllbGQucHJlZml4JyAgICAgICAgOiBgcHLDqWZpeGVgICAgICAgICAgLFxuICAnZmllbGQuc3RhcnQtYXQnICAgICAgOiBgY29tbWVuY2Ugw6BgICAgICAgLFxuICAnZmllbGQubGFuZ3VhZ2UnICAgICAgOiBgbGFuZ3VlYCAgICAgICAgICAsXG4gICdmaWVsZC5kZWZhdWx0LXByaWNlJyA6IGBwcml4IHBhciBkw6lmYXV0YCAsXG5cbiAgJ2ludm9pY2VzLnRhYi5wYXltZW50cycgICAgICA6IGBQYWllbWVudHNgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLnRhYi5wcmV2aWV3JyAgICAgICA6IGBBcGVyw6d1IGRlIGxhIGZhY3R1cmVgICAgICAsXG4gICdpbnZvaWNlcy5idXR0b24uc2F2ZScgICAgICAgOiBgTWV0dHJlIMOgIGpvdXJgICAgICAgICAgICAgLFxuICAnaW52b2ljZXMuYnV0dG9uLnF1b3RhdGlvbicgIDogYFZvaXIgbGUgZGV2aXNgICAgICAgICAgICAgLFxuICAnaW52b2ljZXMuYnV0dG9uLnByZXZpZXcnICAgIDogYHByw6l2aXN1YWxpc2VyIGxhIGZhY3R1cmVgICxcbiAgJ2ludm9pY2VzLmJ1dHRvbi5saXN0JyAgICAgICA6IGBsaXN0ZSBkZXMgZGV2aXNgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50JyAgICAgICAgICAgICA6IGDDqXbDqG5lbWVudGAgICAgICAgICAgICAgICAgLFxuICAnaW52b2ljZXMuZXZlbnQuIycgICAgICAgICAgIDogYG7LmmAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LmRlc2NyaXB0aW9uJyA6IGBkZXNjcmlwdGlvbmAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LnBheW1lbnQnICAgICA6IGBwYWllbWVudGAgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LmRhdGUnICAgICAgICA6IGBkYXRlYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LmFtb3VudCcgICAgICA6IGBtb250YW50YCAgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LnNlbnQnICAgICAgICA6IGBlbnZvecOpYCAgICAgICAgICAgICAgICAgICAsXG5cbiAgJ2tleS1wcmVzLmN1c3RvbWVyJyAgICAgICAgICA6IGBjbGllbnRgICAgICAgICAgICxcbiAgJ2tleS1wcmVzLnNlbnQnICAgICAgICAgICAgICA6IGBlbnZvecOpIGxlYCAgICAgICAsXG4gICdrZXktcHJlcy52YWxpZGF0ZWQnICAgICAgICAgOiBgdmFsaWTDqSBsZWAgICAgICAgLFxuICAna2V5LXByZXMuc2lnbmVkJyAgICAgICAgICAgIDogYHNpZ27DqSBsZWAgICAgICAgICxcbiAgJ2tleS1wcmVzLnRvdGFsJyAgICAgICAgICAgICA6IGB0b3RhbGAgICAgICAgICAgICxcbiAgJ2tleS1wcmVzLmFzc29jaWF0ZWQucXVvdGUnICA6IGBkZXZpcyBhc3NvY2nDqWAgICAsXG4gICdrZXktcHJlcy5hc3NvY2lhdGVkLmludm9pY2UnOiBgZmFjdHVyZSBhc3NvY2nDqWVgLFxuICAna2V5LXByZXMubGVmdC10by1wYXknICAgICAgIDogYHJlc3RlIMOgIHBheWVyYCAgICxcblxuICAnbm90aWZpY2F0aW9ucy51c2VyLndlbGNvbWUnICAgICAgICAgICAgICAgICAgICAgOiBgQmllbnZlbnVlIHtuYW1lfWAsXG4gICdub3RpZmljYXRpb25zLnVzZXIubWFpbC1zZW50JyAgICAgICAgICAgICAgICAgICA6IGBVbiBlbWFpbCBhIMOpdMOpIGVudm95w6kgw6Age2VtYWlsfWAsXG4gICdub3RpZmljYXRpb25zLnF1b3RhdGlvbi5zYXZlZCcgICAgICAgICAgICAgICAgICA6IGBMZSBkZXZpcyBhIMOpdMOpIHNhdXZlZ2FyZMOpYCxcbiAgJ25vdGlmaWNhdGlvbnMucXVvdGF0aW9uLmVycm9yJyAgICAgICAgICAgICAgICAgIDogYFVuZSBlcnJldXIgZXN0IHN1cnZlbnVlIGxvcnMgZGUgbGEgc2F1dmVnYXJkZWAsXG4gICdub3RpZmljYXRpb25zLnF1b3RhdGlvbi5jcmVhdGUtaW52b2ljZS5zdWNjZXNzJyA6IGBGYWN0dXJlIGNyw6nDqWVgLFxuICAnbm90aWZpY2F0aW9ucy5xdW90YXRpb24uY3JlYXRlLWludm9pY2UuZXJyb3InICAgOiBgVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSBjcsOpYXRpb24gZGUgbGEgZmFjdHVyZWAsXG4gICdub3RpZmljYXRpb25zLmludm9pY2Uuc2F2ZWQnICAgICAgICAgICAgICAgICAgICA6IGBMYSBmYWN0dXJlIGEgw6l0w6kgc2F1dmVnYXJkw6lgLFxuICAnbm90aWZpY2F0aW9ucy5pbnZvaWNlLmVycm9yJyAgICAgICAgICAgICAgICAgICAgOiBgVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlYCxcbiAgJ25vdGlmaWNhdGlvbnMuY3VzdG9tZXIuc2F2ZWQnICAgICAgICAgICAgICAgICAgIDogYExlIGNsaWVudCBhIMOpdMOpIHNhdXZlZ2FyZMOpYCxcbiAgJ25vdGlmaWNhdGlvbnMuZ2VuZXJpYy5zYXZlZCcgICAgICAgICAgICAgICAgICAgIDogYGVucmVnaXN0cmVtZW50IGVmZmVjdHXDqWAsXG4gICdub3RpZmljYXRpb25zLmdlbmVyaWMuZXJyb3InICAgICAgICAgICAgICAgICAgICA6IGDigKIgdW5lIGVycmV1ciBlc3Qgc3VydmVudWUg4oCiYCxcblxuICAncGFnZS5ob21lJyAgICAgICAgICAgICAgICAgIDogYGFjY3VlaWxgICxcbiAgJ3BhZ2UucXVvdGF0aW9ucycgICAgICAgICAgICA6IGBkZXZpc2AgLFxuICAncGFnZS5xdW90YXRpb25zLm5ldycgICAgICAgIDogYG5vdXZlYXUgZGV2aXNgICxcbiAgJ3BhZ2UucXVvdGF0aW9ucy5lZGl0JyAgICAgICA6IGBkZXZpcyDigJMge3JlZmVyZW5jZX1gICxcbiAgJ3BhZ2UucXVvdGF0aW9ucy5wcmV2aWV3JyAgICA6IGBkZXZpcyDigJMge3JlZmVyZW5jZX1gICxcbiAgJ3BhZ2UuaW52b2ljZXMnICAgICAgICAgICAgICA6IGBmYWN0dXJlc2AgLFxuICAncGFnZS5pbnZvaWNlcy5lZGl0JyAgICAgICAgIDogYGZhY3R1cmUg4oCTwqB7cmVmZXJlbmNlfWAgLFxuICAncGFnZS5pbnZvaWNlcy5wcmV2aWV3JyAgICAgIDogYGZhY3R1cmUg4oCTIHtyZWZlcmVuY2V9YCAsXG4gICdwYWdlLmN1c3RvbWVycycgICAgICAgICAgICAgOiBgY2xpZW50c2AgLFxuICAncGFnZS5jdXN0b21lcnMubmV3JyAgICAgICAgIDogYG5vdXZlYXUgY2xpZW50YCAsXG4gICdwYWdlLmN1c3RvbWVycy5lZGl0JyAgICAgICAgOiBgY2xpZW50IDoge25hbWV9YCAsXG4gICdwYWdlLnNldHRpbmdzJyAgICAgICAgICAgICAgOiBgY29uZmlndXJhdGlvbmAgLFxuICAncGFnZS5jb25uZWN0ZWQnICAgICAgICAgICAgIDogYGNvbm5lY3TDqSBlbiB0YW50IHF1ZSA6PGJyLz57ZW1haWx9YCAsXG4gICdwYWdlLmxvZ291dCcgICAgICAgICAgICAgICAgOiBgZMOpY29ubmV4aW9uYCAsXG4gICdwYWdlLmxvZ2luJyAgICAgICAgICAgICAgICAgOiBgY29ubmV4aW9uYCAsXG4gICdwYWdlLnJlZ2lzdGVyJyAgICAgICAgICAgICAgOiBgZW5yZWdpc3RyZW1lbnRgICxcbiAgJ3BhZ2UuZm9yZ290JyAgICAgICAgICAgICAgICA6IGBtb3QgZGUgcGFzc2Ugb3VibGnDqWAgLFxuICAncGFnZS5lcnJvcicgICAgICAgICAgICAgICAgIDogYFVuZSBlcnJldXIgZXN0IHN1cnZlbnVlYCAsXG4gICdwYWdlLmVycm9yLnByb2R1Y3Rpb24taGludCcgOiBgZXNzYXlleiBkZSByZWNoYXJnZXIgbGEgcGFnZWAgLFxuICAncGFnZS5hcmNoaXZlZCcgICAgICAgICAgICAgIDogYGFyY2hpdmVzYCAsXG5cbiAgJ3BhcGVyLXNoZWV0LnJlZmVyZW5jZS5xdW90YXRpb24nICAgOiBgRGV2aXNgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYXBlci1zaGVldC5yZWZlcmVuY2UuaW52b2ljZScgICAgIDogYEZhY3R1cmVgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFwZXItc2hlZXQucmVmZXJlbmNlLmRhdGUnICAgICAgICA6IGBkYXRlIDogYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5LmZyb20nICAgICAgICAgICAgOiBgw4ltZXR0ZXVyIDpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFwZXItc2hlZXQucGFydHkudG8nICAgICAgICAgICAgICA6IGBBZHJlc3PDqSDDoCA6YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFwZXItc2hlZXQucGFydHkubm8tbmFtZS5mcm9tJyAgICA6IGBkw6lmaW5pc3NleiB2b3RyZSBub20gZGFucyBsZXMgcsOpZ2xhZ2VzYCAgICAgLFxuICAncGFwZXItc2hlZXQucGFydHkubm8tYWRkcmVzcy5mcm9tJyA6IGBkw6lmaW5pc3NleiB2b3RyZSBhZHJlc3NlIGRhbnMgbGVzIHLDqWdsYWdlc2AgLFxuICAncGFwZXItc2hlZXQucGFydHkubm8tbmFtZS50bycgICAgICA6IGBjbGllbnQgc2FucyBub21gICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLWFkZHJlc3MudG8nICAgOiBgY2xpZW50IHNhbnMgYWRyZXNzZWAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYXBlci1zaGVldC5zdWJqZWN0JyAgICAgICAgICAgICAgIDogYE9iamV0IDpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuXG4gICdwcm9kdWN0LnBsYWNlLWhvbGRlcic6IGB0YXBleiBwb3VyIGNyw6llciB1bmUgbm91dmVsbGUgbGlnbmVgLFxuXG4gICdxdW90YXRpb24uY3JlYXRlJyAgICAgICAgICAgOiBgY3LDqWVyYCAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5yZWFkeS10by1pbnZvaWNlJyA6IGBEZXZpcyBwcsOqdHMgcG91ciBmYWN0dXJhdGlvbmAgLFxuICAncXVvdGF0aW9uLmludm9pY2UuY3JlYXRlJyAgIDogYGNyw6llciBsYSBmYWN0dXJlYCAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uaW52b2ljZS5zaG93JyAgICAgOiBgdm9pciBsYSBmYWN0dXJlYCAgICAgICAgICAgICAgLFxuICAncXVvdGF0aW9uLmJ1dHRvbi5jcmVhdGUnICAgIDogYENyw6llciBsZSBkZXZpc2AgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uYnV0dG9uLnVwZGF0ZScgICAgOiBgTWV0dHJlIMOgIGpvdXIgbGUgZGV2aXNgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5idXR0b24uYXJjaGl2ZScgICA6IGBBcmNoaXZlcmAgICAgICAgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uYnV0dG9uLm5ldycgICAgICAgOiBgTm91dmVhdSBkZXZpc2AgICAgICAgICAgICAgICAgLFxuICAncXVvdGF0aW9uLmJ1dHRvbi5saXN0JyAgICAgIDogYGxpc3RlIGRlcyBkZXZpc2AgICAgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5idXR0b24ucHJldmlldycgICA6IGBwcsOpdmlzdWFsaXNlciBsZSBkZXZpc2AgICAgICAgLFxuXG4gICdzcGlubmVyLmxvYWRpbmcnICA6IGBjaGFyZ2VtZW504oCmYCxcblxuICAnc3RlcHBlci5zZW50JyAgICAgIDogYGVudm95w6kgbGUgOmAgLFxuICAnc3RlcHBlci52YWxpZGF0ZWQnIDogYHZhbGlkw6kgbGUgOmAgLFxuICAnc3RlcHBlci5zaWduZWQnICAgIDogYHNpZ27DqSBsZSA6YCAgLFxuICAnc3RlcHBlci5jdXN0b21lcicgIDogYGNsaWVudCA6YCAgICAsXG4gICdzdGVwcGVyLnRvdGFsJyAgICAgOiBgdG90YWwgOmAgICAgICxcblxuICAndGFibGUuaGVhZGVyLmlkJyAgICAgICAgICAgICAgICAgICA6IGAjYCAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5uYW1lJyAgICAgICAgICAgICAgICAgOiBgbm9tYCAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIuY3VzdG9tZXInICAgICAgICAgICAgIDogYGNsaWVudGAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLnN0YXR1cycgICAgICAgICAgICAgICA6IGBzdGF0dXRgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci50YXgnICAgICAgICAgICAgICAgICAgOiBgdGF4ZWAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIucXVvdGF0aW9uJyAgICAgICAgICAgIDogYGRldmlzYCAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLnF1b3RhdGlvbi1hc3NvY2lhdGVkJyA6IGBkZXZpcyBhc3NvY2nDqWAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIucXVvdGF0aW9ucycgICAgICAgICAgIDogYGRldmlzYCAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLmludm9pY2UnICAgICAgICAgICAgICA6IGBmYWN0dXJlYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5pbnZvaWNlcycgICAgICAgICAgICAgOiBgZmFjdHVyZXNgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIuZGVzY3JpcHRpb24nICAgICAgICAgIDogYGRlc2NyaXB0aW9uYCAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLnF1YW50aXR5JyAgICAgICAgICAgICA6IGBxdWFudGl0w6lgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIudW5pdC1wcmljZScgICAgICAgICAgIDogYHByaXggdW5pdGFpcmVgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLnNlbnQnICAgICAgICAgICAgICAgICA6IGBlbnZvecOpYCAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIudmFsaWRhdGVkJyAgICAgICAgICAgIDogYHZhbGlkw6lgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5zaWduZWQnICAgICAgICAgICAgICAgOiBgc2lnbsOpYCAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLmN1bXVsYXRpdmUtYW1vdW50JyAgICA6IGBtb250YW50IGN1bXVsw6lgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5hbW91bnQtaHQnICAgICAgICAgICAgICAgICAgIDogYG1vbnRhbnQgSFRgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuYW1vdW50LXRheGVzJyAgICAgICAgICAgICAgICA6IGB0YXhlc2AgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudCcgICAgICAgICAgICAgICAgICAgICAgOiBgdG90YWxgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5hbW91bnQucGFpZCcgICAgICAgICAgICAgICAgIDogYHBhecOpYCAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC5sZWZ0LXRvLXBheScgICAgICAgICAgOiBgcmVzdGVgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5lbXB0eScgICAgICAgICAgICAgICAgICAgICAgIDogYHZpZGUgKHBvdXIgbCdpbnN0YW50KWAgICAgICAgLFxuICAndGFibGUucGFnaW5hdGlvbicgICAgICAgICAgICAgICAgICA6IGB7c3RhcnR9IOKAkyB7ZW5kfSBzdXIge3RvdGFsfWAgLFxuICAndGFibGUucm93cy1wZXItcGFnZScgICAgICAgICAgICAgICA6IGBsaWduZXMgcGFyIHBhZ2UgOmAgICAgICAgICAgICxcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0ICAgTGF5b3V0Qm9hcmRpbmcgICAgIGZyb20gJy4vbGF5b3V0L2JvYXJkaW5nJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmZ1bmN0aW9uIEVycm9yU3RhY2soIHByb3BzICkge1xuICBjb25zdCB7IGVycm9yLCBlcnJvckluZm8gfSA9IHByb3BzXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnIH19PlxuICAgICAgeyBlcnJvciAmJiBlcnJvci50b1N0cmluZygpIH1cbiAgICAgIDxiciAvPlxuICAgICAgeyBlcnJvckluZm8uY29tcG9uZW50U3RhY2sgfVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGVycm9yICAgIDogbnVsbCxcbiAgICAgIGVycm9ySW5mbzogbnVsbCxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnREaWRDYXRjaChlcnJvciwgZXJyb3JJbmZvKSB7XG4gICAgLy8gQ2F0Y2ggZXJyb3JzIGluIGFueSBjb21wb25lbnRzIGJlbG93IGFuZCByZS1yZW5kZXIgd2l0aCBlcnJvciBtZXNzYWdlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBlcnJvciAgICAgOiBlcnJvciAsXG4gICAgICBlcnJvckluZm8gOiBlcnJvckluZm8sXG4gICAgfSlcbiAgICAvLyBZb3UgY2FuIGFsc28gbG9nIGVycm9yIG1lc3NhZ2VzIHRvIGFuIGVycm9yIHJlcG9ydGluZyBzZXJ2aWNlIGhlcmVcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGVycm9ySW5mbywgZXJyb3IgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvckluZm8pIHtcbiAgICAgIC8vIEVycm9yIHBhdGhcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxMYXlvdXRCb2FyZGluZ1xuICAgICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmVycm9yXCIgLz59XG4gICAgICAgID5cbiAgICAgICAgICB7IHByb2Nlc3MuZW52LklTX1BST0QgJiYgKFxuICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmVycm9yLnByb2R1Y3Rpb24taGludFwiIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7IHByb2Nlc3MuZW52LklTX0RFViAmJiAoXG4gICAgICAgICAgICA8RXJyb3JTdGFjayBlcnJvcj17ZXJyb3J9IGVycm9ySW5mbz17IGVycm9ySW5mbyB9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9MYXlvdXRCb2FyZGluZz5cbiAgICAgIClcbiAgICB9XG4gICAgLy8gTm9ybWFsbHksIGp1c3QgcmVuZGVyIGNoaWxkcmVuXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgfVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBIZWxtZXQgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAnLi9ib2FyZGluZy5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBib2FyZGluZ2BcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGF5b3V0Qm9hcmRpbmcoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxtYWluIHJvbGU9XCJtYWluXCIgY2xhc3NOYW1lPXsgYCR7QkFTRV9DTEFTU31gIH0+XG4gICAgICA8SGVsbWV0PlxuICAgICAgICA8aHRtbCBjbGFzc05hbWU9XCJkYXJrLWJhY2tncm91bmRcIiAvPlxuICAgICAgPC9IZWxtZXQ+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IGAke0JBU0VfQ0xBU1N9X19jYXJkYCB9PlxuICAgICAgICB7IHByb3BzLnRpdGxlICYmICg8aDIgY2xhc3NOYW1lPXsgYCR7QkFTRV9DTEFTU31fX3RpdGxlYCB9Pntwcm9wcy50aXRsZX08L2gyPikgfVxuICAgICAgICA8ZGl2ICBjbGFzc05hbWU9eyBgJHtCQVNFX0NMQVNTfV9fY29udGVudGAgfT5cbiAgICAgICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5hdkxpbmsgICAgICAgICAgICwgd2l0aFJvdXRlciB9ICAgICAgICAgICBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSAgLCBGb3JtYXR0ZWRIVE1MTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAqIGFzIGFjY291bnQgZnJvbSAnLi4vZHVja3MvYWNjb3VudCdcblxuaW1wb3J0ICcuL21haW4uc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgbmF2LW1haW5gXG5jb25zdCBJVEVNX0NMQVNTID0gYCR7QkFTRV9DTEFTU31fX2l0ZW1gXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSBgaXMtYWN0aXZlYFxuXG5jbGFzcyBMb2dvdXRCdXR0b24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5sb2dvdXQgPSB0aGlzLmxvZ291dC5iaW5kKCB0aGlzIClcbiAgfVxuICBsb2dvdXQoIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5wcm9wcy5sb2dvdXQoIHt9IClcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxhIGhyZWY9XCIvYWNjb3VudC9sb2dvdXRcIiBvbkNsaWNrPXsgdGhpcy5sb2dvdXQgfT5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmxvZ291dFwiIC8+XG4gICAgICA8L2E+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIENvbm5lY3RlZE5hdiggcHJvcHMgKSAge1xuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxsaSBjbGFzc05hbWU9eyBJVEVNX0NMQVNTIH0+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL1wiIGV4YWN0IGFjdGl2ZUNsYXNzTmFtZT17IEFDVElWRV9DTEFTUyB9PlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicGFnZS5ob21lXCIgLz5cbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzc05hbWU9eyBJVEVNX0NMQVNTIH0+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL3F1b3RhdGlvbnNcIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UucXVvdGF0aW9uc1wiIC8+XG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3NOYW1lPXsgSVRFTV9DTEFTUyB9PlxuICAgICAgICA8TmF2TGluayB0bz1cIi9pbnZvaWNlc1wiIGFjdGl2ZUNsYXNzTmFtZT17IEFDVElWRV9DTEFTUyB9PlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicGFnZS5pbnZvaWNlc1wiIC8+XG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3NOYW1lPXsgSVRFTV9DTEFTUyB9PlxuICAgICAgICA8TmF2TGluayB0bz1cIi9jdXN0b21lcnNcIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UuY3VzdG9tZXJzXCIgLz5cbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzc05hbWU9eyBJVEVNX0NMQVNTIH0+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FyY2hpdmVzXCIgYWN0aXZlQ2xhc3NOYW1lPXsgQUNUSVZFX0NMQVNTIH0+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmFyY2hpdmVkXCIgLz5cbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzc05hbWU9eyBJVEVNX0NMQVNTIH0+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FjY291bnQvc2V0dGluZ3NcIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2Uuc2V0dGluZ3NcIiAvPlxuICAgICAgICA8L05hdkxpbms+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzTmFtZT17YCR7SVRFTV9DTEFTU30gJHtJVEVNX0NMQVNTfS0tc2VwYXJhdG9yYH0+XG4gICAgICAgIDxGb3JtYXR0ZWRIVE1MTWVzc2FnZVxuICAgICAgICAgIGlkPVwicGFnZS5jb25uZWN0ZWRcIlxuICAgICAgICAgIHZhbHVlcz17e2VtYWlsOiBwcm9wcy5lbWFpbH19IC8+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzTmFtZT17IElURU1fQ0xBU1MgfT5cbiAgICAgICAgPExvZ291dEJ1dHRvbiBsb2dvdXQ9eyBwcm9wcy5sb2dvdXR9IC8+XG4gICAgICA8L2xpPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gQ29ubmVjdGlvbk5hdiggcHJvcHMgKSB7XG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1tYWluX19pdGVtXCI+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FjY291bnQvbG9naW5cIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UubG9naW5cIiAvPlxuICAgICAgICA8L05hdkxpbms+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1tYWluX19pdGVtXCI+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FjY291bnQvcmVnaXN0ZXJcIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UucmVnaXN0ZXJcIiAvPlxuICAgICAgICA8L05hdkxpbms+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1tYWluX19pdGVtXCI+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FjY291bnQvZm9yZ290XCIgYWN0aXZlQ2xhc3NOYW1lPXsgQUNUSVZFX0NMQVNTIH0+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmZvcmdvdFwiIC8+XG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgIDwvbGk+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBNYWluTmF2KCBwcm9wcyApIHtcbiAgY29uc3QgeyBpc0F1dGhlbnRpY2F0ZWQgfSA9IHByb3BzXG4gIHJldHVybiAoXG4gICAgPG5hdiBjbGFzc05hbWU9e0JBU0VfQ0xBU1N9PlxuICAgICAgPHVsIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2luYH0+XG4gICAgICAgIHtcbiAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQgPyA8Q29ubmVjdGVkTmF2IHsuLi5wcm9wc30gLz5cbiAgICAgICAgICA6IDxDb25uZWN0aW9uTmF2IHsuLi5wcm9wc30gLz5cbiAgICAgICAgfVxuICAgICAgPC91bD5cbiAgICA8L25hdj5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wcyggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgaXNBdXRoZW50aWNhdGVkOiAgc3RhdGUuYWNjb3VudC5nZXQoIGBpc0F1dGhlbnRpY2F0ZWRgICksXG4gICAgZW1haWw6ICAgICAgICAgICAgc3RhdGUuYWNjb3VudC5nZXQoIGB1c2VyLmVtYWlsYCApLFxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoMnByb3BzKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgbG9nb3V0OiBhY2NvdW50LmxvZ291dCxcbiAgfSwgZGlzcGF0Y2gpXG59XG5cbi8vIHdpdGhSb3V0ZXIgaXMgbmVlZGVkIGZvciB0aGUgPE5hdkxpbms+IHRvIGNhdGNoLXVwIHJvdXRlIGNoYW5nZXNcbi8vIOKAoiBodHRwczovL3JlYWN0dHJhaW5pbmcuY29tL3JlYWN0LXJvdXRlci93ZWIvYXBpL3dpdGhSb3V0ZXJcbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoIGNvbm5lY3QoIHN0YXRlMnByb3BzLCBkaXNwYXRjaDJwcm9wcyApKCBNYWluTmF2ICkgKVxuIiwiaW1wb3J0IGNyaW8gZnJvbSAnY3JpbydcblxuaW1wb3J0IGNyZWF0ZUFjdGlvbk5hbWVzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWFjdGlvbi1uYW1lcydcbmltcG9ydCBmZXRjaERpc3BhdGNoIGZyb20gJy4vdXRpbHMvZmV0Y2gtZGlzcGF0Y2gnXG5cbmNvbnN0IE5BTUUgPSBgYWNjb3VudGBcblxuZXhwb3J0IGNvbnN0IEFVVEggICAgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAgLCBgYXV0aGAgICAgICAgICApXG5leHBvcnQgY29uc3QgU1RBVElTVElDUyAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBzdGF0aXN0aWNzYCAgIClcbmV4cG9ydCBjb25zdCBMT0dJTiAgICAgICAgPSBjcmVhdGVBY3Rpb25OYW1lcyggTkFNRSwgYHBvc3RgICwgYGxvZ2luYCAgICAgICAgKVxuZXhwb3J0IGNvbnN0IEZPUkdPVCAgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAgLCBgZm9yZ290YCAgICAgICApXG5leHBvcnQgY29uc3QgU0VUX1BBU1NXT1JEID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBzZXQtcGFzc3dvcmRgIClcbmV4cG9ydCBjb25zdCBSRVNFVCAgICAgICAgPSBjcmVhdGVBY3Rpb25OYW1lcyggTkFNRSwgYHBvc3RgICwgYHJlc2V0YCAgICAgICAgKVxuZXhwb3J0IGNvbnN0IExPR09VVCAgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAgLCBgbG9nb3V0YCAgICAgICApXG5leHBvcnQgY29uc3QgUkVHSVNURVIgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGByZWdpc3RlcmAgICAgIClcbmV4cG9ydCBjb25zdCBVUERBVEUgICAgICAgPSBjcmVhdGVBY3Rpb25OYW1lcyggTkFNRSwgYHBvc3RgICwgYG9uZWAgICAgICAgICAgKVxuXG5jb25zdCBpbml0aWFsU3RhdGUgPSBjcmlvKHtcbiAgaXNTYXZpbmcgICAgICAgIDogZmFsc2UsXG4gIGlzQXV0aGVudGljYXRlZCA6IGZhbHNlLFxuICB1c2VyICAgICAgICAgICAgOiB7fSAgICxcbiAgc3RhdGlzdGljcyAgICAgIDoge30gICAsXG59KVxuXG4vLy8vLy9cbi8vIFJFRFVDRVJcbi8vLy8vL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWR1Y2VyKCBzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uICkge1xuICBjb25zdCB7IHR5cGUsIHBheWxvYWQgfSA9IGFjdGlvblxuXG4gIHN3aXRjaCAoIHR5cGUgKSB7XG5cbiAgICBjYXNlIEFVVEguU1VDQ0VTUzpcbiAgICBjYXNlIExPR0lOLlNVQ0NFU1M6XG4gICAgY2FzZSBTRVRfUEFTU1dPUkQuU1VDQ0VTUzpcbiAgICBjYXNlIFJFU0VULlNVQ0NFU1M6XG4gICAgICBzdGF0ZSA9IHN0YXRlLnNldCggYGlzQXV0aGVudGljYXRlZGAsIHRydWUgKVxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYHVzZXJgLCBwYXlsb2FkLnVzZXIgKVxuXG4gICAgY2FzZSBBVVRILkVSUk9SOlxuICAgIGNhc2UgTE9HT1VULlNVQ0NFU1M6XG4gICAgICBzdGF0ZSA9IHN0YXRlLnNldCggYGlzQXV0aGVudGljYXRlZGAsIGZhbHNlIClcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGB1c2VyYCwge30gKVxuXG4gICAgY2FzZSBTVEFUSVNUSUNTLlNVQ0NFU1M6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgc3RhdGlzdGljc2AsIHBheWxvYWQgKVxuXG4gICAgY2FzZSBVUERBVEUuTE9BRElORzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGBpc1NhdmluZ2AsIHRydWUgKVxuICAgIGNhc2UgVVBEQVRFLkRPTkU6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgaXNTYXZpbmdgLCBmYWxzZSApXG4gICAgY2FzZSBVUERBVEUuU1VDQ0VTUzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGB1c2VyYCwgcGF5bG9hZC51c2VyIClcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vLy8vLy9cbi8vIEFDVElPTiBDUkVBVE9SU1xuLy8vLy8vXG5cbmV4cG9ydCBjb25zdCBhdXRoID0gKHBhcmFtcywgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgLyR7IE5BTUUgfS9hdXRoYCxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgQVVUSCxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHN0YXRpc3RpY3MgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAvJHsgTkFNRSB9L3N0YXRpc3RpY3NgLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBTVEFUSVNUSUNTLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgbG9naW4gPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAvJHsgTkFNRSB9L2xvZ2luYCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBMT0dJTixcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGxvZ291dCA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYC8keyBOQU1FIH0vbG9nb3V0YCxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgTE9HT1VULFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXIgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAvJHsgTkFNRSB9L3JlZ2lzdGVyYCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBSRUdJU1RFUixcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGZvcmdvdCA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGJvZHkgfSA9IHBhcmFtc1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYC8keyBOQU1FIH0vZm9yZ290YCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBGT1JHT1QsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzZXRQYXNzd29yZCA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGJvZHkgfSA9IHBhcmFtc1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYC8keyBOQU1FIH0vc2V0LXBhc3N3b3JkYCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBTRVRfUEFTU1dPUkQsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCByZXNldCA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGJvZHkgfSA9IHBhcmFtc1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYC8keyBOQU1FIH0vcmVzZXRgLFxuICAgIGJvZHksXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgYWN0aW9uczogIFJFU0VULFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlU2V0dGluZ3MgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAke05BTUV9L3NldHRpbmdzYCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBVUERBVEUsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcmlvXCIpOyIsImltcG9ydCBjcmlvIGZyb20gJ2NyaW8nXG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vaXNvbW9ycGhpYy1jb25maWcnXG5cbmNvbnN0IEFQUF9QUkVGSVggPSBgQCR7Y29uZmlnLkFQUF9OQU1FfWBcblxuY29uc3QgcHJlZml4ZXMgPSBjcmlvKHtcbiAgbG9hZGluZzogIGBsb2FkaW5nYCxcbiAgZG9uZTogICAgIGBkb25lYCxcbiAgc3VjY2VzczogIGBzdWNjZXNzYCxcbiAgZXJyb3I6ICAgIGBlcnJvcmAsXG59KVxuXG4vLyBTbWFsbCB1dGlsaXR5IHRvIGdlbmVyYXRlIG11bHRpcGxlIGRpc3BhdGNoZXMgdHlwZVxuLy8g4oCiIGFsd2F5cyBnZXQgYSDigJwvbG9hZGluZ+KAnSBhbmQg4oCdL2RvbmXigJ1cbi8vIOKAoiBnZXQgb24gb2Yg4oCcL3N1Y2Nlc3PigJ0gb3Ig4oCcL2Vycm9y4oCdIGRlcGVuZGluZyBvbiB0aGUgZmV0Y2ggcmVzdWx0XG4vLyBUaGlzIGNvdWxkIGhhdmUgYmVlbiBoYW5kbGVkIGJ5IGEgbWlkZGxld2FyZSB0b29cbi8vIOKAoiBodHRwczovL2dpdGh1Yi5jb20vcGJ1cnRjaGFlbGwvcmVkdXgtcHJvbWlzZS1taWRkbGV3YXJlXG4vLyDigKIgYnV0IEkgd2FudCB0byBrZWVwIGFzIG11Y2ggYXMgSSBjYW4gYXdheSBmcm9tIGxpYnJhcmllc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVBY3Rpb25OYW1lcyggZG9tYWluLCBtZXRob2QsIG5hbWUgKSB7XG4gIGNvbnN0IF9tZXRob2QgPSBtZXRob2QgPyBgLyR7IG1ldGhvZCB9YCA6IGBgXG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiAgbWV0aG9kLFxuICAgIExPQURJTkc6IGAkeyBBUFBfUFJFRklYIH0vJHsgZG9tYWluIH0keyBfbWV0aG9kIH0vJHsgbmFtZSB9LyR7IHByZWZpeGVzLmxvYWRpbmcgfWAsXG4gICAgRE9ORTogICAgYCR7IEFQUF9QUkVGSVggfS8keyBkb21haW4gfSR7IF9tZXRob2QgfS8keyBuYW1lIH0vJHsgcHJlZml4ZXMuZG9uZSB9YCxcbiAgICBTVUNDRVNTOiBgJHsgQVBQX1BSRUZJWCB9LyR7IGRvbWFpbiB9JHsgX21ldGhvZCB9LyR7IG5hbWUgfS8keyBwcmVmaXhlcy5zdWNjZXNzIH1gLFxuICAgIEVSUk9SOiAgIGAkeyBBUFBfUFJFRklYIH0vJHsgZG9tYWluIH0keyBfbWV0aG9kIH0vJHsgbmFtZSB9LyR7IHByZWZpeGVzLmVycm9yIH1gLFxuICB9XG59XG4iLCJpbXBvcnQgY3JpbyBmcm9tICdjcmlvJ1xuaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC5tZXJnZSdcblxuaW1wb3J0ICogYXMgaXNvRmV0Y2ggZnJvbSAnLi4vLi4vaXNvLWZldGNoJ1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBmZXRjaERpc3BhdGNoKCBwYXJhbXMgKSB7XG4gIGNvbnN0IHsgZGlzcGF0Y2gsIGZldGNoLCBhY3Rpb25zLCBtZXRhID0ge30gfSA9IHBhcmFtc1xuICBjb25zdCB7IG9wdGlvbnMsIGNvb2tpZSB9ID0gZmV0Y2hcbiAgY29uc3QgeyBtZXRob2QgPSBgZ2V0YCB9ID0gYWN0aW9uc1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogICBhY3Rpb25zLkxPQURJTkcsXG4gICAgcGF5bG9hZDoge1xuICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICB9LFxuICB9KVxuICB0cnkge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYXdhaXQgaXNvRmV0Y2hbIG1ldGhvZCBdKCBvcHRpb25zLCBjb29raWUgKVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICAgICBhY3Rpb25zLkRPTkUsXG4gICAgICBtZXRhLFxuICAgICAgcGF5bG9hZDogIHt9XG4gICAgfSlcbiAgICBpZiAoIHBheWxvYWQuZXJyb3IgKSAge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAgICAgYWN0aW9ucy5FUlJPUixcbiAgICAgICAgbWV0YTogICAgIG1lcmdlKCB7IF9mZXRjaERpc3BhdGNoRXJyb3JUeXBlOiBgUkVTUE9OU0VfRVJST1JgIH0sIG1ldGEgKSxcbiAgICAgICAgZXJyb3I6ICAgIHRydWUsXG4gICAgICAgIHBheWxvYWQ6ICBwYXlsb2FkLFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAgICAgYWN0aW9ucy5TVUNDRVNTLFxuICAgICAgICBtZXRhLFxuICAgICAgICBwYXlsb2FkOiAgcGF5bG9hZCxcbiAgICAgIH0pXG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAgICAgYWN0aW9ucy5ET05FLFxuICAgICAgbWV0YSxcbiAgICAgIHBheWxvYWQ6ICB7fVxuICAgIH0pXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogICAgIGFjdGlvbnMuRVJST1IsXG4gICAgICBtZXRhOiAgICAgbWVyZ2UoIHsgX2ZldGNoRGlzcGF0Y2hFcnJvclR5cGU6IGBGRVRDSF9FUlJPUmAgfSwgbWV0YSApLFxuICAgICAgZXJyb3I6ICAgIHRydWUsXG4gICAgICBwYXlsb2FkOiAgZXJyLFxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICAgICAgTm90aWZpY2F0aW9uICBmcm9tICcuL2l0ZW0nXG5pbXBvcnQgKiBhcyBub3RpZmljYXRpb25zIGZyb20gJy4uL2R1Y2tzL25vdGlmaWNhdGlvbnMnXG5pbXBvcnQgJy4vbGlzdC5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBub3RpZmljYXRpb25zYFxuY29uc3QgTk9USUZJQ0FUSU9OX0xJRkVUSU1FID0gNTAwMFxuXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zKCBwcm9wcyApIHtcbiAgY29uc3QgeyBub3RpZmljYXRpb25zLCBoYXNOb3RpZmljYXRpb25zIH0gPSBwcm9wc1xuXG4gIGlmICggIWhhc05vdGlmaWNhdGlvbnMgKSByZXR1cm4gbnVsbFxuICByZXR1cm4gKFxuICAgIDxhc2lkZSBjbGFzc05hbWU9eyBCQVNFX0NMQVNTIH0+e1xuICAgICAgbm90aWZpY2F0aW9ucy5tYXAoIG4gPT4gKFxuICAgICAgICA8Tm90aWZpY2F0aW9uXG4gICAgICAgICAga2V5PXsgbi5faWQgfVxuICAgICAgICAgIGhhbmRsZVJlbW92ZT17IHByb3BzLmhhbmRsZVJlbW92ZSB9XG4gICAgICAgICAgbm90aWZpY2F0aW9uPXsgbiB9XG4gICAgICAgIC8+XG4gICAgICApKVxuICAgIH08L2FzaWRlPlxuICApXG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3AoIHN0YXRlICkge1xuICBjb25zdCB7IG5vdGlmaWNhdGlvbnMgfSA9IHN0YXRlXG4gIGNvbnN0IGhhc05vdGlmaWNhdGlvbnMgPSBBcnJheS5pc0FycmF5KCBub3RpZmljYXRpb25zICkgJiYgbm90aWZpY2F0aW9ucy5sZW5ndGggPiAwXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBoYXNOb3RpZmljYXRpb25zLFxuICAgIG5vdGlmaWNhdGlvbnMsXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBkaXNwYXRjaDJwcm9wID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVSZW1vdmU6IG5vdGlmaWNhdGlvbnMucmVtb3ZlT25lXG4gIH0sIGRpc3BhdGNoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wLCBkaXNwYXRjaDJwcm9wICkoIE5vdGlmaWNhdGlvbnMgKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAnLi9pdGVtLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTID0gYG5vdGlmaWNhdGlvbmBcblxuY29uc3QgTk9USUZJQ0FUSU9OX0xJRkVUSU1FID0gNTAwMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzLm5vdGlmaWNhdGlvblxuICAgIGNvbnN0IHR5cGUgPSBlcnJvciA/IGBlcnJvcmAgOiBgaW5mb3JtYXRpb25gXG5cbiAgICB0aGlzLnN0YXRlID0geyB0eXBlIH1cbiAgICB0aGlzLmF1dG9SZW1vdmUgPSB0aGlzLmF1dG9SZW1vdmUuYmluZCggdGhpcyApXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IG5vdGlmaWNhdGlvbiwgaGFuZGxlUmVtb3ZlIH0gPSB0aGlzLnByb3BzXG4gICAgdGhpcy50aW1lcklkID0gc2V0VGltZW91dCggdGhpcy5hdXRvUmVtb3ZlLCBOT1RJRklDQVRJT05fTElGRVRJTUUgKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy50aW1lcklkICYmIGNsZWFyVGltZW91dCggdGhpcy50aW1lcklkIClcbiAgICB0aGlzLnRpbWVySWQgPSBmYWxzZVxuICB9XG5cbiAgYXV0b1JlbW92ZSggKSB7XG4gICAgY29uc3QgeyBub3RpZmljYXRpb24sIGhhbmRsZVJlbW92ZSB9ID0gdGhpcy5wcm9wc1xuICAgIGhhbmRsZVJlbW92ZSggbm90aWZpY2F0aW9uIClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG5vdGlmaWNhdGlvbiwgaGFuZGxlUmVtb3ZlIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyBpMThuSWQsIF9pZCwgYWRkaXRpb25hbENvbnRlbnQsIC4uLnZhbHVlcyB9ID0gbm90aWZpY2F0aW9uXG4gICAgY29uc3QgeyB0eXBlIH0gPSB0aGlzLnN0YXRlXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgb25DbGljaz17IGUgPT4gaGFuZGxlUmVtb3ZlKCBub3RpZmljYXRpb24gKSB9XG4gICAgICAgIGNsYXNzTmFtZT17IGAkeyBCQVNFX0NMQVNTIH0gJHsgQkFTRV9DTEFTUyB9LS0keyB0eXBlIH1gIH1cbiAgICAgID5cbiAgICAgICAgPGg0IGNsYXNzTmFtZT17YCR7IEJBU0VfQ0xBU1MgfV9fdGl0bGVgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17IGkxOG5JZCB9IHZhbHVlcz17IHZhbHVlcyB9IC8+XG4gICAgICAgIDwvaDQ+XG4gICAgICAgIHsgYWRkaXRpb25hbENvbnRlbnQgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHsgQkFTRV9DTEFTUyB9X19jb250ZW50YH0gPlxuICAgICAgICAgICAgeyBhZGRpdGlvbmFsQ29udGVudCB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCBjcmlvICAgIGZyb20gJ2NyaW8nXG5pbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJ1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2lzb21vcnBoaWMtY29uZmlnJ1xuaW1wb3J0IGNyZWF0ZUFjdGlvbk5hbWVzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWFjdGlvbi1uYW1lcydcblxuaW1wb3J0IHtcbiAgR0VUX09ORSAgICAgICAgYXMgUVVPVEFUSU9OX0dFVF9PTkUgICAgICAgLFxuICBTQVZFX09ORSAgICAgICBhcyBRVU9UQVRJT05fU0FWRV9PTkUgICAgICAsXG4gIENSRUFURV9JTlZPSUNFIGFzIFFVT1RBVElPTl9DUkVBVEVfSU5WT0lDRSxcbn0gZnJvbSAnLi9xdW90YXRpb25zJ1xuaW1wb3J0IHtcbiAgR0VUX09ORSAgYXMgSU5WT0lDRV9HRVRfT05FLFxuICBTQVZFX09ORSBhcyBJTlZPSUNFX1NBVkVfT05FLFxufSBmcm9tICcuL2ludm9pY2VzJ1xuaW1wb3J0IHtcbiAgR0VUX09ORSAgYXMgQ1VTVE9NRVJfR0VUX09ORSxcbiAgU0FWRV9PTkUgYXMgQ1VTVE9NRVJfU0FWRV9PTkUsXG59IGZyb20gJy4vY3VzdG9tZXJzJ1xuaW1wb3J0IHtcbiAgQVVUSCAgICAgYXMgQUNDT1VOVF9BVVRILFxuICBMT0dJTiAgICBhcyBBQ0NPVU5UX0xPR0lOLFxuICBGT1JHT1QgICBhcyBBQ0NPVU5UX0ZPUkdPVCxcbiAgUkVTRVQgICAgYXMgQUNDT1VOVF9SRVNFVCxcbiAgTE9HT1VUICAgYXMgQUNDT1VOVF9MT0dPVVQsXG4gIFJFR0lTVEVSIGFzIEFDQ09VTlRfUkVHSVNURVIsXG4gIFVQREFURSAgIGFzIEFDQ09VTlRfVVBEQVRFLFxufSBmcm9tICcuL2FjY291bnQnXG5cbmNvbnN0IE5BTUUgPSBgbm90aWZpY2F0aW9uc2BcbmV4cG9ydCBjb25zdCBSRU1PVkUgICAgID0gYEAke2NvbmZpZy5BUFBfTkFNRX0vJHtOQU1FfS9yZW1vdmVgXG5leHBvcnQgY29uc3QgQUxMX1BPU1QgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBgW19hLXpBLVowLTldK2AsIGBwb3N0YCwgYFtfYS16QS1aMC05XStgIClcbmNvbnN0IHBvc3RTdWNjZXNzUmVnZXhwID0gbmV3IFJlZ0V4cCggYF4keyBBTExfUE9TVC5TVUNDRVNTIH0kYCApXG5jb25zdCBwb3N0RXJyb3JSZWdleHAgICA9IG5ldyBSZWdFeHAoIGBeJHsgQUxMX1BPU1QuRVJST1IgfSRgIClcblxuY29uc3QgaW5pdGlhbFN0YXRlID0gY3JpbyggW10gKVxuXG5mdW5jdGlvbiBub3RpZnlTdWNjZXNzKCBzdGF0ZSwgaTE4bklkLCB2YWx1ZXMgPSB7fSApIHtcbiAgcmV0dXJuIHN0YXRlLnB1c2goe1xuICAgIF9pZDogc2hvcnRpZCgpLFxuICAgIGkxOG5JZCxcbiAgICAuLi52YWx1ZXNcbiAgfSlcbn1cblxuZnVuY3Rpb24gbm90aWZ5RXJyb3IoIHN0YXRlLCBpMThuSWQsIHZhbHVlcyA9IHt9ICkge1xuICByZXR1cm4gc3RhdGUucHVzaCh7XG4gICAgX2lkOiBzaG9ydGlkKCksXG4gICAgZXJyb3I6IHRydWUsXG4gICAgaTE4bklkLFxuICAgIC4uLnZhbHVlc1xuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWR1Y2VyKCBzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uICkge1xuICBjb25zdCB7IHR5cGUsIHBheWxvYWQsIGVycm9yIH0gPSBhY3Rpb25cblxuICBpZiAoIHBvc3RFcnJvclJlZ2V4cC50ZXN0KCB0eXBlICkgKSB7XG4gICAgY29uc29sZS5lcnJvciggYGVycm9yYCApXG4gICAgY29uc29sZS5sb2coIHBheWxvYWQgKVxuICB9XG5cbiAgc3dpdGNoICggdHlwZSApIHtcbiAgICBjYXNlIFJFTU9WRToge1xuICAgICAgY29uc3QgaW5kZXggPSBzdGF0ZS5pbmRleE9mKCBwYXlsb2FkIClcbiAgICAgIHJldHVybiBzdGF0ZS5zcGxpY2UoIGluZGV4LCAxIClcbiAgICB9XG4gICAgLy8tLS0tLSBVU0VSXG4gICAgY2FzZSBBQ0NPVU5UX0xPR0lOLlNVQ0NFU1M6XG4gICAgY2FzZSBBQ0NPVU5UX1JFU0VULlNVQ0NFU1M6IHtcbiAgICAgIGNvbnN0IHsgdXNlciB9ID0gcGF5bG9hZFxuICAgICAgY29uc3QgbmFtZSA9IHVzZXIubmFtZSB8fCB1c2VyLmVtYWlsXG4gICAgICByZXR1cm4gbm90aWZ5U3VjY2Vzcyggc3RhdGUsIGBub3RpZmljYXRpb25zLnVzZXIud2VsY29tZWAsIHsgbmFtZSB9IClcbiAgICB9XG4gICAgY2FzZSBBQ0NPVU5UX1JFR0lTVEVSLlNVQ0NFU1M6XG4gICAgY2FzZSBBQ0NPVU5UX0ZPUkdPVC5TVUNDRVNTOiB7XG4gICAgICBjb25zdCB7IGVtYWlsIH0gPSBwYXlsb2FkXG4gICAgICByZXR1cm4gbm90aWZ5U3VjY2Vzcyggc3RhdGUsIGBub3RpZmljYXRpb25zLnVzZXIubWFpbC1zZW50YCwgeyBlbWFpbCB9IClcbiAgICB9XG4gICAgLy8tLS0tLSBRVU9UQVRJT05TXG4gICAgY2FzZSBRVU9UQVRJT05fU0FWRV9PTkUuU1VDQ0VTUzoge1xuICAgICAgcmV0dXJuIG5vdGlmeVN1Y2Nlc3MoIHN0YXRlLCBgbm90aWZpY2F0aW9ucy5xdW90YXRpb24uc2F2ZWRgIClcbiAgICB9XG4gICAgY2FzZSBRVU9UQVRJT05fU0FWRV9PTkUuRVJST1I6IHtcbiAgICAgIHJldHVybiBub3RpZnlFcnJvciggc3RhdGUsIGBub3RpZmljYXRpb25zLnF1b3RhdGlvbi5lcnJvcmAgKVxuICAgIH1cbiAgICBjYXNlIFFVT1RBVElPTl9DUkVBVEVfSU5WT0lDRS5TVUNDRVNTOiB7XG4gICAgICByZXR1cm4gbm90aWZ5U3VjY2Vzcyggc3RhdGUsIGBub3RpZmljYXRpb25zLnF1b3RhdGlvbi5jcmVhdGUtaW52b2ljZS5zdWNjZXNzYCApXG4gICAgfVxuICAgIGNhc2UgUVVPVEFUSU9OX0NSRUFURV9JTlZPSUNFLlNVQ0NFU1M6IHtcbiAgICAgIHJldHVybiBub3RpZnlFcnJvciggc3RhdGUsIGBub3RpZmljYXRpb25zLnF1b3RhdGlvbi5jcmVhdGUtaW52b2ljZS5lcnJvcmAgKVxuICAgIH1cbiAgICAvLy0tLS0tIElOVk9JQ0VTXG4gICAgY2FzZSBJTlZPSUNFX1NBVkVfT05FLlNVQ0NFU1M6IHtcbiAgICAgIHJldHVybiBub3RpZnlTdWNjZXNzKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMuaW52b2ljZS5zYXZlZGAgKVxuICAgIH1cbiAgICBjYXNlIElOVk9JQ0VfU0FWRV9PTkUuRVJST1I6IHtcbiAgICAgIHJldHVybiBub3RpZnlFcnJvciggc3RhdGUsIGBub3RpZmljYXRpb25zLmludm9pY2UuZXJyb3JgIClcbiAgICB9XG4gICAgLy8tLS0tLSBDVVNUT01FUlNcbiAgICBjYXNlIENVU1RPTUVSX1NBVkVfT05FLlNVQ0NFU1M6IHtcbiAgICAgIHJldHVybiBub3RpZnlTdWNjZXNzKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMuY3VzdG9tZXIuc2F2ZWRgIClcbiAgICB9XG4gICAgY2FzZSBDVVNUT01FUl9TQVZFX09ORS5FUlJPUjoge1xuICAgICAgcmV0dXJuIG5vdGlmeUVycm9yKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMuY3VzdG9tZXIuZXJyb3JgLCB7XG4gICAgICAgIGFkZGl0aW9uYWxDb250ZW50OiBwYXlsb2FkLm1lc3NhZ2UsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICAvLy0tLS0tIENBVENIIEFMTFxuICAvLyDigKIgaWYgbm8gY3VzdG9tIG5vdGlmaWNhdGlvbiBoYXMgYmVlbiBoYW5kbGVkLCBtYWtlIGEgZ2VuZXJhbCBvbmVcbiAgaWYgKCBwb3N0RXJyb3JSZWdleHAudGVzdCggdHlwZSApICkge1xuICAgIHJldHVybiBub3RpZnlFcnJvciggc3RhdGUsICdub3RpZmljYXRpb25zLmdlbmVyaWMuZXJyb3InLCB7XG4gICAgICBhZGRpdGlvbmFsQ29udGVudDogcGF5bG9hZC5tZXNzYWdlLFxuICAgIH0gKVxuICB9XG4gIGlmICggcG9zdFN1Y2Nlc3NSZWdleHAudGVzdCggdHlwZSApICkge1xuICAgIHJldHVybiBub3RpZnlTdWNjZXNzKCBzdGF0ZSwgJ25vdGlmaWNhdGlvbnMuZ2VuZXJpYy5zYXZlZCcgKVxuICB9XG5cbiAgcmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVPbmUgPSBwYXJhbXMgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogICAgIFJFTU9WRSxcbiAgICBwYXlsb2FkOiAgcGFyYW1zLFxuICB9KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2hvcnRpZFwiKTsiLCJpbXBvcnQgY3JpbyBmcm9tICdjcmlvJ1xuaW1wb3J0IGlzTmlsIGZyb20gJ2xvZGFzaC5pc25pbCdcblxuaW1wb3J0IGNyZWF0ZUFjdGlvbk5hbWVzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWFjdGlvbi1uYW1lcydcbmltcG9ydCBmZXRjaERpc3BhdGNoIGZyb20gJy4vdXRpbHMvZmV0Y2gtZGlzcGF0Y2gnXG5cbmNvbnN0IE5BTUUgPSBgcXVvdGF0aW9uc2BcbmV4cG9ydCBjb25zdCBMSVNUX0FDVElWRSAgICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWFjdGl2ZWAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBMSVNUX0FSQ0hJVkVEICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWFyY2hpdmVkYCAgICAgICAgIClcbmV4cG9ydCBjb25zdCBMSVNUX0dFVF9SRUFEWV9JTlZPSUNFID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LXJlYWR5LXRvLWludm9pY2VgIClcbmV4cG9ydCBjb25zdCBMSVNUX0ZPUl9DVVNUT01FUiAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWZvci1jdXN0b21lcmAgICAgIClcbmV4cG9ydCBjb25zdCBHRVRfT05FICAgICAgICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBvbmVgICAgICAgICAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBTQVZFX09ORSAgICAgICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBvbmVgICAgICAgICAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBBUkNISVZFX1FVT1RFICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBhcmNoaXZlYCAgICAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBDUkVBVEVfSU5WT0lDRSAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBjb252ZXJ0YCAgICAgICAgICAgICAgIClcblxuZXhwb3J0IGNvbnN0IExPQURJTkcgPSBjcmlvKHtcbiAgaXNMb2FkaW5nOiB0cnVlLFxuICByZWZlcmVuY2U6IGBsb2FkaW5n4oCmYCxcbiAgcHJvZHVjdHM6IFtdLFxufSlcblxuY29uc3QgaW5pdGlhbFN0YXRlID0gY3Jpbyh7XG4gIGlzU2F2aW5nOiBmYWxzZSxcbiAgbWV0YTogICAgIHtcbiAgICBhY3RpdmUgICAgICAgIDoge30sXG4gICAgYXJjaGl2ZWQgICAgICA6IHt9LFxuICAgIHJlYWR5VG9JbnZvaWNlOiB7fSxcbiAgfSxcbiAgYWN0aXZlICAgICAgICA6IFtdLFxuICBhcmNoaXZlZCAgICAgIDogW10sXG4gIHJlYWR5VG9JbnZvaWNlOiBbXSxcbiAgY3VycmVudDogICAgICBMT0FESU5HLFxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCwgbWV0YSB9ID0gYWN0aW9uXG5cbiAgc3dpdGNoICggdHlwZSApIHtcblxuICAgIGNhc2UgTElTVF9BQ1RJVkUuU1VDQ0VTUzpcbiAgICBjYXNlIExJU1RfRk9SX0NVU1RPTUVSLlNVQ0NFU1M6XG4gICAgICBzdGF0ZSA9IHN0YXRlLnNldCggYGFjdGl2ZWAsIHBheWxvYWQucm93cyApXG4gICAgICByZXR1cm4gIHN0YXRlLnNldCggYG1ldGEuYWN0aXZlYCwgcGF5bG9hZC5tZXRhIClcbiAgICBjYXNlIExJU1RfQVJDSElWRUQuU1VDQ0VTUzpcbiAgICAgIHN0YXRlID0gc3RhdGUuc2V0KCBgYXJjaGl2ZWRgLCBwYXlsb2FkLnJvd3MgKVxuICAgICAgcmV0dXJuICBzdGF0ZS5zZXQoIGBtZXRhLmFyY2hpdmVkYCwgcGF5bG9hZC5tZXRhIClcbiAgICBjYXNlIExJU1RfR0VUX1JFQURZX0lOVk9JQ0UuU1VDQ0VTUzpcbiAgICAgIHN0YXRlID0gc3RhdGUuc2V0KCBgcmVhZHlUb0ludm9pY2VgLCBwYXlsb2FkLnJvd3MgKVxuICAgICAgcmV0dXJuICBzdGF0ZS5zZXQoIGBtZXRhLnJlYWR5VG9JbnZvaWNlYCwgcGF5bG9hZC5tZXRhIClcblxuICAgIC8vIEJlIHN1cmUgdG8gcmVzZXQgY3VycmVudFxuICAgIC8vIOKAoiB3ZSBkb24ndCB3YW50IGEg4oCcc2hvd+KAnSBwYWdlIHRvIGhhdmUgbGVnYWN5IGRhdGFzIHRvIGJlZ2luIHdpdGhcbiAgICBjYXNlIExJU1RfQUNUSVZFLkxPQURJTkc6XG4gICAgY2FzZSBMSVNUX0FSQ0hJVkVELkxPQURJTkc6XG4gICAgY2FzZSBMSVNUX0dFVF9SRUFEWV9JTlZPSUNFLkxPQURJTkc6XG4gICAgY2FzZSBMSVNUX0ZPUl9DVVNUT01FUi5MT0FESU5HOlxuICAgIGNhc2UgR0VUX09ORS5MT0FESU5HOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCBMT0FESU5HIClcblxuICAgIGNhc2UgU0FWRV9PTkUuTE9BRElORzpcbiAgICBjYXNlIEFSQ0hJVkVfUVVPVEUuTE9BRElORzpcbiAgICBjYXNlIENSRUFURV9JTlZPSUNFLkxPQURJTkc6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgaXNTYXZpbmdgLCB0cnVlIClcbiAgICBjYXNlIFNBVkVfT05FLkRPTkU6XG4gICAgY2FzZSBBUkNISVZFX1FVT1RFLkRPTkU6XG4gICAgY2FzZSBDUkVBVEVfSU5WT0lDRS5ET05FOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGlzU2F2aW5nYCwgZmFsc2UgKVxuXG4gICAgY2FzZSBHRVRfT05FLlNVQ0NFU1M6XG4gICAgY2FzZSBTQVZFX09ORS5TVUNDRVNTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCBwYXlsb2FkIClcblxuICAgIGNhc2UgQVJDSElWRV9RVU9URS5TVUNDRVNTOiB7XG4gICAgICBjb25zdCB7IGlkIH0gICAgICAgICA9IG1ldGFcbiAgICAgIGNvbnN0IHJlbW92ZUlkICAgICAgID0gcXVvdGF0aW9uID0+IHF1b3RhdGlvbi5pZCAhPT0gaWRcbiAgICAgIGNvbnN0IGFjdGl2ZSAgICAgICAgID0gc3RhdGUuZ2V0KCBgYWN0aXZlYCApLmZpbHRlciggcmVtb3ZlSWQgKVxuICAgICAgY29uc3QgcmVhZHlUb0ludm9pY2UgPSBzdGF0ZS5nZXQoIGByZWFkeVRvSW52b2ljZWAgKS5maWx0ZXIoIHJlbW92ZUlkIClcbiAgICAgIGNvbnN0IHVwZGF0ZWQgICAgICAgID0gc3RhdGUuc2V0KCBgYWN0aXZlYCwgYWN0aXZlIClcbiAgICAgICAgLnNldCggYHJlYWR5VG9JbnZvaWNlYCwgcmVhZHlUb0ludm9pY2UgKVxuICAgICAgICAuc2V0KCBgY3VycmVudGAsIHBheWxvYWQgKVxuICAgICAgcmV0dXJuIHVwZGF0ZWRcbiAgICB9XG5cbiAgICBjYXNlIENSRUFURV9JTlZPSUNFLlNVQ0NFU1M6IHtcbiAgICAgIGNvbnN0IHsgaWQgfSAgICAgID0gbWV0YVxuICAgICAgLy8gbWF5YmUgdGhlIHF1b3RhdGlvbiBpc24ndCBhbHJlYWR5IGluIHRoZSBsaXN0aW5nXG4gICAgICBjb25zdCBpbmRleCAgICAgICA9IHN0YXRlLmdldCggYHJlYWR5VG9JbnZvaWNlYCApXG4gICAgICAgIC5maW5kSW5kZXgocXVvdCA9PiBxdW90LmlkID09PSBpZClcbiAgICAgIGNvbnN0IHVwZGF0ZWQgICAgID0gaW5kZXggPCAwID8gIHN0YXRlXG4gICAgICAgIDogc3RhdGUuc2V0KCBgcmVhZHlUb0ludm9pY2VbJHtpbmRleH1dYCwgcGF5bG9hZCApXG4gICAgICAvLyBhbHdheXMgdXBkYXRlIHRoZSBjdXJyZW50IHF1b3RhdGlvblxuICAgICAgcmV0dXJuIHVwZGF0ZWQuc2V0KCBgY3VycmVudGAsIHBheWxvYWQgKVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbGlzdEFjdGl2ZSA9IChwYXJhbXMgPSB7fSwgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHtOQU1FfWAsXG4gICAgLi4ucGFyYW1zLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9BQ1RJVkUsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsaXN0QXJjaGl2ZWQgPSAocGFyYW1zID0ge30sIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX0vYXJjaGl2ZWRgLFxuICAgIC4uLnBhcmFtcyxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgIExJU1RfQVJDSElWRUQsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsaXN0UmVhZHlUb0ludm9pY2UgPSAocGFyYW1zID0ge30sIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX0vcmVhZHktdG8taW52b2ljZWAsXG4gICAgLi4ucGFyYW1zLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9HRVRfUkVBRFlfSU5WT0lDRSxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JDdXN0b21lciA9IChwYXJhbXMgPSB7fSwgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgaWQsIC4uLnJlc3QgfSA9IHBhcmFtc1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYC9jdXN0b21lcnMvJHsgaWQgfS8ke05BTUV9YCxcbiAgICAuLi5yZXN0LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9GT1JfQ1VTVE9NRVIsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRPbmUgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgbGV0IHsgaWQgfSA9IHBhcmFtc1xuICBpZCA9IGlkID8gaWQgOiBgbmV3YFxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX0vJHtpZH1gLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6IEdFVF9PTkUsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzYXZlT25lID0gKHBhcmFtcywgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgYm9keSB9ID0gcGFyYW1zXG4gIGNvbnN0IHsgaWQgfSA9IGJvZHlcbiAgY29uc3QgaXNOZXcgPSBpc05pbCggaWQgKVxuICBjb25zdCB1cmxJZCA9IGlzTmV3ID8gYG5ld2AgOiBpZFxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7IE5BTUUgfS8keyB1cmxJZCB9YCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIG1ldGE6ICAgICB7IGlzTmV3IH0sXG4gICAgYWN0aW9uczogIFNBVkVfT05FLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgYXJjaGl2ZU9uZSA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGlkIH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAkeyBOQU1FIH0vJHsgaWQgfS9hcmNoaXZlYCxcbiAgICBib2R5OiB7fSxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBtZXRhOiAgICAgeyBpZCB9LFxuICAgIGFjdGlvbnM6ICBBUkNISVZFX1FVT1RFLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlSW52b2ljZSA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGlkIH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAkeyBOQU1FIH0vJHsgaWQgfS9jcmVhdGUtaW52b2ljZWAsXG4gICAgYm9keToge30sXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgbWV0YTogICAgIHsgaWQgfSxcbiAgICBhY3Rpb25zOiAgQ1JFQVRFX0lOVk9JQ0UsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG4iLCJpbXBvcnQgY3JpbyBmcm9tICdjcmlvJ1xuaW1wb3J0IGlzTmlsIGZyb20gJ2xvZGFzaC5pc25pbCdcblxuaW1wb3J0IGNyZWF0ZUFjdGlvbk5hbWVzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWFjdGlvbi1uYW1lcydcbmltcG9ydCBmZXRjaERpc3BhdGNoIGZyb20gJy4vdXRpbHMvZmV0Y2gtZGlzcGF0Y2gnXG5pbXBvcnQgeyBDT05WRVJUIH0gZnJvbSAnLi9xdW90YXRpb25zJ1xuXG5jb25zdCBOQU1FID0gYGludm9pY2VzYFxuZXhwb3J0IGNvbnN0IExJU1RfQUNUSVZFICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWFjdGl2ZWAgICAgICAgKVxuZXhwb3J0IGNvbnN0IExJU1RfQVJDSElWRUQgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWFyY2hpdmVkYCAgICAgKVxuZXhwb3J0IGNvbnN0IExJU1RfRk9SX0NVU1RPTUVSID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWZvci1jdXN0b21lcmAgKVxuZXhwb3J0IGNvbnN0IEdFVF9PTkUgICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBvbmVgICAgICAgICAgICAgICAgKVxuZXhwb3J0IGNvbnN0IFNBVkVfT05FICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBvbmVgICAgICAgICAgICAgICAgKVxuZXhwb3J0IGNvbnN0IEFSQ0hJVkUgICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBhcmNoaXZlYCAgICAgICAgICAgKVxuXG5leHBvcnQgY29uc3QgRU1QVFkgPSBjcmlvKHtcbiAgaXNMb2FkaW5nOiB0cnVlLFxuICByZWZlcmVuY2U6IGBsb2FkaW5n4oCmYCxcbiAgcHJvZHVjdHM6IFtdLFxufSlcblxuY29uc3QgaW5pdGlhbFN0YXRlID0gY3Jpbyh7XG4gIGlzU2F2aW5nOiBmYWxzZSxcbiAgbWV0YToge1xuICAgIGFjdGl2ZSAgOiB7fSxcbiAgICBhcmNoaXZlZDoge30sXG4gIH0sXG4gIGFjdGl2ZSAgIDogW10sXG4gIGFyY2hpdmVkIDogW10sXG4gIGN1cnJlbnQ6ICBFTVBUWSxcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7IHR5cGUsIHBheWxvYWQsIG1ldGEgfSA9IGFjdGlvblxuXG4gIHN3aXRjaCAoIHR5cGUgKSB7XG5cbiAgICBjYXNlIExJU1RfQUNUSVZFLlNVQ0NFU1M6XG4gICAgY2FzZSBMSVNUX0ZPUl9DVVNUT01FUi5TVUNDRVNTOlxuICAgICAgc3RhdGUgPSBzdGF0ZS5zZXQoIGBhY3RpdmVgLCBwYXlsb2FkLnJvd3MgKVxuICAgICAgcmV0dXJuICBzdGF0ZS5zZXQoIGBtZXRhLmFjdGl2ZWAsIHBheWxvYWQubWV0YSApXG5cbiAgICBjYXNlIExJU1RfQVJDSElWRUQuU1VDQ0VTUzpcbiAgICAgIHN0YXRlID0gc3RhdGUuc2V0KCBgYXJjaGl2ZWRgLCBwYXlsb2FkLnJvd3MgKVxuICAgICAgcmV0dXJuICBzdGF0ZS5zZXQoIGBtZXRhLmFyY2hpdmVkYCwgcGF5bG9hZC5tZXRhIClcblxuICAgIGNhc2UgTElTVF9BQ1RJVkUuTE9BRElORzpcbiAgICBjYXNlIExJU1RfQVJDSElWRUQuTE9BRElORzpcbiAgICBjYXNlIExJU1RfRk9SX0NVU1RPTUVSLkxPQURJTkc6XG4gICAgY2FzZSBHRVRfT05FLkxPQURJTkc6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgY3VycmVudGAsIEVNUFRZIClcblxuICAgIGNhc2UgR0VUX09ORS5TVUNDRVNTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCBwYXlsb2FkIClcblxuICAgIGNhc2UgQVJDSElWRS5TVUNDRVNTOiB7XG4gICAgICBjb25zdCB7IGlkIH0gICAgICA9IG1ldGFcbiAgICAgIGNvbnN0IHJlbW92ZUlkICAgID0gaW52b2ljZSA9PiBpbnZvaWNlLmlkICE9PSBpZFxuICAgICAgY29uc3QgYWN0aXZlICAgICAgPSBzdGF0ZS5nZXQoIGBhY3RpdmVgICkuZmlsdGVyKCByZW1vdmVJZCApXG4gICAgICBjb25zdCB1cGRhdGVkICAgICA9IHN0YXRlLnNldCggYGFjdGl2ZWAsIGFjdGl2ZSApXG4gICAgICAgIC5zZXQoIGBjdXJyZW50YCwgcGF5bG9hZCApXG4gICAgICByZXR1cm4gdXBkYXRlZFxuICAgIH1cblxuICAgIGNhc2UgU0FWRV9PTkUuTE9BRElORzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGBpc1NhdmluZ2AsIHRydWUgKVxuICAgIGNhc2UgU0FWRV9PTkUuRE9ORTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGBpc1NhdmluZ2AsIGZhbHNlIClcbiAgICBjYXNlIFNBVkVfT05FLlNVQ0NFU1M6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgY3VycmVudGAsIHBheWxvYWQgKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBsaXN0QWN0aXZlID0gKHBhcmFtcyA9IHt9LCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAke05BTUV9YCxcbiAgICAuLi5wYXJhbXMsXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgYWN0aW9uczogICBMSVNUX0FDVElWRSxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RBcmNoaXZlZCA9IChwYXJhbXMgPSB7fSwgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHtOQU1FfS9hcmNoaXZlZGAsXG4gICAgLi4ucGFyYW1zLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9BUkNISVZFRCxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JDdXN0b21lciA9IChwYXJhbXMgPSB7fSwgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgaWQsIC4uLnJlc3QgfSA9IHBhcmFtc1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYC9jdXN0b21lcnMvJHsgaWQgfS8ke05BTUV9YCxcbiAgICAuLi5yZXN0LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9GT1JfQ1VTVE9NRVIsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRPbmUgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBpZCB9ICA9IHBhcmFtc1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7IE5BTUUgfS8keyBpZCB9YCxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiBHRVRfT05FLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc2F2ZU9uZSA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGJvZHkgfSAgPSBwYXJhbXNcbiAgY29uc3QgeyBpZCB9ICAgID0gYm9keVxuICBjb25zdCBvcHRpb25zICAgPSB7XG4gICAgdXJsOiBgJHsgTkFNRSB9LyR7IGlkIH1gLFxuICAgIGJvZHksXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgYWN0aW9uczogIFNBVkVfT05FLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgYXJjaGl2ZU9uZSA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGlkIH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAkeyBOQU1FIH0vJHsgaWQgfS9hcmNoaXZlYCxcbiAgICBib2R5OiB7fSxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBtZXRhOiAgICAgeyBpZCB9LFxuICAgIGFjdGlvbnM6ICBBUkNISVZFLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuIiwiaW1wb3J0IGNyaW8gZnJvbSAnY3JpbydcbmltcG9ydCBpc05pbCBmcm9tICdsb2Rhc2guaXNuaWwnXG5cbmltcG9ydCBjcmVhdGVBY3Rpb25OYW1lcyBmcm9tICcuL3V0aWxzL2NyZWF0ZS1hY3Rpb24tbmFtZXMnXG5pbXBvcnQgZmV0Y2hEaXNwYXRjaCBmcm9tICcuL3V0aWxzL2ZldGNoLWRpc3BhdGNoJ1xuXG5jb25zdCBOQU1FID0gYGN1c3RvbWVyc2BcbmV4cG9ydCBjb25zdCBHRVRfQUxMICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCwgYGFsbGApXG5leHBvcnQgY29uc3QgR0VUX09ORSAgPSBjcmVhdGVBY3Rpb25OYW1lcyggTkFNRSwgYGdldGAsIGBvbmVgIClcbmV4cG9ydCBjb25zdCBTQVZFX09ORSA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAsIGBvbmVgIClcblxuY29uc3QgaW5pdGlhbFN0YXRlID0gY3Jpbyh7XG4gIGlzU2F2aW5nOiBmYWxzZSxcbiAgYWN0aXZlOiAgIFtdLFxuICBtZXRhOiB7XG4gICAgYWxsOiB7fSxcbiAgfSxcbiAgY3VycmVudDogIHt9LFxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCwgbWV0YSB9ID0gYWN0aW9uXG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBHRVRfQUxMLlNVQ0NFU1M6XG4gICAgICBzdGF0ZSA9IHN0YXRlLnNldCggYGFjdGl2ZWAsIHBheWxvYWQucm93cyApXG4gICAgICByZXR1cm4gIHN0YXRlLnNldCggYG1ldGEuYWN0aXZlYCwgcGF5bG9hZC5tZXRhIClcblxuICAgIGNhc2UgR0VUX09ORS5MT0FESU5HOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCB7XG4gICAgICAgIGlzTG9hZGluZzogdHJ1ZSAgICAgICxcbiAgICAgICAgbmFtZSAgICAgOiBgbG9hZGluZ+KApmAsXG4gICAgICB9KVxuXG4gICAgY2FzZSBHRVRfT05FLlNVQ0NFU1M6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgY3VycmVudGAsIHBheWxvYWQgKVxuXG4gICAgY2FzZSBTQVZFX09ORS5MT0FESU5HOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGlzU2F2aW5nYCwgdHJ1ZSApXG4gICAgY2FzZSBTQVZFX09ORS5ET05FOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGlzU2F2aW5nYCwgZmFsc2UgKVxuICAgIGNhc2UgU0FWRV9PTkUuU1VDQ0VTUzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGBjdXJyZW50YCwgcGF5bG9hZCApXG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldEFsbCA9IChwYXJhbXMgPSB7fSwgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHtOQU1FfWAsXG4gICAgLi4ucGFyYW1zLFxuICB9XG4gIHJldHVybiBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgR0VUX0FMTCxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldE9uZSA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBsZXQgeyBpZCB9ID0gcGFyYW1zXG4gIGlkID0gaWQgPyBpZCA6IGBuZXdgXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHtOQU1FfS8ke2lkfWAsXG4gIH1cbiAgcmV0dXJuIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBHRVRfT05FLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc2F2ZU9uZSA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGJvZHkgfSA9IHBhcmFtc1xuICBjb25zdCB7IGlkIH0gPSBib2R5XG4gIGNvbnN0IGlzTmV3ID0gaXNOaWwoIGlkIClcbiAgY29uc3QgdXJsSWQgPSBpc05ldyA/IGBuZXdgIDogaWRcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAkeyBOQU1FIH0vJHsgdXJsSWQgfWAsXG4gICAgYm9keSxcbiAgfVxuICByZXR1cm4gYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgbWV0YTogICAgIHsgaXNOZXcgfSxcbiAgICBhY3Rpb25zOiAgU0FWRV9PTkUsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgYWNjb3VudCAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvYWNjb3VudCdcbmltcG9ydCAgICAgIExheW91dEJvYXJkaW5nICAgICAgIGZyb20gJy4uL2xheW91dC9ib2FyZGluZydcbmltcG9ydCAgICAgIEZvcm0gICAgICAgICAgICAgICAgIGZyb20gJy4uL3VpL2Zvcm0nXG5pbXBvcnQgeyAgICBCdXR0b24gICAgICAgICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0IHsgICAgSW5wdXQgICAgICAgICAgICAgIH0gZnJvbSAnLi4vdWkvZmllbGQnXG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKCB0aGlzIClcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdCggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGJvZHkgPSBzZXJpYWxpemUoIGV2ZW50LnRhcmdldCwgeyBoYXNoOiB0cnVlIH0gKVxuICAgIHRoaXMucHJvcHMubG9naW4oeyBib2R5IH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpc1xuICAgIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgYWNjb3VudC5sb2dpbi50aXRsZWAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICAgIDxMYXlvdXRCb2FyZGluZ1xuICAgICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgICAgPlxuICAgICAgICAgIDxGb3JtIGlkPVwibG9naW5cIiBhY3Rpb249XCIvYWNjb3VudC9sb2dpblwiIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXQgfSA+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5lbWFpbFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQucGFzc3dvcmRcIlxuICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImFjY291bnQubG9naW4uYnV0dG9uXCIgZGVmYXVsdE1lc3NhZ2U9XCJDb25uZWN0XCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgPC9MYXlvdXRCb2FyZGluZz5cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoMnByb3AoIGRpc3BhdGNoICkge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBsb2dpbjogYWNjb3VudC5sb2dpbixcbiAgfSwgZGlzcGF0Y2gpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgZGlzcGF0Y2gycHJvcCkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogTG9naW4sXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gIF0sXG59KSApXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmb3JtLXNlcmlhbGl6ZVwiKTsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCAqIGFzIGFjY291bnQgZnJvbSAnLi9kdWNrcy9hY2NvdW50J1xuXG4vLyBDb25uZWN0IGRhdGEgZmV0Y2hlclxuLy8g4oCiIHdlIG5lZWQgdG8gY29sbGVjdCBkYXRhIGZvciB0aGUgY29tcG9uZW50cyB0byByZW5kZXIgcHJvcGVybHlcbi8vICAg4oCmYm90aCBvbiB0aGUgc2VydmVyIGFuZCB0aGUgY2xpZW50IHNpZGVcbi8vIOKAoiB0aGUgc3RhdGljIOKAnGZldGNoRGF0YeKAnSBpcyBtYWlubHkgZGVkaWNhdGVkIHRvIHRoZSBzZXJ2ZXJcbi8vICAgYnV0IHdlIGFsaWFzIGl0IGZvciB0aGUgY2xpZW50IHNpZGUgd2l0aCBfZmV0Y2hEYXRhT25DbGllbnQgOilcbi8vIOKAoiBCVVQgd2UgZG9uJ3Qgd2FudCB0aG9zZSBkYXRhIHRvIGJlIGZldGNoIGFub3RoZXIgdGltZSBvbiBjbGllbnQgc2lkZSBpbml0aWFsaXphdGlvblxuLy8gICBoZW5jZSB0aGUgSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRFxuLy8g4oCiwqBjb21pbmcgZnJvbTpcbi8vICAgaHR0cHM6Ly9yZWFjdGpzbmV3cy5jb20vaXNvbW9ycGhpYy1yZWFjdC1pbi1yZWFsLWxpZmUjZGF0YS1mZXRjaGluZ1xuXG5sZXQgSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCA9IHRydWVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29ubmVjdERhdGFGZXRjaGVycyh7Q29tcG9uZW50LCBhY3Rpb25DcmVhdG9yc30pIHtcblxuICAvLyBiZSBzdXJlIHdlIGhhdmUgYW4gYXJyYXkgdG8gYmVnaW4gd2l0aFxuICBhY3Rpb25DcmVhdG9ycyA9IEFycmF5LmlzQXJyYXkoIGFjdGlvbkNyZWF0b3JzICkgPyBhY3Rpb25DcmVhdG9yc1xuICAgIDogWyBhY3Rpb25DcmVhdG9ycyBdXG4gIC8vIGFsd2F5cyBxdWVyeSB0aGUgYXV0aGVudGljYXRpb25cbiAgYWN0aW9uQ3JlYXRvcnMudW5zaGlmdCggYWNjb3VudC5hdXRoIClcblxuICByZXR1cm4gY2xhc3MgRGF0YUZldGNoZXJzV3JhcHBlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICAvLyBEb24ndCBwYXNzIHRoZSBmdWxsIHN0b3JlXG4gICAgLy8g4oCiIHBhc3Npbmcgb25seSBkaXNwYXRjaCB3aWxsIG1ha2Ugc2VydmVyICYgY2xpZW50IGlzbyBpbiB3aGF0IHRoZXkgZ2V0XG4gICAgc3RhdGljIGZldGNoRGF0YSgge2Rpc3BhdGNoLCBwYXJhbXMgPSB7fSwgcXVlcnkgPSB7fSwgand0IH0gKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgIGFjdGlvbkNyZWF0b3JzLm1hcCggYWN0aW9uQ3JlYXRvciA9PiB7XG4gICAgICAgICAgcmV0dXJuIGRpc3BhdGNoKCBhY3Rpb25DcmVhdG9yKHBhcmFtcywgand0KSApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCBwcmV2UHJvcHMgKSB7XG4gICAgICBjb25zdCB7IGxvY2F0aW9uIH0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCB7IGxvY2F0aW9uOiBwcmV2TG9jYXRpb24gfSA9IHByZXZQcm9wc1xuXG4gICAgICBjb25zdCBpc1VybENoYW5nZWQgPSAobG9jYXRpb24ucGF0aG5hbWUgIT09IHByZXZMb2NhdGlvbi5wYXRobmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IChsb2NhdGlvbi5zZWFyY2ggIT09IHByZXZMb2NhdGlvbi5zZWFyY2gpXG5cbiAgICAgIGlmICggaXNVcmxDaGFuZ2VkICkgdGhpcy5fZmV0Y2hEYXRhT25DbGllbnQoKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKCAhSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCApIHJldHVybiB0aGlzLl9mZXRjaERhdGFPbkNsaWVudCgpXG4gICAgICBJU19GSVJTVF9NT1VOVF9BRlRFUl9MT0FEID0gZmFsc2VcbiAgICB9XG5cbiAgICBfZmV0Y2hEYXRhT25DbGllbnQoKSB7XG4gICAgICBjb25zdCB7IHBhcmFtcyB9ID0gdGhpcy5wcm9wcy5tYXRjaFxuICAgICAgRGF0YUZldGNoZXJzV3JhcHBlci5mZXRjaERhdGEoe1xuICAgICAgICBkaXNwYXRjaDogdGhpcy5wcm9wcy5kaXNwYXRjaCxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gPENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz5cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0ICcuL2Zvcm0uc2NzcydcbmV4cG9ydCBjb25zdCBCQVNFX0NMQVNTID0gYGZvcm1gXG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpZCwgY2xhc3NOYW1lLCBpc1NhdmluZywgY2hpbGRyZW4sIC4uLm90aGVycyB9ID0gcHJvcHNcbiAgY29uc3QgRk9STV9DTEFTUyA9IFsgQkFTRV9DTEFTUywgaWQgXVxuICBpZiAoIGlzU2F2aW5nICkgRk9STV9DTEFTUy5wdXNoKCBgJHtCQVNFX0NMQVNTfS0taXMtc2F2aW5nYCApXG4gIGlmICggY2xhc3NOYW1lICkgRk9STV9DTEFTUy5wdXNoKCBjbGFzc05hbWUgKVxuXG4gIHJldHVybiAoXG4gICAgPGZvcm1cbiAgICAgIGlkPXsgaWQgfVxuICAgICAgbWV0aG9kPVwicG9zdFwiXG4gICAgICBjbGFzc05hbWU9eyBGT1JNX0NMQVNTLmpvaW4oYCBgKSB9XG4gICAgICB7IC4uLm90aGVycyB9XG4gICAgPlxuICAgICAgeyBjaGlsZHJlbiB9XG4gICAgPC9mb3JtPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1cblxuZXhwb3J0IGZ1bmN0aW9uIEZvcm1BY3Rpb25zKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2FjdGlvbnNgfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0ICAgY2xhc3NOYW1lcyAgICAgICAgIGZyb20gJ2NsYXNzbmFtZXMnXG5cbmltcG9ydCBJY29uIGZyb20gJy4vc3ZnLWljb25zJ1xuXG5pbXBvcnQgJy4vYnV0dG9ucy5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBidXR0b25gXG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b24oIHByb3BzICkge1xuICBjb25zdCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIHRvLFxuICAgIHNlY29uZGFyeSxcbiAgICBsaW5rQWxpa2UsXG4gICAgZGFuZ2VyLFxuICAgIC4uLm90aGVyc1xuICB9ID0gcHJvcHNcbiAgY29uc3QgQ09NUF9DTEFTUyA9IGNsYXNzTmFtZXMoIGNsYXNzTmFtZSwge1xuICAgIFsgICAgQkFTRV9DTEFTUyAgICAgICAgICAgICAgXTogdHJ1ZSAgICAgLFxuICAgIFtgJHsgQkFTRV9DTEFTUyB9LS1saW5rYCAgICAgXTogbGlua0FsaWtlLFxuICAgIFtgJHsgQkFTRV9DTEFTUyB9LS1zZWNvbmRhcnlgXTogc2Vjb25kYXJ5LFxuICAgIFtgJHsgQkFTRV9DTEFTUyB9LS1kYW5nZXJgICAgXTogZGFuZ2VyICAgLFxuICB9KVxuXG4gIGlmICggdG8gKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaW5rIHRvPXt0b30gY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9IHsuLi5vdGhlcnN9ID5cbiAgICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L0xpbms+XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIGNsYXNzTmFtZT17IENPTVBfQ0xBU1MgfSB7Li4ub3RoZXJzfSA+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L2J1dHRvbj5cbiAgKVxufVxuXG5jb25zdCBCVE5fSUNPTl9DTEFTUyA9IGAke0JBU0VfQ0xBU1N9LS1pY29uYFxuZXhwb3J0IGZ1bmN0aW9uIEJ0bkljb24oIHByb3BzICkge1xuICBjb25zdCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIHN2Z0lkLFxuICAgIHNlY29uZGFyeSxcbiAgICBsaW5rQWxpa2UsXG4gICAgZGFuZ2VyLFxuICAgIGxhYmVsLFxuICAgIC4uLm90aGVyc1xuICB9ID0gcHJvcHNcbiAgY29uc3QgQ09NUF9DTEFTUyA9IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCB7XG4gICAgWyAgIEJUTl9JQ09OX0NMQVNTICAgICAgICAgICAgXTogdHJ1ZSAgICAgLFxuICAgIFtgJHtCVE5fSUNPTl9DTEFTU30tc2Vjb25kYXJ5YF06IHNlY29uZGFyeSxcbiAgICBbYCR7QlROX0lDT05fQ0xBU1N9LWxpbmtgICAgICBdOiBsaW5rQWxpa2UsXG4gICAgW2Ake0JUTl9JQ09OX0NMQVNTfS1kYW5nZXJgICAgXTogZGFuZ2VyICAgLFxuICAgIFtgJHtCVE5fSUNPTl9DTEFTU30tLWljb25gICAgIF06IGNsYXNzTmFtZSxcbiAgfSlcbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uXG4gICAgICBjbGFzc05hbWU9eyBDT01QX0NMQVNTIH1cbiAgICAgIHsuLi5vdGhlcnN9XG4gICAgPlxuICAgICAgPEljb24gc3ZnSWQ9e3N2Z0lkfSAvPlxuICAgICAgeyBsYWJlbCAmJiAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX25vdGljZWB9PlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsgbGFiZWwgfSAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICApfVxuICAgIDwvQnV0dG9uPlxuICApXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpOyIsImltcG9ydCBSZWFjdCAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCBQcm9wVHlwZXMgIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmltcG9ydCAnLi9zdmctaWNvbnMuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgc3ZnLWljb25gXG5cbmV4cG9ydCBmdW5jdGlvbiBJY29uKCBwcm9wcyApIHtcbiAgY29uc3QgeyBzdmdJZCwgY2xhc3NOYW1lLCAuLi5vdGhlciB9ID0gcHJvcHNcbiAgY29uc3QgQ09NUF9DTEFTUyA9IGNsYXNzTmFtZXMoIEJBU0VfQ0xBU1MsIGBpY29uLSR7IHN2Z0lkIH1gLCBjbGFzc05hbWUgKVxuICByZXR1cm4gKFxuICAgIDxzdmdcbiAgICAgIHJvbGU9XCJpbWdcIlxuICAgICAgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9XG4gICAgICB7Li4ub3RoZXJ9XG4gICAgPlxuICAgICAgPHVzZSB4bGlua0hyZWY9e2AjaWNvbi0keyBzdmdJZCB9YH0+PC91c2U+XG4gICAgPC9zdmc+XG4gIClcbn1cblxuSWNvbi5wcm9wVHlwZXMgPSB7XG4gIHN2Z0lkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59XG5cbmV4cG9ydCBkZWZhdWx0IEljb25cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7IiwiaW1wb3J0ICAgaXNOaWwgICAgICAgICAgICAgIGZyb20gJ2xvZGFzaC5pc25pbCdcbmltcG9ydCAgIGNyaW8gICAgICAgICAgICAgICBmcm9tICdjcmlvJ1xuaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCB7IEljb24gICAgICAgICAgICB9IGZyb20gJy4vc3ZnLWljb25zJ1xuaW1wb3J0IHsgVGV4dGFyZWFBdXRvUmVzaXplIH0gZnJvbSAnLi90ZXh0YXJlYS1hdXRvLXJlc2l6ZSdcblxuaW1wb3J0ICcuL2ZpZWxkLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTID0gYGZpZWxkYFxuXG4vLy8vLy9cbi8vIFVUSUxTXG4vLy8vLy9cblxuZnVuY3Rpb24gaXNFbXB0eSggdmFsdWUgKSB7XG4gIHJldHVybiAoIGlzTmlsKCB2YWx1ZSApIHx8IHZhbHVlID09PSBgYClcbn1cblxuLy8gZW5zdXJlIHRoYXQgd2UgaGF2ZSBhIHZhbHVlIGluIGNhc2Ugb2YgY29udHJvbGxlZCBjb21wb25lbnRcbi8vIOKAoiB0aGlzIHdpbGwgYXZvaWQgd2FybmluZ3PigKZcbi8vICAg4oCmZnJvbSBzd2l0Y2hpbmcgZnJvbSBjb250cm9sbGVkIHRvIHVuY29udHJvbGxlZCBjb21wb25lbnRzXG5mdW5jdGlvbiBlbnN1cmVWYWx1ZSggdmFsdWUgKSB7XG4gIHJldHVybiBpc05pbCggdmFsdWUgKSA/IGBgIDogdmFsdWVcbn1cblxuLy8gZm9vWzBdID0+IGZvby0wXG5leHBvcnQgZnVuY3Rpb24gaWRUb0NsYXNzTmFtZSggaWQgKSB7XG4gIHJldHVybiBpZC5yZXBsYWNlKC9cXF0kLywgYGApLnJlcGxhY2UoL1tcXFtcXF1dL2csICctJykudG9Mb3dlckNhc2UoKVxufVxuXG4vLy8vLy9cbi8vIFdSQVBQRVJcbi8vLy8vL1xuXG4vLyBpbnNwaXJlZCBieVxuLy8g4oCiIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWljc3MvbXVpL2Jsb2IvbWFzdGVyL3NyYy9yZWFjdC9fdGV4dGZpZWxkSGVscGVycy5qc3hcbmNvbnN0IGZpZWxkV3JhcHBlciA9ICh7Q29udHJvbENvbXBvbmVudCwgZmllbGRUeXBlfSkgPT4gY2xhc3MgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcblxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVCbHVyID0gdGhpcy5oYW5kbGVCbHVyLmJpbmQoIHRoaXMgKVxuXG4gICAgY29uc3QgeyBpZCwgbGFiZWwsIGRhcmtCZywgb25DaGFuZ2UsIG9uQmx1ciwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgICBjb25zdCBfaWQgICAgID0gaWQgPyBpZCA6IHJlc3QubmFtZVxuICAgIGNvbnN0IF9pZDJjbGFzcyA9IGlkVG9DbGFzc05hbWUoIF9pZCApXG4gICAgY29uc3QgeyB0eXBlIH0gID0gcHJvcHNcblxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc05hbWUgPSBbXG4gICAgICBCQVNFX0NMQVNTLFxuICAgICAgYCR7IEJBU0VfQ0xBU1MgfS0tJHsgX2lkMmNsYXNzIH1gLFxuICAgICAgYCR7IEJBU0VfQ0xBU1MgfS0taXMtJHsgZmllbGRUeXBlIH1gLFxuICAgIF1cbiAgICBpZiAoIHR5cGUgKSB3cmFwcGVyQ2xhc3NOYW1lLnB1c2goIGAke0JBU0VfQ0xBU1N9LS10eXBlLSR7dHlwZX1gIClcbiAgICBpZiAoIGRhcmtCZyApIHdyYXBwZXJDbGFzc05hbWUucHVzaCggYCR7QkFTRV9DTEFTU30tLWRhcmstYmFja2dyb3VuZGAgKVxuXG4gICAgY29uc3Qgd3JhcHBlclByb3BzID0gY3Jpbyh7XG4gICAgICBjbGFzc05hbWU6IHdyYXBwZXJDbGFzc05hbWUuam9pbiggYCBgICksXG4gICAgfSlcbiAgICBjb25zdCBsYWJlbFByb3BzID0gY3Jpbyh7XG4gICAgICBjbGFzc05hbWU6IGAke0JBU0VfQ0xBU1N9X19sYWJlbGAsXG4gICAgICBodG1sRm9yOiAgICBfaWQsXG4gICAgICBsYWJlbDogICAgICBsYWJlbCxcbiAgICB9KVxuICAgIGNvbnN0IGNvbnRyb2xQcm9wcyA9IGNyaW8oe1xuICAgICAgaWQ6ICAgICAgICAgX2lkLFxuICAgICAgY2xhc3NOYW1lOiAgYCR7IEJBU0VfQ0xBU1MgfV9fY29udHJvbGAsXG4gICAgICBvbkNoYW5nZTogICB0aGlzLmhhbmRsZUNoYW5nZSxcbiAgICAgIG9uQmx1cjogICAgIHRoaXMuaGFuZGxlQmx1cixcbiAgICAgIC4uLnJlc3QsXG4gICAgfSlcblxuICAgIGlmICggaXNOaWwocHJvcHMuZGVmYXVsdFZhbHVlKSApIHtcbiAgICAgIGNvbnRyb2xQcm9wcy52YWx1ZSA9IGVuc3VyZVZhbHVlKCBwcm9wcy52YWx1ZSApXG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHdyYXBwZXJQcm9wcyxcbiAgICAgIGxhYmVsUHJvcHMsXG4gICAgICBjb250cm9sUHJvcHMsXG4gICAgICBpc0VtcHR5OiAgICBmYWxzZSxcbiAgICAgIGlzVG91Y2hlZDogIGZhbHNlLFxuICAgICAgaXNQcmlzdGluZTogdHJ1ZSxcbiAgICB9XG4gIH1cbiAgLy8gYWN0aXZhdGUgZmxvYXRpbmcgbGFiZWwgb25seSBpZiBKUyBvbiBjbGllbnQtc2lkZVxuICAvLyDigKIgd2l0aG91dCBKUyBhbGwgbGFiZWwgd2lsbCBiZSBzdHVjayBieSBkZWZhdWx0XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgY29udHJvbFByb3BzIH0gID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSAgICAgID0gYHZhbHVlYCBpbiBjb250cm9sUHJvcHMgPyBjb250cm9sUHJvcHMudmFsdWVcbiAgICAgIDogY29udHJvbFByb3BzLmRlZmF1bHRWYWx1ZVxuICAgIGNvbnN0IGlzRW1wdHlWYWx1ZSAgICAgID0gaXNFbXB0eSggY29udHJvbFZhbHVlIClcbiAgICB0aGlzLnNldFN0YXRlKCBwcmV2U3RhdGUgPT4ge1xuICAgICAgcmV0dXJuIHsgaXNFbXB0eTogaXNFbXB0eVZhbHVlIH1cbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyggbmV4dFByb3BzLCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc3QgeyBjb250cm9sUHJvcHMgfSA9IHByZXZTdGF0ZVxuICAgIGNvbnN0IGlzVmFsdWVVcGRhdGUgICAgPSBuZXh0UHJvcHMudmFsdWUgICAhPT0gY29udHJvbFByb3BzLnZhbHVlXG4gICAgY29uc3QgaXNPcHRpb25zVXBkYXRlICA9IG5leHRQcm9wcy5vcHRpb25zICE9PSBjb250cm9sUHJvcHMub3B0aW9uc1xuICAgIGlmICggIWlzVmFsdWVVcGRhdGUgJiYgIWlzT3B0aW9uc1VwZGF0ZSApIHJldHVybiBudWxsXG4gICAgY29uc3QgdXBkYXRlID0ge1xuICAgICAgY29udHJvbFByb3BzLFxuICAgICAgaXNFbXB0eTogcHJldlN0YXRlLmlzRW1wdHksXG4gICAgfVxuICAgIGlmICggaXNPcHRpb25zVXBkYXRlICkge1xuICAgICAgdXBkYXRlLmNvbnRyb2xQcm9wcyA9IHVwZGF0ZS5jb250cm9sUHJvcHMuc2V0KGBvcHRpb25zYCwgbmV4dFByb3BzLm9wdGlvbnMgKVxuICAgIH1cbiAgICBpZiAoIGlzVmFsdWVVcGRhdGUgKSB7XG4gICAgICBjb25zdCB2YWx1ZSAgICAgPSBlbnN1cmVWYWx1ZSggbmV4dFByb3BzLnZhbHVlIClcbiAgICAgIHVwZGF0ZS5pc0VtcHR5ICA9IGlzRW1wdHkoIHZhbHVlIClcbiAgICAgIHVwZGF0ZS5jb250cm9sUHJvcHMgPSB1cGRhdGUuY29udHJvbFByb3BzLnNldChgdmFsdWVgLCB2YWx1ZSApXG4gICAgfVxuICAgIHJldHVybiB1cGRhdGVcbiAgfVxuXG4gIC8vLS0tLS0gRVZFTlRTXG5cbiAgaGFuZGxlQ2hhbmdlKCBldmVudCApIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSB0aGlzXG4gICAgLy8gQ2FuJ3QgdXNlIGV2ZW50IGluIGFzeW5jXG4gICAgLy8g4oCiIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9ldmVudHMuaHRtbCNldmVudC1wb29saW5nXG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0XG4gICAgdGhpcy5zZXRTdGF0ZSggcHJldlN0YXRlID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzRW1wdHk6ICAgIGlzRW1wdHkoIHZhbHVlICksXG4gICAgICAgIGlzUHJpc3RpbmU6IGZhbHNlLFxuICAgICAgfVxuICAgIH0pXG4gICAgLy8gZXhlY3V0ZSBvcmlnaW5hbCBjYWxsYmFja1xuICAgIGlmICggdHlwZW9mIHByb3BzLm9uQ2hhbmdlID09PSBgZnVuY3Rpb25gICkgcHJvcHMub25DaGFuZ2UoIGV2ZW50IClcbiAgfVxuICBoYW5kbGVCbHVyKCBldmVudCApIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSB0aGlzXG4gICAgLy8gaWdub3JlIGlmIGV2ZW50IGlzIGEgd2luZG93IGJsdXJcbiAgICBpZiAoIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMuY29udHJvbEVsICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSggcHJldlN0YXRlID0+IHtcbiAgICAgICAgcmV0dXJuIHsgaXNUb3VjaGVkOiB0cnVlIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIGV4ZWN1dGUgb3JpZ2luYWwgY2FsbGJhY2tcbiAgICBpZiAoIHR5cGVvZiBwcm9wcy5vbkJsdXIgPT09IGBmdW5jdGlvbmAgKSBwcm9wcy5vbkJsdXIoIGV2ZW50IClcbiAgfVxuXG4gIC8vLS0tLS0gUkVOREVSXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc3RhdGUgfSA9IHRoaXNcbiAgICBjb25zdCB7IHdyYXBwZXJQcm9wcywgbGFiZWxQcm9wcywgY29udHJvbFByb3BzLCBpc0VtcHR5LCBpc1RvdWNoZWQgfSA9IHN0YXRlXG5cbiAgICBjb25zdCBXcmFwcGVyQ2xhc3NOYW1lID0gW1xuICAgICAgd3JhcHBlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGlzRW1wdHkgPyBgJHsgQkFTRV9DTEFTUyB9LS1pcy1lbXB0eWAgOiBgJHsgQkFTRV9DTEFTUyB9LS1pcy1ub3QtZW1wdHlgLFxuICAgICAgaXNUb3VjaGVkID8gYCR7IEJBU0VfQ0xBU1MgfS0taXMtdG91Y2hlZGAgOiBgJHsgQkFTRV9DTEFTUyB9LS1pcy1ub3QtdG91Y2hlZGAsXG4gICAgXS5qb2luKCBgIGAgKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgV3JhcHBlckNsYXNzTmFtZSB9ID5cbiAgICAgICAgPENvbnRyb2xDb21wb25lbnRcbiAgICAgICAgICBjb250cm9sUmVmPXsgZWwgPT4geyB0aGlzLmNvbnRyb2xFbCA9IGVsIH0gfVxuICAgICAgICAgIHsuLi5jb250cm9sUHJvcHN9XG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbFxuICAgICAgICAgIGNsYXNzTmFtZT17IGxhYmVsUHJvcHMuY2xhc3NOYW1lIH1cbiAgICAgICAgICBodG1sRm9yPXsgbGFiZWxQcm9wcy5odG1sRm9yIH1cbiAgICAgICAgPlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtsYWJlbFByb3BzLmxhYmVsfSAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbi8vLy8vL1xuLy8gQ09NUE9ORU5UU1xuLy8vLy8vXG5cbmV4cG9ydCBjb25zdCBJbnB1dCA9IGZpZWxkV3JhcHBlcigge1xuICBDb250cm9sQ29tcG9uZW50OiBwcm9wcyA9PiB7XG4gICAgY29uc3QgeyBjb250cm9sUmVmLCAuLi5yZXN0IH0gPSBwcm9wc1xuICAgIHJldHVybiA8aW5wdXQgcmVmPXsgY29udHJvbFJlZiB9IHsuLi5yZXN0fSAvPlxuICB9LFxuICBmaWVsZFR5cGU6IGBpbnB1dGAsXG59KVxuXG5leHBvcnQgY29uc3QgVGV4dGFyZWEgPSBmaWVsZFdyYXBwZXIoIHtcbiAgQ29udHJvbENvbXBvbmVudDogcHJvcHMgPT4ge1xuICAgIGNvbnN0IHsgY29udHJvbFJlZiwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgICByZXR1cm4gPFRleHRhcmVhQXV0b1Jlc2l6ZSByZWY9eyBjb250cm9sUmVmIH0gey4uLnJlc3R9IC8+XG4gIH0sXG4gIGZpZWxkVHlwZTogYHRleHRhcmVhYCxcbn0pXG5cbi8vIHNvbWV0aW1lIDxvcHRpb25zPiBsaXN0IGRvZXNuJ3QgY29tZSB3aXRoIHRoZSBleHBlY3RlZCBrZXlzXG4vLyDigKIgbWFrZSBpdCBwb3NzaWJsZSB0byBjb25maWd1cmUgdGhhdCB3aXRoIG9wdGlvbnNLZXlzIHByb3BcbmNvbnN0IGtleURlZmF1bHQgPSBjcmlvKHt2YWx1ZTogYHZhbHVlYCwgbGFiZWw6IGBsYWJlbGB9KVxuZXhwb3J0IGNvbnN0IFNlbGVjdCA9IGZpZWxkV3JhcHBlcigge1xuICBDb250cm9sQ29tcG9uZW50OiBwcm9wcyA9PiB7XG4gICAgY29uc3QgeyBvcHRpb25zLCBvcHRpb25zS2V5cyA9IGtleURlZmF1bHQsIGNvbnRyb2xSZWYsIC4uLnJlc3R9ID0gcHJvcHNcbiAgICBjb25zdCBoYXNPcHRpb25zID0gQXJyYXkuaXNBcnJheSggb3B0aW9ucyApICYmIG9wdGlvbnMubGVuZ3RoID4gMFxuICAgIHJldHVybiAoXG4gICAgICA8c2VsZWN0IHJlZj17IGNvbnRyb2xSZWYgfSB7Li4ucmVzdH0+eyBoYXNPcHRpb25zICYmIG9wdGlvbnMubWFwKCBjID0+IChcbiAgICAgICAgPG9wdGlvblxuICAgICAgICAgIGtleT17IGAke2NvbnRyb2xSZWZ9LSR7Yy5nZXQob3B0aW9uc0tleXMudmFsdWUpfWAgfVxuICAgICAgICAgIHZhbHVlPXsgYy5nZXQob3B0aW9uc0tleXMudmFsdWUpIH1cbiAgICAgICAgPlxuICAgICAgICAgIHsgYy5nZXQob3B0aW9uc0tleXMubGFiZWwpIH1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgICApKX08LyBzZWxlY3Q+XG4gICAgKVxuICB9LFxuICBmaWVsZFR5cGU6IGBzZWxlY3RgLFxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIENoZWNrQm94KCBwcm9wcyApIHtcbiAgY29uc3QgeyBuYW1lLCBkZWZhdWx0Q2hlY2tlZCB9ID0gcHJvcHNcbiAgY29uc3QgaWNvbk5hbWUgPSBkZWZhdWx0Q2hlY2tlZCA/IGBjaGVjay1ib3hgIDogYGNoZWNrLWJveC1vdXRsaW5lLWJsYW5rYFxuICByZXR1cm4gKFxuICAgIDxsYWJlbCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9ICR7QkFTRV9DTEFTU30tLWlzLWNoZWNrYm94YH0+XG4gICAgICA8aW5wdXRcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fY29udHJvbGB9XG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIGtleT17YCR7bmFtZX0tJHtkZWZhdWx0Q2hlY2tlZH1gfVxuICAgICAgICBuYW1lPXsgbmFtZSB9XG4gICAgICAgIGRlZmF1bHRWYWx1ZT1cInRydWVcIlxuICAgICAgICBkZWZhdWx0Q2hlY2tlZD17IGRlZmF1bHRDaGVja2VkIH1cbiAgICAgIC8+XG4gICAgICA8SWNvbiBzdmdJZD17IGljb25OYW1lIH0gLz5cbiAgICA8L2xhYmVsPlxuICApXG59XG4iLCJpbXBvcnQgICAgICBSZWFjdCAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgICAgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0ICAgICAgUHJvcFR5cGVzICBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0ICogYXMgSW50bCAgICAgICBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgJy4vdGV4dGFyZWEtYXV0by1yZXNpemUuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgdGV4dGFyZWFgXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUF1dG9SZXNpemUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYXV0b1Jlc2l6ZTogZmFsc2UsXG4gICAgfVxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5lbCA9IFJlYWN0LmNyZWF0ZVJlZigpXG4gIH1cbiAgLy8gYWN0aXZhdGUgYXV0b1Jlc2l6ZSBvbmx5IGlmIEpTIG9uIGNsaWVudC1zaWRlXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiAoeyBhdXRvUmVzaXplOiB0cnVlIH0pIClcbiAgICB0aGlzLnJlY29tcHV0ZVRleHRhcmVhU2l6ZSggKVxuICB9XG5cbiAgLy8tLS0tLSBFVkVOVFNcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKCBlICkge1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IHRoaXNcbiAgICB0aGlzLnJlY29tcHV0ZVRleHRhcmVhU2l6ZSggKVxuICAgIC8vIGV4ZWN1dGUgb3JpZ2luYWwgY2FsbGJhY2tcbiAgICBpZiAoIHR5cGVvZiBwcm9wcy5vbkNoYW5nZSA9PT0gYGZ1bmN0aW9uYCApIHByb3BzLm9uQ2hhbmdlKCBlIClcbiAgfVxuXG4gIC8vLS0tLS0gVVRJTFNcblxuICAvLyBjaGFuZ2UgdGV4dGFyZWEgc2l6ZSBpZiB0b28gbXVjaCBjb250ZW50XG4gIC8vIOKAoiBodHRwczovL21heGltaWxpYW5ob2ZmbWFubi5jb20vcG9zdHMvYXV0b3Jlc2l6aW5nLXRleHRhcmVhc1xuICByZWNvbXB1dGVUZXh0YXJlYVNpemUoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsLmN1cnJlbnRcbiAgICBjb25zdCBvcmlnaW5hbFJvd3MgPSBlbC5nZXRBdHRyaWJ1dGUoIGByb3dzYCApXG4gICAgLy8gZm9yY2UgYSBvbmUtbGluZXIgYnkgZGVmYXVsdFxuICAgIC8vIOKAoiB0aGlzIG1ha2UgaXQgZWFzeSB0byBjYWxjdWxhdGUgdGhlIHJpZ2h0IGhlaWdodFxuICAgIGVsLnNldEF0dHJpYnV0ZSggYHJvd3NgLCBgMWAgKVxuICAgIGVsLnN0eWxlLmhlaWdodCA9IGBhdXRvYFxuICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2VsLnNjcm9sbEhlaWdodH1weGBcbiAgICBlbC5zY3JvbGxUb3AgICAgPSBlbC5zY3JvbGxIZWlnaHRcbiAgICBlbC5zZXRBdHRyaWJ1dGUoIGByb3dzYCwgb3JpZ2luYWxSb3dzIClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgcGxhY2Vob2xkZXIgLCBvbkNoYW5nZSwgLi4ucmVzdCB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgYXV0b1Jlc2l6ZSB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IENPTVBfQ0xBU1MgICAgID0gY2xhc3NOYW1lcyhjbGFzc05hbWUsIHtcbiAgICAgIFsgQkFTRV9DTEFTUyBdOiB0cnVlLFxuICAgICAgWyBgJHtCQVNFX0NMQVNTfS0taXMtYXV0by1yZXNpemVgIF06IGF1dG9SZXNpemUsXG4gICAgfSlcbiAgICBjb25zdCBzaG93UGxhY2Vob2xkZXIgPSAoYXV0b1Jlc2l6ZSAmJiBwbGFjZWhvbGRlcilcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBDT01QX0NMQVNTIH0+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2ZpZWxkYH1cbiAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICByZWY9eyB0aGlzLmVsIH1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgLz5cbiAgICAgICAge3Nob3dQbGFjZWhvbGRlciAmJiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcGxhY2Vob2xkZXJgfT5cbiAgICAgICAgICAgIDxJbnRsLkZvcm1hdHRlZE1lc3NhZ2UgaWQ9e3BsYWNlaG9sZGVyfSAvPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0YXJlYUF1dG9SZXNpemVcbiIsImltcG9ydCAgIHVybEpvaW4gICAgICAgICAgICAgIGZyb20gJ3VybC1qb2luJ1xuaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgICBzZXJpYWxpemUgICAgICAgICAgICBmcm9tICdmb3JtLXNlcmlhbGl6ZSdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlICAgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBjb25maWcgICAgICAgICAgICAgICBmcm9tICcuLi9pc29tb3JwaGljLWNvbmZpZydcbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgYWNjb3VudCAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvYWNjb3VudCdcbmltcG9ydCAgICAgIExheW91dEJvYXJkaW5nICAgICAgIGZyb20gJy4uL2xheW91dC9ib2FyZGluZydcbmltcG9ydCAgICAgIEZvcm0gICAgICAgICAgICAgICAgIGZyb20gJy4uL3VpL2Zvcm0nXG5pbXBvcnQgeyAgICBCdXR0b24gICAgICAgICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0IHsgICAgSW5wdXQgICAgICAgICAgICAgIH0gZnJvbSAnLi4vdWkvZmllbGQnXG5cbmNvbnN0IE1BSUxfUkVESVJFQ1RfVVJMID0gdXJsSm9pbiggY29uZmlnLkhPU1RfVVJMLCBgL2FjY291bnQvc2V0LXBhc3N3b3JkYCApXG5cbmNsYXNzIFJlZ2lzdGVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKCB0aGlzIClcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdCggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGJvZHkgPSBzZXJpYWxpemUoIGV2ZW50LnRhcmdldCwgeyBoYXNoOiB0cnVlIH0gKVxuICAgIHRoaXMucHJvcHMucmVnaXN0ZXIoeyBib2R5IH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpc1xuICAgIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgYWNjb3VudC5yZWdpc3Rlci50aXRsZWAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICAgIDxMYXlvdXRCb2FyZGluZ1xuICAgICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgICAgPlxuICAgICAgICAgIDxGb3JtIGFjdGlvbj1cIi9hY2NvdW50L3JlZ2lzdGVyXCIgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pdCB9ID5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImFjY291bnQucmVnaXN0ZXIubm90aWNlXCIgLz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInJlZGlyZWN0VXJsXCIgdmFsdWU9eyBNQUlMX1JFRElSRUNUX1VSTCB9IC8+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5lbWFpbFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiYWNjb3VudC5yZWdpc3Rlci5idXR0b25cIiBkZWZhdWx0VmFsdWU9XCJDcmVhdGVcIiAvPlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Gb3JtPlxuICAgICAgICA8L0xheW91dEJvYXJkaW5nPlxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApXG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2gycHJvcCggZGlzcGF0Y2ggKSB7XG4gIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIHJlZ2lzdGVyOiBhY2NvdW50LnJlZ2lzdGVyLFxuICB9LCBkaXNwYXRjaClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBkaXNwYXRjaDJwcm9wKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBSZWdpc3RlcixcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgc2VyaWFsaXplICAgICAgICAgICAgZnJvbSAnZm9ybS1zZXJpYWxpemUnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0ICAgcXVlcnlTdHJpbmcgICAgICAgICAgZnJvbSAncXVlcnktc3RyaW5nJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSAgIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyICAgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBhY2NvdW50ICAgICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9hY2NvdW50J1xuaW1wb3J0ICAgICAgTGF5b3V0Qm9hcmRpbmcgICAgICAgZnJvbSAnLi4vbGF5b3V0L2JvYXJkaW5nJ1xuaW1wb3J0ICAgICAgRm9ybSAgICAgICAgICAgICAgICAgZnJvbSAnLi4vdWkvZm9ybSdcbmltcG9ydCB7ICAgIEJ1dHRvbiAgICAgICAgICAgICB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5pbXBvcnQgeyAgICBJbnB1dCAgICAgICAgICAgICAgfSBmcm9tICcuLi91aS9maWVsZCdcblxuY2xhc3MgU2V0UGFzc3dvcmQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcblxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCggdGhpcyApXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRva2VuOiBxdWVyeVN0cmluZy5wYXJzZSggcHJvcHMubG9jYXRpb24uc2VhcmNoICkudG9rZW5cbiAgICB9XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoIGV2ZW50ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBib2R5ID0gc2VyaWFsaXplKCBldmVudC50YXJnZXQsIHsgaGFzaDogdHJ1ZSB9IClcbiAgICB0aGlzLnByb3BzLnNldFBhc3N3b3JkKHsgYm9keSB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHMsIHN0YXRlIH0gPSB0aGlzXG4gICAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBhY2NvdW50LnNldC1wYXNzd29yZC50aXRsZWAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICAgIDxMYXlvdXRCb2FyZGluZ1xuICAgICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgICAgPlxuICAgICAgICAgIDxGb3JtXG4gICAgICAgICAgICBpZD1cIm5ldy1wYXNzd29yZFwiXG4gICAgICAgICAgICBhY3Rpb249XCIvYWNjb3VudC9yZXNldFwiXG4gICAgICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWl0IH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJhY2NvdW50LnJlc2V0Lm5vdGljZVwiIC8+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJ0b2tlblwiIGRlZmF1bHRWYWx1ZT17c3RhdGUudG9rZW59IC8+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5wYXNzd29yZFwiXG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiYWNjb3VudC5zZXQtcGFzc3dvcmQuYnV0dG9uXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgPC9MYXlvdXRCb2FyZGluZz5cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKVxuICB9XG59XG5cblxuZnVuY3Rpb24gZGlzcGF0Y2gycHJvcCggZGlzcGF0Y2ggKSB7XG4gIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIHNldFBhc3N3b3JkOiBhY2NvdW50LnNldFBhc3N3b3JkLFxuICB9LCBkaXNwYXRjaClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggbnVsbCwgZGlzcGF0Y2gycHJvcCApKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IFNldFBhc3N3b3JkLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICBdLFxufSkgKVxuIiwiaW1wb3J0ICAgdXJsSm9pbiAgICAgICAgICAgICAgZnJvbSAndXJsLWpvaW4nXG5pbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIGNvbmZpZyAgICAgICAgICAgICAgIGZyb20gJy4uL2lzb21vcnBoaWMtY29uZmlnJ1xuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyICAgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBhY2NvdW50ICAgICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9hY2NvdW50J1xuaW1wb3J0ICAgICAgTGF5b3V0Qm9hcmRpbmcgICAgICAgZnJvbSAnLi4vbGF5b3V0L2JvYXJkaW5nJ1xuaW1wb3J0ICAgICAgRm9ybSAgICAgICAgICAgICAgICAgZnJvbSAnLi4vdWkvZm9ybSdcbmltcG9ydCB7ICAgIEJ1dHRvbiAgICAgICAgICAgICB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5pbXBvcnQgeyAgICBJbnB1dCAgICAgICAgICAgICAgfSBmcm9tICcuLi91aS9maWVsZCdcblxuY29uc3QgTUFJTF9SRURJUkVDVF9VUkwgPSB1cmxKb2luKCBjb25maWcuSE9TVF9VUkwsIGAvYWNjb3VudC9yZXNldGAgKVxuXG5jbGFzcyBGb3Jnb3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQoIHRoaXMgKVxuICB9XG5cbiAgaGFuZGxlU3VibWl0KCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgYm9keSA9IHNlcmlhbGl6ZSggZXZlbnQudGFyZ2V0LCB7IGhhc2g6IHRydWUgfSApXG4gICAgdGhpcy5wcm9wcy5mb3Jnb3QoeyBib2R5IH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpc1xuICAgIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgYWNjb3VudC5mb3Jnb3QudGl0bGVgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgICA8TGF5b3V0Qm9hcmRpbmdcbiAgICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICAgID5cbiAgICAgICAgICA8Rm9ybSBpZD1cImZvcmdvdFwiIGFjdGlvbj1cIi9hY2NvdW50L2ZvcmdvdFwiIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXQgfSA+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJhY2NvdW50LmZvcmdvdC5ub3RpY2VcIi8+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJyZWRpcmVjdFVybFwiIHZhbHVlPXsgTUFJTF9SRURJUkVDVF9VUkwgfSAvPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQuZW1haWxcIlxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImFjY291bnQuZm9yZ290LmJ1dHRvblwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgIDwvTGF5b3V0Qm9hcmRpbmc+XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgIClcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaDJwcm9wKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgZm9yZ290OiBhY2NvdW50LmZvcmdvdCxcbiAgfSwgZGlzcGF0Y2gpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIG51bGwsIGRpc3BhdGNoMnByb3AgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBGb3Jnb3QsXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCAgIHF1ZXJ5U3RyaW5nICAgICAgICAgIGZyb20gJ3F1ZXJ5LXN0cmluZydcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgYWNjb3VudCAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvYWNjb3VudCdcbmltcG9ydCAgICAgIExheW91dEJvYXJkaW5nICAgICAgIGZyb20gJy4uL2xheW91dC9ib2FyZGluZydcbmltcG9ydCAgICAgIEZvcm0gICAgICAgICAgICAgICAgIGZyb20gJy4uL3VpL2Zvcm0nXG5pbXBvcnQgeyAgICBCdXR0b24gICAgICAgICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0IHsgICAgSW5wdXQgICAgICAgICAgICAgIH0gZnJvbSAnLi4vdWkvZmllbGQnXG5cbmNsYXNzIFJlc2V0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG5cbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQoIHRoaXMgKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b2tlbjogcXVlcnlTdHJpbmcucGFyc2UoIHByb3BzLmxvY2F0aW9uLnNlYXJjaCApLnRva2VuXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU3VibWl0KCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgYm9keSA9IHNlcmlhbGl6ZSggZXZlbnQudGFyZ2V0LCB7IGhhc2g6IHRydWUgfSApXG4gICAgdGhpcy5wcm9wcy5yZXNldCh7IGJvZHkgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHByb3BzLCBzdGF0ZSB9ID0gdGhpc1xuICAgIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgYWNjb3VudC5yZXNldC50aXRsZWAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICAgIDxMYXlvdXRCb2FyZGluZ1xuICAgICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgICAgPlxuICAgICAgICAgIDxGb3JtIGlkPVwibG9naW5cIiBhY3Rpb249XCIvYWNjb3VudC9yZXNldFwiIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXQgfSA+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJhY2NvdW50LnJlc2V0Lm5vdGljZVwiIGRlZmF1bHRWYWx1ZT1cIlNldCB5b3VyIG5ldyBwYXNzd29yZCBoZXJlXCIgLz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInRva2VuXCIgZGVmYXVsdFZhbHVlPXtzdGF0ZS50b2tlbn0gLz5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLnBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPVwiXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJhY2NvdW50LnJlc2V0LmJ1dHRvblwiIGRlZmF1bHRWYWx1ZT1cInJlc2V0IHBhc3N3b3JkXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgPC9MYXlvdXRCb2FyZGluZz5cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKVxuICB9XG59XG5cblxuZnVuY3Rpb24gZGlzcGF0Y2gycHJvcCggZGlzcGF0Y2ggKSB7XG4gIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIHJlc2V0OiBhY2NvdW50LnJlc2V0LFxuICB9LCBkaXNwYXRjaClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggbnVsbCwgZGlzcGF0Y2gycHJvcCApKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IFJlc2V0LFxuICBhY3Rpb25DcmVhdG9yczogW1xuICBdLFxufSkgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSAgIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyICAgICAgICAgICAgICBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvY3VzdG9tZXJzJ1xuaW1wb3J0ICAgICAgTmF2U2Vjb25kYXJ5ICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHsgICAgQnV0dG9uU3VibWl0ICAgICAgIH0gICAgICAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5LWJ1dHRvbnMnXG5pbXBvcnQgICAgICBTZXR0aW5nRm9ybSAgICAgICAsIHsgRk9STV9JRCB9IGZyb20gJy4vc2V0dGluZ3MnXG5cbmZ1bmN0aW9uIEVkaXRQcm9maWxlKCBwcm9wcyApIHtcbiAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBwYWdlLnNldHRpbmdzYCB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25TdWJtaXRcbiAgICAgICAgICBmb3JtSWQ9eyBGT1JNX0lEIH1cbiAgICAgICAgICBpc1NhdmluZz17IHByb3BzLmlzU2F2aW5nIH1cbiAgICAgICAgICBsYWJlbD1cImNvbmZpZ3VyYXRpb24uYnV0dG9uLnNhdmVcIlxuICAgICAgICAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8U2V0dGluZ0Zvcm0gey4uLnByb3BzfSAvPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgaXNTYXZpbmc6IHN0YXRlLmFjY291bnQuZ2V0KCBgaXNTYXZpbmdgICksXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcCApKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IEVkaXRQcm9maWxlLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICBdLFxufSkgKVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0ICcuL3NlY29uZGFyeS5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBuYXYtc2Vjb25kYXJ5YFxuXG5leHBvcnQgY2xhc3MgTmF2U2Vjb25kYXJ5IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzU3R1Y2s6IGZhbHNlLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUludGVyc2VjdGlvbiA9IHRoaXMuaGFuZGxlSW50ZXJzZWN0aW9uLmJpbmQoIHRoaXMgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5vYnNlcnZlSW50ZXJzZWN0aW9uKClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMudW5vYnNlcnZlSW50ZXJzZWN0aW9uKClcbiAgfVxuXG4gIC8vLS0tLS0gRVZFTlRTXG5cbiAgaGFuZGxlSW50ZXJzZWN0aW9uKCBlbnRyaWVzICkge1xuICAgIGNvbnN0IHNlbnRpbmVsRW50cnkgPSBlbnRyaWVzWyAwIF1cbiAgICBjb25zdCBpc1N0dWNrID0gc2VudGluZWxFbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA9PT0gMFxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICByZXR1cm4geyBpc1N0dWNrIH1cbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLSBVVElMU1xuXG4gIG9ic2VydmVJbnRlcnNlY3Rpb24oKSB7XG4gICAgaWYgKCAhd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyICkgcmV0dXJuXG4gICAgY29uc3QgeyB3cmFwcGVyIH0gPSB0aGlzXG4gICAgaWYgKCAhd3JhcHBlciApIHJldHVyblxuICAgIGNvbnN0IHNlbnRpbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggYGRpdmAgKVxuICAgIHNlbnRpbmVsLmNsYXNzTGlzdC5hZGQoIGAke0JBU0VfQ0xBU1N9X19zZW50aW5lbGAgKVxuICAgIHdyYXBwZXIuaW5zZXJ0QmVmb3JlKCBzZW50aW5lbCwgd3JhcHBlci5maXJzdENoaWxkIClcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKCB0aGlzLmhhbmRsZUludGVyc2VjdGlvbiApXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKCBzZW50aW5lbCApXG4gIH1cblxuICB1bm9ic2VydmVJbnRlcnNlY3Rpb24oKSB7XG4gICAgaWYgKCAhd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyICkgcmV0dXJuXG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRpdGxlLCBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgaXNTdHVjayB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IHN0aWNreUNsYXNzID0gWyBgJHtCQVNFX0NMQVNTfV9fc3RpY2t5YCBdXG4gICAgaWYgKCBpc1N0dWNrICkgc3RpY2t5Q2xhc3MucHVzaCggYCR7IHN0aWNreUNsYXNzWyAwIF0gfS0taXMtc3R1Y2tgIClcbiAgICByZXR1cm4gKFxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9eyBCQVNFX0NMQVNTIH0gcmVmPXsgZWwgPT4gdGhpcy53cmFwcGVyID0gZWwgfSA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgc3RpY2t5Q2xhc3Muam9pbignICcpIH0+XG4gICAgICAgICAgeyB0aXRsZSAmJiAoXG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fdGl0bGVgfT57dGl0bGV9PC9oMj5cbiAgICAgICAgICApIH1cbiAgICAgICAgICB7IGNoaWxkcmVuICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fYWN0aW9uc2B9PlxuICAgICAgICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdlNlY29uZGFyeVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCB7IEJ0bkljb24sIEJ1dHRvbiB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25MaXN0KCBwcm9wcyApIHtcbiAgY29uc3QgeyB0eXBlLCAuLi5yZXN0IH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxCdG5JY29uXG4gICAgICBzZWNvbmRhcnlcbiAgICAgIHRvPXtgLyR7cHJvcHMudHlwZX1gfVxuICAgICAgc3ZnSWQ9XCJ2aWV3LWxpc3RcIlxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUHJldmlldyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdHlwZSwgaWQsIC4uLnJlc3QgfSA9IHByb3BzXG4gIHJldHVybiAoXG4gICAgPEJ0bkljb25cbiAgICAgIHNlY29uZGFyeVxuICAgICAgdG89e2AvJHt0eXBlfS8keyBpZCB9L3ByZXZpZXdgfVxuICAgICAgc3ZnSWQ9XCJyZWNlaXB0XCJcbiAgICAgIHsgLi4ucmVzdCB9XG4gICAgLz5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUHJpbnQoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxCdG5JY29uXG4gICAgICBzZWNvbmRhcnlcbiAgICAgIHN2Z0lkPVwicHJpbnRcIlxuICAgICAgb25DbGljaz17IGV2ZW50ID0+IHdpbmRvdy5wcmludCgpIH1cbiAgICAgIGxhYmVsPVwiXy5wcmludFwiXG4gICAgICB7Li4ucHJvcHN9XG4gICAgLz5cbiAgKVxufVxuZXhwb3J0IHsgQnV0dG9uUHJpbnQgYXMgUHJpbnQgfVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uRWRpdCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdHlwZSwgZG9jdW1lbnQsIC4uLnJlc3QgfSA9IHByb3BzXG4gIGNvbnN0IGlzQXJjaGl2ZWQgID0gZG9jdW1lbnQuZ2V0KCBgYXJjaGl2ZWRBdGAgKVxuICBpZiAoIGlzQXJjaGl2ZWQgKSByZXR1cm4gbnVsbFxuICBjb25zdCBpZCAgICAgICAgICA9IGRvY3VtZW50LmdldCggYGlkYCApXG4gIHJldHVybiAoXG4gICAgPEJ0bkljb25cbiAgICAgIHRvPXtgLyR7dHlwZX0vJHsgaWQgfWB9XG4gICAgICBzdmdJZD1cImVkaXRcIlxuICAgICAgeyAuLi5yZXN0IH1cbiAgICAvPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25OZXcoIHByb3BzICkge1xuICBjb25zdCB7IHR5cGUsIGljb24sIG1lc3NhZ2UsLi4ub3RoZXJzIH0gPSBwcm9wc1xuICBjb25zdCBpY29uSWQgPSB0eXBlID09PSBgY3VzdG9tZXJzYCA/IGBwZXJzb24tYWRkYFxuICAgIDogYG5vdGUtYWRkYFxuXG4gIGNvbnN0IHJlbmRlclByb3BzID0geyB0bzogYC8ke3R5cGV9L25ld2AgfVxuICBpZiAoIGljb24gKSByZXR1cm4gPEJ0bkljb24gey4uLnJlbmRlclByb3BzfSBzdmdJZD17IGljb25JZCB9IHsuLi5vdGhlcnN9IC8+XG4gIHJldHVybiAoXG4gICAgPEJ1dHRvblxuICAgICAgey4uLnJlbmRlclByb3BzfVxuICAgICAgey4uLm90aGVyc31cbiAgICA+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17IG1lc3NhZ2UgfSAvPlxuICAgIDwvQnV0dG9uPlxuICApXG59XG5leHBvcnQgeyBCdXR0b25OZXcgYXMgTmV3IH1cblxuZXhwb3J0IGZ1bmN0aW9uIEJ1dHRvblN1Ym1pdCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaXNTYXZpbmcsIGZvcm1JZCwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgY29uc3QgaWNvbklkID0gaXNTYXZpbmcgPyBgYmxvY2tgIDogYHNhdmVgXG4gIHJldHVybiAoXG4gICAgPEJ0bkljb25cbiAgICAgIGZvcm09eyBmb3JtSWQgfVxuICAgICAgZGlzYWJsZWQ9eyBpc1NhdmluZyB9XG4gICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgIHN2Z0lkPXsgaWNvbklkIH1cbiAgICAgIHsuLi5yZXN0fVxuICAgIC8+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgICBzZXJpYWxpemUgICAgICAgICAgICBmcm9tICdmb3JtLXNlcmlhbGl6ZSdcblxuaW1wb3J0ICogYXMgYWNjb3VudCAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvYWNjb3VudCdcbmltcG9ydCB7ICAgIGdldElucHV0VmFsdWUgICB9IGZyb20gJy4uL3V0aWxzL2dldC1pbnB1dC12YWx1ZSdcbmltcG9ydCB7ICAgIEZvcm0gICAgICAgICAgICB9IGZyb20gJy4uL3VpL2Zvcm0nXG5pbXBvcnQgICAgICBTZXR0aW5nRm9ybVByZXMgICBmcm9tICcuL3NldHRpbmdzLnByZXMnXG5cbmV4cG9ydCBjb25zdCBGT1JNX0lEICAgID0gYHNldHRpbmctZm9ybWBcblxuY2xhc3MgU2V0dGluZ0Zvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCBwcm9wcyApIHtcbiAgICBzdXBlciggcHJvcHMgKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmb3JtRGF0YTogdGhpcy5wcm9wcy51c2VyLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQoIHRoaXMgKVxuICAgIHRoaXMuaGFuZGxlRm9ybUNoYW5nZSA9IHRoaXMuaGFuZGxlRm9ybUNoYW5nZS5iaW5kKCB0aGlzIClcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoIG5leHRQcm9wcywgcHJldlN0YXRlICkge1xuICAgIGNvbnN0ICAgdXNlciAgICAgICA9IHByZXZTdGF0ZS5mb3JtRGF0YVxuICAgIGNvbnN0ICAgbmV4dCAgICAgICA9IG5leHRQcm9wcy51c2VyXG4gICAgY29uc3QgeyBpc1NhdmluZyB9ID0gbmV4dFByb3BzXG4gICAgaWYgKCBpc1NhdmluZyApIHJldHVybiBudWxsXG4gICAgLy8gdXBkYXRlIHN0YXRlIG9uIHJlZHV4IHN0YXR1cyBjaGFuZ2VcbiAgICBpZiAodXNlciA9PT0gbmV4dCkgcmV0dXJuIG51bGxcbiAgICByZXR1cm4geyBmb3JtRGF0YTogbmV4dCB9XG4gIH1cblxuICAvLy0tLS0tIEVWRU5UU1xuXG4gIGhhbmRsZVN1Ym1pdCggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGJvZHkgPSBzZXJpYWxpemUoIGV2ZW50LnRhcmdldCwgeyBoYXNoOiB0cnVlLCBlbXB0eTogdHJ1ZSB9IClcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVNldHRpbmdzKHsgYm9keSB9KVxuICB9XG4gIGhhbmRsZUZvcm1DaGFuZ2UoIGV2ZW50ICkge1xuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGdldElucHV0VmFsdWUoIGV2ZW50LnRhcmdldCApXG5cbiAgICB0aGlzLnNldFN0YXRlKCBwcmV2U3RhdGUgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlZCA9IHByZXZTdGF0ZS5mb3JtRGF0YS5zZXQoIG5hbWUsIHZhbHVlIClcbiAgICAgIHJldHVybiB7IGZvcm1EYXRhOiB1cGRhdGVkIH1cbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLSBSRU5ERVJcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBmb3JtRGF0YSB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IHsgaXNTYXZpbmcgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IHJlbmRlclByb3BzID0geyBmb3JtRGF0YSB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZvcm1cbiAgICAgICAgaWQ9eyBgJHtGT1JNX0lEfWAgfVxuICAgICAgICBhY3Rpb249eyBgL2FjY291bnQvc2V0dGluZ3NgIH1cbiAgICAgICAgaXNTYXZpbmc9eyBpc1NhdmluZyB9XG4gICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVGb3JtQ2hhbmdlIH1cbiAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pdCB9XG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgIG5hbWU9XCJpZFwiXG4gICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5nZXQoYGlkYCkgfVxuICAgICAgICAvPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICBuYW1lPVwicXVvdGF0aW9uQ29uZmlnW2lkXVwiXG4gICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5nZXQoYHF1b3RhdGlvbkNvbmZpZy5pZGApIH1cbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgbmFtZT1cImludm9pY2VDb25maWdbaWRdXCJcbiAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLmdldChgaW52b2ljZUNvbmZpZy5pZGApIH1cbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgbmFtZT1cInByb2R1Y3RDb25maWdbaWRdXCJcbiAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLmdldChgcHJvZHVjdENvbmZpZy5pZGApIH1cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdGb3JtUHJlcyB7Li4ucmVuZGVyUHJvcHN9IC8+XG4gICAgICA8L0Zvcm0+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3BzKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHtcbiAgICB1c2VyICAgICA6IHN0YXRlLmFjY291bnQuZ2V0KGB1c2VyYCAgICApLFxuICAgIGlzU2F2aW5nIDogc3RhdGUuYWNjb3VudC5nZXQoYGlzU2F2aW5nYCksXG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2gycHJvcHMgKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgdXBkYXRlU2V0dGluZ3M6IGFjY291bnQudXBkYXRlU2V0dGluZ3MsXG4gIH0sIGRpc3BhdGNoIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcHMsIGRpc3BhdGNoMnByb3BzICkoIFNldHRpbmdGb3JtIClcbiIsImltcG9ydCB7IGVuZm9yY2VOdW1iZXIgfSBmcm9tICcuL2NvbXB1dGUtdG90YWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnB1dFZhbHVlKCB0YXJnZXQgKSB7XG4gIGNvbnN0IHsgbmFtZSwgY2hlY2tlZCwgdHlwZSB9ID0gdGFyZ2V0XG4gIGNvbnN0IHZhbHVlID0gdHlwZSA9PT0gYGNoZWNrYm94YCA/IGNoZWNrZWRcbiAgICA6IHR5cGUgPT09IGBudW1iZXJgID8gZW5mb3JjZU51bWJlciggdGFyZ2V0LnZhbHVlIClcbiAgICA6IHRhcmdldC52YWx1ZVxuXG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICB2YWx1ZSxcbiAgfVxufVxuIiwiaW1wb3J0IGNyaW8gZnJvbSAnY3JpbydcblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kVG9OZWFyZXN0UXVhcnRlciggbnVtYmVyICkge1xuICBjb25zdCByb3VuZGVkID0gTWF0aC5yb3VuZCggbnVtYmVyICogNCApIC8gNFxuICByZXR1cm4gcGFyc2VGbG9hdCggcm91bmRlZC50b0ZpeGVkKDIpLCAxMCApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmZvcmNlTnVtYmVyKCBudW1iZXIgKSB7XG4gIG51bWJlciA9IHR5cGVvZiBudW1iZXIgIT09IGBudW1iZXJgID8gcGFyc2VGbG9hdCggbnVtYmVyLCAxMCApIDogbnVtYmVyXG4gIHJldHVybiBpc05hTiggbnVtYmVyICkgPyAwIDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9kdWN0VG90YWwoIHByb2R1Y3QgKSB7XG4gIGlmICggIXByb2R1Y3QuY2hlY2tlZCApIHJldHVybiAwXG4gIC8vIGRvbid0IG11dGF0ZSBwcm9kdWN0XG4gIGNvbnN0IGNsZWFuZWRQcm9kdWN0ID0ge31cbiAgO1tgcXVhbnRpdHlgLCBgcHJpY2VgXS5mb3JFYWNoKCBrZXkgPT4ge1xuICAgIGNsZWFuZWRQcm9kdWN0WyBrZXkgXSA9IGVuZm9yY2VOdW1iZXIoIHByb2R1Y3RbIGtleSBdIClcbiAgfSlcbiAgY29uc3QgeyBxdWFudGl0eSwgcHJpY2UgfSA9IGNsZWFuZWRQcm9kdWN0XG4gIHJldHVybiByb3VuZFRvTmVhcmVzdFF1YXJ0ZXIoIHF1YW50aXR5ICogcHJpY2UgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG90YWxzKCBkb2N1bWVudCApIHtcbiAgY29uc3QgeyBwcm9kdWN0cywgdGF4ID0gMCB9ID0gZG9jdW1lbnRcbiAgaWYgKCAhY3Jpby5pc0FycmF5KHByb2R1Y3RzKSApIHJldHVybiBkb2N1bWVudFxuICBjb25zdCB0YXhSYXRlICA9IGVuZm9yY2VOdW1iZXIoIHRheCApXG4gIGNvbnN0IHRvdGFsTmV0ID0gcHJvZHVjdHNcbiAgICAucmVkdWNlKCAoYWNjLCBwcm9kdWN0KSA9PiBhY2MgKyBwcm9kdWN0VG90YWwoIHByb2R1Y3QgKSwgMCApXG4gIGNvbnN0IHRvdGFsVGF4ID0gcm91bmRUb05lYXJlc3RRdWFydGVyKCB0b3RhbE5ldCAqIHRheFJhdGUgLyAxMDAgKVxuICBjb25zdCB0b3RhbCAgICA9IHRvdGFsTmV0ICsgdG90YWxUYXhcbiAgcmV0dXJuIHtcbiAgICB0b3RhbE5ldCxcbiAgICB0b3RhbFRheCxcbiAgICB0b3RhbCxcbiAgfVxufVxuIiwiaW1wb3J0ICAgICAgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgICAgICBjcmlvICBmcm9tICdjcmlvJ1xuaW1wb3J0ICogYXMgSW50bCAgZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0ICogYXMgY29tcHV0ZSAgICAgICAgZnJvbSAnLi4vdXRpbHMvY29tcHV0ZS10b3RhbCdcbmltcG9ydCAqIGFzIFBhcGVyICAgICAgICAgIGZyb20gJy4uL2xheW91dC9wYXBlci1zaGVldCdcbmltcG9ydCAqIGFzIFRhYnMgICAgICAgICAgIGZyb20gJy4uL3VpL3RhYnMnXG5pbXBvcnQgKiBhcyBGaWVsZCAgICAgICAgICBmcm9tICcuLi91aS9maWVsZCdcbmltcG9ydCB7ICAgIEFsZXJ0ICAgICAgICB9IGZyb20gJy4uL3VpL2FsZXJ0cydcbmltcG9ydCB7ICAgIEJ1dHRvbiAgICAgICB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5pbXBvcnQgeyAgICBGb3JtQWN0aW9ucyAgfSBmcm9tICcuLi91aS9mb3JtJ1xuaW1wb3J0IHsgICAgUHJvZHVjdFRhYmxlIH0gZnJvbSAnLi4vdWktdGFibGUvcHJvZHVjdHMnXG5cbmltcG9ydCAnLi9zZXR0aW5ncy5wcmVzLnNjc3MnXG5leHBvcnQgY29uc3QgQkFTRV9DTEFTUyA9IGBzZXR0aW5nLWZvcm1gXG5leHBvcnQgY29uc3QgRk9STV9JRCAgICA9IEJBU0VfQ0xBU1NcblxuY29uc3QgY3VzdG9tZXJFeGFtcGxlID0ge1xuICBuYW1lOiBgQ3VzdG9tZXIgbmFtZWAsXG4gIGFkZHJlc3M6IGAxMjMgNnRoIFN0LlxuX19NZWxib3VybmUsIEZMIDMyOTA0X19cbkFVU1RSQUxJQWBcbn1cbmNvbnN0IGN1cnJlbmNpZXMgPSBbXG4gIHt2YWx1ZTogYFVTRGAsIGxhYmVsOiBgVVNEYH0sXG4gIHt2YWx1ZTogYEVVUmAsIGxhYmVsOiBgRVVSYH0sXG5dXG5jb25zdCBsYW5ndWFnZXMgPSBbXG4gIHt2YWx1ZTogYGZyYCwgbGFiZWw6IGBmcmFuw6dhaXNgfSxcbiAge3ZhbHVlOiBgZW5gLCBsYWJlbDogYGVuZ2xpc2hgfSxcbl1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2V0dGluZ0Zvcm1QcmVzKCBwcm9wcyApIHtcbiAgY29uc3QgeyBmb3JtRGF0YSAgfSA9IHByb3BzXG4gIGNvbnN0IHtcbiAgICBxdW90YXRpb25Db25maWcsXG4gICAgaW52b2ljZUNvbmZpZyxcbiAgICBwcm9kdWN0Q29uZmlnLFxuICB9ID0gZm9ybURhdGFcbiAgY29uc3QgZmFrZVF1b3RhdGlvblJlZmVyZW5jZSA9IHtcbiAgICB0eXBlOiBgcXVvdGF0aW9uYCxcbiAgICBwcm9kdWN0OiB7XG4gICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9VVENTdHJpbmcoKSxcbiAgICAgIHJlZmVyZW5jZTogYCR7cXVvdGF0aW9uQ29uZmlnLnByZWZpeH0ke3F1b3RhdGlvbkNvbmZpZy5zdGFydEF0fWAsXG4gICAgfSxcbiAgfVxuICBjb25zdCBmYWtlSW52b2ljZVJlZmVyZW5jZSA9IHtcbiAgICB0eXBlOiBgaW52b2ljZWAsXG4gICAgcHJvZHVjdDoge1xuICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCksXG4gICAgICByZWZlcmVuY2U6IGAke2ludm9pY2VDb25maWcucHJlZml4fSR7aW52b2ljZUNvbmZpZy5zdGFydEF0fWAsXG4gICAgfSxcbiAgfVxuXG4gIGxldCBmYWtlRG9jdW1lbnQgPSBjcmlvKHtcbiAgICBwcm9kdWN0czogW3tcbiAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogYGEgX19wcm9kdWN0X18gZXhhbXBsZWAsXG4gICAgICBxdWFudGl0eTogMixcbiAgICAgIHByaWNlOiBwcm9kdWN0Q29uZmlnLnByaWNlLFxuICAgIH0se1xuICAgICAgY2hlY2tlZDogdHJ1ZSxcbiAgICAgIC4uLnByb2R1Y3RDb25maWdcbiAgICB9XSxcbiAgICB0YXg6IHF1b3RhdGlvbkNvbmZpZy50YXgsXG5cbiAgfSlcbiAgZmFrZURvY3VtZW50ID0gZmFrZURvY3VtZW50Lm1lcmdlKCBudWxsLCBjb21wdXRlLnRvdGFscyhmYWtlRG9jdW1lbnQpIClcblxuICByZXR1cm4gKFxuICAgIDxUYWJzLldyYXBwZXI+XG4gICAgICA8VGFicy5MaXN0PlxuICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgPEludGwuRm9ybWF0dGVkTWVzc2FnZSBpZD1cImNvbmZpZ3VyYXRpb24udGFiLmZyb21cIiAvPlxuICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgPEludGwuRm9ybWF0dGVkTWVzc2FnZSBpZD1cImNvbmZpZ3VyYXRpb24udGFiLmRlZmF1bHQtcHJvZHVjdFwiIC8+XG4gICAgICAgIDwvVGFicy5UYWI+XG4gICAgICAgIDxUYWJzLlRhYj5cbiAgICAgICAgICA8SW50bC5Gb3JtYXR0ZWRNZXNzYWdlIGlkPVwiY29uZmlndXJhdGlvbi50YWIubWVudGlvbnNcIiAvPlxuICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgPEludGwuRm9ybWF0dGVkTWVzc2FnZSBpZD1cImNvbmZpZ3VyYXRpb24udGFiLnJlZmVyZW5jZVwiIC8+XG4gICAgICAgIDwvVGFicy5UYWI+XG4gICAgICA8L1RhYnMuTGlzdD5cblxuICAgICAgey8qIFVTRVIgKi99XG4gICAgICA8VGFicy5QYW5lbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X191c2VyYH0+XG4gICAgICAgICAgPEZpZWxkLlNlbGVjdFxuICAgICAgICAgICAgbmFtZT1cImxhbmdcIlxuICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5sYW5ndWFnZVwiXG4gICAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLmxhbmcgfVxuICAgICAgICAgICAgb3B0aW9ucz17IGxhbmd1YWdlcyB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RmllbGQuU2VsZWN0XG4gICAgICAgICAgICBuYW1lPVwiY3VycmVuY3lcIlxuICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5jdXJyZW5jeVwiXG4gICAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLmN1cnJlbmN5IH1cbiAgICAgICAgICAgIG9wdGlvbnM9eyBjdXJyZW5jaWVzIH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxQYXBlci5TaGVldCBwYXJ0PVwidG9wLWxlZnRcIj5cbiAgICAgICAgICAgIDxQYXBlci5QYXJ0eSB0aXRsZT1cImZyb21cIiBwZW9wbGU9e2Zvcm1EYXRhfSAvPlxuICAgICAgICAgIDwvUGFwZXIuU2hlZXQ+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X191c2VyLWZvcm1gfT5cbiAgICAgICAgICAgIDxGaWVsZC5JbnB1dFxuICAgICAgICAgICAgICBuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQubmFtZVwiXG4gICAgICAgICAgICAgIHZhbHVlPXsgZm9ybURhdGEubmFtZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEZpZWxkLlRleHRhcmVhXG4gICAgICAgICAgICAgIG5hbWU9XCJhZGRyZXNzXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5hZGRyZXNzXCJcbiAgICAgICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5hZGRyZXNzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9UYWJzLlBhbmVsPlxuXG4gICAgICB7LyogUFJPRFVDVCAqL31cbiAgICAgIDxUYWJzLlBhbmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3Byb2R1Y3RgfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3Byb2R1Y3QtZm9ybWB9PlxuICAgICAgICAgICAgPEZpZWxkLklucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJwcm9kdWN0Q29uZmlnW3F1YW50aXR5XVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQucXVhbnRpdHlcIlxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgdmFsdWU9eyBwcm9kdWN0Q29uZmlnLnF1YW50aXR5IH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8RmllbGQuSW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cInByb2R1Y3RDb25maWdbcHJpY2VdXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5kZWZhdWx0LXByaWNlXCJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIHZhbHVlPXsgcHJvZHVjdENvbmZpZy5wcmljZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEZpZWxkLklucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJxdW90YXRpb25Db25maWdbdGF4XVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQudGF4XCJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIHZhbHVlPXsgcXVvdGF0aW9uQ29uZmlnLnRheCB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxQcm9kdWN0VGFibGVcbiAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICBkb2N1bWVudD17IGZha2VEb2N1bWVudCB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1RhYnMuUGFuZWw+XG5cbiAgICAgIHsvKiBNRU5USU9OUyAqL31cbiAgICAgIDxUYWJzLlBhbmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX21lbnRpb25zYH0+XG4gICAgICAgICAgPEZpZWxkLlRleHRhcmVhXG4gICAgICAgICAgICBuYW1lPVwicXVvdGF0aW9uQ29uZmlnW21lbnRpb25zXVwiXG4gICAgICAgICAgICBsYWJlbD1cImNvbmZpZ3VyYXRpb24ubWVudGlvbnMucXVvdGF0aW9uc1wiXG4gICAgICAgICAgICB2YWx1ZT17IHF1b3RhdGlvbkNvbmZpZy5tZW50aW9ucyB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UGFwZXIuU2hlZXQgcGFydD1cImJvdHRvbVwiPlxuICAgICAgICAgICAgPFBhcGVyLk1lbnRpb25zIGNvbnRlbnQ9eyBxdW90YXRpb25Db25maWcubWVudGlvbnMgfS8+XG4gICAgICAgICAgPC9QYXBlci5TaGVldD5cbiAgICAgICAgICA8RmllbGQuVGV4dGFyZWFcbiAgICAgICAgICAgIG5hbWU9XCJpbnZvaWNlQ29uZmlnW21lbnRpb25zXVwiXG4gICAgICAgICAgICBsYWJlbD1cImNvbmZpZ3VyYXRpb24ubWVudGlvbnMuaW52b2ljZXNcIlxuICAgICAgICAgICAgdmFsdWU9eyBpbnZvaWNlQ29uZmlnLm1lbnRpb25zIH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxQYXBlci5TaGVldCBwYXJ0PVwiYm90dG9tXCI+XG4gICAgICAgICAgICA8UGFwZXIuTWVudGlvbnMgY29udGVudD17IGludm9pY2VDb25maWcubWVudGlvbnMgfS8+XG4gICAgICAgICAgPC9QYXBlci5TaGVldD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1RhYnMuUGFuZWw+XG5cbiAgICAgIHsvKiBSRUZFUkVOQ0VTICovfVxuICAgICAgPFRhYnMuUGFuZWw+XG4gICAgICAgIDxBbGVydCBkYW5nZXI+XG4gICAgICAgICAgPEludGwuRm9ybWF0dGVkSFRNTE1lc3NhZ2UgaWQ9XCJjb25maWd1cmF0aW9uLnJlZmVyZW5jZS53YXJuaW5nXCIgLz5cbiAgICAgICAgPC9BbGVydD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19yZWZlcmVuY2VzYH0+XG4gICAgICAgICAgPGRsIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3JlZmVyZW5jZXMtc2VjdGlvbmB9PlxuICAgICAgICAgICAgPGR0IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3N1Yi10aXRsZWB9PlxuICAgICAgICAgICAgICA8SW50bC5Gb3JtYXR0ZWRNZXNzYWdlIGlkPVwicGFnZS5xdW90YXRpb25zXCIgLz5cbiAgICAgICAgICAgIDwvZHQ+XG4gICAgICAgICAgICA8ZGQgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcmVmZXJlbmNlcy1jb250ZW50YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcmVmZXJlbmNlcy1mb3JtYH0+XG4gICAgICAgICAgICAgICAgPEZpZWxkLklucHV0XG4gICAgICAgICAgICAgICAgICBuYW1lPVwicXVvdGF0aW9uQ29uZmlnW3ByZWZpeF1cIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5wcmVmaXhcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9eyBxdW90YXRpb25Db25maWcucHJlZml4IH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxGaWVsZC5JbnB1dFxuICAgICAgICAgICAgICAgICAgbmFtZT1cInF1b3RhdGlvbkNvbmZpZ1tzdGFydEF0XVwiXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLnN0YXJ0LWF0XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXsgcXVvdGF0aW9uQ29uZmlnLnN0YXJ0QXQgfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPFBhcGVyLlNoZWV0IHBhcnQ9XCJ0b3AtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8UGFwZXIuUmVmZXJlbmNlIHsuLi5mYWtlUXVvdGF0aW9uUmVmZXJlbmNlfSAvPlxuICAgICAgICAgICAgICA8L1BhcGVyLlNoZWV0PlxuICAgICAgICAgICAgPC9kZD5cbiAgICAgICAgICA8L2RsPlxuICAgICAgICAgIDxkbCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19yZWZlcmVuY2VzLXNlY3Rpb25gfT5cbiAgICAgICAgICAgIDxkdCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19zdWItdGl0bGVgfT5cbiAgICAgICAgICAgICAgPEludGwuRm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UuaW52b2ljZXNcIiAvPlxuICAgICAgICAgICAgPC9kdD5cbiAgICAgICAgICAgIDxkZCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19yZWZlcmVuY2VzLWNvbnRlbnRgfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19yZWZlcmVuY2VzLWZvcm1gfT5cbiAgICAgICAgICAgICAgICA8RmllbGQuSW5wdXRcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJpbnZvaWNlQ29uZmlnW3ByZWZpeF1cIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5wcmVmaXhcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9eyBpbnZvaWNlQ29uZmlnLnByZWZpeCB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8RmllbGQuSW5wdXRcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJpbnZvaWNlQ29uZmlnW3N0YXJ0QXRdXCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQuc3RhcnQtYXRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9eyBpbnZvaWNlQ29uZmlnLnN0YXJ0QXQgfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgICAgIHN0ZXA9XCIxXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPFBhcGVyLlNoZWV0IHBhcnQ9XCJ0b3AtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8UGFwZXIuUmVmZXJlbmNlIHsuLi5mYWtlSW52b2ljZVJlZmVyZW5jZX0gLz5cbiAgICAgICAgICAgICAgPC9QYXBlci5TaGVldD5cbiAgICAgICAgICAgIDwvZGQ+XG4gICAgICAgICAgPC9kbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1RhYnMuUGFuZWw+XG5cbiAgICAgIHsvKiBBQ1RJT05TICovfVxuICAgICAgPEZvcm1BY3Rpb25zPlxuICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICA8SW50bC5Gb3JtYXR0ZWRNZXNzYWdlIGlkPVwiY29uZmlndXJhdGlvbi5idXR0b24uc2F2ZVwiIC8+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Gb3JtQWN0aW9ucz5cbiAgICA8L1RhYnMuV3JhcHBlcj5cbiAgKVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCB7IERheSwgTWFya2Rvd24gfSBmcm9tICcuLi91aS9mb3JtYXQnXG5cbmltcG9ydCAnLi9wYXBlci1zaGVldC5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBwYXBlci1zaGVldGBcblxuZXhwb3J0IGZ1bmN0aW9uIFBhcGVyU2hlZXQoIHByb3BzICkge1xuICBjb25zdCB7IHBhcnQsIHByZXZpZXcgfSA9IHByb3BzXG4gIGNvbnN0IGNsYXNzTmFtZSA9IFsgQkFTRV9DTEFTUyBdXG4gIGlmICggcGFydCApIGNsYXNzTmFtZS5wdXNoKGAke0JBU0VfQ0xBU1N9LS1wYXJ0LSR7cGFydH1gIClcbiAgaWYgKCBwcmV2aWV3ICkgY2xhc3NOYW1lLnB1c2goYCR7QkFTRV9DTEFTU30tLXByZXZpZXctbW9kZWAgKVxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWUuam9pbihgIGApfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvZGl2PlxuICApXG59XG5leHBvcnQgeyBQYXBlclNoZWV0IGFzIFNoZWV0IH1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlZmVyZW5jZSggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdHlwZSwgcHJvZHVjdCB9ID0gcHJvcHNcbiAgY29uc3QgeyB1cGRhdGVkQXQsIHJlZmVyZW5jZSB9ID0gcHJvZHVjdFxuICBjb25zdCBSRUZfQ0xBU1MgPSBgJHtCQVNFX0NMQVNTfV9fcmVmZXJlbmNlYFxuICByZXR1cm4gKFxuICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtSRUZfQ0xBU1N9PlxuICAgICAgPGgzIGNsYXNzTmFtZT17YCR7UkVGX0NMQVNTfS10eXBlYH0+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtgcGFwZXItc2hlZXQucmVmZXJlbmNlLiR7IHR5cGUgfWB9IC8+XG4gICAgICA8L2gzPlxuICAgICAgPGg0IGNsYXNzTmFtZT17YCR7UkVGX0NMQVNTfS1pZGB9PlJlZi4geyByZWZlcmVuY2UgfTwvaDQ+XG4gICAgICA8cCBjbGFzc05hbWU9e2Ake1JFRl9DTEFTU30tZGF0ZWB9PlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17YHBhcGVyLXNoZWV0LnJlZmVyZW5jZS5kYXRlYH0gLz5cbiAgICAgICAgPERheSB2YWx1ZT17IHVwZGF0ZWRBdCB9IC8+XG4gICAgICA8L3A+XG4gICAgPC9oZWFkZXI+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEJldHdlZW4oIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fYmV0d2VlbmB9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBhcnR5KCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIHRpdGxlLFxuICAgIHBlb3BsZSA9IHt9LFxuICB9ID0gcHJvcHNcbiAgY29uc3QgUEFSVFlfQ0xBU1MgPSBgJHtCQVNFX0NMQVNTfV9fcGFydHlgXG4gIGNvbnN0IGFkZHJlc3MgICAgID0gcGVvcGxlLmFkZHJlc3NcbiAgcmV0dXJuIChcbiAgICA8YXNpZGUgY2xhc3NOYW1lPXtgJHtQQVJUWV9DTEFTU31gfT5cbiAgICAgIDxwIGNsYXNzTmFtZT17YCR7UEFSVFlfQ0xBU1N9LXRpdGxlYH0+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtgcGFwZXItc2hlZXQucGFydHkuJHsgdGl0bGUgfWB9IC8+XG4gICAgICA8L3A+XG4gICAgICA8aDQgY2xhc3NOYW1lPXtgJHtQQVJUWV9DTEFTU30tbmFtZWB9PlxuICAgICAgICB7IHBlb3BsZS5uYW1lID8gcGVvcGxlLm5hbWUgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPXtgJHtQQVJUWV9DTEFTU30tYWRkcmVzcyAke1BBUlRZX0NMQVNTfS1uYW1lLS1lbXB0eWB9PlxuICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9e2BwYXBlci1zaGVldC5wYXJ0eS5uby1uYW1lLiR7dGl0bGV9YH0vPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvaDQ+XG4gICAgICB7IGFkZHJlc3MgPyA8TWFya2Rvd24gdGV4dD17IGFkZHJlc3MgfSAvPiA6IChcbiAgICAgICAgPHAgY2xhc3NOYW1lPXtgJHtQQVJUWV9DTEFTU30tYWRkcmVzcyAke1BBUlRZX0NMQVNTfS1hZGRyZXNzLS1lbXB0eWB9PlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtgcGFwZXItc2hlZXQucGFydHkubm8tYWRkcmVzcy4ke3RpdGxlfWB9IC8+XG4gICAgICAgIDwvcD5cbiAgICAgICl9XG4gICAgPC9hc2lkZT5cbiAgKVxufVxuXG5leHBvcnQgY29uc3QgUGFydHlVc2VyID0gY29ubmVjdChcbiAgc3RhdGUgPT4gKHt1c2VyOiBzdGF0ZS5hY2NvdW50LmdldChgdXNlcmApfSlcbikoIHByb3BzID0+IDxQYXJ0eSB0aXRsZT1cImZyb21cIiBwZW9wbGU9e3Byb3BzLnVzZXJ9Lz4gKVxuXG5leHBvcnQgZnVuY3Rpb24gU3ViamVjdCggcHJvcHMgKSB7XG4gIGNvbnN0IENPTVBfQ0xBU1MgPSBgJHtCQVNFX0NMQVNTfV9fc3ViamVjdGBcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17IENPTVBfQ0xBU1MgfT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17YCR7Q09NUF9DTEFTU30tdGl0bGVgfT5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYXBlci1zaGVldC5zdWJqZWN0XCIgLz5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17YCR7Q09NUF9DTEFTU30tY29udGVudGB9PnsgcHJvcHMudmFsdWV9PC9zcGFuPlxuICAgIDwvZGl2PlxuICApXG59XG5leHBvcnQgeyBQYXJ0eVVzZXIgYXMgVXNlciB9XG5cbmV4cG9ydCBmdW5jdGlvbiBNZW50aW9ucyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgY29udGVudCB9ID0gcHJvcHNcbiAgY29uc3QgTUVOVElPTlNfQ0xBU1MgPSBgJHtCQVNFX0NMQVNTfV9fbWVudGlvbnNgXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2Ake01FTlRJT05TX0NMQVNTfWB9PlxuICAgICAgPE1hcmtkb3duIHRleHQ9e2NvbnRlbnR9IC8+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgUHJvcFR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICB9ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTnVtYmVyLCBGb3JtYXR0ZWREYXRlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCAgIG1hcmtlZCAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ21hcmtlZCdcblxuaW1wb3J0ICcuL2Zvcm1hdC5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBmb3JtYXRgXG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoIHZhbHVlICkge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUZsb2F0KCB2YWx1ZSwgMTAgKVxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKCB2YWx1ZSApID8gdmFsdWVcbiAgICA6ICFOdW1iZXIuaXNOYU4oIHBhcnNlZCApID8gcGFyc2VkXG4gICAgOiBudWxsXG59XG5cbi8vIHJlYWN0LWludGwgZG9jXG4vLyDigKIgaHR0cHM6Ly9naXRodWIuY29tL3lhaG9vL3JlYWN0LWludGwvd2lraS9Db21wb25lbnRzI2Zvcm1hdHRlZGRhdGVcbi8vIOKAoiBodHRwczovL2dpdGh1Yi5jb20veWFob28vcmVhY3QtaW50bC93aWtpL0NvbXBvbmVudHMjZm9ybWF0dGVkbnVtYmVyXG5cbmV4cG9ydCBmdW5jdGlvbiBBbW91bnRQcmVzKCBwcm9wcyApIHtcbiAgY29uc3QgeyB2YWx1ZSwgY3VycmVuY3ksIC4uLm90aGVyc30gPSBwcm9wc1xuICBvdGhlcnMuc3R5bGUgPSBgY3VycmVuY3lgXG4gIGNvbnN0IHNhZmVWYWx1ZSA9IHBhcnNlVmFsdWUoIHZhbHVlIClcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9ICR7QkFTRV9DTEFTU30tLWN1cnJlbmN5YH0+XG4gICAgICB7IHNhZmVWYWx1ZSA9PT0gbnVsbCA/IGDigJNgIDogPEZvcm1hdHRlZE51bWJlciB2YWx1ZT17IHZhbHVlIH0gY3VycmVuY3k9eyBjdXJyZW5jeSB9IHsuLi5vdGhlcnN9ICAvPiB9XG4gICAgPC9zcGFuPlxuICApXG59XG5cbmV4cG9ydCBjb25zdCBBbW91bnQgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGN1cnJlbmN5OiBzdGF0ZS5hY2NvdW50LmdldCggYHVzZXIuY3VycmVuY3lgICksXG4gIH0pXG4pKCBBbW91bnRQcmVzIClcblxuQW1vdW50LnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5udW1iZXIsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXROdW1iZXIoIHByb3BzICkge1xuICBjb25zdCB7IHZhbHVlLCB3cmFwcGVyUHJvcHMgPSB7fSwgLi4ub3RoZXJzfSA9IHByb3BzXG4gIGNvbnN0IHNhZmVWYWx1ZSA9IHBhcnNlVmFsdWUoIHZhbHVlIClcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9ICR7QkFTRV9DTEFTU30tLW51bWJlcmB9IHsuLi53cmFwcGVyUHJvcHN9PlxuICAgICAgeyBzYWZlVmFsdWUgPT09IG51bGwgPyBg4oCTYCA6IDxGb3JtYXR0ZWROdW1iZXIgdmFsdWU9eyB2YWx1ZSB9IHsuLi5vdGhlcnN9ICAvPiB9XG4gICAgPC9zcGFuPlxuICApXG59XG5leHBvcnQgeyBGb3JtYXROdW1iZXIgYXMgTnVtIH1cblxuZXhwb3J0IGZ1bmN0aW9uIFBlcmNlbnQoIHByb3BzICkge1xuICBjb25zdCB7IHZhbHVlLCBjbGFzc05hbWUsIC4uLm90aGVyc30gPSBwcm9wc1xuICBvdGhlcnMuc3R5bGUgPSBgcGVyY2VudGBcbiAgY29uc3Qgc2FmZVZhbHVlID0gcGFyc2VWYWx1ZSggdmFsdWUgKVxuICBjb25zdCBDT01QX0NMQVNTID0gW1xuICAgIEJBU0VfQ0xBU1MsXG4gICAgYCR7QkFTRV9DTEFTU30tLXBlcmNlbnRgLFxuICBdXG4gIGlmICggY2xhc3NOYW1lICkgQ09NUF9DTEFTUy5wdXNoKCBjbGFzc05hbWUgKVxuICByZXR1cm4gKFxuICAgIDxwIGNsYXNzTmFtZT17Q09NUF9DTEFTUy5qb2luKGAgYCl9PlxuICAgICAgeyBzYWZlVmFsdWUgPT09IG51bGwgPyBg4oCTYCA6IDxGb3JtYXR0ZWROdW1iZXIgdmFsdWU9eyB2YWx1ZSB9IHsuLi5vdGhlcnN9ICAvPiB9XG4gICAgPC9wPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXkoIHByb3BzICkge1xuICBpZiAoICFwcm9wcy52YWx1ZSApIHJldHVybiA8c3Bhbj7igJM8L3NwYW4+XG4gIHJldHVybiA8Rm9ybWF0dGVkRGF0ZSB2YWx1ZT17IHByb3BzLnZhbHVlIH0gLz5cbn1cbkRheS5wcm9wVHlwZXMgPSB7XG4gIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXJrZG93biggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdGV4dCB9ICA9IHByb3BzXG4gIGNvbnN0IGlzVGV4dCAgICA9IHR5cGVvZiB0ZXh0ID09PSBgc3RyaW5nYFxuICBjb25zdCBfX2h0bWwgICAgPSBpc1RleHQgPyBtYXJrZWQoIHRleHQsIHticmVha3M6IHRydWV9ICkgOiBgYFxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWFya2Rvd25cIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbH19IC8+XG4gIClcbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWFya2VkXCIpOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0ICcuL3RhYnMuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgdGFic2BcblxuZXhwb3J0IGZ1bmN0aW9uIFRhYnMoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXsgQkFTRV9DTEFTUyB9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9kaXY+XG4gIClcbn1cbmV4cG9ydCB7IFRhYnMgYXMgV3JhcHBlciB9XG5cbmV4cG9ydCBjbGFzcyBUYWJMaXN0IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG5cbiAgICB0aGlzLnRhYnNJZHMgPSBbXVxuICAgIHRoaXMubWFrZVRhYnMoKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkOiAwLFxuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCggdGhpcyApXG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoIGV2ZW50ICkge1xuICAgIC8vIHdlIGRvbid0IHdhbnQgdGhlIGV2ZW50IHRvIGxlYWsgdG8gbWFpbiBmb3JtXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAvLyBjaGFuZ2UgdGFiIF5eXG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0XG4gICAgdGhpcy5zZXRTdGF0ZSggcHJldlN0YXRlID0+IHtcbiAgICAgIHJldHVybiB7IHNlbGVjdGVkOiBwYXJzZUludCggdmFsdWUsIDEwICkgfVxuICAgIH0pXG4gIH1cblxuICBtYWtlVGFicygpIHtcbiAgICBsZXQgY291bnQgPSAwXG4gICAgdGhpcy50YWJzQ29udGVudCA9IFJlYWN0LkNoaWxkcmVuLm1hcCggdGhpcy5wcm9wcy5jaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgICAgY29uc3QgaXNUYWIgPSBjaGlsZC50eXBlID09PSBUYWJcbiAgICAgIGlmICggIWlzVGFiICkgcmV0dXJuIGNoaWxkXG4gICAgICBjb3VudCAgICAgPSBjb3VudCArIDFcbiAgICAgIGNvbnN0IGlkICA9IGB0YWJzLSR7Y291bnR9YFxuICAgICAgdGhpcy50YWJzSWRzLnB1c2goIGlkIClcbiAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoIGNoaWxkLCB7aHRtbEZvcjogaWR9IClcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG5cbiAgICAgICAgeyB0aGlzLnRhYnNJZHMubWFwKCAoaWQsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19pbnB1dGB9XG4gICAgICAgICAgICBrZXk9eyBpZCB9XG4gICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgbmFtZT1cInRhYnNcIlxuICAgICAgICAgICAgdmFsdWU9eyBpbmRleCB9XG4gICAgICAgICAgICBpZD17IGlkIH1cbiAgICAgICAgICAgIGNoZWNrZWQ9eyBpbmRleCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZCB9XG4gICAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICAvPlxuICAgICAgICApKSB9XG4gICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fbGlzdGB9PlxuICAgICAgICAgIHsgdGhpcy50YWJzQ29udGVudCB9XG4gICAgICAgIDwvaGVhZGVyPlxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApXG4gIH1cbn1cbmV4cG9ydCB7IFRhYkxpc3QgYXMgTGlzdCB9XG5cbmV4cG9ydCBmdW5jdGlvbiBUYWJMaXN0SGVhZGVyKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2xpc3RfaGVhZGVyYH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L2Rpdj5cbiAgKVxufVxuZXhwb3J0IHsgVGFiTGlzdEhlYWRlciBhcyBIZWFkZXIgfVxuXG5leHBvcnQgZnVuY3Rpb24gVGFiKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8bGFiZWwgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fbGlzdF90YWJgfSB7Li4ucHJvcHN9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9sYWJlbD5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVGFiUGFuZWwoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3BhbmVsYH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L3NlY3Rpb24+XG4gIClcbn1cbmV4cG9ydCB7IFRhYlBhbmVsIGFzIFBhbmVsIH1cbiIsImltcG9ydCBSZWFjdCAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuaW1wb3J0ICcuL2FsZXJ0cy5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBhbGVydGBcblxuZXhwb3J0IGZ1bmN0aW9uIEFsZXJ0KCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIHdhcm5pbmcgPSBmYWxzZSxcbiAgICBkYW5nZXIgPSBmYWxzZSxcbiAgICBjbGFzc05hbWUsXG4gIH0gPSBwcm9wc1xuICBjb25zdCBDT01QX0NMQVNTID0gY2xhc3NOYW1lcyggQkFTRV9DTEFTUywge1xuICAgIFtgJHtCQVNFX0NMQVNTfS0td2FybmluZ2BdOiB3YXJuaW5nLFxuICAgIFtgJHtCQVNFX0NMQVNTfS0tZGFuZ2VyYCBdOiBkYW5nZXIgLFxuICB9LCBjbGFzc05hbWUpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17IENPTVBfQ0xBU1MgfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgICBjbGFzc05hbWVzICAgICAgICAgZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0ICAgUHJvcFR5cGVzICAgICAgICAgIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgICBjcmlvICAgICAgICAgICAgICAgZnJvbSAnY3JpbydcblxuaW1wb3J0ICogYXMgY29tcHV0ZSAgICAgICAgICAgICAgZnJvbSAnLi4vdXRpbHMvY29tcHV0ZS10b3RhbCdcbmltcG9ydCAqIGFzIEZvcm1hdCAgICAgICAgICAgICAgIGZyb20gJy4uL3VpL2Zvcm1hdCdcbmltcG9ydCB7ICAgIENoZWNrQm94ICAgICAgICAgICB9IGZyb20gJy4uL3VpL2ZpZWxkJ1xuaW1wb3J0IHsgICAgVGV4dGFyZWFBdXRvUmVzaXplIH0gZnJvbSAnLi4vdWkvdGV4dGFyZWEtYXV0by1yZXNpemUnXG5pbXBvcnQgeyAgICBCdG5JY29uICAgICAgICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0ICogYXMgVGFibGUgICAgICAgICAgICAgICAgZnJvbSAnLi9pbmRleCdcblxuLy8gb25seSB1c2UgZGVmYXVsdFZhbHVlXG4vLyDigKIgaGFuZGxlQ2hhbmdlIGlzIGhhbmRsZWQgZ2xvYmFsbHkgYXQgdGhlIGZvcm0gbGV2ZWxcbmV4cG9ydCBmdW5jdGlvbiBQcm9kdWN0TGluZUVkaXRhYmxlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBwcm9kdWN0LCBpc0xhc3QsIGluZGV4LCBoYW5kbGVSZW1vdmUgfSA9IHByb3BzXG4gIGNvbnN0IGZpZWxkUGF0aCA9IGBwcm9kdWN0c1skeyBpbmRleCB9XWBcbiAgY29uc3QgdG90YWwgICAgID0gY29tcHV0ZS5wcm9kdWN0VG90YWwoIHByb2R1Y3QgKVxuICByZXR1cm4gKFxuICAgIDxUYWJsZS5Sb3c+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgeyAhaXNMYXN0ICYmIChcbiAgICAgICAgICA8Q2hlY2tCb3hcbiAgICAgICAgICAgIG5hbWU9eyBgJHtmaWVsZFBhdGh9W2NoZWNrZWRdYCB9XG4gICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZD17IHByb2R1Y3QuZ2V0KGBjaGVja2VkYCkgfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgbmFtZT17YCR7ZmllbGRQYXRofVtfaWRdYH1cbiAgICAgICAgICB2YWx1ZT17IHByb2R1Y3QuZ2V0KGBfaWRgKSB9XG4gICAgICAgIC8+XG4gICAgICAgIDxUZXh0YXJlYUF1dG9SZXNpemVcbiAgICAgICAgICBuYW1lPXtgJHtmaWVsZFBhdGh9W2Rlc2NyaXB0aW9uXWB9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXsgcHJvZHVjdC5nZXQoYGRlc2NyaXB0aW9uYCkgfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwicHJvZHVjdC5wbGFjZS1ob2xkZXJcIlxuICAgICAgICAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgIHN0ZXA9XCIwLjI1XCJcbiAgICAgICAgICBuYW1lPXsgYCR7ZmllbGRQYXRofVtxdWFudGl0eV1gIH1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9eyBwcm9kdWN0LmdldChgcXVhbnRpdHlgKSB9XG4gICAgICAgIC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgc3RlcD1cIjAuNVwiXG4gICAgICAgICAgbmFtZT17IGAke2ZpZWxkUGF0aH1bcHJpY2VdYCB9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXsgcHJvZHVjdC5nZXQoYHByaWNlYCkgfVxuICAgICAgICAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgdG90YWwgfSAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIHsgIWlzTGFzdCAmJiAoXG4gICAgICAgICAgPEJ0bkljb25cbiAgICAgICAgICAgIGxpbmtBbGlrZVxuICAgICAgICAgICAgb25DbGljaz17IGUgPT4gaGFuZGxlUmVtb3ZlKGluZGV4LCBmaWVsZFBhdGgpIH1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgc3ZnSWQ9XCJkZWxldGVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgPC9UYWJsZS5Sb3c+XG4gIClcbn1cblByb2R1Y3RMaW5lRWRpdGFibGUucHJvcFR5cGVzID0ge1xuICBpbmRleCAgICAgICA6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgcHJvZHVjdCAgICAgOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGlzTGFzdCAgICAgIDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgaGFuZGxlUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvZHVjdExpbmVEaXNwbGF5KCBwcm9wcyApIHtcbiAgY29uc3QgeyBwcm9kdWN0IH0gPSBwcm9wc1xuICBpZiAoICFwcm9kdWN0LmNoZWNrZWQgKSByZXR1cm4gbnVsbFxuICBjb25zdCB0b3RhbCA9IGNvbXB1dGUucHJvZHVjdFRvdGFsKCBwcm9kdWN0IClcbiAgcmV0dXJuIChcbiAgICA8VGFibGUuUm93PlxuICAgICAgPFRhYmxlLkNlbGwgLz5cbiAgICAgIDxUYWJsZS5DZWxsIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgIDxGb3JtYXQuTWFya2Rvd24gdGV4dD17IHByb2R1Y3QuZGVzY3JpcHRpb24gfSAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cIm51bWJlclwiPlxuICAgICAgICA8Rm9ybWF0Lk51bSB2YWx1ZT17IHByb2R1Y3QucXVhbnRpdHkgfSBtaW5pbXVtRnJhY3Rpb25EaWdpdHM9ezJ9IC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCB0eXBlPVwibnVtYmVyXCI+XG4gICAgICAgIDxGb3JtYXQuTnVtIHZhbHVlPXsgcHJvZHVjdC5wcmljZSB9IG1pbmltdW1GcmFjdGlvbkRpZ2l0cz17Mn0gLz5cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsIHR5cGU9XCJhbW91bnRcIj5cbiAgICAgICAgPEZvcm1hdC5BbW91bnQgdmFsdWU9eyB0b3RhbCB9IC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCAvPlxuICAgIDwvVGFibGUuUm93PlxuICApXG59XG5Qcm9kdWN0TGluZURpc3BsYXkucHJvcFR5cGVzID0ge1xuICBwcm9kdWN0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG59XG5cbmZ1bmN0aW9uIFByb2R1Y3RUb3RhbEZvb3RlciggcHJvcHMgKSB7XG4gIGNvbnN0IHsgcmVhZE9ubHksIGRvY3VtZW50IH0gPSBwcm9wc1xuICAvLyBpbiByZWFkT25seSBtb2RlIHdlIHJlbW92ZSB0b2dnbGUvcmVtb3ZlIGJ1dHRvbnNcbiAgY29uc3QgY29sU3BhbiA9IHJlYWRPbmx5ID8gMyA6IDRcbiAgcmV0dXJuIChcbiAgICA8VGFibGUuRm9vdGVyPlxuICAgICAgPFRhYmxlLlJvd0Zvb3Rlcj5cbiAgICAgICAgPFRhYmxlLkNlbGwgY29sU3Bhbj17IGNvbFNwYW4gfSB0eXBlPVwibnVtYmVyXCI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5hbW91bnQtaHRcIi8+XG4gICAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cImFtb3VudFwiPlxuICAgICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgZG9jdW1lbnQudG90YWxOZXQgfSAvPlxuICAgICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICAgIHsgIXJlYWRPbmx5ICYmIDxUYWJsZS5DZWxsIC8+IH1cbiAgICAgIDwvVGFibGUuUm93Rm9vdGVyPlxuICAgICAgPFRhYmxlLlJvd0Zvb3Rlcj5cbiAgICAgICAgPFRhYmxlLkNlbGwgY29sU3Bhbj17IGNvbFNwYW4gfSB0eXBlPVwibnVtYmVyXCI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5hbW91bnQtdGF4ZXNcIi8+XG4gICAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cImFtb3VudFwiPlxuICAgICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgZG9jdW1lbnQudG90YWxUYXggfSAvPlxuICAgICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICAgIHsgIXJlYWRPbmx5ICYmIDxUYWJsZS5DZWxsIC8+IH1cbiAgICAgIDwvVGFibGUuUm93Rm9vdGVyPlxuICAgICAgPFRhYmxlLlJvd0Zvb3Rlcj5cbiAgICAgICAgPFRhYmxlLkNlbGwgY29sU3Bhbj17IGNvbFNwYW4gfSB0eXBlPVwibnVtYmVyXCI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5hbW91bnRcIi8+XG4gICAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cImFtb3VudFwiPlxuICAgICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgZG9jdW1lbnQudG90YWwgfSAvPlxuICAgICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICAgIHsgIXJlYWRPbmx5ICYmIDxUYWJsZS5DZWxsIC8+IH1cbiAgICAgIDwvVGFibGUuUm93Rm9vdGVyPlxuICAgIDwvVGFibGUuRm9vdGVyPlxuICApXG59XG5Qcm9kdWN0VG90YWxGb290ZXIucHJvcFR5cGVzID0ge1xuICBkb2N1bWVudCAgICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlYWRPbmx5ICAgIDogUHJvcFR5cGVzLmJvb2wsXG59XG5cbmNvbnN0IFByb2R1Y3RzQ29sdW1ucyA9IFtcbiAge2lkOiBgdG9nZ2xlYCAgICAgICwgbGFiZWw6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICwgdHlwZTogYGNoZWNrYm94YCAgICAgfSxcbiAge2lkOiBgZGVzY3JpcHRpb25gICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIuZGVzY3JpcHRpb25gICwgdHlwZTogYGlucHV0YCAgICAgICAgfSxcbiAge2lkOiBgcXVhbnRpdHlgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIucXVhbnRpdHlgICAgICwgdHlwZTogYGlucHV0IG51bWJlcmAgfSxcbiAge2lkOiBgcHJpY2VgICAgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIudW5pdC1wcmljZWAgICwgdHlwZTogYGlucHV0IG51bWJlcmAgfSxcbiAge2lkOiBgYW1vdW50YCAgICAgICwgbGFiZWw6IGB0YWJsZS5hbW91bnRgICAgICAgICAgICAgICwgdHlwZTogYGFtb3VudGAgICAgICAgfSxcbiAge2lkOiBgcmVtb3ZlYCAgICAgICwgbGFiZWw6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICwgdHlwZTogYGFjdGlvbmAgICAgICAgfVxuXVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvZHVjdFRhYmxlKCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIHJlYWRPbmx5LFxuICAgIGRvY3VtZW50LFxuICAgIGhhbmRsZVJlbW92ZSxcbiAgfSA9IHByb3BzXG4gIGNvbnN0IHByb2R1Y3RzICAgICA9IGRvY3VtZW50LmdldChgcHJvZHVjdHNgKVxuICBpZiAoICFjcmlvLmlzQXJyYXkocHJvZHVjdHMpICkgcmV0dXJuIG51bGxcbiAgY29uc3QgaGlkZUNvbHVtbnMgID0gcmVhZE9ubHkgPyBbYHRvZ2dsZWAsIGByZW1vdmVgXSA6IFtdXG4gIGNvbnN0IENPTVBfQ0xBU1MgICA9IGNsYXNzTmFtZXMoIGB0YWJsZS0tcHJvZHVjdGAsIHtcbiAgICBbYHRhYmxlLS1wcmludGBdOiByZWFkT25seSxcbiAgfSlcbiAgY29uc3QgUHJvZHVjdExpbmUgICAgID0gcmVhZE9ubHkgPyBQcm9kdWN0TGluZURpc3BsYXkgOiBQcm9kdWN0TGluZUVkaXRhYmxlXG4gIGNvbnN0IHByb2R1Y3RzTGVuZ3RoICA9IHByb2R1Y3RzLmxlbmd0aFxuICByZXR1cm4gKFxuICAgIDxUYWJsZS5XcmFwcGVyXG4gICAgICBjb2x1bW5zPXsgUHJvZHVjdHNDb2x1bW5zIH1cbiAgICAgIGhpZGVDb2x1bW5zPXsgaGlkZUNvbHVtbnMgfVxuICAgICAgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9XG4gICAgICBmb290ZXI9eyA8UHJvZHVjdFRvdGFsRm9vdGVyIHsuLi5wcm9wc30gLz4gfVxuICAgID5cbiAgICB7IHByb2R1Y3RzLm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gPFByb2R1Y3RMaW5lXG4gICAgICAgIGtleT17IHByb2R1Y3QuX2lkIH1cbiAgICAgICAgaW5kZXg9eyBpbmRleCB9XG4gICAgICAgIHByb2R1Y3Q9eyBwcm9kdWN0IH1cbiAgICAgICAgaXNMYXN0PXsgaW5kZXggPT09IHByb2R1Y3RzTGVuZ3RoIC0gMSB9XG4gICAgICAgIGhhbmRsZVJlbW92ZT17IGhhbmRsZVJlbW92ZSB9XG4gICAgICAvPlxuICAgIH0pfVxuICAgIDwvVGFibGUuV3JhcHBlcj5cbiAgKVxufVxuUHJvZHVjdFRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgcmVhZE9ubHk6IGZhbHNlLFxufVxuUHJvZHVjdFRhYmxlLnByb3BUeXBlcyA9IHtcbiAgZG9jdW1lbnQgICAgOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZWFkT25seSAgICA6IFByb3BUeXBlcy5ib29sLFxuICAvLyBoYW5kbGVSZW1vdmU6IFByb3BUeXBlcy5mdW5jdGlvbixcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIGNsYXNzTmFtZXMgICAgICAgICBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0ICAgUHJvcFR5cGVzICAgICAgICAgIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IExpbmssIHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uJ1xuaW1wb3J0IHsgVGhlYWQgICAgICB9IGZyb20gJy4vaGVhZGVyJ1xuXG5pbXBvcnQgJy4vdGFibGUuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgdGFibGVgXG5cbi8vIENyZWF0ZSBhIGNvbnRleHQgZm9yIHBhc3NpbmcgY29sIHR5cGVzIGFsbCBkb3duXG4vLyDigKIgd2UgbWF5IGhhdmUgYSB3cmFwcGVyIGFyb3VuZCBhIHJvdyAobGlrZSBxdW90YXRpb25Sb3cpXG4vLyAgIHRoaXMgd2lsbCBtYWtlIGl0IGhhcmQgdG8gcGFzcyBkb3duIHRob3NlIHByb3BlcnRpZXMgd2l0aCBhIFJlYWN0LkNoaWxkcmVuLm1hcFxuY29uc3QgVGFibGVDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIGNvbHVtbnM6ICAgICBbXSxcbiAgaGlkZUNvbHVtbnM6IFtdLFxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlRm9vdGVyKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8dGZvb3QgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fZm9vdGVyYH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L3Rmb290PlxuICApXG59XG5leHBvcnQgeyBUYWJsZUZvb3RlciBhcyBGb290ZXIgfVxuXG5leHBvcnQgZnVuY3Rpb24gUm93Rm9vdGVyKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8dHIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fZm9vdGVyX3Jvd2B9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC90cj5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2VsbCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdHlwZSwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgY29uc3QgY3VycmVudFR5cGUgPSB0eXBlID8gdHlwZSA6IGB0ZXh0YFxuICBjb25zdCBDT01QX0NMQVNTICA9IGNsYXNzTmFtZXMoXG4gICAgYCR7QkFTRV9DTEFTU31fX2NlbGxgLFxuICAgIGN1cnJlbnRUeXBlLnNwbGl0KGAgYCkubWFwKHQgPT4gYCR7QkFTRV9DTEFTU31fX2NlbGwtLWlzLSR7IHQgfWApXG4gIClcbiAgcmV0dXJuIChcbiAgICA8dGQgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9IHsuLi5yZXN0fT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvdGQ+XG4gIClcbn1cbkNlbGwucHJvcFR5cGVzID0ge1xuICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUm93KCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8VGFibGVDb250ZXh0LkNvbnN1bWVyPlxuICAgIHsgKHtjb2x1bW5zLCBoaWRlQ29sdW1uc30pID0+IChcbiAgICAgIDx0ciBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19ib2R5X3Jvd2B9PlxuICAgICAgICB7IFJlYWN0LkNoaWxkcmVuLm1hcCggcHJvcHMuY2hpbGRyZW4sIChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbnNbIGluZGV4IF1cbiAgICAgICAgICAvLyBmaWx0ZXIgaGlkZGVuIGNvbHVtbnNcbiAgICAgICAgICBpZiAoIGhpZGVDb2x1bW5zLmluY2x1ZGVzKGNvbHVtbi5pZCkgKSByZXR1cm4gbnVsbFxuICAgICAgICAgIC8vIHBhc3MgdGhlIHJpZ2h0IHR5cGVzIHRvIGNlbGxcbiAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KCBjZWxsLCB7XG4gICAgICAgICAgICB0eXBlOiBjZWxsLnByb3BzLnR5cGUgfHwgY29sdW1uc1sgaW5kZXggXS50eXBlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSl9XG4gICAgICA8L3RyPlxuICAgICl9XG4gICAgPC9UYWJsZUNvbnRleHQuQ29uc3VtZXI+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVtcHR5TGluZSggcHJvcHMgKSB7XG4gIGNvbnN0IHsgY29sdW1ucywgaGlkZUNvbHVtbnMgfSA9IHByb3BzXG4gIGNvbnN0IGNvbFNwYW4gPSBjb2x1bW5zLmZpbHRlciggY29sdW1uID0+ICFoaWRlQ29sdW1ucy5pbmNsdWRlcyhjb2x1bW4uaWQpICkubGVuZ3RoXG4gIHJldHVybiAoXG4gICAgPHRyIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2JvZHlfcm93YH0+XG4gICAgICA8Q2VsbCBjb2xTcGFuPXsgY29sU3BhbiB9IHR5cGU9XCJlbXB0eVwiID5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5lbXB0eVwiIC8+XG4gICAgICA8L0NlbGw+XG4gICAgPC90cj5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNvcnRRdWVyeSggY3VycmVudFNvcnRpbmcsIHNvcnQgKSB7XG4gIGNvbnN0IGlzU2FtZVNvcnQgPSBjdXJyZW50U29ydGluZy5zb3J0ID09PSBzb3J0XG4gIGlmICggIWlzU2FtZVNvcnQgKSByZXR1cm4geyBzb3J0LCBkaXI6IGBBU0NgIH1cbiAgY29uc3QgaXNBc2NEaXIgICA9IGN1cnJlbnRTb3J0aW5nLmRpciA9PT0gYEFTQ2BcbiAgaWYgKCBpc0FzY0RpciApICAgIHJldHVybiB7IHNvcnQsIGRpcjogYERFU0NgIH1cbiAgcmV0dXJuIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBQYWdpbmF0ZWRUYWJsZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaGlkZUNvbHVtbnM6IFtdLFxuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zICAgICAgICA6IFByb3BUeXBlcy5hcnJheU9mKCBQcm9wVHlwZXMub2JqZWN0ICkuaXNSZXF1aXJlZCxcbiAgICBoaWRlQ29sdW1ucyAgICA6IFByb3BUeXBlcy5hcnJheU9mKCBQcm9wVHlwZXMuc3RyaW5nICksXG4gICAgaGlkZU9uRW1wdHkgICAgOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtZXRhICAgICAgICAgICA6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaGFuZGxlUGFnZVNvcnQgOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb290ZXIgICAgICAgICA6IFByb3BUeXBlcy5lbGVtZW50LFxuICB9XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc29ydCAgIDogdW5kZWZpbmVkLFxuICAgICAgZGlyICAgIDogdW5kZWZpbmVkLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVNvcnQgPSB0aGlzLmhhbmRsZVNvcnQuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVQcmV2ID0gdGhpcy5oYW5kbGVQcmV2LmJpbmQoIHRoaXMgKVxuICAgIHRoaXMuaGFuZGxlTmV4dCA9IHRoaXMuaGFuZGxlTmV4dC5iaW5kKCB0aGlzIClcbiAgfVxuXG4gIGhhbmRsZVNvcnQoIGV2ZW50LCBzb3J0ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBpZiAoICFzb3J0ICkgcmV0dXJuXG4gICAgY29uc3QgeyBoYW5kbGVQYWdlU29ydCwgbWF0Y2ggfSA9IHRoaXMucHJvcHNcbiAgICBpZiAoICFoYW5kbGVQYWdlU29ydCApIHJldHVyblxuICAgIGNvbnN0IHF1ZXJ5ID0gY29tcHV0ZVNvcnRRdWVyeSggdGhpcy5zdGF0ZSwgc29ydCApXG5cbiAgICBoYW5kbGVQYWdlU29ydCh7XG4gICAgICBxdWVyeSxcbiAgICAgIC4uLm1hdGNoLnBhcmFtcyxcbiAgICB9KVxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiAoe1xuICAgICAgc29ydDogcXVlcnkuc29ydCxcbiAgICAgIGRpcjogIHF1ZXJ5LmRpcixcbiAgICB9KSlcbiAgfVxuXG4gIC8vIGFsd2F5cyBwYXNzIFVSTCBwYXJhbXMgdG8gcmVkdXggYWN0aW9uc1xuICAvLyDigKIgbmVlZGVkIGZvciBleGFtcGxlIGJ5IC9jdXN0b21lcnMvcXVvdGF0aW9uc1xuICBoYW5kbGVQcmV2KCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgeyBtZXRhLCBoYW5kbGVQYWdlU29ydCwgbWF0Y2ggfSA9IHRoaXMucHJvcHNcbiAgICBpZiAoICFoYW5kbGVQYWdlU29ydCApICAgIHJldHVyblxuICAgIGlmICggIW1ldGEucHJldmlvdXNQYWdlICkgcmV0dXJuXG4gICAgaGFuZGxlUGFnZVNvcnQoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgcGFnZTogbWV0YS5wcmV2aW91c1BhZ2UsXG4gICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICB9LFxuICAgICAgLi4ubWF0Y2gucGFyYW1zXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZU5leHQoIGV2ZW50ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCB7IG1ldGEsIGhhbmRsZVBhZ2VTb3J0LCBtYXRjaCB9ID0gdGhpcy5wcm9wc1xuICAgIGlmICggIWhhbmRsZVBhZ2VTb3J0ICkgcmV0dXJuXG4gICAgaWYgKCAhbWV0YS5uZXh0UGFnZSApICByZXR1cm5cbiAgICBoYW5kbGVQYWdlU29ydCh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBwYWdlOiBtZXRhLm5leHRQYWdlLFxuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgfSxcbiAgICAgIC4uLm1hdGNoLnBhcmFtc1xuICAgIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcywgc3RhdGUgfSA9IHRoaXNcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICBwcmVzZW50YXRpb24sXG4gICAgICBoYW5kbGVQYWdlU29ydCxcbiAgICAgIGhpZGVPbkVtcHR5LFxuICAgIH0gPSBwcm9wc1xuICAgIGNvbnN0IGhhc1Jvd3MgICA9IFJlYWN0LkNoaWxkcmVuLmNvdW50KCBwcm9wcy5jaGlsZHJlbiApID4gMFxuICAgIGNvbnN0IGhhc0Zvb3RlciA9IHByb3BzLmZvb3RlciAhPSBudWxsXG4gICAgY29uc3QgaGFzTWV0YSAgID0gcHJvcHMubWV0YSAgICE9IG51bGxcbiAgICBjb25zdCBDT01QX0NMQVNTID0gY2xhc3NOYW1lcyhcbiAgICAgIEJBU0VfQ0xBU1MsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBwcmVzZW50YXRpb24gPyBgJHtCQVNFX0NMQVNTfS0tcHJlc2VudGF0aW9uYCA6IGZhbHNlLFxuICAgIClcblxuICAgIGlmICggaGlkZU9uRW1wdHkgJiYgIWhhc1Jvd3MgKSByZXR1cm4gbnVsbFxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9PlxuICAgICAgICA8dGFibGUgY2VsbFNwYWNpbmc9XCIwXCIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fY29udGVudGB9PlxuICAgICAgICAgIHsgcHJvcHMudGl0bGUgJiYgKFxuICAgICAgICAgICAgPGNhcHRpb24gY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fdGl0bGVgfT5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eyBwcm9wcy50aXRsZSB9IC8+XG4gICAgICAgICAgICA8L2NhcHRpb24+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8VGhlYWRcbiAgICAgICAgICAgIGNvbHVtbnM9eyBwcm9wcy5jb2x1bW5zIH1cbiAgICAgICAgICAgIGhpZGVDb2x1bW5zPXsgcHJvcHMuaGlkZUNvbHVtbnMgfVxuICAgICAgICAgICAgaGFuZGxlU29ydD17IHRoaXMuaGFuZGxlU29ydCB9XG4gICAgICAgICAgICBzb3J0PXsgc3RhdGUuc29ydCB9XG4gICAgICAgICAgICBkaXI9eyBzdGF0ZS5kaXIgfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFRhYmxlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17e1xuICAgICAgICAgICAgY29sdW1ucyAgICA6IHByb3BzLmNvbHVtbnMsXG4gICAgICAgICAgICBoaWRlQ29sdW1uczogcHJvcHMuaGlkZUNvbHVtbnMsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fYm9keWB9PlxuICAgICAgICAgICAgeyBoYXNSb3dzID8gcHJvcHMuY2hpbGRyZW4gOiAoXG4gICAgICAgICAgICAgIDxFbXB0eUxpbmVcbiAgICAgICAgICAgICAgICBjb2x1bW5zPXsgcHJvcHMuY29sdW1ucyB9XG4gICAgICAgICAgICAgICAgaGlkZUNvbHVtbnM9eyBwcm9wcy5oaWRlQ29sdW1uc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvVGFibGVDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgICAgIHsgaGFzRm9vdGVyICYmIHByb3BzLmZvb3RlciB9XG4gICAgICAgIDwvdGFibGU+XG4gICAgICAgIHsgaGFzTWV0YSAmJiAoXG4gICAgICAgICAgPFBhZ2luYXRpb25cbiAgICAgICAgICAgIG1ldGE9eyBwcm9wcy5tZXRhIH1cbiAgICAgICAgICAgIGhhbmRsZVByZXY9eyB0aGlzLmhhbmRsZVByZXYgfVxuICAgICAgICAgICAgaGFuZGxlTmV4dD17IHRoaXMuaGFuZGxlTmV4dCB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG4vLyB3ZSBuZWVkIHRvIGhhdmUgYWNjZXNzIHRvIHRoZSByb3V0ZXJcbi8vIOKAoiB0aGUgcmVkdXggYWN0aW9ucyBtYXkgbmVlZCB0byBhY2Nlc3MgdG8gcm91dGUgcGFyYW1zXG5leHBvcnQgY29uc3QgVGFibGUgPSB3aXRoUm91dGVyKCBQYWdpbmF0ZWRUYWJsZSApXG5leHBvcnQgeyBUYWJsZSBhcyBXcmFwcGVyIH1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIGNyaW8gICAgICAgICAgICAgICBmcm9tICdjcmlvJ1xuaW1wb3J0ICAgY2xhc3NOYW1lcyAgICAgICAgIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0IHsgSWNvbiB9IGZyb20gJy4uL3VpL3N2Zy1pY29ucydcblxuY29uc3QgQkFTRV9DTEFTUyAgICAgID0gYHRhYmxlX19wYWdpbmF0aW9uYFxuY29uc3QgQUNUSU9OX0NMQVNTICAgID0gYCR7QkFTRV9DTEFTU31fYWN0aW9uYFxuY29uc3QgZW1wdHlQYWdpbmF0aW9uID0gY3Jpbyh7XG4gIHN0YXJ0OiAgYC1gLFxuICBlbmQ6ICAgIGAtYCxcbiAgdG90YWw6ICBgLWAsXG59KVxuXG5leHBvcnQgZnVuY3Rpb24gUGFnaW5hdGlvbiggcHJvcHMgKSB7XG4gIGNvbnN0IHsgbWV0YSwgaGFuZGxlUHJldiwgaGFuZGxlTmV4dCB9ID0gcHJvcHNcbiAgY29uc3QgUFJFVl9DTEFTUyA9IGNsYXNzTmFtZXMoXG4gICAgQUNUSU9OX0NMQVNTLFxuICAgIGAke0FDVElPTl9DTEFTU30tLXByZXZgLFxuICAgIG1ldGEucHJldmlvdXNQYWdlID8gZmFsc2UgOiBgJHtBQ1RJT05fQ0xBU1N9LS1kaXNhYmxlZGAsXG4gIClcbiAgY29uc3QgTkVYVF9DTEFTUyA9IGNsYXNzTmFtZXMoXG4gICAgQUNUSU9OX0NMQVNTLFxuICAgIGAke0FDVElPTl9DTEFTU30tLW5leHRgLFxuICAgIG1ldGEubmV4dFBhZ2UgPyBmYWxzZSA6ICBgJHtBQ1RJT05fQ0xBU1N9LS1kaXNhYmxlZGAsXG4gIClcbiAgLy8gYmUgc3VyZSB0byBmZWVkIHRoZSBhIHBhZ2luYXRpb24gdG8gSTE4TlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vSGlzd2UvYS1jb3VudC9pc3N1ZXMvNjVcbiAgY29uc3QgcGFnaW5hdGlvbiAgPSBlbXB0eVBhZ2luYXRpb24ubWVyZ2UobnVsbCAsbWV0YSlcbiAgcmV0dXJuIChcbiAgICA8Zm9vdGVyIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31gfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9yb3dzYH0+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwidGFibGUucm93cy1wZXItcGFnZVwiIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fcm93cy1wZXItcGFnZWB9PnsgbWV0YS5saW1pdCB9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInRhYmxlLnBhZ2luYXRpb25cIiB2YWx1ZXM9eyBwYWdpbmF0aW9uIH0gLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9hY3Rpb25zYH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBvbkNsaWNrPXsgaGFuZGxlUHJldiB9XG4gICAgICAgICAgY2xhc3NOYW1lPXsgUFJFVl9DTEFTUyB9XG4gICAgICAgID5cbiAgICAgICAgICA8SWNvbiBzdmdJZD1cImNoZXZyb24tbGVmdFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgb25DbGljaz17IGhhbmRsZU5leHQgfVxuICAgICAgICAgIGNsYXNzTmFtZT17IE5FWFRfQ0xBU1MgfVxuICAgICAgICA+XG4gICAgICAgICAgPEljb24gc3ZnSWQ9XCJjaGV2cm9uLXJpZ2h0XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvb3Rlcj5cbiAgKVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgY2xhc3NOYW1lcyAgICAgICAgIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IHdpdGhSb3V0ZXIgICAgICAgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5pbXBvcnQgeyBJY29uIH0gZnJvbSAnLi4vdWkvc3ZnLWljb25zJ1xuXG5jb25zdCBCQVNFX0NMQVNTID0gYHRhYmxlX19oZWFkYFxuXG5mdW5jdGlvbiBUaCggcHJvcHMgKSB7XG4gIGNvbnN0IHtcbiAgICBjb2x1bW4sXG4gICAgb25DbGljayxcbiAgICBpc1NvcnRlZCxcbiAgICBkaXIsXG4gIH0gID0gcHJvcHNcbiAgY29uc3QgeyBsYWJlbCwgc29ydCwgdHlwZSwgLi4ucmVzdCB9ID0gY29sdW1uXG5cbiAgY29uc3Qgc2FmZVR5cGUgPSB0eXBlID8gdHlwZSA6IGB0ZXh0YFxuXG4gIGNvbnN0IENPTVBfQ0xBU1MgPSBjbGFzc05hbWVzKFxuICAgIGAke0JBU0VfQ0xBU1N9X2NvbGAsXG4gICAgc2FmZVR5cGUuc3BsaXQoYCBgKS5tYXAodCA9PiBgJHtCQVNFX0NMQVNTfV9jb2wtLWlzLSR7IHQgfWApLFxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8dGhcbiAgICAgIG9uQ2xpY2s9eyBvbkNsaWNrIH1cbiAgICAgIGNsYXNzTmFtZT17IENPTVBfQ0xBU1MgfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAgeyBpc1NvcnRlZCAmJiA8SWNvbiBzdmdJZD17IGRpciA9PT0gYEFTQ2AgPyBgYXJyb3ctdXB3YXJkYCA6IGBhcnJvdy1kb3dud2FyZGAgfSAvPiB9XG4gICAgICB7IGxhYmVsICYmIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtsYWJlbC50cmltKCl9IC8+IH1cbiAgICA8L3RoPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUaGVhZCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgY29sdW1ucywgaGlkZUNvbHVtbnMsIGhhbmRsZVNvcnQsIHNvcnQsIGRpciB9ID0gcHJvcHNcblxuICByZXR1cm4gKFxuICAgIDx0aGVhZCBjbGFzc05hbWU9eyBCQVNFX0NMQVNTIH0+XG4gICAgICA8dHIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9yb3dgfT5cbiAgICAgIHsgY29sdW1ucy5tYXAoIChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmICggaGlkZUNvbHVtbnMuaW5jbHVkZXMoY29sdW1uLmlkKSApIHJldHVybiBudWxsXG4gICAgICAgIHJldHVybiAoIDxUaFxuICAgICAgICAgIGtleT17IGluZGV4IH1cbiAgICAgICAgICBjb2x1bW49eyBjb2x1bW4gfVxuICAgICAgICAgIGlzU29ydGVkPXsgY29sdW1uLnNvcnQgJiYgc29ydCA9PT0gY29sdW1uLnNvcnQgfVxuICAgICAgICAgIGRpcj17IGRpciB9XG4gICAgICAgICAgb25DbGljaz17ICFjb2x1bW4uc29ydCA/IG51bGwgOiBldmVudCA9PiBoYW5kbGVTb3J0KGV2ZW50LCBjb2x1bW4uc29ydCApIH1cbiAgICAgICAgLz4pXG4gICAgICB9KX1cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgKVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGFjY291bnQgICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9hY2NvdW50J1xuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICAgICAgIGZyb20gJy4uL2R1Y2tzL3F1b3RhdGlvbnMnXG5pbXBvcnQgKiBhcyBpbnZvaWNlcyAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvaW52b2ljZXMnXG5pbXBvcnQgeyBOYXZTZWNvbmRhcnkgICAgICAgICAgICAgICAgfSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHsgQnV0dG9uTmV3ICAgICAgICAgICAgICAgICAgIH0gZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0IHsgTWFpbiAgICAgICAgICwgQ29udGVudCAgICAgIH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgeyBBY3RpdmVJbnZvaWNlcyB9IGZyb20gICcuLi9pbnZvaWNlcy9saXN0J1xuaW1wb3J0IHtcbiAgQWN0aXZlUXVvdGF0aW9ucyxcbiAgUXVvdGF0aW9uc1JlYWR5VG9JbnZvaWNlLFxufSBmcm9tICcuLi9xdW90YXRpb25zL2xpc3QnXG5pbXBvcnQgeyBIb21lQ2hhcnRzIH0gZnJvbSAnLi9jaGFydHMnXG5cbmZ1bmN0aW9uIEhvbWUoIHByb3BzICkge1xuICBjb25zdCB7XG4gICAgc3RhdGlzdGljcyxcbiAgICBxdW90YXRpb25zUmVhZHlUb0ludm9pY2UsXG4gICAgaW52b2ljZXMsXG4gIH0gPSBwcm9wc1xuICBjb25zdCB0aXRsZVByb3BzID0geyBpZDogYHBhZ2UuaG9tZWAgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgey8qIGh0dHBzOi8vZ2l0aHViLmNvbS9uZmwvcmVhY3QtaGVsbWV0L2lzc3Vlcy8yNjgjaXNzdWVjb21tZW50LTM2ODE0ODI0OSAqL31cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPEJ1dHRvbk5ldyB0eXBlPVwicXVvdGF0aW9uc1wiIG1lc3NhZ2U9XCJxdW90YXRpb24uYnV0dG9uLm5ld1wiIC8+XG4gICAgICA8L05hdlNlY29uZGFyeT5cbiAgICAgIDxNYWluPlxuICAgICAgICA8Q29udGVudD5cbiAgICAgICAgICA8SG9tZUNoYXJ0cyBzdGF0aXN0aWNzPXsgc3RhdGlzdGljcyB9IC8+XG4gICAgICAgICAgPEFjdGl2ZVF1b3RhdGlvbnMgdGl0bGU9XCJwYWdlLnF1b3RhdGlvbnNcIiAvPlxuICAgICAgICAgIDxRdW90YXRpb25zUmVhZHlUb0ludm9pY2UgLz5cbiAgICAgICAgICA8QWN0aXZlSW52b2ljZXMgdGl0bGU9XCJwYWdlLmludm9pY2VzXCIgLz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcHMoIHN0YXRlICkge1xuICByZXR1cm4ge1xuICAgIHN0YXRpc3RpY3MgOiBzdGF0ZS5hY2NvdW50IC5nZXQoIGBzdGF0aXN0aWNzYCApLFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlMnByb3BzICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogSG9tZSxcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBxdW90YXRpb25zLmxpc3RBY3RpdmUsXG4gICAgcXVvdGF0aW9ucy5saXN0UmVhZHlUb0ludm9pY2UsXG4gICAgaW52b2ljZXMubGlzdEFjdGl2ZSxcbiAgICBhY2NvdW50LnN0YXRpc3RpY3MsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgUmVhY3QgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzTmFtZSBmcm9tICdjbGFzc25hbWVzJ1xuXG5pbXBvcnQgJy4vbWFpbi5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBtYWluYFxuXG5leHBvcnQgZnVuY3Rpb24gTWFpbiggcHJvcHMgKSB7XG4gIGNvbnN0IHsgd2l0aE1ldGEsIGNoaWxkcmVuICAgfSA9ICAgcHJvcHNcbiAgY29uc3QgICBDT01QX0NMQVNTICAgPSBjbGFzc05hbWUoe1xuICAgIFsgQkFTRV9DTEFTUyBdOiB0cnVlLFxuICAgIFtgJHtCQVNFX0NMQVNTfS0taGFzLW1ldGFgXTogUmVhY3QuQ2hpbGRyZW4uY291bnQoIGNoaWxkcmVuICkgPiAxXG4gIH0pXG4gIHJldHVybiAoXG4gICAgPG1haW4gcm9sZT1cIm1haW5cIiBjbGFzc05hbWU9eyBDT01QX0NMQVNTIH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L21haW4+XG4gIClcbn1cbmV4cG9ydCB7IE1haW4gYXMgV3JhcHBlciB9XG5cbmV4cG9ydCBmdW5jdGlvbiBNZXRhKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX21ldGFgfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvaGVhZGVyPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250ZW50KCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8YXJ0aWNsZSBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19jb250ZW50YH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L2FydGljbGU+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRlbnRBY3Rpb25zKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2NvbnRlbnRfYWN0aW9uc2B9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuXG5pbXBvcnQgKiBhcyBpbnZvaWNlcyAgICAgICAgZnJvbSAnLi4vZHVja3MvaW52b2ljZXMnXG5pbXBvcnQgeyBUYWJsZSwgUm93LCBDZWxsIH0gZnJvbSAnLi4vdWktdGFibGUnXG5pbXBvcnQgeyBBbW91bnQgfSAgICAgZnJvbSAnLi4vdWkvZm9ybWF0J1xuaW1wb3J0IHsgUHJvZ3Jlc3MgICAgICAgfSAgIGZyb20gJy4uL3VpL3Byb2dyZXNzJ1xuaW1wb3J0IHsgQXJjaGl2ZUludm9pY2UgfSAgIGZyb20gJy4vYnV0dG9ucydcblxuZnVuY3Rpb24gSW52b2ljZVJvdyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaW52b2ljZSB9ID0gcHJvcHNcbiAgY29uc3QgaXNBcmNoaXZlZCAgPSBpbnZvaWNlLmdldChgYXJjaGl2ZWRBdGApXG4gIGNvbnN0IGludm9pY2VVcmwgID0gYCR7IGlzQXJjaGl2ZWQgPyBgL2FyY2hpdmVzYCA6IGBgIH0vaW52b2ljZXMvJHtpbnZvaWNlLmlkfWBcbiAgcmV0dXJuIChcbiAgICA8Um93PlxuICAgICAgPENlbGw+XG4gICAgICAgIDxMaW5rIHRvPXsgaW52b2ljZVVybCB9PnsgaW52b2ljZS5nZXQoIGByZWZlcmVuY2VgICkgfTwvTGluaz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8TGluayB0bz17IGludm9pY2VVcmwgfT57IGludm9pY2UuZ2V0KCBgbmFtZWAgKSB9PC9MaW5rPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGw+XG4gICAgICAgIDxMaW5rIHRvPXtgL2N1c3RvbWVycy8ke2ludm9pY2UuY3VzdG9tZXJJZH1gfT5cbiAgICAgICAgICB7aW52b2ljZS5nZXQoIGBjdXN0b21lci5uYW1lYCApfVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPExpbmsgdG89e2AvcXVvdGF0aW9ucy8ke2ludm9pY2UuZ2V0KCdxdW90YXRpb24uaWQnKX0vcHJldmlld2B9PlxuICAgICAgICAgIHtpbnZvaWNlLmdldChgcXVvdGF0aW9uLnJlZmVyZW5jZWApfVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPEFtb3VudFxuICAgICAgICAgIHZhbHVlPXtpbnZvaWNlLmdldChgdG90YWxgKX1cbiAgICAgICAgLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8UHJvZ3Jlc3NcbiAgICAgICAgICB0YWJsZUxheW91dFxuICAgICAgICAgIHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsUGFpZGApIH1cbiAgICAgICAgICBtYXg9eyBpbnZvaWNlLmdldChgdG90YWxgKSB9XG4gICAgICAgIC8+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPEFyY2hpdmVJbnZvaWNlIGljb24gbGlua0FsaWtlIGludm9pY2U9eyBpbnZvaWNlIH0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICA8L1Jvdz5cbiAgKVxufVxuXG5jb25zdCBpbnZvaWNlQ29sdW1ucyA9IFtcbiAge2lkOiBgaWRgICAgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIuaWRgICAgICAgICAsIHNvcnQ6IGBpbmRleGAgICAgICAgICAgICwgdHlwZTogYGlkYCAgICAgICB9LFxuICB7aWQ6IGBuYW1lYCAgICAgLCBsYWJlbDogYHRhYmxlLmhlYWRlci5uYW1lYCAgICAgICwgc29ydDogYG5hbWVgICAgICAgICAgICAgLCB0eXBlOiBgdGV4dGAgICAgIH0sXG4gIHtpZDogYGN1c3RvbWVyYCAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmN1c3RvbWVyYCAgLCBzb3J0OiBgY3VzdG9tZXIubmFtZWAgICAsIHR5cGU6IGBjdXN0b21lcmAgfSxcbiAge2lkOiBgcXVvdGF0aW9uYCwgbGFiZWw6IGB0YWJsZS5oZWFkZXIucXVvdGF0aW9uYCAsIHNvcnQ6IGBxdW90YXRpb24uaW5kZXhgICwgdHlwZTogYGlkYCAgICAgICB9LFxuICB7aWQ6IGBhbW91bnRgICAgLCBsYWJlbDogYHRhYmxlLmFtb3VudGAgICAgICAgICAgICwgc29ydDogYHRvdGFsYCAgICAgICAgICAgLCB0eXBlOiBgYW1vdW50YCAgIH0sXG4gIHtpZDogYHBhaWRgICAgICAsIGxhYmVsOiBgdGFibGUuYW1vdW50LnBhaWRgICAgICAgLCBzb3J0OiBgdG90YWxQYWlkYCAgICAgICAsIHR5cGU6IGBwcm9ncmVzc2AgfSxcbiAge2lkOiBgYXJjaGl2ZWAgICwgbGFiZWw6IGZhbHNlICAgICAgICAgICAgICAgICAgICAsIHNvcnQ6IGZhbHNlICAgICAgICAgICAgICwgdHlwZTogYGFjdGlvbmAgICB9LFxuXVxuXG5mdW5jdGlvbiBJbnZvaWNlTGlzdCggcHJvcHMgKSB7XG4gIGNvbnN0IHtcbiAgICBpbnZvaWNlcyA9IFtdLFxuICAgIC4uLm90aGVyc1xuICB9ID0gcHJvcHNcbiAgcmV0dXJuIChcbiAgICA8VGFibGVcbiAgICAgIHByZXNlbnRhdGlvblxuICAgICAgY29sdW1ucz17IGludm9pY2VDb2x1bW5zIH1cbiAgICAgIHsgLi4ub3RoZXJzIH1cbiAgICA+XG4gICAgeyBpbnZvaWNlcy5tYXAoIGludm9pY2UgPT4gKFxuICAgICAgPEludm9pY2VSb3dcbiAgICAgICAga2V5PXsgaW52b2ljZS5pZCB9XG4gICAgICAgIGludm9pY2U9eyBpbnZvaWNlIH1cbiAgICAgIC8+XG4gICAgKSl9XG4gICAgPC9UYWJsZT5cbiAgKVxufVxuXG5leHBvcnQgY29uc3QgQWN0aXZlSW52b2ljZXMgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGludm9pY2VzOiBzdGF0ZS5pbnZvaWNlcy5nZXQoYGFjdGl2ZWAgICAgICksXG4gICAgbWV0YSAgICA6IHN0YXRlLmludm9pY2VzLmdldChgbWV0YS5hY3RpdmVgKSxcbiAgfSksXG4gIGRpc3BhdGNoID0+ICggYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVQYWdlU29ydDogaW52b2ljZXMuZ2V0QWxsLFxuICB9LCBkaXNwYXRjaCApKVxuKSggSW52b2ljZUxpc3QgKVxuXG5leHBvcnQgY29uc3QgQXJjaGl2ZWRJbnZvaWNlcyA9IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7XG4gICAgaW52b2ljZXMgICAgOiBzdGF0ZS5pbnZvaWNlcy5nZXQoYGFyY2hpdmVkYCApLFxuICAgIG1ldGEgICAgICAgIDogc3RhdGUuaW52b2ljZXMuZ2V0KGBtZXRhLmFyY2hpdmVkYCksXG4gICAgaGlkZUNvbHVtbnMgOiBbYGFyY2hpdmVgXSxcbiAgfSksXG4gIGRpc3BhdGNoID0+ICggYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVQYWdlU29ydDogaW52b2ljZXMubGlzdEFyY2hpdmVkLFxuICB9LCBkaXNwYXRjaCApKVxuKSggSW52b2ljZUxpc3QgKVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tZXJJbnZvaWNlcyA9IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7XG4gICAgaW52b2ljZXMgICAgIDogc3RhdGUuaW52b2ljZXMuZ2V0KGBhY3RpdmVgICkgICAgLFxuICAgIG1ldGEgICAgICAgICA6IHN0YXRlLmludm9pY2VzLmdldChgbWV0YS5hY3RpdmVgKSxcbiAgICBoaWRlQ29sdW1ucyAgOiBbYGN1c3RvbWVyYF0sXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IGludm9pY2VzLmxpc3RGb3JDdXN0b21lcixcbiAgfSwgZGlzcGF0Y2ggKSlcbikoIEludm9pY2VMaXN0IClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHsgUGVyY2VudCB9IGZyb20gJy4vZm9ybWF0J1xuXG5pbXBvcnQgJy4vcHJvZ3Jlc3Muc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgcHJvZ3Jlc3NgXG5cbmV4cG9ydCBmdW5jdGlvbiBQcm9ncmVzcyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgbWF4LCB2YWx1ZSwgdGFibGVMYXlvdXQgfSA9IHByb3BzXG4gIGNvbnN0IHBlcmNlbnQgICAgPSB2YWx1ZSAvIG1heFxuICBjb25zdCBjc3NQZXJjZW50ID0gTWF0aC5tYXgoIDAsIE1hdGgubWluKDEwMCwgcGVyY2VudCAqIDEwMCkgKVxuICBjb25zdCB3aWR0aCAgICAgID0gTnVtYmVyLmlzTmFOKCBjc3NQZXJjZW50ICkgPyBgMGAgOiBgJHsgY3NzUGVyY2VudCB9JWBcbiAgY29uc3QgQ09NUF9DTEFTUyA9IFsgQkFTRV9DTEFTUyBdXG4gIGlmICggdGFibGVMYXlvdXQgKSBDT01QX0NMQVNTLnB1c2goIGAke0JBU0VfQ0xBU1N9LS10YWJsZS1sYXlvdXRgIClcbiAgcmV0dXJuIChcbiAgICA8ZGwgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUy5qb2luKGAgYCkgfSA+XG4gICAgICA8ZHQgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fbGFiZWxgfT5cbiAgICAgICAgPFBlcmNlbnQgdmFsdWU9eyBwZXJjZW50IH0gLz5cbiAgICAgIDwvZHQ+XG4gICAgICA8ZGRcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fYmFyYH1cbiAgICAgICAgc3R5bGU9e3t3aWR0aH19XG4gICAgICAvPlxuICAgIDwvZGw+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuaW1wb3J0IHsgQnV0dG9uLCBCdG5JY29uIH0gZnJvbSAnLi4vdWkvYnV0dG9ucydcblxuLy8tLS0tLSBTSE9XIFFVT1RBVElPTlxuXG5mdW5jdGlvbiBCdXR0b25TaG93UXVvdGF0aW9uKCBwcm9wcyApIHtcbiAgY29uc3QgeyBxdW90YXRpb25JZCwgaXNTYXZpbmcgfSA9IHByb3BzXG4gIGlmICggIXF1b3RhdGlvbklkICkgcmV0dXJuIG51bGxcbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uIHNlY29uZGFyeVxuICAgICAgdG89e2AvcXVvdGF0aW9ucy8keyBxdW90YXRpb25JZCB9L3ByZXZpZXdgIH1cbiAgICAgIGRpc2FibGVkPXsgaXNTYXZpbmcgfVxuICAgID5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMuYnV0dG9uLnF1b3RhdGlvblwiIC8+XG4gICAgPC9CdXR0b24+XG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IFNob3dRdW90YXRpb24gPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIHF1b3RhdGlvbklkOiBzdGF0ZS5pbnZvaWNlcy5nZXQoIGBjdXJyZW50LnF1b3RhdGlvbi5pZGAgKSxcbiAgICBpc1NhdmluZyAgIDogc3RhdGUuaW52b2ljZXMuZ2V0KCBgaXNTYXZpbmdgICksXG4gIH0pXG4pKCBCdXR0b25TaG93UXVvdGF0aW9uIClcblxuLy8tLS0tLSBBUkNISVZFXG5cbmZ1bmN0aW9uIEJ1dHRvbkFyY2hpdmVJbnZvaWNlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpbnZvaWNlLCBhcmNoaXZlT25lLCBpc1NhdmluZywgaWNvbiwgLi4ub3RoZXJzIH0gPSBwcm9wc1xuICBpZiAoICFpbnZvaWNlICkgcmV0dXJuIG51bGxcblxuICBjb25zdCBhcmNoaXZlZEF0ID0gaW52b2ljZS5nZXQoIGBhcmNoaXZlZEF0YCApXG4gIGlmICggYXJjaGl2ZWRBdCApIHJldHVybiBudWxsXG5cbiAgY29uc3QgaWQgICAgICAgPSBpbnZvaWNlLmdldCggYGlkYCApXG4gIGNvbnN0IGJ0blByb3BzID0ge1xuICAgIG9uQ2xpY2s6IGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGFyY2hpdmVPbmUoe2lkfSlcbiAgICB9LFxuICAgIHR5cGUgICAgICA6IGBzdWJtaXRgICAgICAgICAgICAgICAgICAgICxcbiAgICBmb3JtTWV0aG9kOiBgcG9zdGAgICAgICAgICAgICAgICAgICAgICAsXG4gICAgZm9ybUFjdGlvbjogYC9pbnZvaWNlcy8keyBpZCB9L2FyY2hpdmVgLFxuICAgIGRpc2FibGVkICA6IGlzU2F2aW5nICAgICAgICAgICAgICAgICAgICxcbiAgICAuLi5vdGhlcnNcbiAgfVxuICBpZiAoIGljb24gKSByZXR1cm4gPEJ0bkljb24gc3ZnSWQ9XCJhcmNoaXZlXCIgey4uLmJ0blByb3BzIH0vPlxuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvbiB7Li4uYnRuUHJvcHMgfSA+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLmJ1dHRvbi5hcmNoaXZlXCIgLz5cbiAgICA8L0J1dHRvbj5cbiAgKVxufVxuXG5leHBvcnQgY29uc3QgQXJjaGl2ZUludm9pY2UgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGlzU2F2aW5nOiBzdGF0ZS5pbnZvaWNlcy5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgfSksXG4gIGRpc3BhdGNoID0+IGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgYXJjaGl2ZU9uZTogaW52b2ljZXMuYXJjaGl2ZU9uZSxcbiAgfSwgZGlzcGF0Y2gpLFxuKSggQnV0dG9uQXJjaGl2ZUludm9pY2UgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSAgIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCB7IFRhYmxlLCBSb3csIENlbGwgfSBmcm9tICcuLi91aS10YWJsZSdcbmltcG9ydCB7IEFtb3VudCwgRGF5ICAgICAgICAgICAgfSBmcm9tICcuLi91aS9mb3JtYXQnXG5pbXBvcnQgeyBCdXR0b24gICAgICAgICAgICAgICAgICB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5pbXBvcnQgeyBDcmVhdGVJbnZvaWNlLCBTaG93SW52b2ljZSwgQXJjaGl2ZVF1b3RhdGlvbiB9IGZyb20gJy4vYnV0dG9ucydcblxuZnVuY3Rpb24gUXVvdGF0aW9uUm93KCBwcm9wcyApIHtcbiAgY29uc3QgeyBxdW90YXRpb24gfSA9IHByb3BzXG4gIGNvbnN0IGlkICAgICAgICAgICAgPSBxdW90YXRpb24uZ2V0KCBgaWRgIClcbiAgY29uc3QgaXNBcmNoaXZlZCAgICA9IHF1b3RhdGlvbi5nZXQoIGBhcmNoaXZlZEF0YCApXG4gIGNvbnN0IHF1b3RhdGlvblVybCAgPSBgJHsgaXNBcmNoaXZlZCAgPyBgL2FyY2hpdmVzYDogYGAgfS9xdW90YXRpb25zLyR7aWR9YFxuXG4gIHJldHVybiAoXG4gICAgPFJvdz5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8TGluayB0bz17IHF1b3RhdGlvblVybCB9PlxuICAgICAgICAgIHsgcXVvdGF0aW9uLmdldChgcmVmZXJlbmNlYCkgfVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPExpbmsgdG89eyBxdW90YXRpb25VcmwgfT5cbiAgICAgICAgICB7cXVvdGF0aW9uLmdldChgbmFtZWApfVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPExpbmsgdG89e2AvY3VzdG9tZXJzLyR7cXVvdGF0aW9uLmdldChgY3VzdG9tZXJJZGApfWB9PlxuICAgICAgICAgIHtxdW90YXRpb24uZ2V0KGBjdXN0b21lci5uYW1lYCl9XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8RGF5IHZhbHVlPXtxdW90YXRpb24uZ2V0KGBzZW5kQXRgKX0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8RGF5IHZhbHVlPXtxdW90YXRpb24uZ2V0KGB2YWxpZGF0ZWRBdGApfSAvPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGw+XG4gICAgICAgIDxEYXkgdmFsdWU9e3F1b3RhdGlvbi5nZXQoYHNpZ25lZEF0YCl9IC8+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPFNob3dJbnZvaWNlIGxpbmtBbGlrZSBxdW90YXRpb249eyBxdW90YXRpb24gfSAvPlxuICAgICAgICA8Q3JlYXRlSW52b2ljZSBsaW5rQWxpa2UgcXVvdGF0aW9uPXsgcXVvdGF0aW9uIH0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8QW1vdW50IHZhbHVlPXtxdW90YXRpb24uZ2V0KGB0b3RhbGApIH0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8QXJjaGl2ZVF1b3RhdGlvbiBpY29uIGxpbmtBbGlrZSBxdW90YXRpb249eyBxdW90YXRpb24gfSAvPlxuICAgICAgPC9DZWxsPlxuICAgIDwvUm93PlxuICApXG59XG5cbmNvbnN0IHF1b3RhdGlvbkNvbHVtbnMgPSBbXG4gIHtpZDogYGlkYCAgICAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmlkYCAgICAgICAgLCBzb3J0OiBgaW5kZXhgICAgICAgICAgLCB0eXBlOiBgaWRgICAgICAgIH0sXG4gIHtpZDogYG5hbWVgICAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLm5hbWVgICAgICAgLCBzb3J0OiBgbmFtZWAgICAgICAgICAgLCB0eXBlOiBgdGV4dGAgICAgIH0sXG4gIHtpZDogYGN1c3RvbWVyYCAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmN1c3RvbWVyYCAgLCBzb3J0OiBgY3VzdG9tZXIubmFtZWAgLCB0eXBlOiBgY3VzdG9tZXJgIH0sXG4gIHtpZDogYHNlbnRgICAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLnNlbnRgICAgICAgLCBzb3J0OiBgc2VuZEF0YCAgICAgICAgLCB0eXBlOiBgZGF0ZWAgICAgIH0sXG4gIHtpZDogYHZhbGlkYXRlZGAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLnZhbGlkYXRlZGAgLCBzb3J0OiBgdmFsaWRhdGVkQWRgICAgLCB0eXBlOiBgZGF0ZWAgICAgIH0sXG4gIHtpZDogYHNpZ25lZGAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLnNpZ25lZGAgICAgLCBzb3J0OiBgc2lnbmVkQXRgICAgICAgLCB0eXBlOiBgZGF0ZWAgICAgIH0sXG4gIHtpZDogYGludm9pY2VgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmludm9pY2VgICAgLCBzb3J0OiBgaW52b2ljZS5pbmRleGAgLCB0eXBlOiBgaWRgICAgICAgIH0sXG4gIHtpZDogYGFtb3VudGAgICAsIGxhYmVsOiBgdGFibGUuYW1vdW50YCAgICAgICAgICAgLCBzb3J0OiBgdG90YWxgICAgICAgICAgLCB0eXBlOiBgYW1vdW50YCAgIH0sXG4gIHtpZDogYGFyY2hpdmVgICAsIGxhYmVsOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgLCBzb3J0OiBmYWxzZSAgICAgICAgICAgLCB0eXBlOiBgYWN0aW9uYCAgIH0sXG5dXG5cbmZ1bmN0aW9uIFF1b3RhdGlvbnNMaXN0KCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIHF1b3RhdGlvbnMgPSBbXSxcbiAgICAuLi5yZXN0XG4gIH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxUYWJsZVxuICAgICAgcHJlc2VudGF0aW9uXG4gICAgICBjb2x1bW5zPXsgcXVvdGF0aW9uQ29sdW1ucyB9XG4gICAgICB7IC4uLnJlc3QgfVxuICAgID5cbiAgICB7IHF1b3RhdGlvbnMubWFwKCBxdW90YXRpb24gPT4gKFxuICAgICAgICA8UXVvdGF0aW9uUm93XG4gICAgICAgICAga2V5PXsgcXVvdGF0aW9uLmlkIH1cbiAgICAgICAgICBxdW90YXRpb249eyBxdW90YXRpb24gfVxuICAgICAgICAvPlxuICAgICkpfVxuICAgIDwvVGFibGU+XG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IEFjdGl2ZVF1b3RhdGlvbnMgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIHF1b3RhdGlvbnMgIDogc3RhdGUucXVvdGF0aW9ucy5nZXQoYGFjdGl2ZWApLFxuICAgIG1ldGEgICAgICAgIDogc3RhdGUucXVvdGF0aW9ucy5nZXQoYG1ldGEuYWN0aXZlYCksXG4gICAgaGlkZUNvbHVtbnMgOiBbYHNpZ25lZGAsIGBpbnZvaWNlYF0sXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IHF1b3RhdGlvbnMubGlzdEFjdGl2ZVxuICB9LCBkaXNwYXRjaCApKVxuKSggUXVvdGF0aW9uc0xpc3QgKVxuXG5leHBvcnQgY29uc3QgQXJjaGl2ZWRRdW90YXRpb25zID0gY29ubmVjdChcbiAgc3RhdGUgPT4gKHtcbiAgICBxdW90YXRpb25zICA6IHN0YXRlLnF1b3RhdGlvbnMuZ2V0KGBhcmNoaXZlZGApICAgICAsXG4gICAgbWV0YSAgICAgICAgOiBzdGF0ZS5xdW90YXRpb25zLmdldChgbWV0YS5hcmNoaXZlZGApLFxuICAgIGhpZGVDb2x1bW5zIDogW2BhcmNoaXZlYF0sXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IHF1b3RhdGlvbnMubGlzdEFyY2hpdmVkXG4gIH0sIGRpc3BhdGNoICkpXG4pKCBRdW90YXRpb25zTGlzdCApXG5cbmV4cG9ydCBjb25zdCBRdW90YXRpb25zUmVhZHlUb0ludm9pY2UgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIHF1b3RhdGlvbnM6ICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYHJlYWR5VG9JbnZvaWNlYCksXG4gICAgbWV0YTogICAgICAgICBzdGF0ZS5xdW90YXRpb25zLmdldChgbWV0YS5yZWFkeVRvSW52b2ljZWApLFxuICAgIHRpdGxlOiAgICAgICAgYHF1b3RhdGlvbi5yZWFkeS10by1pbnZvaWNlYCxcbiAgICBoaWRlQ29sdW1ucyA6IFsgYHNlbnRgLCBgdmFsaWRhdGVkYCBdLFxuICAgIGhpZGVPbkVtcHR5OiAgdHJ1ZSxcbiAgfSksXG4gIGRpc3BhdGNoID0+ICggYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVQYWdlU29ydDogcXVvdGF0aW9ucy5saXN0UmVhZHlUb0ludm9pY2VcbiAgfSwgZGlzcGF0Y2ggKSlcbikoICBRdW90YXRpb25zTGlzdCApXG5cbmV4cG9ydCBjb25zdCBDdXN0b21lclF1b3RhdGlvbnMgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIHF1b3RhdGlvbnM6ICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYGFjdGl2ZWApLFxuICAgIG1ldGE6ICAgICAgICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYG1ldGEuYWN0aXZlYCksXG4gICAgaGlkZUNvbHVtbnMgOiBbYGN1c3RvbWVyYF0sXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IHF1b3RhdGlvbnMubGlzdEZvckN1c3RvbWVyXG4gIH0sIGRpc3BhdGNoICkpXG4pKCBRdW90YXRpb25zTGlzdCApXG5cbmV4cG9ydCBkZWZhdWx0IFF1b3RhdGlvbnNMaXN0XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlICAgfSBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgKiBhcyBxdW90YXRpb25zICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCB7ICAgIEJ1dHRvbiAgICAsIEJ0bkljb24gfSBmcm9tICcuLi91aS9idXR0b25zJ1xuXG4vLy0tLS0tIFNIT1cgSU5WT0lDRVxuXG5mdW5jdGlvbiBCdXR0b25TaG93SW52b2ljZSggcHJvcHMgKSB7XG4gIGNvbnN0IHtcbiAgICBxdW90YXRpb24sXG4gICAgaXNTYXZpbmcsXG4gICAgd2l0aE1lc3NhZ2UsXG4gICAgZGlzcGF0Y2gsXG4gICAgLi4ucmVzdFxuICB9ID0gcHJvcHNcbiAgaWYgKCAhcXVvdGF0aW9uICkgcmV0dXJuIG51bGxcblxuICBjb25zdCBpbnZvaWNlSWQgPSBxdW90YXRpb24uZ2V0KGBpbnZvaWNlSWRgKVxuICBpZiAoICFpbnZvaWNlSWQgKSByZXR1cm4gbnVsbFxuICBjb25zdCBpc0ludm9pY2VBcmNoaXZlZCA9IHF1b3RhdGlvbi5nZXQoYGludm9pY2UuYXJjaGl2ZWRBdGApXG5cbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uIHNlY29uZGFyeVxuICAgICAgdG89e2AvaW52b2ljZXMvJHsgaW52b2ljZUlkIH0ke2lzSW52b2ljZUFyY2hpdmVkID8gYC9wcmV2aWV3YCA6IGBgIH1gIH1cbiAgICAgIGRpc2FibGVkPXsgaXNTYXZpbmcgfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge1xuICAgICAgICB3aXRoTWVzc2FnZSA/IDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicXVvdGF0aW9uLmludm9pY2Uuc2hvd1wiIC8+XG4gICAgICAgICAgOiBxdW90YXRpb24uZ2V0KGBpbnZvaWNlLnJlZmVyZW5jZWApXG4gICAgICB9XG4gICAgPC9CdXR0b24+XG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IFNob3dJbnZvaWNlID0gY29ubmVjdChcbiAgc3RhdGUgPT4gKHtcbiAgICBpc1NhdmluZyA6IHN0YXRlLnF1b3RhdGlvbnMuZ2V0KCBgaXNTYXZpbmdgICksXG4gIH0pXG4pKCBCdXR0b25TaG93SW52b2ljZSApXG5cbi8vLS0tLS0gQ1JFQVRFIElOVk9JQ0VcblxuZnVuY3Rpb24gQnV0dG9uQ3JlYXRlSW52b2ljZSggcHJvcHMgKSB7XG4gIGNvbnN0IHsgcXVvdGF0aW9uLCBjcmVhdGVJbnZvaWNlLCBpc1NhdmluZywgLi4ub3RoZXJzIH0gPSBwcm9wc1xuICBpZiAoICFxdW90YXRpb24gKSByZXR1cm4gbnVsbFxuICBjb25zdCBpZCAgICAgICAgICA9IHF1b3RhdGlvbi5nZXQoYGlkYCAgICAgICAgIClcbiAgY29uc3QgaXNBdmFpbGFibGUgPSBxdW90YXRpb24uZ2V0KGBfY2FuQ3JlYXRlSW52b2ljZWApXG4gIGlmICggIWlzQXZhaWxhYmxlICkgcmV0dXJuIG51bGxcblxuICBjb25zdCBidG5Qcm9wcyA9IHtcbiAgICBvbkNsaWNrOiBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjcmVhdGVJbnZvaWNlKHsgaWQgfSlcbiAgICB9LFxuICAgIHR5cGUgICAgICA6IGBzdWJtaXRgICAgICAgICAgICAgICAgICAgICAgLFxuICAgIGZvcm1NZXRob2Q6IGBwb3N0YCAgICAgICAgICAgICAgICAgICAgICAgLFxuICAgIGZvcm1BY3Rpb246IGAvcXVvdGF0aW9ucy8keyBpZCB9L2NyZWF0ZS1pbnZvaWNlYCxcbiAgICBkaXNhYmxlZCAgOiBpc1NhdmluZyAgICAgICAgICAgICAgICAgICAgICxcbiAgICAuLi5vdGhlcnNcbiAgfVxuICByZXR1cm4gKFxuICAgIDxCdXR0b24gc2Vjb25kYXJ5XG4gICAgICB7Li4uYnRuUHJvcHN9XG4gICAgPlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJxdW90YXRpb24uaW52b2ljZS5jcmVhdGVcIiAvPlxuICAgIDwvQnV0dG9uPlxuICApXG59XG5cbmV4cG9ydCBjb25zdCBDcmVhdGVJbnZvaWNlID0gY29ubmVjdChcbiAgc3RhdGUgPT4gKHtcbiAgICBpc1NhdmluZyA6IHN0YXRlLnF1b3RhdGlvbnMuZ2V0KCBgaXNTYXZpbmdgICksXG4gIH0pLFxuICBkaXNwYXRjaCA9PiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIGNyZWF0ZUludm9pY2U6IHF1b3RhdGlvbnMuY3JlYXRlSW52b2ljZVxuICB9LCBkaXNwYXRjaCksXG4pKCBCdXR0b25DcmVhdGVJbnZvaWNlIClcblxuLy8tLS0tLSBBUkNISVZFXG5cbmZ1bmN0aW9uIEJ1dHRvbkFyY2hpdmVRdW90YXRpb24oIHByb3BzICkge1xuICBjb25zdCB7IHF1b3RhdGlvbiwgYXJjaGl2ZU9uZSwgaXNTYXZpbmcsIGljb24sIC4uLm90aGVycyB9ID0gcHJvcHNcbiAgaWYgKCAhcXVvdGF0aW9uICkgcmV0dXJuIG51bGxcblxuICBjb25zdCBpZCAgICAgICAgICA9IHF1b3RhdGlvbi5nZXQoYGlkYCAgICAgICAgIClcbiAgY29uc3QgaXNBdmFpbGFibGUgPSBxdW90YXRpb24uZ2V0KGBfY2FuQmVBcmNoaXZlZGApXG4gIGlmICggIWlzQXZhaWxhYmxlICkgcmV0dXJuIG51bGxcblxuICBjb25zdCBidG5Qcm9wcyA9IHtcbiAgICBvbkNsaWNrOiBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBhcmNoaXZlT25lKHtpZH0pXG4gICAgfSxcbiAgICB0eXBlICAgICAgOiBgc3VibWl0YCAgICAgICAgICAgICAgICAgICAgICxcbiAgICBmb3JtTWV0aG9kOiBgcG9zdGAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgICBmb3JtQWN0aW9uOiBgL3F1b3RhdGlvbnMvJHsgaWQgfS9hcmNoaXZlYCxcbiAgICBkaXNhYmxlZCAgOiBpc1NhdmluZyAgICAgICAgICAgICAgICAgICAgICxcbiAgICAuLi5vdGhlcnNcbiAgfVxuICBpZiAoIGljb24gKSByZXR1cm4gPEJ0bkljb24gc3ZnSWQ9XCJhcmNoaXZlXCIgey4uLmJ0blByb3BzIH0vPlxuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvbiB7Li4uYnRuUHJvcHMgfSA+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInF1b3RhdGlvbi5idXR0b24uYXJjaGl2ZVwiIC8+XG4gICAgPC9CdXR0b24+XG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IEFyY2hpdmVRdW90YXRpb24gPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGlzU2F2aW5nOiBzdGF0ZS5xdW90YXRpb25zLmdldCggYGlzU2F2aW5nYCApLFxuICB9KSxcbiAgZGlzcGF0Y2ggPT4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBhcmNoaXZlT25lOiBxdW90YXRpb25zLmFyY2hpdmVPbmVcbiAgfSwgZGlzcGF0Y2gpLFxuKSggQnV0dG9uQXJjaGl2ZVF1b3RhdGlvbiApXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7IFBpZUNoYXJ0ICwgUGllQ2hhcnREZWZzIH0gZnJvbSAnLi4vdWkvcGllLWNoYXJ0J1xuaW1wb3J0IHsgQW1vdW50ICAgLCBGb3JtYXROdW1iZXIgfSBmcm9tICcuLi91aS9mb3JtYXQnXG5cbmltcG9ydCAnLi9jaGFydHMuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgaG9tZS1jaGFydHNgXG5cbmV4cG9ydCBmdW5jdGlvbiBIb21lQ2hhcnRzKCBwcm9wcyApIHtcbiAgY29uc3QgeyBzdGF0aXN0aWNzIH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXsgQkFTRV9DTEFTUyB9PlxuICAgICAgPFBpZUNoYXJ0RGVmcyAvPlxuICAgICAgPFBpZUNoYXJ0XG4gICAgICAgIHRpdGxlPVwiXy5jb3VudFwiXG4gICAgICAgIHNsaWNlcz17W1xuICAgICAgICAgIHtsYWJlbDogYF8ucXVvdGF0aW9uc2AgLCB2YWx1ZTogc3RhdGlzdGljcy5xdW90YXRpb25zQ291bnQgfSxcbiAgICAgICAgICB7bGFiZWw6IGBfLmludm9pY2VzYCAgICwgdmFsdWU6IHN0YXRpc3RpY3MuaW52b2ljZXNDb3VudCAgIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIDxGb3JtYXROdW1iZXJcbiAgICAgICAgICB3cmFwcGVyUHJvcHM9e3tzdHlsZToge2ZvbnRTaXplOiBgM3JlbWB9fX1cbiAgICAgICAgICB2YWx1ZT17c3RhdGlzdGljcy5xdW90YXRpb25zQ291bnQgKyBzdGF0aXN0aWNzLmludm9pY2VzQ291bnQgfVxuICAgICAgICAvPlxuICAgICAgPC9QaWVDaGFydD5cbiAgICAgIDxQaWVDaGFydFxuICAgICAgICB0aXRsZT1cIl8uYW1vdW50XCJcbiAgICAgICAgdHlwZT1cImN1cnJlbmN5XCJcbiAgICAgICAgc2xpY2VzPXtbXG4gICAgICAgICAge2xhYmVsOiBgXy5xdW90YXRpb25zYCAgICAsIHZhbHVlOiBzdGF0aXN0aWNzLnF1b3RhdGlvbnNUb3RhbCAgIH0sXG4gICAgICAgICAge2xhYmVsOiBgXy5pbnZvaWNlcy5sZWZ0YCAsIHZhbHVlOiBzdGF0aXN0aWNzLmludm9pY2VzVG90YWxMZWZ0IH0sXG4gICAgICAgICAge2xhYmVsOiBgXy5pbnZvaWNlcy5wYWlkYCAsIHZhbHVlOiBzdGF0aXN0aWNzLmludm9pY2VzVG90YWxQYWlkIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIDxBbW91bnQgdmFsdWU9eyBzdGF0aXN0aWNzLnF1b3RhdGlvbnNUb3RhbCArIHN0YXRpc3RpY3MuaW52b2ljZXNUb3RhbCB9IC8+XG4gICAgICA8L1BpZUNoYXJ0PlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCAgIHJvdW5kICAgICAgICAgICAgICBmcm9tICdsb2Rhc2gucm91bmQnXG5cbmltcG9ydCB7IFBlcmNlbnQgfSBmcm9tICcuL2Zvcm1hdCdcblxuaW1wb3J0ICcuL3BpZS1jaGFydC5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBwaWUtY2hhcnRgXG5cbmZ1bmN0aW9uIGNvbXB1dGVUb3RhbCggdG90YWwsIHNsaWNlICkge1xuICBpZiAoICFOdW1iZXIuaXNGaW5pdGUoc2xpY2UudmFsdWUpICkgcmV0dXJuIDBcbiAgcmV0dXJuIHNsaWNlLnZhbHVlICsgdG90YWxcbn1cblxuLy8gZG9uJ3QgcmVwZWF0IHRoZSBkZWZzIG9uIGV2ZXJ5IFNWR1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0RGVmcyggcHJvcHMgKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2aWV3Qm94PVwiLTEgLTEgMiAyXCIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fZGVmc2B9PlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxjbGlwUGF0aCBpZD1cInBpZS1jbGlwLWFsbFwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIwXCIgY3k9XCIwXCIgcj1cIjFcIiAvPlxuICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgPC9kZWZzPlxuICAgIDwvc3ZnPlxuICApXG59XG5cbmV4cG9ydCBjbGFzcyBQaWVDaGFydCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b3RhbCA6IG51bGwsXG4gICAgICBzbGljZXM6IFtdLFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoIG5leHRQcm9wcywgcHJldlN0YXRlICkge1xuICAgIGNvbnN0IHNsaWNlcyAgPSBuZXh0UHJvcHMuc2xpY2VzLm1hcCggc2xpY2UgPT4ge1xuICAgICAgc2xpY2UudmFsdWUgPSBOdW1iZXIuaXNGaW5pdGUoIHNsaWNlLnZhbHVlICkgPyBzbGljZS52YWx1ZSA6IDBcbiAgICAgIHJldHVybiBzbGljZVxuICAgIH0pXG4gICAgY29uc3QgdG90YWwgICA9IHNsaWNlcy5yZWR1Y2UoIGNvbXB1dGVUb3RhbCwgMCApXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG90YWwsXG4gICAgICBzbGljZXM6ICBzbGljZXMubWFwKCBzbGljZSA9PiAoe1xuICAgICAgICAuLi5zbGljZSxcbiAgICAgICAgLy8gZG9uJ3QgZGl2aWRlIGJ5IDAgOkRcbiAgICAgICAgcGVyY2VudDogdG90YWwgPyByb3VuZChzbGljZS52YWx1ZSAvIHRvdGFsLCA0KSA6IDAsXG4gICAgICB9KSksXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldENvb3JkaW5hdGVzKCBwZXJjZW50ICkge1xuICAgIGNvbnN0IHggPSBNYXRoLmNvcygyICogTWF0aC5QSSAqIHBlcmNlbnQpXG4gICAgY29uc3QgeSA9IE1hdGguc2luKDIgKiBNYXRoLlBJICogcGVyY2VudClcbiAgICByZXR1cm4gWyByb3VuZCh4LCA4KSwgcm91bmQoeSwgOCkgXVxuICB9XG5cbiAgY3JlYXRlU2xpY2VzKCkge1xuICAgIGNvbnN0IHsgc2xpY2VzIH0gPSB0aGlzLnN0YXRlXG4gICAgbGV0IGN1bXVsYXRpdmVQZXJjZW50ID0gMFxuICAgIHJldHVybiBzbGljZXNcbiAgICAubWFwKCAoc2xpY2UsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoIHNsaWNlLnBlcmNlbnQgPT09IDEgKSB7XG4gICAgICAgIHJldHVybiA8Y2lyY2xlIGtleT1cImluZGV4XCIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fc2xpY2VgfSBjeD1cIjBcIiBjeT1cIjBcIiByPVwiMVwiIC8+XG4gICAgICB9XG4gICAgICBjb25zdCBbIHN0YXJ0WCwgc3RhcnRZIF0gPSBQaWVDaGFydC5nZXRDb29yZGluYXRlcyggY3VtdWxhdGl2ZVBlcmNlbnQgKVxuICAgICAgLy8gZWFjaCBzbGljZSBzdGFydHMgd2hlcmUgdGhlIGxhc3Qgc2xpY2UgZW5kZWQsIHNvIGtlZXAgYSBjdW11bGF0aXZlIHBlcmNlbnRcbiAgICAgIGN1bXVsYXRpdmVQZXJjZW50ID0gY3VtdWxhdGl2ZVBlcmNlbnQgKyBzbGljZS5wZXJjZW50XG4gICAgICBjb25zdCBbZW5kWCwgZW5kWV0gPSBQaWVDaGFydC5nZXRDb29yZGluYXRlcyggY3VtdWxhdGl2ZVBlcmNlbnQgKVxuICAgICAgLy8gaWYgdGhlIHNsaWNlIGlzIG1vcmUgdGhhbiA1MCUsIHRha2UgdGhlIGxhcmdlIGFyYyAodGhlIGxvbmcgd2F5IGFyb3VuZClcbiAgICAgIGNvbnN0IGxhcmdlQXJjRmxhZyA9IHNsaWNlLnBlcmNlbnQgPiAuNSA/IDEgOiAwXG4gICAgICBjb25zdCBwYXRoRGF0YSA9IFtcbiAgICAgICAgYE0gJHtzdGFydFh9ICR7c3RhcnRZfWAsXG4gICAgICAgIGBBIDEgMSAwICR7bGFyZ2VBcmNGbGFnfSAxICR7ZW5kWH0gJHtlbmRZfWAsXG4gICAgICAgIC8vIGluIGNhc2Ugd2Ugd2FudCB0byBtYWtlIGEgZmlsbGVkIHBpZS1jaGFydFxuICAgICAgICAvLyBgTCAwIDBgLFxuICAgICAgXS5qb2luKGAgYClcbiAgICAgIHJldHVybiA8cGF0aCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19zbGljZWB9IGtleT17IGluZGV4IH0gZD17IHBhdGhEYXRhIH0gLz5cbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlTGFiZWxzKCkge1xuICAgIGNvbnN0IHsgc2xpY2VzIH0gPSB0aGlzLnN0YXRlXG4gICAgcmV0dXJuIChcbiAgICAgIDxvbCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19saXN0YH0+XG4gICAgICAgIHsgc2xpY2VzLm1hcCggKHNsaWNlLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e2luZGV4fSBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19saXN0X2l0ZW1gfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fbGFiZWxgfT5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eyBzbGljZS5sYWJlbCB9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxQZXJjZW50IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3ZhbHVlYH0gdmFsdWU9eyBzbGljZS5wZXJjZW50IH0gLz5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApKX1cbiAgICAgIDwvb2w+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IHRoaXNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e0JBU0VfQ0xBU1N9PlxuICAgICAgICA8cCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X190aXRsZWB9PlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsgcHJvcHMudGl0bGUgfSAvPlxuICAgICAgICA8L3A+XG4gICAgICAgIDxmaWd1cmUgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcGllLXdyYXBwZXJgfT5cbiAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCItMSAtMSAyIDJcIiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19waWVgfT5cbiAgICAgICAgICAgIDxnIGNsaXBQYXRoPVwidXJsKCNwaWUtY2xpcC1hbGwpXCI+XG4gICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIwXCIgY3k9XCIwXCIgcj1cIjFcIiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19waWUtYmdgfSAvPlxuICAgICAgICAgICAgICB7IHRoaXMuY3JlYXRlU2xpY2VzKCkgfVxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIHsgcHJvcHMuY2hpbGRyZW4gJiYgKFxuICAgICAgICAgICAgPGZpZ2NhcHRpb24gY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcGllLWNhcHRpb25gfT5cbiAgICAgICAgICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgICAgICAgICA8L2ZpZ2NhcHRpb24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9maWd1cmU+XG4gICAgICAgIHsgdGhpcy5jcmVhdGVMYWJlbHMoKSB9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaC5yb3VuZFwiKTsiLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICAgICAgIGZyb20gJy4uL2R1Y2tzL3F1b3RhdGlvbnMnXG5pbXBvcnQgKiBhcyBpbnZvaWNlcyAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvaW52b2ljZXMnXG5cbmltcG9ydCB7IE5hdlNlY29uZGFyeSAgICAgICAgICAgfSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHsgQnV0dG9uTmV3ICAgICAgICAgICAgICB9IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCB7IE1haW4gICAgICAgICAsIENvbnRlbnQgfSBmcm9tICcuLi9sYXlvdXQvbWFpbidcbmltcG9ydCB7IEFyY2hpdmVkUXVvdGF0aW9ucyAgICAgfSBmcm9tICcuLi9xdW90YXRpb25zL2xpc3QnXG5pbXBvcnQgeyBBcmNoaXZlZEludm9pY2VzICAgICAgIH0gZnJvbSAnLi4vaW52b2ljZXMvbGlzdCdcblxuZnVuY3Rpb24gQXJjaGl2ZWRMaXN0KCBwcm9wcyApIHtcbiAgY29uc3QgdGl0bGVQcm9wcyA9IHsgaWQ6IGBwYWdlLmFyY2hpdmVkYCB9XG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgey8qIGh0dHBzOi8vZ2l0aHViLmNvbS9uZmwvcmVhY3QtaGVsbWV0L2lzc3Vlcy8yNjgjaXNzdWVjb21tZW50LTM2ODE0ODI0OSAqL31cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPEJ1dHRvbk5ldyB0eXBlPVwicXVvdGF0aW9uc1wiIG1lc3NhZ2U9XCJxdW90YXRpb24uYnV0dG9uLm5ld1wiIC8+XG4gICAgICA8L05hdlNlY29uZGFyeT5cbiAgICAgIDxNYWluPlxuICAgICAgICA8Q29udGVudD5cbiAgICAgICAgICA8QXJjaGl2ZWRRdW90YXRpb25zIHRpdGxlPVwicGFnZS5xdW90YXRpb25zXCIgLz5cbiAgICAgICAgICA8QXJjaGl2ZWRJbnZvaWNlcyAgIHRpdGxlPVwicGFnZS5pbnZvaWNlc1wiICAgLz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbikoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogQXJjaGl2ZWRMaXN0LFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIHF1b3RhdGlvbnMubGlzdEFyY2hpdmVkLFxuICAgIGludm9pY2VzLmxpc3RBcmNoaXZlZCxcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBDb25uZWN0RGF0YUZldGNoZXIgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBxdW90YXRpb25zICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCB7ICAgIE5hdlNlY29uZGFyeSB9IGZyb20gJy4uL25hdi9zZWNvbmRhcnknXG5pbXBvcnQgKiBhcyBOYXZCdXR0b25zICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5LWJ1dHRvbnMnXG5pbXBvcnQgKiBhcyBMYXlvdXRNYWluICAgICBmcm9tICcuLi9sYXlvdXQvbWFpbidcbmltcG9ydCB7ICAgIFByZXZpZXcgICAgICB9IGZyb20gJy4uL3VpL3ByZXZpZXcnXG5pbXBvcnQgKiBhcyBLZXlQcmVzICAgICAgICBmcm9tICcuLi91aS9rZXktcHJlc2VudGF0aW9uJ1xuaW1wb3J0ICogYXMgRm9ybWF0ICAgICAgICAgZnJvbSAnLi4vdWkvZm9ybWF0J1xuXG5mdW5jdGlvbiBTaG93QXJjaGl2ZWRRdW90YXRpb24oIHByb3BzICkge1xuICBjb25zdCB7IHF1b3RhdGlvbiB9ID0gcHJvcHNcbiAgY29uc3QgdGl0bGVQcm9wcyA9IHsgaWQ6IGBwYWdlLmFyY2hpdmVkYCB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICB7LyogaHR0cHM6Ly9naXRodWIuY29tL25mbC9yZWFjdC1oZWxtZXQvaXNzdWVzLzI2OCNpc3N1ZWNvbW1lbnQtMzY4MTQ4MjQ5ICovfVxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IChcbiAgICAgICAgICA8SGVsbWV0PlxuICAgICAgICAgICAgPHRpdGxlPnt0aXRsZX08L3RpdGxlPlxuICAgICAgICAgICAgPGh0bWwgY2xhc3NOYW1lPVwibGlnaHQtYmFja2dyb3VuZFwiIC8+XG4gICAgICAgICAgPC9IZWxtZXQ+XG4gICAgICAgICl9XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgICA8TmF2QnV0dG9ucy5OZXcgdHlwZT1cInF1b3RhdGlvbnNcIiBtZXNzYWdlPVwicXVvdGF0aW9uLmJ1dHRvbi5uZXdcIiAvPlxuICAgICAgICA8TmF2QnV0dG9ucy5QcmludCAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG5cbiAgICAgIDxMYXlvdXRNYWluLldyYXBwZXI+XG5cbiAgICAgICAgPExheW91dE1haW4uTWV0YT5cbiAgICAgICAgICA8S2V5UHJlcy5XcmFwcGVyPlxuICAgICAgICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJrZXktcHJlcy5jdXN0b21lclwiIC8+XG4gICAgICAgICAgICA8S2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICAgICAgPExpbmsgdG89e2AvY3VzdG9tZXJzLyR7cXVvdGF0aW9uLmdldChgY3VzdG9tZXJJZGApfWB9PlxuICAgICAgICAgICAgICAgIHsgcXVvdGF0aW9uLmdldCggYGN1c3RvbWVyLm5hbWVgICkgfVxuICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICA8L0tleVByZXMuVmFsdWU+XG4gICAgICAgICAgICB7cXVvdGF0aW9uLmdldChgaW52b2ljZUlkYCkgJiYgKFxuICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJrZXktcHJlcy5hc3NvY2lhdGVkLmludm9pY2VcIiAvPlxuICAgICAgICAgICAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICAgICAgICAgICAgPExpbmsgdG89e2AvaW52b2ljZXMvJHtxdW90YXRpb24uZ2V0KGBpbnZvaWNlSWRgKX1gfT5cbiAgICAgICAgICAgICAgICAgICAgeyBxdW90YXRpb24uZ2V0KCBgaW52b2ljZS5yZWZlcmVuY2VgICkgfVxuICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8S2V5UHJlcy5MYWJlbCBpZD1cImtleS1wcmVzLnNlbnRcIiAvPlxuICAgICAgICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgICAgICAgIDxGb3JtYXQuRGF5IHZhbHVlPXtxdW90YXRpb24uZ2V0KGBzZW5kQXRgKX0gLz5cbiAgICAgICAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwia2V5LXByZXMudmFsaWRhdGVkXCIgLz5cbiAgICAgICAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICAgICAgICA8Rm9ybWF0LkRheSB2YWx1ZT17cXVvdGF0aW9uLmdldChgdmFsaWRhdGVkQXRgKX0gLz5cbiAgICAgICAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwia2V5LXByZXMuc2lnbmVkXCIgLz5cbiAgICAgICAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICAgICAgICA8Rm9ybWF0LkRheSB2YWx1ZT17cXVvdGF0aW9uLmdldChgc2lnbmVkQXRgKX0gLz5cbiAgICAgICAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwia2V5LXByZXMudG90YWxcIiAvPlxuICAgICAgICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXtxdW90YXRpb24uZ2V0KGB0b3RhbGApfSAvPlxuICAgICAgICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgICAgIDwvS2V5UHJlcy5XcmFwcGVyPlxuICAgICAgICA8L0xheW91dE1haW4uTWV0YT5cblxuICAgICAgICA8TGF5b3V0TWFpbi5Db250ZW50PlxuICAgICAgICAgIDxQcmV2aWV3IHR5cGU9XCJxdW90YXRpb25cIiBkb2N1bWVudD17IHF1b3RhdGlvbiB9IC8+XG4gICAgICAgIDwvTGF5b3V0TWFpbi5Db250ZW50PlxuXG4gICAgICA8L0xheW91dE1haW4uV3JhcHBlcj5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4gKHtcbiAgICBxdW90YXRpb246IHN0YXRlLnF1b3RhdGlvbnMuZ2V0KGBjdXJyZW50YCksXG4gIH0pXG4pKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IFNob3dBcmNoaXZlZFF1b3RhdGlvbixcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBxdW90YXRpb25zLmdldE9uZSxcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgICBQcm9wVHlwZXMgICAgICAgICAgICAgIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkSFRNTE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQge1xuICBQYXBlclNoZWV0LFxuICBQYXJ0eSxcbiAgUGFydHlVc2VyLFxuICBSZWZlcmVuY2UsXG4gIEJldHdlZW4sXG4gIFN1YmplY3QsXG4gIE1lbnRpb25zLFxufSBmcm9tICcuLi9sYXlvdXQvcGFwZXItc2hlZXQnXG5pbXBvcnQgeyBBbGVydCB9IGZyb20gJy4vYWxlcnRzJ1xuaW1wb3J0IHsgUHJvZHVjdFRhYmxlIH0gZnJvbSAnLi4vdWktdGFibGUvcHJvZHVjdHMnXG5cbmV4cG9ydCBmdW5jdGlvbiBQcmV2aWV3KCBwcm9wcyApIHtcbiAgY29uc3QgeyBkb2N1bWVudCwgdHlwZSB9ID0gcHJvcHNcbiAgY29uc3QgcHJvZHVjdHMgPSBkb2N1bWVudC5nZXQoYHByb2R1Y3RzYClcbiAgaWYgKCAhZG9jdW1lbnQgfHwgIXByb2R1Y3RzICkgcmV0dXJuIG51bGxcblxuICByZXR1cm4gKFxuICAgIDxQYXBlclNoZWV0IHByZXZpZXc+XG4gICAgICA8UmVmZXJlbmNlIHR5cGU9eyB0eXBlIH0gcHJvZHVjdD17IGRvY3VtZW50IH0gLz5cbiAgICAgIDxCZXR3ZWVuPlxuICAgICAgICA8UGFydHlVc2VyIC8+XG4gICAgICAgIDxQYXJ0eSB0aXRsZT1cInRvXCIgcGVvcGxlPXsgZG9jdW1lbnQuZ2V0KGBjdXN0b21lcmApIH0gLz5cbiAgICAgIDwvQmV0d2Vlbj5cbiAgICAgIDxTdWJqZWN0IHZhbHVlPXsgZG9jdW1lbnQuZ2V0KGBuYW1lYCl9IC8+XG4gICAgICA8UHJvZHVjdFRhYmxlXG4gICAgICAgIHJlYWRPbmx5XG4gICAgICAgIGRvY3VtZW50PXsgZG9jdW1lbnQgfVxuICAgICAgLz5cbiAgICAgIDxNZW50aW9ucyBjb250ZW50PXsgZG9jdW1lbnQuZ2V0KGAke3R5cGV9Q29uZmlnLm1lbnRpb25zYCkgfSAvPlxuICAgIDwvUGFwZXJTaGVldD5cbiAgKVxufVxuXG5QcmV2aWV3LnByb3BUeXBlcyA9IHtcbiAgZG9jdW1lbnQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgdHlwZSAgICA6IFByb3BUeXBlcy5vbmVPZihbYHF1b3RhdGlvbmAsIGBpbnZvaWNlYF0pLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJpbnRpbmdOb3RpY2UoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxBbGVydCB3YXJuaW5nIGNsYXNzTmFtZT1cInByaW50aW5nLW5vdGljZVwiPlxuICAgICAgPEZvcm1hdHRlZEhUTUxNZXNzYWdlIGlkPVwiXy5wcmludC1ub3RpY2VcIiAvPlxuICAgIDwvQWxlcnQ+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIFByb3BUeXBlcyAgICAgICAgICBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAnLi9rZXktcHJlc2VudGF0aW9uLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTICA9IGBrZXktcHJlc2VudGF0aW9uYFxuXG5leHBvcnQgZnVuY3Rpb24gUHJlc0J5S2V5KCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8ZGwgY2xhc3NOYW1lPXsgQkFTRV9DTEFTUyB9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9kbD5cbiAgKVxufVxuZXhwb3J0IHsgUHJlc0J5S2V5IGFzIFdyYXBwZXIgfVxuXG5leHBvcnQgZnVuY3Rpb24gS2V5TGFiZWwoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxkdCBjbGFzc05hbWU9e2AkeyBCQVNFX0NMQVNTfV9fbGFiZWxgfT5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi5wcm9wc30gLz5cbiAgICA8L2R0PlxuICApXG59XG5LZXlMYWJlbC5wcm9wVHlwZXMgPSB7XG4gIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59XG5leHBvcnQgeyBLZXlMYWJlbCBhcyBMYWJlbCB9XG5cbmV4cG9ydCBmdW5jdGlvbiBLZXlWYWx1ZSggcHJvcHMgKSB7XG4gIHJldHVybiAoXG4gICAgPGRkIGNsYXNzTmFtZT17YCR7IEJBU0VfQ0xBU1N9X192YWx1ZWB9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9kZD5cbiAgKVxufVxuZXhwb3J0IHsgS2V5VmFsdWUgYXMgVmFsdWUgfVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9pbnZvaWNlcydcblxuaW1wb3J0IHsgICAgTmF2U2Vjb25kYXJ5ICB9IGZyb20gJy4uL25hdi9zZWNvbmRhcnknXG5pbXBvcnQgKiBhcyBOYXZCdXR0b25zICAgICAgZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0ICogYXMgTWFpbiAgICAgICAgICAgIGZyb20gJy4uL2xheW91dC9tYWluJ1xuaW1wb3J0ICogYXMgVGFicyAgICAgICAgICAgIGZyb20gJy4uL3VpL3RhYnMnXG5pbXBvcnQgeyAgICBQcm9ncmVzcyAgICAgIH0gZnJvbSAnLi4vdWkvcHJvZ3Jlc3MnXG5pbXBvcnQgeyAgICBQcmV2aWV3ICAgICAgIH0gZnJvbSAnLi4vdWkvcHJldmlldydcbmltcG9ydCB7ICAgIEludm9pY2VIZWFkZXIgfSBmcm9tICcuLi9pbnZvaWNlcy9oZWFkZXInXG5pbXBvcnQgeyAgICBJbnZvaWNlRXZlbnRzIH0gZnJvbSAnLi4vaW52b2ljZXMvZXZlbnRzLXRhYmxlJ1xuaW1wb3J0ICogYXMgRXZlbnRzICAgICAgICAgIGZyb20gJy4uL2ludm9pY2VzL2V2ZW50cy1yZWFkLW9ubHknXG5cbmZ1bmN0aW9uIFNob3dBcmNoaXZlZEludm9pY2UoIHByb3BzICkge1xuICBjb25zdCB7IGludm9pY2UgfSA9IHByb3BzXG4gIGNvbnN0IHBheW1lbnRzICAgID0gaW52b2ljZS5nZXQoIGBwYXltZW50c2AgKVxuICBjb25zdCB0aXRsZVByb3BzID0geyBpZDogYHBhZ2UuYXJjaGl2ZWRgIH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIHsvKiBodHRwczovL2dpdGh1Yi5jb20vbmZsL3JlYWN0LWhlbG1ldC9pc3N1ZXMvMjY4I2lzc3VlY29tbWVudC0zNjgxNDgyNDkgKi99XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gKFxuICAgICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgICA8dGl0bGU+e3RpdGxlfTwvdGl0bGU+XG4gICAgICAgICAgICA8aHRtbCBjbGFzc05hbWU9XCJsaWdodC1iYWNrZ3JvdW5kXCIgLz5cbiAgICAgICAgICA8L0hlbG1ldD5cbiAgICAgICAgKX1cbiAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgICA8TmF2QnV0dG9ucy5OZXcgdHlwZT1cInF1b3RhdGlvbnNcIiBtZXNzYWdlPVwicXVvdGF0aW9uLmJ1dHRvbi5uZXdcIiAvPlxuICAgICAgICA8TmF2QnV0dG9ucy5QcmludCAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8VGFicy5XcmFwcGVyPlxuICAgICAgICA8VGFicy5MaXN0PlxuICAgICAgICAgIDxUYWJzLkhlYWRlcj5cbiAgICAgICAgICAgIDxJbnZvaWNlSGVhZGVyIGludm9pY2U9eyBpbnZvaWNlIH0gLz5cbiAgICAgICAgICA8L1RhYnMuSGVhZGVyPlxuICAgICAgICAgIDxUYWJzLlRhYj5cbiAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMudGFiLnBheW1lbnRzXCIgLz5cbiAgICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgICAgIDxUYWJzLlRhYj5cbiAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMudGFiLnByZXZpZXdcIiAvPlxuICAgICAgICAgIDwvVGFicy5UYWI+XG4gICAgICAgIDwvVGFicy5MaXN0PlxuXG4gICAgICAgIHsvKiBQQVlNRU5UUyAqL31cbiAgICAgICAgPFRhYnMuUGFuZWw+XG4gICAgICAgICAgPFByb2dyZXNzXG4gICAgICAgICAgICBtYXg9eyAgIGludm9pY2UuZ2V0KGB0b3RhbGApIH1cbiAgICAgICAgICAgIHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsUGFpZGApIH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbnZvaWNlRXZlbnRzXG4gICAgICAgICAgICBpbnZvaWNlPXsgaW52b2ljZSB9XG4gICAgICAgICAgICBoaWRlQ29sdW1ucz17W2BhY3Rpb25gXX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RXZlbnRzLlNlbnRcbiAgICAgICAgICAgICAgaW52b2ljZT17IGludm9pY2UgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHsgcGF5bWVudHMubWFwKChwYXltZW50LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8RXZlbnRzLlBheW1lbnRcbiAgICAgICAgICAgICAgICBrZXk9eyBwYXltZW50Ll9pZCB9XG4gICAgICAgICAgICAgICAgcGF5bWVudD17IHBheW1lbnQgfVxuICAgICAgICAgICAgICAgIGNvdW50PXsgaW5kZXggKyAxIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvSW52b2ljZUV2ZW50cz5cbiAgICAgICAgPC9UYWJzLlBhbmVsPlxuXG4gICAgICAgIHsvKiBQUkVWSUVXICovfVxuICAgICAgICA8VGFicy5QYW5lbD5cbiAgICAgICAgICA8UHJldmlldyB0eXBlPVwiaW52b2ljZVwiIGRvY3VtZW50PXsgaW52b2ljZSB9IC8+XG4gICAgICAgIDwvVGFicy5QYW5lbD5cbiAgICAgIDwvVGFicy5XcmFwcGVyPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4gKHtcbiAgICBpbnZvaWNlOiBzdGF0ZS5pbnZvaWNlcy5nZXQoYGN1cnJlbnRgKSxcbiAgfSlcbikoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogU2hvd0FyY2hpdmVkSW52b2ljZSxcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBpbnZvaWNlcy5nZXRPbmUsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgKiBhcyBGb3JtYXQgIGZyb20gJy4uL3VpL2Zvcm1hdCdcbmltcG9ydCAqIGFzIEtleVByZXMgZnJvbSAnLi4vdWkva2V5LXByZXNlbnRhdGlvbidcblxuZXhwb3J0IGZ1bmN0aW9uIEludm9pY2VIZWFkZXIoIHByb3BzICkge1xuICBjb25zdCB7IGludm9pY2UgfSA9IHByb3BzXG5cbiAgcmV0dXJuIChcbiAgICA8S2V5UHJlcy5XcmFwcGVyPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJ0YWJsZS5oZWFkZXIuY3VzdG9tZXJcIiAvPlxuICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgIDxMaW5rIHRvPXtgL2N1c3RvbWVycy8ke2ludm9pY2UuZ2V0KCdjdXN0b21lcklkJyl9YH0+XG4gICAgICAgICAge2ludm9pY2UuZ2V0KCBgY3VzdG9tZXIubmFtZWAgKX1cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJ0YWJsZS5oZWFkZXIucXVvdGF0aW9uLWFzc29jaWF0ZWRcIiAvPlxuICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgIDxMaW5rIHRvPXtgL3F1b3RhdGlvbnMvJHtpbnZvaWNlLmdldCgncXVvdGF0aW9uLmlkJyl9YH0+XG4gICAgICAgICAgeyBpbnZvaWNlLmdldChgcXVvdGF0aW9uLnJlZmVyZW5jZWApIH1cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJ0YWJsZS5hbW91bnRcIiAvPlxuICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsYCkgfSAvPlxuICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJ0YWJsZS5hbW91bnQucGFpZFwiIC8+XG4gICAgICA8S2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgPEZvcm1hdC5BbW91bnQgdmFsdWU9eyBpbnZvaWNlLmdldChgdG90YWxQYWlkYCkgfSAvPlxuICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJ0YWJsZS5hbW91bnQubGVmdC10by1wYXlcIiAvPlxuICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsTGVmdGApIH0gLz5cbiAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICA8L0tleVByZXMuV3JhcHBlcj5cbiAgKVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCB7IFRhYmxlLCBSb3csIENlbGwsIFRhYmxlRm9vdGVyLCBSb3dGb290ZXIgfSBmcm9tICcuLi91aS10YWJsZSdcbmltcG9ydCB7ICAgIEJ0bkljb24gICAgICAgIH0gZnJvbSAnLi4vdWkvYnV0dG9ucydcbmltcG9ydCB7ICAgIERhdGVQaWNrZXIgICAgIH0gZnJvbSAnLi4vdWkvZGF0ZS1waWNrZXInXG5pbXBvcnQgeyAgICBBbW91bnQgICAgICAgICB9IGZyb20gJy4uL3VpL2Zvcm1hdCdcblxuY29uc3QgZXZlbnRzQ29sdW1ucyA9IFtcbiAge2lkOiBgaWRgICAgICAgICAgLCBsYWJlbDogYGludm9pY2VzLmV2ZW50LiNgICAgICAgICAgICwgdHlwZTogYGlkYCAgICAgICAgICAgfSxcbiAge2lkOiBgZXZlbnRgICAgICAgLCBsYWJlbDogYGludm9pY2VzLmV2ZW50YCAgICAgICAgICAgICwgdHlwZTogYHRleHRgICAgICAgICAgfSxcbiAge2lkOiBgZGVzY3JpcHRpb25gLCBsYWJlbDogYGludm9pY2VzLmV2ZW50LmRlc2NyaXB0aW9uYCwgdHlwZTogYGlucHV0YCAgICAgICAgfSxcbiAge2lkOiBgZGF0ZWAgICAgICAgLCBsYWJlbDogYGludm9pY2VzLmV2ZW50LmRhdGVgICAgICAgICwgdHlwZTogYGlucHV0IGRhdGVgICAgfSxcbiAge2lkOiBgYW1vdW50YCAgICAgLCBsYWJlbDogYGludm9pY2VzLmV2ZW50LmFtb3VudGAgICAgICwgdHlwZTogYGlucHV0IGFtb3VudGAgfSxcbiAge2lkOiBgYWN0aW9uYCAgICAgLCBsYWJlbDogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICwgdHlwZTogYGFjdGlvbmAgICAgICAgfSxcbl1cblxuZnVuY3Rpb24gSW52b2ljZUV2ZW50c0Zvb3RlciggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaW52b2ljZSwgaGlkZUNvbHVtbnMgfSA9IHByb3BzXG5cbiAgcmV0dXJuIChcbiAgICA8VGFibGVGb290ZXI+XG4gICAgICA8Um93Rm9vdGVyPlxuICAgICAgICA8Q2VsbCBjb2xTcGFuPVwiNFwiPlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwidGFibGUuYW1vdW50LnBhaWRcIiAvPlxuICAgICAgICA8L0NlbGw+XG4gICAgICAgIDxDZWxsIHR5cGU9XCJhbW91bnRcIj5cbiAgICAgICAgICA8QW1vdW50IHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsUGFpZGApIH0gLz5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgICB7ICFoaWRlQ29sdW1ucyAmJiA8Q2VsbCAvPiB9XG4gICAgICA8L1Jvd0Zvb3Rlcj5cbiAgICAgIDxSb3dGb290ZXI+XG4gICAgICAgIDxDZWxsIGNvbFNwYW49XCI0XCI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5hbW91bnQubGVmdC10by1wYXlcIiAvPlxuICAgICAgICA8L0NlbGw+XG4gICAgICAgIDxDZWxsIHR5cGU9XCJhbW91bnRcIj5cbiAgICAgICAgICA8QW1vdW50IHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsTGVmdGApIH0gLz5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgICB7ICFoaWRlQ29sdW1ucyAmJiA8Q2VsbCAvPiB9XG4gICAgICA8L1Jvd0Zvb3Rlcj5cbiAgICA8L1RhYmxlRm9vdGVyPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbnZvaWNlRXZlbnRzKCBwcm9wcyApIHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgcmV0dXJuIChcbiAgICA8VGFibGVcbiAgICAgIGNvbHVtbnM9eyBldmVudHNDb2x1bW5zIH1cbiAgICAgIGZvb3Rlcj17IDxJbnZvaWNlRXZlbnRzRm9vdGVyIHsuLi5yZXN0fSAvPiB9XG4gICAgICB7Li4ucmVzdH1cbiAgICA+XG4gICAgICB7IGNoaWxkcmVuIH1cbiAgICA8L1RhYmxlPlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5pbXBvcnQgRGF5UGlja2VySW5wdXQgZnJvbSAncmVhY3QtZGF5LXBpY2tlci9EYXlQaWNrZXJJbnB1dCdcbmltcG9ydCBNb21lbnRMb2NhbGVVdGlscywge1xuICBmb3JtYXREYXRlLFxuICBwYXJzZURhdGUsXG59IGZyb20gJ3JlYWN0LWRheS1waWNrZXIvbW9tZW50J1xuLy8gaHR0cDovL3JlYWN0LWRheS1waWNrZXIuanMub3JnL2RvY3MvbG9jYWxpemF0aW9uXG5pbXBvcnQgJ21vbWVudC9sb2NhbGUvZW4tZ2InXG5pbXBvcnQgJ21vbWVudC9sb2NhbGUvZnInXG5cbmltcG9ydCAnLi9kYXRlLXBpY2tlci5zY3NzJ1xuXG4vLyB1c2luZyBodHRwczovL3JlYWN0LWRheS1waWNrZXIuanMub3JnL1xuXG5jb25zdCBkaXNhYmxlZERheXMgPSB7XG4gIGFmdGVyOiBuZXcgRGF0ZSgpLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRGF0ZVBpY2tlciggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaGFuZGxlRGF5Q2hhbmdlLCB2YWx1ZSwgLi4uaW5wdXRQcm9wcyB9ID0gcHJvcHNcbiAgLy8gZW1wdHkgdmFsdWVzIHNob3VsZCB0cmVhdGVkIGFzIGludmFsaWQgZGF0ZVxuICAvLyDigKIgbWF5YmUgdGhlIHNlcnZlIGRvZXNuJ3Qgc2VuZCB1cyBhIGRhdGUgYWxsIVxuICBjb25zdCBkYXRlT2JqZWN0ID0gbW9tZW50KCB2YWx1ZSB8fCBgYCApXG4gIGNvbnN0IGRhdGVWYWx1ZSA9IGRhdGVPYmplY3QuaXNWYWxpZCgpID8gZGF0ZU9iamVjdC50b0RhdGUoKSA6IGBgXG4gIHJldHVybiAoXG4gICAgPERheVBpY2tlcklucHV0XG4gICAgICB2YWx1ZT17IGRhdGVWYWx1ZSB9XG4gICAgICBsb2NhbGU9eyBgZnJgIH1cbiAgICAgIGZvcm1hdERhdGU9eyBmb3JtYXREYXRlIH1cbiAgICAgIHBhcnNlRGF0ZT17IHBhcnNlRGF0ZSB9XG4gICAgICBjbGlja1Vuc2VsZWN0c0RheVxuICAgICAgZm9ybWF0PVwiTFwiXG4gICAgICBwbGFjZWhvbGRlcj17IGBkZC9tbS95eXl5YCB9XG4gICAgICBpbnB1dFByb3BzPXsgaW5wdXRQcm9wcyB9XG4gICAgICBkYXlQaWNrZXJQcm9wcz17e1xuICAgICAgICBkaXNhYmxlZERheXMsXG4gICAgICAgIGxvY2FsZTogICAgIGBmcmAsXG4gICAgICAgIGxvY2FsZVV0aWxzOiBNb21lbnRMb2NhbGVVdGlscyxcbiAgICAgIH19XG4gICAgICBvbkRheUNoYW5nZT17IGRheSA9PiB7XG4gICAgICAgIGhhbmRsZURheUNoYW5nZSAmJiBoYW5kbGVEYXlDaGFuZ2UoIHtcbiAgICAgICAgICBuYW1lOiBpbnB1dFByb3BzLm5hbWUsXG4gICAgICAgICAgdmFsdWU6IGRheSB8fCBgYCxcbiAgICAgICAgfSlcbiAgICAgIH0gfVxuICAgIC8+XG4gIClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRheS1waWNrZXIvRGF5UGlja2VySW5wdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtZGF5LXBpY2tlci9tb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50L2xvY2FsZS9lbi1nYlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnQvbG9jYWxlL2ZyXCIpOyIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgKiBhcyBUYWJsZSAgZnJvbSAnLi4vdWktdGFibGUnXG5pbXBvcnQgKiBhcyBGb3JtYXQgZnJvbSAnLi4vdWkvZm9ybWF0J1xuXG5mdW5jdGlvbiBJbnZvaWNlRXZlbnRTZW50UmVhZCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaW52b2ljZSwgaGFuZGxlIH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxUYWJsZS5Sb3c+XG4gICAgICA8VGFibGUuQ2VsbCAvPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMuZXZlbnQuc2VudFwiIC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCB0eXBlPVwidGV4dFwiPiDigJMgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxGb3JtYXQuRGF5IHZhbHVlPXtpbnZvaWNlLmdldChgc2VuZEF0YCl9IC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCB0eXBlPVwibnVtYmVyXCI+IOKAkyA8L1RhYmxlLkNlbGw+XG4gICAgPC9UYWJsZS5Sb3c+XG4gIClcbn1cbmV4cG9ydCB7IEludm9pY2VFdmVudFNlbnRSZWFkIGFzIFNlbnQgfVxuXG5mdW5jdGlvbiBJbnZvaWNlRXZlbnRQYXltZW50UmVhZCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgcGF5bWVudCwgY291bnQgfSA9IHByb3BzXG4gIHJldHVybiAoXG4gICAgPFRhYmxlLlJvdz5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICB7IGNvdW50IH1cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLmV2ZW50LnBheW1lbnRcIiAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cInRleHRcIj5cbiAgICAgICAgeyBwYXltZW50LmdldChgbWVzc2FnZWApIH1cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsIHR5cGU9XCJkYXRlXCI+XG4gICAgICAgIDxGb3JtYXQuRGF5IHZhbHVlPXsgcGF5bWVudC5nZXQoYGRhdGVgKSB9IC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCB0eXBlPVwiYW1vdW50XCI+XG4gICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgcGF5bWVudC5nZXQoYGFtb3VudGApIH0gLz5cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICA8L1RhYmxlLlJvdz5cbiAgKVxufVxuZXhwb3J0IHsgSW52b2ljZUV2ZW50UGF5bWVudFJlYWQgYXMgUGF5bWVudCB9XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSAgIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0IENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCB7IE1haW4sIENvbnRlbnQgIH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgeyBOYXZTZWNvbmRhcnkgICB9IGZyb20gJy4uL25hdi9zZWNvbmRhcnknXG5pbXBvcnQgeyBCdXR0b25OZXcgICAgICB9IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCB7XG4gIEFjdGl2ZVF1b3RhdGlvbnMsXG4gIFF1b3RhdGlvbnNSZWFkeVRvSW52b2ljZSxcbn0gZnJvbSAnLi9saXN0J1xuXG5jb25zdCBUWVBFID0gYHF1b3RhdGlvbnNgXG5cbmZ1bmN0aW9uIFF1b3RhdGlvbnMoIHByb3BzICkge1xuICBjb25zdCB0aXRsZVByb3BzID0geyBpZDogYHBhZ2UucXVvdGF0aW9uc2AgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgICA8QnV0dG9uTmV3XG4gICAgICAgICAgdHlwZT17IFRZUEUgfVxuICAgICAgICAgIG1lc3NhZ2U9XCJxdW90YXRpb24uYnV0dG9uLm5ld1wiXG4gICAgICAgIC8+XG4gICAgICA8L05hdlNlY29uZGFyeT5cbiAgICAgIDxNYWluPlxuICAgICAgICA8Q29udGVudD5cbiAgICAgICAgICA8QWN0aXZlUXVvdGF0aW9ucyAvPlxuICAgICAgICAgIDxRdW90YXRpb25zUmVhZHlUb0ludm9pY2UgLz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gIHJldHVybiB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogUXVvdGF0aW9ucyxcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBxdW90YXRpb25zLmxpc3RBY3RpdmUsXG4gICAgcXVvdGF0aW9ucy5saXN0UmVhZHlUb0ludm9pY2UsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlICAgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBDb25uZWN0RGF0YUZldGNoZXIgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBxdW90YXRpb25zICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgICAgICAgICBmcm9tICcuLi9kdWNrcy9jdXN0b21lcnMnXG5pbXBvcnQgICAgICBOYXZTZWNvbmRhcnkgICAgICAgZnJvbSAnLi4vbmF2L3NlY29uZGFyeSdcbmltcG9ydCB7XG4gIEJ1dHRvbkxpc3QsXG4gIEJ1dHRvblN1Ym1pdCxcbn0gZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0ICAgUXVvdGF0aW9uRm9ybSAgIGZyb20gJy4vZm9ybSdcbmltcG9ydCB7IEZPUk1fSUQgICAgICAgfSBmcm9tICcuL2Zvcm0ucHJlcydcblxuY29uc3QgVFlQRSA9IGBxdW90YXRpb25zYFxuXG5mdW5jdGlvbiBOZXdRdW90YXRpb24oIHByb3BzICkge1xuICBjb25zdCB0aXRsZVByb3BzID0geyBpZDogYHBhZ2UucXVvdGF0aW9ucy5uZXdgIH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPEJ1dHRvblN1Ym1pdFxuICAgICAgICAgIGZvcm1JZD17Rk9STV9JRH1cbiAgICAgICAgICBpc1NhdmluZz17IHByb3BzLmlzU2F2aW5nIH1cbiAgICAgICAgICBsYWJlbD1cInF1b3RhdGlvbi5idXR0b24uY3JlYXRlXCJcbiAgICAgICAgLz5cbiAgICAgICAgPEJ1dHRvbkxpc3RcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgbGFiZWw9XCJxdW90YXRpb24uYnV0dG9uLmxpc3RcIlxuICAgICAgICAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8UXVvdGF0aW9uRm9ybSB7Li4ucHJvcHN9IC8+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgY29uc3QgeyBpc1NhdmluZyB9ID0gc3RhdGUucXVvdGF0aW9uc1xuICByZXR1cm4geyBpc1NhdmluZyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlMnByb3AgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBOZXdRdW90YXRpb24sXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gICAgY3VzdG9tZXJzLmdldEFsbCxcbiAgICBxdW90YXRpb25zLmdldE9uZSxcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuaW1wb3J0ICAgY3JpbyAgICAgICAgICAgICAgICAgZnJvbSAnY3JpbydcbmltcG9ydCAgIGZsb3cgICAgICAgICAgICAgICAgIGZyb20gJ2xvZGFzaC5mbG93J1xuaW1wb3J0ICAgc2hvcnRpZCAgICAgICAgICAgICAgZnJvbSAnc2hvcnRpZCdcblxuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgICAgICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2N1c3RvbWVycydcbmltcG9ydCAqIGFzIGNvbXB1dGUgICAgICAgICAgICAgICAgIGZyb20gJy4uL3V0aWxzL2NvbXB1dGUtdG90YWwnXG5pbXBvcnQgKiBhcyByZWRpcmVjdGlvbiAgICAgICAgICAgICBmcm9tICcuLi91dGlscy9jaGVjay1yZWRpcmVjdGlvbidcbmltcG9ydCB7ICAgIGdldElucHV0VmFsdWUgICAgICAgICB9IGZyb20gJy4uL3V0aWxzL2dldC1pbnB1dC12YWx1ZSdcbmltcG9ydCB7ICAgIGZpbHRlckFycmF5V2l0aE9iamVjdCB9IGZyb20gJy4uL3V0aWxzL2ZpbHRlci1hcnJheS13aXRoLW9iamVjdCdcbmltcG9ydCB7ICAgIFNwaW5uZXIgICAgICAgICAgICAgICB9IGZyb20gJy4uL3VpL3NwaW5uZXInXG5pbXBvcnQgeyAgICBRdW90YXRpb25Gb3JtUHJlcyAgICAgfSBmcm9tICcuL2Zvcm0ucHJlcydcblxuY29uc3QgU1RFUFMgPSBjcmlvKFtcbiAgeyBrZXk6IGBzZW5kQXRgICAgICAsIGxhYmVsOiBgc3RlcHBlci5zZW50YCAgICAgIH0sXG4gIHsga2V5OiBgdmFsaWRhdGVkQXRgLCBsYWJlbDogYHN0ZXBwZXIudmFsaWRhdGVkYCB9LFxuICB7IGtleTogYHNpZ25lZEF0YCAgICwgbGFiZWw6IGBzdGVwcGVyLnNpZ25lZGAgICAgfSxcbl0pXG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvbXB1dGVTdGVwcyggZm9ybURhdGEgKSB7XG4gIGNvbnN0IHN0ZXBzID0gU1RFUFMubWFwKCBzID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGZvcm1EYXRhLmdldCggcy5rZXkgKVxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGtleTogICBzLmtleSxcbiAgICAgIGxhYmVsOiBzLmxhYmVsLFxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGZvcm1EYXRhLnNldCggYHN0ZXBzYCwgc3RlcHMgKVxufVxuXG4vLyDigKIgZGUtZHVwZSBkZWZhdWx0UHJvZHVjdCBsaW5lc1xuLy8g4oCiIGNoZWNrIF9pZCBmb3IgUmVhY3RcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEZWZhdWx0UHJvZHVjdHMoIGZvcm1EYXRhICkge1xuICBjb25zdCBkZWZhdWx0UHJvZHVjdCAgPSBmb3JtRGF0YS5nZXQoIGBwcm9kdWN0Q29uZmlnYCApXG4gIGNvbnN0IHByb2R1Y3RzICAgICAgICA9IGZvcm1EYXRhLmdldCggYHByb2R1Y3RzYCAgICAgIClcbiAgaWYgKCAhY3Jpby5pc0FycmF5KHByb2R1Y3RzKSApICAgICAgICByZXR1cm4gZm9ybURhdGFcbiAgaWYgKCAhY3Jpby5pc09iamVjdChkZWZhdWx0UHJvZHVjdCkgKSByZXR1cm4gZm9ybURhdGFcbiAgY29uc3QgY2xlYW5lZFByb2R1Y3RzID0gZmlsdGVyQXJyYXlXaXRoT2JqZWN0KHtcbiAgICBkZWZhdWx0T2JqZWN0OiAgZGVmYXVsdFByb2R1Y3QsXG4gICAgYXJyYXk6ICAgICAgICAgIHByb2R1Y3RzLFxuICB9KVxuICByZXR1cm4gZm9ybURhdGEuc2V0KCBgcHJvZHVjdHNgLCBjbGVhbmVkUHJvZHVjdHMgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVjb21wdXRlVG90YWxzKCBmb3JtRGF0YSApIHtcbiAgY29uc3QgcHJvZHVjdHMgICAgICAgID0gZm9ybURhdGEuZ2V0KCBgcHJvZHVjdHNgICAgICAgKVxuICBpZiAoICFjcmlvLmlzQXJyYXkocHJvZHVjdHMpICkgcmV0dXJuIGZvcm1EYXRhXG4gIGNvbnN0IHRvdGFscyA9IGNvbXB1dGUudG90YWxzKCBmb3JtRGF0YSApXG4gIHJldHVybiBmb3JtRGF0YS5tZXJnZSggbnVsbCwgdG90YWxzIClcbn1cblxuLy8g4oCiIGFkZCBhbiBlbXB0eSBsaW5lIGEgdGhlIGVuZOKAplxuLy8gICDigKZpbiBjYXNlIGEgdXNlciBqdXN0IHR5cGUgc29tZXRoaW5nIG9uIHRoZSBibGFuayBvbmVcbmV4cG9ydCBmdW5jdGlvbiBhZGRFbXB0eUxpbmUoIGZvcm1EYXRhICkge1xuICBjb25zdCBkZWZhdWx0UHJvZHVjdCA9IGZvcm1EYXRhLmdldCggYHByb2R1Y3RDb25maWdgIClcbiAgY29uc3QgcHJvZHVjdHMgICAgICAgPSBmb3JtRGF0YS5nZXQoIGBwcm9kdWN0c2AgICAgICApXG4gIGlmICggIWNyaW8uaXNBcnJheShwcm9kdWN0cykgKSByZXR1cm4gZm9ybURhdGFcbiAgaWYgKCAhY3Jpby5pc09iamVjdChkZWZhdWx0UHJvZHVjdCkgKSByZXR1cm4gZm9ybURhdGFcbiAgY29uc3QgZW1wdHlQcm9kdWN0ICAgPSBkZWZhdWx0UHJvZHVjdC5zZXQoIGBjaGVja2VkYCwgdHJ1ZSApXG4gIHJldHVybiBmb3JtRGF0YS5zZXQoIGBwcm9kdWN0c2AsIHByb2R1Y3RzLnB1c2goIGVtcHR5UHJvZHVjdCApKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlUHJvZHVjdElkKCBmb3JtRGF0YSApIHtcbiAgY29uc3QgcHJvZHVjdHMgPSBmb3JtRGF0YS5nZXQoIGBwcm9kdWN0c2AgKVxuICBpZiAoICFjcmlvLmlzQXJyYXkocHJvZHVjdHMpICkgcmV0dXJuIGZvcm1EYXRhXG4gIGNvbnN0IHdpdGhJZCAgID0gcHJvZHVjdHMubWFwKCBwcm9kdWN0ID0+IHtcbiAgICBpZiAoICFwcm9kdWN0LmdldChgX2lkYCkgKSByZXR1cm4gcHJvZHVjdC5zZXQoIGBfaWRgLCBzaG9ydGlkKCkgKVxuICAgIHJldHVybiBwcm9kdWN0XG4gIH0pXG4gIHJldHVybiBmb3JtRGF0YS5zZXQoIGBwcm9kdWN0c2AsIHdpdGhJZCApXG59XG5cbmNsYXNzIFF1b3RhdGlvbkZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCBwcm9wcyApIHtcbiAgICBzdXBlciggcHJvcHMgKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZvcm1EYXRhOiBxdW90YXRpb25zLkxPQURJTkcsXG4gICAgICBjdXN0b21lcjogY3Jpbyh7fSksXG4gICAgfVxuXG4gICAgLy8gZG9uJ3QgdXNlIGFueSBhdXRvbWF0ZWQgYmluZFxuICAgIC8vIOKAoiB0aGV5IGFyZSBvbmx5IGluIEVTIHN0YWdlIDLigKZcbiAgICAvLyAgIOKApmFuZCBpdCBkb2Vzbid0IHNlZW0gdGhhdCBpdCB3aWxsIG1ha2UgaW4gc3RhZ2UgM1xuICAgIC8vICAgaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtY2xhc3MtZmllbGRzL2lzc3Vlcy84MFxuICAgIC8vICAgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvQGJhYmVsL3BsdWdpbi1wcm9wb3NhbC1jbGFzcy1wcm9wZXJ0aWVzXG4gICAgLy8g4oCiIGJ1dCBiZXR0ZXIgdG8gYmluZCB0aGFuIHJlbHlpbmcgb24gYXJyb3cgZnVuY3Rpb25zIGluIHJlbmRlcigpXG4gICAgLy8gICBodHRwczovL2NvZGVidXJzdC5pby9ob3ctdG8tbm90LXJlYWN0LWNvbW1vbi1hbnRpLXBhdHRlcm5zLWFuZC1nb3RjaGFzLWluLXJlYWN0LTQwMTQxZmUwZGNkI2FlZjVcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCAgICAgICAgPSB0aGlzLmhhbmRsZVN1Ym1pdCAgICAgICAuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVDcmVhdGVJbnZvaWNlID0gdGhpcy5oYW5kbGVDcmVhdGVJbnZvaWNlLmJpbmQoIHRoaXMgKVxuICAgIHRoaXMuaGFuZGxlRm9ybUNoYW5nZSAgICA9IHRoaXMuaGFuZGxlRm9ybUNoYW5nZSAgIC5iaW5kKCB0aGlzIClcbiAgICB0aGlzLmhhbmRsZURheUNoYW5nZSAgICAgPSB0aGlzLmhhbmRsZURheUNoYW5nZSAgICAuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVQcm9kdWN0UmVtb3ZlID0gdGhpcy5oYW5kbGVQcm9kdWN0UmVtb3ZlLmJpbmQoIHRoaXMgKVxuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyggbmV4dFByb3BzLCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc3QgICBuZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXh0UHJvcHMuY3VycmVudFxuICAgIGNvbnN0ICAgY3VycmVudCAgICAgICAgICAgICAgICAgICAgICAgID0gcHJldlN0YXRlLmZvcm1EYXRhXG4gICAgY29uc3QgeyBoaXN0b3J5LCBzdGF0aWNDb250ZXh0LCBjdXN0b21lcnMsIGlzU2F2aW5nIH0gPSBuZXh0UHJvcHNcbiAgICBpZiAoIGlzU2F2aW5nICkgcmV0dXJuIG51bGxcbiAgICBpZiAoIGN1cnJlbnQgPT09IG5leHQgKSByZXR1cm4gbnVsbFxuXG4gICAgLy8gcmVkaXJlY3RzXG4gICAgcmVkaXJlY3Rpb24ucXVvdGF0aW9uKHtcbiAgICAgIG5leHQsXG4gICAgICBjdXJyZW50LFxuICAgICAgaGlzdG9yeSxcbiAgICAgIHN0YXRpY0NvbnRleHQsXG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBmb3JtRGF0YTogUXVvdGF0aW9uRm9ybS5yZWNvbXB1dGVGb3JtRGF0YSggbmV4dCApLFxuICAgICAgY3VzdG9tZXI6IFF1b3RhdGlvbkZvcm0uZ2V0Q3VzdG9tZXJEYXRhKCBuZXh0LCBjdXN0b21lcnMgKSxcbiAgICB9XG4gIH1cblxuICAvLy0tLS0tIFVUSUxTXG5cbiAgc3RhdGljIHJlY29tcHV0ZVN0ZXBzICAgID0gcmVjb21wdXRlU3RlcHNcblxuICBzdGF0aWMgcmVjb21wdXRlUHJvZHVjdHMgPSBmbG93KFxuICAgIHJlbW92ZURlZmF1bHRQcm9kdWN0cyxcbiAgICByZWNvbXB1dGVUb3RhbHMsXG4gICAgYWRkRW1wdHlMaW5lLFxuICAgIGVuc3VyZVByb2R1Y3RJZCxcbiAgKVxuXG4gIHN0YXRpYyByZWNvbXB1dGVGb3JtRGF0YSA9IGZsb3coXG4gICAgUXVvdGF0aW9uRm9ybS5yZWNvbXB1dGVTdGVwcyxcbiAgICBRdW90YXRpb25Gb3JtLnJlY29tcHV0ZVByb2R1Y3RzLFxuICApXG5cbiAgc3RhdGljIGdldEN1c3RvbWVyRGF0YSggZm9ybURhdGEsIGN1c3RvbWVycyApIHtcbiAgICBpZiAoICFBcnJheS5pc0FycmF5KGN1c3RvbWVycykgKSByZXR1cm4ge31cbiAgICBjb25zdCB7IGN1c3RvbWVySWQgfSA9IGZvcm1EYXRhXG4gICAgLy8gaWYgbm8gY3VzdG9tZXIgaXMgc2VsZWN0ZWQsIGp1c3QgdGFrZSB0aGUgZmlyc3Qgb25lIGluIHRoZSBsaXN0XG4gICAgaWYgKCAhY3VzdG9tZXJJZCApIHJldHVybiBjdXN0b21lcnNbIDAgXVxuICAgIGNvbnN0IGN1c3RvbWVyICAgICAgID0gY3VzdG9tZXJzLmZpbmQoIGMgPT4gYy5pZCA9PT0gY3VzdG9tZXJJZCApXG4gICAgcmV0dXJuIGN1c3RvbWVyIHx8IHt9XG4gIH1cblxuICAvLy0tLS0tIEVWRU5UU1xuXG4gIGhhbmRsZVN1Ym1pdCggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGJvZHkgPSBzZXJpYWxpemUoIGV2ZW50LnRhcmdldCwgeyBoYXNoOiB0cnVlLCBlbXB0eTogdHJ1ZSB9IClcbiAgICB0aGlzLnByb3BzLnNhdmVPbmUoeyBib2R5IH0pXG4gIH1cbiAgaGFuZGxlQ3JlYXRlSW52b2ljZSggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIHRoaXMucHJvcHMuY3JlYXRlSW52b2ljZSh7XG4gICAgICBpZDogdGhpcy5wcm9wcy5jdXJyZW50LmdldChgaWRgKSxcbiAgICB9KVxuICB9XG4gIGhhbmRsZUZvcm1DaGFuZ2UoIGV2ZW50ICkge1xuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGdldElucHV0VmFsdWUoIGV2ZW50LnRhcmdldCApXG5cbiAgICB0aGlzLnNldFN0YXRlKCAocHJldlN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlZCA9IHByZXZTdGF0ZS5mb3JtRGF0YS5zZXQoIG5hbWUsIHZhbHVlIClcblxuICAgICAgLy8gdXBkYXRlIGN1c3RvbWVyIHN0YXRlIGlmIHdlIGNob29zZSBhIG5ldyBvbmVcbiAgICAgIGlmICggbmFtZSA9PT0gYGN1c3RvbWVySWRgICkgcmV0dXJuIHtcbiAgICAgICAgZm9ybURhdGE6IHVwZGF0ZWQsXG4gICAgICAgIGN1c3RvbWVyOiBRdW90YXRpb25Gb3JtLmdldEN1c3RvbWVyRGF0YSggdXBkYXRlZCwgcHJvcHMuY3VzdG9tZXJzIClcbiAgICAgIH1cbiAgICAgIC8vIFJlY29tcHV0ZSBwcm9kdWN0cyBvbmx5IGlmIG5lZWRlZFxuICAgICAgY29uc3QgaXNQcm9kdWN0Q2hhbmdlID0gL15wcm9kdWN0c1xcW1xcZCtcXF0vLnRlc3QoIG5hbWUgKVxuICAgICAgY29uc3QgaXNUYXhDaGFuZ2UgICAgID0gbmFtZSA9PT0gYHRheGBcbiAgICAgIGlmICggIWlzUHJvZHVjdENoYW5nZSAmJiAhaXNUYXhDaGFuZ2UgKSByZXR1cm4geyBmb3JtRGF0YTogdXBkYXRlZCB9XG4gICAgICByZXR1cm4geyBmb3JtRGF0YTogUXVvdGF0aW9uRm9ybS5yZWNvbXB1dGVQcm9kdWN0cyggdXBkYXRlZCApIH1cbiAgICB9KVxuICB9XG4gIGhhbmRsZURheUNoYW5nZSggdGFyZ2V0ICkge1xuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IHRhcmdldFxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVkICAgPSBwcmV2U3RhdGUuZm9ybURhdGEuc2V0KCBuYW1lLCB2YWx1ZSApXG4gICAgICBjb25zdCB3aXRoU3RlcHMgPSBRdW90YXRpb25Gb3JtLnJlY29tcHV0ZVN0ZXBzKCB1cGRhdGVkIClcbiAgICAgIHJldHVybiB7IGZvcm1EYXRhOiB3aXRoU3RlcHMgfVxuICAgIH0pXG4gIH1cbiAgaGFuZGxlUHJvZHVjdFJlbW92ZSggaW5kZXgsIHByZWZpeCApIHtcbiAgICBjb25zdCB7IGZvcm1EYXRhIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgbGluZSA9IGZvcm1EYXRhLmdldCggcHJlZml4IClcbiAgICBpZiAoICFsaW5lICkgcmV0dXJuXG5cbiAgICB0aGlzLnNldFN0YXRlKCBwcmV2U3RhdGUgPT4ge1xuICAgICAgY29uc3QgcHJvZHVjdHMgPSBwcmV2U3RhdGUuZm9ybURhdGEuZ2V0KCBgcHJvZHVjdHNgIClcbiAgICAgIGNvbnN0IHVwZGF0ZWRQcm9kdWN0cyA9IHByb2R1Y3RzLnNwbGljZSggaW5kZXgsIDEgKVxuICAgICAgY29uc3QgdXBkYXRlZCA9IHByZXZTdGF0ZS5mb3JtRGF0YS5zZXQoIGBwcm9kdWN0c2AsIHVwZGF0ZWRQcm9kdWN0cyApXG4gICAgICByZXR1cm4geyBmb3JtRGF0YTogUXVvdGF0aW9uRm9ybS5yZWNvbXB1dGVQcm9kdWN0cyggdXBkYXRlZCApIH1cbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLSBSRU5ERVJcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcyAgICAgLCBzdGF0ZSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgZm9ybURhdGEgICAgICAgICAgfSA9IHN0YXRlXG4gICAgY29uc3QgeyBpc1NhdmluZyAgICAgICAgICB9ID0gcHJvcHNcbiAgICBjb25zdCB7IGlzTG9hZGluZyAgICAgICAgIH0gPSBmb3JtRGF0YVxuICAgIGlmICggaXNMb2FkaW5nICkgcmV0dXJuIDxTcGlubmVyIC8+XG5cbiAgICBjb25zdCByZW5kZXJQcm9wcyA9IHtcbiAgICAgIHVzZXI6ICAgICAgICAgICAgIHByb3BzLnVzZXIsXG4gICAgICBjdXN0b21lcnM6ICAgICAgICBwcm9wcy5jdXN0b21lcnMsXG4gICAgICBmb3JtRGF0YTogICAgICAgICBmb3JtRGF0YSxcbiAgICAgIGlzU2F2aW5nOiAgICAgICAgIGlzU2F2aW5nLFxuICAgICAgY3VzdG9tZXI6ICAgICAgICAgc3RhdGUuY3VzdG9tZXIsXG4gICAgICBpc05ldzogICAgICAgICAgICBwcm9wcy5pc05ldyxcbiAgICAgIGhhbmRsZToge1xuICAgICAgICBzdWJtaXQ6ICAgICAgICAgdGhpcy5oYW5kbGVTdWJtaXQsXG4gICAgICAgIGNyZWF0ZUludm9pY2U6ICB0aGlzLmhhbmRsZUNyZWF0ZUludm9pY2UsXG4gICAgICAgIGZvcm1DaGFuZ2U6ICAgICB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UsXG4gICAgICAgIGRheUNoYW5nZTogICAgICB0aGlzLmhhbmRsZURheUNoYW5nZSxcbiAgICAgICAgcHJvZHVjdFJlbW92ZTogIHRoaXMuaGFuZGxlUHJvZHVjdFJlbW92ZSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gPFF1b3RhdGlvbkZvcm1QcmVzIHsuLi5yZW5kZXJQcm9wc30gLz5cbiAgfVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgY29uc3QgeyBjdXJyZW50IH0gPSBzdGF0ZS5xdW90YXRpb25zXG4gIGNvbnN0IGlzTmV3ID0gY3VycmVudC5pZCA9PSBudWxsXG4gIHJldHVybiB7XG4gICAgaXNOZXcsXG4gICAgaXNTYXZpbmc6ICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYGlzU2F2aW5nYCksXG4gICAgY3VycmVudDogICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYGN1cnJlbnRgKSxcbiAgICBjdXN0b21lcnM6ICBzdGF0ZS5jdXN0b21lcnMuZ2V0KGBhY3RpdmVgKSxcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaDJwcm9wKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgZ2V0T25lICAgICAgICAgOiBxdW90YXRpb25zLmdldE9uZSxcbiAgICBzYXZlT25lICAgICAgICA6IHF1b3RhdGlvbnMuc2F2ZU9uZSxcbiAgICBjcmVhdGVJbnZvaWNlICA6IHF1b3RhdGlvbnMuY3JlYXRlSW52b2ljZSxcbiAgICBnZXRBbGxDdXN0b21lcnM6IGN1c3RvbWVycy5nZXRBbGwsXG4gIH0sIGRpc3BhdGNoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wLCBkaXNwYXRjaDJwcm9wICkoIFF1b3RhdGlvbkZvcm0gKVxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2guZmxvd1wiKTsiLCJpbXBvcnQgaXNOaWwgZnJvbSAnbG9kYXNoLmlzbmlsJ1xuXG4vLyBjb250cm9sIGlmIGNvbWluZyBmcm9tIGEgbm8gSUQgbW9kZWwgaW5zdGFuY2XigKZcbi8vIOKApndlIHVwZGF0ZSB0byBhbiBpbnN0YW5jZSB3aXRoIElEXG5jb25zdCBjaGVja0tleUNoYW5nZSA9IGtleSA9PiAoe25leHQsIGN1cnJlbnR9KSA9PiB7XG4gIGNvbnN0IGlzTG9hZGluZyA9IGN1cnJlbnQuaXNMb2FkaW5nIHx8IG5leHQuaXNMb2FkaW5nXG4gIGlmICggaXNMb2FkaW5nICkgcmV0dXJuIGZhbHNlXG4gIGNvbnN0IGN1cnJlbnRLZXkgPSBjdXJyZW50WyBrZXkgXVxuICBjb25zdCBuZXh0S2V5ICAgID0gbmV4dFsga2V5IF1cbiAgY29uc3QgaGFzQ3VycmVudCA9ICFpc05pbCggY3VycmVudEtleSApXG4gIGNvbnN0IGhhc05leHQgICAgPSAhaXNOaWwoIG5leHRLZXkgKVxuICAvLyB3YW50IHRvIGNoYW5nZSByb3V0ZSBpZjpcbiAgLy8g4oCiIHRoZSBwcmV2aW91cyBkb2Vzbid0IGhhdmUgYW4gSUQgKGNyZWF0aW9uKVxuICAvLyDigKIgdGhlIG5leHQgb25lIGhhcyAoc3VjY2Vzc2Z1bCBjcmVhdGlvbiEpXG4gIGNvbnN0IGlzTmV3Q3JlYXRpb24gPSAhaGFzQ3VycmVudCAmJiBoYXNOZXh0XG4gIGNvbnN0IGlzRGlmZmVyZW50SWQgPSBoYXNDdXJyZW50ICYmIGhhc05leHQgJiYgY3VycmVudEtleSAhPT0gbmV4dEtleVxuICByZXR1cm4gaXNOZXdDcmVhdGlvbiA/IHRydWUgOiBpc0RpZmZlcmVudElkXG59XG5cbmV4cG9ydCBjb25zdCBpc05ld1F1b3RhdGlvbiA9IGNoZWNrS2V5Q2hhbmdlKCBgaWRgIClcbmV4cG9ydCBjb25zdCBpc05ld0N1c3RvbWVyICA9IGNoZWNrS2V5Q2hhbmdlKCBgaWRgIClcbmV4cG9ydCBjb25zdCBpc05ld0ludm9pY2UgICA9IGNoZWNrS2V5Q2hhbmdlKCBgaW52b2ljZUlkYCApXG5leHBvcnQgY29uc3QgaXNBcmNoaXZlZCAgICAgPSAoe25leHQsIGN1cnJlbnR9KSA9PiAhaXNOaWwoIG5leHQuYXJjaGl2ZWRBdCApXG5cbmNvbnN0IG5ld0N1c3RvbWVyID0ge1xuICB0ZXN0OiBpc05ld0N1c3RvbWVyLFxuICB0byAgOiBuZXh0ID0+IGAvY3VzdG9tZXJzLyR7IG5leHQuaWQgfWAsXG59XG5jb25zdCBuZXdRdW90YXRpb24gPSB7XG4gIHRlc3Q6IGlzTmV3UXVvdGF0aW9uLFxuICB0byAgOiBuZXh0ID0+IGAvcXVvdGF0aW9ucy8keyBuZXh0LmlkIH1gLFxufVxuY29uc3QgYXJjaGl2ZWRRdW90YXRpb24gPSB7XG4gIHRlc3Q6IGlzQXJjaGl2ZWQsXG4gIHRvICA6IG5leHQgPT4gYC9hcmNoaXZlcy9xdW90YXRpb25zLyR7IG5leHQuaWQgfWAsXG59XG5jb25zdCBuZXdJbnZvaWNlID0ge1xuICB0ZXN0OiBpc05ld0ludm9pY2UsXG4gIHRvICA6IG5leHQgPT4gYC9pbnZvaWNlcy8keyBuZXh0Lmludm9pY2VJZCB9YFxufVxuY29uc3QgYXJjaGl2ZWRJbnZvaWNlID0ge1xuICB0ZXN0OiBpc0FyY2hpdmVkLFxuICB0byAgOiBuZXh0ID0+IGAvYXJjaGl2ZXMvaW52b2ljZXMvJHsgbmV4dC5pZCB9YFxufVxuXG5jb25zdCBjaGVja1JlZGlyZWN0aW9ucyA9IGRhdGFzID0+IChoYXNSZWRpcmVjdCwgcmVkaXJlY3Rpb24pID0+IHtcbiAgY29uc3QgeyBuZXh0LCBjdXJyZW50LCBoaXN0b3J5LCBzdGF0aWNDb250ZXh0IH0gPSBkYXRhc1xuICBpZiAoIGhhc1JlZGlyZWN0ICkgcmV0dXJuIGhhc1JlZGlyZWN0XG4gIGlmICggIXJlZGlyZWN0aW9uLnRlc3Qoe25leHQsIGN1cnJlbnR9KSApIHJldHVybiBmYWxzZVxuICBjb25zdCByZWRpcmVjdFVybCA9IHJlZGlyZWN0aW9uLnRvKCBuZXh0IClcbiAgLy8gdXBkYXRlIHN0YXRpYyBjb250ZXh0IGZvciB0aGUgc2VydmVyXG4gIGlmICggc3RhdGljQ29udGV4dCApIHtcbiAgICBzdGF0aWNDb250ZXh0LnN0YXR1cyAgPSAzMDJcbiAgICBzdGF0aWNDb250ZXh0LnVybCAgICAgPSByZWRpcmVjdFVybFxuICB9XG4gIHJldHVybiBoaXN0b3J5LnB1c2goIHJlZGlyZWN0VXJsIClcbn1cblxuZXhwb3J0IGNvbnN0IHF1b3RhdGlvbiA9IGRhdGFzID0+IFtcbiAgbmV3UXVvdGF0aW9uLFxuICBuZXdJbnZvaWNlLFxuICBhcmNoaXZlZFF1b3RhdGlvbixcbl0ucmVkdWNlKCBjaGVja1JlZGlyZWN0aW9ucyhkYXRhcyksIGZhbHNlIClcblxuZXhwb3J0IGNvbnN0IGludm9pY2UgICA9IGRhdGFzID0+IFtcbiAgYXJjaGl2ZWRJbnZvaWNlLFxuXS5yZWR1Y2UoIGNoZWNrUmVkaXJlY3Rpb25zKGRhdGFzKSwgZmFsc2UgKVxuXG5leHBvcnQgY29uc3QgY3VzdG9tZXIgID0gZGF0YXMgPT4gW1xuICBuZXdDdXN0b21lcixcbl0ucmVkdWNlKCBjaGVja1JlZGlyZWN0aW9ucyhkYXRhcyksIGZhbHNlIClcbiIsImltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gubWVyZ2UnXG5pbXBvcnQgY3JpbyBmcm9tICdjcmlvJ1xuXG4vLyB7Zm9vOiBgYmFyYH0gW3tmb286IGBiYXJgfSwge2ZvbzogYGJhemB9XSA9PiBbe2ZvbzogYGJhemB9XVxuZXhwb3J0IGNvbnN0IGZpbHRlckFycmF5V2l0aE9iamVjdCA9ICgge2RlZmF1bHRPYmplY3QsIGFycmF5fSApID0+IHtcbiAgaWYgKCAhY3Jpby5pc0FycmF5KGFycmF5KSApIHJldHVybiBjcmlvKFtdKVxuICBpZiAoICFjcmlvLmlzT2JqZWN0KGRlZmF1bHRPYmplY3QpICkgcmV0dXJuIGFycmF5XG4gIGNvbnN0IGRlZmF1bHRFbnRyaWVzID0gZGVmYXVsdE9iamVjdC5lbnRyaWVzKClcbiAgY29uc3QgcmVzdWx0ID0gYXJyYXlcbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgb2JqZWN0IGhhcyB0aGUgc2FtZSBrZXlzIGFzIHRoZSBjb21wYXJpc29uXG4gICAgLm1hcCggZW50cnkgPT4gZGVmYXVsdE9iamVjdC5tZXJnZShudWxsLCBlbnRyeSkgKVxuICAgIC8vIFRvIGFjaGlldmUgZXF1YWwgY29tcGFyaXNvbnMsIGNhc3QgdG8gdGhlIHNhbWUgdHlwZVxuICAgIC5tYXAoIGVudHJ5ID0+IHtcbiAgICAgIGRlZmF1bHRFbnRyaWVzLmZvckVhY2goIChbcmVmS2V5LCByZWZWYWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiByZWZWYWx1ZVxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ID0gZW50cnkuc2V0KCByZWZLZXksIHBhcnNlRmxvYXQoZW50cnlbIHJlZktleSBdLCAxMCkgKVxuICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gZW50cnkgPSBlbnRyeS5zZXQoIHJlZktleSwgYCR7ZW50cnlbIHJlZktleSBdfWAgKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGVudHJ5XG4gICAgfSlcbiAgICAuZmlsdGVyKCBlbnRyeSA9PiB7XG4gICAgICAvLyBjaGVjayBzdHJpY3QgZXF1aXZhbGVuY2Ugb3ZlciBhbGwgdGhlIGRlZmF1bHRLZXlzXG4gICAgICBjb25zdCBpc1NhbWVBc0RlZmF1bHQgPSBkZWZhdWx0RW50cmllc1xuICAgICAgICAubWFwKCAoW3JlZktleSwgcmVmVmFsdWVdKSA9PiByZWZWYWx1ZSA9PT0gZW50cnkuZ2V0KHJlZktleSkgIClcbiAgICAgICAgLnJlZHVjZSggKGFjYywgY3VycikgPT4gYWNjICYmIGN1cnIsIHRydWUgKVxuICAgICAgcmV0dXJuICFpc1NhbWVBc0RlZmF1bHRcbiAgICB9KVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZpbHRlckFycmF5V2l0aE9iamVjdFxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAnLi9zcGlubmVyLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTID0gYHNwaW5uZXJgXG5jb25zdCBERUxBWSAgICAgID0gMTAwMFxuXG5leHBvcnQgY2xhc3MgU3Bpbm5lciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCBwcm9wcyApIHtcbiAgICBzdXBlciggcHJvcHMgKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaG93U3Bpbm5lcjogZmFsc2UsXG4gICAgfVxuICAgIHRoaXMuc2hvd1NwaW5uZXIgPSB0aGlzLnNob3dTcGlubmVyLmJpbmQoIHRoaXMgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy50aW1lcklkID0gc2V0VGltZW91dCggdGhpcy5zaG93U3Bpbm5lciwgREVMQVkgKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy50aW1lcklkICYmIGNsZWFyVGltZW91dCggdGhpcy50aW1lcklkIClcbiAgICB0aGlzLnRpbWVySWQgPSBmYWxzZVxuICB9XG5cbiAgc2hvd1NwaW5uZXIoKSB7XG4gICAgdGhpcy50aW1lcklkICYmIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiAoe1xuICAgICAgc2hvd1NwaW5uZXI6IHRydWUsXG4gICAgfSkpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgQ09NUF9DTEFTUyA9IFsgQkFTRV9DTEFTUyBdXG4gICAgaWYgKCB0aGlzLnN0YXRlLnNob3dTcGlubmVyICkgQ09NUF9DTEFTUy5wdXNoKCBgJHtCQVNFX0NMQVNTfS0taXMtbG9hZGluZ2AgKVxuICAgIHJldHVybiAoXG4gICAgICA8YXNpZGUgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUy5qb2luKGAgYCkgfT5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJzcGlubmVyLmxvYWRpbmdcIiAvPlxuICAgICAgPC9hc2lkZT5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lclxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCB7IE1haW4sIE1ldGEsIENvbnRlbnQsIENvbnRlbnRBY3Rpb25zIH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgeyBQYXBlclNoZWV0LCBCZXR3ZWVuLCBQYXJ0eVVzZXIsIFBhcnR5LCBSZWZlcmVuY2UsIE1lbnRpb25zIH0gZnJvbSAnLi4vbGF5b3V0L3BhcGVyLXNoZWV0J1xuaW1wb3J0IHsgRm9ybSAgLCBGb3JtQWN0aW9ucyB9IGZyb20gJy4uL3VpL2Zvcm0nXG5pbXBvcnQgeyBCdXR0b24sIEJ0bkljb24gICAgIH0gZnJvbSAnLi4vdWkvYnV0dG9ucydcbmltcG9ydCB7IElucHV0LCBUZXh0YXJlYSwgU2VsZWN0IH0gZnJvbSAnLi4vdWkvZmllbGQnXG5pbXBvcnQgeyBTdGVwcGVyIH0gZnJvbSAnLi4vdWkvc3RlcHBlcidcbmltcG9ydCBJY29uIGZyb20gJy4uL3VpL3N2Zy1pY29ucydcbmltcG9ydCB7IFByb2R1Y3RUYWJsZSB9IGZyb20gJy4uL3VpLXRhYmxlL3Byb2R1Y3RzJ1xuaW1wb3J0IHsgQ3JlYXRlSW52b2ljZSwgU2hvd0ludm9pY2UsIEFyY2hpdmVRdW90YXRpb24gfSBmcm9tICcuL2J1dHRvbnMnXG5cbmltcG9ydCAnLi9mb3JtLnByZXMuc2NzcydcbmV4cG9ydCBjb25zdCBCQVNFX0NMQVNTID0gYHF1b3RhdGlvbi1mb3JtYFxuZXhwb3J0IGNvbnN0IEZPUk1fSUQgICAgPSBCQVNFX0NMQVNTXG5cbmV4cG9ydCBmdW5jdGlvbiBRdW90YXRpb25Gb3JtUHJlcyggcHJvcHMgKSB7XG4gIGNvbnN0IHtcbiAgICBpc1NhdmluZyxcbiAgICBjdXN0b21lcnMsXG4gICAgZm9ybURhdGEsXG4gICAgY3VzdG9tZXIsXG4gICAgaXNOZXcsXG4gICAgaGFuZGxlLFxuICB9ID0gcHJvcHNcbiAgY29uc3QgeyBwcm9kdWN0cyB9ICAgID0gZm9ybURhdGFcbiAgY29uc3QgaGFzUHJvZHVjdHMgICAgID0gQXJyYXkuaXNBcnJheSggcHJvZHVjdHMgKVxuICBjb25zdCBwcm9kdWN0c0xlbmd0aCAgPSBoYXNQcm9kdWN0cyA/IHByb2R1Y3RzLmxlbmd0aCA6IDBcbiAgY29uc3Qgc3VibWl0STE4bklkID0gIGBxdW90YXRpb24uYnV0dG9uLiR7aXNOZXcgPyAnY3JlYXRlJyA6ICd1cGRhdGUnfWBcblxuICByZXR1cm4gKFxuICAgIDxGb3JtXG4gICAgICBpZD17IEZPUk1fSUQgfVxuICAgICAgaXNTYXZpbmc9eyBpc1NhdmluZyB9XG4gICAgICBvbkNoYW5nZT17IGhhbmRsZS5mb3JtQ2hhbmdlIH1cbiAgICAgIG9uU3VibWl0PXsgaGFuZGxlLnN1Ym1pdCB9XG4gICAgPlxuICAgICAgPE1haW4+XG4gICAgICAgIDxNZXRhPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgYCR7QkFTRV9DTEFTU31fX21ldGFgIH0+XG4gICAgICAgICAgICB7ICFpc05ldyAmJiA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGRlZmF1bHRWYWx1ZT17IGZvcm1EYXRhLmlkIH0gbmFtZT1cImlkXCIgLz4gfVxuICAgICAgICAgICAgPFN0ZXBwZXJcbiAgICAgICAgICAgICAgc3RlcHM9eyBmb3JtRGF0YS5zdGVwcyB9XG4gICAgICAgICAgICAgIGhhbmRsZURheUNoYW5nZT17IGhhbmRsZS5kYXlDaGFuZ2UgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5jdXN0b21lclwiXG4gICAgICAgICAgICAgIG5hbWU9XCJjdXN0b21lcklkXCJcbiAgICAgICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5nZXQoYGN1c3RvbWVySWRgKSB9XG4gICAgICAgICAgICAgIG9wdGlvbnM9eyBjdXN0b21lcnMgfVxuICAgICAgICAgICAgICBvcHRpb25zS2V5cz17eyB2YWx1ZTogYGlkYCwgbGFiZWw6IGBuYW1lYH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJ0YXhcIlxuICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLnRheFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgc3RlcD1cIjAuNVwiXG4gICAgICAgICAgICAgIHZhbHVlPXsgZm9ybURhdGEuZ2V0KGB0YXhgKSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01ldGE+XG4gICAgICAgIDxDb250ZW50PlxuICAgICAgICAgIDxQYXBlclNoZWV0PlxuICAgICAgICAgICAgPFJlZmVyZW5jZSB0eXBlPVwicXVvdGF0aW9uXCIgcHJvZHVjdD17IGZvcm1EYXRhIH0gLz5cbiAgICAgICAgICAgIDxCZXR3ZWVuPlxuICAgICAgICAgICAgICA8UGFydHlVc2VyIC8+XG4gICAgICAgICAgICAgIDxQYXJ0eSB0aXRsZT1cInRvXCIgcGVvcGxlPXsgY3VzdG9tZXIgfSAvPlxuICAgICAgICAgICAgPC9CZXR3ZWVuPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5zdWJqZWN0XCJcbiAgICAgICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5uYW1lIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8UHJvZHVjdFRhYmxlXG4gICAgICAgICAgICAgIGRvY3VtZW50PXsgZm9ybURhdGEgfVxuICAgICAgICAgICAgICBoYW5kbGVSZW1vdmU9eyBoYW5kbGUucHJvZHVjdFJlbW92ZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPE1lbnRpb25zIGNvbnRlbnQ9eyBmb3JtRGF0YS5xdW90YXRpb25Db25maWcubWVudGlvbnMgfS8+XG4gICAgICAgICAgPC9QYXBlclNoZWV0PlxuICAgICAgICAgIDxGb3JtQWN0aW9ucz5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17IHN1Ym1pdEkxOG5JZCB9IC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxDcmVhdGVJbnZvaWNlIHF1b3RhdGlvbj17IGZvcm1EYXRhIH0gLz5cbiAgICAgICAgICAgIDxTaG93SW52b2ljZSBxdW90YXRpb249eyBmb3JtRGF0YSB9IHdpdGhNZXNzYWdlIC8+XG4gICAgICAgICAgICA8QXJjaGl2ZVF1b3RhdGlvbiBkYW5nZXIgcXVvdGF0aW9uPXsgZm9ybURhdGEgfSAvPlxuICAgICAgICAgIDwvRm9ybUFjdGlvbnM+XG4gICAgICAgIDwvQ29udGVudD5cbiAgICAgIDwvTWFpbj5cbiAgICA8L0Zvcm0+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSAnLi4vdWkvZGF0ZS1waWNrZXInXG5cbmltcG9ydCAnLi9zdGVwcGVyLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTICAgICAgICAgICA9IGBzdGVwcGVyYFxuZXhwb3J0IGNvbnN0IENIRUNLRURfQ0xBU1MgPSBgJHtCQVNFX0NMQVNTfS0taXMtYWxsLWNoZWNrZWRgXG5leHBvcnQgY29uc3QgUkFESU9fQ0xBU1MgICA9IGAke0JBU0VfQ0xBU1N9X19pbnB1dGBcbmNvbnN0IENIRUNLQk9YX05BTUUgICAgICAgID0gYHN0ZXBwZXItZGlzcGxheS1mb3JtYFxuXG5leHBvcnQgY2xhc3MgU3RlcHBlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKCB0aGlzIClcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFN0ZXA6ICAwLFxuICAgICAgaXNBbGxDaGVja2VkOiBmYWxzZSxcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKCBuZXh0UHJvcHMsIHByZXZTdGF0ZSApIHtcbiAgICBjb25zdCB7IHN0ZXBzIH0gPSBuZXh0UHJvcHNcbiAgICBpZiAoICFBcnJheS5pc0FycmF5KHN0ZXBzKSApIHJldHVybiBwcmV2U3RhdGVcbiAgICBjb25zdCBjdXJyZW50U3RlcCAgPSBTdGVwcGVyLmdldFNlbGVjdGVkSW5kZXgoIHN0ZXBzIClcbiAgICBjb25zdCBpc0FsbENoZWNrZWQgPSBjdXJyZW50U3RlcCA9PT0gc3RlcHMubGVuZ3RoXG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRTdGVwLFxuICAgICAgaXNBbGxDaGVja2VkLFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRTZWxlY3RlZEluZGV4KCBzdGVwcyApIHtcbiAgICBsZXQgaW5kZXggPSAwXG4gICAgY29uc3QgaGFzT25lTWlzc2luZ1N0ZXAgPSBzdGVwcy5zb21lKCAoc3RlcCwgaSkgPT4ge1xuICAgICAgY29uc3QgaGFzTm9WYWx1ZSA9IHN0ZXAudmFsdWUgPT0gbnVsbCB8fCBzdGVwLnZhbHVlID09PSBgYFxuICAgICAgaWYgKCBoYXNOb1ZhbHVlICkgaW5kZXggPSBpXG4gICAgICByZXR1cm4gaGFzTm9WYWx1ZVxuICAgIH0pXG4gICAgcmV0dXJuIGhhc09uZU1pc3NpbmdTdGVwID8gaW5kZXggOiBzdGVwcy5sZW5ndGhcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZSggZXZlbnQsIGluZGV4ICkge1xuICAgIC8vIHdlIGRvbid0IHdhbnQgdGhlIGV2ZW50IHRvIGxlYWsgdG8gbWFpbiBmb3JtXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAvLyB3ZSBzdGlsbCB3YW50IHRvIGJlIGFibGUgdG8gc2hvdyBldmVyeXRoaW5nIG1hbnVhbGx5XG4gICAgdGhpcy5zZXRTdGF0ZSggcHJldlN0YXRlID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnRTdGVwOiAgaW5kZXgsXG4gICAgICAgIGlzQWxsQ2hlY2tlZDogZmFsc2UsXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlciggKSB7XG4gICAgY29uc3QgeyBzdGVwcywgLi4ub3RoZXJQcm9wc30gICAgICAgPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyBjdXJyZW50U3RlcCwgaXNBbGxDaGVja2VkIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgQ09NUF9DTEFTUyAgICAgICAgICAgICAgICAgICAgPSBbIEJBU0VfQ0xBU1MgXVxuICAgIGlmICggaXNBbGxDaGVja2VkICkgQ09NUF9DTEFTUy5wdXNoKCBDSEVDS0VEX0NMQVNTIClcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBDT01QX0NMQVNTLmpvaW4oYCBgKSB9PlxuICAgICAgICB7XG4gICAgICAgICAgc3RlcHMubWFwKChzdGVwLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPFN0ZXBcbiAgICAgICAgICAgICAga2V5PXsgc3RlcC5rZXkgfVxuICAgICAgICAgICAgICBjaGVja2VkPXsgaW5kZXggPT09IGN1cnJlbnRTdGVwIH1cbiAgICAgICAgICAgICAgaW5kZXg9eyBpbmRleCB9XG4gICAgICAgICAgICAgIHN0ZXA9eyBzdGVwIH1cbiAgICAgICAgICAgICAgaGFuZGxlQ2hhbmdlPXsgZXZlbnQgPT4gdGhpcy5oYW5kbGVDaGFuZ2UoIGV2ZW50LCBpbmRleCApIH1cbiAgICAgICAgICAgICAgeyAuLi5vdGhlclByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSlcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdGVwKCBwcm9wcyApIHtcbiAgY29uc3QgeyBzdGVwLCBjaGVja2VkLCBpbmRleCwgaGFuZGxlRGF5Q2hhbmdlIH0gPSBwcm9wc1xuICBjb25zdCBpZCAgPSBgJHsgc3RlcC5rZXkgfS0keyBpbmRleCB9YFxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxpbnB1dCBpZD17IGlkIH1cbiAgICAgICAgbmFtZT17IENIRUNLQk9YX05BTUUgfVxuICAgICAgICBjbGFzc05hbWU9e2AkeyBSQURJT19DTEFTUyB9YH1cbiAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgY2hlY2tlZD17IGNoZWNrZWQgfVxuICAgICAgICBvbkNoYW5nZT17IHByb3BzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2AkeyBCQVNFX0NMQVNTIH1fX3N0ZXBgfSA+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9e2AkeyBCQVNFX0NMQVNTIH1fX2J1dHRvbmB9IGh0bWxGb3I9e2lkfT5cbiAgICAgICAgICB7IHN0ZXAubGFiZWwgJiYgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eyBzdGVwLmxhYmVsIH0gLz4gfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7IEJBU0VfQ0xBU1MgfV9fY29udGVudGB9PlxuICAgICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgICB2YWx1ZT17IHN0ZXAudmFsdWUgfVxuICAgICAgICAgICAgbmFtZT17IHN0ZXAua2V5IH1cbiAgICAgICAgICAgIGhhbmRsZURheUNoYW5nZT17IGUgPT4gaGFuZGxlRGF5Q2hhbmdlKGUpIH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICAgICAgIGZyb20gJy4uL2R1Y2tzL3F1b3RhdGlvbnMnXG5pbXBvcnQgKiBhcyBjdXN0b21lcnMgICAgICAgICAgZnJvbSAnLi4vZHVja3MvY3VzdG9tZXJzJ1xuaW1wb3J0ICAgICAgTmF2U2Vjb25kYXJ5ICAgICAgIGZyb20gJy4uL25hdi9zZWNvbmRhcnknXG5pbXBvcnQge1xuICBCdXR0b25OZXcsXG4gIEJ1dHRvbkxpc3QsXG4gIEJ1dHRvblByZXZpZXcsXG4gIEJ1dHRvblN1Ym1pdCxcbn0gZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0ICAgUXVvdGF0aW9uRm9ybSAgICAgICAgICAgIGZyb20gJy4vZm9ybSdcbmltcG9ydCB7IEZPUk1fSUQgICAgICAgICAgICAgICAgfSBmcm9tICcuL2Zvcm0ucHJlcydcbmltcG9ydCB7IENyZWF0ZUludm9pY2UsIFNob3dJbnZvaWNlLCBBcmNoaXZlUXVvdGF0aW9uIH0gZnJvbSAnLi9idXR0b25zJ1xuXG5jb25zdCBUWVBFID0gYHF1b3RhdGlvbnNgXG5cbmZ1bmN0aW9uIEVkaXRRdW90YXRpb24oIHByb3BzICkge1xuICBjb25zdCB7IHF1b3RhdGlvbiwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgY29uc3QgeyBpZCB9ICAgICAgPSBwcm9wcy5tYXRjaC5wYXJhbXNcbiAgY29uc3QgcmVmZXJlbmNlICAgPSBxdW90YXRpb24uZ2V0KGByZWZlcmVuY2VgKVxuICBjb25zdCB0aXRsZVByb3BzICA9IHsgaWQ6YHBhZ2UucXVvdGF0aW9ucy5lZGl0YCwgdmFsdWVzOiB7cmVmZXJlbmNlfSB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25TdWJtaXRcbiAgICAgICAgICBmb3JtSWQgICA9IHsgRk9STV9JRCB9XG4gICAgICAgICAgaXNTYXZpbmcgPSB7IHByb3BzLmlzU2F2aW5nIH1cbiAgICAgICAgICBsYWJlbD1cIl8uc2F2ZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxTaG93SW52b2ljZVxuICAgICAgICAgIHdpdGhNZXNzYWdlXG4gICAgICAgICAgcXVvdGF0aW9uPXsgcXVvdGF0aW9uIH1cbiAgICAgICAgLz5cbiAgICAgICAgPEFyY2hpdmVRdW90YXRpb25cbiAgICAgICAgICBpY29uIGRhbmdlclxuICAgICAgICAgIHF1b3RhdGlvbj17IHF1b3RhdGlvbiB9XG4gICAgICAgICAgZm9ybT17IEZPUk1fSUQgfVxuICAgICAgICAgIGxhYmVsPVwicXVvdGF0aW9uLmJ1dHRvbi5hcmNoaXZlXCJcbiAgICAgICAgLz5cbiAgICAgICAgPENyZWF0ZUludm9pY2VcbiAgICAgICAgICBxdW90YXRpb249eyBxdW90YXRpb24gfVxuICAgICAgICAgIGZvcm09eyBGT1JNX0lEIH1cbiAgICAgICAgLz5cbiAgICAgICAgPEJ1dHRvblByZXZpZXdcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgaWQ9eyBpZCB9XG4gICAgICAgICAgbGFiZWw9XCJxdW90YXRpb24uYnV0dG9uLnByZXZpZXdcIlxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uTGlzdFxuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBsYWJlbD1cInF1b3RhdGlvbi5idXR0b24ubGlzdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25OZXdcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgc2Vjb25kYXJ5XG4gICAgICAgICAgaWNvblxuICAgICAgICAgIGxhYmVsPVwicXVvdGF0aW9uLmJ1dHRvbi5uZXdcIlxuICAgICAgICAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8UXVvdGF0aW9uRm9ybSB7Li4ucmVzdH0gLz5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3AoIHN0YXRlICkge1xuICByZXR1cm4ge1xuICAgIHF1b3RhdGlvbjogc3RhdGUucXVvdGF0aW9ucy5nZXQoIGBjdXJyZW50YCApLFxuICAgIGlzU2F2aW5nIDogc3RhdGUucXVvdGF0aW9ucy5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogRWRpdFF1b3RhdGlvbixcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBxdW90YXRpb25zLmdldE9uZSxcbiAgICBjdXN0b21lcnMuZ2V0QWxsLFxuICBdLFxufSkgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgaW5qZWN0SW50bCAgICAgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgICAgICAgICAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCB7ICAgIE1haW4gICAgICAgICAgICAgICwgQ29udGVudCB9IGZyb20gJy4uL2xheW91dC9tYWluJ1xuaW1wb3J0ICAgICAgTmF2U2Vjb25kYXJ5ICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbmF2L3NlY29uZGFyeSdcbmltcG9ydCB7XG4gIEJ1dHRvbk5ldyxcbiAgQnV0dG9uTGlzdCxcbiAgQnV0dG9uRWRpdCxcbiAgQnV0dG9uUHJpbnQsXG59IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vdWkvYWxlcnRzJ1xuaW1wb3J0IHsgUHJldmlldywgUHJpbnRpbmdOb3RpY2UgfSBmcm9tICcuLi91aS9wcmV2aWV3J1xuXG5jb25zdCBUWVBFID0gYHF1b3RhdGlvbnNgXG5cbmZ1bmN0aW9uIFByZXZpZXdRdW90YXRpb25QYWdlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpZCB9ID0gcHJvcHMubWF0Y2gucGFyYW1zXG4gIGNvbnN0IHsgcXVvdGF0aW9uIH0gPSBwcm9wc1xuICBjb25zdCByZWZlcmVuY2UgICAgID0gcXVvdGF0aW9uLmdldChgcmVmZXJlbmNlYClcbiAgY29uc3QgdGl0bGVQcm9wcyAgICA9IHsgaWQ6YHBhZ2UucXVvdGF0aW9ucy5wcmV2aWV3YCwgdmFsdWVzOiB7cmVmZXJlbmNlfSB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gKFxuICAgICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgICA8dGl0bGU+e3RpdGxlfTwvdGl0bGU+XG4gICAgICAgICAgICA8aHRtbCBjbGFzc05hbWU9XCJkYXJrLWJhY2tncm91bmRcIiAvPlxuICAgICAgICAgIDwvSGVsbWV0PlxuICAgICAgICApfVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25FZGl0XG4gICAgICAgICAgdHlwZT17IFRZUEUgfVxuICAgICAgICAgIGRvY3VtZW50PXsgcXVvdGF0aW9uIH1cbiAgICAgICAgICBsYWJlbD1cIl8uZWRpdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25QcmludCAvPlxuICAgICAgICA8QnV0dG9uTGlzdFxuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBsYWJlbD1cInF1b3RhdGlvbi5idXR0b24ubGlzdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25OZXdcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgc2Vjb25kYXJ5XG4gICAgICAgICAgaWNvblxuICAgICAgICAgIGxhYmVsPVwicXVvdGF0aW9uLmJ1dHRvbi5uZXdcIlxuICAgICAgICAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8TWFpbj5cbiAgICAgICAgPENvbnRlbnQ+XG4gICAgICAgICAgPFByaW50aW5nTm90aWNlIC8+XG4gICAgICAgICAgPFByZXZpZXcgdHlwZT1cInF1b3RhdGlvblwiIGRvY3VtZW50PXsgcXVvdGF0aW9uIH0gLz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgcXVvdGF0aW9uOiBzdGF0ZS5xdW90YXRpb25zLmdldChgY3VycmVudGApLFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlMnByb3AgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBQcmV2aWV3UXVvdGF0aW9uUGFnZSxcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBxdW90YXRpb25zLmdldE9uZSxcbiAgXSxcbn0pIClcblxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgICAgICAgICBmcm9tICcuLi9kdWNrcy9xdW90YXRpb25zJ1xuaW1wb3J0ICogYXMgaW52b2ljZXMgICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuaW1wb3J0IHsgTWFpbiwgQ29udGVudCAgICAgICAgICAgIH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgeyBOYXZTZWNvbmRhcnkgICAgICAgICAgICAgfSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHsgUXVvdGF0aW9uc1JlYWR5VG9JbnZvaWNlIH0gZnJvbSAnLi4vcXVvdGF0aW9ucy9saXN0J1xuaW1wb3J0IHsgQWN0aXZlSW52b2ljZXMgICAgICAgICAgIH0gZnJvbSAnLi9saXN0J1xuXG5mdW5jdGlvbiBJbnZvaWNlcyggcHJvcHMgKSB7XG4gIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgcGFnZS5pbnZvaWNlc2AgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8TWFpbj5cbiAgICAgICAgPENvbnRlbnQ+XG4gICAgICAgICAgPEFjdGl2ZUludm9pY2VzIC8+XG4gICAgICAgICAgPFF1b3RhdGlvbnNSZWFkeVRvSW52b2ljZSAvPlxuICAgICAgICA8L0NvbnRlbnQ+XG4gICAgICA8L01haW4+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wcyggc3RhdGUgKSB7XG4gIHJldHVybiB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wcyApKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IEludm9pY2VzLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIGludm9pY2VzLmxpc3RBY3RpdmUsXG4gICAgcXVvdGF0aW9ucy5saXN0UmVhZHlUb0ludm9pY2UsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlICAgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBDb25uZWN0RGF0YUZldGNoZXIgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBpbnZvaWNlcyAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvaW52b2ljZXMnXG5pbXBvcnQgICAgICBOYXZTZWNvbmRhcnkgICAgICAgZnJvbSAnLi4vbmF2L3NlY29uZGFyeSdcbmltcG9ydCB7XG4gIEJ1dHRvbkxpc3QsXG4gIEJ1dHRvblByZXZpZXcsXG4gIEJ1dHRvblN1Ym1pdCxcbn0gZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0IEludm9pY2VGb3JtICAgICAgICAsIHsgRk9STV9JRCB9IGZyb20gJy4vZm9ybSdcbmltcG9ydCB7IFNob3dRdW90YXRpb24sIEFyY2hpdmVJbnZvaWNlIH0gZnJvbSAnLi9idXR0b25zJ1xuXG5jb25zdCBUWVBFID0gYGludm9pY2VzYFxuXG5mdW5jdGlvbiBFZGl0SW52b2ljZSggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaWQgICAgICAgICAgICAgICB9ID0gcHJvcHMubWF0Y2gucGFyYW1zXG4gIGNvbnN0IHsgaW52b2ljZSwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgY29uc3QgICByZWZlcmVuY2UgICA9IGludm9pY2UuZ2V0KCBgcmVmZXJlbmNlYCApXG4gIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgcGFnZS5pbnZvaWNlcy5lZGl0YCwgdmFsdWVzOiB7cmVmZXJlbmNlfSB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25TdWJtaXRcbiAgICAgICAgICBmb3JtSWQ9eyBGT1JNX0lEIH1cbiAgICAgICAgICBpc1NhdmluZz17IHByb3BzLmlzU2F2aW5nIH1cbiAgICAgICAgICBsYWJlbD1cIl8uc2F2ZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxBcmNoaXZlSW52b2ljZVxuICAgICAgICAgIGljb24gZGFuZ2VyXG4gICAgICAgICAgZm9ybT17IEZPUk1fSUQgfVxuICAgICAgICAgIGludm9pY2U9eyBpbnZvaWNlIH1cbiAgICAgICAgICBsYWJlbD1cImludm9pY2VzLmJ1dHRvbi5hcmNoaXZlXCJcbiAgICAgICAgLz5cbiAgICAgICAgPFNob3dRdW90YXRpb24gLz5cbiAgICAgICAgPEJ1dHRvblByZXZpZXdcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgaWQ9eyBpZCB9XG4gICAgICAgICAgbGFiZWw9XCJpbnZvaWNlcy5idXR0b24ucHJldmlld1wiXG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25MaXN0XG4gICAgICAgICAgdHlwZT17IFRZUEUgfVxuICAgICAgICAgIGxhYmVsPVwiaW52b2ljZXMuYnV0dG9uLmxpc3RcIlxuICAgICAgICAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8SW52b2ljZUZvcm0gey4uLnJlc3R9IC8+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHtcbiAgICBpbnZvaWNlIDogc3RhdGUuaW52b2ljZXMuZ2V0KCBgY3VycmVudGAgICksXG4gICAgaXNTYXZpbmc6IHN0YXRlLmludm9pY2VzLmdldCggYGlzU2F2aW5nYCApLFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlMnByb3AgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBFZGl0SW52b2ljZSxcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBpbnZvaWNlcy5nZXRPbmUsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIGZsb3cgICAgICAgICAgICAgICAgIGZyb20gJ2xvZGFzaC5mbG93J1xuaW1wb3J0ICAgY3JpbyAgICAgICAgICAgICAgICAgZnJvbSAnY3JpbydcbmltcG9ydCAgIHNob3J0aWQgICAgICAgICAgICAgIGZyb20gJ3Nob3J0aWQnXG5pbXBvcnQgICBzZXJpYWxpemUgICAgICAgICAgICBmcm9tICdmb3JtLXNlcmlhbGl6ZSdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuaW1wb3J0ICogYXMgcmVkaXJlY3Rpb24gICAgICAgZnJvbSAnLi4vdXRpbHMvY2hlY2stcmVkaXJlY3Rpb24nXG5pbXBvcnQgeyAgICBnZXRJbnB1dFZhbHVlICAgfSBmcm9tICcuLi91dGlscy9nZXQtaW5wdXQtdmFsdWUnXG5pbXBvcnQgeyAgICBGb3JtICAgICAgICAgICAgfSBmcm9tICcuLi91aS9mb3JtJ1xuaW1wb3J0IHsgICAgU3Bpbm5lciAgICAgICAgIH0gZnJvbSAnLi4vdWkvc3Bpbm5lcidcbmltcG9ydCAgICAgIEludm9pY2VGb3JtUHJlcyAgIGZyb20gJy4vZm9ybS5wcmVzJ1xuXG5leHBvcnQgY29uc3QgRk9STV9JRCA9IGBpbnZvaWNlLWZvcm1gXG5cbmZ1bmN0aW9uIHVwZGF0ZVBheW1lbnRzKCBmb3JtRGF0YSApIHtcbiAgY29uc3QgcGF5bWVudHMgICAgICAgID0gZm9ybURhdGEuZ2V0KCBgcGF5bWVudHNgIClcbiAgaWYgKCAhY3Jpby5pc0FycmF5KHBheW1lbnRzKSApIHJldHVybiBmb3JtRGF0YVxuICBjb25zdCB1cGRhdGVkUGF5bWVudHMgPSBwYXltZW50c1xuICAgIC5maWx0ZXIoIHBheW1lbnQgPT4gcGF5bWVudC5tZXNzYWdlIHx8IHBheW1lbnQuZGF0ZSB8fCBwYXltZW50LmFtb3VudCApXG4gICAgLm1hcCggcGF5bWVudCA9PiB7XG4gICAgICBpZiAoIXBheW1lbnQuX2lkKSByZXR1cm4gcGF5bWVudC5zZXQoIGBfaWRgLCBzaG9ydGlkKCkgKVxuICAgICAgcmV0dXJuIHBheW1lbnRcbiAgICB9IClcbiAgICAucHVzaChjcmlvKHtcbiAgICAgIF9pZDogICAgICBzaG9ydGlkKCksXG4gICAgICBtZXNzYWdlOiAgYGAsXG4gICAgICBkYXRlOiAgICAgYGAsXG4gICAgICBhbW91bnQ6ICAgMCxcbiAgICB9KSlcbiAgcmV0dXJuIGZvcm1EYXRhLnNldCggYHBheW1lbnRzYCwgdXBkYXRlZFBheW1lbnRzIClcbn1cbmZ1bmN0aW9uIHJlbW92ZUxpbmUoeyBpbmRleCwgZm9ybURhdGEgfSkge1xuICBjb25zdCBwYXltZW50cyA9IGZvcm1EYXRhLmdldCggYHBheW1lbnRzYCApXG4gIGlmICggIWNyaW8uaXNBcnJheShwYXltZW50cykgKSByZXR1cm4gZm9ybURhdGFcbiAgcmV0dXJuIGZvcm1EYXRhLnNldCggYHBheW1lbnRzYCwgcGF5bWVudHMuc3BsaWNlKCBpbmRleCwgMSApKVxufVxuZnVuY3Rpb24gcmVjb21wdXRlVG90YWxzKCBmb3JtRGF0YSApIHtcbiAgY29uc3QgcGF5bWVudHMgPSBmb3JtRGF0YS5nZXQoIGBwYXltZW50c2AgKVxuICBpZiAoICFjcmlvLmlzQXJyYXkocGF5bWVudHMpICkgcmV0dXJuIGZvcm1EYXRhXG4gIGNvbnN0IHRvdGFsID0gZm9ybURhdGEuZ2V0KCBgdG90YWxgIClcbiAgY29uc3QgcGFpZCAgPSBwYXltZW50c1xuICAgIC5yZWR1Y2UoIChhY2MsIHBheW1lbnQpID0+IHBhcnNlRmxvYXQocGF5bWVudC5hbW91bnQsIDEwKSArIGFjYywgMClcbiAgY29uc3QgbGVmdCAgPSB0b3RhbCAtIHBhaWRcbiAgcmV0dXJuIGZvcm1EYXRhXG4gICAgLnNldChgdG90YWxQYWlkYCwgcGFpZCApXG4gICAgLnNldChgdG90YWxMZWZ0YCwgbGVmdCApXG59XG5mdW5jdGlvbiB1cGRhdGVQYXltZW50c0ZpZWxkUGF0aCggZm9ybURhdGEgKSB7XG4gIGNvbnN0IHBheW1lbnRzID0gZm9ybURhdGEuZ2V0KCBgcGF5bWVudHNgIClcbiAgaWYgKCAhY3Jpby5pc0FycmF5KHBheW1lbnRzKSApIHJldHVybiBmb3JtRGF0YVxuICBjb25zdCB1cGRhdGVkICAgPSBwYXltZW50cy5tYXAoIChwYXltZW50LCBpbmRleCkgPT4ge1xuICAgIHJldHVybiBwYXltZW50LnNldChgX2ZpZWxkUGF0aGAsIGBwYXltZW50c1ske2luZGV4fV1gKVxuICB9KVxuICByZXR1cm4gZm9ybURhdGEuc2V0KCBgcGF5bWVudHNgLCB1cGRhdGVkIClcbn1cblxuY2xhc3MgSW52b2ljZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCBwcm9wcyApIHtcbiAgICBzdXBlciggcHJvcHMgKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZvcm1EYXRhOiBJbnZvaWNlRm9ybS51cGRhdGVQYXltZW50cyggcHJvcHMuaW52b2ljZSApLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCAgICAgICAgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKCB0aGlzIClcbiAgICB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UgICAgPSB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVEYXlDaGFuZ2UgICAgID0gdGhpcy5oYW5kbGVEYXlDaGFuZ2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVSZW1vdmVQYXltZW50ID0gdGhpcy5oYW5kbGVSZW1vdmVQYXltZW50LmJpbmQoIHRoaXMgKVxuICB9XG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoIG5leHRQcm9wcywgcHJldlN0YXRlICkge1xuICAgIGNvbnN0ICAgbmV4dCAgICAgICAgICAgICAgICA9IG5leHRQcm9wcy5pbnZvaWNlXG4gICAgY29uc3QgICBjdXJyZW50ICAgICAgICAgICAgID0gcHJldlN0YXRlLmZvcm1EYXRhXG4gICAgY29uc3QgeyBoaXN0b3J5LCBzdGF0aWNDb250ZXh0LCBpc1NhdmluZyB9ID0gbmV4dFByb3BzXG4gICAgaWYgKCBpc1NhdmluZyApIHJldHVybiBudWxsXG4gICAgaWYgKCBjdXJyZW50ID09PSBuZXh0ICkgcmV0dXJuIG51bGxcblxuICAgIC8vIHJlZGlyZWN0c1xuICAgIHJlZGlyZWN0aW9uLmludm9pY2Uoe1xuICAgICAgbmV4dCxcbiAgICAgIGN1cnJlbnQsXG4gICAgICBoaXN0b3J5LFxuICAgICAgc3RhdGljQ29udGV4dCxcbiAgICB9KVxuXG4gICAgcmV0dXJuIHsgZm9ybURhdGE6IEludm9pY2VGb3JtLnVwZGF0ZVBheW1lbnRzKCBuZXh0ICkgfVxuICB9XG5cbiAgLy8tLS0tLSBVVElMU1xuXG4gIHN0YXRpYyBpc1BheW1lbnRGaWVsZE5hbWUoIGlucHV0TmFtZSApIHtcbiAgICByZXR1cm4gL15wYXltZW50c1xcW1xcZCtcXF0vLnRlc3QoIGlucHV0TmFtZSApXG4gIH1cblxuICBzdGF0aWMgdXBkYXRlUGF5bWVudHMgPSBmbG93KFxuICAgIHVwZGF0ZVBheW1lbnRzLFxuICAgIHVwZGF0ZVBheW1lbnRzRmllbGRQYXRoLFxuICAgIHJlY29tcHV0ZVRvdGFscyxcbiAgKVxuICBzdGF0aWMgcmVtb3ZlTGluZSA9IGZsb3coXG4gICAgcmVtb3ZlTGluZSxcbiAgICB1cGRhdGVQYXltZW50c0ZpZWxkUGF0aCxcbiAgICByZWNvbXB1dGVUb3RhbHMsXG4gIClcblxuICAvLy0tLS0tIEVWRU5UU1xuXG4gIGhhbmRsZVN1Ym1pdCggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGJvZHkgPSBzZXJpYWxpemUoIGV2ZW50LnRhcmdldCwgeyBoYXNoOiB0cnVlLCBlbXB0eTogdHJ1ZSB9IClcbiAgICB0aGlzLnByb3BzLnNhdmUoeyBib2R5IH0pXG4gIH1cbiAgaGFuZGxlRm9ybUNoYW5nZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZ2V0SW5wdXRWYWx1ZSggZXZlbnQudGFyZ2V0IClcblxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICBsZXQgdXBkYXRlZCAgICAgICAgICAgPSBwcmV2U3RhdGUuZm9ybURhdGEuc2V0KCBuYW1lLCB2YWx1ZSApXG4gICAgICBjb25zdCBpc1BheW1lbnRDaGFuZ2UgPSBJbnZvaWNlRm9ybS5pc1BheW1lbnRGaWVsZE5hbWUoIG5hbWUgKVxuICAgICAgaWYgKCBpc1BheW1lbnRDaGFuZ2UgKSB1cGRhdGVkID0gSW52b2ljZUZvcm0udXBkYXRlUGF5bWVudHMoIHVwZGF0ZWQgKVxuICAgICAgcmV0dXJuIHsgZm9ybURhdGE6IHVwZGF0ZWQgfVxuICAgIH0pXG4gIH1cbiAgaGFuZGxlRGF5Q2hhbmdlKCB0YXJnZXQgKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRm9ybUNoYW5nZSh7dGFyZ2V0fSlcbiAgfVxuICBoYW5kbGVSZW1vdmVQYXltZW50KCBpbmRleCApIHtcbiAgICB0aGlzLnNldFN0YXRlKCBwcmV2U3RhdGUgPT4ge1xuICAgICAgY29uc3QgeyBmb3JtRGF0YSB9ID0gcHJldlN0YXRlXG4gICAgICBjb25zdCB1cGRhdGVkICAgICAgPSBJbnZvaWNlRm9ybS5yZW1vdmVMaW5lKCB7Zm9ybURhdGEsIGluZGV4fSApXG4gICAgICByZXR1cm4geyBmb3JtRGF0YTogdXBkYXRlZCB9XG4gICAgfSlcbiAgfVxuXG4gIC8vLS0tLS0gUkVOREVSXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaXNTYXZpbmcsIGlzTG9hZGluZyB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgZm9ybURhdGEgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAoIGlzTG9hZGluZyApIHJldHVybiA8U3Bpbm5lciAvPlxuXG4gICAgY29uc3QgcmVuZGVyUHJvcHMgPSB7XG4gICAgICBpbnZvaWNlOiBmb3JtRGF0YSxcbiAgICAgIGhhbmRsZToge1xuICAgICAgICBkYXlDaGFuZ2UgICAgIDogdGhpcy5oYW5kbGVEYXlDaGFuZ2UsXG4gICAgICAgIHJlbW92ZVBheW1lbnQgOiB0aGlzLmhhbmRsZVJlbW92ZVBheW1lbnQsXG4gICAgICB9LFxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEZvcm1cbiAgICAgICAgaWQ9eyBGT1JNX0lEIH1cbiAgICAgICAgaXNTYXZpbmc9eyBpc1NhdmluZyB9XG4gICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVGb3JtQ2hhbmdlIH1cbiAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pdCB9XG4gICAgICA+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgZGVmYXVsdFZhbHVlPXsgZm9ybURhdGEuZ2V0KGBpZGApIH0gbmFtZT1cImlkXCIgLz5cbiAgICAgICAgPEludm9pY2VGb3JtUHJlcyB7Li4ucmVuZGVyUHJvcHN9Lz5cbiAgICAgIDwvRm9ybT5cbiAgICApXG4gIH1cbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgaXNTYXZpbmcgOiBzdGF0ZS5pbnZvaWNlcy5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgICBpbnZvaWNlICA6IHN0YXRlLmludm9pY2VzLmdldCggYGN1cnJlbnRgICksXG4gICAgaXNMb2FkaW5nOiBzdGF0ZS5pbnZvaWNlcy5nZXQoIGBjdXJyZW50LmlzTG9hZGluZ2AgKSxcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaDJwcm9wKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgc2F2ZTogaW52b2ljZXMuc2F2ZU9uZSxcbiAgfSwgZGlzcGF0Y2gpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlMnByb3AsIGRpc3BhdGNoMnByb3AgKSggSW52b2ljZUZvcm0gKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0IHsgICAgRm9ybUFjdGlvbnMgICB9IGZyb20gJy4uL3VpL2Zvcm0nXG5pbXBvcnQgeyAgICBCdXR0b24gICAgICAgIH0gZnJvbSAnLi4vdWkvYnV0dG9ucydcbmltcG9ydCB7ICAgIFByb2dyZXNzICAgICAgfSBmcm9tICcuLi91aS9wcm9ncmVzcydcbmltcG9ydCB7ICAgIFByZXZpZXcgICAgICAgfSBmcm9tICcuLi91aS9wcmV2aWV3J1xuaW1wb3J0ICogYXMgVGFicyAgICAgICAgICAgIGZyb20gJy4uL3VpL3RhYnMnXG5pbXBvcnQgeyBTaG93UXVvdGF0aW9uLCBBcmNoaXZlSW52b2ljZSB9IGZyb20gJy4vYnV0dG9ucydcbmltcG9ydCB7ICAgIEludm9pY2VIZWFkZXIgIH0gZnJvbSAnLi9oZWFkZXInXG5pbXBvcnQgeyAgICBJbnZvaWNlRXZlbnRzICB9IGZyb20gJy4vZXZlbnRzLXRhYmxlJ1xuaW1wb3J0ICogYXMgRXZlbnRzRWRpdGFibGUgICBmcm9tICcuL2V2ZW50cy1lZGl0YWJsZSdcblxuZXhwb3J0IGNvbnN0IEJBU0VfQ0xBU1MgICAgPSBgaW52b2ljZS1mb3JtYFxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJbnZvaWNlRm9ybVByZXMoIHByb3BzICkge1xuICBjb25zdCB7IGludm9pY2UsIGhhbmRsZSB9ID0gcHJvcHNcbiAgY29uc3QgcGF5bWVudHMgPSBpbnZvaWNlLmdldCggYHBheW1lbnRzYCApXG5cbiAgcmV0dXJuIChcbiAgICA8VGFicy5XcmFwcGVyPlxuICAgICAgPFRhYnMuTGlzdD5cbiAgICAgICAgPFRhYnMuSGVhZGVyPlxuICAgICAgICAgIDxJbnZvaWNlSGVhZGVyIGludm9pY2U9eyBpbnZvaWNlIH0gLz5cbiAgICAgICAgPC9UYWJzLkhlYWRlcj5cbiAgICAgICAgPFRhYnMuVGFiPlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMudGFiLnBheW1lbnRzXCIgLz5cbiAgICAgICAgPC9UYWJzLlRhYj5cbiAgICAgICAgPFRhYnMuVGFiPlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMudGFiLnByZXZpZXdcIiAvPlxuICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgPC9UYWJzLkxpc3Q+XG5cbiAgICAgIHsvKiBQQVlNRU5UUyAqL31cbiAgICAgIDxUYWJzLlBhbmVsPlxuICAgICAgICA8UHJvZ3Jlc3NcbiAgICAgICAgICBtYXg9eyAgIGludm9pY2UuZ2V0KGB0b3RhbGApIH1cbiAgICAgICAgICB2YWx1ZT17IGludm9pY2UuZ2V0KGB0b3RhbFBhaWRgKSB9XG4gICAgICAgIC8+XG4gICAgICAgIDxJbnZvaWNlRXZlbnRzIGludm9pY2U9eyBpbnZvaWNlIH0+XG4gICAgICAgICAgPEV2ZW50c0VkaXRhYmxlLlNlbnRcbiAgICAgICAgICAgIGludm9pY2U9eyBpbnZvaWNlIH1cbiAgICAgICAgICAgIGhhbmRsZT17IGhhbmRsZSB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICB7IHBheW1lbnRzLm1hcCgocGF5bWVudCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxFdmVudHNFZGl0YWJsZS5QYXltZW50XG4gICAgICAgICAgICAgIGtleT17IHBheW1lbnQuX2lkIH1cbiAgICAgICAgICAgICAgcGF5bWVudD17IHBheW1lbnQgfVxuICAgICAgICAgICAgICBpbmRleD17IGluZGV4IH1cbiAgICAgICAgICAgICAgbm90TGFzdD17IGluZGV4IDwgcGF5bWVudHMubGVuZ3RoIC0gMSB9XG4gICAgICAgICAgICAgIGhhbmRsZT17ICBoYW5kbGUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9JbnZvaWNlRXZlbnRzPlxuICAgICAgICA8Rm9ybUFjdGlvbnM+XG4gICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLmJ1dHRvbi5zYXZlXCIgLz5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8U2hvd1F1b3RhdGlvbiAvPlxuICAgICAgICAgIDxBcmNoaXZlSW52b2ljZSBkYW5nZXIgaW52b2ljZT17IGludm9pY2UgfSAvPlxuICAgICAgICA8L0Zvcm1BY3Rpb25zPlxuICAgICAgPC9UYWJzLlBhbmVsPlxuXG4gICAgICB7LyogUFJFVklFVyAqL31cbiAgICAgIDxUYWJzLlBhbmVsPlxuICAgICAgICA8UHJldmlldyB0eXBlPVwiaW52b2ljZVwiIGRvY3VtZW50PXsgaW52b2ljZSB9IC8+XG4gICAgICA8L1RhYnMuUGFuZWw+XG4gICAgPC9UYWJzLldyYXBwZXI+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgKiBhcyBUYWJsZSAgICAgICAgZnJvbSAnLi4vdWktdGFibGUnXG5pbXBvcnQgeyAgICBEYXRlUGlja2VyIH0gZnJvbSAnLi4vdWkvZGF0ZS1waWNrZXInXG5pbXBvcnQgeyAgICBCdG5JY29uICAgIH0gZnJvbSAnLi4vdWkvYnV0dG9ucydcblxuZnVuY3Rpb24gSW52b2ljZUV2ZW50U2VudEVkaXRhYmxlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpbnZvaWNlLCBoYW5kbGUgfSA9IHByb3BzXG4gIHJldHVybiAoXG4gICAgPFRhYmxlLlJvdz5cbiAgICAgIDxUYWJsZS5DZWxsIC8+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJpbnZvaWNlcy5ldmVudC5zZW50XCIgLz5cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsIHR5cGU9XCJ0ZXh0XCI+IOKAkyA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPERhdGVQaWNrZXJcbiAgICAgICAgICBuYW1lPVwic2VuZEF0XCJcbiAgICAgICAgICB2YWx1ZT17IGludm9pY2UuZ2V0KGBzZW5kQXRgKSB9XG4gICAgICAgICAgaGFuZGxlRGF5Q2hhbmdlPXsgaGFuZGxlLmRheUNoYW5nZSB9XG4gICAgICAgIC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCB0eXBlPVwibnVtYmVyXCI+IOKAkyA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCAvPlxuICAgIDwvVGFibGUuUm93PlxuICApXG59XG5leHBvcnQgeyBJbnZvaWNlRXZlbnRTZW50RWRpdGFibGUgYXMgU2VudCB9XG5cbmZ1bmN0aW9uIEludm9pY2VFdmVudFBheW1lbnRFZGl0YWJsZSggcHJvcHMgKSB7XG4gIGNvbnN0IHsgcGF5bWVudCwgaGFuZGxlLCBpbmRleCwgbm90TGFzdCB9ID0gcHJvcHNcbiAgcmV0dXJuIChcbiAgICA8VGFibGUuUm93IGtleT17cGF5bWVudC5nZXQoYF9pZGApfSA+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgbmFtZT17YCR7cGF5bWVudC5fZmllbGRQYXRofVtfaWRdYH1cbiAgICAgICAgICB2YWx1ZT17IHBheW1lbnQuZ2V0KGBfaWRgKSB9XG4gICAgICAgIC8+XG4gICAgICAgIHsgaW5kZXggKyAxIH1cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLmV2ZW50LnBheW1lbnRcIiAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBrZXk9e2Ake3BheW1lbnQuX2ZpZWxkUGF0aH0tJHtwYXltZW50LmdldChgX2lkYCl9LW1lc3NhZ2VgfVxuICAgICAgICAgIG5hbWU9e2Ake3BheW1lbnQuX2ZpZWxkUGF0aH1bbWVzc2FnZV1gfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17cGF5bWVudC5nZXQoYG1lc3NhZ2VgKX1cbiAgICAgICAgLz5cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgIG5hbWU9e2Ake3BheW1lbnQuX2ZpZWxkUGF0aH1bZGF0ZV1gfVxuICAgICAgICAgIHZhbHVlPXsgcGF5bWVudC5nZXQoYGRhdGVgKSB9XG4gICAgICAgICAgaGFuZGxlRGF5Q2hhbmdlPXsgaGFuZGxlLmRheUNoYW5nZSB9XG4gICAgICAgIC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAga2V5PXtgJHtwYXltZW50Ll9maWVsZFBhdGh9LSR7cGF5bWVudC5nZXQoYF9pZGApfWB9XG4gICAgICAgICAgbmFtZT17YCR7cGF5bWVudC5fZmllbGRQYXRofVthbW91bnRdYH1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9eyBwYXltZW50LmdldChgYW1vdW50YCkgfVxuICAgICAgICAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIHtub3RMYXN0JiYgPEJ0bkljb25cbiAgICAgICAgICBsaW5rQWxpa2VcbiAgICAgICAgICBvbkNsaWNrPXsgZSA9PiBoYW5kbGUucmVtb3ZlUGF5bWVudChpbmRleCwgcGF5bWVudC5fZmllbGRQYXRoKSB9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgc3ZnSWQ9XCJkZWxldGVcIlxuICAgICAgICAvPn1cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICA8L1RhYmxlLlJvdz5cbiAgKVxufVxuZXhwb3J0IHsgSW52b2ljZUV2ZW50UGF5bWVudEVkaXRhYmxlIGFzIFBheW1lbnQgfVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBDb25uZWN0RGF0YUZldGNoZXIgICAgICAgICAgICBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuaW1wb3J0IHsgICAgTWFpbiAgICAgICAgICAgICAgLCBDb250ZW50IH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgICAgICBOYXZTZWNvbmRhcnkgICAgICAgICAgICAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHtcbiAgQnV0dG9uTGlzdCxcbiAgQnV0dG9uRWRpdCxcbiAgQnV0dG9uUHJpbnQsXG59IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCB7IFByZXZpZXcsIFByaW50aW5nTm90aWNlIH0gZnJvbSAnLi4vdWkvcHJldmlldydcblxuY29uc3QgVFlQRSA9IGBpbnZvaWNlc2BcblxuZnVuY3Rpb24gUHJldmlld0ludm9pY2VQYWdlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpbnZvaWNlIH0gPSBwcm9wc1xuICBjb25zdCByZWZlcmVuY2UgPSBpbnZvaWNlLmdldChgcmVmZXJlbmNlYClcbiAgY29uc3QgeyBpZCB9ID0gcHJvcHMubWF0Y2gucGFyYW1zXG4gIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgcGFnZS5pbnZvaWNlcy5wcmV2aWV3YCwgdmFsdWVzOiB7cmVmZXJlbmNlfSB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gKFxuICAgICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgICA8dGl0bGU+e3RpdGxlfTwvdGl0bGU+XG4gICAgICAgICAgICA8aHRtbCBjbGFzc05hbWU9XCJkYXJrLWJhY2tncm91bmRcIiAvPlxuICAgICAgICAgIDwvSGVsbWV0PlxuICAgICAgICApfVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25FZGl0XG4gICAgICAgICAgdHlwZT17VFlQRX1cbiAgICAgICAgICBkb2N1bWVudD17IGludm9pY2UgfVxuICAgICAgICAgIGxhYmVsPVwiXy5lZGl0XCJcbiAgICAgICAgLz5cbiAgICAgICAgPEJ1dHRvblByaW50IC8+XG4gICAgICAgIDxCdXR0b25MaXN0XG4gICAgICAgICAgdHlwZT17VFlQRX1cbiAgICAgICAgICBsYWJlbD1cImludm9pY2VzLmJ1dHRvbi5saXN0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuICAgICAgPE1haW4+XG4gICAgICAgIDxDb250ZW50PlxuICAgICAgICAgIDxQcmludGluZ05vdGljZSAvPlxuICAgICAgICAgIDxQcmV2aWV3IHR5cGU9XCJpbnZvaWNlXCIgZG9jdW1lbnQ9eyBpbnZvaWNlIH0gLz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgaW52b2ljZTogc3RhdGUuaW52b2ljZXMuZ2V0KCBgY3VycmVudGAgKSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogUHJldmlld0ludm9pY2VQYWdlLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIGludm9pY2VzLmdldE9uZSxcbiAgXSxcbn0pIClcblxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgICAgICAgICAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgY3VzdG9tZXJzICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvY3VzdG9tZXJzJ1xuaW1wb3J0IHsgICAgTWFpbiAgICAgICAgICAgICAgLCBDb250ZW50IH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgICAgICBOYXZTZWNvbmRhcnkgICAgICAgICAgICAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHsgICAgQnV0dG9uTmV3ICAgICAgICAgIH0gICAgICAgICAgZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0IHsgICAgQWN0aXZlQ3VzdG9tZXJzICAgIH0gICAgICAgICAgZnJvbSAnLi9saXN0J1xuXG5jb25zdCBUWVBFID0gYGN1c3RvbWVyc2BcblxuZnVuY3Rpb24gQ3VzdG9tZXJzKCBwcm9wcyApIHtcbiAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBwYWdlLmN1c3RvbWVyc2AgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgICA8QnV0dG9uTmV3IHR5cGU9eyBUWVBFIH0gbWVzc2FnZT1cImN1c3RvbWVyLmJ1dHRvbi5uZXdcIiAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8TWFpbj5cbiAgICAgICAgPENvbnRlbnQ+XG4gICAgICAgICAgPEFjdGl2ZUN1c3RvbWVycyAvPlxuICAgICAgICA8L0NvbnRlbnQ+XG4gICAgICA8L01haW4+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogQ3VzdG9tZXJzLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIGN1c3RvbWVycy5nZXRBbGwsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuXG5cbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgZnJvbSAnLi4vZHVja3MvY3VzdG9tZXJzJ1xuaW1wb3J0IHsgVGFibGUsIFJvdywgQ2VsbCB9IGZyb20gJy4uL3VpLXRhYmxlJ1xuaW1wb3J0IHsgRm9ybWF0TnVtYmVyLCBBbW91bnQgfSBmcm9tICcuLi91aS9mb3JtYXQnXG5pbXBvcnQgeyBQcm9ncmVzcyB9IGZyb20gJy4uL3VpL3Byb2dyZXNzJ1xuXG5mdW5jdGlvbiBDdXN0b21lclJvdyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgY3VzdG9tZXIgfSA9IHByb3BzXG4gIGNvbnN0IHVybCAgICAgID0gYC9jdXN0b21lcnMvJHtjdXN0b21lci5pZH1gXG4gIHJldHVybiAoXG4gICAgPFJvdz5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8TGluayB0bz17IHVybCB9PnsgY3VzdG9tZXIubmFtZSB9PC9MaW5rPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGwgPlxuICAgICAgICA8Rm9ybWF0TnVtYmVyIHZhbHVlPXtjdXN0b21lci5xdW90YXRpb25zQ291bnR9IC8+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPEFtb3VudCB2YWx1ZT17Y3VzdG9tZXIucXVvdGF0aW9uc1RvdGFsfSAvPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGw+XG4gICAgICAgIDxGb3JtYXROdW1iZXIgdmFsdWU9e2N1c3RvbWVyLmludm9pY2VzQ291bnR9IC8+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPEFtb3VudCB2YWx1ZT17Y3VzdG9tZXIuZ2V0KGBpbnZvaWNlc1RvdGFsYCl9IC8+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPFByb2dyZXNzXG4gICAgICAgICAgdGFibGVMYXlvdXRcbiAgICAgICAgICB2YWx1ZT17IGN1c3RvbWVyLmdldChgaW52b2ljZXNUb3RhbFBhaWRgKSB9XG4gICAgICAgICAgbWF4PXsgY3VzdG9tZXIuZ2V0KGBpbnZvaWNlc1RvdGFsYCkgfVxuICAgICAgICAvPlxuICAgICAgPC9DZWxsPlxuICAgIDwvUm93PlxuICApXG59XG5cbmNvbnN0IGN1c3RvbWVyQ29sdW1ucyA9IFtcbiAgeyBpZDogYG5hbWVgICAgICAgICAgICAgLCBsYWJlbDogYHRhYmxlLmhlYWRlci5uYW1lYCAgICAgICAgICAgICAgLCBzb3J0OiBgbmFtZWAgICAgIH0sXG4gIHsgaWQ6IGBxdW90YXRpb25zYCAgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIucXVvdGF0aW9uc2AgICAgICAgICwgdHlwZTogYG51bWJlcmAgICB9LFxuICB7IGlkOiBgcXVvdGF0aW9ucy10b3RhbGAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmN1bXVsYXRpdmUtYW1vdW50YCAsIHR5cGU6IGBhbW91bnRgICAgfSxcbiAgeyBpZDogYGludm9pY2VzYCAgICAgICAgLCBsYWJlbDogYHRhYmxlLmhlYWRlci5pbnZvaWNlc2AgICAgICAgICAgLCB0eXBlOiBgbnVtYmVyYCAgIH0sXG4gIHsgaWQ6IGBpbnZvaWNlcy10b3RhbGAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIuY3VtdWxhdGl2ZS1hbW91bnRgICwgdHlwZTogYGFtb3VudGAgICB9LFxuICB7IGlkOiBgaW52b2ljZXMtcGFpZGAgICAsIGxhYmVsOiBgdGFibGUuYW1vdW50LnBhaWRgICAgICAgICAgICAgICAsIHR5cGU6IGBwcm9ncmVzc2AgfSxcbl1cblxuZnVuY3Rpb24gQ3VzdG9tZXJMaXN0KCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIGN1c3RvbWVycyA9IFtdLFxuICAgIC4uLnJlc3RcbiAgfSA9IHByb3BzXG5cbiAgcmV0dXJuIChcbiAgICA8VGFibGVcbiAgICAgIHByZXNlbnRhdGlvblxuICAgICAgY29sdW1ucz17IGN1c3RvbWVyQ29sdW1ucyB9XG4gICAgICB7IC4uLnJlc3QgfVxuICAgID5cbiAgICB7IGN1c3RvbWVycy5tYXAoIGN1c3RvbWVyID0+IChcbiAgICAgICAgPEN1c3RvbWVyUm93IGtleT17Y3VzdG9tZXIuaWR9IGN1c3RvbWVyPXtjdXN0b21lcn0gLz5cbiAgICApKX1cbiAgICA8L1RhYmxlPlxuICApXG59XG5cbmV4cG9ydCBjb25zdCBBY3RpdmVDdXN0b21lcnMgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGN1c3RvbWVyczogc3RhdGUuY3VzdG9tZXJzLmdldChgYWN0aXZlYCAgICAgICksXG4gICAgbWV0YSAgICA6ICBzdGF0ZS5jdXN0b21lcnMuZ2V0KGBtZXRhLmFjdGl2ZWAgKSxcbiAgfSksXG4gIGRpc3BhdGNoID0+ICggYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVQYWdlU29ydDogY3VzdG9tZXJzLmdldEFsbCxcbiAgfSwgZGlzcGF0Y2ggKSlcbikoIEN1c3RvbWVyTGlzdCApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgICAgICAgICBmcm9tICcuLi9kdWNrcy9jdXN0b21lcnMnXG5pbXBvcnQge1xuICBQYXBlclNoZWV0LFxuICBCZXR3ZWVuLFxuICBQYXJ0eSxcbiAgUGFydHlVc2VyLFxufSBmcm9tICcuLi9sYXlvdXQvcGFwZXItc2hlZXQnXG5pbXBvcnQgeyBNYWluLCBNZXRhLCBDb250ZW50IH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgTmF2U2Vjb25kYXJ5IGZyb20gJy4uL25hdi9zZWNvbmRhcnknXG5pbXBvcnQge1xuICBCdXR0b25MaXN0LFxuICBCdXR0b25TdWJtaXQsXG59IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCBDdXN0b21lckZvcm0sIHtcbiAgRk9STV9JRCxcbiAgRm9ybUNvbnRleHQsXG59IGZyb20gJy4vZm9ybSdcbmltcG9ydCBDdXN0b21lckZvcm1QcmVzIGZyb20gJy4vZm9ybS5wcmVzJ1xuXG5jb25zdCBUWVBFID0gYGN1c3RvbWVyc2BcblxuY29uc3QgTmV3Q3VzdG9tZXIgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgaW50bCB9ID0gcHJvcHNcbiAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBwYWdlLmN1c3RvbWVycy5uZXdgIH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPEJ1dHRvblN1Ym1pdFxuICAgICAgICAgIGZvcm1JZD17IEZPUk1fSUQgfVxuICAgICAgICAgIGlzU2F2aW5nPXsgcHJvcHMuaXNTYXZpbmcgfVxuICAgICAgICAgIGxhYmVsPVwiXy5jcmVhdGVcIlxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uTGlzdFxuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBsYWJlbD1cImN1c3RvbWVyLmJ1dHRvbi5saXN0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuXG4gICAgICA8Q3VzdG9tZXJGb3JtIHsuLi5wcm9wc30gPlxuICAgICAgICA8TWFpbiB3aXRoTWV0YT5cbiAgICAgICAgICA8TWV0YT5cbiAgICAgICAgICAgIDxGb3JtQ29udGV4dC5Db25zdW1lcj5cbiAgICAgICAgICAgICAgeyBjb250ZXh0ID0+IDxDdXN0b21lckZvcm1QcmVzIHsuLi5jb250ZXh0fSAvPn1cbiAgICAgICAgICAgIDwvRm9ybUNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgPC9NZXRhPlxuICAgICAgICAgIDxDb250ZW50PlxuICAgICAgICAgICAgPFBhcGVyU2hlZXQgcGFydD1cInRvcFwiPlxuICAgICAgICAgICAgICA8QmV0d2Vlbj5cbiAgICAgICAgICAgICAgICA8UGFydHlVc2VyIC8+XG4gICAgICAgICAgICAgICAgPEZvcm1Db250ZXh0LkNvbnN1bWVyPlxuICAgICAgICAgICAgICAgICAgeyBjb250ZXh0ID0+IDxQYXJ0eSB0aXRsZT1cInRvXCIgcGVvcGxlPXsgY29udGV4dC5mb3JtRGF0YSB9IC8+fVxuICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgICAgIDwvQmV0d2Vlbj5cbiAgICAgICAgICAgIDwvUGFwZXJTaGVldD5cbiAgICAgICAgICA8L0NvbnRlbnQ+XG4gICAgICAgIDwvTWFpbj5cbiAgICAgIDwvQ3VzdG9tZXJGb3JtPlxuXG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHtcbiAgICBpc1NhdmluZyA6IHN0YXRlLmN1c3RvbWVycy5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgICBjdXN0b21lciA6IHN0YXRlLmN1c3RvbWVycy5nZXQoIGBjdXJyZW50YCAgKSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogTmV3Q3VzdG9tZXIsXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gICAgY3VzdG9tZXJzLmdldE9uZVxuICBdLFxufSkgKVxuXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0ICAgc2VyaWFsaXplICAgICAgICAgICAgZnJvbSAnZm9ybS1zZXJpYWxpemUnXG5cbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgICAgZnJvbSAnLi4vZHVja3MvY3VzdG9tZXJzJ1xuaW1wb3J0ICogYXMgcmVkaXJlY3Rpb24gICBmcm9tICcuLi91dGlscy9jaGVjay1yZWRpcmVjdGlvbidcbmltcG9ydCAgICAgIFNwaW5uZXIgICAgICAgZnJvbSAnLi4vdWkvc3Bpbm5lcidcbmltcG9ydCB7ICAgIEZvcm0gICAgICAgIH0gZnJvbSAnLi4vdWkvZm9ybSdcblxuZXhwb3J0IGNvbnN0IEZPUk1fSUQgPSBgY3VzdG9tZXItZm9ybWBcblxuZXhwb3J0IGNvbnN0IEZvcm1Db250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7fSlcblxuY2xhc3MgQ3VzdG9tZXJGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZm9ybURhdGE6IHRoaXMucHJvcHMuY3VzdG9tZXIsXG4gICAgfVxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlRm9ybUNoYW5nZSA9IHRoaXMuaGFuZGxlRm9ybUNoYW5nZS5iaW5kKHRoaXMpXG4gIH1cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyggbmV4dFByb3BzLCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc3QgICBuZXh0ICAgICAgICAgICAgICAgID0gbmV4dFByb3BzLmN1c3RvbWVyXG4gICAgY29uc3QgICBjdXJyZW50ICAgICAgICAgICAgID0gcHJldlN0YXRlLmZvcm1EYXRhXG4gICAgY29uc3QgeyBpc1NhdmluZywgaGlzdG9yeSwgc3RhdGljQ29udGV4dCB9ID0gbmV4dFByb3BzXG4gICAgaWYgKCBpc1NhdmluZyApIHJldHVybiBudWxsXG4gICAgaWYgKCBjdXJyZW50ID09PSBuZXh0ICkgcmV0dXJuIG51bGxcblxuICAgIC8vIHJlZGlyZWN0c1xuICAgIGNvbnN0IHJlZGlyZWN0ID0gcmVkaXJlY3Rpb24uY3VzdG9tZXIoe1xuICAgICAgbmV4dCxcbiAgICAgIGN1cnJlbnQsXG4gICAgICBoaXN0b3J5LFxuICAgICAgc3RhdGljQ29udGV4dCxcbiAgICB9KVxuICAgIGlmICggcmVkaXJlY3QgKSByZXR1cm4gbnVsbFxuXG4gICAgcmV0dXJuIHsgZm9ybURhdGE6IG5leHQgfVxuICB9XG5cbiAgLy8tLS0tLSBFVkVOVFNcblxuICBoYW5kbGVTdWJtaXQoIGV2ZW50ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBib2R5ID0gc2VyaWFsaXplKCBldmVudC50YXJnZXQsIHsgaGFzaDogdHJ1ZSwgZW1wdHk6IHRydWUgfSApXG4gICAgdGhpcy5wcm9wcy5zYXZlT25lKHsgYm9keSB9KVxuICB9XG4gIGhhbmRsZUZvcm1DaGFuZ2UoIGV2ZW50ICkge1xuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudFxuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IHRhcmdldFxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVkID0gcHJldlN0YXRlLmZvcm1EYXRhLnNldChuYW1lLCB2YWx1ZSlcbiAgICAgIHJldHVybiB7IGZvcm1EYXRhOiB1cGRhdGVkIH1cbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLSBSRU5ERVJcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBmb3JtRGF0YSAgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCB7IGlzU2F2aW5nICB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgaXNMb2FkaW5nIH0gPSAgICAgIGZvcm1EYXRhXG4gICAgaWYgKCBpc0xvYWRpbmcgKSByZXR1cm4gPFNwaW5uZXIgLz5cblxuICAgIGNvbnN0IGZvcm1Qcm9wcyA9IHtcbiAgICAgIGZvcm1EYXRhLFxuICAgICAgaXNTYXZpbmcsXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxGb3JtXG4gICAgICAgIGlkPXsgYCR7Rk9STV9JRH1gIH1cbiAgICAgICAgaXNTYXZpbmc9eyBpc1NhdmluZyB9XG4gICAgICAgIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXQgfVxuICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlRm9ybUNoYW5nZSB9XG4gICAgICA+XG4gICAgICAgIHsgZm9ybURhdGEuaWQgJiYgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT17Zm9ybURhdGEuaWR9IG5hbWU9XCJpZFwiIC8+ICB9XG4gICAgICAgIHsvKiBQcm92aWRlIGEgY29udGV4dCBmb3IgY2hpbGRyZW4gdG8gYmUgYWJsZSB0byBhY2Nlc3MgZm9ybURhdGEgKi99XG4gICAgICAgIDxGb3JtQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17IGZvcm1Qcm9wcyB9PlxuICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICAgIDwvRm9ybUNvbnRleHQuUHJvdmlkZXI+XG4gICAgICA8L0Zvcm0+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoMnByb3BzKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgc2F2ZU9uZTogIGN1c3RvbWVycy5zYXZlT25lLFxuICB9LCBkaXNwYXRjaClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggbnVsbCwgZGlzcGF0Y2gycHJvcHMgKSggQ3VzdG9tZXJGb3JtIClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHsgSW5wdXQsIFRleHRhcmVhIH0gZnJvbSAnLi4vdWkvZmllbGQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEN1c3RvbWVyRm9ybVByZXMoIHByb3BzICkge1xuICBjb25zdCB7IGZvcm1EYXRhIH0gPSBwcm9wc1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjdXN0b21lci1maWVsZHNcIj5cbiAgICAgIDxJbnB1dFxuICAgICAgICBuYW1lPVwibmFtZVwiXG4gICAgICAgIGxhYmVsPVwiZmllbGQubmFtZVwiXG4gICAgICAgIHZhbHVlPXsgZm9ybURhdGEubmFtZSB9XG4gICAgICAvPlxuICAgICAgPFRleHRhcmVhXG4gICAgICAgIG5hbWU9XCJhZGRyZXNzXCJcbiAgICAgICAgbGFiZWw9XCJmaWVsZC5hZGRyZXNzXCJcbiAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5hZGRyZXNzIH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgICBmcm9tICcuLi9kdWNrcy9jdXN0b21lcnMnXG5pbXBvcnQgKiBhcyBxdW90YXRpb25zICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCAqIGFzIGludm9pY2VzICAgICBmcm9tICcuLi9kdWNrcy9pbnZvaWNlcydcbmltcG9ydCAqIGFzIFBhcGVyICAgICAgICBmcm9tICcuLi9sYXlvdXQvcGFwZXItc2hlZXQnXG5pbXBvcnQgICAgICBOYXZTZWNvbmRhcnkgZnJvbSAnLi4vbmF2L3NlY29uZGFyeSdcbmltcG9ydCB7XG4gIEJ1dHRvbk5ldyxcbiAgQnV0dG9uTGlzdCxcbiAgQnV0dG9uU3VibWl0LFxufSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5LWJ1dHRvbnMnXG5pbXBvcnQgKiBhcyBUYWJzIGZyb20gJy4uL3VpL3RhYnMnXG5pbXBvcnQge1xuICBBbW91bnQsXG4gIEZvcm1hdE51bWJlcixcbn0gZnJvbSAnLi4vdWkvZm9ybWF0J1xuaW1wb3J0IHsgUHJvZ3Jlc3MgfSBmcm9tICcuLi91aS9wcm9ncmVzcydcbmltcG9ydCB7IEN1c3RvbWVyUXVvdGF0aW9ucyB9IGZyb20gJy4uL3F1b3RhdGlvbnMvbGlzdCdcbmltcG9ydCB7IEN1c3RvbWVySW52b2ljZXMgICB9IGZyb20gJy4uL2ludm9pY2VzL2xpc3QnXG5pbXBvcnQgQ3VzdG9tZXJGb3JtLCB7XG4gIEZPUk1fSUQsXG4gIEZvcm1Db250ZXh0LFxufSBmcm9tICcuL2Zvcm0nXG5pbXBvcnQgICBDdXN0b21lckZvcm1QcmVzICAgZnJvbSAnLi9mb3JtLnByZXMnXG5pbXBvcnQgeyBDdXN0b21lckhlYWRlciAgIH0gZnJvbSAnLi9oZWFkZXInXG5cbmNvbnN0IFRZUEUgPSBgY3VzdG9tZXJzYFxuXG5mdW5jdGlvbiBFZGl0Q3VzdG9tZXIoIHByb3BzICkge1xuICBjb25zdCB7IGN1c3RvbWVyICAgfSA9ICAgcHJvcHNcbiAgY29uc3QgICBuYW1lICAgICAgICAgPSAgIGN1c3RvbWVyLmdldChgbmFtZWApXG4gIGNvbnN0ICAgdGl0bGVQcm9wcyAgID0geyBpZCA6YHBhZ2UuY3VzdG9tZXJzLmVkaXRgLCB2YWx1ZXM6IHtuYW1lfSB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25TdWJtaXRcbiAgICAgICAgICBmb3JtSWQ9e0ZPUk1fSUR9XG4gICAgICAgICAgaXNTYXZpbmc9eyBwcm9wcy5pc1NhdmluZyB9XG4gICAgICAgICAgbGFiZWw9XCJfLnNhdmVcIlxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uTGlzdFxuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBsYWJlbD1cImN1c3RvbWVyLmJ1dHRvbi5saXN0XCJcbiAgICAgICAgLz5cbiAgICAgICAgPEJ1dHRvbk5ld1xuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBpY29uXG4gICAgICAgICAgc2Vjb25kYXJ5XG4gICAgICAgICAgbGFiZWw9XCJjdXN0b21lci5idXR0b24ubmV3XCJcbiAgICAgICAgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuXG4gICAgICA8Q3VzdG9tZXJGb3JtIHsuLi5wcm9wc30gPlxuICAgICAgICA8VGFicy5XcmFwcGVyPlxuXG4gICAgICAgICAgPFRhYnMuTGlzdD5cbiAgICAgICAgICAgIDxUYWJzLkhlYWRlcj5cbiAgICAgICAgICAgICAgPEN1c3RvbWVySGVhZGVyIGN1c3RvbWVyPXsgY3VzdG9tZXIgfSAvPlxuICAgICAgICAgICAgPC9UYWJzLkhlYWRlcj5cbiAgICAgICAgICAgIDxUYWJzLlRhYj5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJfLnF1b3RhdGlvbnNcIiAvPlxuICAgICAgICAgICAgPC9UYWJzLlRhYj5cbiAgICAgICAgICAgIDxUYWJzLlRhYj5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJfLmludm9pY2VzXCIgLz5cbiAgICAgICAgICAgIDwvVGFicy5UYWI+XG4gICAgICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiY3VzdG9tZXIudGFiLmNvbmZpZ3VyYXRpb25cIiAvPlxuICAgICAgICAgICAgPC9UYWJzLlRhYj5cbiAgICAgICAgICA8L1RhYnMuTGlzdD5cbiAgICAgICAgICB7LyogUVVPVEFUSU9OUyAqL31cbiAgICAgICAgICA8VGFicy5QYW5lbD5cbiAgICAgICAgICAgIDxDdXN0b21lclF1b3RhdGlvbnMgLz5cbiAgICAgICAgICA8L1RhYnMuUGFuZWw+XG4gICAgICAgICAgey8qIElOVk9JQ0VTICovfVxuICAgICAgICAgIDxUYWJzLlBhbmVsPlxuICAgICAgICAgICAgPEN1c3RvbWVySW52b2ljZXMgLz5cbiAgICAgICAgICA8L1RhYnMuUGFuZWw+XG4gICAgICAgICAgey8qIENVU1RPTUVSIEZPUk0gKi99XG4gICAgICAgICAgPFRhYnMuUGFuZWw+XG4gICAgICAgICAgICA8Rm9ybUNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgICAgIHsgY29udGV4dCA9PiAoXG4gICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgPEN1c3RvbWVyRm9ybVByZXMgey4uLmNvbnRleHR9IC8+XG4gICAgICAgICAgICAgICAgICA8UGFwZXIuU2hlZXQgcGFydD1cInRvcFwiPlxuICAgICAgICAgICAgICAgICAgICA8UGFwZXIuQmV0d2Vlbj5cbiAgICAgICAgICAgICAgICAgICAgICA8UGFwZXIuVXNlciAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxQYXBlci5QYXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJ0b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBwZW9wbGU9eyBjb250ZXh0LmZvcm1EYXRhIH1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L1BhcGVyLkJldHdlZW4+XG4gICAgICAgICAgICAgICAgICA8L1BhcGVyLlNoZWV0PlxuICAgICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L0Zvcm1Db250ZXh0LkNvbnN1bWVyPlxuICAgICAgICAgIDwvVGFicy5QYW5lbD5cbiAgICAgICAgPC9UYWJzLldyYXBwZXI+XG4gICAgICA8L0N1c3RvbWVyRm9ybT5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3AoIHN0YXRlICkge1xuICByZXR1cm4ge1xuICAgIGlzU2F2aW5nICAgOiBzdGF0ZS5jdXN0b21lcnMgIC5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgICBjdXN0b21lciAgIDogc3RhdGUuY3VzdG9tZXJzICAuZ2V0KCBgY3VycmVudGAgICksXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcCApKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IEVkaXRDdXN0b21lcixcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBjdXN0b21lcnMuZ2V0T25lLFxuICAgIHF1b3RhdGlvbnMubGlzdEZvckN1c3RvbWVyLFxuICAgIGludm9pY2VzLmxpc3RGb3JDdXN0b21lcixcbiAgXSxcbn0pIClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0ICogYXMgRm9ybWF0ICBmcm9tICcuLi91aS9mb3JtYXQnXG5cbmltcG9ydCAqIGFzIEtleVByZXMgZnJvbSAnLi4vdWkva2V5LXByZXNlbnRhdGlvbidcbmltcG9ydCB7IFByb2dyZXNzIH0gZnJvbSAnLi4vdWkvcHJvZ3Jlc3MnXG5cbmV4cG9ydCBmdW5jdGlvbiBDdXN0b21lckhlYWRlciggcHJvcHMgKSB7XG4gIGNvbnN0IHsgY3VzdG9tZXIgfSA9IHByb3BzXG5cbiAgcmV0dXJuIChcbiAgICA8S2V5UHJlcy5XcmFwcGVyPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJjdXN0b21lci50b3RhbC5xdW90YXRpb25cIiAvPlxuICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgY3VzdG9tZXIuZ2V0KGBxdW90YXRpb25zVG90YWxgKSB9IC8+XG4gICAgICA8L0tleVByZXMuVmFsdWU+XG4gICAgICA8S2V5UHJlcy5MYWJlbCBpZD1cImN1c3RvbWVyLnRvdGFsLmludm9pY2VcIiAvPlxuICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgY3VzdG9tZXIuZ2V0KGBpbnZvaWNlc1RvdGFsYCkgfSAvPlxuICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJjdXN0b21lci50b3RhbC50by1iZS1wYWlkXCIgLz5cbiAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICA8Rm9ybWF0LkFtb3VudCB2YWx1ZT17IGN1c3RvbWVyLmdldChgaW52b2ljZXNUb3RhbExlZnRgKSB9IC8+XG4gICAgICA8L0tleVByZXMuVmFsdWU+XG4gICAgICA8S2V5UHJlcy5MYWJlbCBpZD1cImN1c3RvbWVyLnRvdGFsLnByb2dyZXNzXCIgLz5cbiAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICA8UHJvZ3Jlc3NcbiAgICAgICAgICB2YWx1ZT17IGN1c3RvbWVyLmdldChgaW52b2ljZXNUb3RhbFBhaWRgKSB9XG4gICAgICAgICAgbWF4PXsgY3VzdG9tZXIuZ2V0KGBpbnZvaWNlc1RvdGFsYCkgfVxuICAgICAgICAvPlxuICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgIDwvS2V5UHJlcy5XcmFwcGVyPlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUm91dGUgICAgICAgICAgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgIExheW91dEJvYXJkaW5nICAgZnJvbSAnLi9sYXlvdXQvYm9hcmRpbmcnXG5cbmNvbnN0IE5vdEZvdW5kID0gKCkgPT4gKFxuICAvLyB3ZSBuZWVkIGEgcm91dGUgdG8gaGF2ZSBhY2Nlc3MgdG8gc3RhdGljQ29udGV4dFxuICA8Um91dGUgcmVuZGVyPXsoeyBzdGF0aWNDb250ZXh0IH0pID0+IHtcbiAgICAvLyBzdGF0aWNDb250ZXh0IGlzIHNlcnZlciBvbmx5XG4gICAgLy8gcHV0IHNvbWUgaW5mb3MgaGVyZSBzbyB0aGUgc2VydmVyIGNhbiBrbm93IHRoaW5nc1xuICAgIGlmICggc3RhdGljQ29udGV4dCApIHtcbiAgICAgIHN0YXRpY0NvbnRleHQuc3RhdHVzID0gNDA0XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8TGF5b3V0Qm9hcmRpbmcgdGl0bGU9XCI0MDRcIj5cbiAgICAgICAgPGgyPm5vdCBmb3VuZDwvaDI+XG4gICAgICA8L0xheW91dEJvYXJkaW5nPlxuICAgIClcbiAgfX0vPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBOb3RGb3VuZFxuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5cbmltcG9ydCBjdXN0b21lcnMgZnJvbSAnLi9jdXN0b21lcnMnXG5pbXBvcnQgcXVvdGF0aW9ucyBmcm9tICcuL3F1b3RhdGlvbnMnXG5pbXBvcnQgaW52b2ljZXMgZnJvbSAnLi9pbnZvaWNlcydcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gJy4vbm90aWZpY2F0aW9ucydcbmltcG9ydCBhY2NvdW50LCB7IExPR09VVCwgQVVUSCB9IGZyb20gJy4vYWNjb3VudCdcblxuY29uc3QgYXBwUmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGN1c3RvbWVycyxcbiAgcXVvdGF0aW9ucyxcbiAgaW52b2ljZXMsXG4gIG5vdGlmaWNhdGlvbnMsXG4gIGFjY291bnQsXG59KVxuXG4vLyBtYWtlIGEgZ2xvYmFsIHJlZHVjZXJcbi8vIOKAoiB0aGlzIHdpbGwgYWxsb3cgdXMgdG8gbWFuaXB1bGF0ZSBhbGwgdGhlIHN0YXRlIGZvciBsb2dvdXRcbi8vICAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MjI1ODgvaG93LXRvLXJlc2V0LXRoZS1zdGF0ZS1vZi1hLXJlZHV4LXN0b3JlLzM1NjQxOTkyIzM1NjQxOTkyXG5jb25zdCByb290UmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gTE9HT1VULlNVQ0NFU1MpIHN0YXRlID0gdm9pZCAwXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQVVUSC5FUlJPUikgc3RhdGUgPSB2b2lkIDBcbiAgcmV0dXJuIGFwcFJlZHVjZXIoc3RhdGUsIGFjdGlvbilcbn1cblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXJcbiJdLCJzb3VyY2VSb290IjoiIn0=