import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import {    FormActions   } from '../ui/form'
import {    Button        } from '../ui/buttons'
import {    Progress      } from '../ui/progress'
import {    Preview       } from '../ui/preview'
import * as Tabs            from '../ui/tabs'
import { ShowQuotation, ArchiveInvoice } from './buttons'
import {    InvoiceHeader  } from './header'
import {    InvoiceEvents  } from './events-table'
import * as EventsEditable   from './events-editable'

export const BASE_CLASS    = `invoice-form`

export default function InvoiceFormPres( props ) {
  const { invoice, handle } = props
  const payments = invoice.get( `payments` )

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
        <InvoiceEvents invoice={ invoice }>
          <EventsEditable.Sent
            invoice={ invoice }
            handle={ handle }
          />
          { payments.map((payment, index) => (
            <EventsEditable.Payment
              key={ payment._id }
              payment={ payment }
              index={ index }
              notLast={ index < payments.length - 1 }
              handle={  handle }
            />
          ))}
        </InvoiceEvents>
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
