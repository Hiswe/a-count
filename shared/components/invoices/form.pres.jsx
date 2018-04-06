import React from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'

import { Form      , FormActions } from '../ui/form.jsx'
import { Button                  } from '../ui/buttons.jsx'
import { Progress                } from '../ui/progress.jsx'
import {
  Tab,
  Tabs,
  TabList,
  TabListHeader,
  TabPanel,
} from '../ui/tabs.jsx'
import PrintInvoice      from './print.jsx'
import InvoiceFormHeader from './form.pres-header.jsx'
import InvoiceEvents     from './form.pres-events.jsx'

import './form.pres.scss'
export const BASE_CLASS    = `invoice-form`
export const FORM_ID       = BASE_CLASS

function InvoiceFormPres( props ) {
  const { formData, user, handle } = props
  const currency= user.get(`currency`)

  return (
    <Form
      isSaving={ props.isSaving }
      onChange={ handle.formChange }
      onSubmit={ handle.submit }
    >
      <input type="hidden" defaultValue={ formData.get(`id`) } name="id" />
      <Tabs>
        <TabList>
          <TabListHeader>
            <InvoiceFormHeader
              formData={ formData }
              currency={ currency }
            />
          </TabListHeader>
          <Tab>
            <FormattedMessage id="invoices.tab.payments" />
          </Tab>
          <Tab>
            <FormattedMessage id="invoices.tab.preview" />
          </Tab>
        </TabList>

        {/* PAYMENTS */}
        <TabPanel>
          <Progress
            max={   formData.get(`total`) }
            value={ formData.get(`totalPaid`) }
          />
          <InvoiceEvents
            formData={ formData }
            currency={ currency }
            handle={ handle  }
          />
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
