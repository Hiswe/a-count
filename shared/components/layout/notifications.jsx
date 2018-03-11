import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Notification = props => {
  const { message, error } = props
  const notificationType = error ? `error` : `notification`
  return (
    <div className={`notifications__item notifications__item--${notificationType}`}>
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
          return (
            <Notification key={n._id} {...n} />
          )
        })
      }
    </aside>
  )
}

const mapStateToProps = state => {
  const { notifications } = state
  const hasNotifications = Array.isArray( notifications ) && notifications.length
  const result = {
    hasNotifications,
    notifications,
  }
  return result
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)( Notifications )
