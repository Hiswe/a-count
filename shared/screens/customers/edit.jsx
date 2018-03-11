import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as customers from '../../ducks/customers'
import FullPage from '../../components/ui/layout-full-page.jsx'
import { ButtonList, ButtonNew } from '../../components/customers/secondary-nav-actions.jsx'
import CustomerForm from '../../components/customers/form.jsx'

const SecondaryActions = () => (
  <Fragment>
    <ButtonNew />
    <ButtonList />
  </Fragment>
)

class EditCustomer extends Component {

  static fetchData(store, params, cookies) {
    return store.dispatch( customers.getOne( params, cookies ) )
  }

  render() {
    const { props } = this
    return (
      <FullPage title="Edit Customer" secondary={SecondaryActions}>
        <CustomerForm {...props} />
      </FullPage>
    )
  }
}

export default EditCustomer
