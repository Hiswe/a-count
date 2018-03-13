import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import FullPage from '../../components/ui/layout-full-page.jsx'
import UserForm from '../../components/users/form.jsx'

const EditProfile = props => {
  return (
    <FullPage title="Profile">
      <UserForm {...props} />
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: EditProfile,
  actionCreators: [
  ],
}) )
