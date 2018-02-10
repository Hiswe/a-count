import React    from 'react';
import omit     from 'lodash.omit';

const Floating = props => {
  let name  = props.name
  let type  = props.type ? props.type : 'text'
  console.log(props.value)
  let value = props.value ? props.value : null
  let input
  if (type === 'textarea') {
    input = (<textarea name={name} id={name} value={value} />)
  } else {
    input = (<input name={name} id={name} value={value} type={type} />)
  }

  return (
    <div className="input-float">
      <label htmlFor={name}>{name}</label>
      {input}
    </div>
  )
}

const Input = props => {
  let name  = props.name
  let id    = props.id ? props.id : name
  let label = props.label ? props.label : id
  let type  = props.type ? props.type : 'text'
  let value = props.value ? props.value : null
  let additionalFields = omit(props, ['name', 'value', 'label'])
  let input
  if (type === 'textarea') {
    input = (<textarea name={name} id={id} value={value} />)
  } else {
    input = (<input className="field" name={name} id={id} defaultValue={value} {...additionalFields} />)
  }
  return (
    <div className="input">
      <label className="item" htmlFor={id}>{label}</label>
      {input}
    </div>
  )
}

export {Floating, Input};
