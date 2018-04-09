import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

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
import CustomerForm, {
  FORM_ID,
  FormContext,
} from '../../components/customers/form.jsx'
import CustomerFormPres from '../../components/customers/form.pres.jsx'
import QuotationsList   from '../../components/quotations/list.jsx'
import InvoicesList     from '../../components/invoices/list.jsx'

const TYPE = `customers`

function EditCustomer( props ) {
  const { customer, quotations, invoices } = props
  const name = customer.get(`name`)

  return (
    <Fragment>
      <NavSecondary
        title={ <FormattedMessage id="page.customers.edit" values={{name}} /> }
      >
        <ButtonNew  type={ TYPE } secondary  />
        <ButtonList type={ TYPE } />
        <ButtonSubmit formId={FORM_ID} isSaving={ props.isSaving } />
      </NavSecondary>

      <CustomerForm {...props} >
        <Tabs>

          <TabList>
            <TabListHeader>
              {/* CUSTOMER FORM */}
              <FormContext.Consumer>
                { context => <CustomerFormPres {...context} />}
              </FormContext.Consumer>
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
            <QuotationsList showCustomer={false} quotations={ quotations } />
          </TabPanel>
          {/* INVOICES */}
          <TabPanel>
            <InvoicesList showCustomer={false} invoices={ invoices } />
          </TabPanel>
          {/* ADDRESS PREVIEW */}
          <TabPanel>
            <PaperSheet part="top">
              <Between>
                <PartyUser />
                <FormContext.Consumer>
                  { context => <Party title="to" {...context.formData} />}
                </FormContext.Consumer>
              </Between>
            </PaperSheet>
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
    quotations : state.quotations .get( `list`     ),
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
