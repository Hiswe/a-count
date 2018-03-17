import React from 'react'

import './field.scss'

export function normalizeFieldData( props ) {
  const { id, label, type, value, ...otherProps } = props
  const _id = id ? id : otherProps.name
  const _label = label ? label : _id
  const _type = type ? type : `text`
  const _value = value ? value : ``
  return {
    id: _id,
    label: _label,
    type: _type,
    value: _value,
    className: `field__control`,
    ...otherProps
  }
}
// TODO: should be able to have an uncontrolled component

export default function Field( props ) {
  props = normalizeFieldData( props )

  let input = null

  switch ( props.type ) {

    case `select`:
      const { options } = props
      const hasOptions = Array.isArray( options )
      return input = (
        <select {...props} >
          { hasOptions && options.map( (option, i) => (
            <option key={option.id} value={option.id}>{option.name}</option>
          )) }
        </select>
      )

    case `textarea`:
      return input = ( <textarea {...props} /> )

    default:
      return input = ( <input {...props} /> )
  }


  return (
    <FieldWrapper id={props.id} label={props.label}>
      { input }
    </FieldWrapper>
  )
}

export const FieldWrapper = props => {
  const { id, label } = props
  return (
    <div className="field">
      <label className="field__label" htmlFor={ id }>{ label }</label>
      { props.children }
    </div>
  )
}
