import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import * as Table        from '../ui-table'
import * as Format from '../ui/format'
import {    DatePicker } from '../ui/date-picker'
import {    BtnIcon    } from '../ui/buttons'

function InvoiceEventSentRead( props ) {
  const { invoice, handle } = props
  return (
    <Table.Row>
      <Table.Cell />
      <Table.Cell>
        <FormattedMessage id="invoices.event.sent" />
      </Table.Cell>
      <Table.Cell type="text"> – </Table.Cell>
      <Table.Cell>
        <Format.Day value={invoice.get(`sendAt`)} />
      </Table.Cell>
      <Table.Cell type="number"> – </Table.Cell>
    </Table.Row>
  )
}
export { InvoiceEventSentRead as Sent }

function InvoiceEventPaymentRead( props ) {
  const { payment, count } = props
  return (
    <Table.Row>
      <Table.Cell>
        { count }
      </Table.Cell>
      <Table.Cell>
        <FormattedMessage id="invoices.event.payment" />
      </Table.Cell>
      <Table.Cell type="text">
        { payment.get(`message`) }
      </Table.Cell>
      <Table.Cell type="date">
        <Format.Day value={ payment.get(`date`) } />
      </Table.Cell>
      <Table.Cell type="amount">
        <Format.Amount value={ payment.get(`amount`) } />
      </Table.Cell>
    </Table.Row>
  )
}
export { InvoiceEventPaymentRead as Payment }
