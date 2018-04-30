import React from 'react'

import   LayoutBoarding     from './layout/boarding'
import { FormattedMessage } from 'react-intl'

function ErrorStack( props ) {
  const { error, errorInfo } = props
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      { error && error.toString() }
      <br />
      { errorInfo.componentStack }
    </div>
  )
}

export default class ErrorBoundary extends React.PureComponent {

  constructor( props ) {
    super(props)
    this.state = {
      error    : null,
      errorInfo: null,
    }
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error     : error ,
      errorInfo : errorInfo,
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { errorInfo, error } = this.state
    if (this.state.errorInfo) {
      // Error path
      return (
        <LayoutBoarding
          title={ <FormattedMessage id="page.error" />}
        >
          { process.env.IS_PROD && (
            <FormattedMessage id="page.error.production-hint" />
          )}
          { process.env.IS_DEV && (
            <ErrorStack error={error} errorInfo={ errorInfo } />
          )}
        </LayoutBoarding>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}
