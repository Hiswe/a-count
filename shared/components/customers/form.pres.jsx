import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Main, Content} from '../layout/main.jsx'
import { Tabs, TabList, TabListHeader, Tab, TabPanel } from '../ui/tabs.jsx'
import { PaperSheet, Between, Party } from '../layout/paper-sheet.jsx'
import { Form, FormActions } from '../ui/form.jsx'
import { Button } from '../ui/buttons.jsx'
import { Input, Textarea } from '../ui/field.jsx'
import QuotationsList from '../quotations/list.jsx'
import InvoicesList from '../invoices/list.jsx'

import './form.pres.scss'
export const BASE_CLASS = `customer-form`
export const FORM_ID    = BASE_CLASS

 export default function CustomerFormPres( props ) {
  const {
    isSaving,
    handle,
    formData,
    user,
    quotations,
    invoices,
  } = props
  const isNew = formData.id == null
  const submitI18nId =  `customer.button.${isNew ? 'create' : 'update'}`

  return (
      <Form
        id={ `${BASE_CLASS}` }
        isSaving={ isSaving }
        onSubmit={ handle.submit }
        onChange={ handle.formChange }
      >
      { formData.id && <input type="hidden" defaultValue={formData.id} name="id" />  }
      <Tabs>
        <TabList>
          <TabListHeader>
            <Input
              name="name"
              label="field.name"
              value={ formData.name }
            />
            <Textarea
              name="address"
              label="field.address"
              value={ formData.address }
            />
          </TabListHeader>
          <Tab>
            <FormattedMessage id="_.quotations" />
          </Tab>
          <Tab>
            <FormattedMessage id="_.invoices" />
          </Tab>
          <Tab>
            <FormattedMessage id="customer.tab.configuration" />
          </Tab>
        </TabList>
        <TabPanel>
          <QuotationsList showCustomer={false} quotations={ quotations } />
        </TabPanel>
        <TabPanel>
          <InvoicesList showCustomer={false} invoices={ invoices } />
        </TabPanel>
        <TabPanel>
          <PaperSheet part="top">
            <Between>
              <Party title="from" {...user} />
              <Party title="to" {...formData} />
            </Between>
          </PaperSheet>
        </TabPanel>
        <FormActions>
          <Button type="submit">
            <FormattedMessage id={ submitI18nId } />
          </Button>
        </FormActions>
      </Tabs>
    </Form>
  )
}
