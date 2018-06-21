import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import pageFetchActions from '../page-fetch-actions'
import * as customers from '../redux-ducks/customers'
import * as quotations from '../redux-ducks/quotations'
import * as invoices from '../redux-ducks/invoices'
import * as Paper from '../layout/paper-sheet'
import NavSecondary from '../nav/secondary'
import { ButtonNew, ButtonList, ButtonSubmit } from '../nav/secondary-buttons'
import * as Tabs from '../ui/tabs'
import { Amount, FormatNumber } from '../ui/format'
import { Progress } from '../ui/progress'
import { CustomerQuotations } from '../quotations/list'
import { CustomerInvoices } from '../invoices/list'
import CustomerForm, { FORM_ID, FormContext } from './form'
import CustomerFormPres from './form.pres'
import { CustomerHeader } from './header'

const TYPE = `customers`

function EditCustomer(props) {
  const { customer } = props
  const name = customer.get(`name`)
  const titleProps = { id: `page.customers.edit`, values: { name } }

  return (
    <>
      <FormattedMessage {...titleProps}>
        {title => (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
      </FormattedMessage>
      <NavSecondary title={<FormattedMessage {...titleProps} />}>
        <ButtonSubmit
          formId={FORM_ID}
          isSaving={props.isSaving}
          label="_.save"
        />
        <ButtonList type={TYPE} label="customer.button.list" />
        <ButtonNew type={TYPE} icon secondary label="customer.button.new" />
      </NavSecondary>

      <CustomerForm {...props}>
        <Tabs.Wrapper>
          <Tabs.List>
            <Tabs.Header>
              <CustomerHeader customer={customer} />
            </Tabs.Header>
            <Tabs.Tab>
              <FormattedMessage id="_.quotations" />
            </Tabs.Tab>
            <Tabs.Tab>
              <FormattedMessage id="_.invoices" />
            </Tabs.Tab>
            <Tabs.Tab>
              <FormattedMessage id="customer.tab.configuration" />
            </Tabs.Tab>
          </Tabs.List>
          {/* QUOTATIONS */}
          <Tabs.Panel>
            <CustomerQuotations />
          </Tabs.Panel>
          {/* INVOICES */}
          <Tabs.Panel>
            <CustomerInvoices />
          </Tabs.Panel>
          {/* CUSTOMER FORM */}
          <Tabs.Panel>
            <FormContext.Consumer>
              {context => (
                <>
                  <CustomerFormPres {...context} />
                  <Paper.Sheet part="top">
                    <Paper.Between>
                      <Paper.User />
                      <Paper.Party title="to" people={context.formDraft} />
                    </Paper.Between>
                  </Paper.Sheet>
                </>
              )}
            </FormContext.Consumer>
          </Tabs.Panel>
        </Tabs.Wrapper>
      </CustomerForm>
    </>
  )
}

function state2prop(state) {
  return {
    isSaving: state.customers.get(`isSaving`),
    customer: state.customers.get(`current`),
  }
}

export default connect(state2prop)(
  pageFetchActions({
    Component: EditCustomer,
    actionCreators: [
      customers.getOne,
      quotations.listForCustomer,
      invoices.listForCustomer,
    ],
  })
)
