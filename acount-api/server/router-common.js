const jwt = require('koa-jwt')
const merge = require('lodash.merge')

const config = require('./config')
const jwtStore = require('./jwt-store')
const addRelations = require('./utils/db-default-relations')
const User = require('./db/model-user')

module.exports = {
  root,
  jwt: jwt({
    secret: config.jwt.secret,
    key: `jwtData`,
  }),
  isAuthorizedRoute,
  getDefaultQueryParams,
}

/**
 * @api {get} /v1 root
 * @apiVersion 1.0.0
 * @apiName GetVersion
 * @apiDescription get some datas
 * @apiGroup Public
 *
 * @apiSuccess {string} name the name of the API
 * @apiSuccess {version} version the version of the API
 */
function root(version) {
  return (ctx, next) => {
    ctx.body = {
      name: config.NAME,
      version: version,
    }
  }
}

async function isAuthorizedRoute(ctx, next) {
  const { jwtData } = ctx.state
  log.auth(`AUTH – get JWT`, jwtData)
  const userId = await jwtStore.check(jwtData)
  log.auth(`AUTH – get user id`, userId)
  ctx.assert(userId, 401, `Not connected – token invalid`)

  const userQuery = addRelations.user({
    where: { id: userId },
  })
  const user = await User.findOne(userQuery)

  ctx.assert(user, 401, `Not connected – user not found`)
  ctx.state.userId = userId
  ctx.state.user = user
  await next()
}

//----- DEFAULT QUERY PARAMS

const defaultParams = {
  limit: 10,
  page: 1,
  sort: `updatedAt`,
  dir: `DESC`,
}
const sortOnRelation = /^[a-z]+\.[a-zA-Z]+$/
const parseSort = sort => {
  if (!sortOnRelation.test(sort)) return [sort]
  return sort.split(`.`)
}
const ensureDir = dir =>
  [`DESC`, `ASC`].includes(dir) ? dir : defaultParams.dir

async function getDefaultQueryParams(ctx, next) {
  const { query } = ctx.request
  const dbQuery = merge({}, defaultParams, query)
  dbQuery.limit = parseInt(dbQuery.limit, 10)
  dbQuery.page = parseInt(dbQuery.page, 10)
  dbQuery.offset = (dbQuery.page - 1) * dbQuery.limit
  // query will crash if ordering on a non valid column…
  // • but a this point we don't anything about the model
  dbQuery.order = [[...parseSort(dbQuery.sort), ensureDir(dbQuery.dir)]]
  // remove some unused keys
  const { dir, sort, ...others } = dbQuery
  ctx.state.dbQuery = others
  await next()
}
