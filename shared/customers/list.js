import   React                from 'react'
import { Link               } from 'react-router-dom'
import { connect            } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as customers  from '../ducks/customers'
import * as TableUtils from '../utils/tables'
import { Table, EmptyLine, Row, Cell } from '../ui/table'
import { FormatNumber, Amount } from '../ui/format'
import { Progress } from '../ui/progress'

function CustomerRow( props ) {
  const { customer } = props
  const url      = `/customers/${customer.id}`
  return (
    <Row>
      <Cell>
        <Link to={ url }>{ customer.name }</Link>
      </Cell>
      <Cell >
        <FormatNumber value={customer.quotationsCount} />
      </Cell>
      <Cell>
        <Amount value={customer.quotationsTotal} />
      </Cell>
      <Cell>
        <FormatNumber value={customer.invoicesCount} />
      </Cell>
      <Cell>
        <Amount value={customer.get(`invoicesTotal`)} />
      </Cell>
      <Cell>
        <Progress
          tableLayout
          value={ customer.get(`invoicesTotalPaid`) }
          max={ customer.get(`invoicesTotal`) }
        />
      </Cell>
    </Row>
  )
}

const defaultColumns = [
  { id: `name`            , label: `table.header.name`              , sort: `name`     },
  { id: `quotations`      , label: `table.header.quotations`        , type: `number`   },
  { id: `quotations-total`, label: `table.header.cumulative-amount` , type: `amount`   },
  { id: `invoices`        , label: `table.header.invoices`          , type: `number`   },
  { id: `invoices-total`  , label: `table.header.cumulative-amount` , type: `amount`   },
  { id: `invoices-paid`   , label: `table.amount.paid`              , type: `progress` },
]

function CustomerList( props ) {
  const {
    customers,
    hideOnEmpty  = false,
    ...others
  } = props
  const hasCustomer = TableUtils.hasRows( customers )
  if ( hideOnEmpty && !hasCustomer ) return null
  const columns     = defaultColumns
  const columnCount = columns.length

  return (
    <Table
      presentation
      columns={ columns }
      { ...others }
    >
      {
        !hasCustomer ? ( <EmptyLine colSpan={ columnCount } /> )
        : props.customers.map( (customer, i) => (
          <CustomerRow key={customer.id} customer={customer} />
        ))
      }
    </Table>
  )
}

export const ActiveCustomers = connect(
  state => ({
    customers: state.customers.get(`active`      ),
    meta    :  state.customers.get(`meta.active` ),
  }),
  dispatch => ( bindActionCreators({
    handlePageSort: customers.getAll,
  }, dispatch ))
)( CustomerList )
