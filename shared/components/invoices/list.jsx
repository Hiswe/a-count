import React from 'react'
import { Link               } from 'react-router-dom'
import { connect            } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as invoices             from '../../ducks/invoices'
import * as TableUtils           from '../utils/tables'
import { Table, EmptyLine, Row } from '../ui/table.jsx'
import { Amount, Date }          from '../ui/format.jsx'
import { Progress }              from '../ui/progress.jsx'

function InvoiceRow( props ) {
  const { invoice, hideCustomer } = props
  const url = `/invoices/${invoice.id}`
  return (
    <Row>
      <td>
        <Link to={ url }>{ invoice.get( `reference` ) }</Link>
      </td>
      <td>
        <Link to={ url }>{ invoice.get( `name` ) }</Link>
      </td>
      {
        !hideCustomer && (
          <td>
            <Link to={`/customers/${invoice.customerId}`}>
              {invoice.get( `customer.name` )}
            </Link>
          </td>
        )
      }
      <td>
        <Link to={`/quotations/${invoice.get('quotation.id')}`}>
          {invoice.get(`quotation.reference`)}
        </Link>
      </td>
      <td className="is-number">
        <Amount
          value={invoice.get(`total`)}
        />
      </td>
      <td className="is-progress">
        <Progress
          tableLayout
          value={ invoice.get(`totalPaid`) }
          max={ invoice.get(`total`) }
        />
      </td>
    </Row>
  )
}

const defaultColumns = [
  {label: `table.header.id`        , sort: `index`           },
  {label: `table.header.name`      , sort: `name`            },
  {label: `table.header.customer`  , sort: `customer.name`   },
  {label: `table.header.quotation` , sort: `quotation.index` },
  {label: `table.amount`           , sort: `total`           },
  {label: `table.amount.paid`      , sort: `totalPaid`       },
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
