import isNil from 'lodash.isnil'
import React, { PureComponent } from 'react'

import TextareaAutoResize from '../ui/textarea-auto-resize.jsx'
import './field.scss'

const BASE_CLASS = `field`

// inspired by
// • https://github.com/muicss/mui/blob/master/src/react/_textfieldHelpers.jsx
// • TODO: should export <Input /> <Select /> <Textarea />

// normalize props :P
export default function Field( props ) {
  const { id, label, type,
    darkBg,
    onChange, onBlur,
    ...others } = props
  const _id     = id ? id : others.name
  const _label  = label ? label : _id
  const _type   = type ? type : `text`
  const _id2class = _id.replace(/\]$/, ``).replace(/[\[\]]/g, '-').toLowerCase()

  const inputProps = {
    id:     _id,
    label:  _label,
    type:   _type,
    className: `${BASE_CLASS}__control`,
    ...others,
  }

  // ensure that we have a value in case of controlled component
  // • this will avoid warnings…
  //   …from switching from controlled to uncontrolled components
  if ( isNil( props.defaultValue ) ) {
    const _value  = isNil( props.value ) ? `` : props.value
    inputProps.value = _value
  }

  const wrapperClassName = [ BASE_CLASS, `${BASE_CLASS}--${_id2class}`, `${BASE_CLASS}--is-${_type}` ]
  if ( darkBg ) wrapperClassName.push( `${BASE_CLASS}--dark-background` )
  const wrapperProps = {
    className: wrapperClassName.join( ` ` ),
  }

  return (
    <FieldInput
      inputProps={ inputProps }
      wrapperProps={ wrapperProps }
      onChange={ onChange }
      onBlur={ onBlur }
    />
  )
}

class FieldInput extends PureComponent {

  constructor( props ) {
    super( props )
    const { inputProps } = props

    this.state = {
      // support NO JS cause
      // • make all floating label float by default
      isEmpty: false,
      // isEmpty: isEmpty(('value' in inputProps) ? inputProps.value : inputProps.defaultValue),
      isTouched: false,
      isPristine: true
    }
    this.onBlur   = this.onBlur.bind( this )
    this.onChange = this.onChange.bind( this )
  }

  componentWillReceiveProps( nextProps ) {
    if ( `value` in nextProps ) {
      this.setState({ isEmpty: isEmpty(nextProps.value)})
    }
  }

  //----- EVENTS

  onChange( e ) {
    const { props } = this

    this.setState({
      isEmpty: isEmpty( e.target.value ),
      isPristine: false,
    })
    // execute original callback
    if ( typeof props.onChange === `function` ) props.onChange( e )
  }
  onBlur( e ) {
    const { props } = this
    // ignore if event is a window blur
    if ( document.activeElement !== this.controlEl ) {
      this.setState({ isTouched: true })
    }

    // execute original callback
    if ( typeof props.onBlur === `function` ) props.onBlur( e )
  }

  //----- RENDER

  input() {
    const { props } = this
    const { inputProps } = props
    const handlers = {
      onBlur:   this.onBlur,
      onChange: this.onChange,
    }

    switch ( inputProps.type ) {
      case `select`:
        const { options, ...selectProps } = inputProps
        const hasOptions = Array.isArray( options )
        return (
          <select {...selectProps} {...handlers}>
            { hasOptions && options.map( (option, i) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            )) }
          </select>
        )

      case `textarea`:
        return ( <TextareaAutoResize {...inputProps} {...handlers} /> )

      default:
        return ( <input {...inputProps} {...handlers} /> )
    }
  }
  render() {
    const { props, state } = this
    const { inputProps } = props
    const { wrapperProps } = props

    const ClassName = [
      wrapperProps.className,
      state.isEmpty ? `${BASE_CLASS}--is-empty` : `${BASE_CLASS}--is-not-empty`,
    ]

    return (
      <div className={ ClassName.join( ` ` ) } >
        { this.input() }
        <label
          className={`${BASE_CLASS}__label`}
          htmlFor={ inputProps.id }
        >
          { inputProps.label }
        </label>
      </div>
    )
  }
}

function isEmpty( value ) {
  return ( isNil( value ) || value === ``)
}
