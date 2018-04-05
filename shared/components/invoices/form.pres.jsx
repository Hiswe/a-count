import React from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { Form, FormActions } from '../ui/form.jsx'
import { Amount } from '../ui/format.jsx'
import { Button } from '../ui/buttons.jsx'
import { Main, Meta, Content } from '../layout/main.jsx'
import PrintInvoice from './print.jsx'

import './form.pres.scss'
export const BASE_CLASS = `invoice-form`
const HEADER_TITLE_CLASS = `${BASE_CLASS}__header_title`
const HEADER_CONTENT_CLASS = `${BASE_CLASS}__header_content`
export const FORM_ID = BASE_CLASS

function InvoiceFormHeader( props ) {
  const { formData, currency } = props
  return (
    <dl className={`${BASE_CLASS}__header`}>
      <dt className={ HEADER_TITLE_CLASS }>
        <FormattedMessage id="table.header.customer" />
      </dt>
      <dd className={ HEADER_CONTENT_CLASS }>
        <Link to={`/customers/${formData.get('customerId')}`}>
          {formData.get( `customer.name` )}
        </Link>
      </dd>
      <dt className={ HEADER_TITLE_CLASS }>
        <FormattedMessage id="table.header.quotation-associated" />
      </dt>
      <dd className={ HEADER_CONTENT_CLASS }>
        <Link to={`/quotations/${formData.get('quotation.id')}`}>
          {formData.get(`quotation.reference`)}
        </Link>
      </dd>
      <dt className={ HEADER_TITLE_CLASS }>
        <FormattedMessage id="table.amount" />
      </dt>
      <dd className={ HEADER_CONTENT_CLASS }>
        <Amount
          value={ formData.get(`_total.all`) }
          currency={ currency }
        />
      </dd>
      <dt className={ HEADER_TITLE_CLASS }>
        <FormattedMessage id="table.amount.left-to-pay" />
      </dt>
      <dd className={ HEADER_CONTENT_CLASS }>
        <Amount
          value={ -100 }
          currency={ currency }
        />
      </dd>
    </dl>
  )
}

function InvoiceFormPres( props ) {
  const { formData, user } = props

  return (
    <Form
      isSaving={ props.isSaving }
      onChange={ props.handleFormChange }
      onSubmit={ props.handleSubmit }
    >
      <Tabs>
        <TabList>
          <InvoiceFormHeader
            formData={formData}
            currency={user.get(`currency`)}
          />
          <Tab>
            <FormattedMessage id="invoices.tab.payments" />
          </Tab>
          <Tab>
            <FormattedMessage id="invoices.tab.preview" />
          </Tab>
        </TabList>

        {/* PAYMENTS */}
        <TabPanel>

          <FormActions>
            <Button type="submit">
              <FormattedMessage id="invoices.button.save" />
            </Button>
          </FormActions>
        </TabPanel>

        {/* PREVIEW */}
        <TabPanel>
          <PrintInvoice />
        </TabPanel>
      </Tabs>
    </Form>
  )
}

export default injectIntl( InvoiceFormPres )
