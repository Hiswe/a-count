import      React      from 'react'
import      classNames from 'classnames'
import      PropTypes  from 'prop-types'
import * as Intl       from 'react-intl'

import './textarea-auto-resize.scss'
const BASE_CLASS = `textarea`

export class TextareaAutoResize extends React.PureComponent {

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

  static propTypes = {
    placeHolder: PropTypes.string,
  }

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
    const { className, placeholder , onChange, ...rest } = this.props
    const { autoResize } = this.state
    const COMP_CLASS     = classNames(className, {
      [ BASE_CLASS ]: true,
      [ `${BASE_CLASS}--is-auto-resize` ]: autoResize,
    })
    const showPlaceholder = (autoResize && placeholder)
    return (
      <div className={ COMP_CLASS }>
        <textarea
          className={`${BASE_CLASS}__field`}
          onChange={ this.handleChange }
          ref={ this.el }
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
