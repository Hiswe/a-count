import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './notifications.scss'

const BASE_CLASS = `notifications`
const NOTIFICATION_LIFETIME = 5000

import * as notifications from '../../ducks/notifications'

class Notification extends Component {

  constructor( props ) {
    super( props )
    const { error } = this.props.notification
    const type = error ? `error` :  `success`

    this.state = { type }
  }

  componentDidMount() {
    const { notification, handleRemove } = this.props
    this.timerId = setTimeout( () => {
      handleRemove( notification )
    }, NOTIFICATION_LIFETIME )
  }

  componentWillUnmount() {
    clearTimeout( this.timerID )
  }

  render() {
    const { notification, handleRemove } = this.props
    const { type } = this.state
    return (
      <div
        onClick={ e => handleRemove( notification ) }
        className={ `${ BASE_CLASS }__item ${ BASE_CLASS }__item--${ type }` }
      >
        <h4 className={`${ BASE_CLASS }__title`}>
          { type }
        </h4>
        <div className={`${ BASE_CLASS }__content`} >
          { notification.message }
        </div>
      </div>
    )
  }
}

function Notifications( props ) {
  const { notifications, hasNotifications } = props
  return (
    <aside className={ BASE_CLASS }>
      {
        hasNotifications && notifications.map( n => {
          return ( <Notification
            key={ n._id }
            handleRemove={ props.handleRemove }
            notification={ n }
          /> )
        })
      }
    </aside>
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
