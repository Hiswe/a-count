import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './notifications.scss'

import * as notifications from '../../ducks/notifications'

const Notification = props => {
  const { message, error } = props
  const notificationType = error ? `error` : `notification`
  return (
    <div onClick={ e => props.remove() }  className={`notifications__item notifications__item--${notificationType}`}>
      <h4 className="notifications__title">
        { notificationType }
      </h4>
      <div className="notifications__content" >
        { message }
      </div>
    </div>
  )
}

const Notifications = props => {
  const { notifications, hasNotifications } = props
  return (
    <aside className="notifications">
      {
        hasNotifications && notifications.map( n => {
          return ( <Notification key={n._id} {...n} remove={ e => props.remove( n ) } /> )
        })
      }
    </aside>
  )
}

const state2prop = state => {
  const { notifications } = state
  const hasNotifications = Array.isArray( notifications ) && notifications.length > 0
  const result = {
    hasNotifications,
    notifications,
  }
  return result
}

const dispatch2prop = dispatch => {
  return bindActionCreators({
    remove: notifications.removeOne
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( Notifications )