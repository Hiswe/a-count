import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import DatePicker from '../ui/date-picker.jsx'
import './stepper.scss'

// always open the next step after one has a date
export function getSelectedIndex( steps ) {
  let nextIndex = -1
  for ( let i = 0; i < steps.length; i++ ) {
    if ( !steps[i].value ) break
    nextIndex = i + 1
  }
  return Math.max( 0, Math.min( nextIndex, steps.length - 1 ) )
}

export function Stepper( props ) {
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
  const { step, checked, index, handleDayChange } = props
  const id  = `${ step.key }-${ index }`
  // enforce a key to reRender defaultValue input
  // • https://stackoverflow.com/questions/30792526/defaultvalue-change-does-not-re-render-input#answer-39239074
  const key = `${ index }-${ checked }`
  return (
    <Fragment>
      <input id={ id }
        name="stepper-display-form"
        className="stepper__input"
        type="radio"
        key={ key }
        defaultChecked={ checked }
      />
      <div className="stepper__step" >
        <label className="stepper__button" htmlFor={id}>
          { step.label && <FormattedMessage id={`stepper.${step.label}`} /> }
        </label>
        <div className="stepper__content">
          <DatePicker
            value={ step.value }
            name={ step.key }
            handleDayChange={ e => handleDayChange(e) }
          />
        </div>
      </div>
    </Fragment>
  )
}
