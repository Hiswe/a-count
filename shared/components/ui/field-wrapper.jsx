import React from 'react'

// TODO: change className to: “field”

const FieldWrapper = props => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={props.id}>{props.label}</label>
      { props.children }
    </div>
  )
}

export default FieldWrapper
