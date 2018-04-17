import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import { DatePicker } from '../ui/date-picker.jsx'

import './stepper.scss'
const BASE_CLASS           = `stepper`
export const CHECKED_CLASS = `${BASE_CLASS}--is-all-checked`
export const RADIO_CLASS   = `${BASE_CLASS}__input`
const CHECKBOX_NAME        = `stepper-display-form`

export class Stepper extends React.Component {

  constructor( props ) {
    super( props )
    this.handleChange = this.handleChange.bind( this )
    this.state = {
      currentStep:  0,
      isAllChecked: false,
    }
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    const { steps } = nextProps
    if ( !Array.isArray(steps) ) return prevState
    const currentStep  = Stepper.getSelectedIndex( steps )
    const isAllChecked = currentStep === steps.length
    return {
      currentStep,
      isAllChecked,
    }
  }

  static getSelectedIndex( steps ) {
    let index = 0
    const hasOneMissingStep = steps.some( (step, i) => {
      const hasNoValue = step.value == null || step.value === ``
      if ( hasNoValue ) index = i
      return hasNoValue
    })
    return hasOneMissingStep ? index : steps.length
  }

  handleChange( event, index ) {
    // we don't want the event to leak to main form
    event.stopPropagation()
    // we still want to be able to show everything manually
    this.setState( prevState => {
      return {
        currentStep:  index,
        isAllChecked: false,
      }
    })
  }

  render( ) {
    const { steps, ...otherProps}       = this.props
    const { currentStep, isAllChecked } = this.state
    const COMP_CLASS                    = [ BASE_CLASS ]
    if ( isAllChecked ) COMP_CLASS.push( CHECKED_CLASS )
    return (
      <div className={ COMP_CLASS.join(` `) }>
        {
          steps.map((step, index) => (
            <Step
              key={ step.key }
              checked={ index === currentStep }
              index={ index }
              step={ step }
              handleChange={ event => this.handleChange( event, index ) }
              { ...otherProps }
            />
          ))
        }
      </div>
    )
  }
}

export function Step( props ) {
  const { step, checked, index, handleDayChange } = props
  const id  = `${ step.key }-${ index }`
  return (
    <React.Fragment>
      <input id={ id }
        name={ CHECKBOX_NAME }
        className={`${ RADIO_CLASS }`}
        type="radio"
        checked={ checked }
        onChange={ props.handleChange }
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
    </React.Fragment>
  )
}
