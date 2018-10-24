import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import pageFetchActions from '../page-fetch-actions'
import * as customers from '../redux-ducks/customers'
import * as Paper from '../layout/paper-sheet'
import { Main, Meta, Content } from '../layout/main'
import NavSecondary from '../nav/secondary'
import { ButtonList, ButtonSubmit } from '../nav/secondary-buttons'
import CustomerForm, { FORM_ID, FormContext } from './form'
import CustomerFormPres from './form.pres'

const TYPE = `customers`

const NewCustomer = props => {
  const { intl } = props
  const titleProps = { id: `page.customers.new` }

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
          label="_.create"
        />
        <ButtonList type={TYPE} label="customer.button.list" />
      </NavSecondary>

      <CustomerForm key={props.customer.id} {...props}>
        <Main withMeta>
          <Meta>
            <FormContext.Consumer>
              {context => <CustomerFormPres {...context} />}
            </FormContext.Consumer>
          </Meta>
          <Content>
            <Paper.Sheet part="top">
              <Paper.Between>
                <Paper.PartyUser />
                <FormContext.Consumer>
                  {context => (
                    <Paper.Party title="to" people={context.formDraft} />
                  )}
                </FormContext.Consumer>
              </Paper.Between>
            </Paper.Sheet>
          </Content>
        </Main>
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
    Component: NewCustomer,
    actionCreators: [customers.getOne],
  })
)
