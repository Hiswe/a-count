import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'

import      Notification  from './item'
import * as notifications from '../ducks/notifications'
import './list.scss'
const BASE_CLASS = `notifications`
const NOTIFICATION_LIFETIME = 5000

function Notifications( props ) {
  const { notifications, hasNotifications } = props

  if ( !hasNotifications ) return null
  return (
    <aside className={ BASE_CLASS }>{
      notifications.map( n => (
        <Notification
          key={ n._id }
          handleRemove={ props.handleRemove }
          notification={ n }
        />
      ))
    }</aside>
  )
}

function state2prop( state ) {
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
    handleRemove: notifications.removeOne
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( Notifications )
