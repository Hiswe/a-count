import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { FormActions } from '../ui/form.jsx'
import { Button      } from '../ui/buttons.jsx'
import { Progress    } from '../ui/progress.jsx'
import { Preview     } from '../ui/preview.jsx'
import {
  Tab,
  Tabs,
  TabList,
  TabListHeader,
  TabPanel,
} from '../ui/tabs.jsx'
import   InvoiceFormHeader     from './form.pres-header.jsx'
import   InvoiceEvents         from './form.pres-events.jsx'
import { ShowQuotation, ArchiveInvoice } from './buttons.jsx'

export const BASE_CLASS    = `invoice-form`

export default function InvoiceFormPres( props ) {
  const { formData, handle } = props

  return (
    <Tabs>
      <TabList>
        <TabListHeader>
          <InvoiceFormHeader formData={ formData } />
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
          handle={ handle  }
        />
        <FormActions>
          <Button type="submit">
            <FormattedMessage id="invoices.button.save" />
          </Button>
          <ShowQuotation />
          <ArchiveInvoice danger invoice={ formData } />
        </FormActions>
      </TabPanel>

      {/* PREVIEW */}
      <TabPanel>
        <Preview type="invoice" document={ formData } />
      </TabPanel>
    </Tabs>
  )
}
