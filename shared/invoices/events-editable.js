import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import * as Table        from '../ui-table'
import {    DatePicker } from '../ui/date-picker'
import {    BtnIcon    } from '../ui/buttons'

function InvoiceEventSentEditable( props ) {
  const { invoice, handle } = props
  return (
    <Table.Row>
      <Table.Cell />
      <Table.Cell>
        <FormattedMessage id="invoices.event.sent" />
      </Table.Cell>
      <Table.Cell type="text"> – </Table.Cell>
      <Table.Cell>
        <DatePicker
          name="sendAt"
          value={ invoice.get(`sendAt`) }
          handleDayChange={ handle.dayChange }
        />
      </Table.Cell>
      <Table.Cell type="number"> – </Table.Cell>
      <Table.Cell />
    </Table.Row>
  )
}
export { InvoiceEventSentEditable as Sent }

function InvoiceEventPaymentEditable( props ) {
  const { payment, handle, count, notLast } = props
  return (
    <Table.Row key={payment.get(`_id`)} >
      <Table.Cell>
        <input
          type="hidden"
          name={`${payment._fieldPath}[_id]`}
          value={ payment.get(`_id`) }
        />
        { count }
      </Table.Cell>
      <Table.Cell>
        <FormattedMessage id="invoices.event.payment" />
      </Table.Cell>
      <Table.Cell>
        <input
          type="text"
          key={`${payment._fieldPath}-${payment.get(`_id`)}-message`}
          name={`${payment._fieldPath}[message]`}
          defaultValue={payment.get(`message`)}
        />
      </Table.Cell>
      <Table.Cell>
        <DatePicker
          name={`${payment._fieldPath}[date]`}
          value={ payment.get(`date`) }
          handleDayChange={ handle.dayChange }
        />
      </Table.Cell>
      <Table.Cell>
        <input
          type="number"
          key={`${payment._fieldPath}-${payment.get(`_id`)}`}
          name={`${payment._fieldPath}[amount]`}
          defaultValue={ payment.get(`amount`) }
        />
      </Table.Cell>
      <Table.Cell>
        {notLast&& <BtnIcon
          linkAlike
          onClick={ e => handle.removePayment(index, payment._fieldPath) }
          type="button"
          svgId="delete"
        />}
      </Table.Cell>
    </Table.Row>
  )
}
export { InvoiceEventPaymentEditable as Payment }
