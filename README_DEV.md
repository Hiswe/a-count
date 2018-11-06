# a-count – developer edition

here are some of the commands to run the project locally

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [universal application flow](#universal-application-flow)
- [requirements](#requirements)
- [dev stack](#dev-stack)
  - [acount-api](#acount-api)
  - [acount-nuxt](#acount-nuxt)
  - [acount-react](#acount-react)
- [commands](#commands)
  - [building dependencies](#building-dependencies)
  - [production server](#production-server)
  - [development server](#development-server)
  - [running the server and the app in 2 different terminals](#running-the-server-and-the-app-in-2-different-terminals)
  - [tests](#tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## universal application flow

the application flow is explained in this [blog post](https://hiswe.github.io/2018/08-universal-application/)

## requirements

- [node](http://nodejs.org/download/) >= 8.11.3
- [yarn](https://yarnpkg.com/lang/en/) >= 1.7.0
  - on a mac `brew install yarn --without-node`
- [PostgreSQL](https://www.postgresql.org/) >=9.6
  - create a clean **a-count** database
  - [postgresapp](http://postgresapp.com/) on a mac
  - [postico](https://eggerapps.at/postico/) to visualize
- [Redis](https://redis.io/) >= 3.2.0
  - on a mac `brew install redis` → `redis-server` to start
- SMTP server
  - like [mailcatcher](https://mailcatcher.me/)  
    on a mac `brew install ruby` → restart terminal → `gem install mailcatcher` → `mailcatcher` to start
  - or [MailDev](https://github.com/djfarrelly/MailDev)

## dev stack

### acount-api

- _server_ – [Koa 2](http://koajs.com/) for having a cleaner use of `async/await` in comparison to [express.js](https://expressjs.com/)
- _database querying_
  - [Sequelize 4](http://docs.sequelizejs.com/) for the main parts
  - [Squel](https://hiddentao.com/squel/) for handling SQL queries creation when the sequelize API can't get it (mostly `COUNT` & `SUM` queries)

### acount-nuxt

⚠️ work in progress

- _views_ – [Vue 2](https://vuejs.org/)
- _router_ – [Vue router](https://router.vuejs.org/)
- _application state_ – [Vuex](https://vuex.vuejs.org/)
- _server_ – [Koa 2](http://koajs.com/)

### acount-react

⚠️ deprecated

⚠️ in order to function needs

```json
{
  "react-router": "4.3.1",
  "react-router-config": "1.0.0-beta.4"
}
```

- _views_ – [React 16](https://reactjs.org/)
- _router_
  - [React router 4](https://reacttraining.com/react-router/)
  - [react-router-config 1](https://www.npmjs.com/package/react-router-config) for the universal support
- _application state_
  - [redux 4](https://redux.js.org/)
  - [redux thunk](https://www.npmjs.com/package/redux-thunk) for a better handling of asynchronous actions
  - [react redux](https://github.com/reactjs/react-redux) for a better integration with React
- _server_ – [Koa 2](http://koajs.com/)
- _build tools & testing_
  - [Babel 7](http://babeljs.io/) – still in beta but already working great
  - [Webpack 4](https://webpack.js.org/)
  - [Ava 1](https://github.com/avajs/ava) – still in beta also –\__–' waiting for Babel 7 to get out of beta for getting out ^_^

## commands

### building dependencies

```sh
yarn install
```

### production server

```
yarn build && yarn start
```

### development server

```
yarn dev
```

add some debug (with [node debuglog](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_debuglog_section)):

```
NODE_DEBUG=api,api:db,server yarn dev
```

available:

- api
- api:redis
- api:db
- api:db:query
- api:mailing
- server

### running the server and the app in 2 different terminals

For the API:

```
yarn workspace acount-api dev
```

For the Vue web-app:

```
yarn workspace acount-nuxt dev
```

For the React web-app:

```
yarn workspace acount-react dev
```

### tests

all workspace implements test

```
yarn workspace acount-api test
yarn workspace acount-nuxt test
yarn workspace acount-react test
```

running a single test

```
yarn test shared/ui/field.spec.js
```
