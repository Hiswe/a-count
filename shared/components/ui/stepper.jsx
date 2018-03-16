import React, { Fragment } from 'react'

import { formatDate } from '../_helpers.js'

import './stepper.scss'

/* <input
  type="hidden"
  name={step.key}
  value="false"
/>
<Field
  type="checkbox"
  id={ step.key }
  name={ step.key }
  value="true"
  checked={ value }
  onChange={ onChange } />
<div className="status__date">{ formatDate(value) }</div> */

// input.stepper__input(id=id name=name type="radio" checked=isFirst)
//   .stepper__step
//     label.stepper__button(for=id)= val

export const Step = props => {
  const { name, label } = props
  const id = `${name}-${label.replace(' ', '-')}`
  return (
    <Fragment>
      <input id={id} name={name} className="stepper__input" type="radio" />
      <div className="stepper__step" >
        <label className="stepper__button" htmlFor={id}>{ label }</label>
        <div className="stepper__content">

        </div>
      </div>
    </Fragment>
  )
}

const Stepper = props => {
  const { children, ...otherProps} = props
  console.log( otherProps )
  return (
    <div className="stepper">
      { React.Children.map(props.children, child => {
        return React.cloneElement( child, otherProps )
      }) }
    </div>
  )
}

export default Stepper
