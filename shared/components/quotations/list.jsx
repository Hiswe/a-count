import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import * as quotations from '../../ducks/quotations.js'
import { Table, EmptyLine } from '../ui/table.jsx'
import { Amount, Date } from '../ui/format.jsx'

//----- TBODY

function QuotationStatus( props ) {
  return (
    <td>
      {props.status.message}
      <p>{props.status.date}</p>
    </td>
  )
}

function QuotationRow( props ) {
  const { quotation, currency, handleConvert } = props
  return (
    <tr>
      <td>
        <Link to={`/quotations/${quotation.id}`}>
          { quotation.reference }
        </Link>
      </td>
      <td>
        <Link to={`/quotations/${quotation.id}`}>
          {quotation.name}
        </Link>
      </td>
      <td>
        <Link to={`/customers/${quotation.customerId}`}>
          {quotation.customer.name}
        </Link>
      </td>
      <td>
        <p>
          <Date value={quotation.sendAt} />
        </p>
      </td>
      <td>
        <p>
          <Date value={quotation.validatedAt} />
        </p>
      </td>
      <td>
        <p>
          <Date value={quotation.signedAt} />
        </p>
      </td>
      <td>
        { quotation._hasInvoice && (
          <Link to={`/invoices/${quotation.invoice.id}`}>
            { quotation.get(`invoice.reference`) }
          </Link>
        )}
        {
          quotation._canBeTransformedToInvoice && (
            <a
              href={`/quotations/${quotation.id}/convert-to-invoice`}
              onClick={ event => {
                event.preventDefault()
                handleConvert()
              }}
            >
              <FormattedMessage id="table.convert-quotation-to-invoice" />
            </a>
          )
        }
      </td>
      <td className="is-number">
        <Amount
          value={quotation._total.all}
          currency={ currency }
        />
      </td>
    </tr>
  )
}
//----- ALL

function QuotationTable( props ) {
  const { quotations, currency } = props
  const hasQuotations = Array.isArray( quotations ) && quotations.length > 0
  return (
    <Table
      columns={[
        {label: `table.header.id`},
        {label: `table.header.name`},
        {label: `table.header.customer`},
        {label: `table.header.sent`},
        {label: `table.header.validated`},
        {label: `table.header.signed`},
        {label: `table.header.invoice`},
        {label: `table.amount`},
      ]}
      className="table--pres"
    >
    {
      !hasQuotations ? ( <EmptyLine colspan="8" /> )
      : quotations.map( (q, i) => (
        <QuotationRow
          key={ q.id }
          quotation={ q }
          currency={ currency }
          handleConvert={ () => props.convert( {params: {id: q.id}}) }
        />
      ))
    }
    </Table>
  )
}

function state2prop( state ) {
  return {
    quotations: state.quotations.get( `list` ),
    currency  : state.account.get( `current.currency` ),
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    convert: quotations.convert,
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( QuotationTable )

