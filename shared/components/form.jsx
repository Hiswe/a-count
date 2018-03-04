import React from 'react'
import omit from 'lodash.omit'

const omittedKeys = [
  `name`,
  `value`,
  `label`,
  `onChange`,
  `entries`,
]

const Floating = props => {
  const name  = props.name
  const type  = props.type ? props.type : `text`
  const value = props.value ? props.value : ``
  const additionalFields = omit(props, omittedKeys)
  let input
  if (type === `textarea`) {
    input = (<textarea name={name} id={name} value={value} onChange={props.onChange} {...additionalFields} />)
  } else {
    input = (<input onChange={props.onChange}
      name={name} id={name} value={value} type={type} {...additionalFields} />)
  }

  return (
    <div className="input-float">
      <label htmlFor={name}>{name}</label>
      {input}
    </div>
  )
}

const InputWrapper = props => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={props.id}>{props.label}</label>
      { props.children }
    </div>
  )
}

const Input = props => {
  const name  = props.name
  const id    = props.id ? props.id : name
  const label = props.label ? props.label : id
  const type  = props.type ? props.type : 'text'
  const value = props.value ? props.value : ``
  const additionalFields = omit(props, omittedKeys)
  let input = null
  if (type === 'select') {
    input = (
      <select className="input__field" name={name} id={id} onChange={props.onChange} value={value}>
        { Array.isArray(props.entries) && props.entries.map( (c, i) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        )) }
      </select>
    )
  } else if (type === 'textarea') {
    input = (<textarea className="input__field" name={name} id={id} value={value} {...additionalFields} />)
  } else {
    input = (<input className="input__field" name={name} id={id} value={value} onChange={props.onChange} {...additionalFields} />)
  }
  return (
    <div className="input">
      <label className="input__label" htmlFor={id}>{label}</label>
      {input}
    </div>
  )
}

export { Floating, Input, InputWrapper }
