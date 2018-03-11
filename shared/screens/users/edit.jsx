import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as customers from '../../ducks/customers'
import FullPage from '../../components/ui/layout-full-page.jsx'
import UserForm from '../../components/users/form.jsx'

class EditProfile extends Component {

  // static fetchData(store, params, cookies) {
  //   return store.dispatch( customers.getOne( params, cookies ) )
  // }

  render() {
    const { props } = this
    return (
      <FullPage title="Profile">
        <UserForm {...props} />
      </FullPage>
    )
  }
}

export default EditProfile
