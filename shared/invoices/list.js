import React from 'react'
import { Link               } from 'react-router-dom'
import { connect            } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as invoices             from '../ducks/invoices'
import * as TableUtils           from '../utils/tables'
import { Table, EmptyLine, Row, Cell } from '../ui/table'
import { Amount, Date }          from '../ui/format'
import { Progress       } from '../ui/progress'
import { ArchiveInvoice } from './buttons'

function InvoiceRow( props ) {
  const { invoice } = props
  const isArchived  = invoice.get(`archivedAt`)
  const invoiceUrl  = `/invoices/${invoice.id}${ isArchived ? `/preview` : `` }`
  return (
    <Row>
      <Cell>
        <Link to={ invoiceUrl }>{ invoice.get( `reference` ) }</Link>
      </Cell>
      <Cell>
        <Link to={ invoiceUrl }>{ invoice.get( `name` ) }</Link>
      </Cell>
      <Cell>
        <Link to={`/customers/${invoice.customerId}`}>
          {invoice.get( `customer.name` )}
        </Link>
      </Cell>
      <Cell>
        <Link to={`/quotations/${invoice.get('quotation.id')}/preview`}>
          {invoice.get(`quotation.reference`)}
        </Link>
      </Cell>
      <Cell>
        <Amount
          value={invoice.get(`total`)}
        />
      </Cell>
      <Cell>
        <Progress
          tableLayout
          value={ invoice.get(`totalPaid`) }
          max={ invoice.get(`total`) }
        />
      </Cell>
      <Cell>
        <ArchiveInvoice icon linkAlike invoice={ invoice } />
      </Cell>
    </Row>
  )
}

const defaultColumns = [
  {id: `id`       , label: `table.header.id`        , sort: `index`           , type: `id`       },
  {id: `name`     , label: `table.header.name`      , sort: `name`            , type: `text`     },
  {id: `customer` , label: `table.header.customer`  , sort: `customer.name`   , type: `customer` },
  {id: `quotation`, label: `table.header.quotation` , sort: `quotation.index` , type: `id`       },
  {id: `amount`   , label: `table.amount`           , sort: `total`           , type: `amount`   },
  {id: `paid`     , label: `table.amount.paid`      , sort: `totalPaid`       , type: `progress` },
  {id: `archive`  , label: false                    , sort: false             , type: `action`   },
]

function InvoiceList( props ) {
  const {
    invoices,
    hideOnEmpty  = false,
    ...others
  } = props
  const hasInvoices = TableUtils.hasRows( invoices )
  if ( hideOnEmpty && !hasInvoices ) return null
  const columnCount = defaultColumns.length
  return (
    <Table
      presentation
      columns={ defaultColumns }
      { ...others }
    >
      {
        !hasInvoices ? ( <EmptyLine colSpan={ columnCount } /> )
        : invoices.map( (invoice, i) => (
          <InvoiceRow
            key={ invoice.id }
            invoice={ invoice }
          />
        ))
      }
    </Table>
  )
}

export const ActiveInvoices = connect(
  state => ({
    invoices: state.invoices.get(`active`     ),
    meta    : state.invoices.get(`meta.active`),
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: invoices.getAll,
  }, dispatch ))
)( InvoiceList )

export const ArchivedInvoices = connect(
  state => ({
    invoices    : state.invoices.get(`archived` ),
    meta        : state.invoices.get(`meta.archived`),
    hideColumns : [`archive`],
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: invoices.getArchived,
  }, dispatch ))
)( InvoiceList )

export const CustomerInvoices = connect(
  state => ({
    invoices     : state.invoices.get(`active` )    ,
    meta         : state.invoices.get(`meta.active`),
    hideColumns  : [`customer`],
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: invoices.getAllForCustomer,
  }, dispatch ))
)( InvoiceList )
