'use strict'

const Router = require( 'koa-router' )

const { sequelize       } = require( './db'                        )
const   formatResponse    = require( './utils/format-response'     )
const   Customer          = require( './db/model-customer'         )
const   Quotation         = require( './db/model-quotation'        )
const   QuotationConfig   = require( './db/model-quotation-config' )
const   Invoice           = require( './db/model-invoice'          )
const   InvoiceConfig     = require( './db/model-invoice-config'   )

const prefix = `customers`
const router = new Router({prefix: `/${prefix}`})
module.exports = router

// Sequelize make it hard to have COUNT and SUM
// • just go with a raw query :D
function createQueryWithCountAndSum({userId, id}) {
  return `
    SELECT
      "customer"."id",
      "customer"."name",
      ( SELECT COUNT(*)
        FROM quotations as quotation
        WHERE "quotation"."customerId" = customer.id
      ) AS "quotationsCount",
      ( SELECT SUM("quotation"."total")
        FROM quotations as quotation
        WHERE "quotation"."customerId" = customer.id
      ) AS "quotationsTotal",
      ( SELECT COUNT(*)
        FROM invoices as invoice
        WHERE "invoice"."customerId" = customer.id
      ) AS "invoicesCount",
      ( SELECT SUM("invoice"."total")
        FROM invoices as invoice
        WHERE "invoice"."customerId" = customer.id
      ) AS "invoicesTotal",
      ( SELECT SUM("invoice"."totalLeft")
        FROM invoices as invoice
        WHERE "invoice"."customerId" = customer.id
      ) AS "invoicesTotalLeft",
      ( SELECT SUM("invoice"."totalPaid")
        FROM invoices as invoice
        WHERE "invoice"."customerId" = customer.id
      ) AS "invoicesTotalPaid"
    FROM customers AS customer
    WHERE
      ${ id ? `"customer"."id"=\'${id}\'`  : `TRUE` }
      AND "customer"."userId" = \'${userId}\'
      AND "customer"."isDeactivated" IS NOT true
  `
}

router
.get(`/`, async (ctx, next) => {
  const { userId }  = ctx.state
  const query = createQueryWithCountAndSum({userId})
  const list = await sequelize.query( query, {
    model: Quotation,
    raw: true,
  })
  // put response in a list key
  // • we will add pagination information later
  ctx.body = formatResponse( {list } )
})

//----- NEW

.get(`/new`, async (ctx, next) => {
  const modelTemplate = new Customer().toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse( modelTemplate )
})
.post(`/new`,  async (ctx, next) => {
  const { body }  = ctx.request
  // TODO: check if the user doesn't already have a customer with the same name
  body.userId     = ctx.state.user.id
  const customer  = await Customer.create( body )
  ctx.body        = formatResponse( customer )
})

//----- EDIT

.get(`/:id`, async (ctx, next) => {
  const { userId } = ctx.state
  const { id }     = ctx.params
  const query      = createQueryWithCountAndSum({
    userId, id,
  })
  const [customer]  = await sequelize.query( query, {
    raw:  true,
    type: sequelize.QueryTypes.SELECT,
  })
  // const customer   = await Customer.findOne( query )
  ctx.assert(customer, 404, `Customer not found`)
  ctx.body        = customer
})
.get(`/:id/quotations`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }      = ctx.params
  const query       = {
    where: {
      userId,
      customerId: id,
    },
    attributes: [
      `id`,
      `index`,
      `name`,
      `totalNet`,
      `totalTax`,
      `total`,
      `sendAt`,
      `validatedAt`,
      `archivedAt`,
      `signedAt`,
      `invoiceId`,
    ],
    include: [{
      model: QuotationConfig,
      attributes: [`startAt`, `prefix`],
    }]
  }
  const quotations  = await Quotation.findAll( query )
  ctx.body = {list: quotations}
})
.get(`/:id/invoices`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }      = ctx.params
  const query       = {
    where: {
      userId,
      customerId: id,
    },
    attributes: [
      `id`,
      `index`,
      `name`,
      `totalNet`,
      `totalTax`,
      `totalPaid`,
      `totalLeft`,
      `total`,
      `sendAt`,
    ],
    include: [{
      model: InvoiceConfig,
      attributes: [`startAt`, `prefix`],
    }]
  }
  const invoices  = await Invoice.findAll( query )
  ctx.body = { list: invoices }
})
.post(`/:id`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await Customer.findOne({
    where: { id, userId }
  })
  // TODO: check if the user doesn't already have a customer with the same name
  ctx.assert(instance, 404, `Customer not found`)
  const updated    = await instance.update( body )
  ctx.body        = updated
})
