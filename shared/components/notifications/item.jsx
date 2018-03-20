import React, { PureComponent } from 'react'

import './item.scss'

const BASE_CLASS = `notification`
const NOTIFICATION_LIFETIME = 5000

export default class Notification extends PureComponent {

  constructor( props ) {
    super( props )
    const { error } = this.props.notification
    const type = error ? `error` : `information`

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
        className={ `${ BASE_CLASS } ${ BASE_CLASS }--${ type }` }
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

