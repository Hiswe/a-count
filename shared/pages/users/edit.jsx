import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/layout/nav-secondary.jsx'
import UserForm from '../../components/users/form.jsx'
import { ButtonSubmit } from '../../components/users/secondary-nav-actions.jsx'

const EditProfile = props => {
  return (
    <Fragment>
      <NavSecondary title="Profile">
        <ButtonSubmit />
      </NavSecondary>
      <UserForm {...props} />
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: EditProfile,
  actionCreators: [
  ],
}) )
