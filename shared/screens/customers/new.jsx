import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as customers from '../../ducks/customers'
import CustomerForm from '../../components/customers/form.jsx'
import FullPage from '../../components/layout/full-page.jsx'

class NewCustomer extends Component {

  static fetchData(store, params, cookies) {
    return store.dispatch( customers.getOne( params, cookies ) )
  }

  render() {
    const { props } = this
    return (
      <FullPage title="New Customer">
        <CustomerForm {...props} />
      </FullPage>
    )
  }
}

export default NewCustomer
