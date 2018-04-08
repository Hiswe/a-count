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

router
.get(`/`, async (ctx, next) => {
  const { userId }  = ctx.state
  const list = await sequelize.query(`
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
      "customer"."userId" = \'${userId}\'
      AND "customer"."isDeactivated" IS NOT true
  `, { model: Quotation, raw: true })
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
  const { userId }  = ctx.state
  const { id }      = ctx.params
  // exclude parameters broke the generated query
  // • make our own…
  const query       = `
  SELECT "customer"."id",
  "customer"."name",
  "customer"."address",
  "customer"."isDeactivated",
  "quotations"."id" AS "quotations.id",
  "quotations"."index" AS "quotations.index",
  "quotations"."totalNet" AS "quotations.totalNet",
  "quotations"."totalTax" AS "quotations.totalTax",
  "quotations"."total" AS "quotations.total",
  "quotations"."sendAt" AS "quotations.sendAt",
  "quotations"."validatedAt" AS "quotations.validatedAt",
  "quotations"."signedAt" AS "quotations.signedAt",
  "quotations"."archivedAt" AS "quotations.archivedAt",
  "quotations"."invoiceId" AS "quotations.invoiceId",
  "quotations->quotationConfig"."prefix" AS "quotations.quotationConfig.prefix",
  "quotations->quotationConfig"."startAt" AS "quotations.quotationConfig.startAt",
  "invoices"."id" AS "invoices.id",
  "invoices"."name" AS "invoices.name",
  "invoices"."index" AS "invoices.index",
  "invoices"."totalNet" AS "invoices.totalNet",
  "invoices"."totalTax" AS "invoices.totalTax",
  "invoices"."total" AS "invoices.total",
  "invoices"."totalLeft" AS "invoices.totalLeft",
  "invoices"."totalPaid" AS "invoices.totalPaid",
  "invoices"."sendAt" AS "invoices.sendAt",
  "invoices"."archivedAt" AS "invoices.archivedAt",
  "invoices->invoiceConfig"."prefix" AS "invoices.invoiceConfig.prefix",
  "invoices->invoiceConfig"."startAt" AS "invoices.invoiceConfig.startAt"
FROM "customers" AS "customer" LEFT OUTER
  JOIN "quotations" AS "quotations"
    ON "customer"."id" = "quotations"."customerId" LEFT OUTER
  JOIN "quotationConfigs" AS "quotations->quotationConfig"
    ON "quotations"."quotationConfigId" = "quotations->quotationConfig"."id" LEFT OUTER
  JOIN "invoices" AS "invoices"
    ON "customer"."id" = "invoices"."customerId" LEFT OUTER
  JOIN "invoiceConfigs" AS "invoices->invoiceConfig"
    ON "invoices"."invoiceConfigId" = "invoices->invoiceConfig"."id"
WHERE "customer"."id" = '${id}'
  AND "customer"."userId" = '${userId}'`

  const options = {
      hasJoin: true,
      include: [
      {
        model: Quotation,
        include: [{
          model: QuotationConfig,
        }]
      },
      {
        model: Invoice,
        include: [{
          model: InvoiceConfig,
        }]
      },
    ]
  }
  // use a private API to have a lovely JSON instead of a monolithic one
  // https://github.com/sequelize/sequelize/issues/1830#issuecomment-348012038
  Customer._validateIncludedElements( options )
  const [ customer ]    = await sequelize.query( query, options )
  ctx.assert(customer, 404, `Customer not found`)
  ctx.body        = customer
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
