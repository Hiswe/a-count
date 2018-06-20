import React from 'react'
import { FormattedMessage } from 'react-intl'

import { FormActions } from '../ui/form'
import { Button } from '../ui/buttons'
import { Progress } from '../ui/progress'
import * as Document from '../ui/preview'
import * as Tabs from '../ui/tabs'
import * as Field from '../ui/field'
import { ShowQuotation, ArchiveInvoice } from './buttons'
import { InvoiceHeader } from './header'
import { InvoiceEvents } from './events-table'
import * as EventsEditable from './events-editable'

export const BASE_CLASS = `invoice-form`

export default function InvoiceFormPres(props) {
  const { invoice, handle } = props
  const payments = invoice.get(`payments`)
  const mentions =
    invoice.get(`mentions`) || invoice.get(`invoiceConfig.mentions`)

  return (
    <Tabs.Wrapper>
      <Tabs.List>
        <Tabs.Header>
          <InvoiceHeader invoice={invoice} />
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
        <Progress max={invoice.get(`total`)} value={invoice.get(`totalPaid`)} />
        <InvoiceEvents invoice={invoice}>
          <EventsEditable.Sent invoice={invoice} handle={handle} />
          {payments.map((payment, index) => (
            <EventsEditable.Payment
              key={payment._id}
              payment={payment}
              index={index}
              notLast={index < payments.length - 1}
              handle={handle}
            />
          ))}
        </InvoiceEvents>
        <div style={{ marginTop: `var(--s-two-gutter)` }}>
          <Field.Textarea
            name="mentions"
            label="field.mentions"
            value={mentions}
          />
        </div>
        <FormActions>
          <Button type="submit">
            <FormattedMessage id="invoices.button.save" />
          </Button>
          <ShowQuotation />
          <ArchiveInvoice danger invoice={invoice} />
        </FormActions>
      </Tabs.Panel>

      {/* PREVIEW */}
      <Tabs.Panel>
        <Document.Preview
          type="invoice"
          document={invoice}
          className={`${Document.BASE_CLASS}--page-invoice-preview`}
        />
      </Tabs.Panel>
    </Tabs.Wrapper>
  )
}
