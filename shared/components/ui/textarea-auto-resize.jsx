import React, { PureComponent } from 'react'

import './textarea-auto-resize.scss'
const BASE_CLASS = `textarea`

export default class TextareaAutoResize extends PureComponent {

  constructor( props ) {
    super( props )
    this.state = {
      autoResize: false,
    }
    this.handleChange = this.handleChange.bind( this )
    this.el = React.createRef()
  }
  // activate autoResize only if JS on client-side
  componentDidMount() {
    this.setState( prevState => ({ autoResize: true }) )
    this.recomputeTextareaSize( )
  }

  //----- EVENTS

  handleChange( e ) {
    const { props } = this
    this.recomputeTextareaSize( )
    // execute original callback
    if ( typeof props.onChange === `function` ) props.onChange( e )
  }

  //----- UTILS

  // change textarea size if too much content
  // • https://maximilianhoffmann.com/posts/autoresizing-textareas
  recomputeTextareaSize() {
    const el = this.el.current
    const originalRows = el.getAttribute( `rows` )
    // force a one-liner by default
    // • this make it easy to calculate the right height
    el.setAttribute( `rows`, `1` )
    el.style.height = `auto`
    el.style.height = `${el.scrollHeight}px`
    el.scrollTop    = el.scrollHeight
    el.setAttribute( `rows`, originalRows )
  }

  render() {
    const { className, onChange, ...others } = this.props
    const { autoResize } = this.state
    const _className = [
      BASE_CLASS,
      className,
    ]
    if ( autoResize ) _className.push(`${BASE_CLASS}--is-auto-resize` )
    return (
      <textarea
        className={ _className.join(` `) }
        onChange={ this.handleChange }
        ref={ this.el }
        {...others}
      />
    )
  }
}
