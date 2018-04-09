import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import { PaperSheet, Between, Party, PartyUser } from '../../components/layout/paper-sheet.jsx'
import { Main, Meta, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonList,
  ButtonSubmit,
} from '../../components/nav/secondary-buttons.jsx'
import CustomerForm, {
  FORM_ID,
  FormContext,
} from '../../components/customers/form.jsx'
import CustomerFormPres from '../../components/customers/form.pres.jsx'

const TYPE = `customers`

const NewCustomer = props => {
  const { intl } = props

  return (
    <Fragment>

      <NavSecondary
        title={ <FormattedMessage id="page.customers.new" /> }
      >
        <ButtonList type={ TYPE } />
        <ButtonSubmit formId={ FORM_ID } isSaving={ props.isSaving } />
      </NavSecondary>

      <CustomerForm {...props} >
        <Main withMeta>
          <Meta>
            <FormContext.Consumer>
              { context => <CustomerFormPres {...context} />}
            </FormContext.Consumer>
          </Meta>
          <Content>
            <PaperSheet part="top">
              <Between>
                <PartyUser />
                <FormContext.Consumer>
                  { context => <Party title="to" {...context.formData} />}
                </FormContext.Consumer>
              </Between>
            </PaperSheet>
          </Content>
        </Main>
      </CustomerForm>

    </Fragment>
  )
}

function state2prop( state ) {
  return {
    isSaving : state.customers.get( `isSaving` ),
    customer : state.customers.get( `current`  ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: NewCustomer,
  actionCreators: [
    customers.getOne
  ],
}) )

