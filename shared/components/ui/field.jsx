import isNil from 'lodash.isnil'
import crio from 'crio'
import React, { PureComponent } from 'react'

import TextareaAutoResize from '../ui/textarea-auto-resize.jsx'

import './field.scss'
const BASE_CLASS = `field`

//////
// UTILS
//////

function isEmpty( value ) {
  return ( isNil( value ) || value === ``)
}

// ensure that we have a value in case of controlled component
// • this will avoid warnings…
//   …from switching from controlled to uncontrolled components
function ensureValue( value ) {
  return isNil( value ) ? `` : value
}

// pouic[0] => pouic-0
export function idToClassName( id ) {
  return id.replace(/\]$/, ``).replace(/[\[\]]/g, '-').toLowerCase()
}

//////
// WRAPPER
//////

// inspired by
// • https://github.com/muicss/mui/blob/master/src/react/_textfieldHelpers.jsx
const fieldWrapper = ({ControlComponent, fieldType}) => class extends PureComponent {
  constructor( props ) {
    super( props )

    this.handleChange = this.handleChange.bind( this )
    this.handleBlur = this.handleBlur.bind( this )

    const { id, label, darkBg, onChange, onBlur, ...rest } = props
    const _id     = id ? id : rest.name
    const _label  = label ? label : _id
    const _id2class = idToClassName( _id )

    const wrapperClassName = [
      BASE_CLASS,
      `${ BASE_CLASS }--${ _id2class }`,
      `${ BASE_CLASS }--is-${ fieldType }`,
    ]
    if ( darkBg ) wrapperClassName.push( `${BASE_CLASS}--dark-background` )

    const wrapperProps = {
      className: wrapperClassName.join( ` ` ),
    }
    const labelProps = {
      className: `${BASE_CLASS}__label`,
      htmlFor:    _id,
      label:      _label,
    }
    const controlProps = {
      id:         _id,
      className:  `${ BASE_CLASS }__control`,
      onChange:   this.handleChange,
      onBlur:     this.handleBlur,
      ...rest,
    }

    if ( isNil(props.defaultValue) ) {
      controlProps.value = ensureValue( props.value )
    }

    this.state = crio({
      wrapperProps,
      labelProps,
      controlProps,
      isEmpty:    false,
      isTouched:  false,
      isPristine: true,
    })
  }
  // activate floating label only if JS on client-side
  // • without JS all label will be stuck by default
  componentDidMount() {
    const { controlProps }  = this.state
    const controlValue      = `value` in controlProps ? controlProps.value
      : controlProps.defaultValue
    const isEmptyValue      = isEmpty( controlValue )
    this.setState( prevState => {
      return { isEmpty: isEmptyValue }
    })
  }
  componentWillReceiveProps( nextProps ) {
    if ( !`value` in nextProps ) return
    this.setState( prevState => {
      const value = ensureValue( nextProps.value )
      return {
        isEmpty:      isEmpty( value ),
        controlProps: prevState.controlProps.set( `value`, value )
      }
    })
  }

  //----- EVENTS

  handleChange( event ) {
    const { props } = this
    // Can't use event in async
    // • https://reactjs.org/docs/events.html#event-pooling
    const { value } = event.target
    this.setState( prevState => {
      return {
        isEmpty:    isEmpty( value ),
        isPristine: false,
      }
    })
    // execute original callback
    if ( typeof props.onChange === `function` ) props.onChange( event )
  }
  handleBlur( event ) {
    const { props } = this
    // ignore if event is a window blur
    if ( document.activeElement !== this.controlEl ) {
      this.setState( prevState => {
        return { isTouched: true }
      })
    }
    // execute original callback
    if ( typeof props.onBlur === `function` ) props.onBlur( event )
  }

  //----- RENDER

  render() {
    const { state } = this
    const { wrapperProps, labelProps, controlProps, isEmpty, isTouched } = state

    const WrapperClassName = [
      wrapperProps.className,
      isEmpty ? `${ BASE_CLASS }--is-empty` : `${ BASE_CLASS }--is-not-empty`,
      isTouched ? `${ BASE_CLASS }--is-touched` : `${ BASE_CLASS }--is-not-touched`,
    ].join( ` ` )

    return (
      <div className={ WrapperClassName } >
        <ControlComponent
          controlRef={ el => { this.controlEl = el } }
          {...controlProps}
        />
        <label
          className={ labelProps.className }
          htmlFor={ labelProps.htmlFor }
        >
          { labelProps.label }
        </label>
      </div>
    )
  }
}

//////
// COMPONENTS
//////

export const Input = fieldWrapper( {
  ControlComponent: props => {
    const { controlRef, ...rest } = props
    return <input ref={ controlRef } {...rest} />
  },
  fieldType: `input`,
})

export const Textarea = fieldWrapper( {
  ControlComponent: props => {
    const { controlRef, ...rest } = props
    return <TextareaAutoResize ref={ controlRef } {...rest} />
  },
  fieldType: `textarea`,
})

export const Select = fieldWrapper( {
  ControlComponent: props => {
    const { children, controlRef,...rest} = props
    return (
      <select ref={ controlRef } {...rest}>
        { children }
      </ select>
    )
  },
  fieldType: `select`,
})
