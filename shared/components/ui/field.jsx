import React from 'react'
import omit from 'lodash.omit'

import FieldWrapper from './field-wrapper.jsx'

const omittedKeys = [
  `name`,
  `value`,
  `label`,
  `onChange`,
  `entries`,
]

const Field = props => {
  const name  = props.name
  const id    = props.id ? props.id : name
  const label = props.label ? props.label : id
  const type  = props.type ? props.type : 'text'
  const value = props.value ? props.value : ``
  const additionalFields = omit(props, omittedKeys)
  let input = null
  if (type === 'select') {
    const { options } = props
    const hasOptions = Array.isArray( options )
    input = (
      <select className="field__control" name={name} id={id} onChange={props.onChange} value={value}>
        { hasOptions && options.map( (option, i) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        )) }
      </select>
    )
  } else if (type === 'textarea') {
    input = (<textarea className="field__control" name={name} id={id} onChange={props.onChange} value={value} {...additionalFields} />)
  } else {
    input = (<input className="field__control" name={name} id={id} value={value} onChange={props.onChange} {...additionalFields} />)
  }
  return (
    <FieldWrapper id={id} label={label}>
      { input }
    </FieldWrapper>
  )
}

export default Field
