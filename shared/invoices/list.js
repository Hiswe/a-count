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
  const { invoice, hideCustomer } = props
  const url = `/invoices/${invoice.id}`
  return (
    <Row>
      <Cell>
        <Link to={ url }>{ invoice.get( `reference` ) }</Link>
      </Cell>
      <Cell>
        <Link to={ url }>{ invoice.get( `name` ) }</Link>
      </Cell>
      {
        !hideCustomer && (
          <Cell>
            <Link to={`/customers/${invoice.customerId}`}>
              {invoice.get( `customer.name` )}
            </Link>
          </Cell>
        )
      }
      <Cell>
        <Link to={`/quotations/${invoice.get('quotation.id')}`}>
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
  {label: `table.header.id`        , sort: `index`           , type: `id`       },
  {label: `table.header.name`      , sort: `name`            , type: `text`     },
  {label: `table.header.customer`  , sort: `customer.name`   , type: `customer` },
  {label: `table.header.quotation` , sort: `quotation.index` , type: `id`       },
  {label: `table.amount`           , sort: `total`           , type: `amount`   },
  {label: `table.amount.paid`      , sort: `totalPaid`       , type: `progress` },
  {label: false                    , sort: false             , type: `action`   },
]

function InvoiceList( props ) {
  const {
    invoices,
    hideOnEmpty  = false,
    hideCustomer = false,
    ...others
  } = props
  const hasInvoices = TableUtils.hasRows( invoices )
  if ( hideOnEmpty && !hasInvoices ) return null
  const columns     = hideCustomer ? defaultColumns.filter(TableUtils.filterColumn(`customer`))
    : defaultColumns
  const columnCount = columns.length
  return (
    <Table
      presentation
      columns={ columns }
      { ...others }
    >
      {
        !hasInvoices ? ( <EmptyLine colSpan={ columnCount } /> )
        : invoices.map( (invoice, i) => (
          <InvoiceRow
            key={ invoice.id }
            invoice={ invoice }
            hideCustomer={ hideCustomer }
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

export const CustomerInvoices = connect(
  state => ({
    invoices     : state.invoices.get(`active` )    ,
    meta         : state.invoices.get(`meta.active`),
    hideCustomer : true                             ,
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: invoices.getAllForCustomer,
  }, dispatch ))
)( InvoiceList )
