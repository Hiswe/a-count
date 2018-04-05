import React from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'

import { Form      , FormActions } from '../ui/form.jsx'
import { Amount                  } from '../ui/format.jsx'
import { Button                  } from '../ui/buttons.jsx'
import { DatePicker              } from '../ui/date-picker.jsx'
import { Table                   } from '../ui/table.jsx'
import {
  Tab,
  Tabs,
  TabList,
  TabListHeader,
  TabPanel,
} from '../ui/tabs.jsx'
import   PrintInvoice   from './print.jsx'

import './form.pres.scss'
export const BASE_CLASS    = `invoice-form`
const HEADER_TITLE_CLASS   = `${BASE_CLASS}__header_title`
const HEADER_CONTENT_CLASS = `${BASE_CLASS}__header_content`
export const FORM_ID       = BASE_CLASS

function InvoiceFormHeader( props ) {
  const { formData, currency } = props
  return (
    <dl className={`${BASE_CLASS}__header`}>
      <dt className={ HEADER_TITLE_CLASS }>
        <FormattedMessage id="table.header.customer" />
      </dt>
      <dd className={ HEADER_CONTENT_CLASS }>
        <Link to={`/customers/${formData.get('customerId')}`}>
          {formData.get( `customer.name` )}
        </Link>
      </dd>
      <dt className={ HEADER_TITLE_CLASS }>
        <FormattedMessage id="table.header.quotation-associated" />
      </dt>
      <dd className={ HEADER_CONTENT_CLASS }>
        <Link to={`/quotations/${formData.get('quotation.id')}`}>
          {formData.get(`quotation.reference`)}
        </Link>
      </dd>
      <dt className={ HEADER_TITLE_CLASS }>
        <FormattedMessage id="table.amount" />
      </dt>
      <dd className={ HEADER_CONTENT_CLASS }>
        <Amount
          value={ formData.get(`_total.all`) }
          currency={ currency }
        />
      </dd>
      <dt className={ HEADER_TITLE_CLASS }>
        <FormattedMessage id="table.amount.left-to-pay" />
      </dt>
      <dd className={ HEADER_CONTENT_CLASS }>
        <Amount
          value={ -100 }
          currency={ currency }
        />
      </dd>
    </dl>
  )
}

const eventsColumns = [
  {label: `invoices.event.name`},
  {label: `invoices.event.date`, style:{ width: '10em'}},
  {label: `invoices.event.amount`},
  {label: ``},
]
function InvoiceEvents( props ) {
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

function InvoiceFormPres( props ) {
  const { formData, user, handle } = props

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
              currency={ user.get(`currency`) }
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
          <InvoiceEvents
            formData={ formData }
            handleDayChange={ handle.dayChange }
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
