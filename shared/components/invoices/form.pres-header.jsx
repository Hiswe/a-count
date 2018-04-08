import   React              from 'react'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Amount           } from '../ui/format.jsx'

const BASE_CLASS    = `invoice-form__header`
const TITLE_CLASS   = `${BASE_CLASS}_title`
const CONTENT_CLASS = `${BASE_CLASS}_content`

export default function InvoiceFormHeader( props ) {
  const { formData  } = props
  return (
    <dl className={ BASE_CLASS }>
      <dt className={ TITLE_CLASS }>
        <FormattedMessage id="table.header.customer" />
      </dt>
      <dd className={ CONTENT_CLASS }>
        <Link to={`/customers/${formData.get('customerId')}`}>
          {formData.get( `customer.name` )}
        </Link>
      </dd>
      <dt className={ TITLE_CLASS }>
        <FormattedMessage id="table.header.quotation-associated" />
      </dt>
      <dd className={ CONTENT_CLASS }>
        <Link to={`/quotations/${formData.get('quotation.id')}`}>
          {formData.get(`quotation.reference`)}
        </Link>
      </dd>
      <dt className={ TITLE_CLASS }>
        <FormattedMessage id="table.amount" />
      </dt>
      <dd className={ CONTENT_CLASS }>
        <Amount value={ formData.get(`total`) } />
      </dd>
      <dt className={ TITLE_CLASS }>
        <FormattedMessage id="table.amount.paid" />
      </dt>
      <dd className={ CONTENT_CLASS }>
        <Amount value={ formData.get(`totalPaid`) } />
      </dd>
      <dt className={ TITLE_CLASS }>
        <FormattedMessage id="table.amount.left-to-pay" />
      </dt>
      <dd className={ CONTENT_CLASS }>
        <Amount value={ formData.get(`totalLeft`) } />
      </dd>
    </dl>
  )
}
