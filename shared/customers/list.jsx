import   React                from 'react'
import { Link               } from 'react-router-dom'
import { connect            } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as customers  from '../ducks/customers'
import * as TableUtils from '../utils/tables'
import { Table, EmptyLine, Row } from '../ui/table.jsx'
import { FormatNumber, Amount } from '../ui/format.jsx'
import { Progress } from '../ui/progress.jsx'

function CustomerRow( props ) {
  const { customer } = props
  const url      = `/customers/${customer.id}`
  return (
    <Row>
      <td>
        <Link to={ url }>{ customer.name }</Link>
      </td>
      <td className="is-number">
        <FormatNumber value={customer.quotationsCount} />
      </td>
      <td className="is-number">
        <Amount value={customer.quotationsTotal} />
      </td>
      <td className="is-number">
        <FormatNumber value={customer.invoicesCount} />
      </td>
      <td className="is-number">
        <Amount value={customer.get(`invoicesTotal`)} />
      </td>
      <td className="is-progress">
        <Progress
          tableLayout
          value={ customer.get(`invoicesTotalPaid`) }
          max={ customer.get(`invoicesTotal`) }
        />
      </td>
    </Row>
  )
}

const defaultColumns = [
  { label: `table.header.name`              , sort: `name`,           },
  { label: `table.header.quotations`        ,                         },
  { label: `table.header.cumulative-amount` , style:{ width: `18em`}, },
  { label: `table.header.invoices`          ,                         },
  { label: `table.header.cumulative-amount` , style:{ width: `18em`}  },
  { label: `table.amount.paid`              ,                         },
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
