import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import {    FormActions   } from '../ui/form'
import {    Button        } from '../ui/buttons'
import {    Progress      } from '../ui/progress'
import {    Preview       } from '../ui/preview'
import * as Tabs            from '../ui/tabs'
import {    InvoiceHeader } from './header'
import   InvoiceEvents         from './form.pres-events'
import { ShowQuotation, ArchiveInvoice } from './buttons'

export const BASE_CLASS    = `invoice-form`

export default function InvoiceFormPres( props ) {
  const { invoice, handle } = props

  return (
    <Tabs.Wrapper>
      <Tabs.List>
        <Tabs.Header>
          <InvoiceHeader invoice={ invoice } />
        </Tabs.Header>
        <Tabs.Tab>
          <FormattedMessage id="invoices.tab.payments" />
        </Tabs.Tab>
        <Tabs.Tab>
          <FormattedMessage id="invoices.tab.preview" />
        </Tabs.Tab>
      </Tabs.List>

      {/* PAYMENTS */}
      <Tabs.Panel>
        <Progress
          max={   invoice.get(`total`) }
          value={ invoice.get(`totalPaid`) }
        />
        <InvoiceEvents
          invoice={ invoice }
          handle={ handle  }
        />
        <FormActions>
          <Button type="submit">
            <FormattedMessage id="invoices.button.save" />
          </Button>
          <ShowQuotation />
          <ArchiveInvoice danger invoice={ invoice } />
        </FormActions>
      </Tabs.Panel>

      {/* PREVIEW */}
      <Tabs.Panel>
        <Preview type="invoice" document={ invoice } />
      </Tabs.Panel>
    </Tabs.Wrapper>
  )
}
