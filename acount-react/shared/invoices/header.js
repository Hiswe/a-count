import   React              from 'react'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import * as Format  from '../ui/format'
import * as KeyPres from '../ui/key-presentation'

export function InvoiceHeader( props ) {
  const { invoice } = props

  return (
    <KeyPres.Wrapper>
      <KeyPres.Label id="table.header.customer" />
      <KeyPres.Value>
        <Link to={`/customers/${invoice.get('customerId')}`}>
          {invoice.get( `customer.name` )}
        </Link>
      </KeyPres.Value>
      <KeyPres.Label id="table.header.quotation-associated" />
      <KeyPres.Value>
        <Link to={`/quotations/${invoice.get('quotation.id')}`}>
          { invoice.get(`quotation.reference`) }
        </Link>
      </KeyPres.Value>
      <KeyPres.Label id="table.amount" />
      <KeyPres.Value>
        <Format.Amount value={ invoice.get(`total`) } />
      </KeyPres.Value>
      <KeyPres.Label id="table.amount.paid" />
      <KeyPres.Value>
        <Format.Amount value={ invoice.get(`totalPaid`) } />
      </KeyPres.Value>
      <KeyPres.Label id="table.amount.left-to-pay" />
      <KeyPres.Value>
        <Format.Amount value={ invoice.get(`totalLeft`) } />
      </KeyPres.Value>
    </KeyPres.Wrapper>
  )
}
