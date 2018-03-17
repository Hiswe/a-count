import React, { Fragment } from 'react'

import { formatDate } from '../_helpers.js'
import DatePicker from '../ui/date-picker.jsx'
import './stepper.scss'

export default Stepper

export function getSelectedIndex( steps ) {
  return Math.max( 0, steps.findIndex( step => step.value ) )
}

function Stepper( props ) {
  const { children, steps, ...otherProps} = props
  if ( !Array.isArray(steps) ) return null
  const currentStepIndex = getSelectedIndex( steps )
  return (
    <div className="stepper">
      {
        steps.map( (step, index) => (
          <Step
            key={ step.key }
            checked={ index === currentStepIndex }
            index={ index }
            step={ step }
            { ...otherProps }
          />
        ))
      }
    </div>
  )
}

export function Step( props ) {
  const { step, checked, index, onChange } = props
  const id  = `${step.key}-${index}`
  const name = ``
  return (
    <Fragment>
      <input id={ id }
        name="stepper-display-form"
        className="stepper__input"
        type="radio"
        defaultChecked={ checked }
      />
      <div className="stepper__step" >
        <label className="stepper__button" htmlFor={id}>{ step.label }</label>
        <div className="stepper__content">
          <DatePicker
            value={ step.value }
            onChange={ e => onChange(e) }
          />
        </div>
      </div>
    </Fragment>
  )
}
