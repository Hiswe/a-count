import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'

import './item.scss'
const BASE_CLASS = `notification`

const NOTIFICATION_LIFETIME = 5000

export default class Notification extends PureComponent {

  constructor( props ) {
    super( props )
    const { error } = this.props.notification
    const type = error ? `error` : `information`

    this.state = { type }
    this.autoRemove = this.autoRemove.bind( this )
  }

  componentDidMount() {
    const { notification, handleRemove } = this.props
    this.timerId = setTimeout( this.autoRemove, NOTIFICATION_LIFETIME )
  }

  componentWillUnmount() {
    this.timerId && clearTimeout( this.timerId )
    this.timerId = false
  }

  autoRemove( ) {
    const { notification, handleRemove } = this.props
    handleRemove( notification )
  }

  render() {
    const { notification, handleRemove } = this.props
    const { i18nId, _id, additionalContent, ...values } = notification
    const { type } = this.state
    return (
      <div
        onClick={ e => handleRemove( notification ) }
        className={ `${ BASE_CLASS } ${ BASE_CLASS }--${ type }` }
      >
        <h4 className={`${ BASE_CLASS }__title`}>
          <FormattedMessage id={ i18nId } values={ values } />
        </h4>
        { additionalContent && (
          <div className={`${ BASE_CLASS }__content`} >
            { additionalContent }
          </div>
        )}
      </div>
    )
  }
}
