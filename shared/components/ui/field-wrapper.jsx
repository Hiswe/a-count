import React from 'react'

import './field-wrapper.scss'

const FieldWrapper = props => {
  return (
    <div className="field">
      <label className="field__label" htmlFor={props.id}>{props.label}</label>
      { props.children }
    </div>
  )
}

export default FieldWrapper
