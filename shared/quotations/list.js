import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { FormattedMessage   } from 'react-intl'
import { Link               } from 'react-router-dom'

import * as quotations from '../ducks/quotations'
import { Table, Row, Cell } from '../ui-table'
import { Amount, Day            } from '../ui/format'
import { Button                  } from '../ui/buttons'
import { CreateInvoice, ShowInvoice, ArchiveQuotation } from './buttons'

function QuotationRow( props ) {
  const { quotation } = props
  const id            = quotation.get( `id` )
  const isArchived    = quotation.get( `archivedAt` )
  const quotationUrl  = `${ isArchived  ? `/archives`: `` }/quotations/${id}`

  return (
    <Row>
      <Cell>
        <Link to={ quotationUrl }>
          { quotation.get(`reference`) }
        </Link>
      </Cell>
      <Cell>
        <Link to={ quotationUrl }>
          {quotation.get(`name`)}
        </Link>
      </Cell>
      <Cell>
        <Link to={`/customers/${quotation.get(`customerId`)}`}>
          {quotation.get(`customer.name`)}
        </Link>
      </Cell>
      <Cell>
        <Day value={quotation.get(`sendAt`)} />
      </Cell>
      <Cell>
        <Day value={quotation.get(`validatedAt`)} />
      </Cell>
      <Cell>
        <Day value={quotation.get(`signedAt`)} />
      </Cell>
      <Cell>
        <ShowInvoice linkAlike quotation={ quotation } />
        <CreateInvoice linkAlike quotation={ quotation } />
      </Cell>
      <Cell>
        <Amount value={quotation.get(`total`) } />
      </Cell>
      <Cell>
        <ArchiveQuotation icon linkAlike quotation={ quotation } />
      </Cell>
    </Row>
  )
}

const quotationColumns = [
  {id: `id`       , label: `table.header.id`        , sort: `index`         , type: `id`       },
  {id: `name`     , label: `table.header.name`      , sort: `name`          , type: `text`     },
  {id: `customer` , label: `table.header.customer`  , sort: `customer.name` , type: `customer` },
  {id: `sent`     , label: `table.header.sent`      , sort: `sendAt`        , type: `date`     },
  {id: `validated`, label: `table.header.validated` , sort: `validatedAd`   , type: `date`     },
  {id: `signed`   , label: `table.header.signed`    , sort: `signedAt`      , type: `date`     },
  {id: `invoice`  , label: `table.header.invoice`   , sort: `invoice.index` , type: `id`       },
  {id: `amount`   , label: `table.amount`           , sort: `total`         , type: `amount`   },
  {id: `archive`  , label: false                    , sort: false           , type: `action`   },
]

function QuotationsList( props ) {
  const {
    quotations = [],
    ...rest
  } = props
  return (
    <Table
      presentation
      columns={ quotationColumns }
      { ...rest }
    >
    { quotations.map( quotation => (
        <QuotationRow
          key={ quotation.id }
          quotation={ quotation }
        />
    ))}
    </Table>
  )
}

export const ActiveQuotations = connect(
  state => ({
    quotations  : state.quotations.get(`active`),
    meta        : state.quotations.get(`meta.active`),
    hideColumns : [`signed`, `invoice`],
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: quotations.listActive
  }, dispatch ))
)( QuotationsList )

export const ArchivedQuotations = connect(
  state => ({
    quotations  : state.quotations.get(`archived`)     ,
    meta        : state.quotations.get(`meta.archived`),
    hideColumns : [`archive`],
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: quotations.listArchived
  }, dispatch ))
)( QuotationsList )

export const QuotationsReadyToInvoice = connect(
  state => ({
    quotations:   state.quotations.get(`readyToInvoice`),
    meta:         state.quotations.get(`meta.readyToInvoice`),
    title:        `quotation.ready-to-invoice`,
    hideColumns : [ `sent`, `validated` ],
    hideOnEmpty:  true,
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: quotations.listReadyToInvoice
  }, dispatch ))
)(  QuotationsList )

export const CustomerQuotations = connect(
  state => ({
    quotations:   state.quotations.get(`active`),
    meta:         state.quotations.get(`meta.active`),
    hideColumns : [`customer`],
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: quotations.listForCustomer
  }, dispatch ))
)( QuotationsList )

export default QuotationsList
