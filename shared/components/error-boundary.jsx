import React, { PureComponent } from 'react'

import LayoutBoarding from './layout/boarding.jsx'

class ErrorBoundary extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <LayoutBoarding title="Something went wrong">
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </div>
        </LayoutBoarding>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}

export default ErrorBoundary
