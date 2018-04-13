import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import * as quotations from '../../ducks/quotations.js'
import { Table, EmptyLine } from '../ui/table.jsx'
import { Amount, Date } from '../ui/format.jsx'
import { Button } from '../ui/buttons.jsx'
import ButtonArchiveQuotation from './button-archive-quotation.jsx'


function QuotationRow( props ) {
  const { quotation, showCustomer, currency, handle } = props
  const id = quotation.get( `id` )
  return (
    <tr>
      <td>
        <Link to={`/quotations/${id}`}>
          { quotation.get(`reference`) }
        </Link>
      </td>
      <td>
        <Link to={`/quotations/${id}`}>
          {quotation.get(`name`)}
        </Link>
      </td>
      {showCustomer && (
        <td>
          <Link to={`/customers/${quotation.get(`customerId`)}`}>
            {quotation.get(`customer.name`)}
          </Link>
        </td>
      )}
      <td>
        <p>
          <Date value={quotation.get(`sendAt`)} />
        </p>
      </td>
      <td>
        <p>
          <Date value={quotation.get(`validatedAt`)} />
        </p>
      </td>
      <td>
        <p>
          <Date value={quotation.get(`signedAt`)} />
        </p>
      </td>
      <td>
        { quotation._hasInvoice && (
          <Link to={`/invoices/${quotation.get('invoice.id')}`}>
            { quotation.get(`invoice.reference`) }
          </Link>
        )}
        {
          quotation._canCreateInvoice && (
            <Button
              onClick={ handle.createInvoice }
              value={ id }
            >
              <FormattedMessage id="quotation.invoice.create" />
            </Button>
          )
        }
      </td>
      <td className="is-number">
        <Amount value={quotation.get(`total`) } />
      </td>
      <td className="is-action">
        <ButtonArchiveQuotation icon quotation={ quotation } />
      </td>
    </tr>
  )
}

//----- ALL

const defaultColumns = [
  {label: `table.header.id`},
  {label: `table.header.name`},
  {label: `table.header.customer`},
  {label: `table.header.sent`},
  {label: `table.header.validated`},
  {label: `table.header.signed`},
  {label: `table.header.invoice`},
  {label: `table.amount`},
  {label: false },
]

class QuotationTable extends PureComponent {
  constructor( props ) {
    super( props )

    this.handleCreateInvoice = this.handleCreateInvoice .bind( this )
  }

  handleCreateInvoice( event ) {
    event.preventDefault()
    const id = event.target.value
    this.props.createInvoice({params: {id}})
  }

  render() {
    const { quotations, currency, showCustomer = true } = this.props
    const hasQuotations = Array.isArray( quotations ) && quotations.length > 0
    const columns = showCustomer ? defaultColumns
      : defaultColumns.filter( col => col.label !== `table.header.customer` )
    const columnCount = columns.length
    const handle = {
      createInvoice: this.handleCreateInvoice,
    }

    return (
      <Table
        columns={ columns }
        className="table--pres"
      >
      {
        !hasQuotations ? ( <EmptyLine colSpan={ columnCount } /> )
        : quotations.map( (q, i) => (
          <QuotationRow
            key={ q.id }
            showCustomer={ showCustomer }
            quotation={ q }
            handle={ handle }
          />
        ))
      }
      </Table>
    )

  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    createInvoice: quotations.createInvoice,
    archiveOne:    quotations.archiveOne,
  }, dispatch)
}

export default connect( null, dispatch2prop )( QuotationTable )

