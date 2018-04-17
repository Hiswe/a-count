import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher.js'
import * as customers          from '../ducks/customers'
import * as quotations         from '../ducks/quotations'
import * as invoices           from '../ducks/invoices'
import {
  PaperSheet,
  Between,
  Party,
  PartyUser,
} from '../layout/paper-sheet.jsx'
import      NavSecondary       from '../nav/secondary.jsx'
import {
  ButtonNew,
  ButtonList,
  ButtonSubmit,
} from '../nav/secondary-buttons.jsx'
import {
  Tabs,
  TabList,
  TabListHeader,
  Tab,
  TabPanel,
} from '../ui/tabs.jsx'
import {
  PresByKey,
  KeyLabel,
  KeyValue
} from '../ui/key-presentation.jsx'
import {
  Amount,
  FormatNumber,
} from '../ui/format.jsx'
import { Progress } from '../ui/progress.jsx'
import { CustomerQuotations } from '../quotations/list.jsx'
import { CustomerInvoices   } from '../invoices/list.jsx'
import CustomerForm, {
  FORM_ID,
  FormContext,
} from './form.jsx'
import CustomerFormPres from './form.pres.jsx'

const TYPE = `customers`

function EditCustomer( props ) {
  const { customer   } =   props
  const   name         =   customer.get(`name`)
  const   titleProps   = { id :`page.customers.edit`, values: {name} }

  return (
    <React.Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonSubmit
          formId={FORM_ID}
          isSaving={ props.isSaving }
          label="_.save"
        />
        <ButtonList
          type={ TYPE }
          label="customer.button.list"
        />
        <ButtonNew
          type={ TYPE }
          icon
          secondary
          label="customer.button.new"
        />
      </NavSecondary>

      <CustomerForm {...props} >
        <Tabs>

          <TabList>
            <TabListHeader>
              <PresByKey>
                <KeyLabel id="customer.total.quotation" />
                <KeyValue>
                  <Amount value={ customer.get(`quotationsTotal`) } />
                </KeyValue>
                <KeyLabel id="customer.total.invoice" />
                <KeyValue>
                  <Amount value={ customer.get(`invoicesTotal`) } />
                </KeyValue>
                <KeyLabel id="customer.total.to-be-paid" />
                <KeyValue>
                  <Amount value={ customer.get(`invoicesLeft`) } />
                </KeyValue>
                <KeyLabel id="customer.total.progress" />
                <KeyValue>
                  <Progress
                    value={ customer.get(`invoicesPaid`) }
                    max={ customer.get(`invoicesTotal`) }
                  />
                </KeyValue>
              </PresByKey>

            </TabListHeader>
            <Tab>
              <FormattedMessage id="_.quotations" />
            </Tab>
            <Tab>
              <FormattedMessage id="_.invoices" />
            </Tab>
            <Tab>
              <FormattedMessage id="customer.tab.configuration" />
            </Tab>
          </TabList>
          {/* QUOTATIONS */}
          <TabPanel>
            <CustomerQuotations />
          </TabPanel>
          {/* INVOICES */}
          <TabPanel>
            <CustomerInvoices />
          </TabPanel>
          {/* CUSTOMER FORM */}
          <TabPanel>
            <FormContext.Consumer>
              { context => (
                <React.Fragment>
                  <CustomerFormPres {...context} />
                  <PaperSheet part="top">
                    <Between>
                      <PartyUser />
                      <Party title="to" people={context.formData} />
                    </Between>
                  </PaperSheet>
                </React.Fragment>
              )}
            </FormContext.Consumer>
          </TabPanel>
        </Tabs>
      </CustomerForm>
    </React.Fragment>
  )
}

function state2prop( state ) {
  return {
    isSaving   : state.customers  .get( `isSaving` ),
    customer   : state.customers  .get( `current`  ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: EditCustomer,
  actionCreators: [
    customers.getOne,
    quotations.getAllForCustomer,
    invoices.getAllForCustomer,
  ],
}) )
