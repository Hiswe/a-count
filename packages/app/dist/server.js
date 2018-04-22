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
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/config.js":
/*!**************************!*\
  !*** ./server/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rc = _interopRequireDefault(__webpack_require__(/*! rc */ "rc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = (0, _rc.default)(`concompte`, {
  API_URL: `http://localhost:4040/v1`,
  API_COOKIE_NAME: `concompte_api`,
  HOST_URL: `http://localhost:3000`,
  APP_NAME: `Concompte`
});
exports.default = config;
config.PORT = config.PORT || process.env.PORT || 3000;
config.NODE_ENV = config.NODE_ENV || "development" || `development`;
config.isDev = config.NODE_ENV === `development`;
config.isProd = config.NODE_ENV === `production`;

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _util = __webpack_require__(/*! util */ "util");

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "chalk"));

var _moment = _interopRequireDefault(__webpack_require__(/*! moment */ "moment"));

var _koa = _interopRequireDefault(__webpack_require__(/*! koa */ "koa"));

var _koaBody = _interopRequireDefault(__webpack_require__(/*! koa-body */ "koa-body"));

var _koaStatic = _interopRequireDefault(__webpack_require__(/*! koa-static */ "koa-static"));

var _koaCompress = _interopRequireDefault(__webpack_require__(/*! koa-compress */ "koa-compress"));

var _koaLogger = _interopRequireDefault(__webpack_require__(/*! koa-logger */ "koa-logger"));

var _koaJson = _interopRequireDefault(__webpack_require__(/*! koa-json */ "koa-json"));

var _koaRouter = _interopRequireDefault(__webpack_require__(/*! koa-router */ "koa-router"));

var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ "./server/config.js"));

var _log = _interopRequireDefault(__webpack_require__(/*! ./log */ "./server/log.js"));

var _routingApiBackup = _interopRequireDefault(__webpack_require__(/*! ./routing-api-backup */ "./server/routing-api-backup.js"));

var _routingKoaReact = _interopRequireDefault(__webpack_require__(/*! ./routing-koa-react */ "./server/routing-koa-react.js"));

var render = _interopRequireWildcard(__webpack_require__(/*! ./render */ "./server/render.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//////
// SERVER CONFIG
//////
const app = new _koa.default();
exports.default = app;
app.use((0, _koaBody.default)());
app.use((0, _koaCompress.default)());
app.use((0, _koaStatic.default)(_path.default.join(__dirname, `./public`))); // format json https://github.com/koajs/json

app.use((0, _koaJson.default)()); //----- LOGGING

app.use((0, _koaLogger.default)()); //////
// ROUTING
//////
//----- ERROR HANDLING

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
  (0, _log.default)(`Server is listening on port`, server.address().port);
}); //////
// EXPORTS
//////
/* WEBPACK VAR INJECTION */}.call(this, "server"))

/***/ }),

/***/ "./server/log.js":
/*!***********************!*\
  !*** ./server/log.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = __webpack_require__(/*! util */ "util");

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _util.debuglog)(`server`);
log(_chalk.default.green(`init logging`));
var _default = log;
exports.default = _default;

/***/ }),

/***/ "./server/render.js":
/*!**************************!*\
  !*** ./server/render.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactApp = reactApp;
exports.errorPage = errorPage;

var _fs = _interopRequireDefault(__webpack_require__(/*! fs */ "fs"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _serializeJavascript = _interopRequireDefault(__webpack_require__(/*! serialize-javascript */ "serialize-javascript"));

var _intl = _interopRequireDefault(__webpack_require__(/*! intl */ "intl"));

var _intlLocalesSupported = _interopRequireDefault(__webpack_require__(/*! intl-locales-supported */ "intl-locales-supported"));

var _config = _interopRequireDefault(__webpack_require__(/*! ./config.js */ "./server/config.js"));

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
  API_COOKIE_NAME: _config.default.API_COOKIE_NAME,
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
    <script src="/vendor.concompte.js"></script>
    <script src="/concompte.js"></script>
  </body>
</html>`;
}

function renderStackTrace(stacktrace) {
  if (!stacktrace) return ``;
  stacktrace = Array.isArray(stacktrace) ? stacktrace.join(`\n`) : stacktrace;
  return `<pre>${stacktrace}</pre>`;
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
      <hr />
      ${renderStackTrace(stacktrace)}
    </main>
  </body>
</html>`;
}
/* WEBPACK VAR INJECTION */}.call(this, "server"))

/***/ }),

/***/ "./server/routing-api-backup.js":
/*!**************************************!*\
  !*** ./server/routing-api-backup.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(__webpack_require__(/*! koa-router */ "koa-router"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isnil */ "lodash.isnil"));

var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ "./server/config.js"));

var isoFetch = _interopRequireWildcard(__webpack_require__(/*! ../shared/iso-fetch */ "./shared/iso-fetch.js"));

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
    ctx.cookies.set(_config.default.API_COOKIE_NAME, accessToken);
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

/***/ "./server/routing-koa-react.js":
/*!*************************************!*\
  !*** ./server/routing-koa-react.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "chalk"));

var _koaRouter = _interopRequireDefault(__webpack_require__(/*! koa-router */ "koa-router"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _server = __webpack_require__(/*! react-dom/server */ "react-dom/server");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactRouterConfig = __webpack_require__(/*! react-router-config */ "react-router-config");

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reduxThunk = _interopRequireDefault(__webpack_require__(/*! redux-thunk */ "redux-thunk"));

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _log = _interopRequireDefault(__webpack_require__(/*! ./log.js */ "./server/log.js"));

var render = _interopRequireWildcard(__webpack_require__(/*! ./render */ "./server/render.js"));

var _routes = _interopRequireDefault(__webpack_require__(/*! ../shared/routes.js */ "./shared/routes.js"));

var _combinedReducers = _interopRequireDefault(__webpack_require__(/*! ../shared/ducks/combined-reducers.js */ "./shared/ducks/combined-reducers.js"));

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
    url,
    header
  } = ctx; // wait for every component to fetch his data

  const store = (0, _redux.createStore)(_combinedReducers.default, {}, (0, _redux.applyMiddleware)(_reduxThunk.default, reduxActionLogger));
  const branch = (0, _reactRouterConfig.matchRoutes)(_routes.default, url);
  const initFetches = branch.filter(({
    route
  }) => route.component.fetchData instanceof Function).map(({
    route,
    match
  }) => {
    // Pass here the cookies
    // fetch will need it to maintain authentication
    return route.component.fetchData({
      dispatch: store.dispatch,
      params: match.params,
      cookie: header.cookie
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

/***/ "./shared/account/page-forgot.js":
/*!***************************************!*\
  !*** ./shared/account/page-forgot.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _formSerialize = _interopRequireDefault(__webpack_require__(/*! form-serialize */ "form-serialize"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _urlJoin = _interopRequireDefault(__webpack_require__(/*! url-join */ "url-join"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(/*! ../isomorphic-config */ "./shared/isomorphic-config-server.js"));

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var account = _interopRequireWildcard(__webpack_require__(/*! ../ducks/account */ "./shared/ducks/account.js"));

var _boarding = _interopRequireDefault(__webpack_require__(/*! ../layout/boarding */ "./shared/layout/boarding.js"));

var _form = _interopRequireDefault(__webpack_require__(/*! ../ui/form */ "./shared/ui/form.js"));

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _field = __webpack_require__(/*! ../ui/field */ "./shared/ui/field.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAIL_REDIRECT_URL = (0, _urlJoin.default)(_isomorphicConfig.default.HOST_URL, '/account/reset');

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

/***/ "./shared/account/page-login.js":
/*!**************************************!*\
  !*** ./shared/account/page-login.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _formSerialize = _interopRequireDefault(__webpack_require__(/*! form-serialize */ "form-serialize"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var account = _interopRequireWildcard(__webpack_require__(/*! ../ducks/account */ "./shared/ducks/account.js"));

var _boarding = _interopRequireDefault(__webpack_require__(/*! ../layout/boarding */ "./shared/layout/boarding.js"));

var _form = _interopRequireDefault(__webpack_require__(/*! ../ui/form */ "./shared/ui/form.js"));

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _field = __webpack_require__(/*! ../ui/field */ "./shared/ui/field.js");

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

/***/ "./shared/account/page-register.js":
/*!*****************************************!*\
  !*** ./shared/account/page-register.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _formSerialize = _interopRequireDefault(__webpack_require__(/*! form-serialize */ "form-serialize"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var account = _interopRequireWildcard(__webpack_require__(/*! ../ducks/account */ "./shared/ducks/account.js"));

var _boarding = _interopRequireDefault(__webpack_require__(/*! ../layout/boarding */ "./shared/layout/boarding.js"));

var _form = _interopRequireDefault(__webpack_require__(/*! ../ui/form */ "./shared/ui/form.js"));

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _field = __webpack_require__(/*! ../ui/field */ "./shared/ui/field.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    }, _react.default.createElement(_field.Input, {
      name: "email",
      label: "field.email",
      type: "email",
      defaultValue: ""
    }), _react.default.createElement(_field.Input, {
      name: "password",
      type: "password",
      label: "field.password",
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

/***/ "./shared/account/page-reset.js":
/*!**************************************!*\
  !*** ./shared/account/page-reset.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _formSerialize = _interopRequireDefault(__webpack_require__(/*! form-serialize */ "form-serialize"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _queryString = _interopRequireDefault(__webpack_require__(/*! query-string */ "query-string"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var account = _interopRequireWildcard(__webpack_require__(/*! ../ducks/account */ "./shared/ducks/account.js"));

var _boarding = _interopRequireDefault(__webpack_require__(/*! ../layout/boarding */ "./shared/layout/boarding.js"));

var _form = _interopRequireDefault(__webpack_require__(/*! ../ui/form */ "./shared/ui/form.js"));

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _field = __webpack_require__(/*! ../ui/field */ "./shared/ui/field.js");

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

/***/ "./shared/account/page-settings.js":
/*!*****************************************!*\
  !*** ./shared/account/page-settings.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _settings = _interopRequireWildcard(__webpack_require__(/*! ./settings */ "./shared/account/settings.js"));

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

/***/ "./shared/account/settings.js":
/*!************************************!*\
  !*** ./shared/account/settings.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FORM_ID = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _formSerialize = _interopRequireDefault(__webpack_require__(/*! form-serialize */ "form-serialize"));

var account = _interopRequireWildcard(__webpack_require__(/*! ../ducks/account */ "./shared/ducks/account.js"));

var _form = __webpack_require__(/*! ../ui/form */ "./shared/ui/form.js");

var _settings = _interopRequireDefault(__webpack_require__(/*! ./settings.pres */ "./shared/account/settings.pres.js"));

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

/***/ "./shared/account/settings.pres.js":
/*!*****************************************!*\
  !*** ./shared/account/settings.pres.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SettingFormPres;
exports.FORM_ID = exports.BASE_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var Intl = _interopRequireWildcard(__webpack_require__(/*! react-intl */ "react-intl"));

var compute = _interopRequireWildcard(__webpack_require__(/*! ../utils/compute-total */ "./shared/utils/compute-total.js"));

var Paper = _interopRequireWildcard(__webpack_require__(/*! ../layout/paper-sheet */ "./shared/layout/paper-sheet.js"));

var Tabs = _interopRequireWildcard(__webpack_require__(/*! ../ui/tabs */ "./shared/ui/tabs.js"));

var Field = _interopRequireWildcard(__webpack_require__(/*! ../ui/field */ "./shared/ui/field.js"));

var _alerts = __webpack_require__(/*! ../ui/alerts */ "./shared/ui/alerts.js");

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _form = __webpack_require__(/*! ../ui/form */ "./shared/ui/form.js");

var _products = __webpack_require__(/*! ../ui-table/products */ "./shared/ui-table/products.js");

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

/***/ "./shared/archive/page-invoice.js":
/*!****************************************!*\
  !*** ./shared/archive/page-invoice.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var _secondary = __webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js");

var NavButtons = _interopRequireWildcard(__webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js"));

var Main = _interopRequireWildcard(__webpack_require__(/*! ../layout/main */ "./shared/layout/main.js"));

var Tabs = _interopRequireWildcard(__webpack_require__(/*! ../ui/tabs */ "./shared/ui/tabs.js"));

var _progress = __webpack_require__(/*! ../ui/progress */ "./shared/ui/progress.js");

var _preview = __webpack_require__(/*! ../ui/preview */ "./shared/ui/preview.js");

var _header = __webpack_require__(/*! ../invoices/header */ "./shared/invoices/header.js");

var _eventsTable = __webpack_require__(/*! ../invoices/events-table */ "./shared/invoices/events-table.js");

var Events = _interopRequireWildcard(__webpack_require__(/*! ../invoices/events-read-only */ "./shared/invoices/events-read-only.js"));

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

/***/ "./shared/archive/page-list.js":
/*!*************************************!*\
  !*** ./shared/archive/page-list.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var _secondary = __webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js");

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _list = __webpack_require__(/*! ../quotations/list */ "./shared/quotations/list.js");

var _list2 = __webpack_require__(/*! ../invoices/list */ "./shared/invoices/list.js");

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

/***/ "./shared/archive/page-quotation.js":
/*!******************************************!*\
  !*** ./shared/archive/page-quotation.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var _secondary = __webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js");

var NavButtons = _interopRequireWildcard(__webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js"));

var LayoutMain = _interopRequireWildcard(__webpack_require__(/*! ../layout/main */ "./shared/layout/main.js"));

var _preview = __webpack_require__(/*! ../ui/preview */ "./shared/ui/preview.js");

var KeyPres = _interopRequireWildcard(__webpack_require__(/*! ../ui/key-presentation */ "./shared/ui/key-presentation.js"));

var Format = _interopRequireWildcard(__webpack_require__(/*! ../ui/format */ "./shared/ui/format.js"));

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

/***/ "./shared/authentication-forbidden.js":
/*!********************************************!*\
  !*** ./shared/authentication-forbidden.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationForbidden = authenticationForbidden;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

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

/***/ "./shared/authentication-required.js":
/*!*******************************************!*\
  !*** ./shared/authentication-required.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationRequired = authenticationRequired;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

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

/***/ "./shared/connect-data-fetcher.js":
/*!****************************************!*\
  !*** ./shared/connect-data-fetcher.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectDataFetchers;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var account = _interopRequireWildcard(__webpack_require__(/*! ./ducks/account */ "./shared/ducks/account.js"));

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
      cookie
    }) {
      return Promise.all(actionCreators.map(actionCreator => {
        return dispatch(actionCreator(params, cookie));
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

/***/ "./shared/customers/form.js":
/*!**********************************!*\
  !*** ./shared/customers/form.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormContext = exports.FORM_ID = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _formSerialize = _interopRequireDefault(__webpack_require__(/*! form-serialize */ "form-serialize"));

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var redirection = _interopRequireWildcard(__webpack_require__(/*! ../utils/check-redirection */ "./shared/utils/check-redirection.js"));

var _spinner = _interopRequireDefault(__webpack_require__(/*! ../ui/spinner */ "./shared/ui/spinner.js"));

var _form = __webpack_require__(/*! ../ui/form */ "./shared/ui/form.js");

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

/***/ "./shared/customers/form.pres.js":
/*!***************************************!*\
  !*** ./shared/customers/form.pres.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CustomerFormPres;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _field = __webpack_require__(/*! ../ui/field */ "./shared/ui/field.js");

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

/***/ "./shared/customers/header.js":
/*!************************************!*\
  !*** ./shared/customers/header.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerHeader = CustomerHeader;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var Format = _interopRequireWildcard(__webpack_require__(/*! ../ui/format */ "./shared/ui/format.js"));

var KeyPres = _interopRequireWildcard(__webpack_require__(/*! ../ui/key-presentation */ "./shared/ui/key-presentation.js"));

var _progress = __webpack_require__(/*! ../ui/progress */ "./shared/ui/progress.js");

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

/***/ "./shared/customers/list.js":
/*!**********************************!*\
  !*** ./shared/customers/list.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveCustomers = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _redux = __webpack_require__(/*! redux */ "redux");

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var _uiTable = __webpack_require__(/*! ../ui-table */ "./shared/ui-table/index.js");

var _format = __webpack_require__(/*! ../ui/format */ "./shared/ui/format.js");

var _progress = __webpack_require__(/*! ../ui/progress */ "./shared/ui/progress.js");

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

/***/ "./shared/customers/page-edit.js":
/*!***************************************!*\
  !*** ./shared/customers/page-edit.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var Paper = _interopRequireWildcard(__webpack_require__(/*! ../layout/paper-sheet */ "./shared/layout/paper-sheet.js"));

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var Tabs = _interopRequireWildcard(__webpack_require__(/*! ../ui/tabs */ "./shared/ui/tabs.js"));

var _format = __webpack_require__(/*! ../ui/format */ "./shared/ui/format.js");

var _progress = __webpack_require__(/*! ../ui/progress */ "./shared/ui/progress.js");

var _list = __webpack_require__(/*! ../quotations/list */ "./shared/quotations/list.js");

var _list2 = __webpack_require__(/*! ../invoices/list */ "./shared/invoices/list.js");

var _form = _interopRequireWildcard(__webpack_require__(/*! ./form */ "./shared/customers/form.js"));

var _form2 = _interopRequireDefault(__webpack_require__(/*! ./form.pres */ "./shared/customers/form.pres.js"));

var _header = __webpack_require__(/*! ./header */ "./shared/customers/header.js");

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

/***/ "./shared/customers/page-list.js":
/*!***************************************!*\
  !*** ./shared/customers/page-list.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _list = __webpack_require__(/*! ./list */ "./shared/customers/list.js");

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

/***/ "./shared/customers/page-new.js":
/*!**************************************!*\
  !*** ./shared/customers/page-new.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var _paperSheet = __webpack_require__(/*! ../layout/paper-sheet */ "./shared/layout/paper-sheet.js");

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _form = _interopRequireWildcard(__webpack_require__(/*! ./form */ "./shared/customers/form.js"));

var _form2 = _interopRequireDefault(__webpack_require__(/*! ./form.pres */ "./shared/customers/form.pres.js"));

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

/***/ "./shared/ducks/account.js":
/*!*********************************!*\
  !*** ./shared/ducks/account.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.updateSettings = exports.reset = exports.forgot = exports.register = exports.logout = exports.login = exports.statistics = exports.auth = exports.UPDATE = exports.REGISTER = exports.LOGOUT = exports.RESET = exports.FORGOT = exports.LOGIN = exports.STATISTICS = exports.AUTH = void 0;

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _createActionNames = _interopRequireDefault(__webpack_require__(/*! ./utils/create-action-names */ "./shared/ducks/utils/create-action-names.js"));

var _fetchDispatch = _interopRequireDefault(__webpack_require__(/*! ./utils/fetch-dispatch */ "./shared/ducks/utils/fetch-dispatch.js"));

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
    case REGISTER.SUCCESS:
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

/***/ "./shared/ducks/combined-reducers.js":
/*!*******************************************!*\
  !*** ./shared/ducks/combined-reducers.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = __webpack_require__(/*! redux */ "redux");

var _customers = _interopRequireDefault(__webpack_require__(/*! ./customers */ "./shared/ducks/customers.js"));

var _quotations = _interopRequireDefault(__webpack_require__(/*! ./quotations */ "./shared/ducks/quotations.js"));

var _invoices = _interopRequireDefault(__webpack_require__(/*! ./invoices */ "./shared/ducks/invoices.js"));

var _notifications = _interopRequireDefault(__webpack_require__(/*! ./notifications */ "./shared/ducks/notifications.js"));

var _account = _interopRequireWildcard(__webpack_require__(/*! ./account */ "./shared/ducks/account.js"));

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

/***/ }),

/***/ "./shared/ducks/customers.js":
/*!***********************************!*\
  !*** ./shared/ducks/customers.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.saveOne = exports.getOne = exports.getAll = exports.SAVE_ONE = exports.GET_ONE = exports.GET_ALL = void 0;

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isnil */ "lodash.isnil"));

var _createActionNames = _interopRequireDefault(__webpack_require__(/*! ./utils/create-action-names */ "./shared/ducks/utils/create-action-names.js"));

var _fetchDispatch = _interopRequireDefault(__webpack_require__(/*! ./utils/fetch-dispatch */ "./shared/ducks/utils/fetch-dispatch.js"));

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

/***/ "./shared/ducks/invoices.js":
/*!**********************************!*\
  !*** ./shared/ducks/invoices.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.archiveOne = exports.saveOne = exports.getOne = exports.listForCustomer = exports.listArchived = exports.listActive = exports.EMPTY = exports.ARCHIVE = exports.SAVE_ONE = exports.GET_ONE = exports.LIST_FOR_CUSTOMER = exports.LIST_ARCHIVED = exports.LIST_ACTIVE = void 0;

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isnil */ "lodash.isnil"));

var _createActionNames = _interopRequireDefault(__webpack_require__(/*! ./utils/create-action-names */ "./shared/ducks/utils/create-action-names.js"));

var _fetchDispatch = _interopRequireDefault(__webpack_require__(/*! ./utils/fetch-dispatch */ "./shared/ducks/utils/fetch-dispatch.js"));

var _quotations = __webpack_require__(/*! ./quotations */ "./shared/ducks/quotations.js");

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

/***/ "./shared/ducks/notifications.js":
/*!***************************************!*\
  !*** ./shared/ducks/notifications.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.removeOne = exports.ALL_POST = exports.REMOVE = void 0;

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _shortid = _interopRequireDefault(__webpack_require__(/*! shortid */ "shortid"));

var _createActionNames = _interopRequireDefault(__webpack_require__(/*! ./utils/create-action-names */ "./shared/ducks/utils/create-action-names.js"));

var _quotations = __webpack_require__(/*! ./quotations */ "./shared/ducks/quotations.js");

var _invoices = __webpack_require__(/*! ./invoices */ "./shared/ducks/invoices.js");

var _customers = __webpack_require__(/*! ./customers */ "./shared/ducks/customers.js");

var _account = __webpack_require__(/*! ./account */ "./shared/ducks/account.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const NAME = `notifications`;
const REMOVE = `@concompte/${NAME}/remove`;
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

    case _account.REGISTER.SUCCESS:
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

/***/ "./shared/ducks/quotations.js":
/*!************************************!*\
  !*** ./shared/ducks/quotations.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.createInvoice = exports.archiveOne = exports.saveOne = exports.getOne = exports.listForCustomer = exports.listReadyToInvoice = exports.listArchived = exports.listActive = exports.LOADING = exports.CREATE_INVOICE = exports.ARCHIVE_QUOTE = exports.SAVE_ONE = exports.GET_ONE = exports.LIST_FOR_CUSTOMER = exports.LIST_GET_READY_INVOICE = exports.LIST_ARCHIVED = exports.LIST_ACTIVE = void 0;

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isnil */ "lodash.isnil"));

var _createActionNames = _interopRequireDefault(__webpack_require__(/*! ./utils/create-action-names */ "./shared/ducks/utils/create-action-names.js"));

var _fetchDispatch = _interopRequireDefault(__webpack_require__(/*! ./utils/fetch-dispatch */ "./shared/ducks/utils/fetch-dispatch.js"));

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

/***/ "./shared/ducks/utils/create-action-names.js":
/*!***************************************************!*\
  !*** ./shared/ducks/utils/create-action-names.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createActionNames;

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const APP_PREFIX = `@concompte`;
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

/***/ "./shared/ducks/utils/fetch-dispatch.js":
/*!**********************************************!*\
  !*** ./shared/ducks/utils/fetch-dispatch.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchDispatch;

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.merge */ "lodash.merge"));

var isoFetch = _interopRequireWildcard(__webpack_require__(/*! ../../iso-fetch */ "./shared/iso-fetch.js"));

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

/***/ "./shared/error-boundary.js":
/*!**********************************!*\
  !*** ./shared/error-boundary.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _boarding = _interopRequireDefault(__webpack_require__(/*! ./layout/boarding */ "./shared/layout/boarding.js"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class ErrorBoundary extends _react.PureComponent {
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
    if (this.state.errorInfo) {
      // Error path
      return _react.default.createElement(_boarding.default, {
        title: _react.default.createElement(_reactIntl.FormattedMessage, {
          id: "page.error"
        })
      }, _react.default.createElement("div", {
        style: {
          whiteSpace: 'pre-wrap'
        }
      }, this.state.error && this.state.error.toString(), _react.default.createElement("br", null), this.state.errorInfo.componentStack));
    } // Normally, just render children


    return this.props.children;
  }

}

exports.default = ErrorBoundary;

/***/ }),

/***/ "./shared/home/charts.js":
/*!*******************************!*\
  !*** ./shared/home/charts.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeCharts = HomeCharts;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _pieChart = __webpack_require__(/*! ../ui/pie-chart */ "./shared/ui/pie-chart.js");

var _format = __webpack_require__(/*! ../ui/format */ "./shared/ui/format.js");

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

/***/ "./shared/home/page-home.js":
/*!**********************************!*\
  !*** ./shared/home/page-home.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var account = _interopRequireWildcard(__webpack_require__(/*! ../ducks/account */ "./shared/ducks/account.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var _secondary = __webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js");

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _list = __webpack_require__(/*! ../invoices/list */ "./shared/invoices/list.js");

var _list2 = __webpack_require__(/*! ../quotations/list */ "./shared/quotations/list.js");

var _charts = __webpack_require__(/*! ./charts */ "./shared/home/charts.js");

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

/***/ "./shared/invoices/buttons.js":
/*!************************************!*\
  !*** ./shared/invoices/buttons.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchiveInvoice = exports.ShowQuotation = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

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

/***/ "./shared/invoices/events-editable.js":
/*!********************************************!*\
  !*** ./shared/invoices/events-editable.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sent = InvoiceEventSentEditable;
exports.Payment = InvoiceEventPaymentEditable;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var Table = _interopRequireWildcard(__webpack_require__(/*! ../ui-table */ "./shared/ui-table/index.js"));

var _datePicker = __webpack_require__(/*! ../ui/date-picker */ "./shared/ui/date-picker.js");

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

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

/***/ "./shared/invoices/events-read-only.js":
/*!*********************************************!*\
  !*** ./shared/invoices/events-read-only.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sent = InvoiceEventSentRead;
exports.Payment = InvoiceEventPaymentRead;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var Table = _interopRequireWildcard(__webpack_require__(/*! ../ui-table */ "./shared/ui-table/index.js"));

var Format = _interopRequireWildcard(__webpack_require__(/*! ../ui/format */ "./shared/ui/format.js"));

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

/***/ "./shared/invoices/events-table.js":
/*!*****************************************!*\
  !*** ./shared/invoices/events-table.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvoiceEvents = InvoiceEvents;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _uiTable = __webpack_require__(/*! ../ui-table */ "./shared/ui-table/index.js");

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _datePicker = __webpack_require__(/*! ../ui/date-picker */ "./shared/ui/date-picker.js");

var _format = __webpack_require__(/*! ../ui/format */ "./shared/ui/format.js");

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

/***/ "./shared/invoices/form.js":
/*!*********************************!*\
  !*** ./shared/invoices/form.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FORM_ID = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.flow */ "lodash.flow"));

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _shortid = _interopRequireDefault(__webpack_require__(/*! shortid */ "shortid"));

var _formSerialize = _interopRequireDefault(__webpack_require__(/*! form-serialize */ "form-serialize"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var redirection = _interopRequireWildcard(__webpack_require__(/*! ../utils/check-redirection */ "./shared/utils/check-redirection.js"));

var _form = __webpack_require__(/*! ../ui/form */ "./shared/ui/form.js");

var _spinner = __webpack_require__(/*! ../ui/spinner */ "./shared/ui/spinner.js");

var _form2 = _interopRequireDefault(__webpack_require__(/*! ./form.pres */ "./shared/invoices/form.pres.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      target
    } = event;
    const {
      name,
      value
    } = target;
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

Object.defineProperty(InvoiceForm, "updatePayments", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: (0, _lodash.default)(updatePayments, updatePaymentsFieldPath, recomputeTotals)
});
Object.defineProperty(InvoiceForm, "removeLine", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: (0, _lodash.default)(removeLine, updatePaymentsFieldPath, recomputeTotals)
});

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

/***/ "./shared/invoices/form.pres.js":
/*!**************************************!*\
  !*** ./shared/invoices/form.pres.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InvoiceFormPres;
exports.BASE_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _form = __webpack_require__(/*! ../ui/form */ "./shared/ui/form.js");

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _progress = __webpack_require__(/*! ../ui/progress */ "./shared/ui/progress.js");

var _preview = __webpack_require__(/*! ../ui/preview */ "./shared/ui/preview.js");

var Tabs = _interopRequireWildcard(__webpack_require__(/*! ../ui/tabs */ "./shared/ui/tabs.js"));

var _buttons2 = __webpack_require__(/*! ./buttons */ "./shared/invoices/buttons.js");

var _header = __webpack_require__(/*! ./header */ "./shared/invoices/header.js");

var _eventsTable = __webpack_require__(/*! ./events-table */ "./shared/invoices/events-table.js");

var EventsEditable = _interopRequireWildcard(__webpack_require__(/*! ./events-editable */ "./shared/invoices/events-editable.js"));

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

/***/ "./shared/invoices/header.js":
/*!***********************************!*\
  !*** ./shared/invoices/header.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvoiceHeader = InvoiceHeader;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var Format = _interopRequireWildcard(__webpack_require__(/*! ../ui/format */ "./shared/ui/format.js"));

var KeyPres = _interopRequireWildcard(__webpack_require__(/*! ../ui/key-presentation */ "./shared/ui/key-presentation.js"));

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

/***/ "./shared/invoices/list.js":
/*!*********************************!*\
  !*** ./shared/invoices/list.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomerInvoices = exports.ArchivedInvoices = exports.ActiveInvoices = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _redux = __webpack_require__(/*! redux */ "redux");

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var _uiTable = __webpack_require__(/*! ../ui-table */ "./shared/ui-table/index.js");

var _format = __webpack_require__(/*! ../ui/format */ "./shared/ui/format.js");

var _progress = __webpack_require__(/*! ../ui/progress */ "./shared/ui/progress.js");

var _buttons = __webpack_require__(/*! ./buttons */ "./shared/invoices/buttons.js");

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

/***/ "./shared/invoices/page-edit.js":
/*!**************************************!*\
  !*** ./shared/invoices/page-edit.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _form = _interopRequireWildcard(__webpack_require__(/*! ./form */ "./shared/invoices/form.js"));

var _buttons = __webpack_require__(/*! ./buttons */ "./shared/invoices/buttons.js");

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

/***/ "./shared/invoices/page-list.js":
/*!**************************************!*\
  !*** ./shared/invoices/page-list.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _secondary = __webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js");

var _list = __webpack_require__(/*! ../quotations/list */ "./shared/quotations/list.js");

var _list2 = __webpack_require__(/*! ./list */ "./shared/invoices/list.js");

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

/***/ "./shared/invoices/page-preview.js":
/*!*****************************************!*\
  !*** ./shared/invoices/page-preview.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var invoices = _interopRequireWildcard(__webpack_require__(/*! ../ducks/invoices */ "./shared/ducks/invoices.js"));

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _preview = __webpack_require__(/*! ../ui/preview */ "./shared/ui/preview.js");

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

/***/ "./shared/iso-fetch.js":
/*!*****************************!*\
  !*** ./shared/iso-fetch.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = exports.get = void 0;

__webpack_require__(/*! isomorphic-fetch */ "isomorphic-fetch");

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.merge */ "lodash.merge"));

var _lodash2 = _interopRequireDefault(__webpack_require__(/*! lodash.isnil */ "lodash.isnil"));

var _urlJoin = _interopRequireDefault(__webpack_require__(/*! url-join */ "url-join"));

var _jsCookie = _interopRequireDefault(__webpack_require__(/*! js-cookie */ "js-cookie"));

var _queryString = _interopRequireDefault(__webpack_require__(/*! query-string */ "query-string"));

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(/*! ./isomorphic-config */ "./shared/isomorphic-config-server.js"));

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

  return async function (options, cookie) {
    const {
      url,
      body,
      query
    } = options; // set body on post

    if (method === `post`) fetchOptions.body = JSON.stringify(body); // force cookie if server side

    if (cookie) fetchOptions.headers.Cookie = cookie; // Build fetch url
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
          _jsCookie.default.set(_isomorphicConfig.default.API_COOKIE_NAME, accessToken);

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

/***/ "./shared/isomorphic-config-server.js":
/*!********************************************!*\
  !*** ./shared/isomorphic-config-server.js ***!
  \********************************************/
/*! no static exports found */
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

var _config = _interopRequireDefault(__webpack_require__(/*! ../server/config */ "./server/config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./shared/layout/boarding.js":
/*!***********************************!*\
  !*** ./shared/layout/boarding.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LayoutBoarding;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

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

/***/ "./shared/layout/main.js":
/*!*******************************!*\
  !*** ./shared/layout/main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.Main = Main;
exports.Meta = Meta;
exports.Content = Content;
exports.ContentActions = ContentActions;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

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

/***/ "./shared/layout/paper-sheet.js":
/*!**************************************!*\
  !*** ./shared/layout/paper-sheet.js ***!
  \**************************************/
/*! no static exports found */
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

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _format = __webpack_require__(/*! ../ui/format */ "./shared/ui/format.js");

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

/***/ "./shared/layout/root.js":
/*!*******************************!*\
  !*** ./shared/layout/root.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterConfig = __webpack_require__(/*! react-router-config */ "react-router-config");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _isomorphicConfig = _interopRequireDefault(__webpack_require__(/*! ../isomorphic-config */ "./shared/isomorphic-config-server.js"));

var locales = _interopRequireWildcard(__webpack_require__(/*! ../locales */ "./shared/locales/index.js"));

var _errorBoundary = _interopRequireDefault(__webpack_require__(/*! ../error-boundary */ "./shared/error-boundary.js"));

var _main = _interopRequireDefault(__webpack_require__(/*! ../nav/main */ "./shared/nav/main.js"));

var _list = _interopRequireDefault(__webpack_require__(/*! ../notifications/list */ "./shared/notifications/list.js"));

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
      href: "/concompte.css"
    }), _react.default.createElement("link", {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png"
    })), _react.default.createElement("h1", {
      className: "main-logo"
    }, "Concompte"), _react.default.createElement(_main.default, null), _react.default.createElement(_errorBoundary.default, null, (0, _reactRouterConfig.renderRoutes)(route.routes)), _react.default.createElement(_list.default, null)));
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

/***/ "./shared/locales/en.js":
/*!******************************!*\
  !*** ./shared/locales/en.js ***!
  \******************************/
/*! no static exports found */
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
  'account.register.title': `Sign up`,
  'account.register.button': `create and account`,
  'account.forgot.title': `Forgotten password?`,
  'account.forgot.notice': `After submitting, you will receive by email a reset link`,
  'account.forgot.button': `Send the link`,
  'account.reset.title': `Password reset`,
  'account.reset.notice': `Please set your new password`,
  'account.reset.button': `Reset`,
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

/***/ "./shared/locales/fr.js":
/*!******************************!*\
  !*** ./shared/locales/fr.js ***!
  \******************************/
/*! no static exports found */
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
  'account.forgot.title': `Mot de passe oublié ?`,
  'account.forgot.notice': `Après avoir validé, vous recevrez par email un lien de réinitialisation`,
  'account.forgot.button': `Envoyer le lien`,
  'account.reset.title': `Réinitialisation du mot de passe`,
  'account.reset.notice': `Veuillez rentrer votre nouveau mot de passe`,
  'account.reset.button': `Réinitialiser`,
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

/***/ "./shared/locales/index.js":
/*!*********************************!*\
  !*** ./shared/locales/index.js ***!
  \*********************************/
/*! no static exports found */
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

var _en = _interopRequireDefault(__webpack_require__(/*! ./en */ "./shared/locales/en.js"));

var _fr = _interopRequireDefault(__webpack_require__(/*! ./fr */ "./shared/locales/fr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./shared/nav/main.js":
/*!****************************!*\
  !*** ./shared/nav/main.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var account = _interopRequireWildcard(__webpack_require__(/*! ../ducks/account */ "./shared/ducks/account.js"));

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

/***/ "./shared/nav/secondary-buttons.js":
/*!*****************************************!*\
  !*** ./shared/nav/secondary-buttons.js ***!
  \*****************************************/
/*! no static exports found */
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

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

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

/***/ "./shared/nav/secondary.js":
/*!*********************************!*\
  !*** ./shared/nav/secondary.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavSecondary = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

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

/***/ "./shared/notifications/item.js":
/*!**************************************!*\
  !*** ./shared/notifications/item.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

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

/***/ "./shared/notifications/list.js":
/*!**************************************!*\
  !*** ./shared/notifications/list.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _item = _interopRequireDefault(__webpack_require__(/*! ./item */ "./shared/notifications/item.js"));

var notifications = _interopRequireWildcard(__webpack_require__(/*! ../ducks/notifications */ "./shared/ducks/notifications.js"));

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

/***/ "./shared/page-not-found.js":
/*!**********************************!*\
  !*** ./shared/page-not-found.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _boarding = _interopRequireDefault(__webpack_require__(/*! ./layout/boarding */ "./shared/layout/boarding.js"));

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

/***/ "./shared/quotations/buttons.js":
/*!**************************************!*\
  !*** ./shared/quotations/buttons.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArchiveQuotation = exports.CreateInvoice = exports.ShowInvoice = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

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

/***/ "./shared/quotations/form.js":
/*!***********************************!*\
  !*** ./shared/quotations/form.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _formSerialize = _interopRequireDefault(__webpack_require__(/*! form-serialize */ "form-serialize"));

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.flow */ "lodash.flow"));

var _shortid = _interopRequireDefault(__webpack_require__(/*! shortid */ "shortid"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var compute = _interopRequireWildcard(__webpack_require__(/*! ../utils/compute-total */ "./shared/utils/compute-total.js"));

var redirection = _interopRequireWildcard(__webpack_require__(/*! ../utils/check-redirection */ "./shared/utils/check-redirection.js"));

var _filterArrayWithObject = __webpack_require__(/*! ../utils/filter-array-with-object */ "./shared/utils/filter-array-with-object.js");

var _spinner = __webpack_require__(/*! ../ui/spinner */ "./shared/ui/spinner.js");

var _form = __webpack_require__(/*! ./form.pres */ "./shared/quotations/form.pres.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      target
    } = event;
    const {
      name,
      checked,
      type
    } = target;
    const value = type === `checkbox` ? checked : target.value;
    this.setState((prevState, props) => {
      const type = typeof prevState.formData.get(name);
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

Object.defineProperty(QuotationForm, "recomputeSteps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: recomputeSteps
});
Object.defineProperty(QuotationForm, "recomputeProducts", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: (0, _lodash.default)(removeDefaultProducts, recomputeTotals, addEmptyLine, ensureProductId)
});
Object.defineProperty(QuotationForm, "recomputeFormData", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: (0, _lodash.default)(QuotationForm.recomputeSteps, QuotationForm.recomputeProducts)
});

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

/***/ "./shared/quotations/form.pres.js":
/*!****************************************!*\
  !*** ./shared/quotations/form.pres.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuotationFormPres = QuotationFormPres;
exports.FORM_ID = exports.BASE_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _paperSheet = __webpack_require__(/*! ../layout/paper-sheet */ "./shared/layout/paper-sheet.js");

var _form = __webpack_require__(/*! ../ui/form */ "./shared/ui/form.js");

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _field = __webpack_require__(/*! ../ui/field */ "./shared/ui/field.js");

var _stepper = __webpack_require__(/*! ../ui/stepper */ "./shared/ui/stepper.js");

var _svgIcons = _interopRequireDefault(__webpack_require__(/*! ../ui/svg-icons */ "./shared/ui/svg-icons.js"));

var _products = __webpack_require__(/*! ../ui-table/products */ "./shared/ui-table/products.js");

var _buttons2 = __webpack_require__(/*! ./buttons */ "./shared/quotations/buttons.js");

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

/***/ "./shared/quotations/list.js":
/*!***********************************!*\
  !*** ./shared/quotations/list.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CustomerQuotations = exports.QuotationsReadyToInvoice = exports.ArchivedQuotations = exports.ActiveQuotations = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var _uiTable = __webpack_require__(/*! ../ui-table */ "./shared/ui-table/index.js");

var _format = __webpack_require__(/*! ../ui/format */ "./shared/ui/format.js");

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var _buttons2 = __webpack_require__(/*! ./buttons */ "./shared/quotations/buttons.js");

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

/***/ "./shared/quotations/page-edit.js":
/*!****************************************!*\
  !*** ./shared/quotations/page-edit.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _form = _interopRequireDefault(__webpack_require__(/*! ./form */ "./shared/quotations/form.js"));

var _form2 = __webpack_require__(/*! ./form.pres */ "./shared/quotations/form.pres.js");

var _buttons = __webpack_require__(/*! ./buttons */ "./shared/quotations/buttons.js");

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

/***/ "./shared/quotations/page-list.js":
/*!****************************************!*\
  !*** ./shared/quotations/page-list.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _secondary = __webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js");

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _list = __webpack_require__(/*! ./list */ "./shared/quotations/list.js");

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

/***/ "./shared/quotations/page-new.js":
/*!***************************************!*\
  !*** ./shared/quotations/page-new.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var customers = _interopRequireWildcard(__webpack_require__(/*! ../ducks/customers */ "./shared/ducks/customers.js"));

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _form = _interopRequireDefault(__webpack_require__(/*! ./form */ "./shared/quotations/form.js"));

var _form2 = __webpack_require__(/*! ./form.pres */ "./shared/quotations/form.pres.js");

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

/***/ "./shared/quotations/page-preview.js":
/*!*******************************************!*\
  !*** ./shared/quotations/page-preview.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactHelmet = __webpack_require__(/*! react-helmet */ "react-helmet");

var _connectDataFetcher = _interopRequireDefault(__webpack_require__(/*! ../connect-data-fetcher */ "./shared/connect-data-fetcher.js"));

var quotations = _interopRequireWildcard(__webpack_require__(/*! ../ducks/quotations */ "./shared/ducks/quotations.js"));

var _main = __webpack_require__(/*! ../layout/main */ "./shared/layout/main.js");

var _secondary = _interopRequireDefault(__webpack_require__(/*! ../nav/secondary */ "./shared/nav/secondary.js"));

var _secondaryButtons = __webpack_require__(/*! ../nav/secondary-buttons */ "./shared/nav/secondary-buttons.js");

var _alerts = __webpack_require__(/*! ../ui/alerts */ "./shared/ui/alerts.js");

var _preview = __webpack_require__(/*! ../ui/preview */ "./shared/ui/preview.js");

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

/***/ "./shared/routes.js":
/*!**************************!*\
  !*** ./shared/routes.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authenticationRequired = _interopRequireDefault(__webpack_require__(/*! ./authentication-required */ "./shared/authentication-required.js"));

var _authenticationForbidden = _interopRequireDefault(__webpack_require__(/*! ./authentication-forbidden */ "./shared/authentication-forbidden.js"));

var _root = _interopRequireDefault(__webpack_require__(/*! ./layout/root */ "./shared/layout/root.js"));

var _pageLogin = _interopRequireDefault(__webpack_require__(/*! ./account/page-login */ "./shared/account/page-login.js"));

var _pageRegister = _interopRequireDefault(__webpack_require__(/*! ./account/page-register */ "./shared/account/page-register.js"));

var _pageForgot = _interopRequireDefault(__webpack_require__(/*! ./account/page-forgot */ "./shared/account/page-forgot.js"));

var _pageReset = _interopRequireDefault(__webpack_require__(/*! ./account/page-reset */ "./shared/account/page-reset.js"));

var _pageSettings = _interopRequireDefault(__webpack_require__(/*! ./account/page-settings */ "./shared/account/page-settings.js"));

var _pageHome = _interopRequireDefault(__webpack_require__(/*! ./home/page-home */ "./shared/home/page-home.js"));

var _pageList = _interopRequireDefault(__webpack_require__(/*! ./archive/page-list */ "./shared/archive/page-list.js"));

var _pageQuotation = _interopRequireDefault(__webpack_require__(/*! ./archive/page-quotation */ "./shared/archive/page-quotation.js"));

var _pageInvoice = _interopRequireDefault(__webpack_require__(/*! ./archive/page-invoice */ "./shared/archive/page-invoice.js"));

var _pageList2 = _interopRequireDefault(__webpack_require__(/*! ./quotations/page-list */ "./shared/quotations/page-list.js"));

var _pageNew = _interopRequireDefault(__webpack_require__(/*! ./quotations/page-new */ "./shared/quotations/page-new.js"));

var _pageEdit = _interopRequireDefault(__webpack_require__(/*! ./quotations/page-edit */ "./shared/quotations/page-edit.js"));

var _pagePreview = _interopRequireDefault(__webpack_require__(/*! ./quotations/page-preview */ "./shared/quotations/page-preview.js"));

var _pageList3 = _interopRequireDefault(__webpack_require__(/*! ./invoices/page-list */ "./shared/invoices/page-list.js"));

var _pageEdit2 = _interopRequireDefault(__webpack_require__(/*! ./invoices/page-edit */ "./shared/invoices/page-edit.js"));

var _pagePreview2 = _interopRequireDefault(__webpack_require__(/*! ./invoices/page-preview */ "./shared/invoices/page-preview.js"));

var _pageList4 = _interopRequireDefault(__webpack_require__(/*! ./customers/page-list */ "./shared/customers/page-list.js"));

var _pageNew2 = _interopRequireDefault(__webpack_require__(/*! ./customers/page-new */ "./shared/customers/page-new.js"));

var _pageEdit3 = _interopRequireDefault(__webpack_require__(/*! ./customers/page-edit */ "./shared/customers/page-edit.js"));

var _pageNotFound = _interopRequireDefault(__webpack_require__(/*! ./page-not-found */ "./shared/page-not-found.js"));

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

/***/ "./shared/ui-table/header.js":
/*!***********************************!*\
  !*** ./shared/ui-table/header.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thead = Thead;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _svgIcons = __webpack_require__(/*! ../ui/svg-icons */ "./shared/ui/svg-icons.js");

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

/***/ "./shared/ui-table/index.js":
/*!**********************************!*\
  !*** ./shared/ui-table/index.js ***!
  \**********************************/
/*! no static exports found */
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

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _pagination = __webpack_require__(/*! ./pagination */ "./shared/ui-table/pagination.js");

var _header = __webpack_require__(/*! ./header */ "./shared/ui-table/header.js");

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
Object.defineProperty(PaginatedTable, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    hideColumns: []
  }
});
Object.defineProperty(PaginatedTable, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    columns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
    hideColumns: _propTypes.default.arrayOf(_propTypes.default.string),
    hideOnEmpty: _propTypes.default.bool,
    meta: _propTypes.default.object,
    handlePageSort: _propTypes.default.func,
    footer: _propTypes.default.element
  }
});
const Table = (0, _reactRouterDom.withRouter)(PaginatedTable);
exports.Wrapper = exports.Table = Table;
var _default = Table;
exports.default = _default;

/***/ }),

/***/ "./shared/ui-table/pagination.js":
/*!***************************************!*\
  !*** ./shared/ui-table/pagination.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = Pagination;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _svgIcons = __webpack_require__(/*! ../ui/svg-icons */ "./shared/ui/svg-icons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BASE_CLASS = `table__pagination`;
const ACTION_CLASS = `${BASE_CLASS}_action`;

function Pagination(props) {
  const {
    meta,
    handlePrev,
    handleNext
  } = props;
  if (!meta.total) return null;
  const PREV_CLASS = (0, _classnames.default)(ACTION_CLASS, `${ACTION_CLASS}--prev`, meta.previousPage ? false : `${ACTION_CLASS}--disabled`);
  const NEXT_CLASS = (0, _classnames.default)(ACTION_CLASS, `${ACTION_CLASS}--next`, meta.nextPage ? false : `${ACTION_CLASS}--disabled`);
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
    values: meta
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

/***/ "./shared/ui-table/products.js":
/*!*************************************!*\
  !*** ./shared/ui-table/products.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductLineEditable = ProductLineEditable;
exports.ProductLineDisplay = ProductLineDisplay;
exports.ProductTable = ProductTable;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var compute = _interopRequireWildcard(__webpack_require__(/*! ../utils/compute-total */ "./shared/utils/compute-total.js"));

var Format = _interopRequireWildcard(__webpack_require__(/*! ../ui/format */ "./shared/ui/format.js"));

var _field = __webpack_require__(/*! ../ui/field */ "./shared/ui/field.js");

var _textareaAutoResize = __webpack_require__(/*! ../ui/textarea-auto-resize */ "./shared/ui/textarea-auto-resize.js");

var _buttons = __webpack_require__(/*! ../ui/buttons */ "./shared/ui/buttons.js");

var Table = _interopRequireWildcard(__webpack_require__(/*! ./index */ "./shared/ui-table/index.js"));

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

/***/ "./shared/ui/alerts.js":
/*!*****************************!*\
  !*** ./shared/ui/alerts.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = Alert;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

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

/***/ "./shared/ui/buttons.js":
/*!******************************!*\
  !*** ./shared/ui/buttons.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = Button;
exports.BtnIcon = BtnIcon;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

var _svgIcons = _interopRequireDefault(__webpack_require__(/*! ./svg-icons */ "./shared/ui/svg-icons.js"));

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

/***/ "./shared/ui/date-picker.js":
/*!**********************************!*\
  !*** ./shared/ui/date-picker.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = DatePicker;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _moment = _interopRequireDefault(__webpack_require__(/*! moment */ "moment"));

var _DayPickerInput = _interopRequireDefault(__webpack_require__(/*! react-day-picker/DayPickerInput */ "react-day-picker/DayPickerInput"));

var _moment2 = _interopRequireWildcard(__webpack_require__(/*! react-day-picker/moment */ "react-day-picker/moment"));

__webpack_require__(/*! moment/locale/en-gb */ "moment/locale/en-gb");

__webpack_require__(/*! moment/locale/fr */ "moment/locale/fr");

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

/***/ "./shared/ui/field.js":
/*!****************************!*\
  !*** ./shared/ui/field.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idToClassName = idToClassName;
exports.CheckBox = CheckBox;
exports.Select = exports.Textarea = exports.Input = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isnil */ "lodash.isnil"));

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _svgIcons = __webpack_require__(/*! ./svg-icons */ "./shared/ui/svg-icons.js");

var _textareaAutoResize = __webpack_require__(/*! ./textarea-auto-resize */ "./shared/ui/textarea-auto-resize.js");

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

/***/ "./shared/ui/form.js":
/*!***************************!*\
  !*** ./shared/ui/form.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = Form;
exports.FormActions = FormActions;
exports.default = exports.BASE_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

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

/***/ "./shared/ui/format.js":
/*!*****************************!*\
  !*** ./shared/ui/format.js ***!
  \*****************************/
/*! no static exports found */
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

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _marked = _interopRequireDefault(__webpack_require__(/*! marked */ "marked"));

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

/***/ "./shared/ui/key-presentation.js":
/*!***************************************!*\
  !*** ./shared/ui/key-presentation.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.PresByKey = PresByKey;
exports.Label = exports.KeyLabel = KeyLabel;
exports.Value = exports.KeyValue = KeyValue;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

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

/***/ "./shared/ui/pie-chart.js":
/*!********************************!*\
  !*** ./shared/ui/pie-chart.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieChartDefs = PieChartDefs;
exports.PieChart = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.round */ "lodash.round"));

var _format = __webpack_require__(/*! ./format */ "./shared/ui/format.js");

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
      total: 0,
      slices: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const slices = nextProps.slices.filter(slice => {
      return Number.isFinite(slice.value);
    });
    const total = slices.reduce(computeTotal, 0);
    if (total === prevState.total) return null;
    return {
      total,
      slices: slices.map(slice => _objectSpread({}, slice, {
        percent: (0, _lodash.default)(slice.value / total, 4)
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
      const [startX, startY] = PieChart.getCoordinates(cumulativePercent); // each slice starts where the last slice ended, so keep a cumulative percent

      cumulativePercent = cumulativePercent + slice.percent;
      const [endX, endY] = PieChart.getCoordinates(cumulativePercent); // if the slice is more than 50%, take the large arc (the long way around)

      const largeArcFlag = slice.percent > .5 ? 1 : 0;
      const pathData = [`M ${startX} ${startY}`, `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`].join(` `);
      return _react.default.createElement("path", {
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

/***/ "./shared/ui/preview.js":
/*!******************************!*\
  !*** ./shared/ui/preview.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preview = Preview;
exports.PrintingNotice = PrintingNotice;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _paperSheet = __webpack_require__(/*! ../layout/paper-sheet */ "./shared/layout/paper-sheet.js");

var _alerts = __webpack_require__(/*! ./alerts */ "./shared/ui/alerts.js");

var _products = __webpack_require__(/*! ../ui-table/products */ "./shared/ui-table/products.js");

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

/***/ "./shared/ui/progress.js":
/*!*******************************!*\
  !*** ./shared/ui/progress.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = Progress;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _format = __webpack_require__(/*! ./format */ "./shared/ui/format.js");

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

/***/ "./shared/ui/spinner.js":
/*!******************************!*\
  !*** ./shared/ui/spinner.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Spinner = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

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

/***/ "./shared/ui/stepper.js":
/*!******************************!*\
  !*** ./shared/ui/stepper.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = Step;
exports.Stepper = exports.RADIO_CLASS = exports.CHECKED_CLASS = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _reactIntl = __webpack_require__(/*! react-intl */ "react-intl");

var _datePicker = __webpack_require__(/*! ../ui/date-picker */ "./shared/ui/date-picker.js");

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
    const _props = this.props,
          {
      steps
    } = _props,
          otherProps = _objectWithoutProperties(_props, ["steps"]);

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

/***/ "./shared/ui/svg-icons.js":
/*!********************************!*\
  !*** ./shared/ui/svg-icons.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = Icon;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

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

/***/ "./shared/ui/tabs.js":
/*!***************************!*\
  !*** ./shared/ui/tabs.js ***!
  \***************************/
/*! no static exports found */
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

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

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

/***/ "./shared/ui/textarea-auto-resize.js":
/*!*******************************************!*\
  !*** ./shared/ui/textarea-auto-resize.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TextareaAutoResize = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "classnames"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var Intl = _interopRequireWildcard(__webpack_require__(/*! react-intl */ "react-intl"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

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
    const _props = this.props,
          {
      className,
      placeholder,
      onChange
    } = _props,
          rest = _objectWithoutProperties(_props, ["className", "placeholder", "onChange"]);

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
Object.defineProperty(TextareaAutoResize, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    placeHolder: _propTypes.default.string
  }
});
var _default = TextareaAutoResize;
exports.default = _default;

/***/ }),

/***/ "./shared/utils/check-redirection.js":
/*!*******************************************!*\
  !*** ./shared/utils/check-redirection.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customer = exports.invoice = exports.quotation = exports.isArchived = exports.isNewInvoice = exports.isNewCustomer = exports.isNewQuotation = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isnil */ "lodash.isnil"));

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

/***/ "./shared/utils/compute-total.js":
/*!***************************************!*\
  !*** ./shared/utils/compute-total.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundToNearestQuarter = roundToNearestQuarter;
exports.enforceNumber = enforceNumber;
exports.productTotal = productTotal;
exports.totals = totals;

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

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

/***/ "./shared/utils/filter-array-with-object.js":
/*!**************************************************!*\
  !*** ./shared/utils/filter-array-with-object.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.filterArrayWithObject = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.merge */ "lodash.merge"));

var _crio = _interopRequireDefault(__webpack_require__(/*! crio */ "crio"));

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

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "crio":
/*!***********************!*\
  !*** external "crio" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crio");

/***/ }),

/***/ "form-serialize":
/*!*********************************!*\
  !*** external "form-serialize" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("form-serialize");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "intl":
/*!***********************!*\
  !*** external "intl" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("intl");

/***/ }),

/***/ "intl-locales-supported":
/*!*****************************************!*\
  !*** external "intl-locales-supported" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("intl-locales-supported");

/***/ }),

/***/ "isomorphic-fetch":
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "js-cookie":
/*!****************************!*\
  !*** external "js-cookie" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),

/***/ "koa-compress":
/*!*******************************!*\
  !*** external "koa-compress" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-compress");

/***/ }),

/***/ "koa-json":
/*!***************************!*\
  !*** external "koa-json" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-json");

/***/ }),

/***/ "koa-logger":
/*!*****************************!*\
  !*** external "koa-logger" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-logger");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ "lodash.flow":
/*!******************************!*\
  !*** external "lodash.flow" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.flow");

/***/ }),

/***/ "lodash.isnil":
/*!*******************************!*\
  !*** external "lodash.isnil" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.isnil");

/***/ }),

/***/ "lodash.merge":
/*!*******************************!*\
  !*** external "lodash.merge" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.merge");

/***/ }),

/***/ "lodash.round":
/*!*******************************!*\
  !*** external "lodash.round" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.round");

/***/ }),

/***/ "marked":
/*!*************************!*\
  !*** external "marked" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "moment/locale/en-gb":
/*!**************************************!*\
  !*** external "moment/locale/en-gb" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment/locale/en-gb");

/***/ }),

/***/ "moment/locale/fr":
/*!***********************************!*\
  !*** external "moment/locale/fr" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment/locale/fr");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),

/***/ "rc":
/*!*********************!*\
  !*** external "rc" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rc");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-day-picker/DayPickerInput":
/*!**************************************************!*\
  !*** external "react-day-picker/DayPickerInput" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-day-picker/DayPickerInput");

/***/ }),

/***/ "react-day-picker/moment":
/*!******************************************!*\
  !*** external "react-day-picker/moment" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-day-picker/moment");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),

/***/ "react-intl":
/*!*****************************!*\
  !*** external "react-intl" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-config":
/*!**************************************!*\
  !*** external "react-router-config" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "shortid":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),

/***/ "url-join":
/*!***************************!*\
  !*** external "url-join" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url-join");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL2xvZy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci9yb3V0aW5nLWFwaS1iYWNrdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmVyL3JvdXRpbmcta29hLXJlYWN0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hY2NvdW50L3BhZ2UtZm9yZ290LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hY2NvdW50L3BhZ2UtbG9naW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2FjY291bnQvcGFnZS1yZWdpc3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvYWNjb3VudC9wYWdlLXJlc2V0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hY2NvdW50L3BhZ2Utc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2FjY291bnQvc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2FjY291bnQvc2V0dGluZ3MucHJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvYXJjaGl2ZS9wYWdlLWludm9pY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2FyY2hpdmUvcGFnZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hcmNoaXZlL3BhZ2UtcXVvdGF0aW9uLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9hdXRoZW50aWNhdGlvbi1mb3JiaWRkZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2F1dGhlbnRpY2F0aW9uLXJlcXVpcmVkLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9jb25uZWN0LWRhdGEtZmV0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvY3VzdG9tZXJzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2N1c3RvbWVycy9mb3JtLnByZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2N1c3RvbWVycy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2N1c3RvbWVycy9saXN0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9jdXN0b21lcnMvcGFnZS1lZGl0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9jdXN0b21lcnMvcGFnZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9jdXN0b21lcnMvcGFnZS1uZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2R1Y2tzL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2R1Y2tzL2NvbWJpbmVkLXJlZHVjZXJzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy9jdXN0b21lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2R1Y2tzL2ludm9pY2VzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy9ub3RpZmljYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy9xdW90YXRpb25zLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy91dGlscy9jcmVhdGUtYWN0aW9uLW5hbWVzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9kdWNrcy91dGlscy9mZXRjaC1kaXNwYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvZXJyb3ItYm91bmRhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2hvbWUvY2hhcnRzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9ob21lL3BhZ2UtaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvaW52b2ljZXMvYnV0dG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvaW52b2ljZXMvZXZlbnRzLWVkaXRhYmxlLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pbnZvaWNlcy9ldmVudHMtcmVhZC1vbmx5LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pbnZvaWNlcy9ldmVudHMtdGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2ludm9pY2VzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2ludm9pY2VzL2Zvcm0ucHJlcy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvaW52b2ljZXMvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pbnZvaWNlcy9saXN0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pbnZvaWNlcy9wYWdlLWVkaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2ludm9pY2VzL3BhZ2UtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvaW52b2ljZXMvcGFnZS1wcmV2aWV3LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9pc28tZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL2lzb21vcnBoaWMtY29uZmlnLXNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbGF5b3V0L2JvYXJkaW5nLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9sYXlvdXQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbGF5b3V0L3BhcGVyLXNoZWV0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9sYXlvdXQvcm9vdC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbG9jYWxlcy9lbi5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbG9jYWxlcy9mci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbG9jYWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbmF2L21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL25hdi9zZWNvbmRhcnktYnV0dG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbmF2L3NlY29uZGFyeS5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvbm90aWZpY2F0aW9ucy9pdGVtLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9ub3RpZmljYXRpb25zL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3BhZ2Utbm90LWZvdW5kLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9xdW90YXRpb25zL2J1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3F1b3RhdGlvbnMvZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvcXVvdGF0aW9ucy9mb3JtLnByZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3F1b3RhdGlvbnMvbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvcXVvdGF0aW9ucy9wYWdlLWVkaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3F1b3RhdGlvbnMvcGFnZS1saXN0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9xdW90YXRpb25zL3BhZ2UtbmV3LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9xdW90YXRpb25zL3BhZ2UtcHJldmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvcm91dGVzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS10YWJsZS9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpLXRhYmxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS10YWJsZS9wYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS10YWJsZS9wcm9kdWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvYWxlcnRzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS9idXR0b25zLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS9kYXRlLXBpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvZmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3VpL2Zvcm1hdC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkva2V5LXByZXNlbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvcGllLWNoYXJ0LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS9wcmV2aWV3LmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS9wcm9ncmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvc3RlcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdWkvc3ZnLWljb25zLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS90YWJzLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC91aS90ZXh0YXJlYS1hdXRvLXJlc2l6ZS5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvdXRpbHMvY2hlY2stcmVkaXJlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3V0aWxzL2NvbXB1dGUtdG90YWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL3V0aWxzL2ZpbHRlci1hcnJheS13aXRoLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGFsa1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzbmFtZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcmlvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZm9ybS1zZXJpYWxpemVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImludGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJpbnRsLWxvY2FsZXMtc3VwcG9ydGVkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaXNvbW9ycGhpYy1mZXRjaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzLWNvb2tpZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImtvYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImtvYS1ib2R5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia29hLWNvbXByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia29hLWpzb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJrb2EtbG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwia29hLXJvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImtvYS1zdGF0aWNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2Rhc2guZmxvd1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaC5pc25pbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaC5tZXJnZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaC5yb3VuZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1hcmtlZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbWVudC9sb2NhbGUvZW4tZ2JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb21lbnQvbG9jYWxlL2ZyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInByb3AtdHlwZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJxdWVyeS1zdHJpbmdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyY1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZGF5LXBpY2tlci9EYXlQaWNrZXJJbnB1dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRheS1waWNrZXIvbW9tZW50XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVhY3QtZG9tL3NlcnZlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWludGxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1jb25maWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcmlhbGl6ZS1qYXZhc2NyaXB0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2hvcnRpZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybC1qb2luXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIl0sIm5hbWVzIjpbImNvbmZpZyIsIkFQSV9VUkwiLCJBUElfQ09PS0lFX05BTUUiLCJIT1NUX1VSTCIsIkFQUF9OQU1FIiwiUE9SVCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImlzRGV2IiwiaXNQcm9kIiwiYXBwIiwiS29hIiwidXNlIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJjdHgiLCJuZXh0IiwiZXJyIiwiY29uc29sZSIsImxvZyIsImNvbG9ycyIsInN0YXR1cyIsInN0YXR1c0NvZGUiLCJib2R5IiwicmVuZGVyIiwiZXJyb3JQYWdlIiwicmVhc29uIiwibWVzc2FnZSIsInN0YWNrdHJhY2UiLCJzdGFjayIsInJvdXRlciIsIlJvdXRlciIsImFwaUJhY2t1cFJvdXRlcyIsInJvdXRlcyIsInJlYWN0Um91dGVzIiwic2VydmVyIiwibGlzdGVuIiwiZW5kSW5pdCIsImFkZHJlc3MiLCJwb3J0IiwiY2hhbGsiLCJncmVlbiIsIkludGwiLCJOdW1iZXJGb3JtYXQiLCJJbnRsUG9seWZpbGwiLCJEYXRlVGltZUZvcm1hdCIsIkNMSUVOVF9DT05GSUciLCJpc0pTT04iLCJTVkdfSUNPTlNfUEFUSCIsIlNWR19JQ09OUyIsImZzIiwicmVhZEZpbGVTeW5jIiwicmVhY3RBcHAiLCJzdG9yZSIsImNvbnRlbnQiLCJoZWxtZXQiLCJJTklUSUFMX1NUQVRFIiwiZ2V0U3RhdGUiLCJodG1sQXR0cmlidXRlcyIsInRvU3RyaW5nIiwidGl0bGUiLCJtZXRhIiwibGluayIsImJvZHlBdHRyaWJ1dGVzIiwicmVuZGVyU3RhY2tUcmFjZSIsIkFycmF5IiwiaXNBcnJheSIsInByb3h5UmVxdWVzdCIsInVybCIsImhlYWRlciIsInJlcXVlc3QiLCJmZXRjaE9wdGlvbnMiLCJtZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInJlc3BvbnNlIiwicGF5bG9hZCIsImlzb0ZldGNoIiwiY29va2llIiwib2siLCJzdGF0dXNUZXh0IiwiYWNjZXNzVG9rZW4iLCJhY2Nlc3NfdG9rZW4iLCJjb29raWVzIiwic2V0Iiwic3RhdGUiLCJnZXQiLCJyZWRpcmVjdCIsInBvc3QiLCJpZCIsInBhcmFtcyIsInJlZHV4QWN0aW9uTG9nZ2VyIiwiYWN0aW9uIiwidHlwZSIsInJldHVyblZhbHVlIiwiaGFzRXJyb3IiLCJlcnJvciIsImNvbG9yIiwicmVkIiwicmVkdWNlciIsInRodW5rIiwiYnJhbmNoIiwiaW5pdEZldGNoZXMiLCJmaWx0ZXIiLCJyb3V0ZSIsImNvbXBvbmVudCIsImZldGNoRGF0YSIsIkZ1bmN0aW9uIiwibWFwIiwibWF0Y2giLCJkaXNwYXRjaCIsIlByb21pc2UiLCJhbGwiLCJzdGF0aWNDb250ZXh0IiwiSGVsbWV0IiwicmVuZGVyU3RhdGljIiwiTUFJTF9SRURJUkVDVF9VUkwiLCJGb3Jnb3QiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiaGFuZGxlU3VibWl0IiwiYmluZCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJoYXNoIiwiZm9yZ290IiwidGl0bGVQcm9wcyIsImRpc3BhdGNoMnByb3AiLCJhY2NvdW50IiwiQ29tcG9uZW50IiwiYWN0aW9uQ3JlYXRvcnMiLCJMb2dpbiIsImxvZ2luIiwiUmVnaXN0ZXIiLCJyZWdpc3RlciIsIlJlc2V0IiwidG9rZW4iLCJxdWVyeVN0cmluZyIsInBhcnNlIiwibG9jYXRpb24iLCJzZWFyY2giLCJyZXNldCIsIkVkaXRQcm9maWxlIiwiRk9STV9JRCIsImlzU2F2aW5nIiwic3RhdGUycHJvcCIsIlNldHRpbmdGb3JtIiwiZm9ybURhdGEiLCJ1c2VyIiwiaGFuZGxlRm9ybUNoYW5nZSIsImdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyIsIm5leHRQcm9wcyIsInByZXZTdGF0ZSIsImVtcHR5IiwidXBkYXRlU2V0dGluZ3MiLCJuYW1lIiwidmFsdWUiLCJzZXRTdGF0ZSIsInVwZGF0ZWQiLCJyZW5kZXJQcm9wcyIsInN0YXRlMnByb3BzIiwiZGlzcGF0Y2gycHJvcHMiLCJCQVNFX0NMQVNTIiwiY3VzdG9tZXJFeGFtcGxlIiwiY3VycmVuY2llcyIsImxhYmVsIiwibGFuZ3VhZ2VzIiwiU2V0dGluZ0Zvcm1QcmVzIiwicXVvdGF0aW9uQ29uZmlnIiwiaW52b2ljZUNvbmZpZyIsInByb2R1Y3RDb25maWciLCJmYWtlUXVvdGF0aW9uUmVmZXJlbmNlIiwicHJvZHVjdCIsInVwZGF0ZWRBdCIsIkRhdGUiLCJ0b1VUQ1N0cmluZyIsInJlZmVyZW5jZSIsInByZWZpeCIsInN0YXJ0QXQiLCJmYWtlSW52b2ljZVJlZmVyZW5jZSIsImZha2VEb2N1bWVudCIsInByb2R1Y3RzIiwiY2hlY2tlZCIsImRlc2NyaXB0aW9uIiwicXVhbnRpdHkiLCJwcmljZSIsInRheCIsIm1lcmdlIiwiY29tcHV0ZSIsInRvdGFscyIsImxhbmciLCJjdXJyZW5jeSIsIm1lbnRpb25zIiwiU2hvd0FyY2hpdmVkSW52b2ljZSIsImludm9pY2UiLCJwYXltZW50cyIsInBheW1lbnQiLCJpbmRleCIsIl9pZCIsImludm9pY2VzIiwiZ2V0T25lIiwiQXJjaGl2ZWRMaXN0IiwicXVvdGF0aW9ucyIsImxpc3RBcmNoaXZlZCIsIlNob3dBcmNoaXZlZFF1b3RhdGlvbiIsInF1b3RhdGlvbiIsIlBSSVZBVEVfUk9PVCIsImF1dGhlbnRpY2F0aW9uRm9yYmlkZGVuIiwiQXV0aEZvcmJpZGRlbiIsImlzQXV0aGVudGljYXRlZCIsIlBVQkxJQ19ST09UIiwiYXV0aGVudGljYXRpb25SZXF1aXJlZCIsIkF1dGhSZXF1aXJlZCIsIklTX0ZJUlNUX01PVU5UX0FGVEVSX0xPQUQiLCJjb25uZWN0RGF0YUZldGNoZXJzIiwidW5zaGlmdCIsImF1dGgiLCJEYXRhRmV0Y2hlcnNXcmFwcGVyIiwicXVlcnkiLCJhY3Rpb25DcmVhdG9yIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwicHJldkxvY2F0aW9uIiwiaXNVcmxDaGFuZ2VkIiwicGF0aG5hbWUiLCJfZmV0Y2hEYXRhT25DbGllbnQiLCJjb21wb25lbnREaWRNb3VudCIsIkZvcm1Db250ZXh0IiwiY3JlYXRlQ29udGV4dCIsIkN1c3RvbWVyRm9ybSIsImN1c3RvbWVyIiwiY3VycmVudCIsImhpc3RvcnkiLCJyZWRpcmVjdGlvbiIsInNhdmVPbmUiLCJpc0xvYWRpbmciLCJmb3JtUHJvcHMiLCJjaGlsZHJlbiIsImN1c3RvbWVycyIsIkN1c3RvbWVyRm9ybVByZXMiLCJDdXN0b21lckhlYWRlciIsIkN1c3RvbWVyUm93IiwicXVvdGF0aW9uc0NvdW50IiwicXVvdGF0aW9uc1RvdGFsIiwiaW52b2ljZXNDb3VudCIsImN1c3RvbWVyQ29sdW1ucyIsInNvcnQiLCJDdXN0b21lckxpc3QiLCJyZXN0IiwiQWN0aXZlQ3VzdG9tZXJzIiwiaGFuZGxlUGFnZVNvcnQiLCJnZXRBbGwiLCJUWVBFIiwiRWRpdEN1c3RvbWVyIiwidmFsdWVzIiwiY29udGV4dCIsImxpc3RGb3JDdXN0b21lciIsIkN1c3RvbWVycyIsIk5ld0N1c3RvbWVyIiwiaW50bCIsIk5BTUUiLCJBVVRIIiwiU1RBVElTVElDUyIsIkxPR0lOIiwiRk9SR09UIiwiUkVTRVQiLCJMT0dPVVQiLCJSRUdJU1RFUiIsIlVQREFURSIsImluaXRpYWxTdGF0ZSIsInN0YXRpc3RpY3MiLCJTVUNDRVNTIiwiRVJST1IiLCJMT0FESU5HIiwiRE9ORSIsIm9wdGlvbnMiLCJhY3Rpb25zIiwiZmV0Y2giLCJsb2dvdXQiLCJhcHBSZWR1Y2VyIiwibm90aWZpY2F0aW9ucyIsInJvb3RSZWR1Y2VyIiwiR0VUX0FMTCIsIkdFVF9PTkUiLCJTQVZFX09ORSIsImFjdGl2ZSIsInJvd3MiLCJpc05ldyIsInVybElkIiwiTElTVF9BQ1RJVkUiLCJMSVNUX0FSQ0hJVkVEIiwiTElTVF9GT1JfQ1VTVE9NRVIiLCJBUkNISVZFIiwiRU1QVFkiLCJhcmNoaXZlZCIsInJlbW92ZUlkIiwibGlzdEFjdGl2ZSIsImFyY2hpdmVPbmUiLCJSRU1PVkUiLCJBTExfUE9TVCIsInBvc3RTdWNjZXNzUmVnZXhwIiwiUmVnRXhwIiwicG9zdEVycm9yUmVnZXhwIiwibm90aWZ5U3VjY2VzcyIsImkxOG5JZCIsInB1c2giLCJub3RpZnlFcnJvciIsInRlc3QiLCJpbmRleE9mIiwic3BsaWNlIiwiQUNDT1VOVF9SRUdJU1RFUiIsIkFDQ09VTlRfTE9HSU4iLCJBQ0NPVU5UX1JFU0VUIiwiZW1haWwiLCJBQ0NPVU5UX0ZPUkdPVCIsIlFVT1RBVElPTl9TQVZFX09ORSIsIlFVT1RBVElPTl9DUkVBVEVfSU5WT0lDRSIsIklOVk9JQ0VfU0FWRV9PTkUiLCJDVVNUT01FUl9TQVZFX09ORSIsImFkZGl0aW9uYWxDb250ZW50IiwicmVtb3ZlT25lIiwiTElTVF9HRVRfUkVBRFlfSU5WT0lDRSIsIkFSQ0hJVkVfUVVPVEUiLCJDUkVBVEVfSU5WT0lDRSIsInJlYWR5VG9JbnZvaWNlIiwiZmluZEluZGV4IiwicXVvdCIsImxpc3RSZWFkeVRvSW52b2ljZSIsImNyZWF0ZUludm9pY2UiLCJBUFBfUFJFRklYIiwicHJlZml4ZXMiLCJsb2FkaW5nIiwiZG9uZSIsInN1Y2Nlc3MiLCJjcmVhdGVBY3Rpb25OYW1lcyIsImRvbWFpbiIsIl9tZXRob2QiLCJmZXRjaERpc3BhdGNoIiwiX2ZldGNoRGlzcGF0Y2hFcnJvclR5cGUiLCJFcnJvckJvdW5kYXJ5IiwiZXJyb3JJbmZvIiwiY29tcG9uZW50RGlkQ2F0Y2giLCJ3aGl0ZVNwYWNlIiwiY29tcG9uZW50U3RhY2siLCJIb21lQ2hhcnRzIiwic3R5bGUiLCJmb250U2l6ZSIsImludm9pY2VzVG90YWxMZWZ0IiwiaW52b2ljZXNUb3RhbFBhaWQiLCJpbnZvaWNlc1RvdGFsIiwiSG9tZSIsInF1b3RhdGlvbnNSZWFkeVRvSW52b2ljZSIsIkJ1dHRvblNob3dRdW90YXRpb24iLCJxdW90YXRpb25JZCIsIlNob3dRdW90YXRpb24iLCJCdXR0b25BcmNoaXZlSW52b2ljZSIsImljb24iLCJvdGhlcnMiLCJhcmNoaXZlZEF0IiwiYnRuUHJvcHMiLCJvbkNsaWNrIiwiZm9ybU1ldGhvZCIsImZvcm1BY3Rpb24iLCJkaXNhYmxlZCIsIkFyY2hpdmVJbnZvaWNlIiwiSW52b2ljZUV2ZW50U2VudEVkaXRhYmxlIiwiaGFuZGxlIiwiZGF5Q2hhbmdlIiwiSW52b2ljZUV2ZW50UGF5bWVudEVkaXRhYmxlIiwibm90TGFzdCIsIl9maWVsZFBhdGgiLCJlIiwicmVtb3ZlUGF5bWVudCIsIkludm9pY2VFdmVudFNlbnRSZWFkIiwiSW52b2ljZUV2ZW50UGF5bWVudFJlYWQiLCJjb3VudCIsImV2ZW50c0NvbHVtbnMiLCJJbnZvaWNlRXZlbnRzRm9vdGVyIiwiaGlkZUNvbHVtbnMiLCJJbnZvaWNlRXZlbnRzIiwidXBkYXRlUGF5bWVudHMiLCJjcmlvIiwidXBkYXRlZFBheW1lbnRzIiwiZGF0ZSIsImFtb3VudCIsInJlbW92ZUxpbmUiLCJyZWNvbXB1dGVUb3RhbHMiLCJ0b3RhbCIsInBhaWQiLCJyZWR1Y2UiLCJhY2MiLCJwYXJzZUZsb2F0IiwibGVmdCIsInVwZGF0ZVBheW1lbnRzRmllbGRQYXRoIiwiSW52b2ljZUZvcm0iLCJoYW5kbGVEYXlDaGFuZ2UiLCJoYW5kbGVSZW1vdmVQYXltZW50IiwiaXNQYXltZW50RmllbGROYW1lIiwiaW5wdXROYW1lIiwic2F2ZSIsImlzUGF5bWVudENoYW5nZSIsIkludm9pY2VGb3JtUHJlcyIsImxlbmd0aCIsIkludm9pY2VIZWFkZXIiLCJJbnZvaWNlUm93IiwiaXNBcmNoaXZlZCIsImludm9pY2VVcmwiLCJjdXN0b21lcklkIiwiaW52b2ljZUNvbHVtbnMiLCJJbnZvaWNlTGlzdCIsIkFjdGl2ZUludm9pY2VzIiwiQXJjaGl2ZWRJbnZvaWNlcyIsIkN1c3RvbWVySW52b2ljZXMiLCJFZGl0SW52b2ljZSIsIkludm9pY2VzIiwiUHJldmlld0ludm9pY2VQYWdlIiwiZGVmYXVsdE9wdGlvbnMiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJjcmVhdGUiLCJ0b1VwcGVyQ2FzZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJDb29raWUiLCJmZXRjaFVybCIsImpzb24iLCJCUk9XU0VSIiwiQ29va2llcyIsIkxheW91dEJvYXJkaW5nIiwiTWFpbiIsIndpdGhNZXRhIiwiQ09NUF9DTEFTUyIsIkNoaWxkcmVuIiwiTWV0YSIsIkNvbnRlbnQiLCJDb250ZW50QWN0aW9ucyIsIlBhcGVyU2hlZXQiLCJwYXJ0IiwicHJldmlldyIsImNsYXNzTmFtZSIsIlJlZmVyZW5jZSIsIlJFRl9DTEFTUyIsIkJldHdlZW4iLCJQYXJ0eSIsInBlb3BsZSIsIlBBUlRZX0NMQVNTIiwiUGFydHlVc2VyIiwiU3ViamVjdCIsIk1lbnRpb25zIiwiTUVOVElPTlNfQ0xBU1MiLCJSb290IiwibG9jYWxlcyIsIklURU1fQ0xBU1MiLCJBQ1RJVkVfQ0xBU1MiLCJMb2dvdXRCdXR0b24iLCJDb25uZWN0ZWROYXYiLCJDb25uZWN0aW9uTmF2IiwiTWFpbk5hdiIsIkJ1dHRvbkxpc3QiLCJCdXR0b25QcmV2aWV3IiwiQnV0dG9uUHJpbnQiLCJ3aW5kb3ciLCJwcmludCIsIkJ1dHRvbkVkaXQiLCJkb2N1bWVudCIsIkJ1dHRvbk5ldyIsImljb25JZCIsInRvIiwiQnV0dG9uU3VibWl0IiwiZm9ybUlkIiwiTmF2U2Vjb25kYXJ5IiwiaXNTdHVjayIsImhhbmRsZUludGVyc2VjdGlvbiIsIm9ic2VydmVJbnRlcnNlY3Rpb24iLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInVub2JzZXJ2ZUludGVyc2VjdGlvbiIsImVudHJpZXMiLCJzZW50aW5lbEVudHJ5IiwiaW50ZXJzZWN0aW9uUmF0aW8iLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIndyYXBwZXIiLCJzZW50aW5lbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwib2JzZXJ2ZXIiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsInN0aWNreUNsYXNzIiwiZWwiLCJOT1RJRklDQVRJT05fTElGRVRJTUUiLCJOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJhdXRvUmVtb3ZlIiwiaGFuZGxlUmVtb3ZlIiwidGltZXJJZCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJOb3RpZmljYXRpb25zIiwiaGFzTm90aWZpY2F0aW9ucyIsIm4iLCJyZXN1bHQiLCJOb3RGb3VuZCIsIkJ1dHRvblNob3dJbnZvaWNlIiwid2l0aE1lc3NhZ2UiLCJpbnZvaWNlSWQiLCJpc0ludm9pY2VBcmNoaXZlZCIsIlNob3dJbnZvaWNlIiwiQnV0dG9uQ3JlYXRlSW52b2ljZSIsImlzQXZhaWxhYmxlIiwiQ3JlYXRlSW52b2ljZSIsIkJ1dHRvbkFyY2hpdmVRdW90YXRpb24iLCJBcmNoaXZlUXVvdGF0aW9uIiwiU1RFUFMiLCJrZXkiLCJyZWNvbXB1dGVTdGVwcyIsInN0ZXBzIiwicyIsInJlbW92ZURlZmF1bHRQcm9kdWN0cyIsImRlZmF1bHRQcm9kdWN0IiwiY2xlYW5lZFByb2R1Y3RzIiwiZGVmYXVsdE9iamVjdCIsImFycmF5IiwiYWRkRW1wdHlMaW5lIiwiZW1wdHlQcm9kdWN0IiwiZW5zdXJlUHJvZHVjdElkIiwid2l0aElkIiwiUXVvdGF0aW9uRm9ybSIsImhhbmRsZUNyZWF0ZUludm9pY2UiLCJoYW5kbGVQcm9kdWN0UmVtb3ZlIiwicmVjb21wdXRlRm9ybURhdGEiLCJnZXRDdXN0b21lckRhdGEiLCJmaW5kIiwiYyIsImlzUHJvZHVjdENoYW5nZSIsImlzVGF4Q2hhbmdlIiwicmVjb21wdXRlUHJvZHVjdHMiLCJ3aXRoU3RlcHMiLCJsaW5lIiwidXBkYXRlZFByb2R1Y3RzIiwic3VibWl0IiwiZm9ybUNoYW5nZSIsInByb2R1Y3RSZW1vdmUiLCJnZXRBbGxDdXN0b21lcnMiLCJRdW90YXRpb25Gb3JtUHJlcyIsImhhc1Byb2R1Y3RzIiwicHJvZHVjdHNMZW5ndGgiLCJzdWJtaXRJMThuSWQiLCJRdW90YXRpb25Sb3ciLCJxdW90YXRpb25VcmwiLCJxdW90YXRpb25Db2x1bW5zIiwiUXVvdGF0aW9uc0xpc3QiLCJBY3RpdmVRdW90YXRpb25zIiwiQXJjaGl2ZWRRdW90YXRpb25zIiwiUXVvdGF0aW9uc1JlYWR5VG9JbnZvaWNlIiwiaGlkZU9uRW1wdHkiLCJDdXN0b21lclF1b3RhdGlvbnMiLCJFZGl0UXVvdGF0aW9uIiwiUXVvdGF0aW9ucyIsIk5ld1F1b3RhdGlvbiIsIlByZXZpZXdRdW90YXRpb25QYWdlIiwiZXhhY3QiLCJBcmNoaXZlTGlzdCIsIlNldHRpbmdzIiwiUXVvdGF0aW9uc05ldyIsIlF1b3RhdGlvbnNFZGl0IiwiUXVvdGF0aW9uc1ByZXZpZXciLCJJbnZvaWNlc0xpc3QiLCJJbnZvaWNlc0VkaXQiLCJJbnZvaWNlc1ByZXZpZXciLCJDdXN0b21lcnNMaXN0IiwiQ3VzdG9tZXJOZXciLCJDdXN0b21lckVkaXQiLCJUaCIsImNvbHVtbiIsImlzU29ydGVkIiwiZGlyIiwic2FmZVR5cGUiLCJzcGxpdCIsInQiLCJ0cmltIiwiVGhlYWQiLCJjb2x1bW5zIiwiaGFuZGxlU29ydCIsImluY2x1ZGVzIiwiVGFibGVDb250ZXh0IiwiVGFibGVGb290ZXIiLCJSb3dGb290ZXIiLCJDZWxsIiwiY3VycmVudFR5cGUiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJSb3ciLCJjZWxsIiwiY2xvbmVFbGVtZW50IiwiRW1wdHlMaW5lIiwiY29sU3BhbiIsImNvbXB1dGVTb3J0UXVlcnkiLCJjdXJyZW50U29ydGluZyIsImlzU2FtZVNvcnQiLCJpc0FzY0RpciIsIlBhZ2luYXRlZFRhYmxlIiwidW5kZWZpbmVkIiwiaGFuZGxlUHJldiIsImhhbmRsZU5leHQiLCJwcmV2aW91c1BhZ2UiLCJwYWdlIiwibmV4dFBhZ2UiLCJwcmVzZW50YXRpb24iLCJoYXNSb3dzIiwiaGFzRm9vdGVyIiwiZm9vdGVyIiwiaGFzTWV0YSIsImFycmF5T2YiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYm9vbCIsImZ1bmMiLCJlbGVtZW50IiwiVGFibGUiLCJBQ1RJT05fQ0xBU1MiLCJQYWdpbmF0aW9uIiwiUFJFVl9DTEFTUyIsIk5FWFRfQ0xBU1MiLCJsaW1pdCIsIlByb2R1Y3RMaW5lRWRpdGFibGUiLCJpc0xhc3QiLCJmaWVsZFBhdGgiLCJwcm9kdWN0VG90YWwiLCJudW1iZXIiLCJQcm9kdWN0TGluZURpc3BsYXkiLCJQcm9kdWN0VG90YWxGb290ZXIiLCJyZWFkT25seSIsInRvdGFsTmV0IiwidG90YWxUYXgiLCJQcm9kdWN0c0NvbHVtbnMiLCJQcm9kdWN0VGFibGUiLCJQcm9kdWN0TGluZSIsImRlZmF1bHRQcm9wcyIsIkFsZXJ0Iiwid2FybmluZyIsImRhbmdlciIsIkJ1dHRvbiIsInNlY29uZGFyeSIsImxpbmtBbGlrZSIsIkJUTl9JQ09OX0NMQVNTIiwiQnRuSWNvbiIsInN2Z0lkIiwiZGlzYWJsZWREYXlzIiwiYWZ0ZXIiLCJEYXRlUGlja2VyIiwiaW5wdXRQcm9wcyIsImRhdGVPYmplY3QiLCJkYXRlVmFsdWUiLCJpc1ZhbGlkIiwidG9EYXRlIiwiZm9ybWF0RGF0ZSIsInBhcnNlRGF0ZSIsImxvY2FsZSIsImxvY2FsZVV0aWxzIiwiTW9tZW50TG9jYWxlVXRpbHMiLCJkYXkiLCJpc0VtcHR5IiwiZW5zdXJlVmFsdWUiLCJpZFRvQ2xhc3NOYW1lIiwicmVwbGFjZSIsImZpZWxkV3JhcHBlciIsIkNvbnRyb2xDb21wb25lbnQiLCJmaWVsZFR5cGUiLCJoYW5kbGVDaGFuZ2UiLCJoYW5kbGVCbHVyIiwiZGFya0JnIiwib25DaGFuZ2UiLCJvbkJsdXIiLCJfaWQyY2xhc3MiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwid3JhcHBlclByb3BzIiwibGFiZWxQcm9wcyIsImh0bWxGb3IiLCJjb250cm9sUHJvcHMiLCJkZWZhdWx0VmFsdWUiLCJpc1RvdWNoZWQiLCJpc1ByaXN0aW5lIiwiY29udHJvbFZhbHVlIiwiaXNFbXB0eVZhbHVlIiwiaXNWYWx1ZVVwZGF0ZSIsImlzT3B0aW9uc1VwZGF0ZSIsInVwZGF0ZSIsImFjdGl2ZUVsZW1lbnQiLCJjb250cm9sRWwiLCJXcmFwcGVyQ2xhc3NOYW1lIiwiSW5wdXQiLCJjb250cm9sUmVmIiwiVGV4dGFyZWEiLCJrZXlEZWZhdWx0IiwiU2VsZWN0Iiwib3B0aW9uc0tleXMiLCJoYXNPcHRpb25zIiwiQ2hlY2tCb3giLCJkZWZhdWx0Q2hlY2tlZCIsImljb25OYW1lIiwiRm9ybSIsIkZPUk1fQ0xBU1MiLCJGb3JtQWN0aW9ucyIsInBhcnNlVmFsdWUiLCJwYXJzZWQiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImlzTmFOIiwiQW1vdW50UHJlcyIsInNhZmVWYWx1ZSIsIkFtb3VudCIsIkZvcm1hdE51bWJlciIsIlBlcmNlbnQiLCJEYXkiLCJNYXJrZG93biIsInRleHQiLCJpc1RleHQiLCJfX2h0bWwiLCJicmVha3MiLCJQcmVzQnlLZXkiLCJLZXlMYWJlbCIsIktleVZhbHVlIiwiY29tcHV0ZVRvdGFsIiwic2xpY2UiLCJQaWVDaGFydERlZnMiLCJQaWVDaGFydCIsInNsaWNlcyIsInBlcmNlbnQiLCJnZXRDb29yZGluYXRlcyIsIngiLCJNYXRoIiwiY29zIiwiUEkiLCJ5Iiwic2luIiwiY3JlYXRlU2xpY2VzIiwiY3VtdWxhdGl2ZVBlcmNlbnQiLCJzdGFydFgiLCJzdGFydFkiLCJlbmRYIiwiZW5kWSIsImxhcmdlQXJjRmxhZyIsInBhdGhEYXRhIiwiY3JlYXRlTGFiZWxzIiwiUHJldmlldyIsIm9uZU9mIiwiUHJpbnRpbmdOb3RpY2UiLCJQcm9ncmVzcyIsIm1heCIsInRhYmxlTGF5b3V0IiwiY3NzUGVyY2VudCIsIm1pbiIsIndpZHRoIiwiREVMQVkiLCJTcGlubmVyIiwic2hvd1NwaW5uZXIiLCJDSEVDS0VEX0NMQVNTIiwiUkFESU9fQ0xBU1MiLCJDSEVDS0JPWF9OQU1FIiwiU3RlcHBlciIsImN1cnJlbnRTdGVwIiwiaXNBbGxDaGVja2VkIiwiZ2V0U2VsZWN0ZWRJbmRleCIsImhhc09uZU1pc3NpbmdTdGVwIiwic29tZSIsInN0ZXAiLCJpIiwiaGFzTm9WYWx1ZSIsInN0b3BQcm9wYWdhdGlvbiIsIm90aGVyUHJvcHMiLCJTdGVwIiwiSWNvbiIsIm90aGVyIiwiVGFicyIsIlRhYkxpc3QiLCJ0YWJzSWRzIiwibWFrZVRhYnMiLCJzZWxlY3RlZCIsInBhcnNlSW50IiwidGFic0NvbnRlbnQiLCJjaGlsZCIsImlzVGFiIiwiVGFiIiwiVGFiTGlzdEhlYWRlciIsIlRhYlBhbmVsIiwiVGV4dGFyZWFBdXRvUmVzaXplIiwiYXV0b1Jlc2l6ZSIsImNyZWF0ZVJlZiIsInJlY29tcHV0ZVRleHRhcmVhU2l6ZSIsIm9yaWdpbmFsUm93cyIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImhlaWdodCIsInNjcm9sbEhlaWdodCIsInNjcm9sbFRvcCIsInBsYWNlaG9sZGVyIiwic2hvd1BsYWNlaG9sZGVyIiwicGxhY2VIb2xkZXIiLCJjaGVja0tleUNoYW5nZSIsImN1cnJlbnRLZXkiLCJuZXh0S2V5IiwiaGFzQ3VycmVudCIsImhhc05leHQiLCJpc05ld0NyZWF0aW9uIiwiaXNEaWZmZXJlbnRJZCIsImlzTmV3UXVvdGF0aW9uIiwiaXNOZXdDdXN0b21lciIsImlzTmV3SW52b2ljZSIsIm5ld0N1c3RvbWVyIiwibmV3UXVvdGF0aW9uIiwiYXJjaGl2ZWRRdW90YXRpb24iLCJuZXdJbnZvaWNlIiwiYXJjaGl2ZWRJbnZvaWNlIiwiY2hlY2tSZWRpcmVjdGlvbnMiLCJkYXRhcyIsImhhc1JlZGlyZWN0IiwicmVkaXJlY3RVcmwiLCJyb3VuZFRvTmVhcmVzdFF1YXJ0ZXIiLCJyb3VuZGVkIiwicm91bmQiLCJ0b0ZpeGVkIiwiZW5mb3JjZU51bWJlciIsImNsZWFuZWRQcm9kdWN0IiwiZm9yRWFjaCIsInRheFJhdGUiLCJmaWx0ZXJBcnJheVdpdGhPYmplY3QiLCJpc09iamVjdCIsImRlZmF1bHRFbnRyaWVzIiwiZW50cnkiLCJy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Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw0RDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx5Qzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxnRDs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxpRDs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIHdhc20gbW9kdWxlc1xuIFx0dmFyIGluc3RhbGxlZFdhc21Nb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvYmplY3Qgd2l0aCBhbGwgY29tcGlsZWQgV2ViQXNzZW1ibHkuTW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy53ID0ge307XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyL2luZGV4LmpzXCIpO1xuIiwiXG5pbXBvcnQgcmMgZnJvbSAncmMnXG5cbmNvbnN0IGNvbmZpZyAgICAgID0gcmMoIGBjb25jb21wdGVgLCB7XG4gIEFQSV9VUkw6ICAgICAgICAgIGBodHRwOi8vbG9jYWxob3N0OjQwNDAvdjFgLFxuICBBUElfQ09PS0lFX05BTUU6ICBgY29uY29tcHRlX2FwaWAsXG4gIEhPU1RfVVJMOiAgICAgICAgIGBodHRwOi8vbG9jYWxob3N0OjMwMDBgLFxuICBBUFBfTkFNRTogICAgICAgICBgQ29uY29tcHRlYCxcbn0pXG5cbmNvbmZpZy5QT1JUICAgICAgID0gY29uZmlnLlBPUlQgfHwgcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwXG5cbmNvbmZpZy5OT0RFX0VOViAgID0gY29uZmlnLk5PREVfRU5WIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8IGBkZXZlbG9wbWVudGBcbmNvbmZpZy5pc0RldiAgICAgID0gY29uZmlnLk5PREVfRU5WID09PSBgZGV2ZWxvcG1lbnRgXG5jb25maWcuaXNQcm9kICAgICA9IGNvbmZpZy5OT0RFX0VOViA9PT0gYHByb2R1Y3Rpb25gXG5cbmV4cG9ydCB7IGNvbmZpZyBhcyBkZWZhdWx0IH1cbiIsImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBpbnNwZWN0IH0gZnJvbSAndXRpbCdcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xuaW1wb3J0IEtvYSBmcm9tICdrb2EnXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdrb2EtYm9keSdcbmltcG9ydCBzZXJ2ZVN0YXRpYyBmcm9tICdrb2Etc3RhdGljJ1xuaW1wb3J0IGNvbXByZXNzIGZyb20gJ2tvYS1jb21wcmVzcydcbmltcG9ydCBsb2dnZXIgZnJvbSAna29hLWxvZ2dlcidcbmltcG9ydCBqc29uIGZyb20gJ2tvYS1qc29uJ1xuaW1wb3J0IFJvdXRlciBmcm9tICdrb2Etcm91dGVyJ1xuXG5pbXBvcnQgY29uZmlnICAgICAgICAgIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IGxvZyAgICAgICAgICAgICBmcm9tICcuL2xvZydcbmltcG9ydCBhcGlCYWNrdXBSb3V0ZXMgZnJvbSAnLi9yb3V0aW5nLWFwaS1iYWNrdXAnXG5pbXBvcnQgcmVhY3RSb3V0ZXMgICAgIGZyb20gJy4vcm91dGluZy1rb2EtcmVhY3QnXG5pbXBvcnQgKiBhcyByZW5kZXIgZnJvbSAnLi9yZW5kZXInXG5cbi8vLy8vL1xuLy8gU0VSVkVSIENPTkZJR1xuLy8vLy8vXG5cbmNvbnN0IGFwcCA9IG5ldyBLb2EoKVxuXG5hcHAudXNlKCBib2R5UGFyc2VyKCkgKVxuYXBwLnVzZSggY29tcHJlc3MoKSApXG5hcHAudXNlKCBzZXJ2ZVN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBgLi9wdWJsaWNgKSkgKVxuXG4vLyBmb3JtYXQganNvbiBodHRwczovL2dpdGh1Yi5jb20va29hanMvanNvblxuYXBwLnVzZSgganNvbigpIClcblxuLy8tLS0tLSBMT0dHSU5HXG5cbmFwcC51c2UoIGxvZ2dlcigpIClcblxuLy8vLy8vXG4vLyBST1VUSU5HXG4vLy8vLy9cblxuLy8tLS0tLSBFUlJPUiBIQU5ETElOR1xuXG5hcHAudXNlKCBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgYXdhaXQgbmV4dCgpXG4gICAgLy8gNDA0IGFyZSBhbHJlYWR5IGhhbmRsZWQgYnkgUkVBQ1RcbiAgICAvLyBubyBuZWVkIHRvIHJlbmRlciB0aGUgNDA0IGhlcmUgXl5cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coIGluc3BlY3QoZXJyLCB7Y29sb3JzOiB0cnVlfSkgKVxuICAgIGN0eC5zdGF0dXMgID0gZXJyLnN0YXR1c0NvZGUgfHwgZXJyLnN0YXR1cyB8fCA1MDBcbiAgICBjdHguYm9keSAgICA9IHJlbmRlci5lcnJvclBhZ2Uoe1xuICAgICAgcmVhc29uOiBlcnIubWVzc2FnZSxcbiAgICAgIHN0YWNrdHJhY2U6IGVyci5zdGFja3RyYWNlIHx8IGVyci5zdGFjayB8fCBmYWxzZSxcbiAgICB9KVxuICB9XG59KVxuXG5jb25zdCByb3V0ZXIgID0gbmV3IFJvdXRlcigpXG5cbi8vLS0tLS0gIE1PVU5UIE5PLUZFVENIIEJBQ0tVUFxuXG5yb3V0ZXIudXNlKCBhcGlCYWNrdXBSb3V0ZXMucm91dGVzKCkgKVxuXG4vLy0tLS0tIE1PVU5UIFJFQUNUIFJPVVRFUlxuXG5yb3V0ZXIudXNlKCByZWFjdFJvdXRlcy5yb3V0ZXMoKSApXG5cbi8vLS0tLS0gTU9VTlQgUk9VVEVSIFRPIEFQUExJQ0FUSU9OXG5cbmFwcC51c2UoIHJvdXRlci5yb3V0ZXMoKSApXG4vLyBhcHAudXNlKCByb3V0ZXIuYWxsb3dlZE1ldGhvZHMoKSApXG5cbi8vLS0tLS0gTEFVTkNIIFRIRSBNQUdJQ1xuXG5jb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKGNvbmZpZy5QT1JULCBmdW5jdGlvbiBlbmRJbml0KCkge1xuICBsb2coIGBTZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uIHBvcnRgLCBzZXJ2ZXIuYWRkcmVzcygpLnBvcnQgKVxufSlcblxuLy8vLy8vXG4vLyBFWFBPUlRTXG4vLy8vLy9cblxuZXhwb3J0IHsgYXBwIGFzIGRlZmF1bHQgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGRlYnVnbG9nIH0gZnJvbSAndXRpbCdcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcblxuY29uc3QgbG9nID0gZGVidWdsb2coIGBzZXJ2ZXJgIClcbmxvZyggY2hhbGsuZ3JlZW4oYGluaXQgbG9nZ2luZ2ApIClcblxuZXhwb3J0IGRlZmF1bHQgbG9nXG4iLCJpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHNlcmlhbGl6ZUpTIGZyb20gJ3NlcmlhbGl6ZS1qYXZhc2NyaXB0J1xuaW1wb3J0IEludGxQb2x5ZmlsbCBmcm9tICdpbnRsJ1xuaW1wb3J0IGFyZUludGxMb2NhbGVzU3VwcG9ydGVkIGZyb20gJ2ludGwtbG9jYWxlcy1zdXBwb3J0ZWQnXG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcuanMnXG5cbi8vIEkxOE4gU0VUVVBcbi8vIOKAoiBub2RlIG9ubHkgaGFzIGBlbmAgbG9jYWxlc1xuLy8g4oCiIHBvbHlmaWxsIHRoZSBvdGhlciBsYW5ndWFnZXNcbi8vICAgaHR0cHM6Ly9mb3JtYXRqcy5pby9ndWlkZXMvcnVudGltZS1lbnZpcm9ubWVudHMvI3BvbHlmaWxsLW5vZGVcbmlmICggIWFyZUludGxMb2NhbGVzU3VwcG9ydGVkKFtgZW5gLCBgZnJgXSkgKSB7XG4gIEludGwuTnVtYmVyRm9ybWF0ICAgPSBJbnRsUG9seWZpbGwuTnVtYmVyRm9ybWF0XG4gIEludGwuRGF0ZVRpbWVGb3JtYXQgPSBJbnRsUG9seWZpbGwuRGF0ZVRpbWVGb3JtYXRcbn1cblxuLy8gb25seSBwYXNzIGEgc3Vic2V0IG9mIHRoZSBjb25maWcuIGVub3VnaCBmb3IgdGhlIGNsaWVudCBzaWRlXG4vLyDigKIgVXNlIHNlcmlhbGl6ZS1qYXZhc2NyaXB0IG92ZXIgSlNPTi5zdHJpbmdpZnkoKVxuLy8gICBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9zZXJpYWxpemUtamF2YXNjcmlwdCNvdmVydmlld1xuY29uc3QgQ0xJRU5UX0NPTkZJRyAgPSBzZXJpYWxpemVKUygge1xuICBBUElfVVJMOiAgICAgICAgICBjb25maWcuQVBJX1VSTCxcbiAgQVBJX0NPT0tJRV9OQU1FOiAgY29uZmlnLkFQSV9DT09LSUVfTkFNRSxcbiAgSE9TVF9VUkw6ICAgICAgICAgY29uZmlnLkhPU1RfVVJMLFxuICBBUFBfTkFNRTogICAgICAgICBjb25maWcuQVBQX05BTUUsXG59LCB7IGlzSlNPTjogdHJ1ZSB9IClcbmNvbnN0IFNWR19JQ09OU19QQVRIID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vcHVibGljL3N2Zy1pY29ucy5zdmcnKVxuY29uc3QgU1ZHX0lDT05TICAgICAgPSBmcy5yZWFkRmlsZVN5bmMoIFNWR19JQ09OU19QQVRILCBgdXRmOGApXG5cbmV4cG9ydCBmdW5jdGlvbiByZWFjdEFwcCh7IHN0b3JlLCBjb250ZW50LCBoZWxtZXR9KSB7XG4gIGNvbnN0IElOSVRJQUxfU1RBVEUgPSBzZXJpYWxpemVKUyggc3RvcmUuZ2V0U3RhdGUoKSwgeyBpc0pTT046IHRydWUgfSApXG4gIHJldHVybiBgPCFET0NUWVBFIGh0bWw+XG48aHRtbCAke2hlbG1ldC5odG1sQXR0cmlidXRlcy50b1N0cmluZygpfT5cbiAgPGhlYWQ+XG4gICAgJHsgaGVsbWV0LnRpdGxlLnRvU3RyaW5nKCkgfVxuICAgICR7IGhlbG1ldC5tZXRhLnRvU3RyaW5nKCkgfVxuICAgICR7IGhlbG1ldC5saW5rLnRvU3RyaW5nKCkgfVxuICA8L2hlYWQ+XG4gIDxib2R5ICR7aGVsbWV0LmJvZHlBdHRyaWJ1dGVzLnRvU3RyaW5nKCl9PlxuICAgICR7IFNWR19JQ09OUyB9XG4gICAgPGRpdiBpZD1cInJlYWN0LW1haW4tbW91bnRcIj4keyBjb250ZW50IH08L2Rpdj5cbiAgICA8c2NyaXB0PlxuICAgICAgd2luZG93Ll9fQ09ORklHX18gPSAkeyBDTElFTlRfQ09ORklHIH1cbiAgICAgIHdpbmRvdy5fX0lOSVRJQUxfU1RBVEVfXyA9ICR7IElOSVRJQUxfU1RBVEUgfVxuICAgIDwvc2NyaXB0PlxuICAgIDxzY3JpcHQgc3JjPVwiL3ZlbmRvci5jb25jb21wdGUuanNcIj48L3NjcmlwdD5cbiAgICA8c2NyaXB0IHNyYz1cIi9jb25jb21wdGUuanNcIj48L3NjcmlwdD5cbiAgPC9ib2R5PlxuPC9odG1sPmBcbn1cblxuZnVuY3Rpb24gcmVuZGVyU3RhY2tUcmFjZSggc3RhY2t0cmFjZSApIHtcbiAgaWYgKCFzdGFja3RyYWNlKSByZXR1cm4gYGBcbiAgc3RhY2t0cmFjZSA9IEFycmF5LmlzQXJyYXkoIHN0YWNrdHJhY2UgKSA/IHN0YWNrdHJhY2Uuam9pbihgXFxuYCkgOiBzdGFja3RyYWNlXG4gIHJldHVybiBgPHByZT4ke3N0YWNrdHJhY2V9PC9wcmU+YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJyb3JQYWdlKHtyZWFzb24sIHN0YWNrdHJhY2V9KSB7XG5cbnJldHVybiBgPCFET0NUWVBFIGh0bWw+XG48aHRtbD5cbiAgPGhlYWQ+XG4gIDwvaGVhZD5cbiAgPGJvZHk+XG4gICAgPG1haW4gcm9sZT1cIm1haW5cIj5cbiAgICAgIDxoMT5bU0VSVkVSXSBlcnJvcjwvaDE+XG4gICAgICA8aDI+JHsgcmVhc29uIH08L2gyPlxuICAgICAgPGhyIC8+XG4gICAgICAkeyByZW5kZXJTdGFja1RyYWNlKHN0YWNrdHJhY2UpIH1cbiAgICA8L21haW4+XG4gIDwvYm9keT5cbjwvaHRtbD5gXG59XG4iLCJpbXBvcnQgUm91dGVyIGZyb20gJ2tvYS1yb3V0ZXInXG5pbXBvcnQgaXNOaWwgZnJvbSAnbG9kYXNoLmlzbmlsJ1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0ICogYXMgaXNvRmV0Y2ggZnJvbSAnLi4vc2hhcmVkL2lzby1mZXRjaCdcblxuY29uc3Qgcm91dGVyICA9IG5ldyBSb3V0ZXIoKVxuXG4vLy8vLy9cbi8vIE5PIEZFVENIIEJBQ0tVUFxuLy8vLy8vXG5cbi8vIOKAoiBpbiBjYXNlIG9mIGRpcmVjdCBnZXQvcG9zdCB3aXRob3V0IHJlYWN0IGhhbmRsaW5nXG4vLyDigKIgb3IgSlMgaXNuJ3QgYWN0aXZhdGVkIG9uIHRoZSBjbGllbnQgc2lkZVxuLy8g4oCiIGluIGFueSBjYXNlIHRoaXMgaXMgT1BUSU9OQUwgSUYgV0Ugd2FudCB0byBERUZFUiBldmVyeXRoaW5nIHRvIHRoZSBGUk9OVCBSRUFDVCBBUFBcblxuY29uc3QgcHJveHlSZXF1ZXN0ID0gYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHVybCwgYm9keSwgaGVhZGVyIH0gPSBjdHgucmVxdWVzdFxuICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgdXJsLFxuICAgIGJvZHksXG4gIH1cbiAgY29uc3QgbWV0aG9kID0gY3R4LnJlcXVlc3QubWV0aG9kLnRvTG93ZXJDYXNlKClcbiAgY29uc3QgeyByZXNwb25zZSwgcGF5bG9hZCB9ID0gYXdhaXQgaXNvRmV0Y2hbIG1ldGhvZCBdKCBmZXRjaE9wdGlvbnMsIGhlYWRlci5jb29raWUgKVxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3coe1xuICAgICAgc3RhdHVzOiAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgIG1lc3NhZ2U6ICAgIGBbRlJPTSBBUEldICR7cGF5bG9hZC5tZXNzYWdlfWAsXG4gICAgICBzdGFja3RyYWNlOiByZXNwb25zZS5zdGFja3RyYWNlLFxuICAgIH0pXG4gIH1cblxuICAvLyBJZiB0aGUgQVBJIHNlbmQgYW4gYWNjZXNzIHRva2VuLCBjb3B5IGl0IHRvIGEgY29va2llXG4gIC8vIOKAoiBuZWVkZWQgdG8gbWFpbnRhaW4gYXV0aGVudGljYXRpb24gd2l0aG91dCBKUyBhY3RpdmF0ZWRcbiAgY29uc3QgYWNjZXNzVG9rZW4gPSBwYXlsb2FkLmFjY2Vzc190b2tlblxuICAvLyBjb3B5IGF1dGhvcml6YXRpb24gaGVhZGVyIGV2ZW4gaWYgaXQncyBhbiBlbXB0eSBzdHJpbmdcbiAgaWYgKCAhaXNOaWwoIGFjY2Vzc1Rva2VuICkgKSB7XG4gICAgY3R4LmNvb2tpZXMuc2V0KCBjb25maWcuQVBJX0NPT0tJRV9OQU1FLCBhY2Nlc3NUb2tlbiApXG4gICAgZGVsZXRlIHBheWxvYWQuYWNjZXNzX3Rva2VuXG4gIH1cblxuICAvLyBTYXZlIHBheWxvYWQgdG8gc3RhdGUgZm9yIGZ1cnRoZXIgcmV1c2VcbiAgY3R4LnN0YXRlLnBheWxvYWQgPSBwYXlsb2FkXG4gIG5leHQoKVxufVxuXG4vLy0tLS0tIFVTRVJcblxucm91dGVyXG4uZ2V0KCBgL2FjY291bnQvbG9nb3V0YCwgcHJveHlSZXF1ZXN0LCBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgcGF5bG9hZCB9ID0gY3R4LnN0YXRlXG4gIGN0eC5yZWRpcmVjdCggYC9hY2NvdW50L2xvZ2luYCApXG59KVxuLnBvc3QoIGAvYWNjb3VudC9yZWdpc3RlcmAsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHBheWxvYWQgfSA9IGN0eC5zdGF0ZVxuICBjdHgucmVkaXJlY3QoIGAvYCApXG59KVxuLnBvc3QoIGAvYWNjb3VudC9mb3Jnb3RgLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBjdHguc3RhdGVcbiAgY3R4LnJlZGlyZWN0KCBgL2FjY291bnQvZm9yZ290YCApXG59KVxuLnBvc3QoIGAvYWNjb3VudC9yZXNldGAsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHBheWxvYWQgfSA9IGN0eC5zdGF0ZVxuICBjdHgucmVkaXJlY3QoIGAvYCApXG59KVxuLnBvc3QoIGAvYWNjb3VudC9sb2dpbmAsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHBheWxvYWQgfSA9IGN0eC5zdGF0ZVxuICBjdHgucmVkaXJlY3QoIGAvYCApXG59KVxuLnBvc3QoIGAvYWNjb3VudC9zZXR0aW5nc2AsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHBheWxvYWQgfSA9IGN0eC5zdGF0ZVxuICBjdHgucmVkaXJlY3QoIGN0eC5yZXF1ZXN0LnVybCApXG59KVxuXG4vLy0tLS0tIENVU1RPTUVSU1xuXG5yb3V0ZXJcbi5wb3N0KCBgL2N1c3RvbWVycy9uZXdgLCBwcm94eVJlcXVlc3QsIGFzeW5jIChjdHgsIG5leHQpID0+IHtcbiAgY29uc3QgeyBwYXlsb2FkIH0gPSBjdHguc3RhdGVcbiAgY3R4LnJlZGlyZWN0KCBgL2N1c3RvbWVycy8keyBwYXlsb2FkLmlkIH1gIClcbn0pXG4ucG9zdCggYC9jdXN0b21lcnMvOmlkYCwgcHJveHlSZXF1ZXN0LCBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgdXJsIH0gPSBjdHgucmVxdWVzdFxuICBjdHgucmVkaXJlY3QoIGN0eC5yZXF1ZXN0LnVybCApXG59KVxuXG4vLy0tLS0tIFFVT1RBVElPTlNcblxucm91dGVyXG4ucG9zdCggYC9xdW90YXRpb25zL25ld2AsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHBheWxvYWQgfSA9IGN0eC5zdGF0ZVxuICBjdHgucmVkaXJlY3QoIGAvcXVvdGF0aW9ucy8keyBwYXlsb2FkLmlkIH1gIClcbn0pXG4ucG9zdCggYC9xdW90YXRpb25zLzppZGAsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHVybCB9ID0gY3R4LnJlcXVlc3RcbiAgY3R4LnJlZGlyZWN0KCBjdHgucmVxdWVzdC51cmwgKVxufSlcbi5wb3N0KCBgL3F1b3RhdGlvbnMvOmlkL2NyZWF0ZS1pbnZvaWNlYCwgcHJveHlSZXF1ZXN0LCBhc3luYyAoY3R4LCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgaWQgfSAgPSBjdHgucGFyYW1zXG4gIGN0eC5yZWRpcmVjdCggYC9xdW90YXRpb25zLyR7IGlkfWAgKVxufSlcblxuLy8tLS0tLSBJTlZPSUNFU1xuXG5yb3V0ZXJcbi5wb3N0KCBgL2ludm9pY2VzLzppZGAsIHByb3h5UmVxdWVzdCwgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHVybCB9ID0gY3R4LnJlcXVlc3RcbiAgY3R4LnJlZGlyZWN0KCBjdHgucmVxdWVzdC51cmwgKVxufSlcblxuZXhwb3J0IHsgcm91dGVyIGFzIGRlZmF1bHQgfVxuIiwiaW1wb3J0IGNoYWxrICBmcm9tICdjaGFsaydcbmltcG9ydCBSb3V0ZXIgZnJvbSAna29hLXJvdXRlcidcbmltcG9ydCBSZWFjdCAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gJ3JlYWN0LWRvbS9zZXJ2ZXInXG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgcmVuZGVyUm91dGVzLCBtYXRjaFJvdXRlcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1jb25maWcnXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IHsgSGVsbWV0IH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nLmpzJ1xuaW1wb3J0ICogYXMgcmVuZGVyIGZyb20gJy4vcmVuZGVyJ1xuaW1wb3J0IHJvdXRlcyBmcm9tICcuLi9zaGFyZWQvcm91dGVzLmpzJ1xuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi4vc2hhcmVkL2R1Y2tzL2NvbWJpbmVkLXJlZHVjZXJzLmpzJ1xuXG5jb25zdCByb3V0ZXIgICAgICAgICA9IG5ldyBSb3V0ZXIoKVxuXG4vLyBzaW1wbGUgc2VydmVyIHNpZGUgYWN0aW9uIGxvZ2dlclxuLy8g4oCiIGZvciB0aGUgY3JlYXRpb24gb2YgYSBjdXN0b20gbWlkZGxld2FyZSBzZWU6XG4vLyAgIGh0dHBzOi8vcmVkdXguanMub3JnL2FwaS1yZWZlcmVuY2UvYXBwbHltaWRkbGV3YXJlI2V4YW1wbGU6LWN1c3RvbS1sb2dnZXItbWlkZGxld2FyZVxuY29uc3QgcmVkdXhBY3Rpb25Mb2dnZXIgPSAoeyBnZXRTdGF0ZSB9KSA9PiB7XG4gIHJldHVybiBuZXh0ID0+IGFjdGlvbiA9PiB7XG4gICAgbG9nKCBgZGlzcGF0Y2gg4oaSYCwgYWN0aW9uLnR5cGUgKVxuICAgIGNvbnN0IHJldHVyblZhbHVlID0gbmV4dCggYWN0aW9uIClcbiAgICBjb25zdCBoYXNFcnJvciA9IHJldHVyblZhbHVlLnBheWxvYWQuZXJyb3JcbiAgICBjb25zdCBjb2xvciA9IGhhc0Vycm9yID8gY2hhbGsucmVkIDogY2hhbGsuZ3JlZW5cbiAgICBsb2coIGBkaXNwYXRjaCDihpBgLCBjb2xvcihhY3Rpb24udHlwZSkgKVxuICAgIHJldHVybiByZXR1cm5WYWx1ZVxuICB9XG59XG5cbnJvdXRlci5nZXQoICcqJywgYXN5bmMgKGN0eCwgbmV4dCkgPT4ge1xuICBjb25zdCB7IHVybCwgaGVhZGVyIH0gPSBjdHhcbiAgLy8gd2FpdCBmb3IgZXZlcnkgY29tcG9uZW50IHRvIGZldGNoIGhpcyBkYXRhXG4gIGNvbnN0IHN0b3JlICAgICAgID0gY3JlYXRlU3RvcmUocmVkdWNlciwge30sIGFwcGx5TWlkZGxld2FyZSh0aHVuaywgcmVkdXhBY3Rpb25Mb2dnZXIpKVxuICBjb25zdCBicmFuY2ggICAgICA9IG1hdGNoUm91dGVzKHJvdXRlcywgdXJsKVxuICBjb25zdCBpbml0RmV0Y2hlcyA9IGJyYW5jaFxuICAgIC5maWx0ZXIoICh7cm91dGV9KSA9PiByb3V0ZS5jb21wb25lbnQuZmV0Y2hEYXRhIGluc3RhbmNlb2YgRnVuY3Rpb24gKVxuICAgIC5tYXAoICh7cm91dGUsIG1hdGNofSkgPT4ge1xuICAgICAgLy8gUGFzcyBoZXJlIHRoZSBjb29raWVzXG4gICAgICAvLyBmZXRjaCB3aWxsIG5lZWQgaXQgdG8gbWFpbnRhaW4gYXV0aGVudGljYXRpb25cbiAgICAgIHJldHVybiByb3V0ZS5jb21wb25lbnQuZmV0Y2hEYXRhKHtcbiAgICAgICAgZGlzcGF0Y2g6IHN0b3JlLmRpc3BhdGNoLFxuICAgICAgICBwYXJhbXMgIDogbWF0Y2gucGFyYW1zLFxuICAgICAgICBjb29raWUgIDogaGVhZGVyLmNvb2tpZSxcbiAgICAgIH0pXG4gICAgfSApXG4gIGF3YWl0IFByb21pc2UuYWxsKCBpbml0RmV0Y2hlcyApXG5cbiAgLy8gc3RhdGljQ29udGV4dCBpcyBtdXRhYmxlICYgcHJvdmlkZWQgb25seSBvbiBzZXJ2ZXItc2lkZSByZW5kZXJpbmdcbiAgLy8g4oCiIEJlY2F1c2UgaXQncyBtdXRhYmxlLCBpdCB3aWxsIGNoYW5nZSBkdXJpbmcgdGhlIFJlYWN0J3Mgc2VydmVyIHJlbmRlcmluZyBwcm9jZXNzXG4gIC8vIOKAoiBTbyB0aGF0J3MgYSBnb29kIHdheSB0byBwYXNzIGRhdGEgZnJvbSByZWFjdC1yb3V0ZXItY29uZmlnIHRvIHRoZSBzZXJ2ZXJcbiAgY29uc3Qgc3RhdGljQ29udGV4dCA9IHt9XG5cbiAgLy8gRmluYWxseSByZW5kZXIhXG4gIGNvbnN0IGNvbnRlbnQgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxTdGF0aWNSb3V0ZXIgbG9jYXRpb249e3VybH0gY29udGV4dD17c3RhdGljQ29udGV4dH0+XG4gICAgICAgIHsvKiByZW5kZXJSb3V0ZXMgd2lsbCByZW5kZXIgdGhlIHJpZ2h0IGNvbXBvbmVudHMgKi99XG4gICAgICAgIHsgcmVuZGVyUm91dGVzKHJvdXRlcykgfVxuICAgICAgPC9TdGF0aWNSb3V0ZXI+XG4gICAgPC9Qcm92aWRlcj5cbiAgKVxuICAvLyByZW5kZXIgdGFncyBvdXRzaWRlIHRoZSBhcHAgKG1ldGEsIGxpbmtz4oCmKVxuICAvLyDigKIgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcmVhY3QtaGVsbWV0I3NlcnZlci11c2FnZVxuICBjb25zdCBoZWxtZXQgPSBIZWxtZXQucmVuZGVyU3RhdGljKClcblxuICAvLyByZWZsZWN0IHN0YXR1cyBmcm9tIHJlYWN0LXJvdXRlciB0byBrb2FcbiAgaWYgKCBzdGF0aWNDb250ZXh0LnN0YXR1cyA9PT0gMzAyICkge1xuICAgIGN0eC5zdGF0dXMgPSAzMDJcbiAgICBsb2coIGByZWRpcmVjdGAgKVxuICAgIHJldHVybiBjdHgucmVkaXJlY3QoIHN0YXRpY0NvbnRleHQudXJsIClcbiAgfVxuICBpZiAoIHN0YXRpY0NvbnRleHQuc3RhdHVzID09PSA0MDQgKSB7XG4gICAgY3R4LnN0YXR1cyA9IDQwNFxuICB9XG5cbiAgY3R4LmJvZHkgPSByZW5kZXIucmVhY3RBcHAoe1xuICAgIHN0b3JlLCAgICAvLyB0aG9zZSB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZSB0aGUgc3RvcmUgY2xpZW50IHNpZGVcbiAgICBjb250ZW50LCAgLy8gdGhlIHJpZ2h0IEhUTUwgcHJvZHVjZWQgYnkgcmVhY3QgXl5cbiAgICBoZWxtZXQsICAgLy8gZm9yIEhFQUQgdGFnc1xuICB9KVxufSlcblxuZXhwb3J0IHsgcm91dGVyIGFzIGRlZmF1bHQgfVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgICBzZXJpYWxpemUgICAgICAgICAgICBmcm9tICdmb3JtLXNlcmlhbGl6ZSdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgICB1cmxKb2luICAgICAgICAgICAgICBmcm9tICd1cmwtam9pbidcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIGNvbmZpZyAgICAgICAgICAgICAgIGZyb20gJy4uL2lzb21vcnBoaWMtY29uZmlnJ1xuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyICAgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBhY2NvdW50ICAgICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9hY2NvdW50J1xuaW1wb3J0ICAgICAgTGF5b3V0Qm9hcmRpbmcgICAgICAgZnJvbSAnLi4vbGF5b3V0L2JvYXJkaW5nJ1xuaW1wb3J0ICAgICAgRm9ybSAgICAgICAgICAgICAgICAgZnJvbSAnLi4vdWkvZm9ybSdcbmltcG9ydCB7ICAgIEJ1dHRvbiAgICAgICAgICAgICB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5pbXBvcnQgeyAgICBJbnB1dCAgICAgICAgICAgICAgfSBmcm9tICcuLi91aS9maWVsZCdcblxuY29uc3QgTUFJTF9SRURJUkVDVF9VUkwgPSB1cmxKb2luKCBjb25maWcuSE9TVF9VUkwsICcvYWNjb3VudC9yZXNldCcgKVxuXG5jbGFzcyBGb3Jnb3QgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQoIHRoaXMgKVxuICB9XG5cbiAgaGFuZGxlU3VibWl0KCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgYm9keSA9IHNlcmlhbGl6ZSggZXZlbnQudGFyZ2V0LCB7IGhhc2g6IHRydWUgfSApXG4gICAgdGhpcy5wcm9wcy5mb3Jnb3QoeyBib2R5IH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpc1xuICAgIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgYWNjb3VudC5mb3Jnb3QudGl0bGVgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgICA8TGF5b3V0Qm9hcmRpbmdcbiAgICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICAgID5cbiAgICAgICAgICA8Rm9ybSBpZD1cImZvcmdvdFwiIGFjdGlvbj1cIi9hY2NvdW50L2ZvcmdvdFwiIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXQgfSA+XG4gICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJhY2NvdW50LmZvcmdvdC5ub3RpY2VcIi8+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJyZWRpcmVjdFVybFwiIHZhbHVlPXsgTUFJTF9SRURJUkVDVF9VUkwgfSAvPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQuZW1haWxcIlxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImFjY291bnQuZm9yZ290LmJ1dHRvblwiIC8+XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0Zvcm0+XG4gICAgICAgIDwvTGF5b3V0Qm9hcmRpbmc+XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgIClcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaDJwcm9wKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgZm9yZ290OiBhY2NvdW50LmZvcmdvdCxcbiAgfSwgZGlzcGF0Y2gpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIG51bGwsIGRpc3BhdGNoMnByb3AgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBGb3Jnb3QsXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgYWNjb3VudCAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvYWNjb3VudCdcbmltcG9ydCAgICAgIExheW91dEJvYXJkaW5nICAgICAgIGZyb20gJy4uL2xheW91dC9ib2FyZGluZydcbmltcG9ydCAgICAgIEZvcm0gICAgICAgICAgICAgICAgIGZyb20gJy4uL3VpL2Zvcm0nXG5pbXBvcnQgeyAgICBCdXR0b24gICAgICAgICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0IHsgICAgSW5wdXQgICAgICAgICAgICAgIH0gZnJvbSAnLi4vdWkvZmllbGQnXG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKCB0aGlzIClcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdCggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGJvZHkgPSBzZXJpYWxpemUoIGV2ZW50LnRhcmdldCwgeyBoYXNoOiB0cnVlIH0gKVxuICAgIHRoaXMucHJvcHMubG9naW4oeyBib2R5IH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpc1xuICAgIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgYWNjb3VudC5sb2dpbi50aXRsZWAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICAgIDxMYXlvdXRCb2FyZGluZ1xuICAgICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgICAgPlxuICAgICAgICAgIDxGb3JtIGlkPVwibG9naW5cIiBhY3Rpb249XCIvYWNjb3VudC9sb2dpblwiIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXQgfSA+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5lbWFpbFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQucGFzc3dvcmRcIlxuICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImFjY291bnQubG9naW4uYnV0dG9uXCIgZGVmYXVsdE1lc3NhZ2U9XCJDb25uZWN0XCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgPC9MYXlvdXRCb2FyZGluZz5cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoMnByb3AoIGRpc3BhdGNoICkge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBsb2dpbjogYWNjb3VudC5sb2dpbixcbiAgfSwgZGlzcGF0Y2gpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobnVsbCwgZGlzcGF0Y2gycHJvcCkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogTG9naW4sXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgYWNjb3VudCAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvYWNjb3VudCdcbmltcG9ydCAgICAgIExheW91dEJvYXJkaW5nICAgICAgIGZyb20gJy4uL2xheW91dC9ib2FyZGluZydcbmltcG9ydCAgICAgIEZvcm0gICAgICAgICAgICAgICAgIGZyb20gJy4uL3VpL2Zvcm0nXG5pbXBvcnQgeyAgICBCdXR0b24gICAgICAgICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0IHsgICAgSW5wdXQgICAgICAgICAgICAgIH0gZnJvbSAnLi4vdWkvZmllbGQnXG5cbmNsYXNzIFJlZ2lzdGVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKCB0aGlzIClcbiAgfVxuXG4gIGhhbmRsZVN1Ym1pdCggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGJvZHkgPSBzZXJpYWxpemUoIGV2ZW50LnRhcmdldCwgeyBoYXNoOiB0cnVlIH0gKVxuICAgIHRoaXMucHJvcHMucmVnaXN0ZXIoeyBib2R5IH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpc1xuICAgIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgYWNjb3VudC5yZWdpc3Rlci50aXRsZWAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICAgIDxMYXlvdXRCb2FyZGluZ1xuICAgICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgICAgPlxuICAgICAgICAgIDxGb3JtIGFjdGlvbj1cIi9hY2NvdW50L3JlZ2lzdGVyXCIgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pdCB9ID5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLmVtYWlsXCJcbiAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPVwiXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5wYXNzd29yZFwiXG4gICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiYWNjb3VudC5yZWdpc3Rlci5idXR0b25cIiBkZWZhdWx0VmFsdWU9XCJDcmVhdGVcIiAvPlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Gb3JtPlxuICAgICAgICA8L0xheW91dEJvYXJkaW5nPlxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApXG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2gycHJvcCggZGlzcGF0Y2ggKSB7XG4gIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIHJlZ2lzdGVyOiBhY2NvdW50LnJlZ2lzdGVyLFxuICB9LCBkaXNwYXRjaClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBkaXNwYXRjaDJwcm9wKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBSZWdpc3RlcixcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgc2VyaWFsaXplICAgICAgICAgICAgZnJvbSAnZm9ybS1zZXJpYWxpemUnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0ICAgcXVlcnlTdHJpbmcgICAgICAgICAgZnJvbSAncXVlcnktc3RyaW5nJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSAgIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyICAgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBhY2NvdW50ICAgICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9hY2NvdW50J1xuaW1wb3J0ICAgICAgTGF5b3V0Qm9hcmRpbmcgICAgICAgZnJvbSAnLi4vbGF5b3V0L2JvYXJkaW5nJ1xuaW1wb3J0ICAgICAgRm9ybSAgICAgICAgICAgICAgICAgZnJvbSAnLi4vdWkvZm9ybSdcbmltcG9ydCB7ICAgIEJ1dHRvbiAgICAgICAgICAgICB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5pbXBvcnQgeyAgICBJbnB1dCAgICAgICAgICAgICAgfSBmcm9tICcuLi91aS9maWVsZCdcblxuY2xhc3MgUmVzZXQgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcblxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCggdGhpcyApXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHRva2VuOiBxdWVyeVN0cmluZy5wYXJzZSggcHJvcHMubG9jYXRpb24uc2VhcmNoICkudG9rZW5cbiAgICB9XG4gIH1cblxuICBoYW5kbGVTdWJtaXQoIGV2ZW50ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBib2R5ID0gc2VyaWFsaXplKCBldmVudC50YXJnZXQsIHsgaGFzaDogdHJ1ZSB9IClcbiAgICB0aGlzLnByb3BzLnJlc2V0KHsgYm9keSB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHMsIHN0YXRlIH0gPSB0aGlzXG4gICAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBhY2NvdW50LnJlc2V0LnRpdGxlYCB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgICAgPExheW91dEJvYXJkaW5nXG4gICAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgICA+XG4gICAgICAgICAgPEZvcm0gaWQ9XCJsb2dpblwiIGFjdGlvbj1cIi9hY2NvdW50L3Jlc2V0XCIgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pdCB9ID5cbiAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImFjY291bnQucmVzZXQubm90aWNlXCIgZGVmYXVsdFZhbHVlPVwiU2V0IHlvdXIgbmV3IHBhc3N3b3JkIGhlcmVcIiAvPlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwidG9rZW5cIiBkZWZhdWx0VmFsdWU9e3N0YXRlLnRva2VufSAvPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQucGFzc3dvcmRcIlxuICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImFjY291bnQucmVzZXQuYnV0dG9uXCIgZGVmYXVsdFZhbHVlPVwicmVzZXQgcGFzc3dvcmRcIiAvPlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Gb3JtPlxuICAgICAgICA8L0xheW91dEJvYXJkaW5nPlxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApXG4gIH1cbn1cblxuXG5mdW5jdGlvbiBkaXNwYXRjaDJwcm9wKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgcmVzZXQ6IGFjY291bnQucmVzZXQsXG4gIH0sIGRpc3BhdGNoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBudWxsLCBkaXNwYXRjaDJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogUmVzZXQsXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlICAgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBDb25uZWN0RGF0YUZldGNoZXIgICAgICAgICAgICAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgY3VzdG9tZXJzICAgICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9jdXN0b21lcnMnXG5pbXBvcnQgICAgICBOYXZTZWNvbmRhcnkgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL25hdi9zZWNvbmRhcnknXG5pbXBvcnQgeyAgICBCdXR0b25TdWJtaXQgICAgICAgfSAgICAgICAgICAgIGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCAgICAgIFNldHRpbmdGb3JtICAgICAgICwgeyBGT1JNX0lEIH0gZnJvbSAnLi9zZXR0aW5ncydcblxuZnVuY3Rpb24gRWRpdFByb2ZpbGUoIHByb3BzICkge1xuICBjb25zdCB0aXRsZVByb3BzICA9IHsgaWQ6YHBhZ2Uuc2V0dGluZ3NgIH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPEJ1dHRvblN1Ym1pdFxuICAgICAgICAgIGZvcm1JZD17IEZPUk1fSUQgfVxuICAgICAgICAgIGlzU2F2aW5nPXsgcHJvcHMuaXNTYXZpbmcgfVxuICAgICAgICAgIGxhYmVsPVwiY29uZmlndXJhdGlvbi5idXR0b24uc2F2ZVwiXG4gICAgICAgIC8+XG4gICAgICA8L05hdlNlY29uZGFyeT5cbiAgICAgIDxTZXR0aW5nRm9ybSB7Li4ucHJvcHN9IC8+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHtcbiAgICBpc1NhdmluZzogc3RhdGUuYWNjb3VudC5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogRWRpdFByb2ZpbGUsXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gIF0sXG59KSApXG5cblxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuXG5pbXBvcnQgKiBhcyBhY2NvdW50ICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9hY2NvdW50J1xuaW1wb3J0IHsgICAgRm9ybSAgICAgICAgICAgIH0gZnJvbSAnLi4vdWkvZm9ybSdcbmltcG9ydCAgICAgIFNldHRpbmdGb3JtUHJlcyAgIGZyb20gJy4vc2V0dGluZ3MucHJlcydcblxuZXhwb3J0IGNvbnN0IEZPUk1fSUQgICAgPSBgc2V0dGluZy1mb3JtYFxuXG5jbGFzcyBTZXR0aW5nRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZvcm1EYXRhOiB0aGlzLnByb3BzLnVzZXIsXG4gICAgfVxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVGb3JtQ2hhbmdlID0gdGhpcy5oYW5kbGVGb3JtQ2hhbmdlLmJpbmQoIHRoaXMgKVxuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyggbmV4dFByb3BzLCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc3QgICB1c2VyICAgICAgID0gcHJldlN0YXRlLmZvcm1EYXRhXG4gICAgY29uc3QgICBuZXh0ICAgICAgID0gbmV4dFByb3BzLnVzZXJcbiAgICBjb25zdCB7IGlzU2F2aW5nIH0gPSBuZXh0UHJvcHNcbiAgICBpZiAoIGlzU2F2aW5nICkgcmV0dXJuIG51bGxcbiAgICAvLyB1cGRhdGUgc3RhdGUgb24gcmVkdXggc3RhdHVzIGNoYW5nZVxuICAgIGlmICh1c2VyID09PSBuZXh0KSByZXR1cm4gbnVsbFxuICAgIHJldHVybiB7IGZvcm1EYXRhOiBuZXh0IH1cbiAgfVxuXG4gIC8vLS0tLS0gRVZFTlRTXG5cbiAgaGFuZGxlU3VibWl0KCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgYm9keSA9IHNlcmlhbGl6ZSggZXZlbnQudGFyZ2V0LCB7IGhhc2g6IHRydWUsIGVtcHR5OiB0cnVlIH0gKVxuICAgIHRoaXMucHJvcHMudXBkYXRlU2V0dGluZ3MoeyBib2R5IH0pXG4gIH1cbiAgaGFuZGxlRm9ybUNoYW5nZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gdGFyZ2V0XG5cbiAgICB0aGlzLnNldFN0YXRlKCBwcmV2U3RhdGUgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlZCA9IHByZXZTdGF0ZS5mb3JtRGF0YS5zZXQoIG5hbWUsIHZhbHVlIClcbiAgICAgIHJldHVybiB7IGZvcm1EYXRhOiB1cGRhdGVkIH1cbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLSBSRU5ERVJcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBmb3JtRGF0YSB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IHsgaXNTYXZpbmcgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IHJlbmRlclByb3BzID0geyBmb3JtRGF0YSB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZvcm1cbiAgICAgICAgaWQ9eyBgJHtGT1JNX0lEfWAgfVxuICAgICAgICBhY3Rpb249eyBgL2FjY291bnQvc2V0dGluZ3NgIH1cbiAgICAgICAgaXNTYXZpbmc9eyBpc1NhdmluZyB9XG4gICAgICAgIG9uQ2hhbmdlPXsgdGhpcy5oYW5kbGVGb3JtQ2hhbmdlIH1cbiAgICAgICAgb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pdCB9XG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgICAgIG5hbWU9XCJpZFwiXG4gICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5nZXQoYGlkYCkgfVxuICAgICAgICAvPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICBuYW1lPVwicXVvdGF0aW9uQ29uZmlnW2lkXVwiXG4gICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5nZXQoYHF1b3RhdGlvbkNvbmZpZy5pZGApIH1cbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgbmFtZT1cImludm9pY2VDb25maWdbaWRdXCJcbiAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLmdldChgaW52b2ljZUNvbmZpZy5pZGApIH1cbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgbmFtZT1cInByb2R1Y3RDb25maWdbaWRdXCJcbiAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLmdldChgcHJvZHVjdENvbmZpZy5pZGApIH1cbiAgICAgICAgLz5cbiAgICAgICAgPFNldHRpbmdGb3JtUHJlcyB7Li4ucmVuZGVyUHJvcHN9IC8+XG4gICAgICA8L0Zvcm0+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3BzKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHtcbiAgICB1c2VyICAgICA6IHN0YXRlLmFjY291bnQuZ2V0KGB1c2VyYCAgICApLFxuICAgIGlzU2F2aW5nIDogc3RhdGUuYWNjb3VudC5nZXQoYGlzU2F2aW5nYCksXG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2gycHJvcHMgKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgdXBkYXRlU2V0dGluZ3M6IGFjY291bnQudXBkYXRlU2V0dGluZ3MsXG4gIH0sIGRpc3BhdGNoIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcHMsIGRpc3BhdGNoMnByb3BzICkoIFNldHRpbmdGb3JtIClcbiIsImltcG9ydCAgICAgIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgICAgY3JpbyAgZnJvbSAnY3JpbydcbmltcG9ydCAqIGFzIEludGwgIGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAqIGFzIGNvbXB1dGUgICAgICAgIGZyb20gJy4uL3V0aWxzL2NvbXB1dGUtdG90YWwnXG5pbXBvcnQgKiBhcyBQYXBlciAgICAgICAgICBmcm9tICcuLi9sYXlvdXQvcGFwZXItc2hlZXQnXG5pbXBvcnQgKiBhcyBUYWJzICAgICAgICAgICBmcm9tICcuLi91aS90YWJzJ1xuaW1wb3J0ICogYXMgRmllbGQgICAgICAgICAgZnJvbSAnLi4vdWkvZmllbGQnXG5pbXBvcnQgeyAgICBBbGVydCAgICAgICAgfSBmcm9tICcuLi91aS9hbGVydHMnXG5pbXBvcnQgeyAgICBCdXR0b24gICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0IHsgICAgRm9ybUFjdGlvbnMgIH0gZnJvbSAnLi4vdWkvZm9ybSdcbmltcG9ydCB7ICAgIFByb2R1Y3RUYWJsZSB9IGZyb20gJy4uL3VpLXRhYmxlL3Byb2R1Y3RzJ1xuXG5pbXBvcnQgJy4vc2V0dGluZ3MucHJlcy5zY3NzJ1xuZXhwb3J0IGNvbnN0IEJBU0VfQ0xBU1MgPSBgc2V0dGluZy1mb3JtYFxuZXhwb3J0IGNvbnN0IEZPUk1fSUQgICAgPSBCQVNFX0NMQVNTXG5cbmNvbnN0IGN1c3RvbWVyRXhhbXBsZSA9IHtcbiAgbmFtZTogYEN1c3RvbWVyIG5hbWVgLFxuICBhZGRyZXNzOiBgMTIzIDZ0aCBTdC5cbl9fTWVsYm91cm5lLCBGTCAzMjkwNF9fXG5BVVNUUkFMSUFgXG59XG5jb25zdCBjdXJyZW5jaWVzID0gW1xuICB7dmFsdWU6IGBVU0RgLCBsYWJlbDogYFVTRGB9LFxuICB7dmFsdWU6IGBFVVJgLCBsYWJlbDogYEVVUmB9LFxuXVxuY29uc3QgbGFuZ3VhZ2VzID0gW1xuICB7dmFsdWU6IGBmcmAsIGxhYmVsOiBgZnJhbsOnYWlzYH0sXG4gIHt2YWx1ZTogYGVuYCwgbGFiZWw6IGBlbmdsaXNoYH0sXG5dXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNldHRpbmdGb3JtUHJlcyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgZm9ybURhdGEgIH0gPSBwcm9wc1xuICBjb25zdCB7XG4gICAgcXVvdGF0aW9uQ29uZmlnLFxuICAgIGludm9pY2VDb25maWcsXG4gICAgcHJvZHVjdENvbmZpZyxcbiAgfSA9IGZvcm1EYXRhXG4gIGNvbnN0IGZha2VRdW90YXRpb25SZWZlcmVuY2UgPSB7XG4gICAgdHlwZTogYHF1b3RhdGlvbmAsXG4gICAgcHJvZHVjdDoge1xuICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCksXG4gICAgICByZWZlcmVuY2U6IGAke3F1b3RhdGlvbkNvbmZpZy5wcmVmaXh9JHtxdW90YXRpb25Db25maWcuc3RhcnRBdH1gLFxuICAgIH0sXG4gIH1cbiAgY29uc3QgZmFrZUludm9pY2VSZWZlcmVuY2UgPSB7XG4gICAgdHlwZTogYGludm9pY2VgLFxuICAgIHByb2R1Y3Q6IHtcbiAgICAgIHVwZGF0ZWRBdDogbmV3IERhdGUoKS50b1VUQ1N0cmluZygpLFxuICAgICAgcmVmZXJlbmNlOiBgJHtpbnZvaWNlQ29uZmlnLnByZWZpeH0ke2ludm9pY2VDb25maWcuc3RhcnRBdH1gLFxuICAgIH0sXG4gIH1cblxuICBsZXQgZmFrZURvY3VtZW50ID0gY3Jpbyh7XG4gICAgcHJvZHVjdHM6IFt7XG4gICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246IGBhIF9fcHJvZHVjdF9fIGV4YW1wbGVgLFxuICAgICAgcXVhbnRpdHk6IDIsXG4gICAgICBwcmljZTogcHJvZHVjdENvbmZpZy5wcmljZSxcbiAgICB9LHtcbiAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAuLi5wcm9kdWN0Q29uZmlnXG4gICAgfV0sXG4gICAgdGF4OiBxdW90YXRpb25Db25maWcudGF4LFxuXG4gIH0pXG4gIGZha2VEb2N1bWVudCA9IGZha2VEb2N1bWVudC5tZXJnZSggbnVsbCwgY29tcHV0ZS50b3RhbHMoZmFrZURvY3VtZW50KSApXG5cbiAgcmV0dXJuIChcbiAgICA8VGFicy5XcmFwcGVyPlxuICAgICAgPFRhYnMuTGlzdD5cbiAgICAgICAgPFRhYnMuVGFiPlxuICAgICAgICAgIDxJbnRsLkZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJjb25maWd1cmF0aW9uLnRhYi5mcm9tXCIgLz5cbiAgICAgICAgPC9UYWJzLlRhYj5cbiAgICAgICAgPFRhYnMuVGFiPlxuICAgICAgICAgIDxJbnRsLkZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJjb25maWd1cmF0aW9uLnRhYi5kZWZhdWx0LXByb2R1Y3RcIiAvPlxuICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgPEludGwuRm9ybWF0dGVkTWVzc2FnZSBpZD1cImNvbmZpZ3VyYXRpb24udGFiLm1lbnRpb25zXCIgLz5cbiAgICAgICAgPC9UYWJzLlRhYj5cbiAgICAgICAgPFRhYnMuVGFiPlxuICAgICAgICAgIDxJbnRsLkZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJjb25maWd1cmF0aW9uLnRhYi5yZWZlcmVuY2VcIiAvPlxuICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgPC9UYWJzLkxpc3Q+XG5cbiAgICAgIHsvKiBVU0VSICovfVxuICAgICAgPFRhYnMuUGFuZWw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fdXNlcmB9PlxuICAgICAgICAgIDxGaWVsZC5TZWxlY3RcbiAgICAgICAgICAgIG5hbWU9XCJsYW5nXCJcbiAgICAgICAgICAgIGxhYmVsPVwiZmllbGQubGFuZ3VhZ2VcIlxuICAgICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5sYW5nIH1cbiAgICAgICAgICAgIG9wdGlvbnM9eyBsYW5ndWFnZXMgfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEZpZWxkLlNlbGVjdFxuICAgICAgICAgICAgbmFtZT1cImN1cnJlbmN5XCJcbiAgICAgICAgICAgIGxhYmVsPVwiZmllbGQuY3VycmVuY3lcIlxuICAgICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5jdXJyZW5jeSB9XG4gICAgICAgICAgICBvcHRpb25zPXsgY3VycmVuY2llcyB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UGFwZXIuU2hlZXQgcGFydD1cInRvcC1sZWZ0XCI+XG4gICAgICAgICAgICA8UGFwZXIuUGFydHkgdGl0bGU9XCJmcm9tXCIgcGVvcGxlPXtmb3JtRGF0YX0gLz5cbiAgICAgICAgICA8L1BhcGVyLlNoZWV0PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fdXNlci1mb3JtYH0+XG4gICAgICAgICAgICA8RmllbGQuSW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLm5hbWVcIlxuICAgICAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLm5hbWUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGaWVsZC5UZXh0YXJlYVxuICAgICAgICAgICAgICBuYW1lPVwiYWRkcmVzc1wiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQuYWRkcmVzc1wiXG4gICAgICAgICAgICAgIHZhbHVlPXsgZm9ybURhdGEuYWRkcmVzcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvVGFicy5QYW5lbD5cblxuICAgICAgey8qIFBST0RVQ1QgKi99XG4gICAgICA8VGFicy5QYW5lbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19wcm9kdWN0YH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19wcm9kdWN0LWZvcm1gfT5cbiAgICAgICAgICAgIDxGaWVsZC5JbnB1dFxuICAgICAgICAgICAgICBuYW1lPVwicHJvZHVjdENvbmZpZ1txdWFudGl0eV1cIlxuICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLnF1YW50aXR5XCJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIHZhbHVlPXsgcHJvZHVjdENvbmZpZy5xdWFudGl0eSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEZpZWxkLklucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJwcm9kdWN0Q29uZmlnW3ByaWNlXVwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQuZGVmYXVsdC1wcmljZVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICB2YWx1ZT17IHByb2R1Y3RDb25maWcucHJpY2UgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxGaWVsZC5JbnB1dFxuICAgICAgICAgICAgICBuYW1lPVwicXVvdGF0aW9uQ29uZmlnW3RheF1cIlxuICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLnRheFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICB2YWx1ZT17IHF1b3RhdGlvbkNvbmZpZy50YXggfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8UHJvZHVjdFRhYmxlXG4gICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgZG9jdW1lbnQ9eyBmYWtlRG9jdW1lbnQgfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9UYWJzLlBhbmVsPlxuXG4gICAgICB7LyogTUVOVElPTlMgKi99XG4gICAgICA8VGFicy5QYW5lbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19tZW50aW9uc2B9PlxuICAgICAgICAgIDxGaWVsZC5UZXh0YXJlYVxuICAgICAgICAgICAgbmFtZT1cInF1b3RhdGlvbkNvbmZpZ1ttZW50aW9uc11cIlxuICAgICAgICAgICAgbGFiZWw9XCJjb25maWd1cmF0aW9uLm1lbnRpb25zLnF1b3RhdGlvbnNcIlxuICAgICAgICAgICAgdmFsdWU9eyBxdW90YXRpb25Db25maWcubWVudGlvbnMgfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFBhcGVyLlNoZWV0IHBhcnQ9XCJib3R0b21cIj5cbiAgICAgICAgICAgIDxQYXBlci5NZW50aW9ucyBjb250ZW50PXsgcXVvdGF0aW9uQ29uZmlnLm1lbnRpb25zIH0vPlxuICAgICAgICAgIDwvUGFwZXIuU2hlZXQ+XG4gICAgICAgICAgPEZpZWxkLlRleHRhcmVhXG4gICAgICAgICAgICBuYW1lPVwiaW52b2ljZUNvbmZpZ1ttZW50aW9uc11cIlxuICAgICAgICAgICAgbGFiZWw9XCJjb25maWd1cmF0aW9uLm1lbnRpb25zLmludm9pY2VzXCJcbiAgICAgICAgICAgIHZhbHVlPXsgaW52b2ljZUNvbmZpZy5tZW50aW9ucyB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UGFwZXIuU2hlZXQgcGFydD1cImJvdHRvbVwiPlxuICAgICAgICAgICAgPFBhcGVyLk1lbnRpb25zIGNvbnRlbnQ9eyBpbnZvaWNlQ29uZmlnLm1lbnRpb25zIH0vPlxuICAgICAgICAgIDwvUGFwZXIuU2hlZXQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9UYWJzLlBhbmVsPlxuXG4gICAgICB7LyogUkVGRVJFTkNFUyAqL31cbiAgICAgIDxUYWJzLlBhbmVsPlxuICAgICAgICA8QWxlcnQgZGFuZ2VyPlxuICAgICAgICAgIDxJbnRsLkZvcm1hdHRlZEhUTUxNZXNzYWdlIGlkPVwiY29uZmlndXJhdGlvbi5yZWZlcmVuY2Uud2FybmluZ1wiIC8+XG4gICAgICAgIDwvQWxlcnQ+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcmVmZXJlbmNlc2B9PlxuICAgICAgICAgIDxkbCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19yZWZlcmVuY2VzLXNlY3Rpb25gfT5cbiAgICAgICAgICAgIDxkdCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19zdWItdGl0bGVgfT5cbiAgICAgICAgICAgICAgPEludGwuRm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UucXVvdGF0aW9uc1wiIC8+XG4gICAgICAgICAgICA8L2R0PlxuICAgICAgICAgICAgPGRkIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3JlZmVyZW5jZXMtY29udGVudGB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3JlZmVyZW5jZXMtZm9ybWB9PlxuICAgICAgICAgICAgICAgIDxGaWVsZC5JbnB1dFxuICAgICAgICAgICAgICAgICAgbmFtZT1cInF1b3RhdGlvbkNvbmZpZ1twcmVmaXhdXCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQucHJlZml4XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXsgcXVvdGF0aW9uQ29uZmlnLnByZWZpeCB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8RmllbGQuSW5wdXRcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJxdW90YXRpb25Db25maWdbc3RhcnRBdF1cIlxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJmaWVsZC5zdGFydC1hdFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17IHF1b3RhdGlvbkNvbmZpZy5zdGFydEF0IH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxQYXBlci5TaGVldCBwYXJ0PVwidG9wLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPFBhcGVyLlJlZmVyZW5jZSB7Li4uZmFrZVF1b3RhdGlvblJlZmVyZW5jZX0gLz5cbiAgICAgICAgICAgICAgPC9QYXBlci5TaGVldD5cbiAgICAgICAgICAgIDwvZGQ+XG4gICAgICAgICAgPC9kbD5cbiAgICAgICAgICA8ZGwgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcmVmZXJlbmNlcy1zZWN0aW9uYH0+XG4gICAgICAgICAgICA8ZHQgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fc3ViLXRpdGxlYH0+XG4gICAgICAgICAgICAgIDxJbnRsLkZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmludm9pY2VzXCIgLz5cbiAgICAgICAgICAgIDwvZHQ+XG4gICAgICAgICAgICA8ZGQgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcmVmZXJlbmNlcy1jb250ZW50YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcmVmZXJlbmNlcy1mb3JtYH0+XG4gICAgICAgICAgICAgICAgPEZpZWxkLklucHV0XG4gICAgICAgICAgICAgICAgICBuYW1lPVwiaW52b2ljZUNvbmZpZ1twcmVmaXhdXCJcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQucHJlZml4XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXsgaW52b2ljZUNvbmZpZy5wcmVmaXggfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZpZWxkLklucHV0XG4gICAgICAgICAgICAgICAgICBuYW1lPVwiaW52b2ljZUNvbmZpZ1tzdGFydEF0XVwiXG4gICAgICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLnN0YXJ0LWF0XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXsgaW52b2ljZUNvbmZpZy5zdGFydEF0IH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxQYXBlci5TaGVldCBwYXJ0PVwidG9wLXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPFBhcGVyLlJlZmVyZW5jZSB7Li4uZmFrZUludm9pY2VSZWZlcmVuY2V9IC8+XG4gICAgICAgICAgICAgIDwvUGFwZXIuU2hlZXQ+XG4gICAgICAgICAgICA8L2RkPlxuICAgICAgICAgIDwvZGw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9UYWJzLlBhbmVsPlxuXG4gICAgICB7LyogQUNUSU9OUyAqL31cbiAgICAgIDxGb3JtQWN0aW9ucz5cbiAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgPEludGwuRm9ybWF0dGVkTWVzc2FnZSBpZD1cImNvbmZpZ3VyYXRpb24uYnV0dG9uLnNhdmVcIiAvPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvRm9ybUFjdGlvbnM+XG4gICAgPC9UYWJzLldyYXBwZXI+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBDb25uZWN0RGF0YUZldGNoZXIgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBpbnZvaWNlcyAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvaW52b2ljZXMnXG5cbmltcG9ydCB7ICAgIE5hdlNlY29uZGFyeSAgfSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0ICogYXMgTmF2QnV0dG9ucyAgICAgIGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCAqIGFzIE1haW4gICAgICAgICAgICBmcm9tICcuLi9sYXlvdXQvbWFpbidcbmltcG9ydCAqIGFzIFRhYnMgICAgICAgICAgICBmcm9tICcuLi91aS90YWJzJ1xuaW1wb3J0IHsgICAgUHJvZ3Jlc3MgICAgICB9IGZyb20gJy4uL3VpL3Byb2dyZXNzJ1xuaW1wb3J0IHsgICAgUHJldmlldyAgICAgICB9IGZyb20gJy4uL3VpL3ByZXZpZXcnXG5pbXBvcnQgeyAgICBJbnZvaWNlSGVhZGVyIH0gZnJvbSAnLi4vaW52b2ljZXMvaGVhZGVyJ1xuaW1wb3J0IHsgICAgSW52b2ljZUV2ZW50cyB9IGZyb20gJy4uL2ludm9pY2VzL2V2ZW50cy10YWJsZSdcbmltcG9ydCAqIGFzIEV2ZW50cyAgICAgICAgICBmcm9tICcuLi9pbnZvaWNlcy9ldmVudHMtcmVhZC1vbmx5J1xuXG5mdW5jdGlvbiBTaG93QXJjaGl2ZWRJbnZvaWNlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpbnZvaWNlIH0gPSBwcm9wc1xuICBjb25zdCBwYXltZW50cyAgICA9IGludm9pY2UuZ2V0KCBgcGF5bWVudHNgIClcbiAgY29uc3QgdGl0bGVQcm9wcyA9IHsgaWQ6IGBwYWdlLmFyY2hpdmVkYCB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICB7LyogaHR0cHM6Ly9naXRodWIuY29tL25mbC9yZWFjdC1oZWxtZXQvaXNzdWVzLzI2OCNpc3N1ZWNvbW1lbnQtMzY4MTQ4MjQ5ICovfVxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IChcbiAgICAgICAgICA8SGVsbWV0PlxuICAgICAgICAgICAgPHRpdGxlPnt0aXRsZX08L3RpdGxlPlxuICAgICAgICAgICAgPGh0bWwgY2xhc3NOYW1lPVwibGlnaHQtYmFja2dyb3VuZFwiIC8+XG4gICAgICAgICAgPC9IZWxtZXQ+XG4gICAgICAgICl9XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPE5hdkJ1dHRvbnMuTmV3IHR5cGU9XCJxdW90YXRpb25zXCIgbWVzc2FnZT1cInF1b3RhdGlvbi5idXR0b24ubmV3XCIgLz5cbiAgICAgICAgPE5hdkJ1dHRvbnMuUHJpbnQgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuICAgICAgPFRhYnMuV3JhcHBlcj5cbiAgICAgICAgPFRhYnMuTGlzdD5cbiAgICAgICAgICA8VGFicy5IZWFkZXI+XG4gICAgICAgICAgICA8SW52b2ljZUhlYWRlciBpbnZvaWNlPXsgaW52b2ljZSB9IC8+XG4gICAgICAgICAgPC9UYWJzLkhlYWRlcj5cbiAgICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLnRhYi5wYXltZW50c1wiIC8+XG4gICAgICAgICAgPC9UYWJzLlRhYj5cbiAgICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLnRhYi5wcmV2aWV3XCIgLz5cbiAgICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgICA8L1RhYnMuTGlzdD5cblxuICAgICAgICB7LyogUEFZTUVOVFMgKi99XG4gICAgICAgIDxUYWJzLlBhbmVsPlxuICAgICAgICAgIDxQcm9ncmVzc1xuICAgICAgICAgICAgbWF4PXsgICBpbnZvaWNlLmdldChgdG90YWxgKSB9XG4gICAgICAgICAgICB2YWx1ZT17IGludm9pY2UuZ2V0KGB0b3RhbFBhaWRgKSB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8SW52b2ljZUV2ZW50c1xuICAgICAgICAgICAgaW52b2ljZT17IGludm9pY2UgfVxuICAgICAgICAgICAgaGlkZUNvbHVtbnM9e1tgYWN0aW9uYF19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEV2ZW50cy5TZW50XG4gICAgICAgICAgICAgIGludm9pY2U9eyBpbnZvaWNlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7IHBheW1lbnRzLm1hcCgocGF5bWVudCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPEV2ZW50cy5QYXltZW50XG4gICAgICAgICAgICAgICAga2V5PXsgcGF5bWVudC5faWQgfVxuICAgICAgICAgICAgICAgIHBheW1lbnQ9eyBwYXltZW50IH1cbiAgICAgICAgICAgICAgICBjb3VudD17IGluZGV4ICsgMSB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0ludm9pY2VFdmVudHM+XG4gICAgICAgIDwvVGFicy5QYW5lbD5cblxuICAgICAgICB7LyogUFJFVklFVyAqL31cbiAgICAgICAgPFRhYnMuUGFuZWw+XG4gICAgICAgICAgPFByZXZpZXcgdHlwZT1cImludm9pY2VcIiBkb2N1bWVudD17IGludm9pY2UgfSAvPlxuICAgICAgICA8L1RhYnMuUGFuZWw+XG4gICAgICA8L1RhYnMuV3JhcHBlcj5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7XG4gICAgaW52b2ljZTogc3RhdGUuaW52b2ljZXMuZ2V0KGBjdXJyZW50YCksXG4gIH0pXG4pKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IFNob3dBcmNoaXZlZEludm9pY2UsXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gICAgaW52b2ljZXMuZ2V0T25lLFxuICBdLFxufSkgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgICAgICAgICBmcm9tICcuLi9kdWNrcy9xdW90YXRpb25zJ1xuaW1wb3J0ICogYXMgaW52b2ljZXMgICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuXG5pbXBvcnQgeyBOYXZTZWNvbmRhcnkgICAgICAgICAgIH0gZnJvbSAnLi4vbmF2L3NlY29uZGFyeSdcbmltcG9ydCB7IEJ1dHRvbk5ldyAgICAgICAgICAgICAgfSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5LWJ1dHRvbnMnXG5pbXBvcnQgeyBNYWluICAgICAgICAgLCBDb250ZW50IH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgeyBBcmNoaXZlZFF1b3RhdGlvbnMgICAgIH0gZnJvbSAnLi4vcXVvdGF0aW9ucy9saXN0J1xuaW1wb3J0IHsgQXJjaGl2ZWRJbnZvaWNlcyAgICAgICB9IGZyb20gJy4uL2ludm9pY2VzL2xpc3QnXG5cbmZ1bmN0aW9uIEFyY2hpdmVkTGlzdCggcHJvcHMgKSB7XG4gIGNvbnN0IHRpdGxlUHJvcHMgPSB7IGlkOiBgcGFnZS5hcmNoaXZlZGAgfVxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIHsvKiBodHRwczovL2dpdGh1Yi5jb20vbmZsL3JlYWN0LWhlbG1ldC9pc3N1ZXMvMjY4I2lzc3VlY29tbWVudC0zNjgxNDgyNDkgKi99XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25OZXcgdHlwZT1cInF1b3RhdGlvbnNcIiBtZXNzYWdlPVwicXVvdGF0aW9uLmJ1dHRvbi5uZXdcIiAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8TWFpbj5cbiAgICAgICAgPENvbnRlbnQ+XG4gICAgICAgICAgPEFyY2hpdmVkUXVvdGF0aW9ucyB0aXRsZT1cInBhZ2UucXVvdGF0aW9uc1wiIC8+XG4gICAgICAgICAgPEFyY2hpdmVkSW52b2ljZXMgICB0aXRsZT1cInBhZ2UuaW52b2ljZXNcIiAgIC8+XG4gICAgICAgIDwvQ29udGVudD5cbiAgICAgIDwvTWFpbj5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4pKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IEFyY2hpdmVkTGlzdCxcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBxdW90YXRpb25zLmxpc3RBcmNoaXZlZCxcbiAgICBpbnZvaWNlcy5saXN0QXJjaGl2ZWQsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICAgICAgIGZyb20gJy4uL2R1Y2tzL3F1b3RhdGlvbnMnXG5pbXBvcnQgeyAgICBOYXZTZWNvbmRhcnkgfSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0ICogYXMgTmF2QnV0dG9ucyAgICAgZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0ICogYXMgTGF5b3V0TWFpbiAgICAgZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgeyAgICBQcmV2aWV3ICAgICAgfSBmcm9tICcuLi91aS9wcmV2aWV3J1xuaW1wb3J0ICogYXMgS2V5UHJlcyAgICAgICAgZnJvbSAnLi4vdWkva2V5LXByZXNlbnRhdGlvbidcbmltcG9ydCAqIGFzIEZvcm1hdCAgICAgICAgIGZyb20gJy4uL3VpL2Zvcm1hdCdcblxuZnVuY3Rpb24gU2hvd0FyY2hpdmVkUXVvdGF0aW9uKCBwcm9wcyApIHtcbiAgY29uc3QgeyBxdW90YXRpb24gfSA9IHByb3BzXG4gIGNvbnN0IHRpdGxlUHJvcHMgPSB7IGlkOiBgcGFnZS5hcmNoaXZlZGAgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgey8qIGh0dHBzOi8vZ2l0aHViLmNvbS9uZmwvcmVhY3QtaGVsbWV0L2lzc3Vlcy8yNjgjaXNzdWVjb21tZW50LTM2ODE0ODI0OSAqL31cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiAoXG4gICAgICAgICAgPEhlbG1ldD5cbiAgICAgICAgICAgIDx0aXRsZT57dGl0bGV9PC90aXRsZT5cbiAgICAgICAgICAgIDxodG1sIGNsYXNzTmFtZT1cImxpZ2h0LWJhY2tncm91bmRcIiAvPlxuICAgICAgICAgIDwvSGVsbWV0PlxuICAgICAgICApfVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuXG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPE5hdkJ1dHRvbnMuTmV3IHR5cGU9XCJxdW90YXRpb25zXCIgbWVzc2FnZT1cInF1b3RhdGlvbi5idXR0b24ubmV3XCIgLz5cbiAgICAgICAgPE5hdkJ1dHRvbnMuUHJpbnQgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuXG4gICAgICA8TGF5b3V0TWFpbi5XcmFwcGVyPlxuXG4gICAgICAgIDxMYXlvdXRNYWluLk1ldGE+XG4gICAgICAgICAgPEtleVByZXMuV3JhcHBlcj5cbiAgICAgICAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwia2V5LXByZXMuY3VzdG9tZXJcIiAvPlxuICAgICAgICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgICAgICAgIDxMaW5rIHRvPXtgL2N1c3RvbWVycy8ke3F1b3RhdGlvbi5nZXQoYGN1c3RvbWVySWRgKX1gfT5cbiAgICAgICAgICAgICAgICB7IHF1b3RhdGlvbi5nZXQoIGBjdXN0b21lci5uYW1lYCApIH1cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgICAgICAge3F1b3RhdGlvbi5nZXQoYGludm9pY2VJZGApICYmIChcbiAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICAgICAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwia2V5LXByZXMuYXNzb2NpYXRlZC5pbnZvaWNlXCIgLz5cbiAgICAgICAgICAgICAgICA8S2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPXtgL2ludm9pY2VzLyR7cXVvdGF0aW9uLmdldChgaW52b2ljZUlkYCl9YH0+XG4gICAgICAgICAgICAgICAgICAgIHsgcXVvdGF0aW9uLmdldCggYGludm9pY2UucmVmZXJlbmNlYCApIH1cbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L0tleVByZXMuVmFsdWU+XG4gICAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJrZXktcHJlcy5zZW50XCIgLz5cbiAgICAgICAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICAgICAgICA8Rm9ybWF0LkRheSB2YWx1ZT17cXVvdGF0aW9uLmdldChgc2VuZEF0YCl9IC8+XG4gICAgICAgICAgICA8L0tleVByZXMuVmFsdWU+XG4gICAgICAgICAgICA8S2V5UHJlcy5MYWJlbCBpZD1cImtleS1wcmVzLnZhbGlkYXRlZFwiIC8+XG4gICAgICAgICAgICA8S2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICAgICAgPEZvcm1hdC5EYXkgdmFsdWU9e3F1b3RhdGlvbi5nZXQoYHZhbGlkYXRlZEF0YCl9IC8+XG4gICAgICAgICAgICA8L0tleVByZXMuVmFsdWU+XG4gICAgICAgICAgICA8S2V5UHJlcy5MYWJlbCBpZD1cImtleS1wcmVzLnNpZ25lZFwiIC8+XG4gICAgICAgICAgICA8S2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICAgICAgPEZvcm1hdC5EYXkgdmFsdWU9e3F1b3RhdGlvbi5nZXQoYHNpZ25lZEF0YCl9IC8+XG4gICAgICAgICAgICA8L0tleVByZXMuVmFsdWU+XG4gICAgICAgICAgICA8S2V5UHJlcy5MYWJlbCBpZD1cImtleS1wcmVzLnRvdGFsXCIgLz5cbiAgICAgICAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICAgICAgICA8Rm9ybWF0LkFtb3VudCB2YWx1ZT17cXVvdGF0aW9uLmdldChgdG90YWxgKX0gLz5cbiAgICAgICAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgICA8L0tleVByZXMuV3JhcHBlcj5cbiAgICAgICAgPC9MYXlvdXRNYWluLk1ldGE+XG5cbiAgICAgICAgPExheW91dE1haW4uQ29udGVudD5cbiAgICAgICAgICA8UHJldmlldyB0eXBlPVwicXVvdGF0aW9uXCIgZG9jdW1lbnQ9eyBxdW90YXRpb24gfSAvPlxuICAgICAgICA8L0xheW91dE1haW4uQ29udGVudD5cblxuICAgICAgPC9MYXlvdXRNYWluLldyYXBwZXI+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7XG4gICAgcXVvdGF0aW9uOiBzdGF0ZS5xdW90YXRpb25zLmdldChgY3VycmVudGApLFxuICB9KVxuKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBTaG93QXJjaGl2ZWRRdW90YXRpb24sXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gICAgcXVvdGF0aW9ucy5nZXRPbmUsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbi8vIFByb3RlY3QgdGhlIHJvdXRlIGlmIEFVVEhFTlRJQ0FURVxuLy8g4oCiIHRoZSBvcHBvc2l0ZSBvZiBhdXRoZW50aWNhdGlvbi1yZXF1aXJlZCA7KVxuLy8g4oCiIGJhc2VkIG9uIGh0dHBzOi8vY3J5c2lzbGludXguY29tL2xpbWl0LWFjY2Vzcy10by1yZWR1eC1hcHBzLXdpdGgtaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvXG5cbmNvbnN0IFBSSVZBVEVfUk9PVCA9IGAvYFxuXG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRpb25Gb3JiaWRkZW4oIENvbXBvbmVudCApIHtcblxuICBmdW5jdGlvbiBBdXRoRm9yYmlkZGVuKCBwcm9wcyApIHtcbiAgICBjb25zdCB7IHN0YXRpY0NvbnRleHQgfSA9IHByb3BzXG5cbiAgICBpZiAoICFwcm9wcy5pc0F1dGhlbnRpY2F0ZWQgKSByZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9Lz5cblxuICAgIGlmICggc3RhdGljQ29udGV4dCApIHtcbiAgICAgIHN0YXRpY0NvbnRleHQuc3RhdHVzID0gMzAyXG4gICAgICBzdGF0aWNDb250ZXh0LnVybCA9IFBSSVZBVEVfUk9PVFxuICAgIH1cbiAgICByZXR1cm4gPFJlZGlyZWN0IHRvPXsgUFJJVkFURV9ST09UIH0gLz5cbiAgfVxuXG4gIC8vIEhvaXN0IOKAnENvbXBvbmVudC5mZXRjaERhdGHigJ1cbiAgLy8g4oCiIG5lZWRlZCBieSB0aGUgdGhlIHNlcnZlciB0byBmZXRjaCB0aGUgcmlnaHQgZGF0YVxuICBpZiAoIENvbXBvbmVudC5mZXRjaERhdGEgKSB7XG4gICAgQXV0aEZvcmJpZGRlbi5mZXRjaERhdGEgPSBDb21wb25lbnQuZmV0Y2hEYXRhXG4gIH1cblxuICBmdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBdXRoZW50aWNhdGVkOiAgc3RhdGUuYWNjb3VudC5nZXQoIGBpc0F1dGhlbnRpY2F0ZWRgICksXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbm5lY3QoIHN0YXRlMnByb3AgKSggQXV0aEZvcmJpZGRlbiApXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXV0aGVudGljYXRpb25Gb3JiaWRkZW5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuLy8gUHJvdGVjdCB0aGUgcm91dGUgaWYgTk9UIGF1dGhlbnRpY2F0ZVxuLy8g4oCiIGJhc2VkIG9uIGh0dHBzOi8vY3J5c2lzbGludXguY29tL2xpbWl0LWFjY2Vzcy10by1yZWR1eC1hcHBzLXdpdGgtaGlnaGVyLW9yZGVyLWNvbXBvbmVudHMvXG5cbmNvbnN0IFBVQkxJQ19ST09UID0gYC9hY2NvdW50L2xvZ2luYFxuXG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRpb25SZXF1aXJlZCggQ29tcG9uZW50ICkge1xuXG4gIC8vIFRPRE86IHNob3VsZG4ndCByZWRpcmVjdCBpZiBhbHJlYWR5IG9uIGxvZ2luIHBhZ2XigKZcblxuICBmdW5jdGlvbiBBdXRoUmVxdWlyZWQoIHByb3BzICkge1xuICAgIGNvbnN0IHsgc3RhdGljQ29udGV4dCB9ID0gcHJvcHNcblxuICAgIGlmICggcHJvcHMuaXNBdXRoZW50aWNhdGVkICkgcmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cbiAgICBpZiAoIHN0YXRpY0NvbnRleHQgKSB7XG4gICAgICBzdGF0aWNDb250ZXh0LnN0YXR1cyA9IDMwMlxuICAgICAgc3RhdGljQ29udGV4dC51cmwgPSBQVUJMSUNfUk9PVFxuICAgIH1cbiAgICByZXR1cm4gPFJlZGlyZWN0IHRvPXsgUFVCTElDX1JPT1QgfSAvPlxuICB9XG5cbiAgLy8gSG9pc3Qg4oCcQ29tcG9uZW50LmZldGNoRGF0YeKAnVxuICAvLyDigKIgbmVlZGVkIGJ5IHRoZSB0aGUgc2VydmVyIHRvIGZldGNoIHRoZSByaWdodCBkYXRhXG4gIGlmICggQ29tcG9uZW50LmZldGNoRGF0YSApIHtcbiAgICBBdXRoUmVxdWlyZWQuZmV0Y2hEYXRhID0gQ29tcG9uZW50LmZldGNoRGF0YVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQXV0aGVudGljYXRlZDogIHN0YXRlLmFjY291bnQuZ2V0KCBgaXNBdXRoZW50aWNhdGVkYCApLFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIEF1dGhSZXF1aXJlZCApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWRcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0ICogYXMgYWNjb3VudCBmcm9tICcuL2R1Y2tzL2FjY291bnQnXG5cbi8vIENvbm5lY3QgZGF0YSBmZXRjaGVyXG4vLyDigKIgd2UgbmVlZCB0byBjb2xsZWN0IGRhdGEgZm9yIHRoZSBjb21wb25lbnRzIHRvIHJlbmRlciBwcm9wZXJseVxuLy8gICDigKZib3RoIG9uIHRoZSBzZXJ2ZXIgYW5kIHRoZSBjbGllbnQgc2lkZVxuLy8g4oCiIHRoZSBzdGF0aWMg4oCcZmV0Y2hEYXRh4oCdIGlzIG1haW5seSBkZWRpY2F0ZWQgdG8gdGhlIHNlcnZlclxuLy8gICBidXQgd2UgYWxpYXMgaXQgZm9yIHRoZSBjbGllbnQgc2lkZSB3aXRoIF9mZXRjaERhdGFPbkNsaWVudCA6KVxuLy8g4oCiIEJVVCB3ZSBkb24ndCB3YW50IHRob3NlIGRhdGEgdG8gYmUgZmV0Y2ggYW5vdGhlciB0aW1lIG9uIGNsaWVudCBzaWRlIGluaXRpYWxpemF0aW9uXG4vLyAgIGhlbmNlIHRoZSBJU19GSVJTVF9NT1VOVF9BRlRFUl9MT0FEXG4vLyDigKLCoGNvbWluZyBmcm9tOlxuLy8gICBodHRwczovL3JlYWN0anNuZXdzLmNvbS9pc29tb3JwaGljLXJlYWN0LWluLXJlYWwtbGlmZSNkYXRhLWZldGNoaW5nXG5cbmxldCBJU19GSVJTVF9NT1VOVF9BRlRFUl9MT0FEID0gdHJ1ZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25uZWN0RGF0YUZldGNoZXJzKHtDb21wb25lbnQsIGFjdGlvbkNyZWF0b3JzfSkge1xuXG4gIC8vIGJlIHN1cmUgd2UgaGF2ZSBhbiBhcnJheSB0byBiZWdpbiB3aXRoXG4gIGFjdGlvbkNyZWF0b3JzID0gQXJyYXkuaXNBcnJheSggYWN0aW9uQ3JlYXRvcnMgKSA/IGFjdGlvbkNyZWF0b3JzXG4gICAgOiBbIGFjdGlvbkNyZWF0b3JzIF1cbiAgLy8gYWx3YXlzIHF1ZXJ5IHRoZSBhdXRoZW50aWNhdGlvblxuICBhY3Rpb25DcmVhdG9ycy51bnNoaWZ0KCBhY2NvdW50LmF1dGggKVxuXG4gIHJldHVybiBjbGFzcyBEYXRhRmV0Y2hlcnNXcmFwcGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIC8vIERvbid0IHBhc3MgdGhlIGZ1bGwgc3RvcmVcbiAgICAvLyDigKIgcGFzc2luZyBvbmx5IGRpc3BhdGNoIHdpbGwgbWFrZSBzZXJ2ZXIgJiBjbGllbnQgaXNvIGluIHdoYXQgdGhleSBnZXRcbiAgICBzdGF0aWMgZmV0Y2hEYXRhKCB7ZGlzcGF0Y2gsIHBhcmFtcyA9IHt9LCBxdWVyeSA9IHt9LCBjb29raWUgfSApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgYWN0aW9uQ3JlYXRvcnMubWFwKCBhY3Rpb25DcmVhdG9yID0+IHtcbiAgICAgICAgICByZXR1cm4gZGlzcGF0Y2goIGFjdGlvbkNyZWF0b3IocGFyYW1zLCBjb29raWUpIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoIHByZXZQcm9wcyApIHtcbiAgICAgIGNvbnN0IHsgbG9jYXRpb24gfSA9IHRoaXMucHJvcHNcbiAgICAgIGNvbnN0IHsgbG9jYXRpb246IHByZXZMb2NhdGlvbiB9ID0gcHJldlByb3BzXG5cbiAgICAgIGNvbnN0IGlzVXJsQ2hhbmdlZCA9IChsb2NhdGlvbi5wYXRobmFtZSAhPT0gcHJldkxvY2F0aW9uLnBhdGhuYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgKGxvY2F0aW9uLnNlYXJjaCAhPT0gcHJldkxvY2F0aW9uLnNlYXJjaClcblxuICAgICAgaWYgKCBpc1VybENoYW5nZWQgKSB0aGlzLl9mZXRjaERhdGFPbkNsaWVudCgpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBpZiAoICFJU19GSVJTVF9NT1VOVF9BRlRFUl9MT0FEICkgcmV0dXJuIHRoaXMuX2ZldGNoRGF0YU9uQ2xpZW50KClcbiAgICAgIElTX0ZJUlNUX01PVU5UX0FGVEVSX0xPQUQgPSBmYWxzZVxuICAgIH1cblxuICAgIF9mZXRjaERhdGFPbkNsaWVudCgpIHtcbiAgICAgIGNvbnN0IHsgcGFyYW1zIH0gPSB0aGlzLnByb3BzLm1hdGNoXG4gICAgICBEYXRhRmV0Y2hlcnNXcmFwcGVyLmZldGNoRGF0YSh7XG4gICAgICAgIGRpc3BhdGNoOiB0aGlzLnByb3BzLmRpc3BhdGNoLFxuICAgICAgICBwYXJhbXMsXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiA8Q29tcG9uZW50IHsuLi50aGlzLnByb3BzfSAvPlxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuXG5pbXBvcnQgKiBhcyBjdXN0b21lcnMgICAgIGZyb20gJy4uL2R1Y2tzL2N1c3RvbWVycydcbmltcG9ydCAqIGFzIHJlZGlyZWN0aW9uICAgZnJvbSAnLi4vdXRpbHMvY2hlY2stcmVkaXJlY3Rpb24nXG5pbXBvcnQgICAgICBTcGlubmVyICAgICAgIGZyb20gJy4uL3VpL3NwaW5uZXInXG5pbXBvcnQgeyAgICBGb3JtICAgICAgICB9IGZyb20gJy4uL3VpL2Zvcm0nXG5cbmV4cG9ydCBjb25zdCBGT1JNX0lEID0gYGN1c3RvbWVyLWZvcm1gXG5cbmV4cG9ydCBjb25zdCBGb3JtQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoe30pXG5cbmNsYXNzIEN1c3RvbWVyRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZvcm1EYXRhOiB0aGlzLnByb3BzLmN1c3RvbWVyLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UgPSB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UuYmluZCh0aGlzKVxuICB9XG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoIG5leHRQcm9wcywgcHJldlN0YXRlICkge1xuICAgIGNvbnN0ICAgbmV4dCAgICAgICAgICAgICAgICA9IG5leHRQcm9wcy5jdXN0b21lclxuICAgIGNvbnN0ICAgY3VycmVudCAgICAgICAgICAgICA9IHByZXZTdGF0ZS5mb3JtRGF0YVxuICAgIGNvbnN0IHsgaXNTYXZpbmcsIGhpc3RvcnksIHN0YXRpY0NvbnRleHQgfSA9IG5leHRQcm9wc1xuICAgIGlmICggaXNTYXZpbmcgKSByZXR1cm4gbnVsbFxuICAgIGlmICggY3VycmVudCA9PT0gbmV4dCApIHJldHVybiBudWxsXG5cbiAgICAvLyByZWRpcmVjdHNcbiAgICBjb25zdCByZWRpcmVjdCA9IHJlZGlyZWN0aW9uLmN1c3RvbWVyKHtcbiAgICAgIG5leHQsXG4gICAgICBjdXJyZW50LFxuICAgICAgaGlzdG9yeSxcbiAgICAgIHN0YXRpY0NvbnRleHQsXG4gICAgfSlcbiAgICBpZiAoIHJlZGlyZWN0ICkgcmV0dXJuIG51bGxcblxuICAgIHJldHVybiB7IGZvcm1EYXRhOiBuZXh0IH1cbiAgfVxuXG4gIC8vLS0tLS0gRVZFTlRTXG5cbiAgaGFuZGxlU3VibWl0KCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgYm9keSA9IHNlcmlhbGl6ZSggZXZlbnQudGFyZ2V0LCB7IGhhc2g6IHRydWUsIGVtcHR5OiB0cnVlIH0gKVxuICAgIHRoaXMucHJvcHMuc2F2ZU9uZSh7IGJvZHkgfSlcbiAgfVxuICBoYW5kbGVGb3JtQ2hhbmdlKCBldmVudCApIHtcbiAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnRcbiAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSB0YXJnZXRcbiAgICB0aGlzLnNldFN0YXRlKCBwcmV2U3RhdGUgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlZCA9IHByZXZTdGF0ZS5mb3JtRGF0YS5zZXQobmFtZSwgdmFsdWUpXG4gICAgICByZXR1cm4geyBmb3JtRGF0YTogdXBkYXRlZCB9XG4gICAgfSlcbiAgfVxuXG4gIC8vLS0tLS0gUkVOREVSXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZm9ybURhdGEgIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgeyBpc1NhdmluZyAgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IGlzTG9hZGluZyB9ID0gICAgICBmb3JtRGF0YVxuICAgIGlmICggaXNMb2FkaW5nICkgcmV0dXJuIDxTcGlubmVyIC8+XG5cbiAgICBjb25zdCBmb3JtUHJvcHMgPSB7XG4gICAgICBmb3JtRGF0YSxcbiAgICAgIGlzU2F2aW5nLFxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybVxuICAgICAgICBpZD17IGAke0ZPUk1fSUR9YCB9XG4gICAgICAgIGlzU2F2aW5nPXsgaXNTYXZpbmcgfVxuICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWl0IH1cbiAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UgfVxuICAgICAgPlxuICAgICAgICB7IGZvcm1EYXRhLmlkICYmIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9e2Zvcm1EYXRhLmlkfSBuYW1lPVwiaWRcIiAvPiAgfVxuICAgICAgICB7LyogUHJvdmlkZSBhIGNvbnRleHQgZm9yIGNoaWxkcmVuIHRvIGJlIGFibGUgdG8gYWNjZXNzIGZvcm1EYXRhICovfVxuICAgICAgICA8Rm9ybUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9eyBmb3JtUHJvcHMgfT5cbiAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgICA8L0Zvcm1Db250ZXh0LlByb3ZpZGVyPlxuICAgICAgPC9Gb3JtPlxuICAgIClcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaDJwcm9wcyggZGlzcGF0Y2ggKSB7XG4gIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIHNhdmVPbmU6ICBjdXN0b21lcnMuc2F2ZU9uZSxcbiAgfSwgZGlzcGF0Y2gpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIG51bGwsIGRpc3BhdGNoMnByb3BzICkoIEN1c3RvbWVyRm9ybSApXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7IElucHV0LCBUZXh0YXJlYSB9IGZyb20gJy4uL3VpL2ZpZWxkJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDdXN0b21lckZvcm1QcmVzKCBwcm9wcyApIHtcbiAgY29uc3QgeyBmb3JtRGF0YSB9ID0gcHJvcHNcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VzdG9tZXItZmllbGRzXCI+XG4gICAgICA8SW5wdXRcbiAgICAgICAgbmFtZT1cIm5hbWVcIlxuICAgICAgICBsYWJlbD1cImZpZWxkLm5hbWVcIlxuICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLm5hbWUgfVxuICAgICAgLz5cbiAgICAgIDxUZXh0YXJlYVxuICAgICAgICBuYW1lPVwiYWRkcmVzc1wiXG4gICAgICAgIGxhYmVsPVwiZmllbGQuYWRkcmVzc1wiXG4gICAgICAgIHZhbHVlPXsgZm9ybURhdGEuYWRkcmVzcyB9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCAqIGFzIEZvcm1hdCAgZnJvbSAnLi4vdWkvZm9ybWF0J1xuXG5pbXBvcnQgKiBhcyBLZXlQcmVzIGZyb20gJy4uL3VpL2tleS1wcmVzZW50YXRpb24nXG5pbXBvcnQgeyBQcm9ncmVzcyB9IGZyb20gJy4uL3VpL3Byb2dyZXNzJ1xuXG5leHBvcnQgZnVuY3Rpb24gQ3VzdG9tZXJIZWFkZXIoIHByb3BzICkge1xuICBjb25zdCB7IGN1c3RvbWVyIH0gPSBwcm9wc1xuXG4gIHJldHVybiAoXG4gICAgPEtleVByZXMuV3JhcHBlcj5cbiAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwiY3VzdG9tZXIudG90YWwucXVvdGF0aW9uXCIgLz5cbiAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICA8Rm9ybWF0LkFtb3VudCB2YWx1ZT17IGN1c3RvbWVyLmdldChgcXVvdGF0aW9uc1RvdGFsYCkgfSAvPlxuICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJjdXN0b21lci50b3RhbC5pbnZvaWNlXCIgLz5cbiAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICA8Rm9ybWF0LkFtb3VudCB2YWx1ZT17IGN1c3RvbWVyLmdldChgaW52b2ljZXNUb3RhbGApIH0gLz5cbiAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwiY3VzdG9tZXIudG90YWwudG8tYmUtcGFpZFwiIC8+XG4gICAgICA8S2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgPEZvcm1hdC5BbW91bnQgdmFsdWU9eyBjdXN0b21lci5nZXQoYGludm9pY2VzVG90YWxMZWZ0YCkgfSAvPlxuICAgICAgPC9LZXlQcmVzLlZhbHVlPlxuICAgICAgPEtleVByZXMuTGFiZWwgaWQ9XCJjdXN0b21lci50b3RhbC5wcm9ncmVzc1wiIC8+XG4gICAgICA8S2V5UHJlcy5WYWx1ZT5cbiAgICAgICAgPFByb2dyZXNzXG4gICAgICAgICAgdmFsdWU9eyBjdXN0b21lci5nZXQoYGludm9pY2VzVG90YWxQYWlkYCkgfVxuICAgICAgICAgIG1heD17IGN1c3RvbWVyLmdldChgaW52b2ljZXNUb3RhbGApIH1cbiAgICAgICAgLz5cbiAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICA8L0tleVByZXMuV3JhcHBlcj5cbiAgKVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcblxuXG5pbXBvcnQgKiBhcyBjdXN0b21lcnMgIGZyb20gJy4uL2R1Y2tzL2N1c3RvbWVycydcbmltcG9ydCB7IFRhYmxlLCBSb3csIENlbGwgfSBmcm9tICcuLi91aS10YWJsZSdcbmltcG9ydCB7IEZvcm1hdE51bWJlciwgQW1vdW50IH0gZnJvbSAnLi4vdWkvZm9ybWF0J1xuaW1wb3J0IHsgUHJvZ3Jlc3MgfSBmcm9tICcuLi91aS9wcm9ncmVzcydcblxuZnVuY3Rpb24gQ3VzdG9tZXJSb3coIHByb3BzICkge1xuICBjb25zdCB7IGN1c3RvbWVyIH0gPSBwcm9wc1xuICBjb25zdCB1cmwgICAgICA9IGAvY3VzdG9tZXJzLyR7Y3VzdG9tZXIuaWR9YFxuICByZXR1cm4gKFxuICAgIDxSb3c+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPExpbmsgdG89eyB1cmwgfT57IGN1c3RvbWVyLm5hbWUgfTwvTGluaz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsID5cbiAgICAgICAgPEZvcm1hdE51bWJlciB2YWx1ZT17Y3VzdG9tZXIucXVvdGF0aW9uc0NvdW50fSAvPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGw+XG4gICAgICAgIDxBbW91bnQgdmFsdWU9e2N1c3RvbWVyLnF1b3RhdGlvbnNUb3RhbH0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8Rm9ybWF0TnVtYmVyIHZhbHVlPXtjdXN0b21lci5pbnZvaWNlc0NvdW50fSAvPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGw+XG4gICAgICAgIDxBbW91bnQgdmFsdWU9e2N1c3RvbWVyLmdldChgaW52b2ljZXNUb3RhbGApfSAvPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGw+XG4gICAgICAgIDxQcm9ncmVzc1xuICAgICAgICAgIHRhYmxlTGF5b3V0XG4gICAgICAgICAgdmFsdWU9eyBjdXN0b21lci5nZXQoYGludm9pY2VzVG90YWxQYWlkYCkgfVxuICAgICAgICAgIG1heD17IGN1c3RvbWVyLmdldChgaW52b2ljZXNUb3RhbGApIH1cbiAgICAgICAgLz5cbiAgICAgIDwvQ2VsbD5cbiAgICA8L1Jvdz5cbiAgKVxufVxuXG5jb25zdCBjdXN0b21lckNvbHVtbnMgPSBbXG4gIHsgaWQ6IGBuYW1lYCAgICAgICAgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIubmFtZWAgICAgICAgICAgICAgICwgc29ydDogYG5hbWVgICAgICB9LFxuICB7IGlkOiBgcXVvdGF0aW9uc2AgICAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLnF1b3RhdGlvbnNgICAgICAgICAsIHR5cGU6IGBudW1iZXJgICAgfSxcbiAgeyBpZDogYHF1b3RhdGlvbnMtdG90YWxgLCBsYWJlbDogYHRhYmxlLmhlYWRlci5jdW11bGF0aXZlLWFtb3VudGAgLCB0eXBlOiBgYW1vdW50YCAgIH0sXG4gIHsgaWQ6IGBpbnZvaWNlc2AgICAgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIuaW52b2ljZXNgICAgICAgICAgICwgdHlwZTogYG51bWJlcmAgICB9LFxuICB7IGlkOiBgaW52b2ljZXMtdG90YWxgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmN1bXVsYXRpdmUtYW1vdW50YCAsIHR5cGU6IGBhbW91bnRgICAgfSxcbiAgeyBpZDogYGludm9pY2VzLXBhaWRgICAgLCBsYWJlbDogYHRhYmxlLmFtb3VudC5wYWlkYCAgICAgICAgICAgICAgLCB0eXBlOiBgcHJvZ3Jlc3NgIH0sXG5dXG5cbmZ1bmN0aW9uIEN1c3RvbWVyTGlzdCggcHJvcHMgKSB7XG4gIGNvbnN0IHtcbiAgICBjdXN0b21lcnMgPSBbXSxcbiAgICAuLi5yZXN0XG4gIH0gPSBwcm9wc1xuXG4gIHJldHVybiAoXG4gICAgPFRhYmxlXG4gICAgICBwcmVzZW50YXRpb25cbiAgICAgIGNvbHVtbnM9eyBjdXN0b21lckNvbHVtbnMgfVxuICAgICAgeyAuLi5yZXN0IH1cbiAgICA+XG4gICAgeyBjdXN0b21lcnMubWFwKCBjdXN0b21lciA9PiAoXG4gICAgICAgIDxDdXN0b21lclJvdyBrZXk9e2N1c3RvbWVyLmlkfSBjdXN0b21lcj17Y3VzdG9tZXJ9IC8+XG4gICAgKSl9XG4gICAgPC9UYWJsZT5cbiAgKVxufVxuXG5leHBvcnQgY29uc3QgQWN0aXZlQ3VzdG9tZXJzID0gY29ubmVjdChcbiAgc3RhdGUgPT4gKHtcbiAgICBjdXN0b21lcnM6IHN0YXRlLmN1c3RvbWVycy5nZXQoYGFjdGl2ZWAgICAgICApLFxuICAgIG1ldGEgICAgOiAgc3RhdGUuY3VzdG9tZXJzLmdldChgbWV0YS5hY3RpdmVgICksXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IGN1c3RvbWVycy5nZXRBbGwsXG4gIH0sIGRpc3BhdGNoICkpXG4pKCBDdXN0b21lckxpc3QgKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgY3VzdG9tZXJzICAgIGZyb20gJy4uL2R1Y2tzL2N1c3RvbWVycydcbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgICBmcm9tICcuLi9kdWNrcy9xdW90YXRpb25zJ1xuaW1wb3J0ICogYXMgaW52b2ljZXMgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuaW1wb3J0ICogYXMgUGFwZXIgICAgICAgIGZyb20gJy4uL2xheW91dC9wYXBlci1zaGVldCdcbmltcG9ydCAgICAgIE5hdlNlY29uZGFyeSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHtcbiAgQnV0dG9uTmV3LFxuICBCdXR0b25MaXN0LFxuICBCdXR0b25TdWJtaXQsXG59IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCAqIGFzIFRhYnMgZnJvbSAnLi4vdWkvdGFicydcbmltcG9ydCB7XG4gIEFtb3VudCxcbiAgRm9ybWF0TnVtYmVyLFxufSBmcm9tICcuLi91aS9mb3JtYXQnXG5pbXBvcnQgeyBQcm9ncmVzcyB9IGZyb20gJy4uL3VpL3Byb2dyZXNzJ1xuaW1wb3J0IHsgQ3VzdG9tZXJRdW90YXRpb25zIH0gZnJvbSAnLi4vcXVvdGF0aW9ucy9saXN0J1xuaW1wb3J0IHsgQ3VzdG9tZXJJbnZvaWNlcyAgIH0gZnJvbSAnLi4vaW52b2ljZXMvbGlzdCdcbmltcG9ydCBDdXN0b21lckZvcm0sIHtcbiAgRk9STV9JRCxcbiAgRm9ybUNvbnRleHQsXG59IGZyb20gJy4vZm9ybSdcbmltcG9ydCAgIEN1c3RvbWVyRm9ybVByZXMgICBmcm9tICcuL2Zvcm0ucHJlcydcbmltcG9ydCB7IEN1c3RvbWVySGVhZGVyICAgfSBmcm9tICcuL2hlYWRlcidcblxuY29uc3QgVFlQRSA9IGBjdXN0b21lcnNgXG5cbmZ1bmN0aW9uIEVkaXRDdXN0b21lciggcHJvcHMgKSB7XG4gIGNvbnN0IHsgY3VzdG9tZXIgICB9ID0gICBwcm9wc1xuICBjb25zdCAgIG5hbWUgICAgICAgICA9ICAgY3VzdG9tZXIuZ2V0KGBuYW1lYClcbiAgY29uc3QgICB0aXRsZVByb3BzICAgPSB7IGlkIDpgcGFnZS5jdXN0b21lcnMuZWRpdGAsIHZhbHVlczoge25hbWV9IH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPEJ1dHRvblN1Ym1pdFxuICAgICAgICAgIGZvcm1JZD17Rk9STV9JRH1cbiAgICAgICAgICBpc1NhdmluZz17IHByb3BzLmlzU2F2aW5nIH1cbiAgICAgICAgICBsYWJlbD1cIl8uc2F2ZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25MaXN0XG4gICAgICAgICAgdHlwZT17IFRZUEUgfVxuICAgICAgICAgIGxhYmVsPVwiY3VzdG9tZXIuYnV0dG9uLmxpc3RcIlxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uTmV3XG4gICAgICAgICAgdHlwZT17IFRZUEUgfVxuICAgICAgICAgIGljb25cbiAgICAgICAgICBzZWNvbmRhcnlcbiAgICAgICAgICBsYWJlbD1cImN1c3RvbWVyLmJ1dHRvbi5uZXdcIlxuICAgICAgICAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG5cbiAgICAgIDxDdXN0b21lckZvcm0gey4uLnByb3BzfSA+XG4gICAgICAgIDxUYWJzLldyYXBwZXI+XG5cbiAgICAgICAgICA8VGFicy5MaXN0PlxuICAgICAgICAgICAgPFRhYnMuSGVhZGVyPlxuICAgICAgICAgICAgICA8Q3VzdG9tZXJIZWFkZXIgY3VzdG9tZXI9eyBjdXN0b21lciB9IC8+XG4gICAgICAgICAgICA8L1RhYnMuSGVhZGVyPlxuICAgICAgICAgICAgPFRhYnMuVGFiPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cIl8ucXVvdGF0aW9uc1wiIC8+XG4gICAgICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgICAgICAgPFRhYnMuVGFiPlxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cIl8uaW52b2ljZXNcIiAvPlxuICAgICAgICAgICAgPC9UYWJzLlRhYj5cbiAgICAgICAgICAgIDxUYWJzLlRhYj5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJjdXN0b21lci50YWIuY29uZmlndXJhdGlvblwiIC8+XG4gICAgICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgICAgIDwvVGFicy5MaXN0PlxuICAgICAgICAgIHsvKiBRVU9UQVRJT05TICovfVxuICAgICAgICAgIDxUYWJzLlBhbmVsPlxuICAgICAgICAgICAgPEN1c3RvbWVyUXVvdGF0aW9ucyAvPlxuICAgICAgICAgIDwvVGFicy5QYW5lbD5cbiAgICAgICAgICB7LyogSU5WT0lDRVMgKi99XG4gICAgICAgICAgPFRhYnMuUGFuZWw+XG4gICAgICAgICAgICA8Q3VzdG9tZXJJbnZvaWNlcyAvPlxuICAgICAgICAgIDwvVGFicy5QYW5lbD5cbiAgICAgICAgICB7LyogQ1VTVE9NRVIgRk9STSAqL31cbiAgICAgICAgICA8VGFicy5QYW5lbD5cbiAgICAgICAgICAgIDxGb3JtQ29udGV4dC5Db25zdW1lcj5cbiAgICAgICAgICAgICAgeyBjb250ZXh0ID0+IChcbiAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICA8Q3VzdG9tZXJGb3JtUHJlcyB7Li4uY29udGV4dH0gLz5cbiAgICAgICAgICAgICAgICAgIDxQYXBlci5TaGVldCBwYXJ0PVwidG9wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxQYXBlci5CZXR3ZWVuPlxuICAgICAgICAgICAgICAgICAgICAgIDxQYXBlci5Vc2VyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPFBhcGVyLlBhcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cInRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlb3BsZT17IGNvbnRleHQuZm9ybURhdGEgfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFwZXIuQmV0d2Vlbj5cbiAgICAgICAgICAgICAgICAgIDwvUGFwZXIuU2hlZXQ+XG4gICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvRm9ybUNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgPC9UYWJzLlBhbmVsPlxuICAgICAgICA8L1RhYnMuV3JhcHBlcj5cbiAgICAgIDwvQ3VzdG9tZXJGb3JtPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgaXNTYXZpbmcgICA6IHN0YXRlLmN1c3RvbWVycyAgLmdldCggYGlzU2F2aW5nYCApLFxuICAgIGN1c3RvbWVyICAgOiBzdGF0ZS5jdXN0b21lcnMgIC5nZXQoIGBjdXJyZW50YCAgKSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogRWRpdEN1c3RvbWVyLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIGN1c3RvbWVycy5nZXRPbmUsXG4gICAgcXVvdGF0aW9ucy5saXN0Rm9yQ3VzdG9tZXIsXG4gICAgaW52b2ljZXMubGlzdEZvckN1c3RvbWVyLFxuICBdLFxufSkgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgICAgICAgICAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgY3VzdG9tZXJzICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvY3VzdG9tZXJzJ1xuaW1wb3J0IHsgICAgTWFpbiAgICAgICAgICAgICAgLCBDb250ZW50IH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgICAgICBOYXZTZWNvbmRhcnkgICAgICAgICAgICAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHsgICAgQnV0dG9uTmV3ICAgICAgICAgIH0gICAgICAgICAgZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0IHsgICAgQWN0aXZlQ3VzdG9tZXJzICAgIH0gICAgICAgICAgZnJvbSAnLi9saXN0J1xuXG5jb25zdCBUWVBFID0gYGN1c3RvbWVyc2BcblxuZnVuY3Rpb24gQ3VzdG9tZXJzKCBwcm9wcyApIHtcbiAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBwYWdlLmN1c3RvbWVyc2AgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgICA8QnV0dG9uTmV3IHR5cGU9eyBUWVBFIH0gbWVzc2FnZT1cImN1c3RvbWVyLmJ1dHRvbi5uZXdcIiAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8TWFpbj5cbiAgICAgICAgPENvbnRlbnQ+XG4gICAgICAgICAgPEFjdGl2ZUN1c3RvbWVycyAvPlxuICAgICAgICA8L0NvbnRlbnQ+XG4gICAgICA8L01haW4+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogQ3VzdG9tZXJzLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIGN1c3RvbWVycy5nZXRBbGwsXG4gIF0sXG59KSApXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgICAgICAgICBmcm9tICcuLi9kdWNrcy9jdXN0b21lcnMnXG5pbXBvcnQge1xuICBQYXBlclNoZWV0LFxuICBCZXR3ZWVuLFxuICBQYXJ0eSxcbiAgUGFydHlVc2VyLFxufSBmcm9tICcuLi9sYXlvdXQvcGFwZXItc2hlZXQnXG5pbXBvcnQgeyBNYWluLCBNZXRhLCBDb250ZW50IH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgTmF2U2Vjb25kYXJ5IGZyb20gJy4uL25hdi9zZWNvbmRhcnknXG5pbXBvcnQge1xuICBCdXR0b25MaXN0LFxuICBCdXR0b25TdWJtaXQsXG59IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCBDdXN0b21lckZvcm0sIHtcbiAgRk9STV9JRCxcbiAgRm9ybUNvbnRleHQsXG59IGZyb20gJy4vZm9ybSdcbmltcG9ydCBDdXN0b21lckZvcm1QcmVzIGZyb20gJy4vZm9ybS5wcmVzJ1xuXG5jb25zdCBUWVBFID0gYGN1c3RvbWVyc2BcblxuY29uc3QgTmV3Q3VzdG9tZXIgPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgaW50bCB9ID0gcHJvcHNcbiAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBwYWdlLmN1c3RvbWVycy5uZXdgIH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPEJ1dHRvblN1Ym1pdFxuICAgICAgICAgIGZvcm1JZD17IEZPUk1fSUQgfVxuICAgICAgICAgIGlzU2F2aW5nPXsgcHJvcHMuaXNTYXZpbmcgfVxuICAgICAgICAgIGxhYmVsPVwiXy5jcmVhdGVcIlxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uTGlzdFxuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBsYWJlbD1cImN1c3RvbWVyLmJ1dHRvbi5saXN0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuXG4gICAgICA8Q3VzdG9tZXJGb3JtIHsuLi5wcm9wc30gPlxuICAgICAgICA8TWFpbiB3aXRoTWV0YT5cbiAgICAgICAgICA8TWV0YT5cbiAgICAgICAgICAgIDxGb3JtQ29udGV4dC5Db25zdW1lcj5cbiAgICAgICAgICAgICAgeyBjb250ZXh0ID0+IDxDdXN0b21lckZvcm1QcmVzIHsuLi5jb250ZXh0fSAvPn1cbiAgICAgICAgICAgIDwvRm9ybUNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgPC9NZXRhPlxuICAgICAgICAgIDxDb250ZW50PlxuICAgICAgICAgICAgPFBhcGVyU2hlZXQgcGFydD1cInRvcFwiPlxuICAgICAgICAgICAgICA8QmV0d2Vlbj5cbiAgICAgICAgICAgICAgICA8UGFydHlVc2VyIC8+XG4gICAgICAgICAgICAgICAgPEZvcm1Db250ZXh0LkNvbnN1bWVyPlxuICAgICAgICAgICAgICAgICAgeyBjb250ZXh0ID0+IDxQYXJ0eSB0aXRsZT1cInRvXCIgcGVvcGxlPXsgY29udGV4dC5mb3JtRGF0YSB9IC8+fVxuICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgICAgIDwvQmV0d2Vlbj5cbiAgICAgICAgICAgIDwvUGFwZXJTaGVldD5cbiAgICAgICAgICA8L0NvbnRlbnQ+XG4gICAgICAgIDwvTWFpbj5cbiAgICAgIDwvQ3VzdG9tZXJGb3JtPlxuXG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHtcbiAgICBpc1NhdmluZyA6IHN0YXRlLmN1c3RvbWVycy5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgICBjdXN0b21lciA6IHN0YXRlLmN1c3RvbWVycy5nZXQoIGBjdXJyZW50YCAgKSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogTmV3Q3VzdG9tZXIsXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gICAgY3VzdG9tZXJzLmdldE9uZVxuICBdLFxufSkgKVxuXG4iLCJpbXBvcnQgY3JpbyBmcm9tICdjcmlvJ1xuXG5pbXBvcnQgY3JlYXRlQWN0aW9uTmFtZXMgZnJvbSAnLi91dGlscy9jcmVhdGUtYWN0aW9uLW5hbWVzJ1xuaW1wb3J0IGZldGNoRGlzcGF0Y2ggZnJvbSAnLi91dGlscy9mZXRjaC1kaXNwYXRjaCdcblxuY29uc3QgTkFNRSA9IGBhY2NvdW50YFxuXG5leHBvcnQgY29uc3QgQVVUSCAgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAsIGBhdXRoYCAgICAgICApXG5leHBvcnQgY29uc3QgU1RBVElTVElDUyA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAsIGBzdGF0aXN0aWNzYCApXG5leHBvcnQgY29uc3QgTE9HSU4gICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAsIGBsb2dpbmAgICAgICApXG5leHBvcnQgY29uc3QgRk9SR09UICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAsIGBmb3Jnb3RgICAgICApXG5leHBvcnQgY29uc3QgUkVTRVQgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAsIGByZXNldGAgICAgICApXG5leHBvcnQgY29uc3QgTE9HT1VUICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAsIGBsb2dvdXRgICAgICApXG5leHBvcnQgY29uc3QgUkVHSVNURVIgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAsIGByZWdpc3RlcmAgICApXG5leHBvcnQgY29uc3QgVVBEQVRFICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAsIGBvbmVgICAgICAgICApXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IGNyaW8oe1xuICBpc1NhdmluZyAgICAgICAgOiBmYWxzZSxcbiAgaXNBdXRoZW50aWNhdGVkIDogZmFsc2UsXG4gIHVzZXIgICAgICAgICAgICA6IHt9ICAgLFxuICBzdGF0aXN0aWNzICAgICAgOiB7fSAgICxcbn0pXG5cbi8vLy8vL1xuLy8gUkVEVUNFUlxuLy8vLy8vXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZHVjZXIoIHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24gKSB7XG4gIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCB9ID0gYWN0aW9uXG5cbiAgc3dpdGNoICggdHlwZSApIHtcblxuICAgIGNhc2UgQVVUSC5TVUNDRVNTOlxuICAgIGNhc2UgTE9HSU4uU1VDQ0VTUzpcbiAgICBjYXNlIFJFR0lTVEVSLlNVQ0NFU1M6XG4gICAgY2FzZSBSRVNFVC5TVUNDRVNTOlxuICAgICAgc3RhdGUgPSBzdGF0ZS5zZXQoIGBpc0F1dGhlbnRpY2F0ZWRgLCB0cnVlIClcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGB1c2VyYCwgcGF5bG9hZC51c2VyIClcblxuICAgIGNhc2UgQVVUSC5FUlJPUjpcbiAgICBjYXNlIExPR09VVC5TVUNDRVNTOlxuICAgICAgc3RhdGUgPSBzdGF0ZS5zZXQoIGBpc0F1dGhlbnRpY2F0ZWRgLCBmYWxzZSApXG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgdXNlcmAsIHt9IClcblxuICAgIGNhc2UgU1RBVElTVElDUy5TVUNDRVNTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYHN0YXRpc3RpY3NgLCBwYXlsb2FkIClcblxuICAgIGNhc2UgVVBEQVRFLkxPQURJTkc6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgaXNTYXZpbmdgLCB0cnVlIClcbiAgICBjYXNlIFVQREFURS5ET05FOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGlzU2F2aW5nYCwgZmFsc2UgKVxuICAgIGNhc2UgVVBEQVRFLlNVQ0NFU1M6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgdXNlcmAsIHBheWxvYWQudXNlciApXG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLy8vLy8vXG4vLyBBQ1RJT04gQ1JFQVRPUlNcbi8vLy8vL1xuXG5leHBvcnQgY29uc3QgYXV0aCA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYC8keyBOQU1FIH0vYXV0aGAsXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgYWN0aW9uczogIEFVVEgsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzdGF0aXN0aWNzID0gKHBhcmFtcywgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgLyR7IE5BTUUgfS9zdGF0aXN0aWNzYCxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgU1RBVElTVElDUyxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGxvZ2luID0gKHBhcmFtcywgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgYm9keSB9ID0gcGFyYW1zXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgLyR7IE5BTUUgfS9sb2dpbmAsXG4gICAgYm9keSxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgTE9HSU4sXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsb2dvdXQgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAvJHsgTkFNRSB9L2xvZ291dGAsXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgYWN0aW9uczogIExPR09VVCxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyID0gKHBhcmFtcywgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgYm9keSB9ID0gcGFyYW1zXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgLyR7IE5BTUUgfS9yZWdpc3RlcmAsXG4gICAgYm9keSxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgUkVHSVNURVIsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBmb3Jnb3QgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAvJHsgTkFNRSB9L2ZvcmdvdGAsXG4gICAgYm9keSxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgRk9SR09ULFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgcmVzZXQgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAvJHsgTkFNRSB9L3Jlc2V0YCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBSRVNFVCxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVNldHRpbmdzID0gKHBhcmFtcywgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgYm9keSB9ID0gcGFyYW1zXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHtOQU1FfS9zZXR0aW5nc2AsXG4gICAgYm9keSxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgVVBEQVRFLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5cbmltcG9ydCBjdXN0b21lcnMgZnJvbSAnLi9jdXN0b21lcnMnXG5pbXBvcnQgcXVvdGF0aW9ucyBmcm9tICcuL3F1b3RhdGlvbnMnXG5pbXBvcnQgaW52b2ljZXMgZnJvbSAnLi9pbnZvaWNlcydcbmltcG9ydCBub3RpZmljYXRpb25zIGZyb20gJy4vbm90aWZpY2F0aW9ucydcbmltcG9ydCBhY2NvdW50LCB7IExPR09VVCwgQVVUSCB9IGZyb20gJy4vYWNjb3VudCdcblxuY29uc3QgYXBwUmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGN1c3RvbWVycyxcbiAgcXVvdGF0aW9ucyxcbiAgaW52b2ljZXMsXG4gIG5vdGlmaWNhdGlvbnMsXG4gIGFjY291bnQsXG59KVxuXG4vLyBtYWtlIGEgZ2xvYmFsIHJlZHVjZXJcbi8vIOKAoiB0aGlzIHdpbGwgYWxsb3cgdXMgdG8gbWFuaXB1bGF0ZSBhbGwgdGhlIHN0YXRlIGZvciBsb2dvdXRcbi8vICAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU2MjI1ODgvaG93LXRvLXJlc2V0LXRoZS1zdGF0ZS1vZi1hLXJlZHV4LXN0b3JlLzM1NjQxOTkyIzM1NjQxOTkyXG5jb25zdCByb290UmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gTE9HT1VULlNVQ0NFU1MpIHN0YXRlID0gdm9pZCAwXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQVVUSC5FUlJPUikgc3RhdGUgPSB2b2lkIDBcbiAgcmV0dXJuIGFwcFJlZHVjZXIoc3RhdGUsIGFjdGlvbilcbn1cblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXJcbiIsImltcG9ydCBjcmlvIGZyb20gJ2NyaW8nXG5pbXBvcnQgaXNOaWwgZnJvbSAnbG9kYXNoLmlzbmlsJ1xuXG5pbXBvcnQgY3JlYXRlQWN0aW9uTmFtZXMgZnJvbSAnLi91dGlscy9jcmVhdGUtYWN0aW9uLW5hbWVzJ1xuaW1wb3J0IGZldGNoRGlzcGF0Y2ggZnJvbSAnLi91dGlscy9mZXRjaC1kaXNwYXRjaCdcblxuY29uc3QgTkFNRSA9IGBjdXN0b21lcnNgXG5leHBvcnQgY29uc3QgR0VUX0FMTCAgPSBjcmVhdGVBY3Rpb25OYW1lcyggTkFNRSwgYGdldGAsIGBhbGxgKVxuZXhwb3J0IGNvbnN0IEdFVF9PTkUgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgLCBgb25lYCApXG5leHBvcnQgY29uc3QgU0FWRV9PTkUgPSBjcmVhdGVBY3Rpb25OYW1lcyggTkFNRSwgYHBvc3RgLCBgb25lYCApXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IGNyaW8oe1xuICBpc1NhdmluZzogZmFsc2UsXG4gIGFjdGl2ZTogICBbXSxcbiAgbWV0YToge1xuICAgIGFsbDoge30sXG4gIH0sXG4gIGN1cnJlbnQ6ICB7fSxcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7IHR5cGUsIHBheWxvYWQsIG1ldGEgfSA9IGFjdGlvblxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgR0VUX0FMTC5TVUNDRVNTOlxuICAgICAgc3RhdGUgPSBzdGF0ZS5zZXQoIGBhY3RpdmVgLCBwYXlsb2FkLnJvd3MgKVxuICAgICAgcmV0dXJuICBzdGF0ZS5zZXQoIGBtZXRhLmFjdGl2ZWAsIHBheWxvYWQubWV0YSApXG5cbiAgICBjYXNlIEdFVF9PTkUuTE9BRElORzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGBjdXJyZW50YCwge1xuICAgICAgICBpc0xvYWRpbmc6IHRydWUgICAgICAsXG4gICAgICAgIG5hbWUgICAgIDogYGxvYWRpbmfigKZgLFxuICAgICAgfSlcblxuICAgIGNhc2UgR0VUX09ORS5TVUNDRVNTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCBwYXlsb2FkIClcblxuICAgIGNhc2UgU0FWRV9PTkUuTE9BRElORzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGBpc1NhdmluZ2AsIHRydWUgKVxuICAgIGNhc2UgU0FWRV9PTkUuRE9ORTpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGBpc1NhdmluZ2AsIGZhbHNlIClcbiAgICBjYXNlIFNBVkVfT05FLlNVQ0NFU1M6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgY3VycmVudGAsIHBheWxvYWQgKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRBbGwgPSAocGFyYW1zID0ge30sIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX1gLFxuICAgIC4uLnBhcmFtcyxcbiAgfVxuICByZXR1cm4gYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgYWN0aW9uczogIEdFVF9BTEwsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRPbmUgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgbGV0IHsgaWQgfSA9IHBhcmFtc1xuICBpZCA9IGlkID8gaWQgOiBgbmV3YFxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX0vJHtpZH1gLFxuICB9XG4gIHJldHVybiBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgR0VUX09ORSxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHNhdmVPbmUgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBib2R5IH0gPSBwYXJhbXNcbiAgY29uc3QgeyBpZCB9ID0gYm9keVxuICBjb25zdCBpc05ldyA9IGlzTmlsKCBpZCApXG4gIGNvbnN0IHVybElkID0gaXNOZXcgPyBgbmV3YCA6IGlkXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHsgTkFNRSB9LyR7IHVybElkIH1gLFxuICAgIGJvZHksXG4gIH1cbiAgcmV0dXJuIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIG1ldGE6ICAgICB7IGlzTmV3IH0sXG4gICAgYWN0aW9uczogIFNBVkVfT05FLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuIiwiaW1wb3J0IGNyaW8gZnJvbSAnY3JpbydcbmltcG9ydCBpc05pbCBmcm9tICdsb2Rhc2guaXNuaWwnXG5cbmltcG9ydCBjcmVhdGVBY3Rpb25OYW1lcyBmcm9tICcuL3V0aWxzL2NyZWF0ZS1hY3Rpb24tbmFtZXMnXG5pbXBvcnQgZmV0Y2hEaXNwYXRjaCBmcm9tICcuL3V0aWxzL2ZldGNoLWRpc3BhdGNoJ1xuaW1wb3J0IHsgQ09OVkVSVCB9IGZyb20gJy4vcXVvdGF0aW9ucydcblxuY29uc3QgTkFNRSA9IGBpbnZvaWNlc2BcbmV4cG9ydCBjb25zdCBMSVNUX0FDVElWRSAgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAgLCBgbGlzdC1hY3RpdmVgICAgICAgIClcbmV4cG9ydCBjb25zdCBMSVNUX0FSQ0hJVkVEICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAgLCBgbGlzdC1hcmNoaXZlZGAgICAgIClcbmV4cG9ydCBjb25zdCBMSVNUX0ZPUl9DVVNUT01FUiA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAgLCBgbGlzdC1mb3ItY3VzdG9tZXJgIClcbmV4cG9ydCBjb25zdCBHRVRfT05FICAgICAgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgZ2V0YCAgLCBgb25lYCAgICAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBTQVZFX09ORSAgICAgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAgLCBgb25lYCAgICAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBBUkNISVZFICAgICAgICAgICA9IGNyZWF0ZUFjdGlvbk5hbWVzKCBOQU1FLCBgcG9zdGAgLCBgYXJjaGl2ZWAgICAgICAgICAgIClcblxuZXhwb3J0IGNvbnN0IEVNUFRZID0gY3Jpbyh7XG4gIGlzTG9hZGluZzogdHJ1ZSxcbiAgcmVmZXJlbmNlOiBgbG9hZGluZ+KApmAsXG4gIHByb2R1Y3RzOiBbXSxcbn0pXG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IGNyaW8oe1xuICBpc1NhdmluZzogZmFsc2UsXG4gIG1ldGE6IHtcbiAgICBhY3RpdmUgIDoge30sXG4gICAgYXJjaGl2ZWQ6IHt9LFxuICB9LFxuICBhY3RpdmUgICA6IFtdLFxuICBhcmNoaXZlZCA6IFtdLFxuICBjdXJyZW50OiAgRU1QVFksXG59KVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3QgeyB0eXBlLCBwYXlsb2FkLCBtZXRhIH0gPSBhY3Rpb25cblxuICBzd2l0Y2ggKCB0eXBlICkge1xuXG4gICAgY2FzZSBMSVNUX0FDVElWRS5TVUNDRVNTOlxuICAgIGNhc2UgTElTVF9GT1JfQ1VTVE9NRVIuU1VDQ0VTUzpcbiAgICAgIHN0YXRlID0gc3RhdGUuc2V0KCBgYWN0aXZlYCwgcGF5bG9hZC5yb3dzIClcbiAgICAgIHJldHVybiAgc3RhdGUuc2V0KCBgbWV0YS5hY3RpdmVgLCBwYXlsb2FkLm1ldGEgKVxuXG4gICAgY2FzZSBMSVNUX0FSQ0hJVkVELlNVQ0NFU1M6XG4gICAgICBzdGF0ZSA9IHN0YXRlLnNldCggYGFyY2hpdmVkYCwgcGF5bG9hZC5yb3dzIClcbiAgICAgIHJldHVybiAgc3RhdGUuc2V0KCBgbWV0YS5hcmNoaXZlZGAsIHBheWxvYWQubWV0YSApXG5cbiAgICBjYXNlIExJU1RfQUNUSVZFLkxPQURJTkc6XG4gICAgY2FzZSBMSVNUX0FSQ0hJVkVELkxPQURJTkc6XG4gICAgY2FzZSBMSVNUX0ZPUl9DVVNUT01FUi5MT0FESU5HOlxuICAgIGNhc2UgR0VUX09ORS5MT0FESU5HOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCBFTVBUWSApXG5cbiAgICBjYXNlIEdFVF9PTkUuU1VDQ0VTUzpcbiAgICAgIHJldHVybiBzdGF0ZS5zZXQoIGBjdXJyZW50YCwgcGF5bG9hZCApXG5cbiAgICBjYXNlIEFSQ0hJVkUuU1VDQ0VTUzoge1xuICAgICAgY29uc3QgeyBpZCB9ICAgICAgPSBtZXRhXG4gICAgICBjb25zdCByZW1vdmVJZCAgICA9IGludm9pY2UgPT4gaW52b2ljZS5pZCAhPT0gaWRcbiAgICAgIGNvbnN0IGFjdGl2ZSAgICAgID0gc3RhdGUuZ2V0KCBgYWN0aXZlYCApLmZpbHRlciggcmVtb3ZlSWQgKVxuICAgICAgY29uc3QgdXBkYXRlZCAgICAgPSBzdGF0ZS5zZXQoIGBhY3RpdmVgLCBhY3RpdmUgKVxuICAgICAgICAuc2V0KCBgY3VycmVudGAsIHBheWxvYWQgKVxuICAgICAgcmV0dXJuIHVwZGF0ZWRcbiAgICB9XG5cbiAgICBjYXNlIFNBVkVfT05FLkxPQURJTkc6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgaXNTYXZpbmdgLCB0cnVlIClcbiAgICBjYXNlIFNBVkVfT05FLkRPTkU6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgaXNTYXZpbmdgLCBmYWxzZSApXG4gICAgY2FzZSBTQVZFX09ORS5TVUNDRVNTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCBwYXlsb2FkIClcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbGlzdEFjdGl2ZSA9IChwYXJhbXMgPSB7fSwgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHtOQU1FfWAsXG4gICAgLi4ucGFyYW1zLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9BQ1RJVkUsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsaXN0QXJjaGl2ZWQgPSAocGFyYW1zID0ge30sIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX0vYXJjaGl2ZWRgLFxuICAgIC4uLnBhcmFtcyxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgIExJU1RfQVJDSElWRUQsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsaXN0Rm9yQ3VzdG9tZXIgPSAocGFyYW1zID0ge30sIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGlkLCAuLi5yZXN0IH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAvY3VzdG9tZXJzLyR7IGlkIH0vJHtOQU1FfWAsXG4gICAgLi4ucmVzdCxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgIExJU1RfRk9SX0NVU1RPTUVSLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgZ2V0T25lID0gKHBhcmFtcywgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgaWQgfSAgPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAkeyBOQU1FIH0vJHsgaWQgfWAsXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgYWN0aW9uczogR0VUX09ORSxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHNhdmVPbmUgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBib2R5IH0gID0gcGFyYW1zXG4gIGNvbnN0IHsgaWQgfSAgICA9IGJvZHlcbiAgY29uc3Qgb3B0aW9ucyAgID0ge1xuICAgIHVybDogYCR7IE5BTUUgfS8keyBpZCB9YCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICBTQVZFX09ORSxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGFyY2hpdmVPbmUgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyBpZCB9ID0gcGFyYW1zXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHsgTkFNRSB9LyR7IGlkIH0vYXJjaGl2ZWAsXG4gICAgYm9keToge30sXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgbWV0YTogICAgIHsgaWQgfSxcbiAgICBhY3Rpb25zOiAgQVJDSElWRSxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cbiIsImltcG9ydCBjcmlvIGZyb20gJ2NyaW8nXG5pbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJ1xuXG5pbXBvcnQgY3JlYXRlQWN0aW9uTmFtZXMgZnJvbSAnLi91dGlscy9jcmVhdGUtYWN0aW9uLW5hbWVzJ1xuXG5pbXBvcnQge1xuICBHRVRfT05FICAgICAgICBhcyBRVU9UQVRJT05fR0VUX09ORSAgICAgICAsXG4gIFNBVkVfT05FICAgICAgIGFzIFFVT1RBVElPTl9TQVZFX09ORSAgICAgICxcbiAgQ1JFQVRFX0lOVk9JQ0UgYXMgUVVPVEFUSU9OX0NSRUFURV9JTlZPSUNFLFxufSBmcm9tICcuL3F1b3RhdGlvbnMnXG5pbXBvcnQge1xuICBHRVRfT05FICBhcyBJTlZPSUNFX0dFVF9PTkUsXG4gIFNBVkVfT05FIGFzIElOVk9JQ0VfU0FWRV9PTkUsXG59IGZyb20gJy4vaW52b2ljZXMnXG5pbXBvcnQge1xuICBHRVRfT05FICBhcyBDVVNUT01FUl9HRVRfT05FLFxuICBTQVZFX09ORSBhcyBDVVNUT01FUl9TQVZFX09ORSxcbn0gZnJvbSAnLi9jdXN0b21lcnMnXG5pbXBvcnQge1xuICBBVVRIICAgICBhcyBBQ0NPVU5UX0FVVEgsXG4gIExPR0lOICAgIGFzIEFDQ09VTlRfTE9HSU4sXG4gIEZPUkdPVCAgIGFzIEFDQ09VTlRfRk9SR09ULFxuICBSRVNFVCAgICBhcyBBQ0NPVU5UX1JFU0VULFxuICBMT0dPVVQgICBhcyBBQ0NPVU5UX0xPR09VVCxcbiAgUkVHSVNURVIgYXMgQUNDT1VOVF9SRUdJU1RFUixcbiAgVVBEQVRFICAgYXMgQUNDT1VOVF9VUERBVEUsXG59IGZyb20gJy4vYWNjb3VudCdcblxuY29uc3QgTkFNRSA9IGBub3RpZmljYXRpb25zYFxuZXhwb3J0IGNvbnN0IFJFTU9WRSAgICAgPSBgQGNvbmNvbXB0ZS8ke05BTUV9L3JlbW92ZWBcbmV4cG9ydCBjb25zdCBBTExfUE9TVCAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIGBbX2EtekEtWjAtOV0rYCwgYHBvc3RgLCBgW19hLXpBLVowLTldK2AgKVxuY29uc3QgcG9zdFN1Y2Nlc3NSZWdleHAgPSBuZXcgUmVnRXhwKCBgXiR7IEFMTF9QT1NULlNVQ0NFU1MgfSRgIClcbmNvbnN0IHBvc3RFcnJvclJlZ2V4cCAgID0gbmV3IFJlZ0V4cCggYF4keyBBTExfUE9TVC5FUlJPUiB9JGAgKVxuXG5jb25zdCBpbml0aWFsU3RhdGUgPSBjcmlvKCBbXSApXG5cbmZ1bmN0aW9uIG5vdGlmeVN1Y2Nlc3MoIHN0YXRlLCBpMThuSWQsIHZhbHVlcyA9IHt9ICkge1xuICByZXR1cm4gc3RhdGUucHVzaCh7XG4gICAgX2lkOiBzaG9ydGlkKCksXG4gICAgaTE4bklkLFxuICAgIC4uLnZhbHVlc1xuICB9KVxufVxuXG5mdW5jdGlvbiBub3RpZnlFcnJvciggc3RhdGUsIGkxOG5JZCwgdmFsdWVzID0ge30gKSB7XG4gIHJldHVybiBzdGF0ZS5wdXNoKHtcbiAgICBfaWQ6IHNob3J0aWQoKSxcbiAgICBlcnJvcjogdHJ1ZSxcbiAgICBpMThuSWQsXG4gICAgLi4udmFsdWVzXG4gIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZHVjZXIoIHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24gKSB7XG4gIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCwgZXJyb3IgfSA9IGFjdGlvblxuXG4gIGlmICggcG9zdEVycm9yUmVnZXhwLnRlc3QoIHR5cGUgKSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBgZXJyb3JgIClcbiAgICBjb25zb2xlLmxvZyggcGF5bG9hZCApXG4gIH1cblxuICBzd2l0Y2ggKCB0eXBlICkge1xuICAgIGNhc2UgUkVNT1ZFOiB7XG4gICAgICBjb25zdCBpbmRleCA9IHN0YXRlLmluZGV4T2YoIHBheWxvYWQgKVxuICAgICAgcmV0dXJuIHN0YXRlLnNwbGljZSggaW5kZXgsIDEgKVxuICAgIH1cbiAgICAvLy0tLS0tIFVTRVJcbiAgICBjYXNlIEFDQ09VTlRfUkVHSVNURVIuU1VDQ0VTUzpcbiAgICBjYXNlIEFDQ09VTlRfTE9HSU4uU1VDQ0VTUzpcbiAgICBjYXNlIEFDQ09VTlRfUkVTRVQuU1VDQ0VTUzoge1xuICAgICAgY29uc3QgeyB1c2VyIH0gPSBwYXlsb2FkXG4gICAgICBjb25zdCBuYW1lID0gdXNlci5uYW1lIHx8IHVzZXIuZW1haWxcbiAgICAgIHJldHVybiBub3RpZnlTdWNjZXNzKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMudXNlci53ZWxjb21lYCwgeyBuYW1lIH0gKVxuICAgIH1cbiAgICBjYXNlIEFDQ09VTlRfRk9SR09ULlNVQ0NFU1M6IHtcbiAgICAgIGNvbnN0IHsgZW1haWwgfSA9IHBheWxvYWRcbiAgICAgIHJldHVybiBub3RpZnlTdWNjZXNzKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMudXNlci5tYWlsLXNlbnRgLCB7IGVtYWlsIH0gKVxuICAgIH1cbiAgICAvLy0tLS0tIFFVT1RBVElPTlNcbiAgICBjYXNlIFFVT1RBVElPTl9TQVZFX09ORS5TVUNDRVNTOiB7XG4gICAgICByZXR1cm4gbm90aWZ5U3VjY2Vzcyggc3RhdGUsIGBub3RpZmljYXRpb25zLnF1b3RhdGlvbi5zYXZlZGAgKVxuICAgIH1cbiAgICBjYXNlIFFVT1RBVElPTl9TQVZFX09ORS5FUlJPUjoge1xuICAgICAgcmV0dXJuIG5vdGlmeUVycm9yKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMucXVvdGF0aW9uLmVycm9yYCApXG4gICAgfVxuICAgIGNhc2UgUVVPVEFUSU9OX0NSRUFURV9JTlZPSUNFLlNVQ0NFU1M6IHtcbiAgICAgIHJldHVybiBub3RpZnlTdWNjZXNzKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMucXVvdGF0aW9uLmNyZWF0ZS1pbnZvaWNlLnN1Y2Nlc3NgIClcbiAgICB9XG4gICAgY2FzZSBRVU9UQVRJT05fQ1JFQVRFX0lOVk9JQ0UuU1VDQ0VTUzoge1xuICAgICAgcmV0dXJuIG5vdGlmeUVycm9yKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMucXVvdGF0aW9uLmNyZWF0ZS1pbnZvaWNlLmVycm9yYCApXG4gICAgfVxuICAgIC8vLS0tLS0gSU5WT0lDRVNcbiAgICBjYXNlIElOVk9JQ0VfU0FWRV9PTkUuU1VDQ0VTUzoge1xuICAgICAgcmV0dXJuIG5vdGlmeVN1Y2Nlc3MoIHN0YXRlLCBgbm90aWZpY2F0aW9ucy5pbnZvaWNlLnNhdmVkYCApXG4gICAgfVxuICAgIGNhc2UgSU5WT0lDRV9TQVZFX09ORS5FUlJPUjoge1xuICAgICAgcmV0dXJuIG5vdGlmeUVycm9yKCBzdGF0ZSwgYG5vdGlmaWNhdGlvbnMuaW52b2ljZS5lcnJvcmAgKVxuICAgIH1cbiAgICAvLy0tLS0tIENVU1RPTUVSU1xuICAgIGNhc2UgQ1VTVE9NRVJfU0FWRV9PTkUuU1VDQ0VTUzoge1xuICAgICAgcmV0dXJuIG5vdGlmeVN1Y2Nlc3MoIHN0YXRlLCBgbm90aWZpY2F0aW9ucy5jdXN0b21lci5zYXZlZGAgKVxuICAgIH1cbiAgICBjYXNlIENVU1RPTUVSX1NBVkVfT05FLkVSUk9SOiB7XG4gICAgICByZXR1cm4gbm90aWZ5RXJyb3IoIHN0YXRlLCBgbm90aWZpY2F0aW9ucy5jdXN0b21lci5lcnJvcmAsIHtcbiAgICAgICAgYWRkaXRpb25hbENvbnRlbnQ6IHBheWxvYWQubWVzc2FnZSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIC8vLS0tLS0gQ0FUQ0ggQUxMXG4gIC8vIOKAoiBpZiBubyBjdXN0b20gbm90aWZpY2F0aW9uIGhhcyBiZWVuIGhhbmRsZWQsIG1ha2UgYSBnZW5lcmFsIG9uZVxuICBpZiAoIHBvc3RFcnJvclJlZ2V4cC50ZXN0KCB0eXBlICkgKSB7XG4gICAgcmV0dXJuIG5vdGlmeUVycm9yKCBzdGF0ZSwgJ25vdGlmaWNhdGlvbnMuZ2VuZXJpYy5lcnJvcicsIHtcbiAgICAgIGFkZGl0aW9uYWxDb250ZW50OiBwYXlsb2FkLm1lc3NhZ2UsXG4gICAgfSApXG4gIH1cbiAgaWYgKCBwb3N0U3VjY2Vzc1JlZ2V4cC50ZXN0KCB0eXBlICkgKSB7XG4gICAgcmV0dXJuIG5vdGlmeVN1Y2Nlc3MoIHN0YXRlLCAnbm90aWZpY2F0aW9ucy5nZW5lcmljLnNhdmVkJyApXG4gIH1cblxuICByZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZU9uZSA9IHBhcmFtcyA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiAgICAgUkVNT1ZFLFxuICAgIHBheWxvYWQ6ICBwYXJhbXMsXG4gIH0pXG59XG4iLCJpbXBvcnQgY3JpbyBmcm9tICdjcmlvJ1xuaW1wb3J0IGlzTmlsIGZyb20gJ2xvZGFzaC5pc25pbCdcblxuaW1wb3J0IGNyZWF0ZUFjdGlvbk5hbWVzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWFjdGlvbi1uYW1lcydcbmltcG9ydCBmZXRjaERpc3BhdGNoIGZyb20gJy4vdXRpbHMvZmV0Y2gtZGlzcGF0Y2gnXG5cbmNvbnN0IE5BTUUgPSBgcXVvdGF0aW9uc2BcbmV4cG9ydCBjb25zdCBMSVNUX0FDVElWRSAgICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWFjdGl2ZWAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBMSVNUX0FSQ0hJVkVEICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWFyY2hpdmVkYCAgICAgICAgIClcbmV4cG9ydCBjb25zdCBMSVNUX0dFVF9SRUFEWV9JTlZPSUNFID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LXJlYWR5LXRvLWludm9pY2VgIClcbmV4cG9ydCBjb25zdCBMSVNUX0ZPUl9DVVNUT01FUiAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBsaXN0LWZvci1jdXN0b21lcmAgICAgIClcbmV4cG9ydCBjb25zdCBHRVRfT05FICAgICAgICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBnZXRgICAsIGBvbmVgICAgICAgICAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBTQVZFX09ORSAgICAgICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBvbmVgICAgICAgICAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBBUkNISVZFX1FVT1RFICAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBhcmNoaXZlYCAgICAgICAgICAgICAgIClcbmV4cG9ydCBjb25zdCBDUkVBVEVfSU5WT0lDRSAgICAgICAgID0gY3JlYXRlQWN0aW9uTmFtZXMoIE5BTUUsIGBwb3N0YCAsIGBjb252ZXJ0YCAgICAgICAgICAgICAgIClcblxuZXhwb3J0IGNvbnN0IExPQURJTkcgPSBjcmlvKHtcbiAgaXNMb2FkaW5nOiB0cnVlLFxuICByZWZlcmVuY2U6IGBsb2FkaW5n4oCmYCxcbiAgcHJvZHVjdHM6IFtdLFxufSlcblxuY29uc3QgaW5pdGlhbFN0YXRlID0gY3Jpbyh7XG4gIGlzU2F2aW5nOiBmYWxzZSxcbiAgbWV0YTogICAgIHtcbiAgICBhY3RpdmUgICAgICAgIDoge30sXG4gICAgYXJjaGl2ZWQgICAgICA6IHt9LFxuICAgIHJlYWR5VG9JbnZvaWNlOiB7fSxcbiAgfSxcbiAgYWN0aXZlICAgICAgICA6IFtdLFxuICBhcmNoaXZlZCAgICAgIDogW10sXG4gIHJlYWR5VG9JbnZvaWNlOiBbXSxcbiAgY3VycmVudDogICAgICBMT0FESU5HLFxufSlcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVkdWNlcihzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCwgbWV0YSB9ID0gYWN0aW9uXG5cbiAgc3dpdGNoICggdHlwZSApIHtcblxuICAgIGNhc2UgTElTVF9BQ1RJVkUuU1VDQ0VTUzpcbiAgICBjYXNlIExJU1RfRk9SX0NVU1RPTUVSLlNVQ0NFU1M6XG4gICAgICBzdGF0ZSA9IHN0YXRlLnNldCggYGFjdGl2ZWAsIHBheWxvYWQucm93cyApXG4gICAgICByZXR1cm4gIHN0YXRlLnNldCggYG1ldGEuYWN0aXZlYCwgcGF5bG9hZC5tZXRhIClcbiAgICBjYXNlIExJU1RfQVJDSElWRUQuU1VDQ0VTUzpcbiAgICAgIHN0YXRlID0gc3RhdGUuc2V0KCBgYXJjaGl2ZWRgLCBwYXlsb2FkLnJvd3MgKVxuICAgICAgcmV0dXJuICBzdGF0ZS5zZXQoIGBtZXRhLmFyY2hpdmVkYCwgcGF5bG9hZC5tZXRhIClcbiAgICBjYXNlIExJU1RfR0VUX1JFQURZX0lOVk9JQ0UuU1VDQ0VTUzpcbiAgICAgIHN0YXRlID0gc3RhdGUuc2V0KCBgcmVhZHlUb0ludm9pY2VgLCBwYXlsb2FkLnJvd3MgKVxuICAgICAgcmV0dXJuICBzdGF0ZS5zZXQoIGBtZXRhLnJlYWR5VG9JbnZvaWNlYCwgcGF5bG9hZC5tZXRhIClcblxuICAgIC8vIEJlIHN1cmUgdG8gcmVzZXQgY3VycmVudFxuICAgIC8vIOKAoiB3ZSBkb24ndCB3YW50IGEg4oCcc2hvd+KAnSBwYWdlIHRvIGhhdmUgbGVnYWN5IGRhdGFzIHRvIGJlZ2luIHdpdGhcbiAgICBjYXNlIExJU1RfQUNUSVZFLkxPQURJTkc6XG4gICAgY2FzZSBMSVNUX0FSQ0hJVkVELkxPQURJTkc6XG4gICAgY2FzZSBMSVNUX0dFVF9SRUFEWV9JTlZPSUNFLkxPQURJTkc6XG4gICAgY2FzZSBMSVNUX0ZPUl9DVVNUT01FUi5MT0FESU5HOlxuICAgIGNhc2UgR0VUX09ORS5MT0FESU5HOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCBMT0FESU5HIClcblxuICAgIGNhc2UgU0FWRV9PTkUuTE9BRElORzpcbiAgICBjYXNlIEFSQ0hJVkVfUVVPVEUuTE9BRElORzpcbiAgICBjYXNlIENSRUFURV9JTlZPSUNFLkxPQURJTkc6XG4gICAgICByZXR1cm4gc3RhdGUuc2V0KCBgaXNTYXZpbmdgLCB0cnVlIClcbiAgICBjYXNlIFNBVkVfT05FLkRPTkU6XG4gICAgY2FzZSBBUkNISVZFX1FVT1RFLkRPTkU6XG4gICAgY2FzZSBDUkVBVEVfSU5WT0lDRS5ET05FOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGlzU2F2aW5nYCwgZmFsc2UgKVxuXG4gICAgY2FzZSBHRVRfT05FLlNVQ0NFU1M6XG4gICAgY2FzZSBTQVZFX09ORS5TVUNDRVNTOlxuICAgICAgcmV0dXJuIHN0YXRlLnNldCggYGN1cnJlbnRgLCBwYXlsb2FkIClcblxuICAgIGNhc2UgQVJDSElWRV9RVU9URS5TVUNDRVNTOiB7XG4gICAgICBjb25zdCB7IGlkIH0gICAgICAgICA9IG1ldGFcbiAgICAgIGNvbnN0IHJlbW92ZUlkICAgICAgID0gcXVvdGF0aW9uID0+IHF1b3RhdGlvbi5pZCAhPT0gaWRcbiAgICAgIGNvbnN0IGFjdGl2ZSAgICAgICAgID0gc3RhdGUuZ2V0KCBgYWN0aXZlYCApLmZpbHRlciggcmVtb3ZlSWQgKVxuICAgICAgY29uc3QgcmVhZHlUb0ludm9pY2UgPSBzdGF0ZS5nZXQoIGByZWFkeVRvSW52b2ljZWAgKS5maWx0ZXIoIHJlbW92ZUlkIClcbiAgICAgIGNvbnN0IHVwZGF0ZWQgICAgICAgID0gc3RhdGUuc2V0KCBgYWN0aXZlYCwgYWN0aXZlIClcbiAgICAgICAgLnNldCggYHJlYWR5VG9JbnZvaWNlYCwgcmVhZHlUb0ludm9pY2UgKVxuICAgICAgICAuc2V0KCBgY3VycmVudGAsIHBheWxvYWQgKVxuICAgICAgcmV0dXJuIHVwZGF0ZWRcbiAgICB9XG5cbiAgICBjYXNlIENSRUFURV9JTlZPSUNFLlNVQ0NFU1M6IHtcbiAgICAgIGNvbnN0IHsgaWQgfSAgICAgID0gbWV0YVxuICAgICAgLy8gbWF5YmUgdGhlIHF1b3RhdGlvbiBpc24ndCBhbHJlYWR5IGluIHRoZSBsaXN0aW5nXG4gICAgICBjb25zdCBpbmRleCAgICAgICA9IHN0YXRlLmdldCggYHJlYWR5VG9JbnZvaWNlYCApXG4gICAgICAgIC5maW5kSW5kZXgocXVvdCA9PiBxdW90LmlkID09PSBpZClcbiAgICAgIGNvbnN0IHVwZGF0ZWQgICAgID0gaW5kZXggPCAwID8gIHN0YXRlXG4gICAgICAgIDogc3RhdGUuc2V0KCBgcmVhZHlUb0ludm9pY2VbJHtpbmRleH1dYCwgcGF5bG9hZCApXG4gICAgICAvLyBhbHdheXMgdXBkYXRlIHRoZSBjdXJyZW50IHF1b3RhdGlvblxuICAgICAgcmV0dXJuIHVwZGF0ZWQuc2V0KCBgY3VycmVudGAsIHBheWxvYWQgKVxuICAgIH1cblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbGlzdEFjdGl2ZSA9IChwYXJhbXMgPSB7fSwgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdXJsOiBgJHtOQU1FfWAsXG4gICAgLi4ucGFyYW1zLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9BQ1RJVkUsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsaXN0QXJjaGl2ZWQgPSAocGFyYW1zID0ge30sIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX0vYXJjaGl2ZWRgLFxuICAgIC4uLnBhcmFtcyxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBhY3Rpb25zOiAgIExJU1RfQVJDSElWRUQsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBsaXN0UmVhZHlUb0ludm9pY2UgPSAocGFyYW1zID0ge30sIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX0vcmVhZHktdG8taW52b2ljZWAsXG4gICAgLi4ucGFyYW1zLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9HRVRfUkVBRFlfSU5WT0lDRSxcbiAgICBmZXRjaDogICAgeyBvcHRpb25zLCBjb29raWUgfSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JDdXN0b21lciA9IChwYXJhbXMgPSB7fSwgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgaWQsIC4uLnJlc3QgfSA9IHBhcmFtc1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYC9jdXN0b21lcnMvJHsgaWQgfS8ke05BTUV9YCxcbiAgICAuLi5yZXN0LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6ICAgTElTVF9GT1JfQ1VTVE9NRVIsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRPbmUgPSAocGFyYW1zLCBjb29raWUpID0+IGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgbGV0IHsgaWQgfSA9IHBhcmFtc1xuICBpZCA9IGlkID8gaWQgOiBgbmV3YFxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7TkFNRX0vJHtpZH1gLFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIGFjdGlvbnM6IEdFVF9PTkUsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBzYXZlT25lID0gKHBhcmFtcywgY29va2llKSA9PiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgYm9keSB9ID0gcGFyYW1zXG4gIGNvbnN0IHsgaWQgfSA9IGJvZHlcbiAgY29uc3QgaXNOZXcgPSBpc05pbCggaWQgKVxuICBjb25zdCB1cmxJZCA9IGlzTmV3ID8gYG5ld2AgOiBpZFxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHVybDogYCR7IE5BTUUgfS8keyB1cmxJZCB9YCxcbiAgICBib2R5LFxuICB9XG4gIGF3YWl0IGZldGNoRGlzcGF0Y2goe1xuICAgIGRpc3BhdGNoLFxuICAgIG1ldGE6ICAgICB7IGlzTmV3IH0sXG4gICAgYWN0aW9uczogIFNBVkVfT05FLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgYXJjaGl2ZU9uZSA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGlkIH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAkeyBOQU1FIH0vJHsgaWQgfS9hcmNoaXZlYCxcbiAgICBib2R5OiB7fSxcbiAgfVxuICBhd2FpdCBmZXRjaERpc3BhdGNoKHtcbiAgICBkaXNwYXRjaCxcbiAgICBtZXRhOiAgICAgeyBpZCB9LFxuICAgIGFjdGlvbnM6ICBBUkNISVZFX1FVT1RFLFxuICAgIGZldGNoOiAgICB7IG9wdGlvbnMsIGNvb2tpZSB9LFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlSW52b2ljZSA9IChwYXJhbXMsIGNvb2tpZSkgPT4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IGlkIH0gPSBwYXJhbXNcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB1cmw6IGAkeyBOQU1FIH0vJHsgaWQgfS9jcmVhdGUtaW52b2ljZWAsXG4gICAgYm9keToge30sXG4gIH1cbiAgYXdhaXQgZmV0Y2hEaXNwYXRjaCh7XG4gICAgZGlzcGF0Y2gsXG4gICAgbWV0YTogICAgIHsgaWQgfSxcbiAgICBhY3Rpb25zOiAgQ1JFQVRFX0lOVk9JQ0UsXG4gICAgZmV0Y2g6ICAgIHsgb3B0aW9ucywgY29va2llIH0sXG4gIH0pXG59XG4iLCJpbXBvcnQgY3JpbyBmcm9tICdjcmlvJ1xuXG5jb25zdCBBUFBfUFJFRklYID0gYEBjb25jb21wdGVgXG5cbmNvbnN0IHByZWZpeGVzID0gY3Jpbyh7XG4gIGxvYWRpbmc6ICBgbG9hZGluZ2AsXG4gIGRvbmU6ICAgICBgZG9uZWAsXG4gIHN1Y2Nlc3M6ICBgc3VjY2Vzc2AsXG4gIGVycm9yOiAgICBgZXJyb3JgLFxufSlcblxuLy8gU21hbGwgdXRpbGl0eSB0byBnZW5lcmF0ZSBtdWx0aXBsZSBkaXNwYXRjaGVzIHR5cGVcbi8vIOKAoiBhbHdheXMgZ2V0IGEg4oCcL2xvYWRpbmfigJ0gYW5kIOKAnS9kb25l4oCdXG4vLyDigKIgZ2V0IG9uIG9mIOKAnC9zdWNjZXNz4oCdIG9yIOKAnC9lcnJvcuKAnSBkZXBlbmRpbmcgb24gdGhlIGZldGNoIHJlc3VsdFxuLy8gVGhpcyBjb3VsZCBoYXZlIGJlZW4gaGFuZGxlZCBieSBhIG1pZGRsZXdhcmUgdG9vXG4vLyDigKIgaHR0cHM6Ly9naXRodWIuY29tL3BidXJ0Y2hhZWxsL3JlZHV4LXByb21pc2UtbWlkZGxld2FyZVxuLy8g4oCiIGJ1dCBJIHdhbnQgdG8ga2VlcCBhcyBtdWNoIGFzIEkgY2FuIGF3YXkgZnJvbSBsaWJyYXJpZXNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uTmFtZXMoIGRvbWFpbiwgbWV0aG9kLCBuYW1lICkge1xuICBjb25zdCBfbWV0aG9kID0gbWV0aG9kID8gYC8keyBtZXRob2QgfWAgOiBgYFxuICByZXR1cm4ge1xuICAgIG1ldGhvZDogIG1ldGhvZCxcbiAgICBMT0FESU5HOiBgJHsgQVBQX1BSRUZJWCB9LyR7IGRvbWFpbiB9JHsgX21ldGhvZCB9LyR7IG5hbWUgfS8keyBwcmVmaXhlcy5sb2FkaW5nIH1gLFxuICAgIERPTkU6ICAgIGAkeyBBUFBfUFJFRklYIH0vJHsgZG9tYWluIH0keyBfbWV0aG9kIH0vJHsgbmFtZSB9LyR7IHByZWZpeGVzLmRvbmUgfWAsXG4gICAgU1VDQ0VTUzogYCR7IEFQUF9QUkVGSVggfS8keyBkb21haW4gfSR7IF9tZXRob2QgfS8keyBuYW1lIH0vJHsgcHJlZml4ZXMuc3VjY2VzcyB9YCxcbiAgICBFUlJPUjogICBgJHsgQVBQX1BSRUZJWCB9LyR7IGRvbWFpbiB9JHsgX21ldGhvZCB9LyR7IG5hbWUgfS8keyBwcmVmaXhlcy5lcnJvciB9YCxcbiAgfVxufVxuIiwiaW1wb3J0IGNyaW8gZnJvbSAnY3JpbydcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gubWVyZ2UnXG5cbmltcG9ydCAqIGFzIGlzb0ZldGNoIGZyb20gJy4uLy4uL2lzby1mZXRjaCdcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEaXNwYXRjaCggcGFyYW1zICkge1xuICBjb25zdCB7IGRpc3BhdGNoLCBmZXRjaCwgYWN0aW9ucywgbWV0YSA9IHt9IH0gPSBwYXJhbXNcbiAgY29uc3QgeyBvcHRpb25zLCBjb29raWUgfSA9IGZldGNoXG4gIGNvbnN0IHsgbWV0aG9kID0gYGdldGAgfSA9IGFjdGlvbnNcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6ICAgYWN0aW9ucy5MT0FESU5HLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgfSxcbiAgfSlcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGlzb0ZldGNoWyBtZXRob2QgXSggb3B0aW9ucywgY29va2llIClcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAgICAgYWN0aW9ucy5ET05FLFxuICAgICAgbWV0YSxcbiAgICAgIHBheWxvYWQ6ICB7fVxuICAgIH0pXG4gICAgaWYgKCBwYXlsb2FkLmVycm9yICkgIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogICAgIGFjdGlvbnMuRVJST1IsXG4gICAgICAgIG1ldGE6ICAgICBtZXJnZSggeyBfZmV0Y2hEaXNwYXRjaEVycm9yVHlwZTogYFJFU1BPTlNFX0VSUk9SYCB9LCBtZXRhICksXG4gICAgICAgIGVycm9yOiAgICB0cnVlLFxuICAgICAgICBwYXlsb2FkOiAgcGF5bG9hZCxcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogICAgIGFjdGlvbnMuU1VDQ0VTUyxcbiAgICAgICAgbWV0YSxcbiAgICAgICAgcGF5bG9hZDogIHBheWxvYWQsXG4gICAgICB9KVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogICAgIGFjdGlvbnMuRE9ORSxcbiAgICAgIG1ldGEsXG4gICAgICBwYXlsb2FkOiAge31cbiAgICB9KVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICAgICBhY3Rpb25zLkVSUk9SLFxuICAgICAgbWV0YTogICAgIG1lcmdlKCB7IF9mZXRjaERpc3BhdGNoRXJyb3JUeXBlOiBgRkVUQ0hfRVJST1JgIH0sIG1ldGEgKSxcbiAgICAgIGVycm9yOiAgICB0cnVlLFxuICAgICAgcGF5bG9hZDogIGVycixcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgTGF5b3V0Qm9hcmRpbmcgZnJvbSAnLi9sYXlvdXQvYm9hcmRpbmcnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHsgZXJyb3I6IG51bGwsIGVycm9ySW5mbzogbnVsbCB9XG4gIH1cblxuICBjb21wb25lbnREaWRDYXRjaChlcnJvciwgZXJyb3JJbmZvKSB7XG4gICAgLy8gQ2F0Y2ggZXJyb3JzIGluIGFueSBjb21wb25lbnRzIGJlbG93IGFuZCByZS1yZW5kZXIgd2l0aCBlcnJvciBtZXNzYWdlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgICBlcnJvckluZm86IGVycm9ySW5mbyxcbiAgICB9KVxuICAgIC8vIFlvdSBjYW4gYWxzbyBsb2cgZXJyb3IgbWVzc2FnZXMgdG8gYW4gZXJyb3IgcmVwb3J0aW5nIHNlcnZpY2UgaGVyZVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmVycm9ySW5mbykge1xuICAgICAgLy8gRXJyb3IgcGF0aFxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPExheW91dEJvYXJkaW5nXG4gICAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UuZXJyb3JcIiAvPn1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyB9fT5cbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLmVycm9yICYmIHRoaXMuc3RhdGUuZXJyb3IudG9TdHJpbmcoKX1cbiAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3JJbmZvLmNvbXBvbmVudFN0YWNrfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0xheW91dEJvYXJkaW5nPlxuICAgICAgKVxuICAgIH1cbiAgICAvLyBOb3JtYWxseSwganVzdCByZW5kZXIgY2hpbGRyZW5cbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7IFBpZUNoYXJ0ICwgUGllQ2hhcnREZWZzIH0gZnJvbSAnLi4vdWkvcGllLWNoYXJ0J1xuaW1wb3J0IHsgQW1vdW50ICAgLCBGb3JtYXROdW1iZXIgfSBmcm9tICcuLi91aS9mb3JtYXQnXG5cbmltcG9ydCAnLi9jaGFydHMuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgaG9tZS1jaGFydHNgXG5cbmV4cG9ydCBmdW5jdGlvbiBIb21lQ2hhcnRzKCBwcm9wcyApIHtcbiAgY29uc3QgeyBzdGF0aXN0aWNzIH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXsgQkFTRV9DTEFTUyB9PlxuICAgICAgPFBpZUNoYXJ0RGVmcyAvPlxuICAgICAgPFBpZUNoYXJ0XG4gICAgICAgIHRpdGxlPVwiXy5jb3VudFwiXG4gICAgICAgIHNsaWNlcz17W1xuICAgICAgICAgIHtsYWJlbDogYF8ucXVvdGF0aW9uc2AgLCB2YWx1ZTogc3RhdGlzdGljcy5xdW90YXRpb25zQ291bnQgfSxcbiAgICAgICAgICB7bGFiZWw6IGBfLmludm9pY2VzYCAgICwgdmFsdWU6IHN0YXRpc3RpY3MuaW52b2ljZXNDb3VudCAgIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIDxGb3JtYXROdW1iZXJcbiAgICAgICAgICB3cmFwcGVyUHJvcHM9e3tzdHlsZToge2ZvbnRTaXplOiBgM3JlbWB9fX1cbiAgICAgICAgICB2YWx1ZT17c3RhdGlzdGljcy5xdW90YXRpb25zQ291bnQgKyBzdGF0aXN0aWNzLmludm9pY2VzQ291bnQgfVxuICAgICAgICAvPlxuICAgICAgPC9QaWVDaGFydD5cbiAgICAgIDxQaWVDaGFydFxuICAgICAgICB0aXRsZT1cIl8uYW1vdW50XCJcbiAgICAgICAgdHlwZT1cImN1cnJlbmN5XCJcbiAgICAgICAgc2xpY2VzPXtbXG4gICAgICAgICAge2xhYmVsOiBgXy5xdW90YXRpb25zYCAgICAsIHZhbHVlOiBzdGF0aXN0aWNzLnF1b3RhdGlvbnNUb3RhbCAgIH0sXG4gICAgICAgICAge2xhYmVsOiBgXy5pbnZvaWNlcy5sZWZ0YCAsIHZhbHVlOiBzdGF0aXN0aWNzLmludm9pY2VzVG90YWxMZWZ0IH0sXG4gICAgICAgICAge2xhYmVsOiBgXy5pbnZvaWNlcy5wYWlkYCAsIHZhbHVlOiBzdGF0aXN0aWNzLmludm9pY2VzVG90YWxQYWlkIH0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIDxBbW91bnQgdmFsdWU9eyBzdGF0aXN0aWNzLnF1b3RhdGlvbnNUb3RhbCArIHN0YXRpc3RpY3MuaW52b2ljZXNUb3RhbCB9IC8+XG4gICAgICA8L1BpZUNoYXJ0PlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICB9IGZyb20gJ3JlYWN0LWhlbG1ldCdcblxuaW1wb3J0ICAgICAgQ29ubmVjdERhdGFGZXRjaGVyIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgYWNjb3VudCAgICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2FjY291bnQnXG5pbXBvcnQgKiBhcyBxdW90YXRpb25zICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9pbnZvaWNlcydcbmltcG9ydCB7IE5hdlNlY29uZGFyeSAgICAgICAgICAgICAgICB9IGZyb20gJy4uL25hdi9zZWNvbmRhcnknXG5pbXBvcnQgeyBCdXR0b25OZXcgICAgICAgICAgICAgICAgICAgfSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5LWJ1dHRvbnMnXG5pbXBvcnQgeyBNYWluICAgICAgICAgLCBDb250ZW50ICAgICAgfSBmcm9tICcuLi9sYXlvdXQvbWFpbidcbmltcG9ydCB7IEFjdGl2ZUludm9pY2VzIH0gZnJvbSAgJy4uL2ludm9pY2VzL2xpc3QnXG5pbXBvcnQge1xuICBBY3RpdmVRdW90YXRpb25zLFxuICBRdW90YXRpb25zUmVhZHlUb0ludm9pY2UsXG59IGZyb20gJy4uL3F1b3RhdGlvbnMvbGlzdCdcbmltcG9ydCB7IEhvbWVDaGFydHMgfSBmcm9tICcuL2NoYXJ0cydcblxuZnVuY3Rpb24gSG9tZSggcHJvcHMgKSB7XG4gIGNvbnN0IHtcbiAgICBzdGF0aXN0aWNzLFxuICAgIHF1b3RhdGlvbnNSZWFkeVRvSW52b2ljZSxcbiAgICBpbnZvaWNlcyxcbiAgfSA9IHByb3BzXG4gIGNvbnN0IHRpdGxlUHJvcHMgPSB7IGlkOiBgcGFnZS5ob21lYCB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICB7LyogaHR0cHM6Ly9naXRodWIuY29tL25mbC9yZWFjdC1oZWxtZXQvaXNzdWVzLzI2OCNpc3N1ZWNvbW1lbnQtMzY4MTQ4MjQ5ICovfVxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgICA8QnV0dG9uTmV3IHR5cGU9XCJxdW90YXRpb25zXCIgbWVzc2FnZT1cInF1b3RhdGlvbi5idXR0b24ubmV3XCIgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuICAgICAgPE1haW4+XG4gICAgICAgIDxDb250ZW50PlxuICAgICAgICAgIDxIb21lQ2hhcnRzIHN0YXRpc3RpY3M9eyBzdGF0aXN0aWNzIH0gLz5cbiAgICAgICAgICA8QWN0aXZlUXVvdGF0aW9ucyB0aXRsZT1cInBhZ2UucXVvdGF0aW9uc1wiIC8+XG4gICAgICAgICAgPFF1b3RhdGlvbnNSZWFkeVRvSW52b2ljZSAvPlxuICAgICAgICAgIDxBY3RpdmVJbnZvaWNlcyB0aXRsZT1cInBhZ2UuaW52b2ljZXNcIiAvPlxuICAgICAgICA8L0NvbnRlbnQ+XG4gICAgICA8L01haW4+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wcyggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgc3RhdGlzdGljcyA6IHN0YXRlLmFjY291bnQgLmdldCggYHN0YXRpc3RpY3NgICksXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcHMgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBIb21lLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIHF1b3RhdGlvbnMubGlzdEFjdGl2ZSxcbiAgICBxdW90YXRpb25zLmxpc3RSZWFkeVRvSW52b2ljZSxcbiAgICBpbnZvaWNlcy5saXN0QWN0aXZlLFxuICAgIGFjY291bnQuc3RhdGlzdGljcyxcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuaW1wb3J0IHsgQnV0dG9uLCBCdG5JY29uIH0gZnJvbSAnLi4vdWkvYnV0dG9ucydcblxuLy8tLS0tLSBTSE9XIFFVT1RBVElPTlxuXG5mdW5jdGlvbiBCdXR0b25TaG93UXVvdGF0aW9uKCBwcm9wcyApIHtcbiAgY29uc3QgeyBxdW90YXRpb25JZCwgaXNTYXZpbmcgfSA9IHByb3BzXG4gIGlmICggIXF1b3RhdGlvbklkICkgcmV0dXJuIG51bGxcbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uIHNlY29uZGFyeVxuICAgICAgdG89e2AvcXVvdGF0aW9ucy8keyBxdW90YXRpb25JZCB9L3ByZXZpZXdgIH1cbiAgICAgIGRpc2FibGVkPXsgaXNTYXZpbmcgfVxuICAgID5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMuYnV0dG9uLnF1b3RhdGlvblwiIC8+XG4gICAgPC9CdXR0b24+XG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IFNob3dRdW90YXRpb24gPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIHF1b3RhdGlvbklkOiBzdGF0ZS5pbnZvaWNlcy5nZXQoIGBjdXJyZW50LnF1b3RhdGlvbi5pZGAgKSxcbiAgICBpc1NhdmluZyAgIDogc3RhdGUuaW52b2ljZXMuZ2V0KCBgaXNTYXZpbmdgICksXG4gIH0pXG4pKCBCdXR0b25TaG93UXVvdGF0aW9uIClcblxuLy8tLS0tLSBBUkNISVZFXG5cbmZ1bmN0aW9uIEJ1dHRvbkFyY2hpdmVJbnZvaWNlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpbnZvaWNlLCBhcmNoaXZlT25lLCBpc1NhdmluZywgaWNvbiwgLi4ub3RoZXJzIH0gPSBwcm9wc1xuICBpZiAoICFpbnZvaWNlICkgcmV0dXJuIG51bGxcblxuICBjb25zdCBhcmNoaXZlZEF0ID0gaW52b2ljZS5nZXQoIGBhcmNoaXZlZEF0YCApXG4gIGlmICggYXJjaGl2ZWRBdCApIHJldHVybiBudWxsXG5cbiAgY29uc3QgaWQgICAgICAgPSBpbnZvaWNlLmdldCggYGlkYCApXG4gIGNvbnN0IGJ0blByb3BzID0ge1xuICAgIG9uQ2xpY2s6IGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGFyY2hpdmVPbmUoe2lkfSlcbiAgICB9LFxuICAgIHR5cGUgICAgICA6IGBzdWJtaXRgICAgICAgICAgICAgICAgICAgICxcbiAgICBmb3JtTWV0aG9kOiBgcG9zdGAgICAgICAgICAgICAgICAgICAgICAsXG4gICAgZm9ybUFjdGlvbjogYC9pbnZvaWNlcy8keyBpZCB9L2FyY2hpdmVgLFxuICAgIGRpc2FibGVkICA6IGlzU2F2aW5nICAgICAgICAgICAgICAgICAgICxcbiAgICAuLi5vdGhlcnNcbiAgfVxuICBpZiAoIGljb24gKSByZXR1cm4gPEJ0bkljb24gc3ZnSWQ9XCJhcmNoaXZlXCIgey4uLmJ0blByb3BzIH0vPlxuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvbiB7Li4uYnRuUHJvcHMgfSA+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLmJ1dHRvbi5hcmNoaXZlXCIgLz5cbiAgICA8L0J1dHRvbj5cbiAgKVxufVxuXG5leHBvcnQgY29uc3QgQXJjaGl2ZUludm9pY2UgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGlzU2F2aW5nOiBzdGF0ZS5pbnZvaWNlcy5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgfSksXG4gIGRpc3BhdGNoID0+IGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgYXJjaGl2ZU9uZTogaW52b2ljZXMuYXJjaGl2ZU9uZSxcbiAgfSwgZGlzcGF0Y2gpLFxuKSggQnV0dG9uQXJjaGl2ZUludm9pY2UgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAqIGFzIFRhYmxlICAgICAgICBmcm9tICcuLi91aS10YWJsZSdcbmltcG9ydCB7ICAgIERhdGVQaWNrZXIgfSBmcm9tICcuLi91aS9kYXRlLXBpY2tlcidcbmltcG9ydCB7ICAgIEJ0bkljb24gICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuXG5mdW5jdGlvbiBJbnZvaWNlRXZlbnRTZW50RWRpdGFibGUoIHByb3BzICkge1xuICBjb25zdCB7IGludm9pY2UsIGhhbmRsZSB9ID0gcHJvcHNcbiAgcmV0dXJuIChcbiAgICA8VGFibGUuUm93PlxuICAgICAgPFRhYmxlLkNlbGwgLz5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLmV2ZW50LnNlbnRcIiAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cInRleHRcIj4g4oCTIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgIG5hbWU9XCJzZW5kQXRcIlxuICAgICAgICAgIHZhbHVlPXsgaW52b2ljZS5nZXQoYHNlbmRBdGApIH1cbiAgICAgICAgICBoYW5kbGVEYXlDaGFuZ2U9eyBoYW5kbGUuZGF5Q2hhbmdlIH1cbiAgICAgICAgLz5cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsIHR5cGU9XCJudW1iZXJcIj4g4oCTIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsIC8+XG4gICAgPC9UYWJsZS5Sb3c+XG4gIClcbn1cbmV4cG9ydCB7IEludm9pY2VFdmVudFNlbnRFZGl0YWJsZSBhcyBTZW50IH1cblxuZnVuY3Rpb24gSW52b2ljZUV2ZW50UGF5bWVudEVkaXRhYmxlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBwYXltZW50LCBoYW5kbGUsIGluZGV4LCBub3RMYXN0IH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxUYWJsZS5Sb3cga2V5PXtwYXltZW50LmdldChgX2lkYCl9ID5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiaGlkZGVuXCJcbiAgICAgICAgICBuYW1lPXtgJHtwYXltZW50Ll9maWVsZFBhdGh9W19pZF1gfVxuICAgICAgICAgIHZhbHVlPXsgcGF5bWVudC5nZXQoYF9pZGApIH1cbiAgICAgICAgLz5cbiAgICAgICAgeyBpbmRleCArIDEgfVxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMuZXZlbnQucGF5bWVudFwiIC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGtleT17YCR7cGF5bWVudC5fZmllbGRQYXRofS0ke3BheW1lbnQuZ2V0KGBfaWRgKX0tbWVzc2FnZWB9XG4gICAgICAgICAgbmFtZT17YCR7cGF5bWVudC5fZmllbGRQYXRofVttZXNzYWdlXWB9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXtwYXltZW50LmdldChgbWVzc2FnZWApfVxuICAgICAgICAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxEYXRlUGlja2VyXG4gICAgICAgICAgbmFtZT17YCR7cGF5bWVudC5fZmllbGRQYXRofVtkYXRlXWB9XG4gICAgICAgICAgdmFsdWU9eyBwYXltZW50LmdldChgZGF0ZWApIH1cbiAgICAgICAgICBoYW5kbGVEYXlDaGFuZ2U9eyBoYW5kbGUuZGF5Q2hhbmdlIH1cbiAgICAgICAgLz5cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICBrZXk9e2Ake3BheW1lbnQuX2ZpZWxkUGF0aH0tJHtwYXltZW50LmdldChgX2lkYCl9YH1cbiAgICAgICAgICBuYW1lPXtgJHtwYXltZW50Ll9maWVsZFBhdGh9W2Ftb3VudF1gfVxuICAgICAgICAgIGRlZmF1bHRWYWx1ZT17IHBheW1lbnQuZ2V0KGBhbW91bnRgKSB9XG4gICAgICAgIC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAge25vdExhc3QmJiA8QnRuSWNvblxuICAgICAgICAgIGxpbmtBbGlrZVxuICAgICAgICAgIG9uQ2xpY2s9eyBlID0+IGhhbmRsZS5yZW1vdmVQYXltZW50KGluZGV4LCBwYXltZW50Ll9maWVsZFBhdGgpIH1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBzdmdJZD1cImRlbGV0ZVwiXG4gICAgICAgIC8+fVxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgIDwvVGFibGUuUm93PlxuICApXG59XG5leHBvcnQgeyBJbnZvaWNlRXZlbnRQYXltZW50RWRpdGFibGUgYXMgUGF5bWVudCB9XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0ICogYXMgVGFibGUgIGZyb20gJy4uL3VpLXRhYmxlJ1xuaW1wb3J0ICogYXMgRm9ybWF0IGZyb20gJy4uL3VpL2Zvcm1hdCdcblxuZnVuY3Rpb24gSW52b2ljZUV2ZW50U2VudFJlYWQoIHByb3BzICkge1xuICBjb25zdCB7IGludm9pY2UsIGhhbmRsZSB9ID0gcHJvcHNcbiAgcmV0dXJuIChcbiAgICA8VGFibGUuUm93PlxuICAgICAgPFRhYmxlLkNlbGwgLz5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImludm9pY2VzLmV2ZW50LnNlbnRcIiAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cInRleHRcIj4g4oCTIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsPlxuICAgICAgICA8Rm9ybWF0LkRheSB2YWx1ZT17aW52b2ljZS5nZXQoYHNlbmRBdGApfSAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cIm51bWJlclwiPiDigJMgPC9UYWJsZS5DZWxsPlxuICAgIDwvVGFibGUuUm93PlxuICApXG59XG5leHBvcnQgeyBJbnZvaWNlRXZlbnRTZW50UmVhZCBhcyBTZW50IH1cblxuZnVuY3Rpb24gSW52b2ljZUV2ZW50UGF5bWVudFJlYWQoIHByb3BzICkge1xuICBjb25zdCB7IHBheW1lbnQsIGNvdW50IH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxUYWJsZS5Sb3c+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgeyBjb3VudCB9XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJpbnZvaWNlcy5ldmVudC5wYXltZW50XCIgLz5cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgIHsgcGF5bWVudC5nZXQoYG1lc3NhZ2VgKSB9XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCB0eXBlPVwiZGF0ZVwiPlxuICAgICAgICA8Rm9ybWF0LkRheSB2YWx1ZT17IHBheW1lbnQuZ2V0KGBkYXRlYCkgfSAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cImFtb3VudFwiPlxuICAgICAgICA8Rm9ybWF0LkFtb3VudCB2YWx1ZT17IHBheW1lbnQuZ2V0KGBhbW91bnRgKSB9IC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgPC9UYWJsZS5Sb3c+XG4gIClcbn1cbmV4cG9ydCB7IEludm9pY2VFdmVudFBheW1lbnRSZWFkIGFzIFBheW1lbnQgfVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCB7IFRhYmxlLCBSb3csIENlbGwsIFRhYmxlRm9vdGVyLCBSb3dGb290ZXIgfSBmcm9tICcuLi91aS10YWJsZSdcbmltcG9ydCB7ICAgIEJ0bkljb24gICAgICAgIH0gZnJvbSAnLi4vdWkvYnV0dG9ucydcbmltcG9ydCB7ICAgIERhdGVQaWNrZXIgICAgIH0gZnJvbSAnLi4vdWkvZGF0ZS1waWNrZXInXG5pbXBvcnQgeyAgICBBbW91bnQgICAgICAgICB9IGZyb20gJy4uL3VpL2Zvcm1hdCdcblxuY29uc3QgZXZlbnRzQ29sdW1ucyA9IFtcbiAge2lkOiBgaWRgICAgICAgICAgLCBsYWJlbDogYGludm9pY2VzLmV2ZW50LiNgICAgICAgICAgICwgdHlwZTogYGlkYCAgICAgICAgICAgfSxcbiAge2lkOiBgZXZlbnRgICAgICAgLCBsYWJlbDogYGludm9pY2VzLmV2ZW50YCAgICAgICAgICAgICwgdHlwZTogYHRleHRgICAgICAgICAgfSxcbiAge2lkOiBgZGVzY3JpcHRpb25gLCBsYWJlbDogYGludm9pY2VzLmV2ZW50LmRlc2NyaXB0aW9uYCwgdHlwZTogYGlucHV0YCAgICAgICAgfSxcbiAge2lkOiBgZGF0ZWAgICAgICAgLCBsYWJlbDogYGludm9pY2VzLmV2ZW50LmRhdGVgICAgICAgICwgdHlwZTogYGlucHV0IGRhdGVgICAgfSxcbiAge2lkOiBgYW1vdW50YCAgICAgLCBsYWJlbDogYGludm9pY2VzLmV2ZW50LmFtb3VudGAgICAgICwgdHlwZTogYGlucHV0IGFtb3VudGAgfSxcbiAge2lkOiBgYWN0aW9uYCAgICAgLCBsYWJlbDogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICwgdHlwZTogYGFjdGlvbmAgICAgICAgfSxcbl1cblxuZnVuY3Rpb24gSW52b2ljZUV2ZW50c0Zvb3RlciggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaW52b2ljZSwgaGlkZUNvbHVtbnMgfSA9IHByb3BzXG5cbiAgcmV0dXJuIChcbiAgICA8VGFibGVGb290ZXI+XG4gICAgICA8Um93Rm9vdGVyPlxuICAgICAgICA8Q2VsbCBjb2xTcGFuPVwiNFwiPlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwidGFibGUuYW1vdW50LnBhaWRcIiAvPlxuICAgICAgICA8L0NlbGw+XG4gICAgICAgIDxDZWxsIHR5cGU9XCJhbW91bnRcIj5cbiAgICAgICAgICA8QW1vdW50IHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsUGFpZGApIH0gLz5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgICB7ICFoaWRlQ29sdW1ucyAmJiA8Q2VsbCAvPiB9XG4gICAgICA8L1Jvd0Zvb3Rlcj5cbiAgICAgIDxSb3dGb290ZXI+XG4gICAgICAgIDxDZWxsIGNvbFNwYW49XCI0XCI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5hbW91bnQubGVmdC10by1wYXlcIiAvPlxuICAgICAgICA8L0NlbGw+XG4gICAgICAgIDxDZWxsIHR5cGU9XCJhbW91bnRcIj5cbiAgICAgICAgICA8QW1vdW50IHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsTGVmdGApIH0gLz5cbiAgICAgICAgPC9DZWxsPlxuICAgICAgICB7ICFoaWRlQ29sdW1ucyAmJiA8Q2VsbCAvPiB9XG4gICAgICA8L1Jvd0Zvb3Rlcj5cbiAgICA8L1RhYmxlRm9vdGVyPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbnZvaWNlRXZlbnRzKCBwcm9wcyApIHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgcmV0dXJuIChcbiAgICA8VGFibGVcbiAgICAgIGNvbHVtbnM9eyBldmVudHNDb2x1bW5zIH1cbiAgICAgIGZvb3Rlcj17IDxJbnZvaWNlRXZlbnRzRm9vdGVyIHsuLi5yZXN0fSAvPiB9XG4gICAgICB7Li4ucmVzdH1cbiAgICA+XG4gICAgICB7IGNoaWxkcmVuIH1cbiAgICA8L1RhYmxlPlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIGZsb3cgICAgICAgICAgICAgICAgIGZyb20gJ2xvZGFzaC5mbG93J1xuaW1wb3J0ICAgY3JpbyAgICAgICAgICAgICAgICAgZnJvbSAnY3JpbydcbmltcG9ydCAgIHNob3J0aWQgICAgICAgICAgICAgIGZyb20gJ3Nob3J0aWQnXG5pbXBvcnQgICBzZXJpYWxpemUgICAgICAgICAgICBmcm9tICdmb3JtLXNlcmlhbGl6ZSdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuaW1wb3J0ICogYXMgcmVkaXJlY3Rpb24gICAgICAgZnJvbSAnLi4vdXRpbHMvY2hlY2stcmVkaXJlY3Rpb24nXG5pbXBvcnQgeyAgICBGb3JtICAgICAgICAgICAgfSBmcm9tICcuLi91aS9mb3JtJ1xuaW1wb3J0IHsgICAgU3Bpbm5lciAgICAgICAgIH0gZnJvbSAnLi4vdWkvc3Bpbm5lcidcbmltcG9ydCAgICAgIEludm9pY2VGb3JtUHJlcyAgIGZyb20gJy4vZm9ybS5wcmVzJ1xuXG5leHBvcnQgY29uc3QgRk9STV9JRCA9IGBpbnZvaWNlLWZvcm1gXG5cbmZ1bmN0aW9uIHVwZGF0ZVBheW1lbnRzKCBmb3JtRGF0YSApIHtcbiAgY29uc3QgcGF5bWVudHMgICAgICAgID0gZm9ybURhdGEuZ2V0KCBgcGF5bWVudHNgIClcbiAgaWYgKCAhY3Jpby5pc0FycmF5KHBheW1lbnRzKSApIHJldHVybiBmb3JtRGF0YVxuICBjb25zdCB1cGRhdGVkUGF5bWVudHMgPSBwYXltZW50c1xuICAgIC5maWx0ZXIoIHBheW1lbnQgPT4gcGF5bWVudC5tZXNzYWdlIHx8IHBheW1lbnQuZGF0ZSB8fCBwYXltZW50LmFtb3VudCApXG4gICAgLm1hcCggcGF5bWVudCA9PiB7XG4gICAgICBpZiAoIXBheW1lbnQuX2lkKSByZXR1cm4gcGF5bWVudC5zZXQoIGBfaWRgLCBzaG9ydGlkKCkgKVxuICAgICAgcmV0dXJuIHBheW1lbnRcbiAgICB9IClcbiAgICAucHVzaChjcmlvKHtcbiAgICAgIF9pZDogICAgICBzaG9ydGlkKCksXG4gICAgICBtZXNzYWdlOiAgYGAsXG4gICAgICBkYXRlOiAgICAgYGAsXG4gICAgICBhbW91bnQ6ICAgMCxcbiAgICB9KSlcbiAgcmV0dXJuIGZvcm1EYXRhLnNldCggYHBheW1lbnRzYCwgdXBkYXRlZFBheW1lbnRzIClcbn1cbmZ1bmN0aW9uIHJlbW92ZUxpbmUoeyBpbmRleCwgZm9ybURhdGEgfSkge1xuICBjb25zdCBwYXltZW50cyA9IGZvcm1EYXRhLmdldCggYHBheW1lbnRzYCApXG4gIGlmICggIWNyaW8uaXNBcnJheShwYXltZW50cykgKSByZXR1cm4gZm9ybURhdGFcbiAgcmV0dXJuIGZvcm1EYXRhLnNldCggYHBheW1lbnRzYCwgcGF5bWVudHMuc3BsaWNlKCBpbmRleCwgMSApKVxufVxuZnVuY3Rpb24gcmVjb21wdXRlVG90YWxzKCBmb3JtRGF0YSApIHtcbiAgY29uc3QgcGF5bWVudHMgPSBmb3JtRGF0YS5nZXQoIGBwYXltZW50c2AgKVxuICBpZiAoICFjcmlvLmlzQXJyYXkocGF5bWVudHMpICkgcmV0dXJuIGZvcm1EYXRhXG4gIGNvbnN0IHRvdGFsID0gZm9ybURhdGEuZ2V0KCBgdG90YWxgIClcbiAgY29uc3QgcGFpZCAgPSBwYXltZW50c1xuICAgIC5yZWR1Y2UoIChhY2MsIHBheW1lbnQpID0+IHBhcnNlRmxvYXQocGF5bWVudC5hbW91bnQsIDEwKSArIGFjYywgMClcbiAgY29uc3QgbGVmdCAgPSB0b3RhbCAtIHBhaWRcbiAgcmV0dXJuIGZvcm1EYXRhXG4gICAgLnNldChgdG90YWxQYWlkYCwgcGFpZCApXG4gICAgLnNldChgdG90YWxMZWZ0YCwgbGVmdCApXG59XG5mdW5jdGlvbiB1cGRhdGVQYXltZW50c0ZpZWxkUGF0aCggZm9ybURhdGEgKSB7XG4gIGNvbnN0IHBheW1lbnRzID0gZm9ybURhdGEuZ2V0KCBgcGF5bWVudHNgIClcbiAgaWYgKCAhY3Jpby5pc0FycmF5KHBheW1lbnRzKSApIHJldHVybiBmb3JtRGF0YVxuICBjb25zdCB1cGRhdGVkICAgPSBwYXltZW50cy5tYXAoIChwYXltZW50LCBpbmRleCkgPT4ge1xuICAgIHJldHVybiBwYXltZW50LnNldChgX2ZpZWxkUGF0aGAsIGBwYXltZW50c1ske2luZGV4fV1gKVxuICB9KVxuICByZXR1cm4gZm9ybURhdGEuc2V0KCBgcGF5bWVudHNgLCB1cGRhdGVkIClcbn1cblxuY2xhc3MgSW52b2ljZUZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCBwcm9wcyApIHtcbiAgICBzdXBlciggcHJvcHMgKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZvcm1EYXRhOiBJbnZvaWNlRm9ybS51cGRhdGVQYXltZW50cyggcHJvcHMuaW52b2ljZSApLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCAgICAgICAgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKCB0aGlzIClcbiAgICB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UgICAgPSB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVEYXlDaGFuZ2UgICAgID0gdGhpcy5oYW5kbGVEYXlDaGFuZ2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVSZW1vdmVQYXltZW50ID0gdGhpcy5oYW5kbGVSZW1vdmVQYXltZW50LmJpbmQoIHRoaXMgKVxuICB9XG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoIG5leHRQcm9wcywgcHJldlN0YXRlICkge1xuICAgIGNvbnN0ICAgbmV4dCAgICAgICAgICAgICAgICA9IG5leHRQcm9wcy5pbnZvaWNlXG4gICAgY29uc3QgICBjdXJyZW50ICAgICAgICAgICAgID0gcHJldlN0YXRlLmZvcm1EYXRhXG4gICAgY29uc3QgeyBoaXN0b3J5LCBzdGF0aWNDb250ZXh0LCBpc1NhdmluZyB9ID0gbmV4dFByb3BzXG4gICAgaWYgKCBpc1NhdmluZyApIHJldHVybiBudWxsXG4gICAgaWYgKCBjdXJyZW50ID09PSBuZXh0ICkgcmV0dXJuIG51bGxcblxuICAgIC8vIHJlZGlyZWN0c1xuICAgIHJlZGlyZWN0aW9uLmludm9pY2Uoe1xuICAgICAgbmV4dCxcbiAgICAgIGN1cnJlbnQsXG4gICAgICBoaXN0b3J5LFxuICAgICAgc3RhdGljQ29udGV4dCxcbiAgICB9KVxuXG4gICAgcmV0dXJuIHsgZm9ybURhdGE6IEludm9pY2VGb3JtLnVwZGF0ZVBheW1lbnRzKCBuZXh0ICkgfVxuICB9XG5cbiAgLy8tLS0tLSBVVElMU1xuXG4gIHN0YXRpYyBpc1BheW1lbnRGaWVsZE5hbWUoIGlucHV0TmFtZSApIHtcbiAgICByZXR1cm4gL15wYXltZW50c1xcW1xcZCtcXF0vLnRlc3QoIGlucHV0TmFtZSApXG4gIH1cblxuICBzdGF0aWMgdXBkYXRlUGF5bWVudHMgPSBmbG93KFxuICAgIHVwZGF0ZVBheW1lbnRzLFxuICAgIHVwZGF0ZVBheW1lbnRzRmllbGRQYXRoLFxuICAgIHJlY29tcHV0ZVRvdGFscyxcbiAgKVxuICBzdGF0aWMgcmVtb3ZlTGluZSA9IGZsb3coXG4gICAgcmVtb3ZlTGluZSxcbiAgICB1cGRhdGVQYXltZW50c0ZpZWxkUGF0aCxcbiAgICByZWNvbXB1dGVUb3RhbHMsXG4gIClcblxuICAvLy0tLS0tIEVWRU5UU1xuXG4gIGhhbmRsZVN1Ym1pdCggZXZlbnQgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGJvZHkgPSBzZXJpYWxpemUoIGV2ZW50LnRhcmdldCwgeyBoYXNoOiB0cnVlLCBlbXB0eTogdHJ1ZSB9IClcbiAgICB0aGlzLnByb3BzLnNhdmUoeyBib2R5IH0pXG4gIH1cbiAgaGFuZGxlRm9ybUNoYW5nZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gdGFyZ2V0XG4gICAgdGhpcy5zZXRTdGF0ZSggcHJldlN0YXRlID0+IHtcbiAgICAgIGxldCB1cGRhdGVkICAgICAgICAgICA9IHByZXZTdGF0ZS5mb3JtRGF0YS5zZXQoIG5hbWUsIHZhbHVlIClcbiAgICAgIGNvbnN0IGlzUGF5bWVudENoYW5nZSA9IEludm9pY2VGb3JtLmlzUGF5bWVudEZpZWxkTmFtZSggbmFtZSApXG4gICAgICBpZiAoIGlzUGF5bWVudENoYW5nZSApIHVwZGF0ZWQgPSBJbnZvaWNlRm9ybS51cGRhdGVQYXltZW50cyggdXBkYXRlZCApXG4gICAgICByZXR1cm4geyBmb3JtRGF0YTogdXBkYXRlZCB9XG4gICAgfSlcbiAgfVxuICBoYW5kbGVEYXlDaGFuZ2UoIHRhcmdldCApIHtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVGb3JtQ2hhbmdlKHt0YXJnZXR9KVxuICB9XG4gIGhhbmRsZVJlbW92ZVBheW1lbnQoIGluZGV4ICkge1xuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICBjb25zdCB7IGZvcm1EYXRhIH0gPSBwcmV2U3RhdGVcbiAgICAgIGNvbnN0IHVwZGF0ZWQgICAgICA9IEludm9pY2VGb3JtLnJlbW92ZUxpbmUoIHtmb3JtRGF0YSwgaW5kZXh9IClcbiAgICAgIHJldHVybiB7IGZvcm1EYXRhOiB1cGRhdGVkIH1cbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLSBSRU5ERVJcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpc1NhdmluZywgaXNMb2FkaW5nIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyBmb3JtRGF0YSB9ID0gdGhpcy5zdGF0ZVxuICAgIGlmICggaXNMb2FkaW5nICkgcmV0dXJuIDxTcGlubmVyIC8+XG5cbiAgICBjb25zdCByZW5kZXJQcm9wcyA9IHtcbiAgICAgIGludm9pY2U6IGZvcm1EYXRhLFxuICAgICAgaGFuZGxlOiB7XG4gICAgICAgIGRheUNoYW5nZSAgICAgOiB0aGlzLmhhbmRsZURheUNoYW5nZSxcbiAgICAgICAgcmVtb3ZlUGF5bWVudCA6IHRoaXMuaGFuZGxlUmVtb3ZlUGF5bWVudCxcbiAgICAgIH0sXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybVxuICAgICAgICBpZD17IEZPUk1fSUQgfVxuICAgICAgICBpc1NhdmluZz17IGlzU2F2aW5nIH1cbiAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UgfVxuICAgICAgICBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWl0IH1cbiAgICAgID5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBkZWZhdWx0VmFsdWU9eyBmb3JtRGF0YS5nZXQoYGlkYCkgfSBuYW1lPVwiaWRcIiAvPlxuICAgICAgICA8SW52b2ljZUZvcm1QcmVzIHsuLi5yZW5kZXJQcm9wc30vPlxuICAgICAgPC9Gb3JtPlxuICAgIClcbiAgfVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHtcbiAgICBpc1NhdmluZyA6IHN0YXRlLmludm9pY2VzLmdldCggYGlzU2F2aW5nYCApLFxuICAgIGludm9pY2UgIDogc3RhdGUuaW52b2ljZXMuZ2V0KCBgY3VycmVudGAgKSxcbiAgICBpc0xvYWRpbmc6IHN0YXRlLmludm9pY2VzLmdldCggYGN1cnJlbnQuaXNMb2FkaW5nYCApLFxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoMnByb3AoIGRpc3BhdGNoICkge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBzYXZlOiBpbnZvaWNlcy5zYXZlT25lLFxuICB9LCBkaXNwYXRjaClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcCwgZGlzcGF0Y2gycHJvcCApKCBJbnZvaWNlRm9ybSApXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgeyAgICBGb3JtQWN0aW9ucyAgIH0gZnJvbSAnLi4vdWkvZm9ybSdcbmltcG9ydCB7ICAgIEJ1dHRvbiAgICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0IHsgICAgUHJvZ3Jlc3MgICAgICB9IGZyb20gJy4uL3VpL3Byb2dyZXNzJ1xuaW1wb3J0IHsgICAgUHJldmlldyAgICAgICB9IGZyb20gJy4uL3VpL3ByZXZpZXcnXG5pbXBvcnQgKiBhcyBUYWJzICAgICAgICAgICAgZnJvbSAnLi4vdWkvdGFicydcbmltcG9ydCB7IFNob3dRdW90YXRpb24sIEFyY2hpdmVJbnZvaWNlIH0gZnJvbSAnLi9idXR0b25zJ1xuaW1wb3J0IHsgICAgSW52b2ljZUhlYWRlciAgfSBmcm9tICcuL2hlYWRlcidcbmltcG9ydCB7ICAgIEludm9pY2VFdmVudHMgIH0gZnJvbSAnLi9ldmVudHMtdGFibGUnXG5pbXBvcnQgKiBhcyBFdmVudHNFZGl0YWJsZSAgIGZyb20gJy4vZXZlbnRzLWVkaXRhYmxlJ1xuXG5leHBvcnQgY29uc3QgQkFTRV9DTEFTUyAgICA9IGBpbnZvaWNlLWZvcm1gXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEludm9pY2VGb3JtUHJlcyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaW52b2ljZSwgaGFuZGxlIH0gPSBwcm9wc1xuICBjb25zdCBwYXltZW50cyA9IGludm9pY2UuZ2V0KCBgcGF5bWVudHNgIClcblxuICByZXR1cm4gKFxuICAgIDxUYWJzLldyYXBwZXI+XG4gICAgICA8VGFicy5MaXN0PlxuICAgICAgICA8VGFicy5IZWFkZXI+XG4gICAgICAgICAgPEludm9pY2VIZWFkZXIgaW52b2ljZT17IGludm9pY2UgfSAvPlxuICAgICAgICA8L1RhYnMuSGVhZGVyPlxuICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJpbnZvaWNlcy50YWIucGF5bWVudHNcIiAvPlxuICAgICAgICA8L1RhYnMuVGFiPlxuICAgICAgICA8VGFicy5UYWI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJpbnZvaWNlcy50YWIucHJldmlld1wiIC8+XG4gICAgICAgIDwvVGFicy5UYWI+XG4gICAgICA8L1RhYnMuTGlzdD5cblxuICAgICAgey8qIFBBWU1FTlRTICovfVxuICAgICAgPFRhYnMuUGFuZWw+XG4gICAgICAgIDxQcm9ncmVzc1xuICAgICAgICAgIG1heD17ICAgaW52b2ljZS5nZXQoYHRvdGFsYCkgfVxuICAgICAgICAgIHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsUGFpZGApIH1cbiAgICAgICAgLz5cbiAgICAgICAgPEludm9pY2VFdmVudHMgaW52b2ljZT17IGludm9pY2UgfT5cbiAgICAgICAgICA8RXZlbnRzRWRpdGFibGUuU2VudFxuICAgICAgICAgICAgaW52b2ljZT17IGludm9pY2UgfVxuICAgICAgICAgICAgaGFuZGxlPXsgaGFuZGxlIH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHsgcGF5bWVudHMubWFwKChwYXltZW50LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPEV2ZW50c0VkaXRhYmxlLlBheW1lbnRcbiAgICAgICAgICAgICAga2V5PXsgcGF5bWVudC5faWQgfVxuICAgICAgICAgICAgICBwYXltZW50PXsgcGF5bWVudCB9XG4gICAgICAgICAgICAgIGluZGV4PXsgaW5kZXggfVxuICAgICAgICAgICAgICBub3RMYXN0PXsgaW5kZXggPCBwYXltZW50cy5sZW5ndGggLSAxIH1cbiAgICAgICAgICAgICAgaGFuZGxlPXsgIGhhbmRsZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0ludm9pY2VFdmVudHM+XG4gICAgICAgIDxGb3JtQWN0aW9ucz5cbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiaW52b2ljZXMuYnV0dG9uLnNhdmVcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxTaG93UXVvdGF0aW9uIC8+XG4gICAgICAgICAgPEFyY2hpdmVJbnZvaWNlIGRhbmdlciBpbnZvaWNlPXsgaW52b2ljZSB9IC8+XG4gICAgICAgIDwvRm9ybUFjdGlvbnM+XG4gICAgICA8L1RhYnMuUGFuZWw+XG5cbiAgICAgIHsvKiBQUkVWSUVXICovfVxuICAgICAgPFRhYnMuUGFuZWw+XG4gICAgICAgIDxQcmV2aWV3IHR5cGU9XCJpbnZvaWNlXCIgZG9jdW1lbnQ9eyBpbnZvaWNlIH0gLz5cbiAgICAgIDwvVGFicy5QYW5lbD5cbiAgICA8L1RhYnMuV3JhcHBlcj5cbiAgKVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTGluayAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0ICogYXMgRm9ybWF0ICBmcm9tICcuLi91aS9mb3JtYXQnXG5pbXBvcnQgKiBhcyBLZXlQcmVzIGZyb20gJy4uL3VpL2tleS1wcmVzZW50YXRpb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnZvaWNlSGVhZGVyKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpbnZvaWNlIH0gPSBwcm9wc1xuXG4gIHJldHVybiAoXG4gICAgPEtleVByZXMuV3JhcHBlcj5cbiAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwidGFibGUuaGVhZGVyLmN1c3RvbWVyXCIgLz5cbiAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICA8TGluayB0bz17YC9jdXN0b21lcnMvJHtpbnZvaWNlLmdldCgnY3VzdG9tZXJJZCcpfWB9PlxuICAgICAgICAgIHtpbnZvaWNlLmdldCggYGN1c3RvbWVyLm5hbWVgICl9XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwidGFibGUuaGVhZGVyLnF1b3RhdGlvbi1hc3NvY2lhdGVkXCIgLz5cbiAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICA8TGluayB0bz17YC9xdW90YXRpb25zLyR7aW52b2ljZS5nZXQoJ3F1b3RhdGlvbi5pZCcpfWB9PlxuICAgICAgICAgIHsgaW52b2ljZS5nZXQoYHF1b3RhdGlvbi5yZWZlcmVuY2VgKSB9XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwidGFibGUuYW1vdW50XCIgLz5cbiAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICA8Rm9ybWF0LkFtb3VudCB2YWx1ZT17IGludm9pY2UuZ2V0KGB0b3RhbGApIH0gLz5cbiAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwidGFibGUuYW1vdW50LnBhaWRcIiAvPlxuICAgICAgPEtleVByZXMuVmFsdWU+XG4gICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsUGFpZGApIH0gLz5cbiAgICAgIDwvS2V5UHJlcy5WYWx1ZT5cbiAgICAgIDxLZXlQcmVzLkxhYmVsIGlkPVwidGFibGUuYW1vdW50LmxlZnQtdG8tcGF5XCIgLz5cbiAgICAgIDxLZXlQcmVzLlZhbHVlPlxuICAgICAgICA8Rm9ybWF0LkFtb3VudCB2YWx1ZT17IGludm9pY2UuZ2V0KGB0b3RhbExlZnRgKSB9IC8+XG4gICAgICA8L0tleVByZXMuVmFsdWU+XG4gICAgPC9LZXlQcmVzLldyYXBwZXI+XG4gIClcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4J1xuXG5pbXBvcnQgKiBhcyBpbnZvaWNlcyAgICAgICAgZnJvbSAnLi4vZHVja3MvaW52b2ljZXMnXG5pbXBvcnQgeyBUYWJsZSwgUm93LCBDZWxsIH0gZnJvbSAnLi4vdWktdGFibGUnXG5pbXBvcnQgeyBBbW91bnQgfSAgICAgZnJvbSAnLi4vdWkvZm9ybWF0J1xuaW1wb3J0IHsgUHJvZ3Jlc3MgICAgICAgfSAgIGZyb20gJy4uL3VpL3Byb2dyZXNzJ1xuaW1wb3J0IHsgQXJjaGl2ZUludm9pY2UgfSAgIGZyb20gJy4vYnV0dG9ucydcblxuZnVuY3Rpb24gSW52b2ljZVJvdyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaW52b2ljZSB9ID0gcHJvcHNcbiAgY29uc3QgaXNBcmNoaXZlZCAgPSBpbnZvaWNlLmdldChgYXJjaGl2ZWRBdGApXG4gIGNvbnN0IGludm9pY2VVcmwgID0gYCR7IGlzQXJjaGl2ZWQgPyBgL2FyY2hpdmVzYCA6IGBgIH0vaW52b2ljZXMvJHtpbnZvaWNlLmlkfWBcbiAgcmV0dXJuIChcbiAgICA8Um93PlxuICAgICAgPENlbGw+XG4gICAgICAgIDxMaW5rIHRvPXsgaW52b2ljZVVybCB9PnsgaW52b2ljZS5nZXQoIGByZWZlcmVuY2VgICkgfTwvTGluaz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8TGluayB0bz17IGludm9pY2VVcmwgfT57IGludm9pY2UuZ2V0KCBgbmFtZWAgKSB9PC9MaW5rPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGw+XG4gICAgICAgIDxMaW5rIHRvPXtgL2N1c3RvbWVycy8ke2ludm9pY2UuY3VzdG9tZXJJZH1gfT5cbiAgICAgICAgICB7aW52b2ljZS5nZXQoIGBjdXN0b21lci5uYW1lYCApfVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPExpbmsgdG89e2AvcXVvdGF0aW9ucy8ke2ludm9pY2UuZ2V0KCdxdW90YXRpb24uaWQnKX0vcHJldmlld2B9PlxuICAgICAgICAgIHtpbnZvaWNlLmdldChgcXVvdGF0aW9uLnJlZmVyZW5jZWApfVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPEFtb3VudFxuICAgICAgICAgIHZhbHVlPXtpbnZvaWNlLmdldChgdG90YWxgKX1cbiAgICAgICAgLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8UHJvZ3Jlc3NcbiAgICAgICAgICB0YWJsZUxheW91dFxuICAgICAgICAgIHZhbHVlPXsgaW52b2ljZS5nZXQoYHRvdGFsUGFpZGApIH1cbiAgICAgICAgICBtYXg9eyBpbnZvaWNlLmdldChgdG90YWxgKSB9XG4gICAgICAgIC8+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPEFyY2hpdmVJbnZvaWNlIGljb24gbGlua0FsaWtlIGludm9pY2U9eyBpbnZvaWNlIH0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICA8L1Jvdz5cbiAgKVxufVxuXG5jb25zdCBpbnZvaWNlQ29sdW1ucyA9IFtcbiAge2lkOiBgaWRgICAgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIuaWRgICAgICAgICAsIHNvcnQ6IGBpbmRleGAgICAgICAgICAgICwgdHlwZTogYGlkYCAgICAgICB9LFxuICB7aWQ6IGBuYW1lYCAgICAgLCBsYWJlbDogYHRhYmxlLmhlYWRlci5uYW1lYCAgICAgICwgc29ydDogYG5hbWVgICAgICAgICAgICAgLCB0eXBlOiBgdGV4dGAgICAgIH0sXG4gIHtpZDogYGN1c3RvbWVyYCAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmN1c3RvbWVyYCAgLCBzb3J0OiBgY3VzdG9tZXIubmFtZWAgICAsIHR5cGU6IGBjdXN0b21lcmAgfSxcbiAge2lkOiBgcXVvdGF0aW9uYCwgbGFiZWw6IGB0YWJsZS5oZWFkZXIucXVvdGF0aW9uYCAsIHNvcnQ6IGBxdW90YXRpb24uaW5kZXhgICwgdHlwZTogYGlkYCAgICAgICB9LFxuICB7aWQ6IGBhbW91bnRgICAgLCBsYWJlbDogYHRhYmxlLmFtb3VudGAgICAgICAgICAgICwgc29ydDogYHRvdGFsYCAgICAgICAgICAgLCB0eXBlOiBgYW1vdW50YCAgIH0sXG4gIHtpZDogYHBhaWRgICAgICAsIGxhYmVsOiBgdGFibGUuYW1vdW50LnBhaWRgICAgICAgLCBzb3J0OiBgdG90YWxQYWlkYCAgICAgICAsIHR5cGU6IGBwcm9ncmVzc2AgfSxcbiAge2lkOiBgYXJjaGl2ZWAgICwgbGFiZWw6IGZhbHNlICAgICAgICAgICAgICAgICAgICAsIHNvcnQ6IGZhbHNlICAgICAgICAgICAgICwgdHlwZTogYGFjdGlvbmAgICB9LFxuXVxuXG5mdW5jdGlvbiBJbnZvaWNlTGlzdCggcHJvcHMgKSB7XG4gIGNvbnN0IHtcbiAgICBpbnZvaWNlcyA9IFtdLFxuICAgIC4uLm90aGVyc1xuICB9ID0gcHJvcHNcbiAgcmV0dXJuIChcbiAgICA8VGFibGVcbiAgICAgIHByZXNlbnRhdGlvblxuICAgICAgY29sdW1ucz17IGludm9pY2VDb2x1bW5zIH1cbiAgICAgIHsgLi4ub3RoZXJzIH1cbiAgICA+XG4gICAgeyBpbnZvaWNlcy5tYXAoIGludm9pY2UgPT4gKFxuICAgICAgPEludm9pY2VSb3dcbiAgICAgICAga2V5PXsgaW52b2ljZS5pZCB9XG4gICAgICAgIGludm9pY2U9eyBpbnZvaWNlIH1cbiAgICAgIC8+XG4gICAgKSl9XG4gICAgPC9UYWJsZT5cbiAgKVxufVxuXG5leHBvcnQgY29uc3QgQWN0aXZlSW52b2ljZXMgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGludm9pY2VzOiBzdGF0ZS5pbnZvaWNlcy5nZXQoYGFjdGl2ZWAgICAgICksXG4gICAgbWV0YSAgICA6IHN0YXRlLmludm9pY2VzLmdldChgbWV0YS5hY3RpdmVgKSxcbiAgfSksXG4gIGRpc3BhdGNoID0+ICggYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVQYWdlU29ydDogaW52b2ljZXMuZ2V0QWxsLFxuICB9LCBkaXNwYXRjaCApKVxuKSggSW52b2ljZUxpc3QgKVxuXG5leHBvcnQgY29uc3QgQXJjaGl2ZWRJbnZvaWNlcyA9IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7XG4gICAgaW52b2ljZXMgICAgOiBzdGF0ZS5pbnZvaWNlcy5nZXQoYGFyY2hpdmVkYCApLFxuICAgIG1ldGEgICAgICAgIDogc3RhdGUuaW52b2ljZXMuZ2V0KGBtZXRhLmFyY2hpdmVkYCksXG4gICAgaGlkZUNvbHVtbnMgOiBbYGFyY2hpdmVgXSxcbiAgfSksXG4gIGRpc3BhdGNoID0+ICggYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVQYWdlU29ydDogaW52b2ljZXMubGlzdEFyY2hpdmVkLFxuICB9LCBkaXNwYXRjaCApKVxuKSggSW52b2ljZUxpc3QgKVxuXG5leHBvcnQgY29uc3QgQ3VzdG9tZXJJbnZvaWNlcyA9IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7XG4gICAgaW52b2ljZXMgICAgIDogc3RhdGUuaW52b2ljZXMuZ2V0KGBhY3RpdmVgICkgICAgLFxuICAgIG1ldGEgICAgICAgICA6IHN0YXRlLmludm9pY2VzLmdldChgbWV0YS5hY3RpdmVgKSxcbiAgICBoaWRlQ29sdW1ucyAgOiBbYGN1c3RvbWVyYF0sXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IGludm9pY2VzLmxpc3RGb3JDdXN0b21lcixcbiAgfSwgZGlzcGF0Y2ggKSlcbikoIEludm9pY2VMaXN0IClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9pbnZvaWNlcydcbmltcG9ydCAgICAgIE5hdlNlY29uZGFyeSAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHtcbiAgQnV0dG9uTGlzdCxcbiAgQnV0dG9uUHJldmlldyxcbiAgQnV0dG9uU3VibWl0LFxufSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5LWJ1dHRvbnMnXG5pbXBvcnQgSW52b2ljZUZvcm0gICAgICAgICwgeyBGT1JNX0lEIH0gZnJvbSAnLi9mb3JtJ1xuaW1wb3J0IHsgU2hvd1F1b3RhdGlvbiwgQXJjaGl2ZUludm9pY2UgfSBmcm9tICcuL2J1dHRvbnMnXG5cbmNvbnN0IFRZUEUgPSBgaW52b2ljZXNgXG5cbmZ1bmN0aW9uIEVkaXRJbnZvaWNlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpZCAgICAgICAgICAgICAgIH0gPSBwcm9wcy5tYXRjaC5wYXJhbXNcbiAgY29uc3QgeyBpbnZvaWNlLCAuLi5yZXN0IH0gPSBwcm9wc1xuICBjb25zdCAgIHJlZmVyZW5jZSAgID0gaW52b2ljZS5nZXQoIGByZWZlcmVuY2VgIClcbiAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBwYWdlLmludm9pY2VzLmVkaXRgLCB2YWx1ZXM6IHtyZWZlcmVuY2V9IH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgICAgPEJ1dHRvblN1Ym1pdFxuICAgICAgICAgIGZvcm1JZD17IEZPUk1fSUQgfVxuICAgICAgICAgIGlzU2F2aW5nPXsgcHJvcHMuaXNTYXZpbmcgfVxuICAgICAgICAgIGxhYmVsPVwiXy5zYXZlXCJcbiAgICAgICAgLz5cbiAgICAgICAgPEFyY2hpdmVJbnZvaWNlXG4gICAgICAgICAgaWNvbiBkYW5nZXJcbiAgICAgICAgICBmb3JtPXsgRk9STV9JRCB9XG4gICAgICAgICAgaW52b2ljZT17IGludm9pY2UgfVxuICAgICAgICAgIGxhYmVsPVwiaW52b2ljZXMuYnV0dG9uLmFyY2hpdmVcIlxuICAgICAgICAvPlxuICAgICAgICA8U2hvd1F1b3RhdGlvbiAvPlxuICAgICAgICA8QnV0dG9uUHJldmlld1xuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBpZD17IGlkIH1cbiAgICAgICAgICBsYWJlbD1cImludm9pY2VzLmJ1dHRvbi5wcmV2aWV3XCJcbiAgICAgICAgLz5cbiAgICAgICAgPEJ1dHRvbkxpc3RcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgbGFiZWw9XCJpbnZvaWNlcy5idXR0b24ubGlzdFwiXG4gICAgICAgIC8+XG4gICAgICA8L05hdlNlY29uZGFyeT5cbiAgICAgIDxJbnZvaWNlRm9ybSB7Li4ucmVzdH0gLz5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3AoIHN0YXRlICkge1xuICByZXR1cm4ge1xuICAgIGludm9pY2UgOiBzdGF0ZS5pbnZvaWNlcy5nZXQoIGBjdXJyZW50YCAgKSxcbiAgICBpc1NhdmluZzogc3RhdGUuaW52b2ljZXMuZ2V0KCBgaXNTYXZpbmdgICksXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcCApKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IEVkaXRJbnZvaWNlLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIGludm9pY2VzLmdldE9uZSxcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlICAgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBDb25uZWN0RGF0YUZldGNoZXIgZnJvbSAnLi4vY29ubmVjdC1kYXRhLWZldGNoZXInXG5pbXBvcnQgKiBhcyBxdW90YXRpb25zICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9pbnZvaWNlcydcbmltcG9ydCB7IE1haW4sIENvbnRlbnQgICAgICAgICAgICB9IGZyb20gJy4uL2xheW91dC9tYWluJ1xuaW1wb3J0IHsgTmF2U2Vjb25kYXJ5ICAgICAgICAgICAgIH0gZnJvbSAnLi4vbmF2L3NlY29uZGFyeSdcbmltcG9ydCB7IFF1b3RhdGlvbnNSZWFkeVRvSW52b2ljZSB9IGZyb20gJy4uL3F1b3RhdGlvbnMvbGlzdCdcbmltcG9ydCB7IEFjdGl2ZUludm9pY2VzICAgICAgICAgICB9IGZyb20gJy4vbGlzdCdcblxuZnVuY3Rpb24gSW52b2ljZXMoIHByb3BzICkge1xuICBjb25zdCB0aXRsZVByb3BzICA9IHsgaWQ6YHBhZ2UuaW52b2ljZXNgIH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSA+XG4gICAgICAgIHt0aXRsZSA9PiA8SGVsbWV0Pjx0aXRsZT57dGl0bGV9PC90aXRsZT48L0hlbG1ldD59XG4gICAgICA8L0Zvcm1hdHRlZE1lc3NhZ2U+XG4gICAgICA8TmF2U2Vjb25kYXJ5XG4gICAgICAgIHRpdGxlPXsgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9IC8+IH1cbiAgICAgID5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuICAgICAgPE1haW4+XG4gICAgICAgIDxDb250ZW50PlxuICAgICAgICAgIDxBY3RpdmVJbnZvaWNlcyAvPlxuICAgICAgICAgIDxRdW90YXRpb25zUmVhZHlUb0ludm9pY2UgLz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcHMoIHN0YXRlICkge1xuICByZXR1cm4ge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcHMgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBJbnZvaWNlcyxcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBpbnZvaWNlcy5saXN0QWN0aXZlLFxuICAgIHF1b3RhdGlvbnMubGlzdFJlYWR5VG9JbnZvaWNlLFxuICBdLFxufSkgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICAgICBDb25uZWN0RGF0YUZldGNoZXIgICAgICAgICAgICBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIGludm9pY2VzICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2ludm9pY2VzJ1xuaW1wb3J0IHsgICAgTWFpbiAgICAgICAgICAgICAgLCBDb250ZW50IH0gZnJvbSAnLi4vbGF5b3V0L21haW4nXG5pbXBvcnQgICAgICBOYXZTZWNvbmRhcnkgICAgICAgICAgICAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHtcbiAgQnV0dG9uTGlzdCxcbiAgQnV0dG9uRWRpdCxcbiAgQnV0dG9uUHJpbnQsXG59IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCB7IFByZXZpZXcsIFByaW50aW5nTm90aWNlIH0gZnJvbSAnLi4vdWkvcHJldmlldydcblxuY29uc3QgVFlQRSA9IGBpbnZvaWNlc2BcblxuZnVuY3Rpb24gUHJldmlld0ludm9pY2VQYWdlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpbnZvaWNlIH0gPSBwcm9wc1xuICBjb25zdCByZWZlcmVuY2UgPSBpbnZvaWNlLmdldChgcmVmZXJlbmNlYClcbiAgY29uc3QgeyBpZCB9ID0gcHJvcHMubWF0Y2gucGFyYW1zXG4gIGNvbnN0IHRpdGxlUHJvcHMgID0geyBpZDpgcGFnZS5pbnZvaWNlcy5wcmV2aWV3YCwgdmFsdWVzOiB7cmVmZXJlbmNlfSB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gKFxuICAgICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgICA8dGl0bGU+e3RpdGxlfTwvdGl0bGU+XG4gICAgICAgICAgICA8aHRtbCBjbGFzc05hbWU9XCJkYXJrLWJhY2tncm91bmRcIiAvPlxuICAgICAgICAgIDwvSGVsbWV0PlxuICAgICAgICApfVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25FZGl0XG4gICAgICAgICAgdHlwZT17VFlQRX1cbiAgICAgICAgICBkb2N1bWVudD17IGludm9pY2UgfVxuICAgICAgICAgIGxhYmVsPVwiXy5lZGl0XCJcbiAgICAgICAgLz5cbiAgICAgICAgPEJ1dHRvblByaW50IC8+XG4gICAgICAgIDxCdXR0b25MaXN0XG4gICAgICAgICAgdHlwZT17VFlQRX1cbiAgICAgICAgICBsYWJlbD1cImludm9pY2VzLmJ1dHRvbi5saXN0XCJcbiAgICAgICAgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuICAgICAgPE1haW4+XG4gICAgICAgIDxDb250ZW50PlxuICAgICAgICAgIDxQcmludGluZ05vdGljZSAvPlxuICAgICAgICAgIDxQcmV2aWV3IHR5cGU9XCJpbnZvaWNlXCIgZG9jdW1lbnQ9eyBpbnZvaWNlIH0gLz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgaW52b2ljZTogc3RhdGUuaW52b2ljZXMuZ2V0KCBgY3VycmVudGAgKSxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wICkoIENvbm5lY3REYXRhRmV0Y2hlcih7XG4gIENvbXBvbmVudDogUHJldmlld0ludm9pY2VQYWdlLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIGludm9pY2VzLmdldE9uZSxcbiAgXSxcbn0pIClcblxuIiwiaW1wb3J0ICdpc29tb3JwaGljLWZldGNoJ1xuaW1wb3J0IG1lcmdlICAgICAgIGZyb20gJ2xvZGFzaC5tZXJnZSdcbmltcG9ydCBpc05pbCAgICAgICBmcm9tICdsb2Rhc2guaXNuaWwnXG5pbXBvcnQgdXJsSm9pbiAgICAgZnJvbSAndXJsLWpvaW4nXG5pbXBvcnQgQ29va2llcyAgICAgZnJvbSAnanMtY29va2llJ1xuaW1wb3J0IHF1ZXJ5U3RyaW5nIGZyb20gJ3F1ZXJ5LXN0cmluZydcblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2lzb21vcnBoaWMtY29uZmlnJ1xuXG4vLyBUaGluIHdyYXBwZXIgYXJvdW5kIHRoZSBmZXRjaCBBUElcbi8vIOKAoiBXZSByZXR1cm4gYm90aCB0aGUgcmVzcG9uc2UgJiB0aGUgSlNPTlxuLy8gICBUaGUgcmVzcG9uc2UgY2FuIGJlIHVzZWQgc2VydmVyLXNpZGUgZm9yIGFjY2Vzc2luZyB0aGUgSGVhZGVyIChmb3IgZXhhbXBsZSlcbi8vICAgVXNlZnVsIGlmIHdlIG5lZWQgdG8gYWNjZXNzIHRoZSBjb29raWVzXG4vLyDigKIgQ29va2llIHBhcmFtIGlzIHVzZWQgc2VydmVyIHNpZGU6XG4vLyAgIFdlIGRvbnQnIGhhdmUgYWNjZXNzIHRvIHRoZW0gdGhlcmUgXl5cbi8vICAgaHR0cHM6Ly9naXRodWIuY29tL21hdHRoZXctYW5kcmV3cy9pc29tb3JwaGljLWZldGNoL2lzc3Vlcy84M1xuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgY3JlZGVudGlhbHM6IGBpbmNsdWRlYCxcbiAgaGVhZGVyczoge30sXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZSggbWV0aG9kICkge1xuICBjb25zdCBmZXRjaE9wdGlvbnMgPSBtZXJnZSgge30sIGRlZmF1bHRPcHRpb25zLCB7XG4gICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKVxuICB9KVxuICAvLyB3ZSBjb21tdW5pY2F0ZSB0byB0aGUgQVBJIG9ubHkgaW4ganNvblxuICBpZiAoIG1ldGhvZCA9PT0gYHBvc3RgICkge1xuICAgIGZldGNoT3B0aW9ucy5oZWFkZXJzW2BDb250ZW50LVR5cGVgXSA9IGBhcHBsaWNhdGlvbi9qc29uYFxuICB9XG5cbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uKCBvcHRpb25zLCBjb29raWUgKSB7XG4gICAgY29uc3QgeyB1cmwsIGJvZHksIHF1ZXJ5IH0gPSBvcHRpb25zXG4gICAgLy8gc2V0IGJvZHkgb24gcG9zdFxuICAgIGlmICggbWV0aG9kID09PSBgcG9zdGAgKSBmZXRjaE9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KCBib2R5IClcbiAgICAvLyBmb3JjZSBjb29raWUgaWYgc2VydmVyIHNpZGVcbiAgICBpZiAoIGNvb2tpZSApIGZldGNoT3B0aW9ucy5oZWFkZXJzLkNvb2tpZSA9IGNvb2tpZVxuICAgIC8vIEJ1aWxkIGZldGNoIHVybFxuICAgIC8vIOKAoiB3ZSBuZWVkIHRvIGFwcGVuZCB0aGUgcXVlcnkgc3RyaW5nIGFzIHRoZSBmZXRjaCBBUEkgZG9lc24ndCBoYW5kbGUgb3RoZXIgd2F5c1xuICAgIGxldCBmZXRjaFVybCA9IHVybEpvaW4oIGNvbmZpZy5BUElfVVJMLCB1cmwgKVxuICAgIGlmICggcXVlcnkgKSBmZXRjaFVybCA9IHVybEpvaW4oIGZldGNoVXJsLCBgPyR7cXVlcnlTdHJpbmcuc3RyaW5naWZ5KCBxdWVyeSApfWApXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgID0gYXdhaXQgZmV0Y2goIGZldGNoVXJsLCBmZXRjaE9wdGlvbnMgKVxuICAgICAgY29uc3QgcGF5bG9hZCAgID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICBpZiAoICFyZXNwb25zZS5vayApIHtcbiAgICAgICAgbWVyZ2UoIHBheWxvYWQsIHtcbiAgICAgICAgICBlcnJvcjogICAgICB0cnVlLFxuICAgICAgICAgIHN0YXR1czogICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgLy8gY29weSBhY2Nlc3MgdG9rZW4gdG8gYSBjb29raWVcbiAgICAgIC8vIOKAosKgd2Ugd2lsbCBuZWVkIHRoaXMgY29va2llIGZvciB1bml2ZXJzYWwgcmVuZGVyXG4gICAgICBpZiAoIHByb2Nlc3MuZW52LkJST1dTRVIgKSB7XG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gcGF5bG9hZC5hY2Nlc3NfdG9rZW5cbiAgICAgICAgaWYgKCAhaXNOaWwoIGFjY2Vzc1Rva2VuICkgKSB7XG4gICAgICAgICAgQ29va2llcy5zZXQoIGNvbmZpZy5BUElfQ09PS0lFX05BTUUsIGFjY2Vzc1Rva2VuIClcbiAgICAgICAgICBkZWxldGUgcGF5bG9hZC5hY2Nlc3NfdG9rZW5cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHsgcmVzcG9uc2UsIHBheWxvYWQgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG1lcmdlKHtcbiAgICAgICAgZXJyb3I6ICAgICAgdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAgICAgNTAwLFxuICAgICAgICBzdGF0dXNUZXh0OiBlcnIubWVzc2FnZSxcbiAgICAgIH0sIGVyciApXG4gICAgICByZXR1cm4geyBwYXlsb2FkOiBlcnJvciB9XG4gICAgfVxuICB9XG59XG5cbi8vLS0tLS0gRVhQT1JUU1xuXG5leHBvcnQgY29uc3QgZ2V0ICA9IGNyZWF0ZSggYGdldGAgIClcbmV4cG9ydCBjb25zdCBwb3N0ID0gY3JlYXRlKCBgcG9zdGAgKVxuIiwiLy8gdGhpcyB3aWxsIHJlcGxhY2UgYW55IGltcG9ydCBvZiBpc29tb3JwaGljLWNvbmZpZy5qcyBvbiB0aGUgc2VydmVyXG5leHBvcnQgeyBkZWZhdWx0IH0gZnJvbSAnLi4vc2VydmVyL2NvbmZpZydcbiIsImltcG9ydCAgIFJlYWN0ICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgSGVsbWV0IH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgJy4vYm9hcmRpbmcuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgYm9hcmRpbmdgXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExheW91dEJvYXJkaW5nKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8bWFpbiByb2xlPVwibWFpblwiIGNsYXNzTmFtZT17IGAke0JBU0VfQ0xBU1N9YCB9PlxuICAgICAgPEhlbG1ldD5cbiAgICAgICAgPGh0bWwgY2xhc3NOYW1lPVwiZGFyay1iYWNrZ3JvdW5kXCIgLz5cbiAgICAgIDwvSGVsbWV0PlxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtCQVNFX0NMQVNTfV9fY2FyZGAgfT5cbiAgICAgICAgeyBwcm9wcy50aXRsZSAmJiAoPGgyIGNsYXNzTmFtZT17IGAke0JBU0VfQ0xBU1N9X190aXRsZWAgfT57cHJvcHMudGl0bGV9PC9oMj4pIH1cbiAgICAgICAgPGRpdiAgY2xhc3NOYW1lPXsgYCR7QkFTRV9DTEFTU31fX2NvbnRlbnRgIH0+XG4gICAgICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9tYWluPlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzTmFtZSBmcm9tICdjbGFzc25hbWVzJ1xuXG5pbXBvcnQgJy4vbWFpbi5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBtYWluYFxuXG5leHBvcnQgZnVuY3Rpb24gTWFpbiggcHJvcHMgKSB7XG4gIGNvbnN0IHsgd2l0aE1ldGEsIGNoaWxkcmVuICAgfSA9ICAgcHJvcHNcbiAgY29uc3QgICBDT01QX0NMQVNTICAgPSBjbGFzc05hbWUoe1xuICAgIFsgQkFTRV9DTEFTUyBdOiB0cnVlLFxuICAgIFtgJHtCQVNFX0NMQVNTfS0taGFzLW1ldGFgXTogUmVhY3QuQ2hpbGRyZW4uY291bnQoIGNoaWxkcmVuICkgPiAxXG4gIH0pXG4gIHJldHVybiAoXG4gICAgPG1haW4gcm9sZT1cIm1haW5cIiBjbGFzc05hbWU9eyBDT01QX0NMQVNTIH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L21haW4+XG4gIClcbn1cbmV4cG9ydCB7IE1haW4gYXMgV3JhcHBlciB9XG5cbmV4cG9ydCBmdW5jdGlvbiBNZXRhKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX21ldGFgfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvaGVhZGVyPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb250ZW50KCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8YXJ0aWNsZSBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19jb250ZW50YH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L2FydGljbGU+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbnRlbnRBY3Rpb25zKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2NvbnRlbnRfYWN0aW9uc2B9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgeyBEYXksIE1hcmtkb3duIH0gZnJvbSAnLi4vdWkvZm9ybWF0J1xuXG5pbXBvcnQgJy4vcGFwZXItc2hlZXQuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgcGFwZXItc2hlZXRgXG5cbmV4cG9ydCBmdW5jdGlvbiBQYXBlclNoZWV0KCBwcm9wcyApIHtcbiAgY29uc3QgeyBwYXJ0LCBwcmV2aWV3IH0gPSBwcm9wc1xuICBjb25zdCBjbGFzc05hbWUgPSBbIEJBU0VfQ0xBU1MgXVxuICBpZiAoIHBhcnQgKSBjbGFzc05hbWUucHVzaChgJHtCQVNFX0NMQVNTfS0tcGFydC0ke3BhcnR9YCApXG4gIGlmICggcHJldmlldyApIGNsYXNzTmFtZS5wdXNoKGAke0JBU0VfQ0xBU1N9LS1wcmV2aWV3LW1vZGVgIClcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lLmpvaW4oYCBgKX0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L2Rpdj5cbiAgKVxufVxuZXhwb3J0IHsgUGFwZXJTaGVldCBhcyBTaGVldCB9XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWZlcmVuY2UoIHByb3BzICkge1xuICBjb25zdCB7IHR5cGUsIHByb2R1Y3QgfSA9IHByb3BzXG4gIGNvbnN0IHsgdXBkYXRlZEF0LCByZWZlcmVuY2UgfSA9IHByb2R1Y3RcbiAgY29uc3QgUkVGX0NMQVNTID0gYCR7QkFTRV9DTEFTU31fX3JlZmVyZW5jZWBcbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT17UkVGX0NMQVNTfT5cbiAgICAgIDxoMyBjbGFzc05hbWU9e2Ake1JFRl9DTEFTU30tdHlwZWB9PlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17YHBhcGVyLXNoZWV0LnJlZmVyZW5jZS4keyB0eXBlIH1gfSAvPlxuICAgICAgPC9oMz5cbiAgICAgIDxoNCBjbGFzc05hbWU9e2Ake1JFRl9DTEFTU30taWRgfT5SZWYuIHsgcmVmZXJlbmNlIH08L2g0PlxuICAgICAgPHAgY2xhc3NOYW1lPXtgJHtSRUZfQ0xBU1N9LWRhdGVgfT5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9e2BwYXBlci1zaGVldC5yZWZlcmVuY2UuZGF0ZWB9IC8+XG4gICAgICAgIDxEYXkgdmFsdWU9eyB1cGRhdGVkQXQgfSAvPlxuICAgICAgPC9wPlxuICAgIDwvaGVhZGVyPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCZXR3ZWVuKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2JldHdlZW5gfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQYXJ0eSggcHJvcHMgKSB7XG4gIGNvbnN0IHtcbiAgICB0aXRsZSxcbiAgICBwZW9wbGUgPSB7fSxcbiAgfSA9IHByb3BzXG4gIGNvbnN0IFBBUlRZX0NMQVNTID0gYCR7QkFTRV9DTEFTU31fX3BhcnR5YFxuICBjb25zdCBhZGRyZXNzICAgICA9IHBlb3BsZS5hZGRyZXNzXG4gIHJldHVybiAoXG4gICAgPGFzaWRlIGNsYXNzTmFtZT17YCR7UEFSVFlfQ0xBU1N9YH0+XG4gICAgICA8cCBjbGFzc05hbWU9e2Ake1BBUlRZX0NMQVNTfS10aXRsZWB9PlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17YHBhcGVyLXNoZWV0LnBhcnR5LiR7IHRpdGxlIH1gfSAvPlxuICAgICAgPC9wPlxuICAgICAgPGg0IGNsYXNzTmFtZT17YCR7UEFSVFlfQ0xBU1N9LW5hbWVgfT5cbiAgICAgICAgeyBwZW9wbGUubmFtZSA/IHBlb3BsZS5uYW1lIDogKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17YCR7UEFSVFlfQ0xBU1N9LWFkZHJlc3MgJHtQQVJUWV9DTEFTU30tbmFtZS0tZW1wdHlgfT5cbiAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtgcGFwZXItc2hlZXQucGFydHkubm8tbmFtZS4ke3RpdGxlfWB9Lz5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2g0PlxuICAgICAgeyBhZGRyZXNzID8gPE1hcmtkb3duIHRleHQ9eyBhZGRyZXNzIH0gLz4gOiAoXG4gICAgICAgIDxwIGNsYXNzTmFtZT17YCR7UEFSVFlfQ0xBU1N9LWFkZHJlc3MgJHtQQVJUWV9DTEFTU30tYWRkcmVzcy0tZW1wdHlgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17YHBhcGVyLXNoZWV0LnBhcnR5Lm5vLWFkZHJlc3MuJHt0aXRsZX1gfSAvPlxuICAgICAgICA8L3A+XG4gICAgICApfVxuICAgIDwvYXNpZGU+XG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IFBhcnR5VXNlciA9IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7dXNlcjogc3RhdGUuYWNjb3VudC5nZXQoYHVzZXJgKX0pXG4pKCBwcm9wcyA9PiA8UGFydHkgdGl0bGU9XCJmcm9tXCIgcGVvcGxlPXtwcm9wcy51c2VyfS8+IClcblxuZXhwb3J0IGZ1bmN0aW9uIFN1YmplY3QoIHByb3BzICkge1xuICBjb25zdCBDT01QX0NMQVNTID0gYCR7QkFTRV9DTEFTU31fX3N1YmplY3RgXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9eyBDT01QX0NMQVNTIH0+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2Ake0NPTVBfQ0xBU1N9LXRpdGxlYH0+XG4gICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicGFwZXItc2hlZXQuc3ViamVjdFwiIC8+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9e2Ake0NPTVBfQ0xBU1N9LWNvbnRlbnRgfT57IHByb3BzLnZhbHVlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuZXhwb3J0IHsgUGFydHlVc2VyIGFzIFVzZXIgfVxuXG5leHBvcnQgZnVuY3Rpb24gTWVudGlvbnMoIHByb3BzICkge1xuICBjb25zdCB7IGNvbnRlbnQgfSA9IHByb3BzXG4gIGNvbnN0IE1FTlRJT05TX0NMQVNTID0gYCR7QkFTRV9DTEFTU31fX21lbnRpb25zYFxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtNRU5USU9OU19DTEFTU31gfT5cbiAgICAgIDxNYXJrZG93biB0ZXh0PXtjb250ZW50fSAvPlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlclJvdXRlcyB9IGZyb20gJ3JlYWN0LXJvdXRlci1jb25maWcnXG5pbXBvcnQgeyBJbnRsUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgY29ubmVjdCAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIGNvbmZpZyAgICAgICAgZnJvbSAnLi4vaXNvbW9ycGhpYy1jb25maWcnXG5pbXBvcnQgKiBhcyBsb2NhbGVzICAgICAgIGZyb20gJy4uL2xvY2FsZXMnXG5pbXBvcnQgICAgICBFcnJvckJvdW5kYXJ5IGZyb20gJy4uL2Vycm9yLWJvdW5kYXJ5J1xuaW1wb3J0ICAgICAgTmF2TWFpbiAgICAgICBmcm9tICcuLi9uYXYvbWFpbidcbmltcG9ydCAgICAgIE5vdGlmaWNhdGlvbnMgZnJvbSAnLi4vbm90aWZpY2F0aW9ucy9saXN0J1xuXG5pbXBvcnQgJy4vcm9vdC5zY3NzJ1xuXG5jbGFzcyBSb290IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gIH1cblxuICByZW5kZXIoICkge1xuICAgIGNvbnN0IHsgcm91dGUsIGxhbmcgfSA9IHRoaXMucHJvcHNcblxuICAgIC8vIGtleSBpcyBuZWVkZWQgZm9yIGR5bmFtaWMgbGFuZ3VhZ2Ugc2VsZWN0aW9uXG4gICAgLy8g4oCiIGh0dHBzOi8vZ2l0aHViLmNvbS95YWhvby9yZWFjdC1pbnRsL3dpa2kvQ29tcG9uZW50cyNkeW5hbWljLWxhbmd1YWdlLXNlbGVjdGlvblxuICAgIHJldHVybiAoXG4gICAgICA8SW50bFByb3ZpZGVyIGxvY2FsZT17IGxhbmcgfSBrZXk9eyBsYW5nIH0gbWVzc2FnZXM9eyBsb2NhbGVzWyBsYW5nIF0gfSA+XG4gICAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAgICB7LyogUmVhY3QuU3RyaWN0TW9kZSB0aHJvdyBmb3IgYW55OlxuICAgICAgICAgICAgICDigKIgQ29ubmVjdCBjb21wb25lbnRcbiAgICAgICAgICAgICAg4oCiIFJvdXRlXG4gICAgICAgICAgICAgIOKAoiBTd2l0Y2hcbiAgICAgICAgICAgKi99XG4gICAgICAgICAgey8qIDxSZWFjdC5TdHJpY3RNb2RlPiAqL31cbiAgICAgICAgICAgIDxIZWxtZXRcbiAgICAgICAgICAgICAgZGVmYXVsdFRpdGxlPXsgY29uZmlnLkFQUF9OQU1FIH1cbiAgICAgICAgICAgICAgdGl0bGVUZW1wbGF0ZT17YCR7Y29uZmlnLkFQUF9OQU1FfSDigJMgJXNgfVxuICAgICAgICAgICAgICBtZXRhPXtbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgJ2h0dHAtZXF1aXYnOiBgQ29udGVudC1MYW5ndWFnZWAsXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiBsYW5nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgJ2h0dHAtZXF1aXYnOiBgWC1VQS1Db21wYXRpYmxlYCxcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGBJRT1lZGdlYCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICAgIGB2aWV3cG9ydGAsXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiBgd2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMGAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGh0bWwgbGFuZz17IGxhbmcgfSAvPlxuICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi9jb25jb21wdGUuY3NzXCIgLz5cbiAgICAgICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5wbmdcIiB0eXBlPVwiaW1hZ2UvcG5nXCIgLz5cbiAgICAgICAgICAgIDwvSGVsbWV0PlxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cIm1haW4tbG9nb1wiPkNvbmNvbXB0ZTwvaDE+XG4gICAgICAgICAgICA8TmF2TWFpbiAvPlxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnk+XG4gICAgICAgICAgICAgIHsvKiBjaGlsZCByb3V0ZXMgd29uJ3QgcmVuZGVyIHdpdGhvdXQgdGhpcyAqL31cbiAgICAgICAgICAgICAgey8qIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3JlYWN0LXJvdXRlci1jb25maWcjcmVuZGVycm91dGVzcm91dGVzLWV4dHJhcHJvcHMtLSAqL31cbiAgICAgICAgICAgICAgeyByZW5kZXJSb3V0ZXMocm91dGUucm91dGVzKSB9XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgICA8Tm90aWZpY2F0aW9ucyAvPlxuICAgICAgICAgIHsvKiA8L1JlYWN0LlN0cmljdE1vZGU+ICovfVxuICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICAgPC9JbnRsUHJvdmlkZXI+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3BzKCBzdGF0ZSApIHtcbiAgY29uc3QgbGFuZyA9IHN0YXRlLmFjY291bnQuZ2V0KCBgdXNlci5sYW5nYCApICB8fCBgZW5gXG4gIHJldHVybiB7IGxhbmcgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wcyApKCBSb290IClcblxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAnXy5xdW90YXRpb25zJyAgICA6IGBxdW90YXRpb25zYCAgICAgICxcbiAgJ18uaW52b2ljZXMnICAgICAgOiBgaW52b2ljZXNgICAgICAgICAsXG4gICdfLmludm9pY2VzLnBhaWQnIDogYHBhaWRgICAgICAgICAgICAgLFxuICAnXy5pbnZvaWNlcy5sZWZ0JyA6IGBsZWZ0YCAgICAgICAgICAgICxcbiAgJ18uYW1vdW50JyAgICAgICAgOiBgYW1vdW50YCAgICAgICAgICAsXG4gICdfLmNvdW50JyAgICAgICAgIDogYGNvdW50YCAgICAgICAgICAgLFxuICAnXy5sZWZ0LXRvLXBheScgICA6IGBsZWZ0IHRvIGJlIHBhaWRgICxcbiAgJ18uYXJjaGl2ZScgICAgICAgOiBgYXJjaGl2ZWAgICAgICAgICAsXG4gICdfLnNhdmUnICAgICAgICAgIDogYHNhdmVgICAgICAgICAgICAgLFxuICAnXy5jcmVhdGUnICAgICAgICA6IGBjcmVhdGVgICAgICAgICAgICxcbiAgJ18ucHJpbnQnICAgICAgICAgOiBgcHJpbnRgICAgICAgICAgICAsXG4gICdfLmVkaXQnICAgICAgICAgIDogYGVkaXRgICAgICAgICAgICAgLFxuICAnXy5wcmludC1ub3RpY2UnICA6IGBJbiBGaXJlZm94IGJyb3dzZXIsIGRvbid0IGZvcmdldCB0byBjaGVjayB0aGUgPGI+UHJpbnQgQmFja2dyb3VuZCBDb2xvcjwvYj4gY2hlY2tib3hgICxcblxuICAnYWNjb3VudC5sb2dpbi50aXRsZScgICAgOiBgbG9naW5gLFxuICAnYWNjb3VudC5sb2dpbi5idXR0b24nICAgOiBgY29ubmVjdGAsXG4gICdhY2NvdW50LnJlZ2lzdGVyLnRpdGxlJyA6IGBTaWduIHVwYCxcbiAgJ2FjY291bnQucmVnaXN0ZXIuYnV0dG9uJzogYGNyZWF0ZSBhbmQgYWNjb3VudGAsXG4gICdhY2NvdW50LmZvcmdvdC50aXRsZScgICA6IGBGb3Jnb3R0ZW4gcGFzc3dvcmQ/YCxcbiAgJ2FjY291bnQuZm9yZ290Lm5vdGljZScgIDogYEFmdGVyIHN1Ym1pdHRpbmcsIHlvdSB3aWxsIHJlY2VpdmUgYnkgZW1haWwgYSByZXNldCBsaW5rYCxcbiAgJ2FjY291bnQuZm9yZ290LmJ1dHRvbicgIDogYFNlbmQgdGhlIGxpbmtgLFxuICAnYWNjb3VudC5yZXNldC50aXRsZScgICAgOiBgUGFzc3dvcmQgcmVzZXRgLFxuICAnYWNjb3VudC5yZXNldC5ub3RpY2UnICAgOiBgUGxlYXNlIHNldCB5b3VyIG5ldyBwYXNzd29yZGAsXG4gICdhY2NvdW50LnJlc2V0LmJ1dHRvbicgICA6IGBSZXNldGAsXG5cbiAgJ2NvbmZpZ3VyYXRpb24udGFiLmZyb20nICAgICAgICAgICAgOiBgZnJvbWAgICAgICAgICAgICAgICxcbiAgJ2NvbmZpZ3VyYXRpb24udGFiLmRlZmF1bHQtcHJvZHVjdCcgOiBgRGVmYXVsdCBwcm9kdWN0YCAgICxcbiAgJ2NvbmZpZ3VyYXRpb24udGFiLm1lbnRpb25zJyAgICAgICAgOiBgRm9vdGVyIG1lbnRpb25zYCAgICxcbiAgJ2NvbmZpZ3VyYXRpb24udGFiLnJlZmVyZW5jZScgICAgICAgOiBgUmVmZXJlbmNlYCAgICAgICAgICxcbiAgJ2NvbmZpZ3VyYXRpb24ubWVudGlvbnMucXVvdGF0aW9ucycgOiBgRm9yIHRoZSBxdW90YXRpb25zYCxcbiAgJ2NvbmZpZ3VyYXRpb24ubWVudGlvbnMuaW52b2ljZXMnICAgOiBgRm9yIHRoZSBpbnZvaWNlc2AgICxcbiAgJ2NvbmZpZ3VyYXRpb24uYnV0dG9uLnNhdmUnICAgICAgICAgOiBgVXBkYXRlYCAgICAgICAgICAgICxcbiAgJ2NvbmZpZ3VyYXRpb24ucmVmZXJlbmNlLndhcm5pbmcnICA6IGBcbiAgICBDaGFuZ2luZyA8c3Ryb25nPnRoZSBzdGFydGluZyBudW1iZXI8L3N0cm9uZz4gd2lsbCByZW51bWJlciBhbGwgcmVmZXJlbmNlcyBvZiB0aGUgdHlwZSBjb25jZXJuZWQuXG4gICAgPGJyIC8+XG4gICAgQmUgY2F1dGlvdXMhYCxcblxuICAnY3VzdG9tZXIuYnV0dG9uLmNyZWF0ZScgICAgIDogYENyZWF0ZSBhIGN1c3RvbWVyYCAsXG4gICdjdXN0b21lci5idXR0b24udXBkYXRlJyAgICAgOiBgdXBkYXRlYCAgICAgICAgICAgICxcbiAgJ2N1c3RvbWVyLmJ1dHRvbi5uZXcnICAgICAgICA6IGBuZXcgY3VzdG9tZXJgICAgICAgLFxuICAnY3VzdG9tZXIuYnV0dG9uLmxpc3QnICAgICAgIDogYGN1c3RvbWVyIGxpc3RgICAgICAsXG4gICdjdXN0b21lci50YWIuY29uZmlndXJhdGlvbicgOiBgY29uZmlndXJlIGhlYWRlcmAgICxcbiAgJ2N1c3RvbWVyLnRvdGFsLnF1b3RhdGlvbicgICA6IGBxdW90YXRpb24gdG90YWxgICAgLFxuICAnY3VzdG9tZXIudG90YWwuaW52b2ljZScgICAgIDogYGludm9pY2UgdG90YWxgICAgICAsXG4gICdjdXN0b21lci50b3RhbC50by1iZS1wYWlkJyAgOiBgdG8gYmUgcGFpZGAgICAgICAgICxcbiAgJ2N1c3RvbWVyLnRvdGFsLnByb2dyZXNzJyAgICA6IGBwcm9ncmVzc2AgICAgICAgICAgLFxuXG4gICdmaWVsZC5lbWFpbCcgICAgICAgICA6IGBlbWFpbGAgICAgICAgICAsXG4gICdmaWVsZC5wYXNzd29yZCcgICAgICA6IGBwYXNzd29yZGAgICAgICAsXG4gICdmaWVsZC5uYW1lJyAgICAgICAgICA6IGBuYW1lYCAgICAgICAgICAsXG4gICdmaWVsZC5hZGRyZXNzJyAgICAgICA6IGBhZGRyZXNzYCAgICAgICAsXG4gICdmaWVsZC5jdXN0b21lcicgICAgICA6IGBjdXN0b21lcmAgICAgICAsXG4gICdmaWVsZC50YXgnICAgICAgICAgICA6IGB0YXhgICAgICAgICAgICAsXG4gICdmaWVsZC5zdWJqZWN0JyAgICAgICA6IGBzdWJqZWN0YCAgICAgICAsXG4gICdmaWVsZC5kZXNjcmlwdGlvbicgICA6IGBkZXNjcmlwdGlvbmAgICAsXG4gICdmaWVsZC5xdWFudGl0eScgICAgICA6IGBxdWFudGl0eWAgICAgICAsXG4gICdmaWVsZC5jdXJyZW5jeScgICAgICA6IGBjdXJyZW5jeWAgICAgICAsXG4gICdmaWVsZC5wcmVmaXgnICAgICAgICA6IGBwcmVmaXhgICAgICAgICAsXG4gICdmaWVsZC5zdGFydC1hdCcgICAgICA6IGBzdGFydCBhdGAgICAgICAsXG4gICdmaWVsZC5sYW5ndWFnZScgICAgICA6IGBsYW5ndWFnZWAgICAgICAsXG4gICdmaWVsZC5kZWZhdWx0LXByaWNlJyA6IGBkZWZhdWx0IHByaWNlYCAsXG5cbiAgJ2ludm9pY2VzLnRhYi5wYXltZW50cycgICAgICA6IGBQYXltZW50c2AsXG4gICdpbnZvaWNlcy50YWIucHJldmlldycgICAgICAgOiBgSW52b2ljZSBQcmV2aWV3YCxcbiAgJ2ludm9pY2VzLmJ1dHRvbi5zYXZlJyAgICAgICA6IGBVcGRhdGUgSW52b2ljZWAsXG4gICdpbnZvaWNlcy5idXR0b24ucXVvdGF0aW9uJyAgOiBgU2hvdyBxdW90YXRpb25gLFxuICAnaW52b2ljZXMuYnV0dG9uLnByZXZpZXcnICAgIDogYHByZXZpZXcgaW52b2ljZWAsXG4gICdpbnZvaWNlcy5idXR0b24uYXJjaGl2ZScgICAgOiBgYXJjaGl2ZWAsXG4gICdpbnZvaWNlcy5ldmVudCcgICAgICAgICAgICAgOiBgZXZlbnRgLFxuICAnaW52b2ljZXMuZXZlbnQuIycgICAgICAgICAgIDogYCNgLFxuICAnaW52b2ljZXMuZXZlbnQuZGVzY3JpcHRpb24nIDogYGRlc2NyaXB0aW9uYCxcbiAgJ2ludm9pY2VzLmV2ZW50LnBheW1lbnQnICAgICA6IGBwYXltZW50YCxcbiAgJ2ludm9pY2VzLmV2ZW50LmRhdGUnICAgICAgICA6IGBkYXRlYCxcbiAgJ2ludm9pY2VzLmV2ZW50LmFtb3VudCcgICAgICA6IGBhbW91bnRgLFxuICAnaW52b2ljZXMuZXZlbnQuc2VudCcgICAgICAgIDogYHNlbnRgLFxuXG4gICdrZXktcHJlcy5jdXN0b21lcicgICAgICAgICAgIDogYGN1c3RvbWVyYCAgICAgICAgICAgICAsXG4gICdrZXktcHJlcy5zZW50JyAgICAgICAgICAgICAgIDogYHNlbnQgYXRgICAgICAgICAgICAgICAsXG4gICdrZXktcHJlcy52YWxpZGF0ZWQnICAgICAgICAgIDogYHZhbGlkYXRlZCBhdGAgICAgICAgICAsXG4gICdrZXktcHJlcy5zaWduZWQnICAgICAgICAgICAgIDogYHNpZ25lZCBhdGAgICAgICAgICAgICAsXG4gICdrZXktcHJlcy50b3RhbCcgICAgICAgICAgICAgIDogYHRvdGFsYCAgICAgICAgICAgICAgICAsXG4gICdrZXktcHJlcy5hc3NvY2lhdGVkLnF1b3RlJyAgIDogYGFzc29jaWF0ZWQgcXVvdGF0aW9uYCAsXG4gICdrZXktcHJlcy5hc3NvY2lhdGVkLmludm9pY2UnIDogYGFzc29jaWF0ZWQgaW52b2ljZWAgICAsXG4gICdrZXktcHJlcy5sZWZ0LXRvLXBheScgICAgICAgIDogYGxlZnQgdG8gcGF5YCAgICAgICAgICAsXG5cbiAgJ25vdGlmaWNhdGlvbnMudXNlci53ZWxjb21lJyAgICAgICAgICAgICAgICAgICAgIDogYFdlbGNvbWUge25hbWV9YCxcbiAgJ25vdGlmaWNhdGlvbnMudXNlci5tYWlsLXNlbnQnICAgICAgICAgICAgICAgICAgIDogYEFuIGVtYWlsIGhhcyBiZWVuIHNlbnQgdG8ge2VtYWlsfWAsXG4gICdub3RpZmljYXRpb25zLnF1b3RhdGlvbi5zYXZlZCcgICAgICAgICAgICAgICAgICA6IGBUaGUgcXVvdGF0aW9uIGhhcyBiZWVuIHNhdmVkYCxcbiAgJ25vdGlmaWNhdGlvbnMucXVvdGF0aW9uLmVycm9yJyAgICAgICAgICAgICAgICAgIDogYEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGJhY2tpbmcgdXBgLFxuICAnbm90aWZpY2F0aW9ucy5xdW90YXRpb24uY3JlYXRlLWludm9pY2Uuc3VjY2VzcycgOiBgSW52b2ljZSBjcmVhdGVkYCxcbiAgJ25vdGlmaWNhdGlvbnMucXVvdGF0aW9uLmNyZWF0ZS1pbnZvaWNlLmVycm9yJyAgIDogYEFuIGVycm9yIGFzIG9jY3VycmVkIHdoaWxlIGNyZWF0aW5nIGludm9pY2VgLFxuICAnbm90aWZpY2F0aW9ucy5pbnZvaWNlLnNhdmVkJyAgICAgICAgICAgICAgICAgICAgOiBgVGhlIGludm9pY2UgaGFzIGJlZW4gc2F2ZWRgLFxuICAnbm90aWZpY2F0aW9ucy5pbnZvaWNlLmVycm9yJyAgICAgICAgICAgICAgICAgICAgOiBgQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYmFja2luZyB1cGAsXG4gICdub3RpZmljYXRpb25zLmN1c3RvbWVyLnNhdmVkJyAgICAgICAgICAgICAgICAgICA6IGBUaGUgY3VzdG9tZXIgaGFzIGJlZW4gc2F2ZWRgLFxuICAnbm90aWZpY2F0aW9ucy5nZW5lcmljLnNhdmVkJyAgICAgICAgICAgICAgICAgICAgOiBgc2F2ZWRgLFxuICAnbm90aWZpY2F0aW9ucy5nZW5lcmljLmVycm9yJyAgICAgICAgICAgICAgICAgICAgOiBg4oCiIHNvbWV0aGluZyB3ZW50IHdyb25nIOKAomAsXG5cbiAgJ3BhZ2UuaG9tZScgICAgICAgICAgICAgICA6IGBob21lYCAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYWdlLnF1b3RhdGlvbnMnICAgICAgICAgOiBgcXVvdGF0aW9uc2AgICAgICAgICAgICAgICAgICAgLFxuICAncGFnZS5xdW90YXRpb25zLm5ldycgICAgIDogYG5ldyBxdW90YXRpb25gICAgICAgICAgICAgICAgICxcbiAgJ3BhZ2UucXVvdGF0aW9ucy5lZGl0JyAgICA6IGBlZGl0IHF1b3RhdGlvbiDigJMge3JlZmVyZW5jZX1gICxcbiAgJ3BhZ2UucXVvdGF0aW9ucy5wcmV2aWV3JyA6IGBxdW90YXRpb24g4oCTIHtyZWZlcmVuY2V9YCAgICAgICxcbiAgJ3BhZ2UuaW52b2ljZXMnICAgICAgICAgICA6IGBpbnZvaWNlc2AgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYWdlLmludm9pY2VzLmVkaXQnICAgICAgOiBgZWRpdCBpbnZvaWNlIC0ge3JlZmVyZW5jZX1gICAgLFxuICAncGFnZS5pbnZvaWNlcy5wcmV2aWV3JyAgIDogYGludm9pY2Ug4oCTIHtyZWZlcmVuY2V9YCAgICAgICAgLFxuICAncGFnZS5jdXN0b21lcnMnICAgICAgICAgIDogYGN1c3RvbWVyc2AgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhZ2UuY3VzdG9tZXJzLm5ldycgICAgICA6IGBuZXcgY3VzdG9tZXJgICAgICAgICAgICAgICAgICAsXG4gICdwYWdlLmN1c3RvbWVycy5lZGl0JyAgICAgOiBgY3VzdG9tZXIgOiB7bmFtZX1gICAgICAgICAgICAgLFxuICAncGFnZS5zZXR0aW5ncycgICAgICAgICAgIDogYHNldHRpbmdzYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhZ2UuY29ubmVjdGVkJyAgICAgICAgICA6IGBjb25uZWN0ZWQgYXM6PGJyLz57ZW1haWx9YCAgICAsXG4gICdwYWdlLmxvZ291dCcgICAgICAgICAgICAgOiBgbG9nb3V0YCAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFnZS5sb2dpbicgICAgICAgICAgICAgIDogYGxvZ2luYCAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhZ2UucmVnaXN0ZXInICAgICAgICAgICA6IGByZWdpc3RlcmAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYWdlLmZvcmdvdCcgICAgICAgICAgICAgOiBgZm9yZ290dGVuIHBhc3N3b3JkYCAgICAgICAgICAgLFxuICAncGFnZS5lcnJvcicgICAgICAgICAgICAgIDogYHNvbWV0aGluZyB3ZW50IHdyb25nYCAgICAgICAgICxcbiAgJ3BhZ2UuYXJjaGl2ZWQnICAgICAgICAgICA6IGBhcmNoaXZlc2AgICAgICAgICAgICAgICAgICAgICAsXG5cbiAgJ3BhcGVyLXNoZWV0LnJlZmVyZW5jZS5xdW90YXRpb24nICAgOiBgUXVvdGF0aW9uYCAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnJlZmVyZW5jZS5pbnZvaWNlJyAgICAgOiBgSW52b2ljZWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnJlZmVyZW5jZS5kYXRlJyAgICAgICAgOiBgZGF0ZTogYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5LmZyb20nICAgICAgICAgICAgOiBgRnJvbTpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5LnRvJyAgICAgICAgICAgICAgOiBgVG86YCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLW5hbWUuZnJvbScgICAgOiBgZGVmaW5lIHlvdXIgbmFtZSBpbiB0aGUgc2V0dGluZ3NgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLWFkZHJlc3MuZnJvbScgOiBgZGVmaW5lIHlvdXIgYWRkcmVzcyBpbiB0aGUgc2V0dGluZ3NgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLW5hbWUudG8nICAgICAgOiBgY3VzdG9tZXIgd2l0aG91dCBuYW1lYCAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnBhcnR5Lm5vLWFkZHJlc3MudG8nICAgOiBgY3VzdG9tZXIgd2l0aG91dCBhZGRyZXNzYCAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnN1YmplY3QnICAgICAgICAgICAgICAgOiBgU3ViamVjdDpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcblxuICAncHJvZHVjdC5wbGFjZS1ob2xkZXInOiBgdHlwZSB0byBjcmVhdGUgYSBuZXcgbGluZWAsXG5cbiAgJ3F1b3RhdGlvbi5jcmVhdGUnICAgICAgICAgICA6IGBjcmVhdGVgICAgICAgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24ucmVhZHktdG8taW52b2ljZScgOiBgcXVvdGUgcmVhZHkgZm9yIGludm9pY2luZ2AgLFxuICAncXVvdGF0aW9uLmludm9pY2UuY3JlYXRlJyAgIDogYGNyZWF0ZSBpbnZvaWNlYCAgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5pbnZvaWNlLnNob3cnICAgICA6IGBzaG93IGludm9pY2VgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uYnV0dG9uLmNyZWF0ZScgICAgOiBgQ3JlYXRlIHF1b3RhdGlvbmAgICAgICAgICAgLFxuICAncXVvdGF0aW9uLmJ1dHRvbi51cGRhdGUnICAgIDogYFVwZGF0ZSB0aGUgcXVvdGF0aW9uYCAgICAgICxcbiAgJ3F1b3RhdGlvbi5idXR0b24uYXJjaGl2ZScgICA6IGBBcmNoaXZlYCAgICAgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uYnV0dG9uLm5ldycgICAgICAgOiBgTmV3IHF1b3RhdGlvbmAgICAgICAgICAgICAgLFxuICAncXVvdGF0aW9uLmJ1dHRvbi5saXN0JyAgICAgIDogYGxpc3QgcXVvdGF0aW9uc2AgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5idXR0b24ucHJldmlldycgICA6IGBwcmV2aWV3IHF1b3RhdGlvbmAgICAgICAgICAsXG5cbiAgJ3NwaW5uZXIubG9hZGluZycgIDogYGxvYWRpbmfigKZgICxcblxuICAnc3RlcHBlci5zZW50JyAgICAgIDogYHNlbnQgYXQ6YCAgICAgICxcbiAgJ3N0ZXBwZXIudmFsaWRhdGVkJyA6IGB2YWxpZGF0ZWQgYXQ6YCAsXG4gICdzdGVwcGVyLnNpZ25lZCcgICAgOiBgc2lnbmVkIGF0OmAgICAgLFxuICAnc3RlcHBlci5jdXN0b21lcicgIDogYGN1c3RvbWVyOmAgICAgICxcbiAgJ3N0ZXBwZXIudG90YWwnICAgICA6IGB0b3RhbDpgICAgICAgICAsXG5cbiAgJ3RhYmxlLmhlYWRlci5pZCcgICAgICAgICAgICAgICAgICAgOiBgI2AgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5uYW1lJyAgICAgICAgICAgICAgICAgOiBgbmFtZWAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5jdXN0b21lcicgICAgICAgICAgICAgOiBgY3VzdG9tZXJgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5zdGF0dXMnICAgICAgICAgICAgICAgOiBgc3RhdHVzYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci50YXgnICAgICAgICAgICAgICAgICAgOiBgdGF4YCAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdW90YXRpb24nICAgICAgICAgICAgOiBgcXVvdGF0aW9uYCAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdW90YXRpb24tYXNzb2NpYXRlZCcgOiBgYXNzb2NpYXRlZCBxdW90YXRpb25gICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdW90YXRpb25zJyAgICAgICAgICAgOiBgcXVvdGF0aW9uc2AgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5pbnZvaWNlJyAgICAgICAgICAgICAgOiBgaW52b2ljZWAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5pbnZvaWNlcycgICAgICAgICAgICAgOiBgaW52b2ljZXNgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5kZXNjcmlwdGlvbicgICAgICAgICAgOiBgZGVzY3JpcHRpb25gICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdWFudGl0eScgICAgICAgICAgICAgOiBgcXVhbnRpdHlgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci51bml0LXByaWNlJyAgICAgICAgICAgOiBgdW5pdCBwcmljZWAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5zZW50JyAgICAgICAgICAgICAgICAgOiBgc2VudGAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci52YWxpZGF0ZWQnICAgICAgICAgICAgOiBgdmFsaWRhdGVkYCAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5zaWduZWQnICAgICAgICAgICAgICAgOiBgc2lnbmVkYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5jdW11bGF0aXZlLWFtb3VudCcgICAgOiBgY3VtdWxhdGl2ZSBhbW91bnRgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC1odCcgICAgICAgICAgICAgICAgICAgOiBgcHJlLXRheCBhbW91bnRgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC10YXhlcycgICAgICAgICAgICAgICAgOiBgdGF4ZXNgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudCcgICAgICAgICAgICAgICAgICAgICAgOiBgYW1vdW50YCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC5wYWlkJyAgICAgICAgICAgICAgICAgOiBgcGFpZGAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC5sZWZ0LXRvLXBheScgICAgICAgICAgOiBgbGVmdGAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmVtcHR5JyAgICAgICAgICAgICAgICAgICAgICAgOiBgbm9uZSAoeWV0KWAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLnBhZ2luYXRpb24nICAgICAgICAgICAgICAgICAgOiBge3N0YXJ0fSDigJMge2VuZH0gb2Yge3RvdGFsfWAgLFxuICAndGFibGUucm93cy1wZXItcGFnZScgICAgICAgICAgICAgICA6IGByb3dzIHBlciBwYWdlOmAgICAgICAgICAgICAgLFxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAnXy5xdW90YXRpb25zJyAgICA6IGBkZXZpc2AgICAgICAgICAsXG4gICdfLmludm9pY2VzJyAgICAgIDogYGZhY3R1cmVzYCAgICAgICxcbiAgJ18uYW1vdW50JyAgICAgICAgOiBgbW9udGFudGAgICAgICAgLFxuICAnXy5pbnZvaWNlcy5wYWlkJyA6IGBwYXnDqWAgICAgICAgICAgLFxuICAnXy5pbnZvaWNlcy5sZWZ0JyA6IGDDoCBwYXllcmAgICAgICAgLFxuICAnXy5jb3VudCcgICAgICAgICA6IGBub21icmVgICAgICAgICAsXG4gICdfLmxlZnQtdG8tcGF5JyAgIDogYHJlc3RlIMOgIHBheWVyYCAsXG4gICdfLmFyY2hpdmUnICAgICAgIDogYGFyY2hpdmVyYCAgICAgICxcbiAgJ18uc2F2ZScgICAgICAgICAgOiBgc2F1dmVyYCAgICAgICAgLFxuICAnXy5jcmVhdGUnICAgICAgICA6IGBjcsOpZXJgICAgICAgICAgLFxuICAnXy5wcmludCcgICAgICAgICA6IGBpbXByaW1lcmAgICAgICAsXG4gICdfLmVkaXQnICAgICAgICAgIDogYG1vZGlmaWVyYCAgICAgICxcbiAgJ18ucHJpbnQtbm90aWNlJyAgOiBgRGFucyBsZSBuYXZpZ2F0ZXVyIEZpcmVmb3gsIG4nb3VibGlleiBwYXMgZGUgY29jaGVyIGxhIGNhc2UgPGI+SW1wcmltZXIgbGEgY291bGV1ciBkJ2FycmnDqHJlLXBsYW48L2I+YCAsXG5cbiAgJ2FjY291bnQubG9naW4udGl0bGUnICAgIDogYGNvbm5leGlvbmAsXG4gICdhY2NvdW50LmxvZ2luLmJ1dHRvbicgICA6IGBzZSBjb25uZWN0ZXJgLFxuICAnYWNjb3VudC5yZWdpc3Rlci50aXRsZScgOiBgQ3LDqWVyIHVuIGNvbXB0ZWAsXG4gICdhY2NvdW50LnJlZ2lzdGVyLmJ1dHRvbic6IGBjcsOpZXJgLFxuICAnYWNjb3VudC5mb3Jnb3QudGl0bGUnICAgOiBgTW90IGRlIHBhc3NlIG91Ymxpw6kgP2AsXG4gICdhY2NvdW50LmZvcmdvdC5ub3RpY2UnICA6IGBBcHLDqHMgYXZvaXIgdmFsaWTDqSwgdm91cyByZWNldnJleiBwYXIgZW1haWwgdW4gbGllbiBkZSByw6lpbml0aWFsaXNhdGlvbmAsXG4gICdhY2NvdW50LmZvcmdvdC5idXR0b24nICA6IGBFbnZveWVyIGxlIGxpZW5gLFxuICAnYWNjb3VudC5yZXNldC50aXRsZScgICAgOiBgUsOpaW5pdGlhbGlzYXRpb24gZHUgbW90IGRlIHBhc3NlYCxcbiAgJ2FjY291bnQucmVzZXQubm90aWNlJyAgIDogYFZldWlsbGV6IHJlbnRyZXIgdm90cmUgbm91dmVhdSBtb3QgZGUgcGFzc2VgLFxuICAnYWNjb3VudC5yZXNldC5idXR0b24nICAgOiBgUsOpaW5pdGlhbGlzZXJgLFxuXG4gICdjb25maWd1cmF0aW9uLnRhYi5mcm9tJyAgICAgICAgICAgOiBgw4ltZXR0ZXVyYCxcbiAgJ2NvbmZpZ3VyYXRpb24udGFiLmRlZmF1bHQtcHJvZHVjdCc6IGBQcm9kdWl0IHBhciBkw6lmYXV0YCxcbiAgJ2NvbmZpZ3VyYXRpb24udGFiLm1lbnRpb25zJyAgICAgICA6IGBCYXMgZGUgcGFnZWAsXG4gICdjb25maWd1cmF0aW9uLnRhYi5yZWZlcmVuY2UnICAgICAgOiBgUsOpZsOpcmVuY2VgLFxuICAnY29uZmlndXJhdGlvbi5tZW50aW9ucy5xdW90YXRpb25zJzogYFBvdXIgbGVzIGRldmlzYCxcbiAgJ2NvbmZpZ3VyYXRpb24ubWVudGlvbnMuaW52b2ljZXMnICA6IGBQb3VyIGxlcyBmYWN0dXJlc2AsXG4gICdjb25maWd1cmF0aW9uLmJ1dHRvbi5zYXZlJyAgICAgICAgOiBgTWV0dHJlIMOgIGpvdXJgLFxuICAnY29uZmlndXJhdGlvbi5yZWZlcmVuY2Uud2FybmluZycgIDogYFxuICAgIENoYW5nZXIgPHN0cm9uZz5sZSBjaGlmZnJlIGRlIGTDqWJ1dDwvc3Ryb25nPiByZW51bcOpcm90ZXJhIHRvdXRlcyBsZXMgcsOpZsOpcmVuY2VzIGR1IHR5cGUgY29uY2VybsOpLlxuICAgIDxiciAvPlxuICAgIFNveWV6IHBydWRlbnQgIWAsXG5cbiAgJ2N1c3RvbWVyLmJ1dHRvbi5jcmVhdGUnICAgICA6IGBDcsOpZXIgbGUgY2xpZW50YCAgLFxuICAnY3VzdG9tZXIuYnV0dG9uLnVwZGF0ZScgICAgIDogYE1ldHRyZSDDoCBqb3VyYCAgICAsXG4gICdjdXN0b21lci5idXR0b24ubmV3JyAgICAgICAgOiBgbm91dmVhdSBjbGllbnRgICAgLFxuICAnY3VzdG9tZXIuYnV0dG9uLmxpc3QnICAgICAgIDogYGxpc3QgZGVzIGNsaWVudHNgICxcbiAgJ2ludm9pY2VzLmJ1dHRvbi5hcmNoaXZlJyAgICA6IGBhcmNoaXZlcmAgICAgICAgICAsXG4gICdjdXN0b21lci50YWIuY29uZmlndXJhdGlvbicgOiBgw4lkaXRpb24gbCdlbnTDqnRlYCAsXG4gICdjdXN0b21lci50b3RhbC5xdW90YXRpb24nICAgOiBgdG90YWwgZGV2aXNgICAgICAgLFxuICAnY3VzdG9tZXIudG90YWwuaW52b2ljZScgICAgIDogYHRvdGFsIGZhY3R1cmVzYCAgICxcbiAgJ2N1c3RvbWVyLnRvdGFsLnRvLWJlLXBhaWQnICA6IGByZXN0ZSDDoCBwYXllcmAgICAgLFxuICAnY3VzdG9tZXIudG90YWwucHJvZ3Jlc3MnICAgIDogYHByb2dyZXNzaW9uYCAgICAgICxcblxuICAnZmllbGQuZW1haWwnICAgICAgICAgOiBgZW1haWxgICAgICAgICAgICAsXG4gICdmaWVsZC5wYXNzd29yZCcgICAgICA6IGBtb3QgZGUgcGFzc2VgICAgICxcbiAgJ2ZpZWxkLm5hbWUnICAgICAgICAgIDogYG5vbWAgICAgICAgICAgICAgLFxuICAnZmllbGQuYWRkcmVzcycgICAgICAgOiBgYWRyZXNzZWAgICAgICAgICAsXG4gICdmaWVsZC5jdXN0b21lcicgICAgICA6IGBjbGllbnRgICAgICAgICAgICxcbiAgJ2ZpZWxkLnRheCcgICAgICAgICAgIDogYHRheGVgICAgICAgICAgICAgLFxuICAnZmllbGQuc3ViamVjdCcgICAgICAgOiBgb2JqZXRgICAgICAgICAgICAsXG4gICdmaWVsZC5kZXNjcmlwdGlvbicgICA6IGBkZXNjcmlwdGlvbmAgICAgICxcbiAgJ2ZpZWxkLnF1YW50aXR5JyAgICAgIDogYHF1YW50aXTDqWAgICAgICAgICxcbiAgJ2ZpZWxkLmN1cnJlbmN5JyAgICAgIDogYGRldmlzZWAgICAgICAgICAgLFxuICAnZmllbGQucHJlZml4JyAgICAgICAgOiBgcHLDqWZpeGVgICAgICAgICAgLFxuICAnZmllbGQuc3RhcnQtYXQnICAgICAgOiBgY29tbWVuY2Ugw6BgICAgICAgLFxuICAnZmllbGQubGFuZ3VhZ2UnICAgICAgOiBgbGFuZ3VlYCAgICAgICAgICAsXG4gICdmaWVsZC5kZWZhdWx0LXByaWNlJyA6IGBwcml4IHBhciBkw6lmYXV0YCAsXG5cbiAgJ2ludm9pY2VzLnRhYi5wYXltZW50cycgICAgICA6IGBQYWllbWVudHNgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLnRhYi5wcmV2aWV3JyAgICAgICA6IGBBcGVyw6d1IGRlIGxhIGZhY3R1cmVgICAgICAsXG4gICdpbnZvaWNlcy5idXR0b24uc2F2ZScgICAgICAgOiBgTWV0dHJlIMOgIGpvdXJgICAgICAgICAgICAgLFxuICAnaW52b2ljZXMuYnV0dG9uLnF1b3RhdGlvbicgIDogYFZvaXIgbGUgZGV2aXNgICAgICAgICAgICAgLFxuICAnaW52b2ljZXMuYnV0dG9uLnByZXZpZXcnICAgIDogYHByw6l2aXN1YWxpc2VyIGxhIGZhY3R1cmVgICxcbiAgJ2ludm9pY2VzLmJ1dHRvbi5saXN0JyAgICAgICA6IGBsaXN0ZSBkZXMgZGV2aXNgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50JyAgICAgICAgICAgICA6IGDDqXbDqG5lbWVudGAgICAgICAgICAgICAgICAgLFxuICAnaW52b2ljZXMuZXZlbnQuIycgICAgICAgICAgIDogYG7LmmAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LmRlc2NyaXB0aW9uJyA6IGBkZXNjcmlwdGlvbmAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LnBheW1lbnQnICAgICA6IGBwYWllbWVudGAgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LmRhdGUnICAgICAgICA6IGBkYXRlYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LmFtb3VudCcgICAgICA6IGBtb250YW50YCAgICAgICAgICAgICAgICAgICxcbiAgJ2ludm9pY2VzLmV2ZW50LnNlbnQnICAgICAgICA6IGBlbnZvecOpYCAgICAgICAgICAgICAgICAgICAsXG5cbiAgJ2tleS1wcmVzLmN1c3RvbWVyJyAgICAgICAgICA6IGBjbGllbnRgICAgICAgICAgICxcbiAgJ2tleS1wcmVzLnNlbnQnICAgICAgICAgICAgICA6IGBlbnZvecOpIGxlYCAgICAgICAsXG4gICdrZXktcHJlcy52YWxpZGF0ZWQnICAgICAgICAgOiBgdmFsaWTDqSBsZWAgICAgICAgLFxuICAna2V5LXByZXMuc2lnbmVkJyAgICAgICAgICAgIDogYHNpZ27DqSBsZWAgICAgICAgICxcbiAgJ2tleS1wcmVzLnRvdGFsJyAgICAgICAgICAgICA6IGB0b3RhbGAgICAgICAgICAgICxcbiAgJ2tleS1wcmVzLmFzc29jaWF0ZWQucXVvdGUnICA6IGBkZXZpcyBhc3NvY2nDqWAgICAsXG4gICdrZXktcHJlcy5hc3NvY2lhdGVkLmludm9pY2UnOiBgZmFjdHVyZSBhc3NvY2nDqWVgLFxuICAna2V5LXByZXMubGVmdC10by1wYXknICAgICAgIDogYHJlc3RlIMOgIHBheWVyYCAgICxcblxuICAnbm90aWZpY2F0aW9ucy51c2VyLndlbGNvbWUnICAgICAgICAgICAgICAgICAgICAgOiBgQmllbnZlbnVlIHtuYW1lfWAsXG4gICdub3RpZmljYXRpb25zLnVzZXIubWFpbC1zZW50JyAgICAgICAgICAgICAgICAgICA6IGBVbiBlbWFpbCBhIMOpdMOpIGVudm95w6kgw6Age2VtYWlsfWAsXG4gICdub3RpZmljYXRpb25zLnF1b3RhdGlvbi5zYXZlZCcgICAgICAgICAgICAgICAgICA6IGBMZSBkZXZpcyBhIMOpdMOpIHNhdXZlZ2FyZMOpYCxcbiAgJ25vdGlmaWNhdGlvbnMucXVvdGF0aW9uLmVycm9yJyAgICAgICAgICAgICAgICAgIDogYFVuZSBlcnJldXIgZXN0IHN1cnZlbnVlIGxvcnMgZGUgbGEgc2F1dmVnYXJkZWAsXG4gICdub3RpZmljYXRpb25zLnF1b3RhdGlvbi5jcmVhdGUtaW52b2ljZS5zdWNjZXNzJyA6IGBGYWN0dXJlIGNyw6nDqWVgLFxuICAnbm90aWZpY2F0aW9ucy5xdW90YXRpb24uY3JlYXRlLWludm9pY2UuZXJyb3InICAgOiBgVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSBjcsOpYXRpb24gZGUgbGEgZmFjdHVyZWAsXG4gICdub3RpZmljYXRpb25zLmludm9pY2Uuc2F2ZWQnICAgICAgICAgICAgICAgICAgICA6IGBMYSBmYWN0dXJlIGEgw6l0w6kgc2F1dmVnYXJkw6lgLFxuICAnbm90aWZpY2F0aW9ucy5pbnZvaWNlLmVycm9yJyAgICAgICAgICAgICAgICAgICAgOiBgVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlYCxcbiAgJ25vdGlmaWNhdGlvbnMuY3VzdG9tZXIuc2F2ZWQnICAgICAgICAgICAgICAgICAgIDogYExlIGNsaWVudCBhIMOpdMOpIHNhdXZlZ2FyZMOpYCxcbiAgJ25vdGlmaWNhdGlvbnMuZ2VuZXJpYy5zYXZlZCcgICAgICAgICAgICAgICAgICAgIDogYGVucmVnaXN0cmVtZW50IGVmZmVjdHXDqWAsXG4gICdub3RpZmljYXRpb25zLmdlbmVyaWMuZXJyb3InICAgICAgICAgICAgICAgICAgICA6IGDigKIgdW5lIGVycmV1ciBlc3Qgc3VydmVudWUg4oCiYCxcblxuICAncGFnZS5ob21lJyAgICAgICAgICAgICAgIDogYGFjY3VlaWxgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhZ2UucXVvdGF0aW9ucycgICAgICAgICA6IGBkZXZpc2AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYWdlLnF1b3RhdGlvbnMubmV3JyAgICAgOiBgbm91dmVhdSBkZXZpc2AgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFnZS5xdW90YXRpb25zLmVkaXQnICAgIDogYGRldmlzIOKAkyB7cmVmZXJlbmNlfWAgICAgICAgICAgICAgICAgLFxuICAncGFnZS5xdW90YXRpb25zLnByZXZpZXcnIDogYGRldmlzIOKAkyB7cmVmZXJlbmNlfWAgICAgICAgICAgICAgICAgLFxuICAncGFnZS5pbnZvaWNlcycgICAgICAgICAgIDogYGZhY3R1cmVzYCAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhZ2UuaW52b2ljZXMuZWRpdCcgICAgICA6IGBmYWN0dXJlIOKAk8Kge3JlZmVyZW5jZX1gICAgICAgICAgICAgICAsXG4gICdwYWdlLmludm9pY2VzLnByZXZpZXcnICAgOiBgZmFjdHVyZSDigJMge3JlZmVyZW5jZX1gICAgICAgICAgICAgICAsXG4gICdwYWdlLmN1c3RvbWVycycgICAgICAgICAgOiBgY2xpZW50c2AgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFnZS5jdXN0b21lcnMubmV3JyAgICAgIDogYG5vdXZlYXUgY2xpZW50YCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhZ2UuY3VzdG9tZXJzLmVkaXQnICAgICA6IGBjbGllbnQgOiB7bmFtZX1gICAgICAgICAgICAgICAgICAgICAsXG4gICdwYWdlLnNldHRpbmdzJyAgICAgICAgICAgOiBgY29uZmlndXJhdGlvbmAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFnZS5jb25uZWN0ZWQnICAgICAgICAgIDogYGNvbm5lY3TDqSBlbiB0YW50IHF1ZSA6PGJyLz57ZW1haWx9YCAsXG4gICdwYWdlLmxvZ291dCcgICAgICAgICAgICAgOiBgZMOpY29ubmV4aW9uYCAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhZ2UubG9naW4nICAgICAgICAgICAgICA6IGBjb25uZXhpb25gICAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYWdlLnJlZ2lzdGVyJyAgICAgICAgICAgOiBgZW5yZWdpc3RyZW1lbnRgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFnZS5mb3Jnb3QnICAgICAgICAgICAgIDogYG1vdCBkZSBwYXNzZSBvdWJsacOpYCAgICAgICAgICAgICAgICAsXG4gICdwYWdlLmVycm9yJyAgICAgICAgICAgICAgOiBgVW5lIGVycmV1ciBlc3Qgc3VydmVudWVgICAgICAgICAgICAgLFxuICAncGFnZS5hcmNoaXZlZCcgICAgICAgICAgIDogYGFyY2hpdmVzYCAgICAgICAgICAgICAgICAgICAgICAgICAgICxcblxuICAncGFwZXItc2hlZXQucmVmZXJlbmNlLnF1b3RhdGlvbicgICA6IGBEZXZpc2AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnJlZmVyZW5jZS5pbnZvaWNlJyAgICAgOiBgRmFjdHVyZWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYXBlci1zaGVldC5yZWZlcmVuY2UuZGF0ZScgICAgICAgIDogYGRhdGUgOiBgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFwZXItc2hlZXQucGFydHkuZnJvbScgICAgICAgICAgICA6IGDDiW1ldHRldXIgOmAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYXBlci1zaGVldC5wYXJ0eS50bycgICAgICAgICAgICAgIDogYEFkcmVzc8OpIMOgIDpgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICdwYXBlci1zaGVldC5wYXJ0eS5uby1uYW1lLmZyb20nICAgIDogYGTDqWZpbmlzc2V6IHZvdHJlIG5vbSBkYW5zIGxlcyByw6lnbGFnZXNgICAgICAsXG4gICdwYXBlci1zaGVldC5wYXJ0eS5uby1hZGRyZXNzLmZyb20nIDogYGTDqWZpbmlzc2V6IHZvdHJlIGFkcmVzc2UgZGFucyBsZXMgcsOpZ2xhZ2VzYCAsXG4gICdwYXBlci1zaGVldC5wYXJ0eS5uby1uYW1lLnRvJyAgICAgIDogYGNsaWVudCBzYW5zIG5vbWAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncGFwZXItc2hlZXQucGFydHkubm8tYWRkcmVzcy50bycgICA6IGBjbGllbnQgc2FucyBhZHJlc3NlYCAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3BhcGVyLXNoZWV0LnN1YmplY3QnICAgICAgICAgICAgICAgOiBgT2JqZXQgOmAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXG5cbiAgJ3Byb2R1Y3QucGxhY2UtaG9sZGVyJzogYHRhcGV6IHBvdXIgY3LDqWVyIHVuZSBub3V2ZWxsZSBsaWduZWAsXG5cbiAgJ3F1b3RhdGlvbi5jcmVhdGUnICAgICAgICAgICA6IGBjcsOpZXJgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAncXVvdGF0aW9uLnJlYWR5LXRvLWludm9pY2UnIDogYERldmlzIHByw6p0cyBwb3VyIGZhY3R1cmF0aW9uYCAsXG4gICdxdW90YXRpb24uaW52b2ljZS5jcmVhdGUnICAgOiBgY3LDqWVyIGxhIGZhY3R1cmVgICAgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5pbnZvaWNlLnNob3cnICAgICA6IGB2b2lyIGxhIGZhY3R1cmVgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uYnV0dG9uLmNyZWF0ZScgICAgOiBgQ3LDqWVyIGxlIGRldmlzYCAgICAgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5idXR0b24udXBkYXRlJyAgICA6IGBNZXR0cmUgw6Agam91ciBsZSBkZXZpc2AgICAgICAgLFxuICAncXVvdGF0aW9uLmJ1dHRvbi5hcmNoaXZlJyAgIDogYEFyY2hpdmVyYCAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3F1b3RhdGlvbi5idXR0b24ubmV3JyAgICAgICA6IGBOb3V2ZWF1IGRldmlzYCAgICAgICAgICAgICAgICAsXG4gICdxdW90YXRpb24uYnV0dG9uLmxpc3QnICAgICAgOiBgbGlzdGUgZGVzIGRldmlzYCAgICAgICAgICAgICAgLFxuICAncXVvdGF0aW9uLmJ1dHRvbi5wcmV2aWV3JyAgIDogYHByw6l2aXN1YWxpc2VyIGxlIGRldmlzYCAgICAgICAsXG5cbiAgJ3NwaW5uZXIubG9hZGluZycgIDogYGNoYXJnZW1lbnTigKZgLFxuXG4gICdzdGVwcGVyLnNlbnQnICAgICAgOiBgZW52b3nDqSBsZSA6YCAsXG4gICdzdGVwcGVyLnZhbGlkYXRlZCcgOiBgdmFsaWTDqSBsZSA6YCAsXG4gICdzdGVwcGVyLnNpZ25lZCcgICAgOiBgc2lnbsOpIGxlIDpgICAsXG4gICdzdGVwcGVyLmN1c3RvbWVyJyAgOiBgY2xpZW50IDpgICAgICxcbiAgJ3N0ZXBwZXIudG90YWwnICAgICA6IGB0b3RhbCA6YCAgICAgLFxuXG4gICd0YWJsZS5oZWFkZXIuaWQnICAgICAgICAgICAgICAgICAgIDogYCNgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLm5hbWUnICAgICAgICAgICAgICAgICA6IGBub21gICAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5jdXN0b21lcicgICAgICAgICAgICAgOiBgY2xpZW50YCAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIuc3RhdHVzJyAgICAgICAgICAgICAgIDogYHN0YXR1dGAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLnRheCcgICAgICAgICAgICAgICAgICA6IGB0YXhlYCAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdW90YXRpb24nICAgICAgICAgICAgOiBgZGV2aXNgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIucXVvdGF0aW9uLWFzc29jaWF0ZWQnIDogYGRldmlzIGFzc29jacOpYCAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5xdW90YXRpb25zJyAgICAgICAgICAgOiBgZGV2aXNgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIuaW52b2ljZScgICAgICAgICAgICAgIDogYGZhY3R1cmVgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLmludm9pY2VzJyAgICAgICAgICAgICA6IGBmYWN0dXJlc2AgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci5kZXNjcmlwdGlvbicgICAgICAgICAgOiBgZGVzY3JpcHRpb25gICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIucXVhbnRpdHknICAgICAgICAgICAgIDogYHF1YW50aXTDqWAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci51bml0LXByaWNlJyAgICAgICAgICAgOiBgcHJpeCB1bml0YWlyZWAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIuc2VudCcgICAgICAgICAgICAgICAgIDogYGVudm95w6lgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmhlYWRlci52YWxpZGF0ZWQnICAgICAgICAgICAgOiBgdmFsaWTDqWAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuaGVhZGVyLnNpZ25lZCcgICAgICAgICAgICAgICA6IGBzaWduw6lgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5oZWFkZXIuY3VtdWxhdGl2ZS1hbW91bnQnICAgIDogYG1vbnRhbnQgY3VtdWzDqWAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC1odCcgICAgICAgICAgICAgICAgICAgOiBgbW9udGFudCBIVGAgICAgICAgICAgICAgICAgICAsXG4gICd0YWJsZS5hbW91bnQtdGF4ZXMnICAgICAgICAgICAgICAgIDogYHRheGVzYCAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuYW1vdW50JyAgICAgICAgICAgICAgICAgICAgICA6IGB0b3RhbGAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmFtb3VudC5wYWlkJyAgICAgICAgICAgICAgICAgOiBgcGF5w6lgICAgICAgICAgICAgICAgICAgICAgICAgLFxuICAndGFibGUuYW1vdW50LmxlZnQtdG8tcGF5JyAgICAgICAgICA6IGByZXN0ZWAgICAgICAgICAgICAgICAgICAgICAgICxcbiAgJ3RhYmxlLmVtcHR5JyAgICAgICAgICAgICAgICAgICAgICAgOiBgdmlkZSAocG91ciBsJ2luc3RhbnQpYCAgICAgICAsXG4gICd0YWJsZS5wYWdpbmF0aW9uJyAgICAgICAgICAgICAgICAgIDogYHtzdGFydH0g4oCTIHtlbmR9IHN1ciB7dG90YWx9YCAsXG4gICd0YWJsZS5yb3dzLXBlci1wYWdlJyAgICAgICAgICAgICAgIDogYGxpZ25lcyBwYXIgcGFnZSA6YCAgICAgICAgICAgLFxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBlbiB9IGZyb20gJy4vZW4nXG5leHBvcnQgeyBkZWZhdWx0IGFzIGZyIH0gZnJvbSAnLi9mcidcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5hdkxpbmsgICAgICAgICAgICwgd2l0aFJvdXRlciB9ICAgICAgICAgICBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSAgLCBGb3JtYXR0ZWRIVE1MTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAqIGFzIGFjY291bnQgZnJvbSAnLi4vZHVja3MvYWNjb3VudCdcblxuaW1wb3J0ICcuL21haW4uc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgbmF2LW1haW5gXG5jb25zdCBJVEVNX0NMQVNTID0gYCR7QkFTRV9DTEFTU31fX2l0ZW1gXG5jb25zdCBBQ1RJVkVfQ0xBU1MgPSBgaXMtYWN0aXZlYFxuXG5jbGFzcyBMb2dvdXRCdXR0b24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5sb2dvdXQgPSB0aGlzLmxvZ291dC5iaW5kKCB0aGlzIClcbiAgfVxuICBsb2dvdXQoIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5wcm9wcy5sb2dvdXQoIHt9IClcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxhIGhyZWY9XCIvYWNjb3VudC9sb2dvdXRcIiBvbkNsaWNrPXsgdGhpcy5sb2dvdXQgfT5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmxvZ291dFwiIC8+XG4gICAgICA8L2E+XG4gICAgKVxuICB9XG59XG5cbmZ1bmN0aW9uIENvbm5lY3RlZE5hdiggcHJvcHMgKSAge1xuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxsaSBjbGFzc05hbWU9eyBJVEVNX0NMQVNTIH0+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL1wiIGV4YWN0IGFjdGl2ZUNsYXNzTmFtZT17IEFDVElWRV9DTEFTUyB9PlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicGFnZS5ob21lXCIgLz5cbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzc05hbWU9eyBJVEVNX0NMQVNTIH0+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL3F1b3RhdGlvbnNcIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UucXVvdGF0aW9uc1wiIC8+XG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3NOYW1lPXsgSVRFTV9DTEFTUyB9PlxuICAgICAgICA8TmF2TGluayB0bz1cIi9pbnZvaWNlc1wiIGFjdGl2ZUNsYXNzTmFtZT17IEFDVElWRV9DTEFTUyB9PlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicGFnZS5pbnZvaWNlc1wiIC8+XG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3NOYW1lPXsgSVRFTV9DTEFTUyB9PlxuICAgICAgICA8TmF2TGluayB0bz1cIi9jdXN0b21lcnNcIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UuY3VzdG9tZXJzXCIgLz5cbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzc05hbWU9eyBJVEVNX0NMQVNTIH0+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FyY2hpdmVzXCIgYWN0aXZlQ2xhc3NOYW1lPXsgQUNUSVZFX0NMQVNTIH0+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmFyY2hpdmVkXCIgLz5cbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzc05hbWU9eyBJVEVNX0NMQVNTIH0+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FjY291bnQvc2V0dGluZ3NcIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2Uuc2V0dGluZ3NcIiAvPlxuICAgICAgICA8L05hdkxpbms+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzTmFtZT17YCR7SVRFTV9DTEFTU30gJHtJVEVNX0NMQVNTfS0tc2VwYXJhdG9yYH0+XG4gICAgICAgIDxGb3JtYXR0ZWRIVE1MTWVzc2FnZVxuICAgICAgICAgIGlkPVwicGFnZS5jb25uZWN0ZWRcIlxuICAgICAgICAgIHZhbHVlcz17e2VtYWlsOiBwcm9wcy5lbWFpbH19IC8+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzTmFtZT17IElURU1fQ0xBU1MgfT5cbiAgICAgICAgPExvZ291dEJ1dHRvbiBsb2dvdXQ9eyBwcm9wcy5sb2dvdXR9IC8+XG4gICAgICA8L2xpPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gQ29ubmVjdGlvbk5hdiggcHJvcHMgKSB7XG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1tYWluX19pdGVtXCI+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FjY291bnQvbG9naW5cIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UubG9naW5cIiAvPlxuICAgICAgICA8L05hdkxpbms+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1tYWluX19pdGVtXCI+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FjY291bnQvcmVnaXN0ZXJcIiBhY3RpdmVDbGFzc05hbWU9eyBBQ1RJVkVfQ0xBU1MgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInBhZ2UucmVnaXN0ZXJcIiAvPlxuICAgICAgICA8L05hdkxpbms+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1tYWluX19pdGVtXCI+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2FjY291bnQvZm9yZ290XCIgYWN0aXZlQ2xhc3NOYW1lPXsgQUNUSVZFX0NMQVNTIH0+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJwYWdlLmZvcmdvdFwiIC8+XG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgIDwvbGk+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBNYWluTmF2KCBwcm9wcyApIHtcbiAgY29uc3QgeyBpc0F1dGhlbnRpY2F0ZWQgfSA9IHByb3BzXG4gIHJldHVybiAoXG4gICAgPG5hdiBjbGFzc05hbWU9e0JBU0VfQ0xBU1N9PlxuICAgICAgPHVsIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2luYH0+XG4gICAgICAgIHtcbiAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQgPyA8Q29ubmVjdGVkTmF2IHsuLi5wcm9wc30gLz5cbiAgICAgICAgICA6IDxDb25uZWN0aW9uTmF2IHsuLi5wcm9wc30gLz5cbiAgICAgICAgfVxuICAgICAgPC91bD5cbiAgICA8L25hdj5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wcyggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgaXNBdXRoZW50aWNhdGVkOiAgc3RhdGUuYWNjb3VudC5nZXQoIGBpc0F1dGhlbnRpY2F0ZWRgICksXG4gICAgZW1haWw6ICAgICAgICAgICAgc3RhdGUuYWNjb3VudC5nZXQoIGB1c2VyLmVtYWlsYCApLFxuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoMnByb3BzKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgbG9nb3V0OiBhY2NvdW50LmxvZ291dCxcbiAgfSwgZGlzcGF0Y2gpXG59XG5cbi8vIHdpdGhSb3V0ZXIgaXMgbmVlZGVkIGZvciB0aGUgPE5hdkxpbms+IHRvIGNhdGNoLXVwIHJvdXRlIGNoYW5nZXNcbi8vIOKAoiBodHRwczovL3JlYWN0dHJhaW5pbmcuY29tL3JlYWN0LXJvdXRlci93ZWIvYXBpL3dpdGhSb3V0ZXJcbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoIGNvbm5lY3QoIHN0YXRlMnByb3BzLCBkaXNwYXRjaDJwcm9wcyApKCBNYWluTmF2ICkgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCB7IEJ0bkljb24sIEJ1dHRvbiB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25MaXN0KCBwcm9wcyApIHtcbiAgY29uc3QgeyB0eXBlLCAuLi5yZXN0IH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxCdG5JY29uXG4gICAgICBzZWNvbmRhcnlcbiAgICAgIHRvPXtgLyR7cHJvcHMudHlwZX1gfVxuICAgICAgc3ZnSWQ9XCJ2aWV3LWxpc3RcIlxuICAgICAgey4uLnJlc3R9XG4gICAgLz5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUHJldmlldyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdHlwZSwgaWQsIC4uLnJlc3QgfSA9IHByb3BzXG4gIHJldHVybiAoXG4gICAgPEJ0bkljb25cbiAgICAgIHNlY29uZGFyeVxuICAgICAgdG89e2AvJHt0eXBlfS8keyBpZCB9L3ByZXZpZXdgfVxuICAgICAgc3ZnSWQ9XCJyZWNlaXB0XCJcbiAgICAgIHsgLi4ucmVzdCB9XG4gICAgLz5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUHJpbnQoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxCdG5JY29uXG4gICAgICBzZWNvbmRhcnlcbiAgICAgIHN2Z0lkPVwicHJpbnRcIlxuICAgICAgb25DbGljaz17IGV2ZW50ID0+IHdpbmRvdy5wcmludCgpIH1cbiAgICAgIGxhYmVsPVwiXy5wcmludFwiXG4gICAgICB7Li4ucHJvcHN9XG4gICAgLz5cbiAgKVxufVxuZXhwb3J0IHsgQnV0dG9uUHJpbnQgYXMgUHJpbnQgfVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uRWRpdCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdHlwZSwgZG9jdW1lbnQsIC4uLnJlc3QgfSA9IHByb3BzXG4gIGNvbnN0IGlzQXJjaGl2ZWQgID0gZG9jdW1lbnQuZ2V0KCBgYXJjaGl2ZWRBdGAgKVxuICBpZiAoIGlzQXJjaGl2ZWQgKSByZXR1cm4gbnVsbFxuICBjb25zdCBpZCAgICAgICAgICA9IGRvY3VtZW50LmdldCggYGlkYCApXG4gIHJldHVybiAoXG4gICAgPEJ0bkljb25cbiAgICAgIHRvPXtgLyR7dHlwZX0vJHsgaWQgfWB9XG4gICAgICBzdmdJZD1cImVkaXRcIlxuICAgICAgeyAuLi5yZXN0IH1cbiAgICAvPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25OZXcoIHByb3BzICkge1xuICBjb25zdCB7IHR5cGUsIGljb24sIG1lc3NhZ2UsLi4ub3RoZXJzIH0gPSBwcm9wc1xuICBjb25zdCBpY29uSWQgPSB0eXBlID09PSBgY3VzdG9tZXJzYCA/IGBwZXJzb24tYWRkYFxuICAgIDogYG5vdGUtYWRkYFxuXG4gIGNvbnN0IHJlbmRlclByb3BzID0geyB0bzogYC8ke3R5cGV9L25ld2AgfVxuICBpZiAoIGljb24gKSByZXR1cm4gPEJ0bkljb24gey4uLnJlbmRlclByb3BzfSBzdmdJZD17IGljb25JZCB9IHsuLi5vdGhlcnN9IC8+XG4gIHJldHVybiAoXG4gICAgPEJ1dHRvblxuICAgICAgey4uLnJlbmRlclByb3BzfVxuICAgICAgey4uLm90aGVyc31cbiAgICA+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17IG1lc3NhZ2UgfSAvPlxuICAgIDwvQnV0dG9uPlxuICApXG59XG5leHBvcnQgeyBCdXR0b25OZXcgYXMgTmV3IH1cblxuZXhwb3J0IGZ1bmN0aW9uIEJ1dHRvblN1Ym1pdCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaXNTYXZpbmcsIGZvcm1JZCwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgY29uc3QgaWNvbklkID0gaXNTYXZpbmcgPyBgYmxvY2tgIDogYHNhdmVgXG4gIHJldHVybiAoXG4gICAgPEJ0bkljb25cbiAgICAgIGZvcm09eyBmb3JtSWQgfVxuICAgICAgZGlzYWJsZWQ9eyBpc1NhdmluZyB9XG4gICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgIHN2Z0lkPXsgaWNvbklkIH1cbiAgICAgIHsuLi5yZXN0fVxuICAgIC8+XG4gIClcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0ICcuL3NlY29uZGFyeS5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBuYXYtc2Vjb25kYXJ5YFxuXG5leHBvcnQgY2xhc3MgTmF2U2Vjb25kYXJ5IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzU3R1Y2s6IGZhbHNlLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUludGVyc2VjdGlvbiA9IHRoaXMuaGFuZGxlSW50ZXJzZWN0aW9uLmJpbmQoIHRoaXMgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5vYnNlcnZlSW50ZXJzZWN0aW9uKClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMudW5vYnNlcnZlSW50ZXJzZWN0aW9uKClcbiAgfVxuXG4gIC8vLS0tLS0gRVZFTlRTXG5cbiAgaGFuZGxlSW50ZXJzZWN0aW9uKCBlbnRyaWVzICkge1xuICAgIGNvbnN0IHNlbnRpbmVsRW50cnkgPSBlbnRyaWVzWyAwIF1cbiAgICBjb25zdCBpc1N0dWNrID0gc2VudGluZWxFbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA9PT0gMFxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICByZXR1cm4geyBpc1N0dWNrIH1cbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLSBVVElMU1xuXG4gIG9ic2VydmVJbnRlcnNlY3Rpb24oKSB7XG4gICAgaWYgKCAhd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyICkgcmV0dXJuXG4gICAgY29uc3QgeyB3cmFwcGVyIH0gPSB0aGlzXG4gICAgaWYgKCAhd3JhcHBlciApIHJldHVyblxuICAgIGNvbnN0IHNlbnRpbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggYGRpdmAgKVxuICAgIHNlbnRpbmVsLmNsYXNzTGlzdC5hZGQoIGAke0JBU0VfQ0xBU1N9X19zZW50aW5lbGAgKVxuICAgIHdyYXBwZXIuaW5zZXJ0QmVmb3JlKCBzZW50aW5lbCwgd3JhcHBlci5maXJzdENoaWxkIClcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKCB0aGlzLmhhbmRsZUludGVyc2VjdGlvbiApXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKCBzZW50aW5lbCApXG4gIH1cblxuICB1bm9ic2VydmVJbnRlcnNlY3Rpb24oKSB7XG4gICAgaWYgKCAhd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyICkgcmV0dXJuXG4gICAgdGhpcy5vYnNlcnZlci5kaXNjb25uZWN0KClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHRpdGxlLCBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgaXNTdHVjayB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IHN0aWNreUNsYXNzID0gWyBgJHtCQVNFX0NMQVNTfV9fc3RpY2t5YCBdXG4gICAgaWYgKCBpc1N0dWNrICkgc3RpY2t5Q2xhc3MucHVzaCggYCR7IHN0aWNreUNsYXNzWyAwIF0gfS0taXMtc3R1Y2tgIClcbiAgICByZXR1cm4gKFxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9eyBCQVNFX0NMQVNTIH0gcmVmPXsgZWwgPT4gdGhpcy53cmFwcGVyID0gZWwgfSA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgc3RpY2t5Q2xhc3Muam9pbignICcpIH0+XG4gICAgICAgICAgeyB0aXRsZSAmJiAoXG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fdGl0bGVgfT57dGl0bGV9PC9oMj5cbiAgICAgICAgICApIH1cbiAgICAgICAgICB7IGNoaWxkcmVuICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fYWN0aW9uc2B9PlxuICAgICAgICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdlNlY29uZGFyeVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAnLi9pdGVtLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTID0gYG5vdGlmaWNhdGlvbmBcblxuY29uc3QgTk9USUZJQ0FUSU9OX0xJRkVUSU1FID0gNTAwMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcbiAgICBjb25zdCB7IGVycm9yIH0gPSB0aGlzLnByb3BzLm5vdGlmaWNhdGlvblxuICAgIGNvbnN0IHR5cGUgPSBlcnJvciA/IGBlcnJvcmAgOiBgaW5mb3JtYXRpb25gXG5cbiAgICB0aGlzLnN0YXRlID0geyB0eXBlIH1cbiAgICB0aGlzLmF1dG9SZW1vdmUgPSB0aGlzLmF1dG9SZW1vdmUuYmluZCggdGhpcyApXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IG5vdGlmaWNhdGlvbiwgaGFuZGxlUmVtb3ZlIH0gPSB0aGlzLnByb3BzXG4gICAgdGhpcy50aW1lcklkID0gc2V0VGltZW91dCggdGhpcy5hdXRvUmVtb3ZlLCBOT1RJRklDQVRJT05fTElGRVRJTUUgKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy50aW1lcklkICYmIGNsZWFyVGltZW91dCggdGhpcy50aW1lcklkIClcbiAgICB0aGlzLnRpbWVySWQgPSBmYWxzZVxuICB9XG5cbiAgYXV0b1JlbW92ZSggKSB7XG4gICAgY29uc3QgeyBub3RpZmljYXRpb24sIGhhbmRsZVJlbW92ZSB9ID0gdGhpcy5wcm9wc1xuICAgIGhhbmRsZVJlbW92ZSggbm90aWZpY2F0aW9uIClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG5vdGlmaWNhdGlvbiwgaGFuZGxlUmVtb3ZlIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgeyBpMThuSWQsIF9pZCwgYWRkaXRpb25hbENvbnRlbnQsIC4uLnZhbHVlcyB9ID0gbm90aWZpY2F0aW9uXG4gICAgY29uc3QgeyB0eXBlIH0gPSB0aGlzLnN0YXRlXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgb25DbGljaz17IGUgPT4gaGFuZGxlUmVtb3ZlKCBub3RpZmljYXRpb24gKSB9XG4gICAgICAgIGNsYXNzTmFtZT17IGAkeyBCQVNFX0NMQVNTIH0gJHsgQkFTRV9DTEFTUyB9LS0keyB0eXBlIH1gIH1cbiAgICAgID5cbiAgICAgICAgPGg0IGNsYXNzTmFtZT17YCR7IEJBU0VfQ0xBU1MgfV9fdGl0bGVgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17IGkxOG5JZCB9IHZhbHVlcz17IHZhbHVlcyB9IC8+XG4gICAgICAgIDwvaDQ+XG4gICAgICAgIHsgYWRkaXRpb25hbENvbnRlbnQgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHsgQkFTRV9DTEFTUyB9X19jb250ZW50YH0gPlxuICAgICAgICAgICAgeyBhZGRpdGlvbmFsQ29udGVudCB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICAgICAgTm90aWZpY2F0aW9uICBmcm9tICcuL2l0ZW0nXG5pbXBvcnQgKiBhcyBub3RpZmljYXRpb25zIGZyb20gJy4uL2R1Y2tzL25vdGlmaWNhdGlvbnMnXG5pbXBvcnQgJy4vbGlzdC5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBub3RpZmljYXRpb25zYFxuY29uc3QgTk9USUZJQ0FUSU9OX0xJRkVUSU1FID0gNTAwMFxuXG5mdW5jdGlvbiBOb3RpZmljYXRpb25zKCBwcm9wcyApIHtcbiAgY29uc3QgeyBub3RpZmljYXRpb25zLCBoYXNOb3RpZmljYXRpb25zIH0gPSBwcm9wc1xuXG4gIGlmICggIWhhc05vdGlmaWNhdGlvbnMgKSByZXR1cm4gbnVsbFxuICByZXR1cm4gKFxuICAgIDxhc2lkZSBjbGFzc05hbWU9eyBCQVNFX0NMQVNTIH0+e1xuICAgICAgbm90aWZpY2F0aW9ucy5tYXAoIG4gPT4gKFxuICAgICAgICA8Tm90aWZpY2F0aW9uXG4gICAgICAgICAga2V5PXsgbi5faWQgfVxuICAgICAgICAgIGhhbmRsZVJlbW92ZT17IHByb3BzLmhhbmRsZVJlbW92ZSB9XG4gICAgICAgICAgbm90aWZpY2F0aW9uPXsgbiB9XG4gICAgICAgIC8+XG4gICAgICApKVxuICAgIH08L2FzaWRlPlxuICApXG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3AoIHN0YXRlICkge1xuICBjb25zdCB7IG5vdGlmaWNhdGlvbnMgfSA9IHN0YXRlXG4gIGNvbnN0IGhhc05vdGlmaWNhdGlvbnMgPSBBcnJheS5pc0FycmF5KCBub3RpZmljYXRpb25zICkgJiYgbm90aWZpY2F0aW9ucy5sZW5ndGggPiAwXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBoYXNOb3RpZmljYXRpb25zLFxuICAgIG5vdGlmaWNhdGlvbnMsXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBkaXNwYXRjaDJwcm9wID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVSZW1vdmU6IG5vdGlmaWNhdGlvbnMucmVtb3ZlT25lXG4gIH0sIGRpc3BhdGNoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wLCBkaXNwYXRjaDJwcm9wICkoIE5vdGlmaWNhdGlvbnMgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFJvdXRlICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgICBMYXlvdXRCb2FyZGluZyAgIGZyb20gJy4vbGF5b3V0L2JvYXJkaW5nJ1xuXG5jb25zdCBOb3RGb3VuZCA9ICgpID0+IChcbiAgLy8gd2UgbmVlZCBhIHJvdXRlIHRvIGhhdmUgYWNjZXNzIHRvIHN0YXRpY0NvbnRleHRcbiAgPFJvdXRlIHJlbmRlcj17KHsgc3RhdGljQ29udGV4dCB9KSA9PiB7XG4gICAgLy8gc3RhdGljQ29udGV4dCBpcyBzZXJ2ZXIgb25seVxuICAgIC8vIHB1dCBzb21lIGluZm9zIGhlcmUgc28gdGhlIHNlcnZlciBjYW4ga25vdyB0aGluZ3NcbiAgICBpZiAoIHN0YXRpY0NvbnRleHQgKSB7XG4gICAgICBzdGF0aWNDb250ZXh0LnN0YXR1cyA9IDQwNFxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPExheW91dEJvYXJkaW5nIHRpdGxlPVwiNDA0XCI+XG4gICAgICAgIDxoMj5ub3QgZm91bmQ8L2gyPlxuICAgICAgPC9MYXlvdXRCb2FyZGluZz5cbiAgICApXG4gIH19Lz5cbilcblxuZXhwb3J0IGRlZmF1bHQgTm90Rm91bmRcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgICAgICAgICAgICBmcm9tICcuLi9kdWNrcy9xdW90YXRpb25zJ1xuaW1wb3J0IHsgICAgQnV0dG9uICAgICwgQnRuSWNvbiB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5cbi8vLS0tLS0gU0hPVyBJTlZPSUNFXG5cbmZ1bmN0aW9uIEJ1dHRvblNob3dJbnZvaWNlKCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIHF1b3RhdGlvbixcbiAgICBpc1NhdmluZyxcbiAgICB3aXRoTWVzc2FnZSxcbiAgICBkaXNwYXRjaCxcbiAgICAuLi5yZXN0XG4gIH0gPSBwcm9wc1xuICBpZiAoICFxdW90YXRpb24gKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IGludm9pY2VJZCA9IHF1b3RhdGlvbi5nZXQoYGludm9pY2VJZGApXG4gIGlmICggIWludm9pY2VJZCApIHJldHVybiBudWxsXG4gIGNvbnN0IGlzSW52b2ljZUFyY2hpdmVkID0gcXVvdGF0aW9uLmdldChgaW52b2ljZS5hcmNoaXZlZEF0YClcblxuICByZXR1cm4gKFxuICAgIDxCdXR0b24gc2Vjb25kYXJ5XG4gICAgICB0bz17YC9pbnZvaWNlcy8keyBpbnZvaWNlSWQgfSR7aXNJbnZvaWNlQXJjaGl2ZWQgPyBgL3ByZXZpZXdgIDogYGAgfWAgfVxuICAgICAgZGlzYWJsZWQ9eyBpc1NhdmluZyB9XG4gICAgICB7Li4ucmVzdH1cbiAgICA+XG4gICAgICB7XG4gICAgICAgIHdpdGhNZXNzYWdlID8gPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJxdW90YXRpb24uaW52b2ljZS5zaG93XCIgLz5cbiAgICAgICAgICA6IHF1b3RhdGlvbi5nZXQoYGludm9pY2UucmVmZXJlbmNlYClcbiAgICAgIH1cbiAgICA8L0J1dHRvbj5cbiAgKVxufVxuXG5leHBvcnQgY29uc3QgU2hvd0ludm9pY2UgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGlzU2F2aW5nIDogc3RhdGUucXVvdGF0aW9ucy5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgfSlcbikoIEJ1dHRvblNob3dJbnZvaWNlIClcblxuLy8tLS0tLSBDUkVBVEUgSU5WT0lDRVxuXG5mdW5jdGlvbiBCdXR0b25DcmVhdGVJbnZvaWNlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBxdW90YXRpb24sIGNyZWF0ZUludm9pY2UsIGlzU2F2aW5nLCAuLi5vdGhlcnMgfSA9IHByb3BzXG4gIGlmICggIXF1b3RhdGlvbiApIHJldHVybiBudWxsXG4gIGNvbnN0IGlkICAgICAgICAgID0gcXVvdGF0aW9uLmdldChgaWRgICAgICAgICAgKVxuICBjb25zdCBpc0F2YWlsYWJsZSA9IHF1b3RhdGlvbi5nZXQoYF9jYW5DcmVhdGVJbnZvaWNlYClcbiAgaWYgKCAhaXNBdmFpbGFibGUgKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IGJ0blByb3BzID0ge1xuICAgIG9uQ2xpY2s6IGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNyZWF0ZUludm9pY2UoeyBpZCB9KVxuICAgIH0sXG4gICAgdHlwZSAgICAgIDogYHN1Ym1pdGAgICAgICAgICAgICAgICAgICAgICAsXG4gICAgZm9ybU1ldGhvZDogYHBvc3RgICAgICAgICAgICAgICAgICAgICAgICAsXG4gICAgZm9ybUFjdGlvbjogYC9xdW90YXRpb25zLyR7IGlkIH0vY3JlYXRlLWludm9pY2VgLFxuICAgIGRpc2FibGVkICA6IGlzU2F2aW5nICAgICAgICAgICAgICAgICAgICAgLFxuICAgIC4uLm90aGVyc1xuICB9XG4gIHJldHVybiAoXG4gICAgPEJ1dHRvbiBzZWNvbmRhcnlcbiAgICAgIHsuLi5idG5Qcm9wc31cbiAgICA+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInF1b3RhdGlvbi5pbnZvaWNlLmNyZWF0ZVwiIC8+XG4gICAgPC9CdXR0b24+XG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IENyZWF0ZUludm9pY2UgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGlzU2F2aW5nIDogc3RhdGUucXVvdGF0aW9ucy5nZXQoIGBpc1NhdmluZ2AgKSxcbiAgfSksXG4gIGRpc3BhdGNoID0+IGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgY3JlYXRlSW52b2ljZTogcXVvdGF0aW9ucy5jcmVhdGVJbnZvaWNlXG4gIH0sIGRpc3BhdGNoKSxcbikoIEJ1dHRvbkNyZWF0ZUludm9pY2UgKVxuXG4vLy0tLS0tIEFSQ0hJVkVcblxuZnVuY3Rpb24gQnV0dG9uQXJjaGl2ZVF1b3RhdGlvbiggcHJvcHMgKSB7XG4gIGNvbnN0IHsgcXVvdGF0aW9uLCBhcmNoaXZlT25lLCBpc1NhdmluZywgaWNvbiwgLi4ub3RoZXJzIH0gPSBwcm9wc1xuICBpZiAoICFxdW90YXRpb24gKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IGlkICAgICAgICAgID0gcXVvdGF0aW9uLmdldChgaWRgICAgICAgICAgKVxuICBjb25zdCBpc0F2YWlsYWJsZSA9IHF1b3RhdGlvbi5nZXQoYF9jYW5CZUFyY2hpdmVkYClcbiAgaWYgKCAhaXNBdmFpbGFibGUgKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IGJ0blByb3BzID0ge1xuICAgIG9uQ2xpY2s6IGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGFyY2hpdmVPbmUoe2lkfSlcbiAgICB9LFxuICAgIHR5cGUgICAgICA6IGBzdWJtaXRgICAgICAgICAgICAgICAgICAgICAgLFxuICAgIGZvcm1NZXRob2Q6IGBwb3N0YCAgICAgICAgICAgICAgICAgICAgICAgLFxuICAgIGZvcm1BY3Rpb246IGAvcXVvdGF0aW9ucy8keyBpZCB9L2FyY2hpdmVgLFxuICAgIGRpc2FibGVkICA6IGlzU2F2aW5nICAgICAgICAgICAgICAgICAgICAgLFxuICAgIC4uLm90aGVyc1xuICB9XG4gIGlmICggaWNvbiApIHJldHVybiA8QnRuSWNvbiBzdmdJZD1cImFyY2hpdmVcIiB7Li4uYnRuUHJvcHMgfS8+XG5cbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uIHsuLi5idG5Qcm9wcyB9ID5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwicXVvdGF0aW9uLmJ1dHRvbi5hcmNoaXZlXCIgLz5cbiAgICA8L0J1dHRvbj5cbiAgKVxufVxuXG5leHBvcnQgY29uc3QgQXJjaGl2ZVF1b3RhdGlvbiA9IGNvbm5lY3QoXG4gIHN0YXRlID0+ICh7XG4gICAgaXNTYXZpbmc6IHN0YXRlLnF1b3RhdGlvbnMuZ2V0KCBgaXNTYXZpbmdgICksXG4gIH0pLFxuICBkaXNwYXRjaCA9PiBiaW5kQWN0aW9uQ3JlYXRvcnMoe1xuICAgIGFyY2hpdmVPbmU6IHF1b3RhdGlvbnMuYXJjaGl2ZU9uZVxuICB9LCBkaXNwYXRjaCksXG4pKCBCdXR0b25BcmNoaXZlUXVvdGF0aW9uIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCAgIHNlcmlhbGl6ZSAgICAgICAgICAgIGZyb20gJ2Zvcm0tc2VyaWFsaXplJ1xuaW1wb3J0ICAgY3JpbyAgICAgICAgICAgICAgICAgZnJvbSAnY3JpbydcbmltcG9ydCAgIGZsb3cgICAgICAgICAgICAgICAgIGZyb20gJ2xvZGFzaC5mbG93J1xuaW1wb3J0ICAgc2hvcnRpZCAgICAgICAgICAgICAgZnJvbSAnc2hvcnRpZCdcblxuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCAqIGFzIGN1c3RvbWVycyAgICAgICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2N1c3RvbWVycydcbmltcG9ydCAqIGFzIGNvbXB1dGUgICAgICAgICAgICAgICAgIGZyb20gJy4uL3V0aWxzL2NvbXB1dGUtdG90YWwnXG5pbXBvcnQgKiBhcyByZWRpcmVjdGlvbiAgICAgICAgICAgICBmcm9tICcuLi91dGlscy9jaGVjay1yZWRpcmVjdGlvbidcbmltcG9ydCB7ICAgIGZpbHRlckFycmF5V2l0aE9iamVjdCB9IGZyb20gJy4uL3V0aWxzL2ZpbHRlci1hcnJheS13aXRoLW9iamVjdCdcbmltcG9ydCB7ICAgIFNwaW5uZXIgICAgICAgICAgICAgICB9IGZyb20gJy4uL3VpL3NwaW5uZXInXG5pbXBvcnQgeyAgICBRdW90YXRpb25Gb3JtUHJlcyAgICAgfSBmcm9tICcuL2Zvcm0ucHJlcydcblxuY29uc3QgU1RFUFMgPSBjcmlvKFtcbiAgeyBrZXk6IGBzZW5kQXRgICAgICAsIGxhYmVsOiBgc3RlcHBlci5zZW50YCAgICAgIH0sXG4gIHsga2V5OiBgdmFsaWRhdGVkQXRgLCBsYWJlbDogYHN0ZXBwZXIudmFsaWRhdGVkYCB9LFxuICB7IGtleTogYHNpZ25lZEF0YCAgICwgbGFiZWw6IGBzdGVwcGVyLnNpZ25lZGAgICAgfSxcbl0pXG5cbmZ1bmN0aW9uIHJlY29tcHV0ZVN0ZXBzKCBmb3JtRGF0YSApIHtcbiAgY29uc3Qgc3RlcHMgPSBTVEVQUy5tYXAoIHMgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gZm9ybURhdGEuZ2V0KCBzLmtleSApXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlLFxuICAgICAga2V5OiAgIHMua2V5LFxuICAgICAgbGFiZWw6IHMubGFiZWwsXG4gICAgfVxuICB9KVxuICByZXR1cm4gZm9ybURhdGEuc2V0KCBgc3RlcHNgLCBzdGVwcyApXG59XG5cbi8vIOKAoiBkZS1kdXBlIGRlZmF1bHRQcm9kdWN0IGxpbmVzXG4vLyDigKIgY2hlY2sgX2lkIGZvciBSZWFjdFxuZnVuY3Rpb24gcmVtb3ZlRGVmYXVsdFByb2R1Y3RzKCBmb3JtRGF0YSApIHtcbiAgY29uc3QgZGVmYXVsdFByb2R1Y3QgID0gZm9ybURhdGEuZ2V0KCBgcHJvZHVjdENvbmZpZ2AgKVxuICBjb25zdCBwcm9kdWN0cyAgICAgICAgPSBmb3JtRGF0YS5nZXQoIGBwcm9kdWN0c2AgICAgICApXG4gIGlmICggIWNyaW8uaXNBcnJheShwcm9kdWN0cykgKSByZXR1cm4gZm9ybURhdGFcbiAgY29uc3QgY2xlYW5lZFByb2R1Y3RzID0gZmlsdGVyQXJyYXlXaXRoT2JqZWN0KHtcbiAgICBkZWZhdWx0T2JqZWN0OiAgZGVmYXVsdFByb2R1Y3QsXG4gICAgYXJyYXk6ICAgICAgICAgIHByb2R1Y3RzLFxuICB9KVxuICByZXR1cm4gZm9ybURhdGEuc2V0KCBgcHJvZHVjdHNgLCBjbGVhbmVkUHJvZHVjdHMgKVxufVxuXG5mdW5jdGlvbiByZWNvbXB1dGVUb3RhbHMoIGZvcm1EYXRhICkge1xuICBjb25zdCBwcm9kdWN0cyAgICAgICAgPSBmb3JtRGF0YS5nZXQoIGBwcm9kdWN0c2AgICAgICApXG4gIGlmICggIWNyaW8uaXNBcnJheShwcm9kdWN0cykgKSByZXR1cm4gZm9ybURhdGFcbiAgY29uc3QgdG90YWxzID0gY29tcHV0ZS50b3RhbHMoIGZvcm1EYXRhIClcbiAgcmV0dXJuIGZvcm1EYXRhLm1lcmdlKCBudWxsLCB0b3RhbHMgKVxufVxuXG4vLyDigKIgYWRkIGFuIGVtcHR5IGxpbmUgYSB0aGUgZW5k4oCmXG4vLyAgIOKApmluIGNhc2UgYSB1c2VyIGp1c3QgdHlwZSBzb21ldGhpbmcgb24gdGhlIGJsYW5rIG9uZVxuZnVuY3Rpb24gYWRkRW1wdHlMaW5lKCBmb3JtRGF0YSApIHtcbiAgY29uc3QgZGVmYXVsdFByb2R1Y3QgPSBmb3JtRGF0YS5nZXQoIGBwcm9kdWN0Q29uZmlnYCApXG4gIGNvbnN0IHByb2R1Y3RzICAgICAgID0gZm9ybURhdGEuZ2V0KCBgcHJvZHVjdHNgICAgICAgKVxuICBpZiAoICFjcmlvLmlzQXJyYXkocHJvZHVjdHMpICkgcmV0dXJuIGZvcm1EYXRhXG4gIGNvbnN0IGVtcHR5UHJvZHVjdCAgID0gZGVmYXVsdFByb2R1Y3Quc2V0KCBgY2hlY2tlZGAsIHRydWUgKVxuICByZXR1cm4gZm9ybURhdGEuc2V0KCBgcHJvZHVjdHNgLCBwcm9kdWN0cy5wdXNoKCBlbXB0eVByb2R1Y3QgKSlcbn1cblxuXG5mdW5jdGlvbiBlbnN1cmVQcm9kdWN0SWQoIGZvcm1EYXRhICkge1xuICBjb25zdCBwcm9kdWN0cyA9IGZvcm1EYXRhLmdldCggYHByb2R1Y3RzYCApXG4gIGlmICggIWNyaW8uaXNBcnJheShwcm9kdWN0cykgKSByZXR1cm4gZm9ybURhdGFcbiAgY29uc3Qgd2l0aElkICAgPSBwcm9kdWN0cy5tYXAoIHByb2R1Y3QgPT4ge1xuICAgIGlmICggIXByb2R1Y3QuZ2V0KGBfaWRgKSApIHJldHVybiBwcm9kdWN0LnNldCggYF9pZGAsIHNob3J0aWQoKSApXG4gICAgcmV0dXJuIHByb2R1Y3RcbiAgfSlcbiAgcmV0dXJuIGZvcm1EYXRhLnNldCggYHByb2R1Y3RzYCwgd2l0aElkIClcbn1cblxuY2xhc3MgUXVvdGF0aW9uRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZm9ybURhdGE6IHF1b3RhdGlvbnMuTE9BRElORyxcbiAgICAgIGN1c3RvbWVyOiBjcmlvKHt9KSxcbiAgICB9XG5cbiAgICAvLyBkb24ndCB1c2UgYW55IGF1dG9tYXRlZCBiaW5kXG4gICAgLy8g4oCiIHRoZXkgYXJlIG9ubHkgaW4gRVMgc3RhZ2UgMuKAplxuICAgIC8vICAg4oCmYW5kIGl0IGRvZXNuJ3Qgc2VlbSB0aGF0IGl0IHdpbGwgbWFrZSBpbiBzdGFnZSAzXG4gICAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1jbGFzcy1maWVsZHMvaXNzdWVzLzgwXG4gICAgLy8gICBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9AYmFiZWwvcGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXNcbiAgICAvLyDigKIgYnV0IGJldHRlciB0byBiaW5kIHRoYW4gcmVseWluZyBvbiBhcnJvdyBmdW5jdGlvbnMgaW4gcmVuZGVyKClcbiAgICAvLyAgIGh0dHBzOi8vY29kZWJ1cnN0LmlvL2hvdy10by1ub3QtcmVhY3QtY29tbW9uLWFudGktcGF0dGVybnMtYW5kLWdvdGNoYXMtaW4tcmVhY3QtNDAxNDFmZTBkY2QjYWVmNVxuICAgIHRoaXMuaGFuZGxlU3VibWl0ICAgICAgICA9IHRoaXMuaGFuZGxlU3VibWl0ICAgICAgIC5iaW5kKCB0aGlzIClcbiAgICB0aGlzLmhhbmRsZUNyZWF0ZUludm9pY2UgPSB0aGlzLmhhbmRsZUNyZWF0ZUludm9pY2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVGb3JtQ2hhbmdlICAgID0gdGhpcy5oYW5kbGVGb3JtQ2hhbmdlICAgLmJpbmQoIHRoaXMgKVxuICAgIHRoaXMuaGFuZGxlRGF5Q2hhbmdlICAgICA9IHRoaXMuaGFuZGxlRGF5Q2hhbmdlICAgIC5iaW5kKCB0aGlzIClcbiAgICB0aGlzLmhhbmRsZVByb2R1Y3RSZW1vdmUgPSB0aGlzLmhhbmRsZVByb2R1Y3RSZW1vdmUuYmluZCggdGhpcyApXG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKCBuZXh0UHJvcHMsIHByZXZTdGF0ZSApIHtcbiAgICBjb25zdCAgIG5leHQgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5leHRQcm9wcy5jdXJyZW50XG4gICAgY29uc3QgICBjdXJyZW50ICAgICAgICAgICAgICAgICAgICAgICAgPSBwcmV2U3RhdGUuZm9ybURhdGFcbiAgICBjb25zdCB7IGhpc3RvcnksIHN0YXRpY0NvbnRleHQsIGN1c3RvbWVycywgaXNTYXZpbmcgfSA9IG5leHRQcm9wc1xuICAgIGlmICggaXNTYXZpbmcgKSByZXR1cm4gbnVsbFxuICAgIGlmICggY3VycmVudCA9PT0gbmV4dCApIHJldHVybiBudWxsXG5cbiAgICAvLyByZWRpcmVjdHNcbiAgICByZWRpcmVjdGlvbi5xdW90YXRpb24oe1xuICAgICAgbmV4dCxcbiAgICAgIGN1cnJlbnQsXG4gICAgICBoaXN0b3J5LFxuICAgICAgc3RhdGljQ29udGV4dCxcbiAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZvcm1EYXRhOiBRdW90YXRpb25Gb3JtLnJlY29tcHV0ZUZvcm1EYXRhKCBuZXh0ICksXG4gICAgICBjdXN0b21lcjogUXVvdGF0aW9uRm9ybS5nZXRDdXN0b21lckRhdGEoIG5leHQsIGN1c3RvbWVycyApLFxuICAgIH1cbiAgfVxuXG4gIC8vLS0tLS0gVVRJTFNcblxuICBzdGF0aWMgcmVjb21wdXRlU3RlcHMgICAgPSByZWNvbXB1dGVTdGVwc1xuXG4gIHN0YXRpYyByZWNvbXB1dGVQcm9kdWN0cyA9IGZsb3coXG4gICAgcmVtb3ZlRGVmYXVsdFByb2R1Y3RzLFxuICAgIHJlY29tcHV0ZVRvdGFscyxcbiAgICBhZGRFbXB0eUxpbmUsXG4gICAgZW5zdXJlUHJvZHVjdElkLFxuICApXG5cbiAgc3RhdGljIHJlY29tcHV0ZUZvcm1EYXRhID0gZmxvdyhcbiAgICBRdW90YXRpb25Gb3JtLnJlY29tcHV0ZVN0ZXBzLFxuICAgIFF1b3RhdGlvbkZvcm0ucmVjb21wdXRlUHJvZHVjdHMsXG4gIClcblxuICBzdGF0aWMgZ2V0Q3VzdG9tZXJEYXRhKCBmb3JtRGF0YSwgY3VzdG9tZXJzICkge1xuICAgIGlmICggIUFycmF5LmlzQXJyYXkoY3VzdG9tZXJzKSApIHJldHVybiB7fVxuICAgIGNvbnN0IHsgY3VzdG9tZXJJZCB9ID0gZm9ybURhdGFcbiAgICAvLyBpZiBubyBjdXN0b21lciBpcyBzZWxlY3RlZCwganVzdCB0YWtlIHRoZSBmaXJzdCBvbmUgaW4gdGhlIGxpc3RcbiAgICBpZiAoICFjdXN0b21lcklkICkgcmV0dXJuIGN1c3RvbWVyc1sgMCBdXG4gICAgY29uc3QgY3VzdG9tZXIgICAgICAgPSBjdXN0b21lcnMuZmluZCggYyA9PiBjLmlkID09PSBjdXN0b21lcklkIClcbiAgICByZXR1cm4gY3VzdG9tZXIgfHwge31cbiAgfVxuXG4gIC8vLS0tLS0gRVZFTlRTXG5cbiAgaGFuZGxlU3VibWl0KCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgYm9keSA9IHNlcmlhbGl6ZSggZXZlbnQudGFyZ2V0LCB7IGhhc2g6IHRydWUsIGVtcHR5OiB0cnVlIH0gKVxuICAgIHRoaXMucHJvcHMuc2F2ZU9uZSh7IGJvZHkgfSlcbiAgfVxuICBoYW5kbGVDcmVhdGVJbnZvaWNlKCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5wcm9wcy5jcmVhdGVJbnZvaWNlKHtcbiAgICAgIGlkOiB0aGlzLnByb3BzLmN1cnJlbnQuZ2V0KGBpZGApLFxuICAgIH0pXG4gIH1cbiAgaGFuZGxlRm9ybUNoYW5nZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50XG4gICAgY29uc3QgeyBuYW1lLCBjaGVja2VkLCB0eXBlIH0gPSB0YXJnZXRcbiAgICBjb25zdCB2YWx1ZSA9IHR5cGUgPT09IGBjaGVja2JveGAgPyBjaGVja2VkIDogdGFyZ2V0LnZhbHVlXG5cbiAgICB0aGlzLnNldFN0YXRlKCAocHJldlN0YXRlLCBwcm9wcykgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBwcmV2U3RhdGUuZm9ybURhdGEuZ2V0KCBuYW1lKVxuICAgICAgY29uc3QgdXBkYXRlZCA9IHByZXZTdGF0ZS5mb3JtRGF0YS5zZXQoIG5hbWUsIHZhbHVlIClcblxuICAgICAgLy8gdXBkYXRlIGN1c3RvbWVyIHN0YXRlIGlmIHdlIGNob29zZSBhIG5ldyBvbmVcbiAgICAgIGlmICggbmFtZSA9PT0gYGN1c3RvbWVySWRgICkgcmV0dXJuIHtcbiAgICAgICAgZm9ybURhdGE6IHVwZGF0ZWQsXG4gICAgICAgIGN1c3RvbWVyOiBRdW90YXRpb25Gb3JtLmdldEN1c3RvbWVyRGF0YSggdXBkYXRlZCwgcHJvcHMuY3VzdG9tZXJzIClcbiAgICAgIH1cbiAgICAgIC8vIFJlY29tcHV0ZSBwcm9kdWN0cyBvbmx5IGlmIG5lZWRlZFxuICAgICAgY29uc3QgaXNQcm9kdWN0Q2hhbmdlID0gL15wcm9kdWN0c1xcW1xcZCtcXF0vLnRlc3QoIG5hbWUgKVxuICAgICAgY29uc3QgaXNUYXhDaGFuZ2UgICAgID0gbmFtZSA9PT0gYHRheGBcbiAgICAgIGlmICggIWlzUHJvZHVjdENoYW5nZSAmJiAhaXNUYXhDaGFuZ2UgKSByZXR1cm4geyBmb3JtRGF0YTogdXBkYXRlZCB9XG4gICAgICByZXR1cm4geyBmb3JtRGF0YTogUXVvdGF0aW9uRm9ybS5yZWNvbXB1dGVQcm9kdWN0cyggdXBkYXRlZCApIH1cbiAgICB9KVxuICB9XG4gIGhhbmRsZURheUNoYW5nZSggdGFyZ2V0ICkge1xuICAgIGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IHRhcmdldFxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICBjb25zdCB1cGRhdGVkICAgPSBwcmV2U3RhdGUuZm9ybURhdGEuc2V0KCBuYW1lLCB2YWx1ZSApXG4gICAgICBjb25zdCB3aXRoU3RlcHMgPSBRdW90YXRpb25Gb3JtLnJlY29tcHV0ZVN0ZXBzKCB1cGRhdGVkIClcbiAgICAgIHJldHVybiB7IGZvcm1EYXRhOiB3aXRoU3RlcHMgfVxuICAgIH0pXG4gIH1cbiAgaGFuZGxlUHJvZHVjdFJlbW92ZSggaW5kZXgsIHByZWZpeCApIHtcbiAgICBjb25zdCB7IGZvcm1EYXRhIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgbGluZSA9IGZvcm1EYXRhLmdldCggcHJlZml4IClcbiAgICBpZiAoICFsaW5lICkgcmV0dXJuXG5cbiAgICB0aGlzLnNldFN0YXRlKCBwcmV2U3RhdGUgPT4ge1xuICAgICAgY29uc3QgcHJvZHVjdHMgPSBwcmV2U3RhdGUuZm9ybURhdGEuZ2V0KCBgcHJvZHVjdHNgIClcbiAgICAgIGNvbnN0IHVwZGF0ZWRQcm9kdWN0cyA9IHByb2R1Y3RzLnNwbGljZSggaW5kZXgsIDEgKVxuICAgICAgY29uc3QgdXBkYXRlZCA9IHByZXZTdGF0ZS5mb3JtRGF0YS5zZXQoIGBwcm9kdWN0c2AsIHVwZGF0ZWRQcm9kdWN0cyApXG4gICAgICByZXR1cm4geyBmb3JtRGF0YTogUXVvdGF0aW9uRm9ybS5yZWNvbXB1dGVQcm9kdWN0cyggdXBkYXRlZCApIH1cbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLSBSRU5ERVJcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcyAgICAgLCBzdGF0ZSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgZm9ybURhdGEgICAgICAgICAgfSA9IHN0YXRlXG4gICAgY29uc3QgeyBpc1NhdmluZyAgICAgICAgICB9ID0gcHJvcHNcbiAgICBjb25zdCB7IGlzTG9hZGluZyAgICAgICAgIH0gPSBmb3JtRGF0YVxuICAgIGlmICggaXNMb2FkaW5nICkgcmV0dXJuIDxTcGlubmVyIC8+XG5cbiAgICBjb25zdCByZW5kZXJQcm9wcyA9IHtcbiAgICAgIHVzZXI6ICAgICAgICAgICAgIHByb3BzLnVzZXIsXG4gICAgICBjdXN0b21lcnM6ICAgICAgICBwcm9wcy5jdXN0b21lcnMsXG4gICAgICBmb3JtRGF0YTogICAgICAgICBmb3JtRGF0YSxcbiAgICAgIGlzU2F2aW5nOiAgICAgICAgIGlzU2F2aW5nLFxuICAgICAgY3VzdG9tZXI6ICAgICAgICAgc3RhdGUuY3VzdG9tZXIsXG4gICAgICBpc05ldzogICAgICAgICAgICBwcm9wcy5pc05ldyxcbiAgICAgIGhhbmRsZToge1xuICAgICAgICBzdWJtaXQ6ICAgICAgICAgdGhpcy5oYW5kbGVTdWJtaXQsXG4gICAgICAgIGNyZWF0ZUludm9pY2U6ICB0aGlzLmhhbmRsZUNyZWF0ZUludm9pY2UsXG4gICAgICAgIGZvcm1DaGFuZ2U6ICAgICB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UsXG4gICAgICAgIGRheUNoYW5nZTogICAgICB0aGlzLmhhbmRsZURheUNoYW5nZSxcbiAgICAgICAgcHJvZHVjdFJlbW92ZTogIHRoaXMuaGFuZGxlUHJvZHVjdFJlbW92ZSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gPFF1b3RhdGlvbkZvcm1QcmVzIHsuLi5yZW5kZXJQcm9wc30gLz5cbiAgfVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgY29uc3QgeyBjdXJyZW50IH0gPSBzdGF0ZS5xdW90YXRpb25zXG4gIGNvbnN0IGlzTmV3ID0gY3VycmVudC5pZCA9PSBudWxsXG4gIHJldHVybiB7XG4gICAgaXNOZXcsXG4gICAgaXNTYXZpbmc6ICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYGlzU2F2aW5nYCksXG4gICAgY3VycmVudDogICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYGN1cnJlbnRgKSxcbiAgICBjdXN0b21lcnM6ICBzdGF0ZS5jdXN0b21lcnMuZ2V0KGBhY3RpdmVgKSxcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaDJwcm9wKCBkaXNwYXRjaCApIHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgZ2V0T25lICAgICAgICAgOiBxdW90YXRpb25zLmdldE9uZSxcbiAgICBzYXZlT25lICAgICAgICA6IHF1b3RhdGlvbnMuc2F2ZU9uZSxcbiAgICBjcmVhdGVJbnZvaWNlICA6IHF1b3RhdGlvbnMuY3JlYXRlSW52b2ljZSxcbiAgICBnZXRBbGxDdXN0b21lcnM6IGN1c3RvbWVycy5nZXRBbGwsXG4gIH0sIGRpc3BhdGNoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBzdGF0ZTJwcm9wLCBkaXNwYXRjaDJwcm9wICkoIFF1b3RhdGlvbkZvcm0gKVxuXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0IHsgTWFpbiwgTWV0YSwgQ29udGVudCwgQ29udGVudEFjdGlvbnMgfSBmcm9tICcuLi9sYXlvdXQvbWFpbidcbmltcG9ydCB7IFBhcGVyU2hlZXQsIEJldHdlZW4sIFBhcnR5VXNlciwgUGFydHksIFJlZmVyZW5jZSwgTWVudGlvbnMgfSBmcm9tICcuLi9sYXlvdXQvcGFwZXItc2hlZXQnXG5pbXBvcnQgeyBGb3JtICAsIEZvcm1BY3Rpb25zIH0gZnJvbSAnLi4vdWkvZm9ybSdcbmltcG9ydCB7IEJ1dHRvbiwgQnRuSWNvbiAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0IHsgSW5wdXQsIFRleHRhcmVhLCBTZWxlY3QgfSBmcm9tICcuLi91aS9maWVsZCdcbmltcG9ydCB7IFN0ZXBwZXIgfSBmcm9tICcuLi91aS9zdGVwcGVyJ1xuaW1wb3J0IEljb24gZnJvbSAnLi4vdWkvc3ZnLWljb25zJ1xuaW1wb3J0IHsgUHJvZHVjdFRhYmxlIH0gZnJvbSAnLi4vdWktdGFibGUvcHJvZHVjdHMnXG5pbXBvcnQgeyBDcmVhdGVJbnZvaWNlLCBTaG93SW52b2ljZSwgQXJjaGl2ZVF1b3RhdGlvbiB9IGZyb20gJy4vYnV0dG9ucydcblxuaW1wb3J0ICcuL2Zvcm0ucHJlcy5zY3NzJ1xuZXhwb3J0IGNvbnN0IEJBU0VfQ0xBU1MgPSBgcXVvdGF0aW9uLWZvcm1gXG5leHBvcnQgY29uc3QgRk9STV9JRCAgICA9IEJBU0VfQ0xBU1NcblxuZXhwb3J0IGZ1bmN0aW9uIFF1b3RhdGlvbkZvcm1QcmVzKCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIGlzU2F2aW5nLFxuICAgIGN1c3RvbWVycyxcbiAgICBmb3JtRGF0YSxcbiAgICBjdXN0b21lcixcbiAgICBpc05ldyxcbiAgICBoYW5kbGUsXG4gIH0gPSBwcm9wc1xuICBjb25zdCB7IHByb2R1Y3RzIH0gICAgPSBmb3JtRGF0YVxuICBjb25zdCBoYXNQcm9kdWN0cyAgICAgPSBBcnJheS5pc0FycmF5KCBwcm9kdWN0cyApXG4gIGNvbnN0IHByb2R1Y3RzTGVuZ3RoICA9IGhhc1Byb2R1Y3RzID8gcHJvZHVjdHMubGVuZ3RoIDogMFxuICBjb25zdCBzdWJtaXRJMThuSWQgPSAgYHF1b3RhdGlvbi5idXR0b24uJHtpc05ldyA/ICdjcmVhdGUnIDogJ3VwZGF0ZSd9YFxuXG4gIHJldHVybiAoXG4gICAgPEZvcm1cbiAgICAgIGlkPXsgRk9STV9JRCB9XG4gICAgICBpc1NhdmluZz17IGlzU2F2aW5nIH1cbiAgICAgIG9uQ2hhbmdlPXsgaGFuZGxlLmZvcm1DaGFuZ2UgfVxuICAgICAgb25TdWJtaXQ9eyBoYW5kbGUuc3VibWl0IH1cbiAgICA+XG4gICAgICA8TWFpbj5cbiAgICAgICAgPE1ldGE+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBgJHtCQVNFX0NMQVNTfV9fbWV0YWAgfT5cbiAgICAgICAgICAgIHsgIWlzTmV3ICYmIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgZGVmYXVsdFZhbHVlPXsgZm9ybURhdGEuaWQgfSBuYW1lPVwiaWRcIiAvPiB9XG4gICAgICAgICAgICA8U3RlcHBlclxuICAgICAgICAgICAgICBzdGVwcz17IGZvcm1EYXRhLnN0ZXBzIH1cbiAgICAgICAgICAgICAgaGFuZGxlRGF5Q2hhbmdlPXsgaGFuZGxlLmRheUNoYW5nZSB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLmN1c3RvbWVyXCJcbiAgICAgICAgICAgICAgbmFtZT1cImN1c3RvbWVySWRcIlxuICAgICAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLmdldChgY3VzdG9tZXJJZGApIH1cbiAgICAgICAgICAgICAgb3B0aW9ucz17IGN1c3RvbWVycyB9XG4gICAgICAgICAgICAgIG9wdGlvbnNLZXlzPXt7IHZhbHVlOiBgaWRgLCBsYWJlbDogYG5hbWVgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cInRheFwiXG4gICAgICAgICAgICAgIGxhYmVsPVwiZmllbGQudGF4XCJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICBzdGVwPVwiMC41XCJcbiAgICAgICAgICAgICAgdmFsdWU9eyBmb3JtRGF0YS5nZXQoYHRheGApIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTWV0YT5cbiAgICAgICAgPENvbnRlbnQ+XG4gICAgICAgICAgPFBhcGVyU2hlZXQ+XG4gICAgICAgICAgICA8UmVmZXJlbmNlIHR5cGU9XCJxdW90YXRpb25cIiBwcm9kdWN0PXsgZm9ybURhdGEgfSAvPlxuICAgICAgICAgICAgPEJldHdlZW4+XG4gICAgICAgICAgICAgIDxQYXJ0eVVzZXIgLz5cbiAgICAgICAgICAgICAgPFBhcnR5IHRpdGxlPVwidG9cIiBwZW9wbGU9eyBjdXN0b21lciB9IC8+XG4gICAgICAgICAgICA8L0JldHdlZW4+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgbmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgICBsYWJlbD1cImZpZWxkLnN1YmplY3RcIlxuICAgICAgICAgICAgICB2YWx1ZT17IGZvcm1EYXRhLm5hbWUgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxQcm9kdWN0VGFibGVcbiAgICAgICAgICAgICAgZG9jdW1lbnQ9eyBmb3JtRGF0YSB9XG4gICAgICAgICAgICAgIGhhbmRsZVJlbW92ZT17IGhhbmRsZS5wcm9kdWN0UmVtb3ZlIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8TWVudGlvbnMgY29udGVudD17IGZvcm1EYXRhLnF1b3RhdGlvbkNvbmZpZy5tZW50aW9ucyB9Lz5cbiAgICAgICAgICA8L1BhcGVyU2hlZXQ+XG4gICAgICAgICAgPEZvcm1BY3Rpb25zPlxuICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsgc3VibWl0STE4bklkIH0gLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPENyZWF0ZUludm9pY2UgcXVvdGF0aW9uPXsgZm9ybURhdGEgfSAvPlxuICAgICAgICAgICAgPFNob3dJbnZvaWNlIHF1b3RhdGlvbj17IGZvcm1EYXRhIH0gd2l0aE1lc3NhZ2UgLz5cbiAgICAgICAgICAgIDxBcmNoaXZlUXVvdGF0aW9uIGRhbmdlciBxdW90YXRpb249eyBmb3JtRGF0YSB9IC8+XG4gICAgICAgICAgPC9Gb3JtQWN0aW9ucz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvRm9ybT5cbiAgKVxufVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSAgIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCB7IFRhYmxlLCBSb3csIENlbGwgfSBmcm9tICcuLi91aS10YWJsZSdcbmltcG9ydCB7IEFtb3VudCwgRGF5ICAgICAgICAgICAgfSBmcm9tICcuLi91aS9mb3JtYXQnXG5pbXBvcnQgeyBCdXR0b24gICAgICAgICAgICAgICAgICB9IGZyb20gJy4uL3VpL2J1dHRvbnMnXG5pbXBvcnQgeyBDcmVhdGVJbnZvaWNlLCBTaG93SW52b2ljZSwgQXJjaGl2ZVF1b3RhdGlvbiB9IGZyb20gJy4vYnV0dG9ucydcblxuZnVuY3Rpb24gUXVvdGF0aW9uUm93KCBwcm9wcyApIHtcbiAgY29uc3QgeyBxdW90YXRpb24gfSA9IHByb3BzXG4gIGNvbnN0IGlkICAgICAgICAgICAgPSBxdW90YXRpb24uZ2V0KCBgaWRgIClcbiAgY29uc3QgaXNBcmNoaXZlZCAgICA9IHF1b3RhdGlvbi5nZXQoIGBhcmNoaXZlZEF0YCApXG4gIGNvbnN0IHF1b3RhdGlvblVybCAgPSBgJHsgaXNBcmNoaXZlZCAgPyBgL2FyY2hpdmVzYDogYGAgfS9xdW90YXRpb25zLyR7aWR9YFxuXG4gIHJldHVybiAoXG4gICAgPFJvdz5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8TGluayB0bz17IHF1b3RhdGlvblVybCB9PlxuICAgICAgICAgIHsgcXVvdGF0aW9uLmdldChgcmVmZXJlbmNlYCkgfVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPExpbmsgdG89eyBxdW90YXRpb25VcmwgfT5cbiAgICAgICAgICB7cXVvdGF0aW9uLmdldChgbmFtZWApfVxuICAgICAgICA8L0xpbms+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPExpbmsgdG89e2AvY3VzdG9tZXJzLyR7cXVvdGF0aW9uLmdldChgY3VzdG9tZXJJZGApfWB9PlxuICAgICAgICAgIHtxdW90YXRpb24uZ2V0KGBjdXN0b21lci5uYW1lYCl9XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8RGF5IHZhbHVlPXtxdW90YXRpb24uZ2V0KGBzZW5kQXRgKX0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8RGF5IHZhbHVlPXtxdW90YXRpb24uZ2V0KGB2YWxpZGF0ZWRBdGApfSAvPlxuICAgICAgPC9DZWxsPlxuICAgICAgPENlbGw+XG4gICAgICAgIDxEYXkgdmFsdWU9e3F1b3RhdGlvbi5nZXQoYHNpZ25lZEF0YCl9IC8+XG4gICAgICA8L0NlbGw+XG4gICAgICA8Q2VsbD5cbiAgICAgICAgPFNob3dJbnZvaWNlIGxpbmtBbGlrZSBxdW90YXRpb249eyBxdW90YXRpb24gfSAvPlxuICAgICAgICA8Q3JlYXRlSW52b2ljZSBsaW5rQWxpa2UgcXVvdGF0aW9uPXsgcXVvdGF0aW9uIH0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8QW1vdW50IHZhbHVlPXtxdW90YXRpb24uZ2V0KGB0b3RhbGApIH0gLz5cbiAgICAgIDwvQ2VsbD5cbiAgICAgIDxDZWxsPlxuICAgICAgICA8QXJjaGl2ZVF1b3RhdGlvbiBpY29uIGxpbmtBbGlrZSBxdW90YXRpb249eyBxdW90YXRpb24gfSAvPlxuICAgICAgPC9DZWxsPlxuICAgIDwvUm93PlxuICApXG59XG5cbmNvbnN0IHF1b3RhdGlvbkNvbHVtbnMgPSBbXG4gIHtpZDogYGlkYCAgICAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmlkYCAgICAgICAgLCBzb3J0OiBgaW5kZXhgICAgICAgICAgLCB0eXBlOiBgaWRgICAgICAgIH0sXG4gIHtpZDogYG5hbWVgICAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLm5hbWVgICAgICAgLCBzb3J0OiBgbmFtZWAgICAgICAgICAgLCB0eXBlOiBgdGV4dGAgICAgIH0sXG4gIHtpZDogYGN1c3RvbWVyYCAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmN1c3RvbWVyYCAgLCBzb3J0OiBgY3VzdG9tZXIubmFtZWAgLCB0eXBlOiBgY3VzdG9tZXJgIH0sXG4gIHtpZDogYHNlbnRgICAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLnNlbnRgICAgICAgLCBzb3J0OiBgc2VuZEF0YCAgICAgICAgLCB0eXBlOiBgZGF0ZWAgICAgIH0sXG4gIHtpZDogYHZhbGlkYXRlZGAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLnZhbGlkYXRlZGAgLCBzb3J0OiBgdmFsaWRhdGVkQWRgICAgLCB0eXBlOiBgZGF0ZWAgICAgIH0sXG4gIHtpZDogYHNpZ25lZGAgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLnNpZ25lZGAgICAgLCBzb3J0OiBgc2lnbmVkQXRgICAgICAgLCB0eXBlOiBgZGF0ZWAgICAgIH0sXG4gIHtpZDogYGludm9pY2VgICAsIGxhYmVsOiBgdGFibGUuaGVhZGVyLmludm9pY2VgICAgLCBzb3J0OiBgaW52b2ljZS5pbmRleGAgLCB0eXBlOiBgaWRgICAgICAgIH0sXG4gIHtpZDogYGFtb3VudGAgICAsIGxhYmVsOiBgdGFibGUuYW1vdW50YCAgICAgICAgICAgLCBzb3J0OiBgdG90YWxgICAgICAgICAgLCB0eXBlOiBgYW1vdW50YCAgIH0sXG4gIHtpZDogYGFyY2hpdmVgICAsIGxhYmVsOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgLCBzb3J0OiBmYWxzZSAgICAgICAgICAgLCB0eXBlOiBgYWN0aW9uYCAgIH0sXG5dXG5cbmZ1bmN0aW9uIFF1b3RhdGlvbnNMaXN0KCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIHF1b3RhdGlvbnMgPSBbXSxcbiAgICAuLi5yZXN0XG4gIH0gPSBwcm9wc1xuICByZXR1cm4gKFxuICAgIDxUYWJsZVxuICAgICAgcHJlc2VudGF0aW9uXG4gICAgICBjb2x1bW5zPXsgcXVvdGF0aW9uQ29sdW1ucyB9XG4gICAgICB7IC4uLnJlc3QgfVxuICAgID5cbiAgICB7IHF1b3RhdGlvbnMubWFwKCBxdW90YXRpb24gPT4gKFxuICAgICAgICA8UXVvdGF0aW9uUm93XG4gICAgICAgICAga2V5PXsgcXVvdGF0aW9uLmlkIH1cbiAgICAgICAgICBxdW90YXRpb249eyBxdW90YXRpb24gfVxuICAgICAgICAvPlxuICAgICkpfVxuICAgIDwvVGFibGU+XG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IEFjdGl2ZVF1b3RhdGlvbnMgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIHF1b3RhdGlvbnMgIDogc3RhdGUucXVvdGF0aW9ucy5nZXQoYGFjdGl2ZWApLFxuICAgIG1ldGEgICAgICAgIDogc3RhdGUucXVvdGF0aW9ucy5nZXQoYG1ldGEuYWN0aXZlYCksXG4gICAgaGlkZUNvbHVtbnMgOiBbYHNpZ25lZGAsIGBpbnZvaWNlYF0sXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IHF1b3RhdGlvbnMubGlzdEFjdGl2ZVxuICB9LCBkaXNwYXRjaCApKVxuKSggUXVvdGF0aW9uc0xpc3QgKVxuXG5leHBvcnQgY29uc3QgQXJjaGl2ZWRRdW90YXRpb25zID0gY29ubmVjdChcbiAgc3RhdGUgPT4gKHtcbiAgICBxdW90YXRpb25zICA6IHN0YXRlLnF1b3RhdGlvbnMuZ2V0KGBhcmNoaXZlZGApICAgICAsXG4gICAgbWV0YSAgICAgICAgOiBzdGF0ZS5xdW90YXRpb25zLmdldChgbWV0YS5hcmNoaXZlZGApLFxuICAgIGhpZGVDb2x1bW5zIDogW2BhcmNoaXZlYF0sXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IHF1b3RhdGlvbnMubGlzdEFyY2hpdmVkXG4gIH0sIGRpc3BhdGNoICkpXG4pKCBRdW90YXRpb25zTGlzdCApXG5cbmV4cG9ydCBjb25zdCBRdW90YXRpb25zUmVhZHlUb0ludm9pY2UgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIHF1b3RhdGlvbnM6ICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYHJlYWR5VG9JbnZvaWNlYCksXG4gICAgbWV0YTogICAgICAgICBzdGF0ZS5xdW90YXRpb25zLmdldChgbWV0YS5yZWFkeVRvSW52b2ljZWApLFxuICAgIHRpdGxlOiAgICAgICAgYHF1b3RhdGlvbi5yZWFkeS10by1pbnZvaWNlYCxcbiAgICBoaWRlQ29sdW1ucyA6IFsgYHNlbnRgLCBgdmFsaWRhdGVkYCBdLFxuICAgIGhpZGVPbkVtcHR5OiAgdHJ1ZSxcbiAgfSksXG4gIGRpc3BhdGNoID0+ICggYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICBoYW5kbGVQYWdlU29ydDogcXVvdGF0aW9ucy5saXN0UmVhZHlUb0ludm9pY2VcbiAgfSwgZGlzcGF0Y2ggKSlcbikoICBRdW90YXRpb25zTGlzdCApXG5cbmV4cG9ydCBjb25zdCBDdXN0b21lclF1b3RhdGlvbnMgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIHF1b3RhdGlvbnM6ICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYGFjdGl2ZWApLFxuICAgIG1ldGE6ICAgICAgICAgc3RhdGUucXVvdGF0aW9ucy5nZXQoYG1ldGEuYWN0aXZlYCksXG4gICAgaGlkZUNvbHVtbnMgOiBbYGN1c3RvbWVyYF0sXG4gIH0pLFxuICBkaXNwYXRjaCA9PiAoIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgaGFuZGxlUGFnZVNvcnQ6IHF1b3RhdGlvbnMubGlzdEZvckN1c3RvbWVyXG4gIH0sIGRpc3BhdGNoICkpXG4pKCBRdW90YXRpb25zTGlzdCApXG5cbmV4cG9ydCBkZWZhdWx0IFF1b3RhdGlvbnNMaXN0XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgICAgICAgICBmcm9tICcuLi9kdWNrcy9xdW90YXRpb25zJ1xuaW1wb3J0ICogYXMgY3VzdG9tZXJzICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2N1c3RvbWVycydcbmltcG9ydCAgICAgIE5hdlNlY29uZGFyeSAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHtcbiAgQnV0dG9uTmV3LFxuICBCdXR0b25MaXN0LFxuICBCdXR0b25QcmV2aWV3LFxuICBCdXR0b25TdWJtaXQsXG59IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCAgIFF1b3RhdGlvbkZvcm0gICAgICAgICAgICBmcm9tICcuL2Zvcm0nXG5pbXBvcnQgeyBGT1JNX0lEICAgICAgICAgICAgICAgIH0gZnJvbSAnLi9mb3JtLnByZXMnXG5pbXBvcnQgeyBDcmVhdGVJbnZvaWNlLCBTaG93SW52b2ljZSwgQXJjaGl2ZVF1b3RhdGlvbiB9IGZyb20gJy4vYnV0dG9ucydcblxuY29uc3QgVFlQRSA9IGBxdW90YXRpb25zYFxuXG5mdW5jdGlvbiBFZGl0UXVvdGF0aW9uKCBwcm9wcyApIHtcbiAgY29uc3QgeyBxdW90YXRpb24sIC4uLnJlc3QgfSA9IHByb3BzXG4gIGNvbnN0IHsgaWQgfSAgICAgID0gcHJvcHMubWF0Y2gucGFyYW1zXG4gIGNvbnN0IHJlZmVyZW5jZSAgID0gcXVvdGF0aW9uLmdldChgcmVmZXJlbmNlYClcbiAgY29uc3QgdGl0bGVQcm9wcyAgPSB7IGlkOmBwYWdlLnF1b3RhdGlvbnMuZWRpdGAsIHZhbHVlczoge3JlZmVyZW5jZX0gfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgICA8QnV0dG9uU3VibWl0XG4gICAgICAgICAgZm9ybUlkICAgPSB7IEZPUk1fSUQgfVxuICAgICAgICAgIGlzU2F2aW5nID0geyBwcm9wcy5pc1NhdmluZyB9XG4gICAgICAgICAgbGFiZWw9XCJfLnNhdmVcIlxuICAgICAgICAvPlxuICAgICAgICA8U2hvd0ludm9pY2VcbiAgICAgICAgICB3aXRoTWVzc2FnZVxuICAgICAgICAgIHF1b3RhdGlvbj17IHF1b3RhdGlvbiB9XG4gICAgICAgIC8+XG4gICAgICAgIDxBcmNoaXZlUXVvdGF0aW9uXG4gICAgICAgICAgaWNvbiBkYW5nZXJcbiAgICAgICAgICBxdW90YXRpb249eyBxdW90YXRpb24gfVxuICAgICAgICAgIGZvcm09eyBGT1JNX0lEIH1cbiAgICAgICAgICBsYWJlbD1cInF1b3RhdGlvbi5idXR0b24uYXJjaGl2ZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxDcmVhdGVJbnZvaWNlXG4gICAgICAgICAgcXVvdGF0aW9uPXsgcXVvdGF0aW9uIH1cbiAgICAgICAgICBmb3JtPXsgRk9STV9JRCB9XG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25QcmV2aWV3XG4gICAgICAgICAgdHlwZT17IFRZUEUgfVxuICAgICAgICAgIGlkPXsgaWQgfVxuICAgICAgICAgIGxhYmVsPVwicXVvdGF0aW9uLmJ1dHRvbi5wcmV2aWV3XCJcbiAgICAgICAgLz5cbiAgICAgICAgPEJ1dHRvbkxpc3RcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgbGFiZWw9XCJxdW90YXRpb24uYnV0dG9uLmxpc3RcIlxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uTmV3XG4gICAgICAgICAgdHlwZT17IFRZUEUgfVxuICAgICAgICAgIHNlY29uZGFyeVxuICAgICAgICAgIGljb25cbiAgICAgICAgICBsYWJlbD1cInF1b3RhdGlvbi5idXR0b24ubmV3XCJcbiAgICAgICAgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuICAgICAgPFF1b3RhdGlvbkZvcm0gey4uLnJlc3R9IC8+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHtcbiAgICBxdW90YXRpb246IHN0YXRlLnF1b3RhdGlvbnMuZ2V0KCBgY3VycmVudGAgKSxcbiAgICBpc1NhdmluZyA6IHN0YXRlLnF1b3RhdGlvbnMuZ2V0KCBgaXNTYXZpbmdgICksXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcCApKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IEVkaXRRdW90YXRpb24sXG4gIGFjdGlvbkNyZWF0b3JzOiBbXG4gICAgcXVvdGF0aW9ucy5nZXRPbmUsXG4gICAgY3VzdG9tZXJzLmdldEFsbCxcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IExpbmsgICAgICAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlICAgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0IHsgSGVsbWV0ICAgICAgICAgICAgIH0gZnJvbSAncmVhY3QtaGVsbWV0J1xuXG5pbXBvcnQgQ29ubmVjdERhdGFGZXRjaGVyIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICBmcm9tICcuLi9kdWNrcy9xdW90YXRpb25zJ1xuaW1wb3J0IHsgTWFpbiwgQ29udGVudCAgfSBmcm9tICcuLi9sYXlvdXQvbWFpbidcbmltcG9ydCB7IE5hdlNlY29uZGFyeSAgIH0gZnJvbSAnLi4vbmF2L3NlY29uZGFyeSdcbmltcG9ydCB7IEJ1dHRvbk5ldyAgICAgIH0gZnJvbSAnLi4vbmF2L3NlY29uZGFyeS1idXR0b25zJ1xuaW1wb3J0IHtcbiAgQWN0aXZlUXVvdGF0aW9ucyxcbiAgUXVvdGF0aW9uc1JlYWR5VG9JbnZvaWNlLFxufSBmcm9tICcuL2xpc3QnXG5cbmNvbnN0IFRZUEUgPSBgcXVvdGF0aW9uc2BcblxuZnVuY3Rpb24gUXVvdGF0aW9ucyggcHJvcHMgKSB7XG4gIGNvbnN0IHRpdGxlUHJvcHMgPSB7IGlkOiBgcGFnZS5xdW90YXRpb25zYCB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gPEhlbG1ldD48dGl0bGU+e3RpdGxlfTwvdGl0bGU+PC9IZWxtZXQ+fVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25OZXdcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgbWVzc2FnZT1cInF1b3RhdGlvbi5idXR0b24ubmV3XCJcbiAgICAgICAgLz5cbiAgICAgIDwvTmF2U2Vjb25kYXJ5PlxuICAgICAgPE1haW4+XG4gICAgICAgIDxDb250ZW50PlxuICAgICAgICAgIDxBY3RpdmVRdW90YXRpb25zIC8+XG4gICAgICAgICAgPFF1b3RhdGlvbnNSZWFkeVRvSW52b2ljZSAvPlxuICAgICAgICA8L0NvbnRlbnQ+XG4gICAgICA8L01haW4+XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKVxufVxuXG5mdW5jdGlvbiBzdGF0ZTJwcm9wKCBzdGF0ZSApIHtcbiAgcmV0dXJuIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlMnByb3AgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBRdW90YXRpb25zLFxuICBhY3Rpb25DcmVhdG9yczogW1xuICAgIHF1b3RhdGlvbnMubGlzdEFjdGl2ZSxcbiAgICBxdW90YXRpb25zLmxpc3RSZWFkeVRvSW52b2ljZSxcbiAgXSxcbn0pIClcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBjb25uZWN0ICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBIZWxtZXQgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciBmcm9tICcuLi9jb25uZWN0LWRhdGEtZmV0Y2hlcidcbmltcG9ydCAqIGFzIHF1b3RhdGlvbnMgICAgICAgICBmcm9tICcuLi9kdWNrcy9xdW90YXRpb25zJ1xuaW1wb3J0ICogYXMgY3VzdG9tZXJzICAgICAgICAgIGZyb20gJy4uL2R1Y2tzL2N1c3RvbWVycydcbmltcG9ydCAgICAgIE5hdlNlY29uZGFyeSAgICAgICBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5J1xuaW1wb3J0IHtcbiAgQnV0dG9uTGlzdCxcbiAgQnV0dG9uU3VibWl0LFxufSBmcm9tICcuLi9uYXYvc2Vjb25kYXJ5LWJ1dHRvbnMnXG5pbXBvcnQgICBRdW90YXRpb25Gb3JtICAgZnJvbSAnLi9mb3JtJ1xuaW1wb3J0IHsgRk9STV9JRCAgICAgICB9IGZyb20gJy4vZm9ybS5wcmVzJ1xuXG5jb25zdCBUWVBFID0gYHF1b3RhdGlvbnNgXG5cbmZ1bmN0aW9uIE5ld1F1b3RhdGlvbiggcHJvcHMgKSB7XG4gIGNvbnN0IHRpdGxlUHJvcHMgPSB7IGlkOiBgcGFnZS5xdW90YXRpb25zLm5ld2AgfVxuXG4gIHJldHVybiAoXG4gICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnRpdGxlUHJvcHN9ID5cbiAgICAgICAge3RpdGxlID0+IDxIZWxtZXQ+PHRpdGxlPnt0aXRsZX08L3RpdGxlPjwvSGVsbWV0Pn1cbiAgICAgIDwvRm9ybWF0dGVkTWVzc2FnZT5cbiAgICAgIDxOYXZTZWNvbmRhcnlcbiAgICAgICAgdGl0bGU9eyA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gLz4gfVxuICAgICAgPlxuICAgICAgICA8QnV0dG9uU3VibWl0XG4gICAgICAgICAgZm9ybUlkPXtGT1JNX0lEfVxuICAgICAgICAgIGlzU2F2aW5nPXsgcHJvcHMuaXNTYXZpbmcgfVxuICAgICAgICAgIGxhYmVsPVwicXVvdGF0aW9uLmJ1dHRvbi5jcmVhdGVcIlxuICAgICAgICAvPlxuICAgICAgICA8QnV0dG9uTGlzdFxuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBsYWJlbD1cInF1b3RhdGlvbi5idXR0b24ubGlzdFwiXG4gICAgICAgIC8+XG4gICAgICA8L05hdlNlY29uZGFyeT5cbiAgICAgIDxRdW90YXRpb25Gb3JtIHsuLi5wcm9wc30gLz5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG5cbmZ1bmN0aW9uIHN0YXRlMnByb3AoIHN0YXRlICkge1xuICBjb25zdCB7IGlzU2F2aW5nIH0gPSBzdGF0ZS5xdW90YXRpb25zXG4gIHJldHVybiB7IGlzU2F2aW5nIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggc3RhdGUycHJvcCApKCBDb25uZWN0RGF0YUZldGNoZXIoe1xuICBDb21wb25lbnQ6IE5ld1F1b3RhdGlvbixcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBjdXN0b21lcnMuZ2V0QWxsLFxuICAgIHF1b3RhdGlvbnMuZ2V0T25lLFxuICBdLFxufSkgKVxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgaW5qZWN0SW50bCAgICAgICB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IEhlbG1ldCAgICAgICAgICAgfSBmcm9tICdyZWFjdC1oZWxtZXQnXG5cbmltcG9ydCAgICAgIENvbm5lY3REYXRhRmV0Y2hlciAgICAgICAgICAgIGZyb20gJy4uL2Nvbm5lY3QtZGF0YS1mZXRjaGVyJ1xuaW1wb3J0ICogYXMgcXVvdGF0aW9ucyAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vZHVja3MvcXVvdGF0aW9ucydcbmltcG9ydCB7ICAgIE1haW4gICAgICAgICAgICAgICwgQ29udGVudCB9IGZyb20gJy4uL2xheW91dC9tYWluJ1xuaW1wb3J0ICAgICAgTmF2U2Vjb25kYXJ5ICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vbmF2L3NlY29uZGFyeSdcbmltcG9ydCB7XG4gIEJ1dHRvbk5ldyxcbiAgQnV0dG9uTGlzdCxcbiAgQnV0dG9uRWRpdCxcbiAgQnV0dG9uUHJpbnQsXG59IGZyb20gJy4uL25hdi9zZWNvbmRhcnktYnV0dG9ucydcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi4vdWkvYWxlcnRzJ1xuaW1wb3J0IHsgUHJldmlldywgUHJpbnRpbmdOb3RpY2UgfSBmcm9tICcuLi91aS9wcmV2aWV3J1xuXG5jb25zdCBUWVBFID0gYHF1b3RhdGlvbnNgXG5cbmZ1bmN0aW9uIFByZXZpZXdRdW90YXRpb25QYWdlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBpZCB9ID0gcHJvcHMubWF0Y2gucGFyYW1zXG4gIGNvbnN0IHsgcXVvdGF0aW9uIH0gPSBwcm9wc1xuICBjb25zdCByZWZlcmVuY2UgICAgID0gcXVvdGF0aW9uLmdldChgcmVmZXJlbmNlYClcbiAgY29uc3QgdGl0bGVQcm9wcyAgICA9IHsgaWQ6YHBhZ2UucXVvdGF0aW9ucy5wcmV2aWV3YCwgdmFsdWVzOiB7cmVmZXJlbmNlfSB9XG5cbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSB7Li4udGl0bGVQcm9wc30gPlxuICAgICAgICB7dGl0bGUgPT4gKFxuICAgICAgICAgIDxIZWxtZXQ+XG4gICAgICAgICAgICA8dGl0bGU+e3RpdGxlfTwvdGl0bGU+XG4gICAgICAgICAgICA8aHRtbCBjbGFzc05hbWU9XCJkYXJrLWJhY2tncm91bmRcIiAvPlxuICAgICAgICAgIDwvSGVsbWV0PlxuICAgICAgICApfVxuICAgICAgPC9Gb3JtYXR0ZWRNZXNzYWdlPlxuICAgICAgPE5hdlNlY29uZGFyeVxuICAgICAgICB0aXRsZT17IDxGb3JtYXR0ZWRNZXNzYWdlIHsuLi50aXRsZVByb3BzfSAvPiB9XG4gICAgICA+XG4gICAgICAgIDxCdXR0b25FZGl0XG4gICAgICAgICAgdHlwZT17IFRZUEUgfVxuICAgICAgICAgIGRvY3VtZW50PXsgcXVvdGF0aW9uIH1cbiAgICAgICAgICBsYWJlbD1cIl8uZWRpdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25QcmludCAvPlxuICAgICAgICA8QnV0dG9uTGlzdFxuICAgICAgICAgIHR5cGU9eyBUWVBFIH1cbiAgICAgICAgICBsYWJlbD1cInF1b3RhdGlvbi5idXR0b24ubGlzdFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b25OZXdcbiAgICAgICAgICB0eXBlPXsgVFlQRSB9XG4gICAgICAgICAgc2Vjb25kYXJ5XG4gICAgICAgICAgaWNvblxuICAgICAgICAgIGxhYmVsPVwicXVvdGF0aW9uLmJ1dHRvbi5uZXdcIlxuICAgICAgICAvPlxuICAgICAgPC9OYXZTZWNvbmRhcnk+XG4gICAgICA8TWFpbj5cbiAgICAgICAgPENvbnRlbnQ+XG4gICAgICAgICAgPFByaW50aW5nTm90aWNlIC8+XG4gICAgICAgICAgPFByZXZpZXcgdHlwZT1cInF1b3RhdGlvblwiIGRvY3VtZW50PXsgcXVvdGF0aW9uIH0gLz5cbiAgICAgICAgPC9Db250ZW50PlxuICAgICAgPC9NYWluPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gIClcbn1cblxuZnVuY3Rpb24gc3RhdGUycHJvcCggc3RhdGUgKSB7XG4gIHJldHVybiB7XG4gICAgcXVvdGF0aW9uOiBzdGF0ZS5xdW90YXRpb25zLmdldChgY3VycmVudGApLFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoIHN0YXRlMnByb3AgKSggQ29ubmVjdERhdGFGZXRjaGVyKHtcbiAgQ29tcG9uZW50OiBQcmV2aWV3UXVvdGF0aW9uUGFnZSxcbiAgYWN0aW9uQ3JlYXRvcnM6IFtcbiAgICBxdW90YXRpb25zLmdldE9uZSxcbiAgXSxcbn0pIClcblxuIiwiaW1wb3J0IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQgZnJvbSAnLi9hdXRoZW50aWNhdGlvbi1yZXF1aXJlZCdcbmltcG9ydCBhdXRoZW50aWNhdGlvbkZvcmJpZGRlbiBmcm9tICcuL2F1dGhlbnRpY2F0aW9uLWZvcmJpZGRlbidcblxuaW1wb3J0IFJvb3QgZnJvbSAnLi9sYXlvdXQvcm9vdCdcblxuaW1wb3J0IExvZ2luICAgIGZyb20gJy4vYWNjb3VudC9wYWdlLWxvZ2luJ1xuaW1wb3J0IFJlZ2lzdGVyIGZyb20gJy4vYWNjb3VudC9wYWdlLXJlZ2lzdGVyJ1xuaW1wb3J0IEZvcmdvdCAgIGZyb20gJy4vYWNjb3VudC9wYWdlLWZvcmdvdCdcbmltcG9ydCBSZXNldCAgICBmcm9tICcuL2FjY291bnQvcGFnZS1yZXNldCdcbmltcG9ydCBTZXR0aW5ncyBmcm9tICcuL2FjY291bnQvcGFnZS1zZXR0aW5ncydcblxuaW1wb3J0IEhvbWUgZnJvbSAnLi9ob21lL3BhZ2UtaG9tZSdcblxuaW1wb3J0IEFyY2hpdmVMaXN0IGZyb20gJy4vYXJjaGl2ZS9wYWdlLWxpc3QnXG5pbXBvcnQgQXJjaGl2ZVF1b3RhdGlvbiBmcm9tICcuL2FyY2hpdmUvcGFnZS1xdW90YXRpb24nXG5pbXBvcnQgQXJjaGl2ZUludm9pY2UgZnJvbSAnLi9hcmNoaXZlL3BhZ2UtaW52b2ljZSdcblxuaW1wb3J0IFF1b3RhdGlvbnNMaXN0ICAgIGZyb20gJy4vcXVvdGF0aW9ucy9wYWdlLWxpc3QnXG5pbXBvcnQgUXVvdGF0aW9uc05ldyAgICAgZnJvbSAnLi9xdW90YXRpb25zL3BhZ2UtbmV3J1xuaW1wb3J0IFF1b3RhdGlvbnNFZGl0ICAgIGZyb20gJy4vcXVvdGF0aW9ucy9wYWdlLWVkaXQnXG5pbXBvcnQgUXVvdGF0aW9uc1ByZXZpZXcgZnJvbSAnLi9xdW90YXRpb25zL3BhZ2UtcHJldmlldydcblxuaW1wb3J0IEludm9pY2VzTGlzdCAgICBmcm9tICcuL2ludm9pY2VzL3BhZ2UtbGlzdCdcbmltcG9ydCBJbnZvaWNlc0VkaXQgICAgZnJvbSAnLi9pbnZvaWNlcy9wYWdlLWVkaXQnXG5pbXBvcnQgSW52b2ljZXNQcmV2aWV3IGZyb20gJy4vaW52b2ljZXMvcGFnZS1wcmV2aWV3J1xuXG5pbXBvcnQgQ3VzdG9tZXJzTGlzdCBmcm9tICcuL2N1c3RvbWVycy9wYWdlLWxpc3QnXG5pbXBvcnQgQ3VzdG9tZXJOZXcgICBmcm9tICcuL2N1c3RvbWVycy9wYWdlLW5ldydcbmltcG9ydCBDdXN0b21lckVkaXQgIGZyb20gJy4vY3VzdG9tZXJzL3BhZ2UtZWRpdCdcblxuaW1wb3J0IE5vdEZvdW5kIGZyb20gJy4vcGFnZS1ub3QtZm91bmQnXG5cbmNvbnN0IHJvdXRlcyA9IFt7XG4gIGNvbXBvbmVudDogUm9vdCxcbiAgcm91dGVzOiBbe1xuICAgIHBhdGg6IGAvYWNjb3VudC9sb2dpbmAsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvbkZvcmJpZGRlbiggTG9naW4gKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYWNjb3VudC9yZWdpc3RlcmAsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvbkZvcmJpZGRlbiggUmVnaXN0ZXIgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvYWNjb3VudC9mb3Jnb3RgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25Gb3JiaWRkZW4oIEZvcmdvdCApLFxuICB9LCB7XG4gICAgcGF0aDogYC9hY2NvdW50L3Jlc2V0YCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uRm9yYmlkZGVuKCBSZXNldCApLFxuICB9LCB7XG4gICAgcGF0aDogYC9gLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggSG9tZSApLFxuICB9LCB7XG4gICAgcGF0aDogYC9hcmNoaXZlc2AsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvblJlcXVpcmVkKCBBcmNoaXZlTGlzdCApLFxuICB9LCB7XG4gICAgcGF0aDogYC9hcmNoaXZlcy9xdW90YXRpb25zLzppZGAsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvblJlcXVpcmVkKCBBcmNoaXZlUXVvdGF0aW9uICksXG4gIH0sIHtcbiAgICBwYXRoOiBgL2FyY2hpdmVzL2ludm9pY2VzLzppZGAsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvblJlcXVpcmVkKCBBcmNoaXZlSW52b2ljZSApLFxuICB9LCB7XG4gICAgcGF0aDogYC9hY2NvdW50L3NldHRpbmdzYCxcbiAgICBleGFjdDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IGF1dGhlbnRpY2F0aW9uUmVxdWlyZWQoIFNldHRpbmdzICksXG4gIH0sIHtcbiAgICBwYXRoOiBgL3F1b3RhdGlvbnNgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggUXVvdGF0aW9uc0xpc3QgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvcXVvdGF0aW9ucy9uZXdgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggUXVvdGF0aW9uc05ldyApLFxuICB9LCB7XG4gIHBhdGg6IGAvcXVvdGF0aW9ucy86aWRgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggUXVvdGF0aW9uc0VkaXQgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvcXVvdGF0aW9ucy86aWQvcHJldmlld2AsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvblJlcXVpcmVkKCBRdW90YXRpb25zUHJldmlldyApLFxuICB9LCB7XG4gICAgcGF0aDogYC9pbnZvaWNlc2AsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvblJlcXVpcmVkKCBJbnZvaWNlc0xpc3QgKSxcbiAgfSwge1xuICBwYXRoOiBgL2ludm9pY2VzLzppZGAsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvblJlcXVpcmVkKCBJbnZvaWNlc0VkaXQgKSxcbiAgfSwge1xuICAgIHBhdGg6IGAvaW52b2ljZXMvOmlkL3ByZXZpZXdgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggSW52b2ljZXNQcmV2aWV3ICksXG4gIH0sIHtcbiAgICBwYXRoOiBgL2N1c3RvbWVyc2AsXG4gICAgZXhhY3Q6IHRydWUsXG4gICAgY29tcG9uZW50OiBhdXRoZW50aWNhdGlvblJlcXVpcmVkKCBDdXN0b21lcnNMaXN0ICksXG4gIH0sIHtcbiAgICBwYXRoOiBgL2N1c3RvbWVycy9uZXdgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggQ3VzdG9tZXJOZXcgKSxcbiAgfSwge1xuICBwYXRoOiBgL2N1c3RvbWVycy86aWRgLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogYXV0aGVudGljYXRpb25SZXF1aXJlZCggQ3VzdG9tZXJFZGl0ICksXG4gIH0sIHtcbiAgICBwYXRoOiBgKmAsXG4gICAgY29tcG9uZW50OiBOb3RGb3VuZCxcbiAgfV0sXG59XVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXNcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIGNsYXNzTmFtZXMgICAgICAgICBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5pbXBvcnQgeyB3aXRoUm91dGVyICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuaW1wb3J0IHsgSWNvbiB9IGZyb20gJy4uL3VpL3N2Zy1pY29ucydcblxuY29uc3QgQkFTRV9DTEFTUyA9IGB0YWJsZV9faGVhZGBcblxuZnVuY3Rpb24gVGgoIHByb3BzICkge1xuICBjb25zdCB7XG4gICAgY29sdW1uLFxuICAgIG9uQ2xpY2ssXG4gICAgaXNTb3J0ZWQsXG4gICAgZGlyLFxuICB9ICA9IHByb3BzXG4gIGNvbnN0IHsgbGFiZWwsIHNvcnQsIHR5cGUsIC4uLnJlc3QgfSA9IGNvbHVtblxuXG4gIGNvbnN0IHNhZmVUeXBlID0gdHlwZSA/IHR5cGUgOiBgdGV4dGBcblxuICBjb25zdCBDT01QX0NMQVNTID0gY2xhc3NOYW1lcyhcbiAgICBgJHtCQVNFX0NMQVNTfV9jb2xgLFxuICAgIHNhZmVUeXBlLnNwbGl0KGAgYCkubWFwKHQgPT4gYCR7QkFTRV9DTEFTU31fY29sLS1pcy0keyB0IH1gKSxcbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPHRoXG4gICAgICBvbkNsaWNrPXsgb25DbGljayB9XG4gICAgICBjbGFzc05hbWU9eyBDT01QX0NMQVNTIH1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHsgaXNTb3J0ZWQgJiYgPEljb24gc3ZnSWQ9eyBkaXIgPT09IGBBU0NgID8gYGFycm93LXVwd2FyZGAgOiBgYXJyb3ctZG93bndhcmRgIH0gLz4gfVxuICAgICAgeyBsYWJlbCAmJiA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17bGFiZWwudHJpbSgpfSAvPiB9XG4gICAgPC90aD5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVGhlYWQoIHByb3BzICkge1xuICBjb25zdCB7IGNvbHVtbnMsIGhpZGVDb2x1bW5zLCBoYW5kbGVTb3J0LCBzb3J0LCBkaXIgfSA9IHByb3BzXG5cbiAgcmV0dXJuIChcbiAgICA8dGhlYWQgY2xhc3NOYW1lPXsgQkFTRV9DTEFTUyB9PlxuICAgICAgPHRyIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fcm93YH0+XG4gICAgICB7IGNvbHVtbnMubWFwKCAoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoIGhpZGVDb2x1bW5zLmluY2x1ZGVzKGNvbHVtbi5pZCkgKSByZXR1cm4gbnVsbFxuICAgICAgICByZXR1cm4gKCA8VGhcbiAgICAgICAgICBrZXk9eyBpbmRleCB9XG4gICAgICAgICAgY29sdW1uPXsgY29sdW1uIH1cbiAgICAgICAgICBpc1NvcnRlZD17IGNvbHVtbi5zb3J0ICYmIHNvcnQgPT09IGNvbHVtbi5zb3J0IH1cbiAgICAgICAgICBkaXI9eyBkaXIgfVxuICAgICAgICAgIG9uQ2xpY2s9eyAhY29sdW1uLnNvcnQgPyBudWxsIDogZXZlbnQgPT4gaGFuZGxlU29ydChldmVudCwgY29sdW1uLnNvcnQgKSB9XG4gICAgICAgIC8+KVxuICAgICAgfSl9XG4gICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIGNsYXNzTmFtZXMgICAgICAgICBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0ICAgUHJvcFR5cGVzICAgICAgICAgIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCB7IExpbmssIHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuXG5pbXBvcnQgeyBQYWdpbmF0aW9uIH0gZnJvbSAnLi9wYWdpbmF0aW9uJ1xuaW1wb3J0IHsgVGhlYWQgICAgICB9IGZyb20gJy4vaGVhZGVyJ1xuXG5pbXBvcnQgJy4vdGFibGUuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgdGFibGVgXG5cbi8vIENyZWF0ZSBhIGNvbnRleHQgZm9yIHBhc3NpbmcgY29sIHR5cGVzIGFsbCBkb3duXG4vLyDigKIgd2UgbWF5IGhhdmUgYSB3cmFwcGVyIGFyb3VuZCBhIHJvdyAobGlrZSBxdW90YXRpb25Sb3cpXG4vLyAgIHRoaXMgd2lsbCBtYWtlIGl0IGhhcmQgdG8gcGFzcyBkb3duIHRob3NlIHByb3BlcnRpZXMgd2l0aCBhIFJlYWN0LkNoaWxkcmVuLm1hcFxuY29uc3QgVGFibGVDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIGNvbHVtbnM6ICAgICBbXSxcbiAgaGlkZUNvbHVtbnM6IFtdLFxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIFRhYmxlRm9vdGVyKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8dGZvb3QgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fZm9vdGVyYH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L3Rmb290PlxuICApXG59XG5leHBvcnQgeyBUYWJsZUZvb3RlciBhcyBGb290ZXIgfVxuXG5leHBvcnQgZnVuY3Rpb24gUm93Rm9vdGVyKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8dHIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fZm9vdGVyX3Jvd2B9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC90cj5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2VsbCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdHlwZSwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgY29uc3QgY3VycmVudFR5cGUgPSB0eXBlID8gdHlwZSA6IGB0ZXh0YFxuICBjb25zdCBDT01QX0NMQVNTICA9IGNsYXNzTmFtZXMoXG4gICAgYCR7QkFTRV9DTEFTU31fX2NlbGxgLFxuICAgIGN1cnJlbnRUeXBlLnNwbGl0KGAgYCkubWFwKHQgPT4gYCR7QkFTRV9DTEFTU31fX2NlbGwtLWlzLSR7IHQgfWApXG4gIClcbiAgcmV0dXJuIChcbiAgICA8dGQgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9IHsuLi5yZXN0fT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvdGQ+XG4gIClcbn1cbkNlbGwucHJvcFR5cGVzID0ge1xuICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUm93KCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8VGFibGVDb250ZXh0LkNvbnN1bWVyPlxuICAgIHsgKHtjb2x1bW5zLCBoaWRlQ29sdW1uc30pID0+IChcbiAgICAgIDx0ciBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19ib2R5X3Jvd2B9PlxuICAgICAgICB7IFJlYWN0LkNoaWxkcmVuLm1hcCggcHJvcHMuY2hpbGRyZW4sIChjZWxsLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbnNbIGluZGV4IF1cbiAgICAgICAgICAvLyBmaWx0ZXIgaGlkZGVuIGNvbHVtbnNcbiAgICAgICAgICBpZiAoIGhpZGVDb2x1bW5zLmluY2x1ZGVzKGNvbHVtbi5pZCkgKSByZXR1cm4gbnVsbFxuICAgICAgICAgIC8vIHBhc3MgdGhlIHJpZ2h0IHR5cGVzIHRvIGNlbGxcbiAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KCBjZWxsLCB7XG4gICAgICAgICAgICB0eXBlOiBjZWxsLnByb3BzLnR5cGUgfHwgY29sdW1uc1sgaW5kZXggXS50eXBlXG4gICAgICAgICAgfSlcbiAgICAgICAgfSl9XG4gICAgICA8L3RyPlxuICAgICl9XG4gICAgPC9UYWJsZUNvbnRleHQuQ29uc3VtZXI+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVtcHR5TGluZSggcHJvcHMgKSB7XG4gIGNvbnN0IHsgY29sdW1ucywgaGlkZUNvbHVtbnMgfSA9IHByb3BzXG4gIGNvbnN0IGNvbFNwYW4gPSBjb2x1bW5zLmZpbHRlciggY29sdW1uID0+ICFoaWRlQ29sdW1ucy5pbmNsdWRlcyhjb2x1bW4uaWQpICkubGVuZ3RoXG4gIHJldHVybiAoXG4gICAgPHRyIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2JvZHlfcm93YH0+XG4gICAgICA8Q2VsbCBjb2xTcGFuPXsgY29sU3BhbiB9IHR5cGU9XCJlbXB0eVwiID5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5lbXB0eVwiIC8+XG4gICAgICA8L0NlbGw+XG4gICAgPC90cj5cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNvcnRRdWVyeSggY3VycmVudFNvcnRpbmcsIHNvcnQgKSB7XG4gIGNvbnN0IGlzU2FtZVNvcnQgPSBjdXJyZW50U29ydGluZy5zb3J0ID09PSBzb3J0XG4gIGlmICggIWlzU2FtZVNvcnQgKSByZXR1cm4geyBzb3J0LCBkaXI6IGBBU0NgIH1cbiAgY29uc3QgaXNBc2NEaXIgICA9IGN1cnJlbnRTb3J0aW5nLmRpciA9PT0gYEFTQ2BcbiAgaWYgKCBpc0FzY0RpciApICAgIHJldHVybiB7IHNvcnQsIGRpcjogYERFU0NgIH1cbiAgcmV0dXJuIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBQYWdpbmF0ZWRUYWJsZSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaGlkZUNvbHVtbnM6IFtdLFxuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb2x1bW5zICAgICAgICA6IFByb3BUeXBlcy5hcnJheU9mKCBQcm9wVHlwZXMub2JqZWN0ICkuaXNSZXF1aXJlZCxcbiAgICBoaWRlQ29sdW1ucyAgICA6IFByb3BUeXBlcy5hcnJheU9mKCBQcm9wVHlwZXMuc3RyaW5nICksXG4gICAgaGlkZU9uRW1wdHkgICAgOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtZXRhICAgICAgICAgICA6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaGFuZGxlUGFnZVNvcnQgOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBmb290ZXIgICAgICAgICA6IFByb3BUeXBlcy5lbGVtZW50LFxuICB9XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc29ydCAgIDogdW5kZWZpbmVkLFxuICAgICAgZGlyICAgIDogdW5kZWZpbmVkLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVNvcnQgPSB0aGlzLmhhbmRsZVNvcnQuYmluZCggdGhpcyApXG4gICAgdGhpcy5oYW5kbGVQcmV2ID0gdGhpcy5oYW5kbGVQcmV2LmJpbmQoIHRoaXMgKVxuICAgIHRoaXMuaGFuZGxlTmV4dCA9IHRoaXMuaGFuZGxlTmV4dC5iaW5kKCB0aGlzIClcbiAgfVxuXG4gIGhhbmRsZVNvcnQoIGV2ZW50LCBzb3J0ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBpZiAoICFzb3J0ICkgcmV0dXJuXG4gICAgY29uc3QgeyBoYW5kbGVQYWdlU29ydCwgbWF0Y2ggfSA9IHRoaXMucHJvcHNcbiAgICBpZiAoICFoYW5kbGVQYWdlU29ydCApIHJldHVyblxuICAgIGNvbnN0IHF1ZXJ5ID0gY29tcHV0ZVNvcnRRdWVyeSggdGhpcy5zdGF0ZSwgc29ydCApXG5cbiAgICBoYW5kbGVQYWdlU29ydCh7XG4gICAgICBxdWVyeSxcbiAgICAgIC4uLm1hdGNoLnBhcmFtcyxcbiAgICB9KVxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiAoe1xuICAgICAgc29ydDogcXVlcnkuc29ydCxcbiAgICAgIGRpcjogIHF1ZXJ5LmRpcixcbiAgICB9KSlcbiAgfVxuXG4gIC8vIGFsd2F5cyBwYXNzIFVSTCBwYXJhbXMgdG8gcmVkdXggYWN0aW9uc1xuICAvLyDigKIgbmVlZGVkIGZvciBleGFtcGxlIGJ5IC9jdXN0b21lcnMvcXVvdGF0aW9uc1xuICBoYW5kbGVQcmV2KCBldmVudCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgeyBtZXRhLCBoYW5kbGVQYWdlU29ydCwgbWF0Y2ggfSA9IHRoaXMucHJvcHNcbiAgICBpZiAoICFoYW5kbGVQYWdlU29ydCApICAgIHJldHVyblxuICAgIGlmICggIW1ldGEucHJldmlvdXNQYWdlICkgcmV0dXJuXG4gICAgaGFuZGxlUGFnZVNvcnQoe1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgcGFnZTogbWV0YS5wcmV2aW91c1BhZ2UsXG4gICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICB9LFxuICAgICAgLi4ubWF0Y2gucGFyYW1zXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZU5leHQoIGV2ZW50ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCB7IG1ldGEsIGhhbmRsZVBhZ2VTb3J0LCBtYXRjaCB9ID0gdGhpcy5wcm9wc1xuICAgIGlmICggIWhhbmRsZVBhZ2VTb3J0ICkgcmV0dXJuXG4gICAgaWYgKCAhbWV0YS5uZXh0UGFnZSApICByZXR1cm5cbiAgICBoYW5kbGVQYWdlU29ydCh7XG4gICAgICBxdWVyeToge1xuICAgICAgICBwYWdlOiBtZXRhLm5leHRQYWdlLFxuICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgfSxcbiAgICAgIC4uLm1hdGNoLnBhcmFtc1xuICAgIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wcywgc3RhdGUgfSA9IHRoaXNcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc05hbWUsXG4gICAgICBwcmVzZW50YXRpb24sXG4gICAgICBoYW5kbGVQYWdlU29ydCxcbiAgICAgIGhpZGVPbkVtcHR5LFxuICAgIH0gPSBwcm9wc1xuICAgIGNvbnN0IGhhc1Jvd3MgICA9IFJlYWN0LkNoaWxkcmVuLmNvdW50KCBwcm9wcy5jaGlsZHJlbiApID4gMFxuICAgIGNvbnN0IGhhc0Zvb3RlciA9IHByb3BzLmZvb3RlciAhPSBudWxsXG4gICAgY29uc3QgaGFzTWV0YSAgID0gcHJvcHMubWV0YSAgICE9IG51bGxcbiAgICBjb25zdCBDT01QX0NMQVNTID0gY2xhc3NOYW1lcyhcbiAgICAgIEJBU0VfQ0xBU1MsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBwcmVzZW50YXRpb24gPyBgJHtCQVNFX0NMQVNTfS0tcHJlc2VudGF0aW9uYCA6IGZhbHNlLFxuICAgIClcblxuICAgIGlmICggaGlkZU9uRW1wdHkgJiYgIWhhc1Jvd3MgKSByZXR1cm4gbnVsbFxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9PlxuICAgICAgICA8dGFibGUgY2VsbFNwYWNpbmc9XCIwXCIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fY29udGVudGB9PlxuICAgICAgICAgIHsgcHJvcHMudGl0bGUgJiYgKFxuICAgICAgICAgICAgPGNhcHRpb24gY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fdGl0bGVgfT5cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9eyBwcm9wcy50aXRsZSB9IC8+XG4gICAgICAgICAgICA8L2NhcHRpb24+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8VGhlYWRcbiAgICAgICAgICAgIGNvbHVtbnM9eyBwcm9wcy5jb2x1bW5zIH1cbiAgICAgICAgICAgIGhpZGVDb2x1bW5zPXsgcHJvcHMuaGlkZUNvbHVtbnMgfVxuICAgICAgICAgICAgaGFuZGxlU29ydD17IHRoaXMuaGFuZGxlU29ydCB9XG4gICAgICAgICAgICBzb3J0PXsgc3RhdGUuc29ydCB9XG4gICAgICAgICAgICBkaXI9eyBzdGF0ZS5kaXIgfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFRhYmxlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17e1xuICAgICAgICAgICAgY29sdW1ucyAgICA6IHByb3BzLmNvbHVtbnMsXG4gICAgICAgICAgICBoaWRlQ29sdW1uczogcHJvcHMuaGlkZUNvbHVtbnMsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fYm9keWB9PlxuICAgICAgICAgICAgeyBoYXNSb3dzID8gcHJvcHMuY2hpbGRyZW4gOiAoXG4gICAgICAgICAgICAgIDxFbXB0eUxpbmVcbiAgICAgICAgICAgICAgICBjb2x1bW5zPXsgcHJvcHMuY29sdW1ucyB9XG4gICAgICAgICAgICAgICAgaGlkZUNvbHVtbnM9eyBwcm9wcy5oaWRlQ29sdW1uc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvVGFibGVDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgICAgIHsgaGFzRm9vdGVyICYmIHByb3BzLmZvb3RlciB9XG4gICAgICAgIDwvdGFibGU+XG4gICAgICAgIHsgaGFzTWV0YSAmJiAoXG4gICAgICAgICAgPFBhZ2luYXRpb25cbiAgICAgICAgICAgIG1ldGE9eyBwcm9wcy5tZXRhIH1cbiAgICAgICAgICAgIGhhbmRsZVByZXY9eyB0aGlzLmhhbmRsZVByZXYgfVxuICAgICAgICAgICAgaGFuZGxlTmV4dD17IHRoaXMuaGFuZGxlTmV4dCB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG4vLyB3ZSBuZWVkIHRvIGhhdmUgYWNjZXNzIHRvIHRoZSByb3V0ZXJcbi8vIOKAoiB0aGUgcmVkdXggYWN0aW9ucyBtYXkgbmVlZCB0byBhY2Nlc3MgdG8gcm91dGUgcGFyYW1zXG5leHBvcnQgY29uc3QgVGFibGUgPSB3aXRoUm91dGVyKCBQYWdpbmF0ZWRUYWJsZSApXG5leHBvcnQgeyBUYWJsZSBhcyBXcmFwcGVyIH1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVcbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCAgIGNsYXNzTmFtZXMgICAgICAgICBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IHsgRm9ybWF0dGVkTWVzc2FnZSB9IGZyb20gJ3JlYWN0LWludGwnXG5cbmltcG9ydCB7IEljb24gfSBmcm9tICcuLi91aS9zdmctaWNvbnMnXG5cbmNvbnN0IEJBU0VfQ0xBU1MgICA9IGB0YWJsZV9fcGFnaW5hdGlvbmBcbmNvbnN0IEFDVElPTl9DTEFTUyA9IGAke0JBU0VfQ0xBU1N9X2FjdGlvbmBcblxuZXhwb3J0IGZ1bmN0aW9uIFBhZ2luYXRpb24oIHByb3BzICkge1xuICBjb25zdCB7IG1ldGEsIGhhbmRsZVByZXYsIGhhbmRsZU5leHQgfSA9IHByb3BzXG4gIGlmICggIW1ldGEudG90YWwgKSByZXR1cm4gbnVsbFxuICBjb25zdCBQUkVWX0NMQVNTID0gY2xhc3NOYW1lcyhcbiAgICBBQ1RJT05fQ0xBU1MsXG4gICAgYCR7QUNUSU9OX0NMQVNTfS0tcHJldmAsXG4gICAgbWV0YS5wcmV2aW91c1BhZ2UgPyBmYWxzZSA6IGAke0FDVElPTl9DTEFTU30tLWRpc2FibGVkYCxcbiAgKVxuICBjb25zdCBORVhUX0NMQVNTID0gY2xhc3NOYW1lcyhcbiAgICBBQ1RJT05fQ0xBU1MsXG4gICAgYCR7QUNUSU9OX0NMQVNTfS0tbmV4dGAsXG4gICAgbWV0YS5uZXh0UGFnZSA/IGZhbHNlIDogIGAke0FDVElPTl9DTEFTU30tLWRpc2FibGVkYCxcbiAgKVxuICByZXR1cm4gKFxuICAgIDxmb290ZXIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X3Jvd3NgfT5cbiAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5yb3dzLXBlci1wYWdlXCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9yb3dzLXBlci1wYWdlYH0+eyBtZXRhLmxpbWl0IH08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwidGFibGUucGFnaW5hdGlvblwiIHZhbHVlcz17IG1ldGEgfSAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X2FjdGlvbnNgfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIG9uQ2xpY2s9eyBoYW5kbGVQcmV2IH1cbiAgICAgICAgICBjbGFzc05hbWU9eyBQUkVWX0NMQVNTIH1cbiAgICAgICAgPlxuICAgICAgICAgIDxJY29uIHN2Z0lkPVwiY2hldnJvbi1sZWZ0XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBvbkNsaWNrPXsgaGFuZGxlTmV4dCB9XG4gICAgICAgICAgY2xhc3NOYW1lPXsgTkVYVF9DTEFTUyB9XG4gICAgICAgID5cbiAgICAgICAgICA8SWNvbiBzdmdJZD1cImNoZXZyb24tcmlnaHRcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9vdGVyPlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgICBjbGFzc05hbWVzICAgICAgICAgZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0ICAgUHJvcFR5cGVzICAgICAgICAgIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgICBjcmlvICAgICAgICAgICAgICAgZnJvbSAnY3JpbydcblxuaW1wb3J0ICogYXMgY29tcHV0ZSAgICAgICAgICAgICAgZnJvbSAnLi4vdXRpbHMvY29tcHV0ZS10b3RhbCdcbmltcG9ydCAqIGFzIEZvcm1hdCAgICAgICAgICAgICAgIGZyb20gJy4uL3VpL2Zvcm1hdCdcbmltcG9ydCB7ICAgIENoZWNrQm94ICAgICAgICAgICB9IGZyb20gJy4uL3VpL2ZpZWxkJ1xuaW1wb3J0IHsgICAgVGV4dGFyZWFBdXRvUmVzaXplIH0gZnJvbSAnLi4vdWkvdGV4dGFyZWEtYXV0by1yZXNpemUnXG5pbXBvcnQgeyAgICBCdG5JY29uICAgICAgICAgICAgfSBmcm9tICcuLi91aS9idXR0b25zJ1xuaW1wb3J0ICogYXMgVGFibGUgICAgICAgICAgICAgICAgZnJvbSAnLi9pbmRleCdcblxuLy8gb25seSB1c2UgZGVmYXVsdFZhbHVlXG4vLyDigKIgaGFuZGxlQ2hhbmdlIGlzIGhhbmRsZWQgZ2xvYmFsbHkgYXQgdGhlIGZvcm0gbGV2ZWxcbmV4cG9ydCBmdW5jdGlvbiBQcm9kdWN0TGluZUVkaXRhYmxlKCBwcm9wcyApIHtcbiAgY29uc3QgeyBwcm9kdWN0LCBpc0xhc3QsIGluZGV4LCBoYW5kbGVSZW1vdmUgfSA9IHByb3BzXG4gIGNvbnN0IGZpZWxkUGF0aCA9IGBwcm9kdWN0c1skeyBpbmRleCB9XWBcbiAgY29uc3QgdG90YWwgICAgID0gY29tcHV0ZS5wcm9kdWN0VG90YWwoIHByb2R1Y3QgKVxuICByZXR1cm4gKFxuICAgIDxUYWJsZS5Sb3c+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgeyAhaXNMYXN0ICYmIChcbiAgICAgICAgICA8Q2hlY2tCb3hcbiAgICAgICAgICAgIG5hbWU9eyBgJHtmaWVsZFBhdGh9W2NoZWNrZWRdYCB9XG4gICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZD17IHByb2R1Y3QuZ2V0KGBjaGVja2VkYCkgfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImhpZGRlblwiXG4gICAgICAgICAgbmFtZT17YCR7ZmllbGRQYXRofVtfaWRdYH1cbiAgICAgICAgICB2YWx1ZT17IHByb2R1Y3QuZ2V0KGBfaWRgKSB9XG4gICAgICAgIC8+XG4gICAgICAgIDxUZXh0YXJlYUF1dG9SZXNpemVcbiAgICAgICAgICBuYW1lPXtgJHtmaWVsZFBhdGh9W2Rlc2NyaXB0aW9uXWB9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXsgcHJvZHVjdC5nZXQoYGRlc2NyaXB0aW9uYCkgfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwicHJvZHVjdC5wbGFjZS1ob2xkZXJcIlxuICAgICAgICAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgIHN0ZXA9XCIwLjI1XCJcbiAgICAgICAgICBuYW1lPXsgYCR7ZmllbGRQYXRofVtxdWFudGl0eV1gIH1cbiAgICAgICAgICBkZWZhdWx0VmFsdWU9eyBwcm9kdWN0LmdldChgcXVhbnRpdHlgKSB9XG4gICAgICAgIC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgbWluPVwiMFwiXG4gICAgICAgICAgc3RlcD1cIjAuNVwiXG4gICAgICAgICAgbmFtZT17IGAke2ZpZWxkUGF0aH1bcHJpY2VdYCB9XG4gICAgICAgICAgZGVmYXVsdFZhbHVlPXsgcHJvZHVjdC5nZXQoYHByaWNlYCkgfVxuICAgICAgICAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgdG90YWwgfSAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGw+XG4gICAgICAgIHsgIWlzTGFzdCAmJiAoXG4gICAgICAgICAgPEJ0bkljb25cbiAgICAgICAgICAgIGxpbmtBbGlrZVxuICAgICAgICAgICAgb25DbGljaz17IGUgPT4gaGFuZGxlUmVtb3ZlKGluZGV4LCBmaWVsZFBhdGgpIH1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgc3ZnSWQ9XCJkZWxldGVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgPC9UYWJsZS5Sb3c+XG4gIClcbn1cblByb2R1Y3RMaW5lRWRpdGFibGUucHJvcFR5cGVzID0ge1xuICBpbmRleCAgICAgICA6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgcHJvZHVjdCAgICAgOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGlzTGFzdCAgICAgIDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgaGFuZGxlUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvZHVjdExpbmVEaXNwbGF5KCBwcm9wcyApIHtcbiAgY29uc3QgeyBwcm9kdWN0IH0gPSBwcm9wc1xuICBpZiAoICFwcm9kdWN0LmNoZWNrZWQgKSByZXR1cm4gbnVsbFxuICBjb25zdCB0b3RhbCA9IGNvbXB1dGUucHJvZHVjdFRvdGFsKCBwcm9kdWN0IClcbiAgcmV0dXJuIChcbiAgICA8VGFibGUuUm93PlxuICAgICAgPFRhYmxlLkNlbGwgLz5cbiAgICAgIDxUYWJsZS5DZWxsIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgIDxGb3JtYXQuTWFya2Rvd24gdGV4dD17IHByb2R1Y3QuZGVzY3JpcHRpb24gfSAvPlxuICAgICAgPC9UYWJsZS5DZWxsPlxuICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cIm51bWJlclwiPlxuICAgICAgICA8Rm9ybWF0Lk51bSB2YWx1ZT17IHByb2R1Y3QucXVhbnRpdHkgfSBtaW5pbXVtRnJhY3Rpb25EaWdpdHM9ezJ9IC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCB0eXBlPVwibnVtYmVyXCI+XG4gICAgICAgIDxGb3JtYXQuTnVtIHZhbHVlPXsgcHJvZHVjdC5wcmljZSB9IG1pbmltdW1GcmFjdGlvbkRpZ2l0cz17Mn0gLz5cbiAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgIDxUYWJsZS5DZWxsIHR5cGU9XCJhbW91bnRcIj5cbiAgICAgICAgPEZvcm1hdC5BbW91bnQgdmFsdWU9eyB0b3RhbCB9IC8+XG4gICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICA8VGFibGUuQ2VsbCAvPlxuICAgIDwvVGFibGUuUm93PlxuICApXG59XG5Qcm9kdWN0TGluZURpc3BsYXkucHJvcFR5cGVzID0ge1xuICBwcm9kdWN0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG59XG5cbmZ1bmN0aW9uIFByb2R1Y3RUb3RhbEZvb3RlciggcHJvcHMgKSB7XG4gIGNvbnN0IHsgcmVhZE9ubHksIGRvY3VtZW50IH0gPSBwcm9wc1xuICAvLyBpbiByZWFkT25seSBtb2RlIHdlIHJlbW92ZSB0b2dnbGUvcmVtb3ZlIGJ1dHRvbnNcbiAgY29uc3QgY29sU3BhbiA9IHJlYWRPbmx5ID8gMyA6IDRcbiAgcmV0dXJuIChcbiAgICA8VGFibGUuRm9vdGVyPlxuICAgICAgPFRhYmxlLlJvd0Zvb3Rlcj5cbiAgICAgICAgPFRhYmxlLkNlbGwgY29sU3Bhbj17IGNvbFNwYW4gfSB0eXBlPVwibnVtYmVyXCI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5hbW91bnQtaHRcIi8+XG4gICAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cImFtb3VudFwiPlxuICAgICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgZG9jdW1lbnQudG90YWxOZXQgfSAvPlxuICAgICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICAgIHsgIXJlYWRPbmx5ICYmIDxUYWJsZS5DZWxsIC8+IH1cbiAgICAgIDwvVGFibGUuUm93Rm9vdGVyPlxuICAgICAgPFRhYmxlLlJvd0Zvb3Rlcj5cbiAgICAgICAgPFRhYmxlLkNlbGwgY29sU3Bhbj17IGNvbFNwYW4gfSB0eXBlPVwibnVtYmVyXCI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5hbW91bnQtdGF4ZXNcIi8+XG4gICAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cImFtb3VudFwiPlxuICAgICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgZG9jdW1lbnQudG90YWxUYXggfSAvPlxuICAgICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICAgIHsgIXJlYWRPbmx5ICYmIDxUYWJsZS5DZWxsIC8+IH1cbiAgICAgIDwvVGFibGUuUm93Rm9vdGVyPlxuICAgICAgPFRhYmxlLlJvd0Zvb3Rlcj5cbiAgICAgICAgPFRhYmxlLkNlbGwgY29sU3Bhbj17IGNvbFNwYW4gfSB0eXBlPVwibnVtYmVyXCI+XG4gICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJ0YWJsZS5hbW91bnRcIi8+XG4gICAgICAgIDwvVGFibGUuQ2VsbD5cbiAgICAgICAgPFRhYmxlLkNlbGwgdHlwZT1cImFtb3VudFwiPlxuICAgICAgICAgIDxGb3JtYXQuQW1vdW50IHZhbHVlPXsgZG9jdW1lbnQudG90YWwgfSAvPlxuICAgICAgICA8L1RhYmxlLkNlbGw+XG4gICAgICAgIHsgIXJlYWRPbmx5ICYmIDxUYWJsZS5DZWxsIC8+IH1cbiAgICAgIDwvVGFibGUuUm93Rm9vdGVyPlxuICAgIDwvVGFibGUuRm9vdGVyPlxuICApXG59XG5Qcm9kdWN0VG90YWxGb290ZXIucHJvcFR5cGVzID0ge1xuICBkb2N1bWVudCAgICA6IFByb3BUeXBlcy5vYmplY3QsXG4gIHJlYWRPbmx5ICAgIDogUHJvcFR5cGVzLmJvb2wsXG59XG5cbmNvbnN0IFByb2R1Y3RzQ29sdW1ucyA9IFtcbiAge2lkOiBgdG9nZ2xlYCAgICAgICwgbGFiZWw6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICwgdHlwZTogYGNoZWNrYm94YCAgICAgfSxcbiAge2lkOiBgZGVzY3JpcHRpb25gICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIuZGVzY3JpcHRpb25gICwgdHlwZTogYGlucHV0YCAgICAgICAgfSxcbiAge2lkOiBgcXVhbnRpdHlgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIucXVhbnRpdHlgICAgICwgdHlwZTogYGlucHV0IG51bWJlcmAgfSxcbiAge2lkOiBgcHJpY2VgICAgICAgICwgbGFiZWw6IGB0YWJsZS5oZWFkZXIudW5pdC1wcmljZWAgICwgdHlwZTogYGlucHV0IG51bWJlcmAgfSxcbiAge2lkOiBgYW1vdW50YCAgICAgICwgbGFiZWw6IGB0YWJsZS5hbW91bnRgICAgICAgICAgICAgICwgdHlwZTogYGFtb3VudGAgICAgICAgfSxcbiAge2lkOiBgcmVtb3ZlYCAgICAgICwgbGFiZWw6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICwgdHlwZTogYGFjdGlvbmAgICAgICAgfVxuXVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvZHVjdFRhYmxlKCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIHJlYWRPbmx5LFxuICAgIGRvY3VtZW50LFxuICAgIGhhbmRsZVJlbW92ZSxcbiAgfSA9IHByb3BzXG4gIGNvbnN0IHByb2R1Y3RzICAgICA9IGRvY3VtZW50LmdldChgcHJvZHVjdHNgKVxuICBpZiAoICFjcmlvLmlzQXJyYXkocHJvZHVjdHMpICkgcmV0dXJuIG51bGxcbiAgY29uc3QgaGlkZUNvbHVtbnMgID0gcmVhZE9ubHkgPyBbYHRvZ2dsZWAsIGByZW1vdmVgXSA6IFtdXG4gIGNvbnN0IENPTVBfQ0xBU1MgICA9IGNsYXNzTmFtZXMoIGB0YWJsZS0tcHJvZHVjdGAsIHtcbiAgICBbYHRhYmxlLS1wcmludGBdOiByZWFkT25seSxcbiAgfSlcbiAgY29uc3QgUHJvZHVjdExpbmUgICAgID0gcmVhZE9ubHkgPyBQcm9kdWN0TGluZURpc3BsYXkgOiBQcm9kdWN0TGluZUVkaXRhYmxlXG4gIGNvbnN0IHByb2R1Y3RzTGVuZ3RoICA9IHByb2R1Y3RzLmxlbmd0aFxuICByZXR1cm4gKFxuICAgIDxUYWJsZS5XcmFwcGVyXG4gICAgICBjb2x1bW5zPXsgUHJvZHVjdHNDb2x1bW5zIH1cbiAgICAgIGhpZGVDb2x1bW5zPXsgaGlkZUNvbHVtbnMgfVxuICAgICAgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9XG4gICAgICBmb290ZXI9eyA8UHJvZHVjdFRvdGFsRm9vdGVyIHsuLi5wcm9wc30gLz4gfVxuICAgID5cbiAgICB7IHByb2R1Y3RzLm1hcCggKHByb2R1Y3QsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gPFByb2R1Y3RMaW5lXG4gICAgICAgIGtleT17IHByb2R1Y3QuX2lkIH1cbiAgICAgICAgaW5kZXg9eyBpbmRleCB9XG4gICAgICAgIHByb2R1Y3Q9eyBwcm9kdWN0IH1cbiAgICAgICAgaXNMYXN0PXsgaW5kZXggPT09IHByb2R1Y3RzTGVuZ3RoIC0gMSB9XG4gICAgICAgIGhhbmRsZVJlbW92ZT17IGhhbmRsZVJlbW92ZSB9XG4gICAgICAvPlxuICAgIH0pfVxuICAgIDwvVGFibGUuV3JhcHBlcj5cbiAgKVxufVxuUHJvZHVjdFRhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgcmVhZE9ubHk6IGZhbHNlLFxufVxuUHJvZHVjdFRhYmxlLnByb3BUeXBlcyA9IHtcbiAgZG9jdW1lbnQgICAgOiBQcm9wVHlwZXMub2JqZWN0LFxuICByZWFkT25seSAgICA6IFByb3BUeXBlcy5ib29sLFxuICAvLyBoYW5kbGVSZW1vdmU6IFByb3BUeXBlcy5mdW5jdGlvbixcbn1cbiIsImltcG9ydCBSZWFjdCAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcblxuaW1wb3J0ICcuL2FsZXJ0cy5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBhbGVydGBcblxuZXhwb3J0IGZ1bmN0aW9uIEFsZXJ0KCBwcm9wcyApIHtcbiAgY29uc3Qge1xuICAgIHdhcm5pbmcgPSBmYWxzZSxcbiAgICBkYW5nZXIgPSBmYWxzZSxcbiAgICBjbGFzc05hbWUsXG4gIH0gPSBwcm9wc1xuICBjb25zdCBDT01QX0NMQVNTID0gY2xhc3NOYW1lcyggQkFTRV9DTEFTUywge1xuICAgIFtgJHtCQVNFX0NMQVNTfS0td2FybmluZ2BdOiB3YXJuaW5nLFxuICAgIFtgJHtCQVNFX0NMQVNTfS0tZGFuZ2VyYCBdOiBkYW5nZXIgLFxuICB9LCBjbGFzc05hbWUpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17IENPTVBfQ0xBU1MgfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvZGl2PlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMaW5rICAgICAgICAgICAgIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuaW1wb3J0ICAgY2xhc3NOYW1lcyAgICAgICAgIGZyb20gJ2NsYXNzbmFtZXMnXG5cbmltcG9ydCBJY29uIGZyb20gJy4vc3ZnLWljb25zJ1xuXG5pbXBvcnQgJy4vYnV0dG9ucy5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBidXR0b25gXG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b24oIHByb3BzICkge1xuICBjb25zdCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIHRvLFxuICAgIHNlY29uZGFyeSxcbiAgICBsaW5rQWxpa2UsXG4gICAgZGFuZ2VyLFxuICAgIC4uLm90aGVyc1xuICB9ID0gcHJvcHNcbiAgY29uc3QgQ09NUF9DTEFTUyA9IGNsYXNzTmFtZXMoIGNsYXNzTmFtZSwge1xuICAgIFsgICAgQkFTRV9DTEFTUyAgICAgICAgICAgICAgXTogdHJ1ZSAgICAgLFxuICAgIFtgJHsgQkFTRV9DTEFTUyB9LS1saW5rYCAgICAgXTogbGlua0FsaWtlLFxuICAgIFtgJHsgQkFTRV9DTEFTUyB9LS1zZWNvbmRhcnlgXTogc2Vjb25kYXJ5LFxuICAgIFtgJHsgQkFTRV9DTEFTUyB9LS1kYW5nZXJgICAgXTogZGFuZ2VyICAgLFxuICB9KVxuXG4gIGlmICggdG8gKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaW5rIHRvPXt0b30gY2xhc3NOYW1lPXsgQ09NUF9DTEFTUyB9IHsuLi5vdGhlcnN9ID5cbiAgICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L0xpbms+XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIGNsYXNzTmFtZT17IENPTVBfQ0xBU1MgfSB7Li4ub3RoZXJzfSA+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L2J1dHRvbj5cbiAgKVxufVxuXG5jb25zdCBCVE5fSUNPTl9DTEFTUyA9IGAke0JBU0VfQ0xBU1N9LS1pY29uYFxuZXhwb3J0IGZ1bmN0aW9uIEJ0bkljb24oIHByb3BzICkge1xuICBjb25zdCB7XG4gICAgY2xhc3NOYW1lLFxuICAgIHN2Z0lkLFxuICAgIHNlY29uZGFyeSxcbiAgICBsaW5rQWxpa2UsXG4gICAgZGFuZ2VyLFxuICAgIGxhYmVsLFxuICAgIC4uLm90aGVyc1xuICB9ID0gcHJvcHNcbiAgY29uc3QgQ09NUF9DTEFTUyA9IGNsYXNzTmFtZXMoY2xhc3NOYW1lLCB7XG4gICAgWyAgIEJUTl9JQ09OX0NMQVNTICAgICAgICAgICAgXTogdHJ1ZSAgICAgLFxuICAgIFtgJHtCVE5fSUNPTl9DTEFTU30tc2Vjb25kYXJ5YF06IHNlY29uZGFyeSxcbiAgICBbYCR7QlROX0lDT05fQ0xBU1N9LWxpbmtgICAgICBdOiBsaW5rQWxpa2UsXG4gICAgW2Ake0JUTl9JQ09OX0NMQVNTfS1kYW5nZXJgICAgXTogZGFuZ2VyICAgLFxuICAgIFtgJHtCVE5fSUNPTl9DTEFTU30tLWljb25gICAgIF06IGNsYXNzTmFtZSxcbiAgfSlcbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uXG4gICAgICBjbGFzc05hbWU9eyBDT01QX0NMQVNTIH1cbiAgICAgIHsuLi5vdGhlcnN9XG4gICAgPlxuICAgICAgPEljb24gc3ZnSWQ9e3N2Z0lkfSAvPlxuICAgICAgeyBsYWJlbCAmJiAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX25vdGljZWB9PlxuICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsgbGFiZWwgfSAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICApfVxuICAgIDwvQnV0dG9uPlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QgIGZyb20gJ3JlYWN0J1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXG5pbXBvcnQgRGF5UGlja2VySW5wdXQgZnJvbSAncmVhY3QtZGF5LXBpY2tlci9EYXlQaWNrZXJJbnB1dCdcbmltcG9ydCBNb21lbnRMb2NhbGVVdGlscywge1xuICBmb3JtYXREYXRlLFxuICBwYXJzZURhdGUsXG59IGZyb20gJ3JlYWN0LWRheS1waWNrZXIvbW9tZW50J1xuLy8gaHR0cDovL3JlYWN0LWRheS1waWNrZXIuanMub3JnL2RvY3MvbG9jYWxpemF0aW9uXG5pbXBvcnQgJ21vbWVudC9sb2NhbGUvZW4tZ2InXG5pbXBvcnQgJ21vbWVudC9sb2NhbGUvZnInXG5cbmltcG9ydCAnLi9kYXRlLXBpY2tlci5zY3NzJ1xuXG4vLyB1c2luZyBodHRwczovL3JlYWN0LWRheS1waWNrZXIuanMub3JnL1xuXG5jb25zdCBkaXNhYmxlZERheXMgPSB7XG4gIGFmdGVyOiBuZXcgRGF0ZSgpLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRGF0ZVBpY2tlciggcHJvcHMgKSB7XG4gIGNvbnN0IHsgaGFuZGxlRGF5Q2hhbmdlLCB2YWx1ZSwgLi4uaW5wdXRQcm9wcyB9ID0gcHJvcHNcbiAgLy8gZW1wdHkgdmFsdWVzIHNob3VsZCB0cmVhdGVkIGFzIGludmFsaWQgZGF0ZVxuICAvLyDigKIgbWF5YmUgdGhlIHNlcnZlIGRvZXNuJ3Qgc2VuZCB1cyBhIGRhdGUgYWxsIVxuICBjb25zdCBkYXRlT2JqZWN0ID0gbW9tZW50KCB2YWx1ZSB8fCBgYCApXG4gIGNvbnN0IGRhdGVWYWx1ZSA9IGRhdGVPYmplY3QuaXNWYWxpZCgpID8gZGF0ZU9iamVjdC50b0RhdGUoKSA6IGBgXG4gIHJldHVybiAoXG4gICAgPERheVBpY2tlcklucHV0XG4gICAgICB2YWx1ZT17IGRhdGVWYWx1ZSB9XG4gICAgICBsb2NhbGU9eyBgZnJgIH1cbiAgICAgIGZvcm1hdERhdGU9eyBmb3JtYXREYXRlIH1cbiAgICAgIHBhcnNlRGF0ZT17IHBhcnNlRGF0ZSB9XG4gICAgICBjbGlja1Vuc2VsZWN0c0RheVxuICAgICAgZm9ybWF0PVwiTFwiXG4gICAgICBwbGFjZWhvbGRlcj17IGBkZC9tbS95eXl5YCB9XG4gICAgICBpbnB1dFByb3BzPXsgaW5wdXRQcm9wcyB9XG4gICAgICBkYXlQaWNrZXJQcm9wcz17e1xuICAgICAgICBkaXNhYmxlZERheXMsXG4gICAgICAgIGxvY2FsZTogICAgIGBmcmAsXG4gICAgICAgIGxvY2FsZVV0aWxzOiBNb21lbnRMb2NhbGVVdGlscyxcbiAgICAgIH19XG4gICAgICBvbkRheUNoYW5nZT17IGRheSA9PiB7XG4gICAgICAgIGhhbmRsZURheUNoYW5nZSAmJiBoYW5kbGVEYXlDaGFuZ2UoIHtcbiAgICAgICAgICBuYW1lOiBpbnB1dFByb3BzLm5hbWUsXG4gICAgICAgICAgdmFsdWU6IGRheSB8fCBgYCxcbiAgICAgICAgfSlcbiAgICAgIH0gfVxuICAgIC8+XG4gIClcbn1cbiIsImltcG9ydCAgIGlzTmlsICAgICAgICAgICAgICBmcm9tICdsb2Rhc2guaXNuaWwnXG5pbXBvcnQgICBjcmlvICAgICAgICAgICAgICAgZnJvbSAnY3JpbydcbmltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEZvcm1hdHRlZE1lc3NhZ2UgfSBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgeyBJY29uICAgICAgICAgICAgfSBmcm9tICcuL3N2Zy1pY29ucydcbmltcG9ydCB7IFRleHRhcmVhQXV0b1Jlc2l6ZSB9IGZyb20gJy4vdGV4dGFyZWEtYXV0by1yZXNpemUnXG5cbmltcG9ydCAnLi9maWVsZC5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBmaWVsZGBcblxuLy8vLy8vXG4vLyBVVElMU1xuLy8vLy8vXG5cbmZ1bmN0aW9uIGlzRW1wdHkoIHZhbHVlICkge1xuICByZXR1cm4gKCBpc05pbCggdmFsdWUgKSB8fCB2YWx1ZSA9PT0gYGApXG59XG5cbi8vIGVuc3VyZSB0aGF0IHdlIGhhdmUgYSB2YWx1ZSBpbiBjYXNlIG9mIGNvbnRyb2xsZWQgY29tcG9uZW50XG4vLyDigKIgdGhpcyB3aWxsIGF2b2lkIHdhcm5pbmdz4oCmXG4vLyAgIOKApmZyb20gc3dpdGNoaW5nIGZyb20gY29udHJvbGxlZCB0byB1bmNvbnRyb2xsZWQgY29tcG9uZW50c1xuZnVuY3Rpb24gZW5zdXJlVmFsdWUoIHZhbHVlICkge1xuICByZXR1cm4gaXNOaWwoIHZhbHVlICkgPyBgYCA6IHZhbHVlXG59XG5cbi8vIGZvb1swXSA9PiBmb28tMFxuZXhwb3J0IGZ1bmN0aW9uIGlkVG9DbGFzc05hbWUoIGlkICkge1xuICByZXR1cm4gaWQucmVwbGFjZSgvXFxdJC8sIGBgKS5yZXBsYWNlKC9bXFxbXFxdXS9nLCAnLScpLnRvTG93ZXJDYXNlKClcbn1cblxuLy8vLy8vXG4vLyBXUkFQUEVSXG4vLy8vLy9cblxuLy8gaW5zcGlyZWQgYnlcbi8vIOKAoiBodHRwczovL2dpdGh1Yi5jb20vbXVpY3NzL211aS9ibG9iL21hc3Rlci9zcmMvcmVhY3QvX3RleHRmaWVsZEhlbHBlcnMuanN4XG5jb25zdCBmaWVsZFdyYXBwZXIgPSAoe0NvbnRyb2xDb21wb25lbnQsIGZpZWxkVHlwZX0pID0+IGNsYXNzIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG5cbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQoIHRoaXMgKVxuICAgIHRoaXMuaGFuZGxlQmx1ciA9IHRoaXMuaGFuZGxlQmx1ci5iaW5kKCB0aGlzIClcblxuICAgIGNvbnN0IHsgaWQsIGxhYmVsLCBkYXJrQmcsIG9uQ2hhbmdlLCBvbkJsdXIsIC4uLnJlc3QgfSA9IHByb3BzXG4gICAgY29uc3QgX2lkICAgICA9IGlkID8gaWQgOiByZXN0Lm5hbWVcbiAgICBjb25zdCBfaWQyY2xhc3MgPSBpZFRvQ2xhc3NOYW1lKCBfaWQgKVxuICAgIGNvbnN0IHsgdHlwZSB9ICA9IHByb3BzXG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NOYW1lID0gW1xuICAgICAgQkFTRV9DTEFTUyxcbiAgICAgIGAkeyBCQVNFX0NMQVNTIH0tLSR7IF9pZDJjbGFzcyB9YCxcbiAgICAgIGAkeyBCQVNFX0NMQVNTIH0tLWlzLSR7IGZpZWxkVHlwZSB9YCxcbiAgICBdXG4gICAgaWYgKCB0eXBlICkgd3JhcHBlckNsYXNzTmFtZS5wdXNoKCBgJHtCQVNFX0NMQVNTfS0tdHlwZS0ke3R5cGV9YCApXG4gICAgaWYgKCBkYXJrQmcgKSB3cmFwcGVyQ2xhc3NOYW1lLnB1c2goIGAke0JBU0VfQ0xBU1N9LS1kYXJrLWJhY2tncm91bmRgIClcblxuICAgIGNvbnN0IHdyYXBwZXJQcm9wcyA9IGNyaW8oe1xuICAgICAgY2xhc3NOYW1lOiB3cmFwcGVyQ2xhc3NOYW1lLmpvaW4oIGAgYCApLFxuICAgIH0pXG4gICAgY29uc3QgbGFiZWxQcm9wcyA9IGNyaW8oe1xuICAgICAgY2xhc3NOYW1lOiBgJHtCQVNFX0NMQVNTfV9fbGFiZWxgLFxuICAgICAgaHRtbEZvcjogICAgX2lkLFxuICAgICAgbGFiZWw6ICAgICAgbGFiZWwsXG4gICAgfSlcbiAgICBjb25zdCBjb250cm9sUHJvcHMgPSBjcmlvKHtcbiAgICAgIGlkOiAgICAgICAgIF9pZCxcbiAgICAgIGNsYXNzTmFtZTogIGAkeyBCQVNFX0NMQVNTIH1fX2NvbnRyb2xgLFxuICAgICAgb25DaGFuZ2U6ICAgdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICBvbkJsdXI6ICAgICB0aGlzLmhhbmRsZUJsdXIsXG4gICAgICAuLi5yZXN0LFxuICAgIH0pXG5cbiAgICBpZiAoIGlzTmlsKHByb3BzLmRlZmF1bHRWYWx1ZSkgKSB7XG4gICAgICBjb250cm9sUHJvcHMudmFsdWUgPSBlbnN1cmVWYWx1ZSggcHJvcHMudmFsdWUgKVxuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB3cmFwcGVyUHJvcHMsXG4gICAgICBsYWJlbFByb3BzLFxuICAgICAgY29udHJvbFByb3BzLFxuICAgICAgaXNFbXB0eTogICAgZmFsc2UsXG4gICAgICBpc1RvdWNoZWQ6ICBmYWxzZSxcbiAgICAgIGlzUHJpc3RpbmU6IHRydWUsXG4gICAgfVxuICB9XG4gIC8vIGFjdGl2YXRlIGZsb2F0aW5nIGxhYmVsIG9ubHkgaWYgSlMgb24gY2xpZW50LXNpZGVcbiAgLy8g4oCiIHdpdGhvdXQgSlMgYWxsIGxhYmVsIHdpbGwgYmUgc3R1Y2sgYnkgZGVmYXVsdFxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGNvbnRyb2xQcm9wcyB9ICA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBjb250cm9sVmFsdWUgICAgICA9IGB2YWx1ZWAgaW4gY29udHJvbFByb3BzID8gY29udHJvbFByb3BzLnZhbHVlXG4gICAgICA6IGNvbnRyb2xQcm9wcy5kZWZhdWx0VmFsdWVcbiAgICBjb25zdCBpc0VtcHR5VmFsdWUgICAgICA9IGlzRW1wdHkoIGNvbnRyb2xWYWx1ZSApXG4gICAgdGhpcy5zZXRTdGF0ZSggcHJldlN0YXRlID0+IHtcbiAgICAgIHJldHVybiB7IGlzRW1wdHk6IGlzRW1wdHlWYWx1ZSB9XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMoIG5leHRQcm9wcywgcHJldlN0YXRlICkge1xuICAgIGNvbnN0IHsgY29udHJvbFByb3BzIH0gPSBwcmV2U3RhdGVcbiAgICBjb25zdCBpc1ZhbHVlVXBkYXRlICAgID0gbmV4dFByb3BzLnZhbHVlICAgIT09IGNvbnRyb2xQcm9wcy52YWx1ZVxuICAgIGNvbnN0IGlzT3B0aW9uc1VwZGF0ZSAgPSBuZXh0UHJvcHMub3B0aW9ucyAhPT0gY29udHJvbFByb3BzLm9wdGlvbnNcbiAgICBpZiAoICFpc1ZhbHVlVXBkYXRlICYmICFpc09wdGlvbnNVcGRhdGUgKSByZXR1cm4gbnVsbFxuICAgIGNvbnN0IHVwZGF0ZSA9IHtcbiAgICAgIGNvbnRyb2xQcm9wcyxcbiAgICAgIGlzRW1wdHk6IHByZXZTdGF0ZS5pc0VtcHR5LFxuICAgIH1cbiAgICBpZiAoIGlzT3B0aW9uc1VwZGF0ZSApIHtcbiAgICAgIHVwZGF0ZS5jb250cm9sUHJvcHMgPSB1cGRhdGUuY29udHJvbFByb3BzLnNldChgb3B0aW9uc2AsIG5leHRQcm9wcy5vcHRpb25zIClcbiAgICB9XG4gICAgaWYgKCBpc1ZhbHVlVXBkYXRlICkge1xuICAgICAgY29uc3QgdmFsdWUgICAgID0gZW5zdXJlVmFsdWUoIG5leHRQcm9wcy52YWx1ZSApXG4gICAgICB1cGRhdGUuaXNFbXB0eSAgPSBpc0VtcHR5KCB2YWx1ZSApXG4gICAgICB1cGRhdGUuY29udHJvbFByb3BzID0gdXBkYXRlLmNvbnRyb2xQcm9wcy5zZXQoYHZhbHVlYCwgdmFsdWUgKVxuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlXG4gIH1cblxuICAvLy0tLS0tIEVWRU5UU1xuXG4gIGhhbmRsZUNoYW5nZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpc1xuICAgIC8vIENhbid0IHVzZSBldmVudCBpbiBhc3luY1xuICAgIC8vIOKAoiBodHRwczovL3JlYWN0anMub3JnL2RvY3MvZXZlbnRzLmh0bWwjZXZlbnQtcG9vbGluZ1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGV2ZW50LnRhcmdldFxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc0VtcHR5OiAgICBpc0VtcHR5KCB2YWx1ZSApLFxuICAgICAgICBpc1ByaXN0aW5lOiBmYWxzZSxcbiAgICAgIH1cbiAgICB9KVxuICAgIC8vIGV4ZWN1dGUgb3JpZ2luYWwgY2FsbGJhY2tcbiAgICBpZiAoIHR5cGVvZiBwcm9wcy5vbkNoYW5nZSA9PT0gYGZ1bmN0aW9uYCApIHByb3BzLm9uQ2hhbmdlKCBldmVudCApXG4gIH1cbiAgaGFuZGxlQmx1ciggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gdGhpc1xuICAgIC8vIGlnbm9yZSBpZiBldmVudCBpcyBhIHdpbmRvdyBibHVyXG4gICAgaWYgKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLmNvbnRyb2xFbCApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICAgIHJldHVybiB7IGlzVG91Y2hlZDogdHJ1ZSB9XG4gICAgICB9KVxuICAgIH1cbiAgICAvLyBleGVjdXRlIG9yaWdpbmFsIGNhbGxiYWNrXG4gICAgaWYgKCB0eXBlb2YgcHJvcHMub25CbHVyID09PSBgZnVuY3Rpb25gICkgcHJvcHMub25CbHVyKCBldmVudCApXG4gIH1cblxuICAvLy0tLS0tIFJFTkRFUlxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSB0aGlzXG4gICAgY29uc3QgeyB3cmFwcGVyUHJvcHMsIGxhYmVsUHJvcHMsIGNvbnRyb2xQcm9wcywgaXNFbXB0eSwgaXNUb3VjaGVkIH0gPSBzdGF0ZVxuXG4gICAgY29uc3QgV3JhcHBlckNsYXNzTmFtZSA9IFtcbiAgICAgIHdyYXBwZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICBpc0VtcHR5ID8gYCR7IEJBU0VfQ0xBU1MgfS0taXMtZW1wdHlgIDogYCR7IEJBU0VfQ0xBU1MgfS0taXMtbm90LWVtcHR5YCxcbiAgICAgIGlzVG91Y2hlZCA/IGAkeyBCQVNFX0NMQVNTIH0tLWlzLXRvdWNoZWRgIDogYCR7IEJBU0VfQ0xBU1MgfS0taXMtbm90LXRvdWNoZWRgLFxuICAgIF0uam9pbiggYCBgIClcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17IFdyYXBwZXJDbGFzc05hbWUgfSA+XG4gICAgICAgIDxDb250cm9sQ29tcG9uZW50XG4gICAgICAgICAgY29udHJvbFJlZj17IGVsID0+IHsgdGhpcy5jb250cm9sRWwgPSBlbCB9IH1cbiAgICAgICAgICB7Li4uY29udHJvbFByb3BzfVxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWxcbiAgICAgICAgICBjbGFzc05hbWU9eyBsYWJlbFByb3BzLmNsYXNzTmFtZSB9XG4gICAgICAgICAgaHRtbEZvcj17IGxhYmVsUHJvcHMuaHRtbEZvciB9XG4gICAgICAgID5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17bGFiZWxQcm9wcy5sYWJlbH0gLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG4vLy8vLy9cbi8vIENPTVBPTkVOVFNcbi8vLy8vL1xuXG5leHBvcnQgY29uc3QgSW5wdXQgPSBmaWVsZFdyYXBwZXIoIHtcbiAgQ29udHJvbENvbXBvbmVudDogcHJvcHMgPT4ge1xuICAgIGNvbnN0IHsgY29udHJvbFJlZiwgLi4ucmVzdCB9ID0gcHJvcHNcbiAgICByZXR1cm4gPGlucHV0IHJlZj17IGNvbnRyb2xSZWYgfSB7Li4ucmVzdH0gLz5cbiAgfSxcbiAgZmllbGRUeXBlOiBgaW5wdXRgLFxufSlcblxuZXhwb3J0IGNvbnN0IFRleHRhcmVhID0gZmllbGRXcmFwcGVyKCB7XG4gIENvbnRyb2xDb21wb25lbnQ6IHByb3BzID0+IHtcbiAgICBjb25zdCB7IGNvbnRyb2xSZWYsIC4uLnJlc3QgfSA9IHByb3BzXG4gICAgcmV0dXJuIDxUZXh0YXJlYUF1dG9SZXNpemUgcmVmPXsgY29udHJvbFJlZiB9IHsuLi5yZXN0fSAvPlxuICB9LFxuICBmaWVsZFR5cGU6IGB0ZXh0YXJlYWAsXG59KVxuXG4vLyBzb21ldGltZSA8b3B0aW9ucz4gbGlzdCBkb2Vzbid0IGNvbWUgd2l0aCB0aGUgZXhwZWN0ZWQga2V5c1xuLy8g4oCiIG1ha2UgaXQgcG9zc2libGUgdG8gY29uZmlndXJlIHRoYXQgd2l0aCBvcHRpb25zS2V5cyBwcm9wXG5jb25zdCBrZXlEZWZhdWx0ID0gY3Jpbyh7dmFsdWU6IGB2YWx1ZWAsIGxhYmVsOiBgbGFiZWxgfSlcbmV4cG9ydCBjb25zdCBTZWxlY3QgPSBmaWVsZFdyYXBwZXIoIHtcbiAgQ29udHJvbENvbXBvbmVudDogcHJvcHMgPT4ge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgb3B0aW9uc0tleXMgPSBrZXlEZWZhdWx0LCBjb250cm9sUmVmLCAuLi5yZXN0fSA9IHByb3BzXG4gICAgY29uc3QgaGFzT3B0aW9ucyA9IEFycmF5LmlzQXJyYXkoIG9wdGlvbnMgKSAmJiBvcHRpb25zLmxlbmd0aCA+IDBcbiAgICByZXR1cm4gKFxuICAgICAgPHNlbGVjdCByZWY9eyBjb250cm9sUmVmIH0gey4uLnJlc3R9PnsgaGFzT3B0aW9ucyAmJiBvcHRpb25zLm1hcCggYyA9PiAoXG4gICAgICAgIDxvcHRpb25cbiAgICAgICAgICBrZXk9eyBgJHtjb250cm9sUmVmfS0ke2MuZ2V0KG9wdGlvbnNLZXlzLnZhbHVlKX1gIH1cbiAgICAgICAgICB2YWx1ZT17IGMuZ2V0KG9wdGlvbnNLZXlzLnZhbHVlKSB9XG4gICAgICAgID5cbiAgICAgICAgICB7IGMuZ2V0KG9wdGlvbnNLZXlzLmxhYmVsKSB9XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgKSl9PC8gc2VsZWN0PlxuICAgIClcbiAgfSxcbiAgZmllbGRUeXBlOiBgc2VsZWN0YCxcbn0pXG5cbmV4cG9ydCBmdW5jdGlvbiBDaGVja0JveCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgbmFtZSwgZGVmYXVsdENoZWNrZWQgfSA9IHByb3BzXG4gIGNvbnN0IGljb25OYW1lID0gZGVmYXVsdENoZWNrZWQgPyBgY2hlY2stYm94YCA6IGBjaGVjay1ib3gtb3V0bGluZS1ibGFua2BcbiAgcmV0dXJuIChcbiAgICA8bGFiZWwgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfSAke0JBU0VfQ0xBU1N9LS1pcy1jaGVja2JveGB9PlxuICAgICAgPGlucHV0XG4gICAgICAgIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2NvbnRyb2xgfVxuICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICBrZXk9e2Ake25hbWV9LSR7ZGVmYXVsdENoZWNrZWR9YH1cbiAgICAgICAgbmFtZT17IG5hbWUgfVxuICAgICAgICBkZWZhdWx0VmFsdWU9XCJ0cnVlXCJcbiAgICAgICAgZGVmYXVsdENoZWNrZWQ9eyBkZWZhdWx0Q2hlY2tlZCB9XG4gICAgICAvPlxuICAgICAgPEljb24gc3ZnSWQ9eyBpY29uTmFtZSB9IC8+XG4gICAgPC9sYWJlbD5cbiAgKVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgJy4vZm9ybS5zY3NzJ1xuZXhwb3J0IGNvbnN0IEJBU0VfQ0xBU1MgPSBgZm9ybWBcblxuZXhwb3J0IGZ1bmN0aW9uIEZvcm0oIHByb3BzICkge1xuICBjb25zdCB7IGlkLCBjbGFzc05hbWUsIGlzU2F2aW5nLCBjaGlsZHJlbiwgLi4ub3RoZXJzIH0gPSBwcm9wc1xuICBjb25zdCBGT1JNX0NMQVNTID0gWyBCQVNFX0NMQVNTLCBpZCBdXG4gIGlmICggaXNTYXZpbmcgKSBGT1JNX0NMQVNTLnB1c2goIGAke0JBU0VfQ0xBU1N9LS1pcy1zYXZpbmdgIClcbiAgaWYgKCBjbGFzc05hbWUgKSBGT1JNX0NMQVNTLnB1c2goIGNsYXNzTmFtZSApXG5cbiAgcmV0dXJuIChcbiAgICA8Zm9ybVxuICAgICAgaWQ9eyBpZCB9XG4gICAgICBtZXRob2Q9XCJwb3N0XCJcbiAgICAgIGNsYXNzTmFtZT17IEZPUk1fQ0xBU1Muam9pbihgIGApIH1cbiAgICAgIHsgLi4ub3RoZXJzIH1cbiAgICA+XG4gICAgICB7IGNoaWxkcmVuIH1cbiAgICA8L2Zvcm0+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRm9ybVxuXG5leHBvcnQgZnVuY3Rpb24gRm9ybUFjdGlvbnMoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fYWN0aW9uc2B9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsImltcG9ydCAgIFJlYWN0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgUHJvcFR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7IGNvbm5lY3QgICAgICAgICB9ICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgRm9ybWF0dGVkTnVtYmVyLCBGb3JtYXR0ZWREYXRlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCAgIG1hcmtlZCAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ21hcmtlZCdcblxuaW1wb3J0ICcuL2Zvcm1hdC5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBmb3JtYXRgXG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoIHZhbHVlICkge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUZsb2F0KCB2YWx1ZSwgMTAgKVxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKCB2YWx1ZSApID8gdmFsdWVcbiAgICA6ICFOdW1iZXIuaXNOYU4oIHBhcnNlZCApID8gcGFyc2VkXG4gICAgOiBudWxsXG59XG5cbi8vIHJlYWN0LWludGwgZG9jXG4vLyDigKIgaHR0cHM6Ly9naXRodWIuY29tL3lhaG9vL3JlYWN0LWludGwvd2lraS9Db21wb25lbnRzI2Zvcm1hdHRlZGRhdGVcbi8vIOKAoiBodHRwczovL2dpdGh1Yi5jb20veWFob28vcmVhY3QtaW50bC93aWtpL0NvbXBvbmVudHMjZm9ybWF0dGVkbnVtYmVyXG5cbmV4cG9ydCBmdW5jdGlvbiBBbW91bnRQcmVzKCBwcm9wcyApIHtcbiAgY29uc3QgeyB2YWx1ZSwgY3VycmVuY3ksIC4uLm90aGVyc30gPSBwcm9wc1xuICBvdGhlcnMuc3R5bGUgPSBgY3VycmVuY3lgXG4gIGNvbnN0IHNhZmVWYWx1ZSA9IHBhcnNlVmFsdWUoIHZhbHVlIClcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9ICR7QkFTRV9DTEFTU30tLWN1cnJlbmN5YH0+XG4gICAgICB7IHNhZmVWYWx1ZSA9PT0gbnVsbCA/IGDigJNgIDogPEZvcm1hdHRlZE51bWJlciB2YWx1ZT17IHZhbHVlIH0gY3VycmVuY3k9eyBjdXJyZW5jeSB9IHsuLi5vdGhlcnN9ICAvPiB9XG4gICAgPC9zcGFuPlxuICApXG59XG5cbmV4cG9ydCBjb25zdCBBbW91bnQgPSBjb25uZWN0KFxuICBzdGF0ZSA9PiAoe1xuICAgIGN1cnJlbmN5OiBzdGF0ZS5hY2NvdW50LmdldCggYHVzZXIuY3VycmVuY3lgICksXG4gIH0pXG4pKCBBbW91bnRQcmVzIClcblxuQW1vdW50LnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5udW1iZXIsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXROdW1iZXIoIHByb3BzICkge1xuICBjb25zdCB7IHZhbHVlLCB3cmFwcGVyUHJvcHMgPSB7fSwgLi4ub3RoZXJzfSA9IHByb3BzXG4gIGNvbnN0IHNhZmVWYWx1ZSA9IHBhcnNlVmFsdWUoIHZhbHVlIClcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9ICR7QkFTRV9DTEFTU30tLW51bWJlcmB9IHsuLi53cmFwcGVyUHJvcHN9PlxuICAgICAgeyBzYWZlVmFsdWUgPT09IG51bGwgPyBg4oCTYCA6IDxGb3JtYXR0ZWROdW1iZXIgdmFsdWU9eyB2YWx1ZSB9IHsuLi5vdGhlcnN9ICAvPiB9XG4gICAgPC9zcGFuPlxuICApXG59XG5leHBvcnQgeyBGb3JtYXROdW1iZXIgYXMgTnVtIH1cblxuZXhwb3J0IGZ1bmN0aW9uIFBlcmNlbnQoIHByb3BzICkge1xuICBjb25zdCB7IHZhbHVlLCBjbGFzc05hbWUsIC4uLm90aGVyc30gPSBwcm9wc1xuICBvdGhlcnMuc3R5bGUgPSBgcGVyY2VudGBcbiAgY29uc3Qgc2FmZVZhbHVlID0gcGFyc2VWYWx1ZSggdmFsdWUgKVxuICBjb25zdCBDT01QX0NMQVNTID0gW1xuICAgIEJBU0VfQ0xBU1MsXG4gICAgYCR7QkFTRV9DTEFTU30tLXBlcmNlbnRgLFxuICBdXG4gIGlmICggY2xhc3NOYW1lICkgQ09NUF9DTEFTUy5wdXNoKCBjbGFzc05hbWUgKVxuICByZXR1cm4gKFxuICAgIDxwIGNsYXNzTmFtZT17Q09NUF9DTEFTUy5qb2luKGAgYCl9PlxuICAgICAgeyBzYWZlVmFsdWUgPT09IG51bGwgPyBg4oCTYCA6IDxGb3JtYXR0ZWROdW1iZXIgdmFsdWU9eyB2YWx1ZSB9IHsuLi5vdGhlcnN9ICAvPiB9XG4gICAgPC9wPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXkoIHByb3BzICkge1xuICBpZiAoICFwcm9wcy52YWx1ZSApIHJldHVybiA8c3Bhbj7igJM8L3NwYW4+XG4gIHJldHVybiA8Rm9ybWF0dGVkRGF0ZSB2YWx1ZT17IHByb3BzLnZhbHVlIH0gLz5cbn1cbkRheS5wcm9wVHlwZXMgPSB7XG4gIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXJrZG93biggcHJvcHMgKSB7XG4gIGNvbnN0IHsgdGV4dCB9ICA9IHByb3BzXG4gIGNvbnN0IGlzVGV4dCAgICA9IHR5cGVvZiB0ZXh0ID09PSBgc3RyaW5nYFxuICBjb25zdCBfX2h0bWwgICAgPSBpc1RleHQgPyBtYXJrZWQoIHRleHQsIHticmVha3M6IHRydWV9ICkgOiBgYFxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWFya2Rvd25cIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbH19IC8+XG4gIClcbn1cblxuIiwiaW1wb3J0ICAgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgUHJvcFR5cGVzICAgICAgICAgIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0ICcuL2tleS1wcmVzZW50YXRpb24uc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgID0gYGtleS1wcmVzZW50YXRpb25gXG5cbmV4cG9ydCBmdW5jdGlvbiBQcmVzQnlLZXkoIHByb3BzICkge1xuICByZXR1cm4gKFxuICAgIDxkbCBjbGFzc05hbWU9eyBCQVNFX0NMQVNTIH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L2RsPlxuICApXG59XG5leHBvcnQgeyBQcmVzQnlLZXkgYXMgV3JhcHBlciB9XG5cbmV4cG9ydCBmdW5jdGlvbiBLZXlMYWJlbCggcHJvcHMgKSB7XG4gIHJldHVybiAoXG4gICAgPGR0IGNsYXNzTmFtZT17YCR7IEJBU0VfQ0xBU1N9X19sYWJlbGB9PlxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2Ugey4uLnByb3BzfSAvPlxuICAgIDwvZHQ+XG4gIClcbn1cbktleUxhYmVsLnByb3BUeXBlcyA9IHtcbiAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn1cbmV4cG9ydCB7IEtleUxhYmVsIGFzIExhYmVsIH1cblxuZXhwb3J0IGZ1bmN0aW9uIEtleVZhbHVlKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8ZGQgY2xhc3NOYW1lPXtgJHsgQkFTRV9DTEFTU31fX3ZhbHVlYH0+XG4gICAgICB7IHByb3BzLmNoaWxkcmVuIH1cbiAgICA8L2RkPlxuICApXG59XG5leHBvcnQgeyBLZXlWYWx1ZSBhcyBWYWx1ZSB9XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcbmltcG9ydCAgIHJvdW5kICAgICAgICAgICAgICBmcm9tICdsb2Rhc2gucm91bmQnXG5cbmltcG9ydCB7IFBlcmNlbnQgfSBmcm9tICcuL2Zvcm1hdCdcblxuaW1wb3J0ICcuL3BpZS1jaGFydC5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyA9IGBwaWUtY2hhcnRgXG5cbmZ1bmN0aW9uIGNvbXB1dGVUb3RhbCggdG90YWwsIHNsaWNlICkge1xuICBpZiAoICFOdW1iZXIuaXNGaW5pdGUoc2xpY2UudmFsdWUpICkgcmV0dXJuIDBcbiAgcmV0dXJuIHNsaWNlLnZhbHVlICsgdG90YWxcbn1cblxuLy8gZG9uJ3QgcmVwZWF0IHRoZSBkZWZzIG9uIGV2ZXJ5IFNWR1xuZXhwb3J0IGZ1bmN0aW9uIFBpZUNoYXJ0RGVmcyggcHJvcHMgKSB7XG4gIHJldHVybiAoXG4gICAgPHN2ZyB2aWV3Qm94PVwiLTEgLTEgMiAyXCIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fZGVmc2B9PlxuICAgICAgPGRlZnM+XG4gICAgICAgIDxjbGlwUGF0aCBpZD1cInBpZS1jbGlwLWFsbFwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCIwXCIgY3k9XCIwXCIgcj1cIjFcIiAvPlxuICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgPC9kZWZzPlxuICAgIDwvc3ZnPlxuICApXG59XG5cbmV4cG9ydCBjbGFzcyBQaWVDaGFydCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB0b3RhbCA6IDAgLFxuICAgICAgc2xpY2VzOiBbXSxcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKCBuZXh0UHJvcHMsIHByZXZTdGF0ZSApIHtcbiAgICBjb25zdCBzbGljZXMgID0gbmV4dFByb3BzLnNsaWNlcy5maWx0ZXIoIHNsaWNlID0+IHtcbiAgICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUoIHNsaWNlLnZhbHVlIClcbiAgICB9KVxuICAgIGNvbnN0IHRvdGFsICAgPSBzbGljZXMucmVkdWNlKCBjb21wdXRlVG90YWwsIDAgKVxuICAgIGlmICggdG90YWwgPT09IHByZXZTdGF0ZS50b3RhbCApIHJldHVybiBudWxsXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG90YWwsXG4gICAgICBzbGljZXM6ICBzbGljZXMubWFwKCBzbGljZSA9PiAoe1xuICAgICAgICAuLi5zbGljZSxcbiAgICAgICAgcGVyY2VudDogcm91bmQoc2xpY2UudmFsdWUgLyB0b3RhbCwgNCksXG4gICAgICB9KSksXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldENvb3JkaW5hdGVzKCBwZXJjZW50ICkge1xuICAgIGNvbnN0IHggPSBNYXRoLmNvcygyICogTWF0aC5QSSAqIHBlcmNlbnQpXG4gICAgY29uc3QgeSA9IE1hdGguc2luKDIgKiBNYXRoLlBJICogcGVyY2VudClcbiAgICByZXR1cm4gWyByb3VuZCh4LCA4KSwgcm91bmQoeSwgOCkgXVxuICB9XG5cbiAgY3JlYXRlU2xpY2VzKCkge1xuICAgIGNvbnN0IHsgc2xpY2VzIH0gPSB0aGlzLnN0YXRlXG4gICAgbGV0IGN1bXVsYXRpdmVQZXJjZW50ID0gMFxuICAgIHJldHVybiBzbGljZXNcbiAgICAubWFwKCAoc2xpY2UsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBbIHN0YXJ0WCwgc3RhcnRZIF0gPSBQaWVDaGFydC5nZXRDb29yZGluYXRlcyggY3VtdWxhdGl2ZVBlcmNlbnQgKVxuICAgICAgLy8gZWFjaCBzbGljZSBzdGFydHMgd2hlcmUgdGhlIGxhc3Qgc2xpY2UgZW5kZWQsIHNvIGtlZXAgYSBjdW11bGF0aXZlIHBlcmNlbnRcbiAgICAgIGN1bXVsYXRpdmVQZXJjZW50ID0gY3VtdWxhdGl2ZVBlcmNlbnQgKyBzbGljZS5wZXJjZW50XG4gICAgICBjb25zdCBbZW5kWCwgZW5kWV0gPSBQaWVDaGFydC5nZXRDb29yZGluYXRlcyggY3VtdWxhdGl2ZVBlcmNlbnQgKVxuICAgICAgLy8gaWYgdGhlIHNsaWNlIGlzIG1vcmUgdGhhbiA1MCUsIHRha2UgdGhlIGxhcmdlIGFyYyAodGhlIGxvbmcgd2F5IGFyb3VuZClcbiAgICAgIGNvbnN0IGxhcmdlQXJjRmxhZyA9IHNsaWNlLnBlcmNlbnQgPiAuNSA/IDEgOiAwXG4gICAgICBjb25zdCBwYXRoRGF0YSA9IFtcbiAgICAgICAgYE0gJHtzdGFydFh9ICR7c3RhcnRZfWAsXG4gICAgICAgIGBBIDEgMSAwICR7bGFyZ2VBcmNGbGFnfSAxICR7ZW5kWH0gJHtlbmRZfWAsXG4gICAgICAgIC8vIGluIGNhc2Ugd2Ugd2FudCB0byBtYWtlIGEgZmlsbGVkIHBpZS1jaGFydFxuICAgICAgICAvLyBgTCAwIDBgLFxuICAgICAgXS5qb2luKGAgYClcbiAgICAgIHJldHVybiA8cGF0aCBrZXk9eyBpbmRleCB9IGQ9eyBwYXRoRGF0YSB9IC8+XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZUxhYmVscygpIHtcbiAgICBjb25zdCB7IHNsaWNlcyB9ID0gdGhpcy5zdGF0ZVxuICAgIHJldHVybiAoXG4gICAgICA8b2wgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fbGlzdGB9PlxuICAgICAgICB7IHNsaWNlcy5tYXAoIChzbGljZSwgaW5kZXgpID0+IChcbiAgICAgICAgICA8bGkga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fbGlzdF9pdGVtYH0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2xhYmVsYH0+XG4gICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsgc2xpY2UubGFiZWwgfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8UGVyY2VudCBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X192YWx1ZWB9IHZhbHVlPXsgc2xpY2UucGVyY2VudCB9IC8+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L29sPlxuICAgIClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSB0aGlzXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtCQVNFX0NMQVNTfT5cbiAgICAgICAgPHAgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fdGl0bGVgfT5cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17IHByb3BzLnRpdGxlIH0gLz5cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZmlndXJlIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3BpZS13cmFwcGVyYH0+XG4gICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiLTEgLTEgMiAyXCIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcGllYH0+XG4gICAgICAgICAgICA8ZyBjbGlwUGF0aD1cInVybCgjcGllLWNsaXAtYWxsKVwiPlxuICAgICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMFwiIGN5PVwiMFwiIHI9XCIxXCIgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcGllLWJnYH0gLz5cbiAgICAgICAgICAgICAgeyB0aGlzLmNyZWF0ZVNsaWNlcygpIH1cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICB7IHByb3BzLmNoaWxkcmVuICYmIChcbiAgICAgICAgICAgIDxmaWdjYXB0aW9uIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX3BpZS1jYXB0aW9uYH0+XG4gICAgICAgICAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgICAgICAgICAgPC9maWdjYXB0aW9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZmlndXJlPlxuICAgICAgICB7IHRoaXMuY3JlYXRlTGFiZWxzKCkgfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgUHJvcFR5cGVzICAgICAgICAgICAgICBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHsgY29ubmVjdCAgICAgICAgICAgICAgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IEZvcm1hdHRlZEhUTUxNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0IHtcbiAgUGFwZXJTaGVldCxcbiAgUGFydHksXG4gIFBhcnR5VXNlcixcbiAgUmVmZXJlbmNlLFxuICBCZXR3ZWVuLFxuICBTdWJqZWN0LFxuICBNZW50aW9ucyxcbn0gZnJvbSAnLi4vbGF5b3V0L3BhcGVyLXNoZWV0J1xuaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuL2FsZXJ0cydcbmltcG9ydCB7IFByb2R1Y3RUYWJsZSB9IGZyb20gJy4uL3VpLXRhYmxlL3Byb2R1Y3RzJ1xuXG5leHBvcnQgZnVuY3Rpb24gUHJldmlldyggcHJvcHMgKSB7XG4gIGNvbnN0IHsgZG9jdW1lbnQsIHR5cGUgfSA9IHByb3BzXG4gIGNvbnN0IHByb2R1Y3RzID0gZG9jdW1lbnQuZ2V0KGBwcm9kdWN0c2ApXG4gIGlmICggIWRvY3VtZW50IHx8ICFwcm9kdWN0cyApIHJldHVybiBudWxsXG5cbiAgcmV0dXJuIChcbiAgICA8UGFwZXJTaGVldCBwcmV2aWV3PlxuICAgICAgPFJlZmVyZW5jZSB0eXBlPXsgdHlwZSB9IHByb2R1Y3Q9eyBkb2N1bWVudCB9IC8+XG4gICAgICA8QmV0d2Vlbj5cbiAgICAgICAgPFBhcnR5VXNlciAvPlxuICAgICAgICA8UGFydHkgdGl0bGU9XCJ0b1wiIHBlb3BsZT17IGRvY3VtZW50LmdldChgY3VzdG9tZXJgKSB9IC8+XG4gICAgICA8L0JldHdlZW4+XG4gICAgICA8U3ViamVjdCB2YWx1ZT17IGRvY3VtZW50LmdldChgbmFtZWApfSAvPlxuICAgICAgPFByb2R1Y3RUYWJsZVxuICAgICAgICByZWFkT25seVxuICAgICAgICBkb2N1bWVudD17IGRvY3VtZW50IH1cbiAgICAgIC8+XG4gICAgICA8TWVudGlvbnMgY29udGVudD17IGRvY3VtZW50LmdldChgJHt0eXBlfUNvbmZpZy5tZW50aW9uc2ApIH0gLz5cbiAgICA8L1BhcGVyU2hlZXQ+XG4gIClcbn1cblxuUHJldmlldy5wcm9wVHlwZXMgPSB7XG4gIGRvY3VtZW50OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHR5cGUgICAgOiBQcm9wVHlwZXMub25lT2YoW2BxdW90YXRpb25gLCBgaW52b2ljZWBdKSxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByaW50aW5nTm90aWNlKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8QWxlcnQgd2FybmluZyBjbGFzc05hbWU9XCJwcmludGluZy1ub3RpY2VcIj5cbiAgICAgIDxGb3JtYXR0ZWRIVE1MTWVzc2FnZSBpZD1cIl8ucHJpbnQtbm90aWNlXCIgLz5cbiAgICA8L0FsZXJ0PlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7IFBlcmNlbnQgfSBmcm9tICcuL2Zvcm1hdCdcblxuaW1wb3J0ICcuL3Byb2dyZXNzLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTID0gYHByb2dyZXNzYFxuXG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3MoIHByb3BzICkge1xuICBjb25zdCB7IG1heCwgdmFsdWUsIHRhYmxlTGF5b3V0IH0gPSBwcm9wc1xuICBjb25zdCBwZXJjZW50ICAgID0gdmFsdWUgLyBtYXhcbiAgY29uc3QgY3NzUGVyY2VudCA9IE1hdGgubWF4KCAwLCBNYXRoLm1pbigxMDAsIHBlcmNlbnQgKiAxMDApIClcbiAgY29uc3Qgd2lkdGggICAgICA9IE51bWJlci5pc05hTiggY3NzUGVyY2VudCApID8gYDBgIDogYCR7IGNzc1BlcmNlbnQgfSVgXG4gIGNvbnN0IENPTVBfQ0xBU1MgPSBbIEJBU0VfQ0xBU1MgXVxuICBpZiAoIHRhYmxlTGF5b3V0ICkgQ09NUF9DTEFTUy5wdXNoKCBgJHtCQVNFX0NMQVNTfS0tdGFibGUtbGF5b3V0YCApXG4gIHJldHVybiAoXG4gICAgPGRsIGNsYXNzTmFtZT17IENPTVBfQ0xBU1Muam9pbihgIGApIH0gPlxuICAgICAgPGR0IGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2xhYmVsYH0+XG4gICAgICAgIDxQZXJjZW50IHZhbHVlPXsgcGVyY2VudCB9IC8+XG4gICAgICA8L2R0PlxuICAgICAgPGRkXG4gICAgICAgIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2JhcmB9XG4gICAgICAgIHN0eWxlPXt7d2lkdGh9fVxuICAgICAgLz5cbiAgICA8L2RsPlxuICApXG59XG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0ICcuL3NwaW5uZXIuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgc3Bpbm5lcmBcbmNvbnN0IERFTEFZICAgICAgPSAxMDAwXG5cbmV4cG9ydCBjbGFzcyBTcGlubmVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoIHByb3BzICkge1xuICAgIHN1cGVyKCBwcm9wcyApXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNob3dTcGlubmVyOiBmYWxzZSxcbiAgICB9XG4gICAgdGhpcy5zaG93U3Bpbm5lciA9IHRoaXMuc2hvd1NwaW5uZXIuYmluZCggdGhpcyApXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnRpbWVySWQgPSBzZXRUaW1lb3V0KCB0aGlzLnNob3dTcGlubmVyLCBERUxBWSApXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnRpbWVySWQgJiYgY2xlYXJUaW1lb3V0KCB0aGlzLnRpbWVySWQgKVxuICAgIHRoaXMudGltZXJJZCA9IGZhbHNlXG4gIH1cblxuICBzaG93U3Bpbm5lcigpIHtcbiAgICB0aGlzLnRpbWVySWQgJiYgdGhpcy5zZXRTdGF0ZSggcHJldlN0YXRlID0+ICh7XG4gICAgICBzaG93U3Bpbm5lcjogdHJ1ZSxcbiAgICB9KSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBDT01QX0NMQVNTID0gWyBCQVNFX0NMQVNTIF1cbiAgICBpZiAoIHRoaXMuc3RhdGUuc2hvd1NwaW5uZXIgKSBDT01QX0NMQVNTLnB1c2goIGAke0JBU0VfQ0xBU1N9LS1pcy1sb2FkaW5nYCApXG4gICAgcmV0dXJuIChcbiAgICAgIDxhc2lkZSBjbGFzc05hbWU9eyBDT01QX0NMQVNTLmpvaW4oYCBgKSB9PlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cInNwaW5uZXIubG9hZGluZ1wiIC8+XG4gICAgICA8L2FzaWRlPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyXG4iLCJpbXBvcnQgICBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCdcblxuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gJy4uL3VpL2RhdGUtcGlja2VyJ1xuXG5pbXBvcnQgJy4vc3RlcHBlci5zY3NzJ1xuY29uc3QgQkFTRV9DTEFTUyAgICAgICAgICAgPSBgc3RlcHBlcmBcbmV4cG9ydCBjb25zdCBDSEVDS0VEX0NMQVNTID0gYCR7QkFTRV9DTEFTU30tLWlzLWFsbC1jaGVja2VkYFxuZXhwb3J0IGNvbnN0IFJBRElPX0NMQVNTICAgPSBgJHtCQVNFX0NMQVNTfV9faW5wdXRgXG5jb25zdCBDSEVDS0JPWF9OQU1FICAgICAgICA9IGBzdGVwcGVyLWRpc3BsYXktZm9ybWBcblxuZXhwb3J0IGNsYXNzIFN0ZXBwZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCBwcm9wcyApIHtcbiAgICBzdXBlciggcHJvcHMgKVxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnRTdGVwOiAgMCxcbiAgICAgIGlzQWxsQ2hlY2tlZDogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyggbmV4dFByb3BzLCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc3QgeyBzdGVwcyB9ID0gbmV4dFByb3BzXG4gICAgaWYgKCAhQXJyYXkuaXNBcnJheShzdGVwcykgKSByZXR1cm4gcHJldlN0YXRlXG4gICAgY29uc3QgY3VycmVudFN0ZXAgID0gU3RlcHBlci5nZXRTZWxlY3RlZEluZGV4KCBzdGVwcyApXG4gICAgY29uc3QgaXNBbGxDaGVja2VkID0gY3VycmVudFN0ZXAgPT09IHN0ZXBzLmxlbmd0aFxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50U3RlcCxcbiAgICAgIGlzQWxsQ2hlY2tlZCxcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0U2VsZWN0ZWRJbmRleCggc3RlcHMgKSB7XG4gICAgbGV0IGluZGV4ID0gMFxuICAgIGNvbnN0IGhhc09uZU1pc3NpbmdTdGVwID0gc3RlcHMuc29tZSggKHN0ZXAsIGkpID0+IHtcbiAgICAgIGNvbnN0IGhhc05vVmFsdWUgPSBzdGVwLnZhbHVlID09IG51bGwgfHwgc3RlcC52YWx1ZSA9PT0gYGBcbiAgICAgIGlmICggaGFzTm9WYWx1ZSApIGluZGV4ID0gaVxuICAgICAgcmV0dXJuIGhhc05vVmFsdWVcbiAgICB9KVxuICAgIHJldHVybiBoYXNPbmVNaXNzaW5nU3RlcCA/IGluZGV4IDogc3RlcHMubGVuZ3RoXG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoIGV2ZW50LCBpbmRleCApIHtcbiAgICAvLyB3ZSBkb24ndCB3YW50IHRoZSBldmVudCB0byBsZWFrIHRvIG1haW4gZm9ybVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgLy8gd2Ugc3RpbGwgd2FudCB0byBiZSBhYmxlIHRvIHNob3cgZXZlcnl0aGluZyBtYW51YWxseVxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50U3RlcDogIGluZGV4LFxuICAgICAgICBpc0FsbENoZWNrZWQ6IGZhbHNlLFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIoICkge1xuICAgIGNvbnN0IHsgc3RlcHMsIC4uLm90aGVyUHJvcHN9ICAgICAgID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgY3VycmVudFN0ZXAsIGlzQWxsQ2hlY2tlZCB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IENPTVBfQ0xBU1MgICAgICAgICAgICAgICAgICAgID0gWyBCQVNFX0NMQVNTIF1cbiAgICBpZiAoIGlzQWxsQ2hlY2tlZCApIENPTVBfQ0xBU1MucHVzaCggQ0hFQ0tFRF9DTEFTUyApXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgQ09NUF9DTEFTUy5qb2luKGAgYCkgfT5cbiAgICAgICAge1xuICAgICAgICAgIHN0ZXBzLm1hcCgoc3RlcCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxTdGVwXG4gICAgICAgICAgICAgIGtleT17IHN0ZXAua2V5IH1cbiAgICAgICAgICAgICAgY2hlY2tlZD17IGluZGV4ID09PSBjdXJyZW50U3RlcCB9XG4gICAgICAgICAgICAgIGluZGV4PXsgaW5kZXggfVxuICAgICAgICAgICAgICBzdGVwPXsgc3RlcCB9XG4gICAgICAgICAgICAgIGhhbmRsZUNoYW5nZT17IGV2ZW50ID0+IHRoaXMuaGFuZGxlQ2hhbmdlKCBldmVudCwgaW5kZXggKSB9XG4gICAgICAgICAgICAgIHsgLi4ub3RoZXJQcm9wcyB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gU3RlcCggcHJvcHMgKSB7XG4gIGNvbnN0IHsgc3RlcCwgY2hlY2tlZCwgaW5kZXgsIGhhbmRsZURheUNoYW5nZSB9ID0gcHJvcHNcbiAgY29uc3QgaWQgID0gYCR7IHN0ZXAua2V5IH0tJHsgaW5kZXggfWBcbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8aW5wdXQgaWQ9eyBpZCB9XG4gICAgICAgIG5hbWU9eyBDSEVDS0JPWF9OQU1FIH1cbiAgICAgICAgY2xhc3NOYW1lPXtgJHsgUkFESU9fQ0xBU1MgfWB9XG4gICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgIGNoZWNrZWQ9eyBjaGVja2VkIH1cbiAgICAgICAgb25DaGFuZ2U9eyBwcm9wcy5oYW5kbGVDaGFuZ2UgfVxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHsgQkFTRV9DTEFTUyB9X19zdGVwYH0gPlxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXtgJHsgQkFTRV9DTEFTUyB9X19idXR0b25gfSBodG1sRm9yPXtpZH0+XG4gICAgICAgICAgeyBzdGVwLmxhYmVsICYmIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXsgc3RlcC5sYWJlbCB9IC8+IH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2AkeyBCQVNFX0NMQVNTIH1fX2NvbnRlbnRgfT5cbiAgICAgICAgICA8RGF0ZVBpY2tlclxuICAgICAgICAgICAgdmFsdWU9eyBzdGVwLnZhbHVlIH1cbiAgICAgICAgICAgIG5hbWU9eyBzdGVwLmtleSB9XG4gICAgICAgICAgICBoYW5kbGVEYXlDaGFuZ2U9eyBlID0+IGhhbmRsZURheUNoYW5nZShlKSB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L1JlYWN0LkZyYWdtZW50PlxuICApXG59XG4iLCJpbXBvcnQgUmVhY3QgICAgICBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgUHJvcFR5cGVzICBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgJy4vc3ZnLWljb25zLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTID0gYHN2Zy1pY29uYFxuXG5leHBvcnQgZnVuY3Rpb24gSWNvbiggcHJvcHMgKSB7XG4gIGNvbnN0IHsgc3ZnSWQsIGNsYXNzTmFtZSwgLi4ub3RoZXIgfSA9IHByb3BzXG4gIGNvbnN0IENPTVBfQ0xBU1MgPSBjbGFzc05hbWVzKCBCQVNFX0NMQVNTLCBgaWNvbi0keyBzdmdJZCB9YCwgY2xhc3NOYW1lIClcbiAgcmV0dXJuIChcbiAgICA8c3ZnXG4gICAgICByb2xlPVwiaW1nXCJcbiAgICAgIGNsYXNzTmFtZT17IENPTVBfQ0xBU1MgfVxuICAgICAgey4uLm90aGVyfVxuICAgID5cbiAgICAgIDx1c2UgeGxpbmtIcmVmPXtgI2ljb24tJHsgc3ZnSWQgfWB9PjwvdXNlPlxuICAgIDwvc3ZnPlxuICApXG59XG5cbkljb24ucHJvcFR5cGVzID0ge1xuICBzdmdJZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufVxuXG5leHBvcnQgZGVmYXVsdCBJY29uXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCAnLi90YWJzLnNjc3MnXG5jb25zdCBCQVNFX0NMQVNTID0gYHRhYnNgXG5cbmV4cG9ydCBmdW5jdGlvbiBUYWJzKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17IEJBU0VfQ0xBU1MgfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvZGl2PlxuICApXG59XG5leHBvcnQgeyBUYWJzIGFzIFdyYXBwZXIgfVxuXG5leHBvcnQgY2xhc3MgVGFiTGlzdCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCBwcm9wcyApIHtcbiAgICBzdXBlciggcHJvcHMgKVxuXG4gICAgdGhpcy50YWJzSWRzID0gW11cbiAgICB0aGlzLm1ha2VUYWJzKClcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZDogMCxcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQoIHRoaXMgKVxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKCBldmVudCApIHtcbiAgICAvLyB3ZSBkb24ndCB3YW50IHRoZSBldmVudCB0byBsZWFrIHRvIG1haW4gZm9ybVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgLy8gY2hhbmdlIHRhYiBeXlxuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGV2ZW50LnRhcmdldFxuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiB7XG4gICAgICByZXR1cm4geyBzZWxlY3RlZDogcGFyc2VJbnQoIHZhbHVlLCAxMCApIH1cbiAgICB9KVxuICB9XG5cbiAgbWFrZVRhYnMoKSB7XG4gICAgbGV0IGNvdW50ID0gMFxuICAgIHRoaXMudGFic0NvbnRlbnQgPSBSZWFjdC5DaGlsZHJlbi5tYXAoIHRoaXMucHJvcHMuY2hpbGRyZW4sIGNoaWxkID0+IHtcbiAgICAgIGNvbnN0IGlzVGFiID0gY2hpbGQudHlwZSA9PT0gVGFiXG4gICAgICBpZiAoICFpc1RhYiApIHJldHVybiBjaGlsZFxuICAgICAgY291bnQgICAgID0gY291bnQgKyAxXG4gICAgICBjb25zdCBpZCAgPSBgdGFicy0ke2NvdW50fWBcbiAgICAgIHRoaXMudGFic0lkcy5wdXNoKCBpZCApXG4gICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KCBjaGlsZCwge2h0bWxGb3I6IGlkfSApXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuXG4gICAgICAgIHsgdGhpcy50YWJzSWRzLm1hcCggKGlkLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9faW5wdXRgfVxuICAgICAgICAgICAga2V5PXsgaWQgfVxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgIG5hbWU9XCJ0YWJzXCJcbiAgICAgICAgICAgIHZhbHVlPXsgaW5kZXggfVxuICAgICAgICAgICAgaWQ9eyBpZCB9XG4gICAgICAgICAgICBjaGVja2VkPXsgaW5kZXggPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWQgfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyB0aGlzLmhhbmRsZUNoYW5nZSB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSkgfVxuICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2xpc3RgfT5cbiAgICAgICAgICB7IHRoaXMudGFic0NvbnRlbnQgfVxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKVxuICB9XG59XG5leHBvcnQgeyBUYWJMaXN0IGFzIExpc3QgfVxuXG5leHBvcnQgZnVuY3Rpb24gVGFiTGlzdEhlYWRlciggcHJvcHMgKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19saXN0X2hlYWRlcmB9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9kaXY+XG4gIClcbn1cbmV4cG9ydCB7IFRhYkxpc3RIZWFkZXIgYXMgSGVhZGVyIH1cblxuZXhwb3J0IGZ1bmN0aW9uIFRhYiggcHJvcHMgKSB7XG4gIHJldHVybiAoXG4gICAgPGxhYmVsIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2xpc3RfdGFiYH0gey4uLnByb3BzfT5cbiAgICAgIHsgcHJvcHMuY2hpbGRyZW4gfVxuICAgIDwvbGFiZWw+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRhYlBhbmVsKCBwcm9wcyApIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9e2Ake0JBU0VfQ0xBU1N9X19wYW5lbGB9PlxuICAgICAgeyBwcm9wcy5jaGlsZHJlbiB9XG4gICAgPC9zZWN0aW9uPlxuICApXG59XG5leHBvcnQgeyBUYWJQYW5lbCBhcyBQYW5lbCB9XG4iLCJpbXBvcnQgICAgICBSZWFjdCAgICAgIGZyb20gJ3JlYWN0J1xuaW1wb3J0ICAgICAgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0ICAgICAgUHJvcFR5cGVzICBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0ICogYXMgSW50bCAgICAgICBmcm9tICdyZWFjdC1pbnRsJ1xuXG5pbXBvcnQgJy4vdGV4dGFyZWEtYXV0by1yZXNpemUuc2NzcydcbmNvbnN0IEJBU0VfQ0xBU1MgPSBgdGV4dGFyZWFgXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUF1dG9SZXNpemUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvciggcHJvcHMgKSB7XG4gICAgc3VwZXIoIHByb3BzIClcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYXV0b1Jlc2l6ZTogZmFsc2UsXG4gICAgfVxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCggdGhpcyApXG4gICAgdGhpcy5lbCA9IFJlYWN0LmNyZWF0ZVJlZigpXG4gIH1cbiAgLy8gYWN0aXZhdGUgYXV0b1Jlc2l6ZSBvbmx5IGlmIEpTIG9uIGNsaWVudC1zaWRlXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoIHByZXZTdGF0ZSA9PiAoeyBhdXRvUmVzaXplOiB0cnVlIH0pIClcbiAgICB0aGlzLnJlY29tcHV0ZVRleHRhcmVhU2l6ZSggKVxuICB9XG5cbiAgLy8tLS0tLSBFVkVOVFNcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHBsYWNlSG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKCBlICkge1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IHRoaXNcbiAgICB0aGlzLnJlY29tcHV0ZVRleHRhcmVhU2l6ZSggKVxuICAgIC8vIGV4ZWN1dGUgb3JpZ2luYWwgY2FsbGJhY2tcbiAgICBpZiAoIHR5cGVvZiBwcm9wcy5vbkNoYW5nZSA9PT0gYGZ1bmN0aW9uYCApIHByb3BzLm9uQ2hhbmdlKCBlIClcbiAgfVxuXG4gIC8vLS0tLS0gVVRJTFNcblxuICAvLyBjaGFuZ2UgdGV4dGFyZWEgc2l6ZSBpZiB0b28gbXVjaCBjb250ZW50XG4gIC8vIOKAoiBodHRwczovL21heGltaWxpYW5ob2ZmbWFubi5jb20vcG9zdHMvYXV0b3Jlc2l6aW5nLXRleHRhcmVhc1xuICByZWNvbXB1dGVUZXh0YXJlYVNpemUoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsLmN1cnJlbnRcbiAgICBjb25zdCBvcmlnaW5hbFJvd3MgPSBlbC5nZXRBdHRyaWJ1dGUoIGByb3dzYCApXG4gICAgLy8gZm9yY2UgYSBvbmUtbGluZXIgYnkgZGVmYXVsdFxuICAgIC8vIOKAoiB0aGlzIG1ha2UgaXQgZWFzeSB0byBjYWxjdWxhdGUgdGhlIHJpZ2h0IGhlaWdodFxuICAgIGVsLnNldEF0dHJpYnV0ZSggYHJvd3NgLCBgMWAgKVxuICAgIGVsLnN0eWxlLmhlaWdodCA9IGBhdXRvYFxuICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2VsLnNjcm9sbEhlaWdodH1weGBcbiAgICBlbC5zY3JvbGxUb3AgICAgPSBlbC5zY3JvbGxIZWlnaHRcbiAgICBlbC5zZXRBdHRyaWJ1dGUoIGByb3dzYCwgb3JpZ2luYWxSb3dzIClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgcGxhY2Vob2xkZXIgLCBvbkNoYW5nZSwgLi4ucmVzdCB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgYXV0b1Jlc2l6ZSB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IENPTVBfQ0xBU1MgICAgID0gY2xhc3NOYW1lcyhjbGFzc05hbWUsIHtcbiAgICAgIFsgQkFTRV9DTEFTUyBdOiB0cnVlLFxuICAgICAgWyBgJHtCQVNFX0NMQVNTfS0taXMtYXV0by1yZXNpemVgIF06IGF1dG9SZXNpemUsXG4gICAgfSlcbiAgICBjb25zdCBzaG93UGxhY2Vob2xkZXIgPSAoYXV0b1Jlc2l6ZSAmJiBwbGFjZWhvbGRlcilcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBDT01QX0NMQVNTIH0+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzTmFtZT17YCR7QkFTRV9DTEFTU31fX2ZpZWxkYH1cbiAgICAgICAgICBvbkNoYW5nZT17IHRoaXMuaGFuZGxlQ2hhbmdlIH1cbiAgICAgICAgICByZWY9eyB0aGlzLmVsIH1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgLz5cbiAgICAgICAge3Nob3dQbGFjZWhvbGRlciAmJiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPXtgJHtCQVNFX0NMQVNTfV9fcGxhY2Vob2xkZXJgfT5cbiAgICAgICAgICAgIDxJbnRsLkZvcm1hdHRlZE1lc3NhZ2UgaWQ9e3BsYWNlaG9sZGVyfSAvPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUZXh0YXJlYUF1dG9SZXNpemVcbiIsImltcG9ydCBpc05pbCBmcm9tICdsb2Rhc2guaXNuaWwnXG5cbi8vIGNvbnRyb2wgaWYgY29taW5nIGZyb20gYSBubyBJRCBtb2RlbCBpbnN0YW5jZeKAplxuLy8g4oCmd2UgdXBkYXRlIHRvIGFuIGluc3RhbmNlIHdpdGggSURcbmNvbnN0IGNoZWNrS2V5Q2hhbmdlID0ga2V5ID0+ICh7bmV4dCwgY3VycmVudH0pID0+IHtcbiAgY29uc3QgaXNMb2FkaW5nID0gY3VycmVudC5pc0xvYWRpbmcgfHwgbmV4dC5pc0xvYWRpbmdcbiAgaWYgKCBpc0xvYWRpbmcgKSByZXR1cm4gZmFsc2VcbiAgY29uc3QgY3VycmVudEtleSA9IGN1cnJlbnRbIGtleSBdXG4gIGNvbnN0IG5leHRLZXkgICAgPSBuZXh0WyBrZXkgXVxuICBjb25zdCBoYXNDdXJyZW50ID0gIWlzTmlsKCBjdXJyZW50S2V5IClcbiAgY29uc3QgaGFzTmV4dCAgICA9ICFpc05pbCggbmV4dEtleSApXG4gIC8vIHdhbnQgdG8gY2hhbmdlIHJvdXRlIGlmOlxuICAvLyDigKIgdGhlIHByZXZpb3VzIGRvZXNuJ3QgaGF2ZSBhbiBJRCAoY3JlYXRpb24pXG4gIC8vIOKAoiB0aGUgbmV4dCBvbmUgaGFzIChzdWNjZXNzZnVsIGNyZWF0aW9uISlcbiAgY29uc3QgaXNOZXdDcmVhdGlvbiA9ICFoYXNDdXJyZW50ICYmIGhhc05leHRcbiAgY29uc3QgaXNEaWZmZXJlbnRJZCA9IGhhc0N1cnJlbnQgJiYgaGFzTmV4dCAmJiBjdXJyZW50S2V5ICE9PSBuZXh0S2V5XG4gIHJldHVybiBpc05ld0NyZWF0aW9uID8gdHJ1ZSA6IGlzRGlmZmVyZW50SWRcbn1cblxuZXhwb3J0IGNvbnN0IGlzTmV3UXVvdGF0aW9uID0gY2hlY2tLZXlDaGFuZ2UoIGBpZGAgKVxuZXhwb3J0IGNvbnN0IGlzTmV3Q3VzdG9tZXIgID0gY2hlY2tLZXlDaGFuZ2UoIGBpZGAgKVxuZXhwb3J0IGNvbnN0IGlzTmV3SW52b2ljZSAgID0gY2hlY2tLZXlDaGFuZ2UoIGBpbnZvaWNlSWRgIClcbmV4cG9ydCBjb25zdCBpc0FyY2hpdmVkICAgICA9ICh7bmV4dCwgY3VycmVudH0pID0+ICFpc05pbCggbmV4dC5hcmNoaXZlZEF0IClcblxuY29uc3QgbmV3Q3VzdG9tZXIgPSB7XG4gIHRlc3Q6IGlzTmV3Q3VzdG9tZXIsXG4gIHRvICA6IG5leHQgPT4gYC9jdXN0b21lcnMvJHsgbmV4dC5pZCB9YCxcbn1cbmNvbnN0IG5ld1F1b3RhdGlvbiA9IHtcbiAgdGVzdDogaXNOZXdRdW90YXRpb24sXG4gIHRvICA6IG5leHQgPT4gYC9xdW90YXRpb25zLyR7IG5leHQuaWQgfWAsXG59XG5jb25zdCBhcmNoaXZlZFF1b3RhdGlvbiA9IHtcbiAgdGVzdDogaXNBcmNoaXZlZCxcbiAgdG8gIDogbmV4dCA9PiBgL2FyY2hpdmVzL3F1b3RhdGlvbnMvJHsgbmV4dC5pZCB9YCxcbn1cbmNvbnN0IG5ld0ludm9pY2UgPSB7XG4gIHRlc3Q6IGlzTmV3SW52b2ljZSxcbiAgdG8gIDogbmV4dCA9PiBgL2ludm9pY2VzLyR7IG5leHQuaW52b2ljZUlkIH1gXG59XG5jb25zdCBhcmNoaXZlZEludm9pY2UgPSB7XG4gIHRlc3Q6IGlzQXJjaGl2ZWQsXG4gIHRvICA6IG5leHQgPT4gYC9hcmNoaXZlcy9pbnZvaWNlcy8keyBuZXh0LmlkIH1gXG59XG5cbmNvbnN0IGNoZWNrUmVkaXJlY3Rpb25zID0gZGF0YXMgPT4gKGhhc1JlZGlyZWN0LCByZWRpcmVjdGlvbikgPT4ge1xuICBjb25zdCB7IG5leHQsIGN1cnJlbnQsIGhpc3RvcnksIHN0YXRpY0NvbnRleHQgfSA9IGRhdGFzXG4gIGlmICggaGFzUmVkaXJlY3QgKSByZXR1cm4gaGFzUmVkaXJlY3RcbiAgaWYgKCAhcmVkaXJlY3Rpb24udGVzdCh7bmV4dCwgY3VycmVudH0pICkgcmV0dXJuIGZhbHNlXG4gIGNvbnN0IHJlZGlyZWN0VXJsID0gcmVkaXJlY3Rpb24udG8oIG5leHQgKVxuICAvLyB1cGRhdGUgc3RhdGljIGNvbnRleHQgZm9yIHRoZSBzZXJ2ZXJcbiAgaWYgKCBzdGF0aWNDb250ZXh0ICkge1xuICAgIHN0YXRpY0NvbnRleHQuc3RhdHVzICA9IDMwMlxuICAgIHN0YXRpY0NvbnRleHQudXJsICAgICA9IHJlZGlyZWN0VXJsXG4gIH1cbiAgcmV0dXJuIGhpc3RvcnkucHVzaCggcmVkaXJlY3RVcmwgKVxufVxuXG5leHBvcnQgY29uc3QgcXVvdGF0aW9uID0gZGF0YXMgPT4gW1xuICBuZXdRdW90YXRpb24sXG4gIG5ld0ludm9pY2UsXG4gIGFyY2hpdmVkUXVvdGF0aW9uLFxuXS5yZWR1Y2UoIGNoZWNrUmVkaXJlY3Rpb25zKGRhdGFzKSwgZmFsc2UgKVxuXG5leHBvcnQgY29uc3QgaW52b2ljZSAgID0gZGF0YXMgPT4gW1xuICBhcmNoaXZlZEludm9pY2UsXG5dLnJlZHVjZSggY2hlY2tSZWRpcmVjdGlvbnMoZGF0YXMpLCBmYWxzZSApXG5cbmV4cG9ydCBjb25zdCBjdXN0b21lciAgPSBkYXRhcyA9PiBbXG4gIG5ld0N1c3RvbWVyLFxuXS5yZWR1Y2UoIGNoZWNrUmVkaXJlY3Rpb25zKGRhdGFzKSwgZmFsc2UgKVxuIiwiaW1wb3J0IGNyaW8gZnJvbSAnY3JpbydcblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kVG9OZWFyZXN0UXVhcnRlciggbnVtYmVyICkge1xuICBjb25zdCByb3VuZGVkID0gTWF0aC5yb3VuZCggbnVtYmVyICogNCApIC8gNFxuICByZXR1cm4gcGFyc2VGbG9hdCggcm91bmRlZC50b0ZpeGVkKDIpLCAxMCApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmZvcmNlTnVtYmVyKCBudW1iZXIgKSB7XG4gIG51bWJlciA9IHR5cGVvZiBudW1iZXIgIT09IGBudW1iZXJgID8gcGFyc2VGbG9hdCggbnVtYmVyLCAxMCApIDogbnVtYmVyXG4gIHJldHVybiBpc05hTiggbnVtYmVyICkgPyAwIDogbnVtYmVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9kdWN0VG90YWwoIHByb2R1Y3QgKSB7XG4gIGlmICggIXByb2R1Y3QuY2hlY2tlZCApIHJldHVybiAwXG4gIC8vIGRvbid0IG11dGF0ZSBwcm9kdWN0XG4gIGNvbnN0IGNsZWFuZWRQcm9kdWN0ID0ge31cbiAgO1tgcXVhbnRpdHlgLCBgcHJpY2VgXS5mb3JFYWNoKCBrZXkgPT4ge1xuICAgIGNsZWFuZWRQcm9kdWN0WyBrZXkgXSA9IGVuZm9yY2VOdW1iZXIoIHByb2R1Y3RbIGtleSBdIClcbiAgfSlcbiAgY29uc3QgeyBxdWFudGl0eSwgcHJpY2UgfSA9IGNsZWFuZWRQcm9kdWN0XG4gIHJldHVybiByb3VuZFRvTmVhcmVzdFF1YXJ0ZXIoIHF1YW50aXR5ICogcHJpY2UgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG90YWxzKCBkb2N1bWVudCApIHtcbiAgY29uc3QgeyBwcm9kdWN0cywgdGF4ID0gMCB9ID0gZG9jdW1lbnRcbiAgaWYgKCAhY3Jpby5pc0FycmF5KHByb2R1Y3RzKSApIHJldHVybiBkb2N1bWVudFxuICBjb25zdCB0YXhSYXRlICA9IGVuZm9yY2VOdW1iZXIoIHRheCApXG4gIGNvbnN0IHRvdGFsTmV0ID0gcHJvZHVjdHNcbiAgICAucmVkdWNlKCAoYWNjLCBwcm9kdWN0KSA9PiBhY2MgKyBwcm9kdWN0VG90YWwoIHByb2R1Y3QgKSwgMCApXG4gIGNvbnN0IHRvdGFsVGF4ID0gcm91bmRUb05lYXJlc3RRdWFydGVyKCB0b3RhbE5ldCAqIHRheFJhdGUgLyAxMDAgKVxuICBjb25zdCB0b3RhbCAgICA9IHRvdGFsTmV0ICsgdG90YWxUYXhcbiAgcmV0dXJuIHtcbiAgICB0b3RhbE5ldCxcbiAgICB0b3RhbFRheCxcbiAgICB0b3RhbCxcbiAgfVxufVxuIiwiaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC5tZXJnZSdcbmltcG9ydCBjcmlvIGZyb20gJ2NyaW8nXG5cbi8vIHtmb286IGBiYXJgfSBbe2ZvbzogYGJhcmB9LCB7Zm9vOiBgYmF6YH1dID0+IFt7Zm9vOiBgYmF6YH1dXG5leHBvcnQgY29uc3QgZmlsdGVyQXJyYXlXaXRoT2JqZWN0ID0gKCB7ZGVmYXVsdE9iamVjdCwgYXJyYXl9ICkgPT4ge1xuICBpZiAoICFjcmlvLmlzQXJyYXkoYXJyYXkpICkgcmV0dXJuIGNyaW8oW10pXG4gIGlmICggIWNyaW8uaXNPYmplY3QoZGVmYXVsdE9iamVjdCkgKSByZXR1cm4gYXJyYXlcbiAgY29uc3QgZGVmYXVsdEVudHJpZXMgPSBkZWZhdWx0T2JqZWN0LmVudHJpZXMoKVxuICBjb25zdCByZXN1bHQgPSBhcnJheVxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBvYmplY3QgaGFzIHRoZSBzYW1lIGtleXMgYXMgdGhlIGNvbXBhcmlzb25cbiAgICAubWFwKCBlbnRyeSA9PiBkZWZhdWx0T2JqZWN0Lm1lcmdlKG51bGwsIGVudHJ5KSApXG4gICAgLy8gVG8gYWNoaWV2ZSBlcXVhbCBjb21wYXJpc29ucywgY2FzdCB0byB0aGUgc2FtZSB0eXBlXG4gICAgLm1hcCggZW50cnkgPT4ge1xuICAgICAgZGVmYXVsdEVudHJpZXMuZm9yRWFjaCggKFtyZWZLZXksIHJlZlZhbHVlXSkgPT4ge1xuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHJlZlZhbHVlXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICByZXR1cm4gZW50cnkgPSBlbnRyeS5zZXQoIHJlZktleSwgcGFyc2VGbG9hdChlbnRyeVsgcmVmS2V5IF0sIDEwKSApXG4gICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSA9IGVudHJ5LnNldCggcmVmS2V5LCBgJHtlbnRyeVsgcmVmS2V5IF19YCApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gZW50cnlcbiAgICB9KVxuICAgIC5maWx0ZXIoIGVudHJ5ID0+IHtcbiAgICAgIC8vIGNoZWNrIHN0cmljdCBlcXVpdmFsZW5jZSBvdmVyIGFsbCB0aGUgZGVmYXVsdEtleXNcbiAgICAgIGNvbnN0IGlzU2FtZUFzRGVmYXVsdCA9IGRlZmF1bHRFbnRyaWVzXG4gICAgICAgIC5tYXAoIChbcmVmS2V5LCByZWZWYWx1ZV0pID0+IHJlZlZhbHVlID09PSBlbnRyeS5nZXQocmVmS2V5KSAgKVxuICAgICAgICAucmVkdWNlKCAoYWNjLCBjdXJyKSA9PiBhY2MgJiYgY3VyciwgdHJ1ZSApXG4gICAgICByZXR1cm4gIWlzU2FtZUFzRGVmYXVsdFxuICAgIH0pXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyQXJyYXlXaXRoT2JqZWN0XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzc25hbWVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZm9ybS1zZXJpYWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW50bFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpbnRsLWxvY2FsZXMtc3VwcG9ydGVkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlzb21vcnBoaWMtZmV0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianMtY29va2llXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtYm9keVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2EtY29tcHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWpzb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwia29hLWxvZ2dlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJrb2Etcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImtvYS1zdGF0aWNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoLmZsb3dcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoLmlzbmlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaC5tZXJnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2gucm91bmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWFya2VkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnQvbG9jYWxlL2VuLWdiXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudC9sb2NhbGUvZnJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9wLXR5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInF1ZXJ5LXN0cmluZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyY1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kYXktcGlja2VyL0RheVBpY2tlcklucHV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRheS1waWNrZXIvbW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaGVsbWV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWludGxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWNvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yb3V0ZXItZG9tXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXRodW5rXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcmlhbGl6ZS1qYXZhc2NyaXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNob3J0aWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsLWpvaW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9