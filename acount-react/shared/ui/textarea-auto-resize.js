import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import * as Intl from 'react-intl'

import './textarea-auto-resize.scss'
const BASE_CLASS = `textarea`

export class TextareaAutoResize extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      autoResize: false,
      localValue: props.value,
    }
    this.handleChange = this.handleChange.bind(this)
    this.el = React.createRef()
  }
  // activate autoResize only if JS on client-side
  componentDidMount() {
    this.setState(() => ({ autoResize: true }))
    this.recomputeTextareaSize()
  }

  //----- EVENTS

  static propTypes = {
    placeHolder: PropTypes.string,
  }

  handleChange(event) {
    const { props } = this
    const { value } = event.target

    this.recomputeTextareaSize()
    this.setState(prevState => ({
      localValue: value,
    }))
    // execute original callback
    if (typeof props.onChange === `function`) props.onChange(event)
  }

  //----- UTILS

  // change textarea size if too much content
  // • https://maximilianhoffmann.com/posts/autoresizing-textareas
  recomputeTextareaSize() {
    const el = this.el.current
    const originalRows = el.getAttribute(`rows`)
    // force a one-liner by default
    // • this make it easy to calculate the right height
    el.setAttribute(`rows`, `1`)
    el.style.height = `auto`
    el.style.height = `${el.scrollHeight}px`
    el.scrollTop = el.scrollHeight
    el.setAttribute(`rows`, originalRows)
  }

  render() {
    const { props, state } = this
    const { className, placeholder, onChange, key, value, ...rest } = props
    const { autoResize, localValue } = state
    const COMP_CLASS = classNames(className, {
      [BASE_CLASS]: true,
      [`${BASE_CLASS}--is-auto-resize`]: autoResize,
    })
    const showPlaceholder = autoResize && placeholder
    // console.log({ localValue })
    return (
      <div className={COMP_CLASS}>
        <textarea
          className={`${BASE_CLASS}__field`}
          onChange={this.handleChange}
          key={key}
          ref={this.el}
          value={localValue}
          {...rest}
        />
        {showPlaceholder && (
          <p className={`${BASE_CLASS}__placeholder`}>
            <Intl.FormattedMessage id={placeholder} />
          </p>
        )}
      </div>
    )
  }
}

export default TextareaAutoResize
