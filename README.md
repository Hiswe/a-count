# concompte

Personal project for building an universal application.  
Based on [codemancer code](https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Prerequisite](#prerequisite)
- [Tech view](#tech-view)
  - [Stack](#stack)
  - [Build tools](#build-tools)
- [Build the app on your computer](#build-the-app-on-your-computer)
  - [First and always step](#first-and-always-step)
  - [Dev server](#dev-server)
- [Documentation](#documentation)
  - [Universal Application](#universal-application)
  - [optimize performances](#optimize-performances)
    - [components](#components)
    - [components architecture](#components-architecture)
  - [test](#test)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

In a functional point of view:

- build a simple account app
- can create an account
- can manage customers
- can manage quotations/invoices
- can select a currency for **presentational purpose only**

In a tech point view, should support:

- should work without JS activated on the client
- clear separation of the app & the API
- authentication
- i18n

As an exercice

- could integrate with some browser API (IntersectionObserver)
- could use some pre-build react components
- build some custom components
- should stay close to JS (no typescript, no experimental JS specs)
- shouldn't use too much external modules

## Prerequisite

- [node js](https://nodejs.org/en/) >= 8.10.0
- [PostgreSQL](https://www.postgresql.org/) >=9.6 
  - create a clean __concompte__ database
  - [postgresapp](http://postgresapp.com/) on a mac
  - [postico](https://eggerapps.at/postico/) to visualize
- [Redis](https://redis.io/) 
  - on a mac `brew install redis` → `redis-server` to start
- SMTP server
  - like [mailcatcher](https://mailcatcher.me/)
  - on a mac `brew install ruby` → restart terminal → `gem install mailcatcher` → `mailcatcher` to start

## Tech view

### Stack

- *views* – [React 16.3](https://reactjs.org/)
- *router* – [React router 4](https://reacttraining.com/react-router/) & [react-router-config 1](https://www.npmjs.com/package/react-router-config) for the universal support
- *application state* – [redux 3](https://redux.js.org/) in conjonction with:
  - [redux thunk](https://www.npmjs.com/package/redux-thunk) for a better handling of asynchronous actions
  - [react redux](https://github.com/reactjs/react-redux) for a better integration with React
- *server* – [Koa 2](http://koajs.com/) for having a cleaner use of `async/await` in comparison to [express.js](https://expressjs.com/)
- *database querying* 
  - [Sequelize 4](http://docs.sequelizejs.com/) for the main parts
  - [Squel](https://hiddentao.com/squel/) for handling SQL queries creation when the sequelize API can't get it (mostly `COUNT` & `SUM`  queries)

### Build tools

- [Babel 7](http://babeljs.io/) – still in beta but already working great
- [Webpack 4](https://webpack.js.org/) 
- [Ava 1](https://github.com/avajs/ava) – still in beta also –__-' waiting for Babel 7 to get out of beta for getting out ^_^

## Build the app on your computer

### First and always step 

```
npm install
```

### Dev server

```
npm run dev
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

## Documentation

### Universal Application

- https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4
- https://www.npmjs.com/package/react-isomorphic-render
- https://reactjsnews.com/isomorphic-react-in-real-life
- https://github.com/tomatau/breko-hub

### optimize performances

- https://reactjsnews.com/how-to-make-your-react-apps-10x-faster

#### components

- https://github.com/nfl/react-helmet

#### components architecture

- https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76


### test

- https://semaphoreci.com/community/tutorials/testing-react-components-with-ava
