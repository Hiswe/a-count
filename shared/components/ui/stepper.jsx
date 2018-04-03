import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import DatePicker from '../ui/date-picker.jsx'

import './stepper.scss'
const BASE_CLASS    = `stepper`
export const CHECKED_CLASS = `${BASE_CLASS}--is-all-checked`
const CHECKBOX_NAME = `stepper-display-form`

// always open the next step after one has a date
export function getSelectedIndex( steps ) {
  let nextIndex = -1
  for ( let i = 0; i < steps.length; i++ ) {
    if ( !steps[i].value ) break
    nextIndex = i + 1
  }
  return Math.max( 0, Math.min( nextIndex, steps.length ) )
}

export function Stepper( props ) {
  const { steps, ...otherProps} = props
  if ( !Array.isArray(steps) ) return null
  const { length }        = steps
  const currentStepIndex  = getSelectedIndex( steps )
  const isAllChecked      = currentStepIndex === length
  const COMP_CLASS        = [
    BASE_CLASS
  ]
  if ( isAllChecked ) COMP_CLASS.push( CHECKED_CLASS )
  return (
    <div className={ COMP_CLASS.join(` `) }>
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
  // enforce a key to re-render defaultValue input
  // • https://stackoverflow.com/questions/30792526/defaultvalue-change-does-not-re-render-input#answer-39239074
  const key = `${ index }-${ checked }`
  return (
    <Fragment>
      <input id={ id }
        name={ CHECKBOX_NAME }
        className={`${ BASE_CLASS }__input`}
        type="radio"
        key={ key }
        defaultChecked={ checked }
      />
      <div className={`${ BASE_CLASS }__step`} >
        <label className={`${ BASE_CLASS }__button`} htmlFor={id}>
          { step.label && <FormattedMessage id={`stepper.${step.label}`} /> }
        </label>
        <div className={`${ BASE_CLASS }__content`}>
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
