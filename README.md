# concompte

Personal project for having quotations and invoice in an universal application.  
Based on [codemancer code](https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/)

## prerequisite

- [node js >= 8.10.0](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/) >=9.6 ([postgresapp](http://postgresapp.com/) on a mac)
- [Redis](https://redis.io/) (`brew install redis` on mac `redis-server` to start)
- SMTP server (like [mailcatcher](https://mailcatcher.me/): `brew install ruby` – restart terminal – `gem install mailcatcher` then `mailcatcher`)

## build

### first and always step 

```
npm install
```

### dev server

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

- https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
- https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4
- https://www.npmjs.com/package/react-isomorphic-render
- https://reactjsnews.com/isomorphic-react-in-real-life
- https://github.com/tomatau/breko-hub

#### components

- https://www.muicss.com/docs/v1/react/forms
- https://github.com/nfl/react-helmet

#### components architecture

- https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76

#### redux

- https://github.com/pburtchaell/redux-promise-middleware
- http://redux.js.org/

### test

- https://semaphoreci.com/community/tutorials/testing-react-components-with-ava
