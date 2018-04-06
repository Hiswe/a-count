import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import { Table      } from '../ui/table.jsx'
import { BtnIcon }    from '../ui/buttons.jsx'
import { DatePicker } from '../ui/date-picker.jsx'
import { Amount }     from '../ui/format.jsx'

const eventsColumns = [
  {label: `invoices.event.name`},
  {label: `invoices.event.date`,  style:{ width: '10em'}},
  {label: `invoices.event.amount`, style:{ width: '10em'}},
  {label: ``},
]

function InvoiceEventsFooter( props ) {
  const { formData, currency } = props

  return (
    <tfoot>
      <tr>
        <td colspan="2">
          <p>
            <FormattedMessage id="table.amount.paid" />
          </p>
        </td>
        <td>
          <Amount
            value={ formData.get(`totalPaid`) }
            currency={ currency }
          />
        </td>
        <td></td>
      </tr>
      <tr>
        <td colspan="2">
          <p>
            <FormattedMessage id="table.amount.left-to-pay" />
          </p>
        </td>
        <td>
          <Amount
            value={ formData.get(`totalLeft`) }
            currency={ currency }
          />
        </td>
        <td></td>
      </tr>
    </tfoot>
  )
}

export default function InvoiceEvents( props ) {
  const { formData, handle } = props
  const payments = formData.get(`payments`)

  return (
    <Table
      columns={ eventsColumns }
      footer={ <InvoiceEventsFooter {...props} /> }
    >
      <tr>
        <td>
          <p><FormattedMessage id="invoices.event.sent" /></p>
        </td>
        <td>
          <DatePicker
            name="sendAt"
            value={ formData.get(`sendAt`) }
            handleDayChange={ handle.dayChange }
          />
        </td>
        <td className="is-number"><p>–</p></td>
        <td></td>
      </tr>
      {payments.map((payment, index) => (
        <tr key={payment.get(`_id`)} >
          <td>
            <input
              type="hidden"
              name={`${payment._fieldPath}[_id]`}
              value={ payment.get(`_id`) }
            />
            <p>
              <FormattedMessage id="invoices.event.payment" />
            </p>
          </td>
          <td>
            <DatePicker
              name={`${payment._fieldPath}[date]`}
              value={ payment.get(`date`) }
              handleDayChange={ handle.dayChange }
            />
          </td>
          <td>
            <input
              type="number"
              key={`${payment._fieldPath}-${payment.get(`_id`)}`}
              name={`${payment._fieldPath}[amount]`}
              defaultValue={ payment.get(`amount`) }
            />
          </td>
          <td className="is-action">
            {(index < payments.length - 1 )&& <BtnIcon
              link
              onClick={ e => handle.removePayment(index, payment._fieldPath) }
              type="button"
              svgId="delete"
            />}
          </td>
        </tr>
      ))}
    </Table>
  )
}
