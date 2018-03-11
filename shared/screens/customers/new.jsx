import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as customers from '../../ducks/customers'
import { ButtonList } from '../../components/customers/secondary-nav-actions.jsx'
import CustomerForm from '../../components/customers/form.jsx'
import FullPage from '../../components/ui/layout-full-page.jsx'

class NewCustomer extends Component {

  static fetchData(store, params, cookies) {
    return store.dispatch( customers.getOne( params, cookies ) )
  }

  render() {
    const { props } = this
    return (
      <FullPage title="New Customer" secondary={ButtonList} >
        <CustomerForm {...props} />
      </FullPage>
    )
  }
}

export default NewCustomer
