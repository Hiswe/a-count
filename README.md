# a-count

Personal project for building an universal application.  
Demo: [https://a-count.herokuapp.com/](https://a-count.herokuapp.com/)  
Based on [codemancer code](https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Prerequisite](#prerequisite)
- [Tech view](#tech-view)
  - [Stack](#stack)
  - [Build tools](#build-tools)
- [Build the app on your computer](#build-the-app-on-your-computer)
  - [First and always step](#first-and-always-step)
  - [Production server](#production-server)
  - [Development server](#development-server)
    - [running the server and the app in 2 different terminals](#running-the-server-and-the-app-in-2-different-terminals)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

In a functional point of view:

- build a simple account app
- can create an account
- can manage customers
- can manage quotations/invoices
- can select a currency for **presentational purpose only**

In a tech point view, should support:

- should work without JS activated on the client
- clear separation of the app & the API (mono-repository)
- authentication
- i18n

As an exercice

- could integrate with some browser API (IntersectionObserver)
- could use some pre-build react components
- build some custom components
- should stay close to JS (no typescript, no experimental JS specs)
- shouldn't use too much external modules

## Prerequisite

- [node js](https://nodejs.org/en/) >= 8.11.2
- [yarn](https://yarnpkg.com/en/docs/install) >= 1.6.0
  - on a mac `brew install yarn --without-node`
- [lerna](https://lernajs.io/#getting-started) >= 2.11.0
  - `npm install --global lerna`
- [PostgreSQL](https://www.postgresql.org/) >=9.6 
  - create a clean __a-count__ database
  - [postgresapp](http://postgresapp.com/) on a mac
  - [postico](https://eggerapps.at/postico/) to visualize
- [Redis](https://redis.io/) >= 3.2.0
  - on a mac `brew install redis` → `redis-server` to start
- SMTP server
  - like [mailcatcher](https://mailcatcher.me/)
  - on a mac `brew install ruby` → restart terminal → `gem install mailcatcher` → `mailcatcher` to start

## Tech view

### Stack

- *views* – [React 16.3](https://reactjs.org/)
- *router* 
  - [React router 4](https://reacttraining.com/react-router/) 
  - [react-router-config 1](https://www.npmjs.com/package/react-router-config) for the universal support
- *application state* 
  - [redux 4](https://redux.js.org/)
  - [redux thunk](https://www.npmjs.com/package/redux-thunk) for a better handling of asynchronous actions
  - [react redux](https://github.com/reactjs/react-redux) for a better integration with React
- *server* – [Koa 2](http://koajs.com/) for having a cleaner use of `async/await` in comparison to [express.js](https://expressjs.com/)
- *database querying* 
  - [Sequelize 4](http://docs.sequelizejs.com/) for the main parts
  - [Squel](https://hiddentao.com/squel/) for handling SQL queries creation when the sequelize API can't get it (mostly `COUNT` & `SUM`  queries)

### Build tools

- [Babel 7](http://babeljs.io/) – still in beta but already working great
- [Webpack 4](https://webpack.js.org/) 
- [Ava 1](https://github.com/avajs/ava) – still in beta also –__–' waiting for Babel 7 to get out of beta for getting out ^_^

## Build the app on your computer

### First and always step 

```
lerna bootstrap
```

### Production server

```
yarn build && yarn start
```

### Development server

```
yarn run dev
```

add some debug (with [node debuglog](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_debuglog_section)): 

```
NODE_DEBUG=api,api:db,server yarn run dev
```

available:

- api
- api:redis
- api:db
- api:db:query
- api:mailing
- server

#### running the server and the app in 2 different terminals

For the API:

```
cd packages/api && yarn run dev
```

For the web-app:

```
cd packages/web-app && yarn run dev
```
