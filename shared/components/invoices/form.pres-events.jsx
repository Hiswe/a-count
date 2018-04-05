import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import { Table      } from '../ui/table.jsx'
import { DatePicker } from '../ui/date-picker.jsx'

const eventsColumns = [
  {label: `invoices.event.name`},
  {label: `invoices.event.date`, style:{ width: '10em'}},
  {label: `invoices.event.amount`},
  {label: ``},
]

export default function InvoiceEvents( props ) {
  const { formData, handleDayChange } = props

  return (
    <Table columns={eventsColumns}>
      <tr>
        <td>
          <p><FormattedMessage id="invoices.event.sent" /></p>
        </td>
        <td>
          <DatePicker
            name="sendAt"
            value={ formData.get(`sendAt`) }
            handleDayChange={ handleDayChange }
          />
        </td>
        <td className="is-number"><p>–</p></td>
        <td></td>
      </tr>
      {formData.get(`payments`).map((payment, index) => (
        <tr key={payment.get(`_id`)} >
          <td>
            <input
              type="hidden"
              name={`${payment._fieldPath}[_id]`}
              value={ payment.get(`_id`) }
            />
            <p><FormattedMessage id="invoices.event.payment" /></p>
          </td>
          <td>
            <DatePicker
              name={`${payment._fieldPath}[date]`}
              value={ payment.get(`date`) }
              handleDayChange={ handleDayChange }
            />
          </td>
          <td>
            <input
              type="number"
              name={`${payment._fieldPath}[amount]`}
              defaultValue={ payment.get(`amount`) }
            />
          </td>
          <td></td>
        </tr>
      ))}
    </Table>
  )
}
