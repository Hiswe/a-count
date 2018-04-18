import   React              from 'react'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Amount           } from '../ui/format'
import {
  PresByKey,
  KeyLabel,
  KeyValue
} from '../ui/key-presentation'


export default function InvoiceFormHeader( props ) {
  const { formData  } = props

  return (
    <PresByKey>
      <KeyLabel id="table.header.customer" />
      <KeyValue>
        <Link to={`/customers/${formData.get('customerId')}`}>
          {formData.get( `customer.name` )}
        </Link>
      </KeyValue>
      <KeyLabel id="table.header.quotation-associated" />
      <KeyValue>
        <Link to={`/quotations/${formData.get('quotation.id')}`}>
          {formData.get(`quotation.reference`)}
        </Link>
      </KeyValue>
      <KeyLabel id="table.amount" />
      <KeyValue>
        <Amount value={ formData.get(`total`) } />
      </KeyValue>
      <KeyLabel id="table.amount.paid" />
      <KeyValue>
        <Amount value={ formData.get(`totalPaid`) } />
      </KeyValue>
      <KeyLabel id="table.amount.left-to-pay" />
      <KeyValue>
        <Amount value={ formData.get(`totalLeft`) } />
      </KeyValue>
    </PresByKey>
  )
}
