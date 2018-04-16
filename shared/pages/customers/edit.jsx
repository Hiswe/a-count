import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import      ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers          from '../../ducks/customers'
import * as quotations         from '../../ducks/quotations'
import * as invoices           from '../../ducks/invoices'
import {
  PaperSheet,
  Between,
  Party,
  PartyUser,
} from '../../components/layout/paper-sheet.jsx'
import      NavSecondary       from '../../components/nav/secondary.jsx'
import {
  ButtonNew,
  ButtonList,
  ButtonSubmit,
} from '../../components/nav/secondary-buttons.jsx'
import {
  Tabs,
  TabList,
  TabListHeader,
  Tab,
  TabPanel,
} from '../../components/ui/tabs.jsx'
import {
  PresByKey,
  KeyLabel,
  KeyValue
} from '../../components/ui/key-presentation.jsx'
import {
  Amount,
  FormatNumber,
} from '../../components/ui/format.jsx'
import { Progress } from '../../components/ui/progress.jsx'
import CustomerForm, {
  FORM_ID,
  FormContext,
} from '../../components/customers/form.jsx'
import CustomerFormPres from '../../components/customers/form.pres.jsx'
import { CustomerQuotations }   from '../../components/quotations/list.jsx'
import InvoicesList     from '../../components/invoices/list.jsx'

const TYPE = `customers`

function EditCustomer( props ) {
  const { customer, quotations, invoices } = props
  const name = customer.get(`name`)
  const titleProps  = { id:`page.customers.edit`, values: {name} }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonSubmit formId={FORM_ID} isSaving={ props.isSaving } />
        <ButtonList type={ TYPE } />
        <ButtonNew  type={ TYPE } icon secondary />
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
            <InvoicesList showCustomer={ false } invoices={ invoices } />
          </TabPanel>
          {/* CUSTOMER FORM */}
          <TabPanel>
            <FormContext.Consumer>
              { context => (
                <Fragment>
                  <CustomerFormPres {...context} />
                  <PaperSheet part="top">
                    <Between>
                      <PartyUser />
                      <Party title="to" people={context.formData} />
                    </Between>
                  </PaperSheet>
                </Fragment>
              )}
            </FormContext.Consumer>
          </TabPanel>
        </Tabs>
      </CustomerForm>
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    isSaving   : state.customers  .get( `isSaving` ),
    customer   : state.customers  .get( `current`  ),
    quotations : state.quotations .get( `active`   ),
    invoices   : state.invoices   .get( `list`     ),
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
