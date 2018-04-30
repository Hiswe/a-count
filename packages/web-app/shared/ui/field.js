import   isNil              from 'lodash.isnil'
import   crio               from 'crio'
import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import { Icon            } from './svg-icons'
import { TextareaAutoResize } from './textarea-auto-resize'

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

// foo[0] => foo-0
export function idToClassName( id ) {
  return id.replace(/\]$/, ``).replace(/[\[\]]/g, '-').toLowerCase()
}

//////
// WRAPPER
//////

// inspired by
// • https://github.com/muicss/mui/blob/master/src/react/_textfieldHelpers.jsx
const fieldWrapper = ({ControlComponent, fieldType}) => class extends React.PureComponent {

  constructor( props ) {
    super( props )

    this.handleChange = this.handleChange.bind( this )
    this.handleBlur = this.handleBlur.bind( this )

    const { id, label, darkBg, onChange, onBlur, ...rest } = props
    const _id     = id ? id : rest.name
    const _id2class = idToClassName( _id )
    const { type }  = props

    const wrapperClassName = [
      BASE_CLASS,
      `${ BASE_CLASS }--${ _id2class }`,
      `${ BASE_CLASS }--is-${ fieldType }`,
    ]
    if ( type ) wrapperClassName.push( `${BASE_CLASS}--type-${type}` )
    if ( darkBg ) wrapperClassName.push( `${BASE_CLASS}--dark-background` )

    const wrapperProps = crio({
      className: wrapperClassName.join( ` ` ),
    })
    const labelProps = crio({
      className: `${BASE_CLASS}__label`,
      htmlFor:    _id,
      label:      label,
    })
    const controlProps = crio({
      id:         _id,
      className:  `${ BASE_CLASS }__control`,
      onChange:   this.handleChange,
      onBlur:     this.handleBlur,
      ...rest,
    })

    if ( isNil(props.defaultValue) ) {
      controlProps.value = ensureValue( props.value )
    }

    this.state = {
      wrapperProps,
      labelProps,
      controlProps,
      isEmpty:    false,
      isTouched:  false,
      isPristine: true,
    }
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

  static getDerivedStateFromProps( nextProps, prevState ) {
    const { controlProps } = prevState
    const isValueUpdate    = nextProps.value   !== controlProps.value
    const isOptionsUpdate  = nextProps.options !== controlProps.options
    if ( !isValueUpdate && !isOptionsUpdate ) return null
    const update = {
      controlProps,
      isEmpty: prevState.isEmpty,
    }
    if ( isOptionsUpdate ) {
      update.controlProps = update.controlProps.set(`options`, nextProps.options )
    }
    if ( isValueUpdate ) {
      const value     = ensureValue( nextProps.value )
      update.isEmpty  = isEmpty( value )
      update.controlProps = update.controlProps.set(`value`, value )
    }
    return update
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
          <FormattedMessage id={labelProps.label} />
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

// sometime <options> list doesn't come with the expected keys
// • make it possible to configure that with optionsKeys prop
const keyDefault = crio({value: `value`, label: `label`})
export const Select = fieldWrapper( {
  ControlComponent: props => {
    const { options, optionsKeys = keyDefault, controlRef, ...rest} = props
    const hasOptions = Array.isArray( options ) && options.length > 0
    return (
      <select ref={ controlRef } {...rest}>{ hasOptions && options.map( c => (
        <option
          key={ `${controlRef}-${c.get(optionsKeys.value)}` }
          value={ c.get(optionsKeys.value) }
        >
          { c.get(optionsKeys.label) }
        </option>
      ))}</ select>
    )
  },
  fieldType: `select`,
})

export function CheckBox( props ) {
  const { name, defaultChecked } = props
  const iconName = defaultChecked ? `check-box` : `check-box-outline-blank`
  return (
    <label className={`${BASE_CLASS} ${BASE_CLASS}--is-checkbox`}>
      <input
        className={`${BASE_CLASS}__control`}
        type="checkbox"
        key={`${name}-${defaultChecked}`}
        name={ name }
        defaultValue="true"
        defaultChecked={ defaultChecked }
      />
      <Icon svgId={ iconName } />
    </label>
  )
}
