import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import UserForm from '../../components/users/form.jsx'

const EditProfile = props => {
  return (
    <Fragment>
      <NavSecondary title="Profile" />
      <UserForm {...props} />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: EditProfile,
  actionCreators: [
  ],
}) )
