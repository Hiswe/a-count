import   React                from 'react'
import { Link               } from 'react-router-dom'
import { connect            } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as customers  from '../redux-ducks/customers'
import { Table, Row, Cell } from '../ui-table'
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

const customerColumns = [
  { id: `name`            , label: `table.header.name`              , sort: `name`     },
  { id: `quotations`      , label: `table.header.quotations`        , type: `number`   },
  { id: `quotations-total`, label: `table.header.cumulative-amount` , type: `amount`   },
  { id: `invoices`        , label: `table.header.invoices`          , type: `number`   },
  { id: `invoices-total`  , label: `table.header.cumulative-amount` , type: `amount`   },
  { id: `invoices-paid`   , label: `table.amount.paid`              , type: `progress` },
]

function CustomerList( props ) {
  const {
    customers = [],
    ...rest
  } = props

  return (
    <Table
      presentation
      columns={ customerColumns }
      { ...rest }
    >
    { customers.map( customer => (
        <CustomerRow key={customer.id} customer={customer} />
    ))}
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
