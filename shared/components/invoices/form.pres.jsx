import React from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { Form, FormActions } from '../ui/form.jsx'
import { Amount } from '../ui/format.jsx'
import { Button } from '../ui/buttons.jsx'
import { Main, Meta, Content } from '../layout/main.jsx'
import PrintInvoice from './print.jsx'

export const BASE_CLASS = `invoice-form`
export const FORM_ID = BASE_CLASS

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
          <Tab>
            <FormattedMessage id="invoices.tab.payments" />
          </Tab>
          <Tab>
            <FormattedMessage id="invoices.tab.preview" />
          </Tab>
        </TabList>
        <TabPanel>
          <p>client</p>
          <p>
            <Link to={`/customers/${formData.get('customerId')}`}>
              {formData.get( `customer.name` )}
            </Link>
          </p>
          <p>montant total</p>
          <p>
            <Amount
              value={ formData.get(`_total.all`) }
              currency={ user.get(`currency`) }
            />
          </p>
          <p>devis associé</p>
          <p>
            <Link to={`/quotations/${formData.get('quotation.id')}`}>
              {formData.get(`quotation.reference`)}
            </Link>
          </p>
        </TabPanel>
        <TabPanel>
          <PrintInvoice />
        </TabPanel>
        <FormActions>
          <Button type="submit">
            <FormattedMessage id="invoices.button.save" />
          </Button>
        </FormActions>
      </Tabs>
    </Form>
  )
}

export default injectIntl( InvoiceFormPres )
