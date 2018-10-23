import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './spinner.scss'
const BASE_CLASS = `spinner`

export class Spinner extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showSpinner: false,
    }
    this.showSpinner = this.showSpinner.bind(this)
  }
  static propTypes = {
    delay: PropTypes.number,
  }
  static defaultProps = {
    delay: 1000,
  }
  componentDidMount() {
    this.timerId = setTimeout(this.showSpinner, this.props.delay)
  }
  componentWillUnmount() {
    this.timerId && clearTimeout(this.timerId)
    this.timerId = false
  }
  showSpinner() {
    this.timerId &&
      this.setState(prevState => ({
        showSpinner: true,
      }))
  }
  render() {
    const { state } = this
    const COMP_CLASS = classNames(BASE_CLASS, {
      [`${BASE_CLASS}--is-loading`]: state.showLoader,
    })
    return (
      <aside className={COMP_CLASS}>
        <FormattedMessage id="spinner.loading" />
      </aside>
    )
  }
}

export default Spinner
