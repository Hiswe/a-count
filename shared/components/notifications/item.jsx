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
