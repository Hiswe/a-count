import React from 'react'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import 'moment/locale/en-gb'

import './date-picker.scss'

//  modifiers={ {
//   disabled: { daysOfWeek: [0] },
//   selected: isFirstOfMonth
// }}

// before: new Date(),
// https://momentjs.com/docs/#localized-formats

const disabledDays = {
  after: new Date(),
}

export default function DatePicker( props ) {
  const { onChange, value, ...otherProps } = props
  const dateObject = moment( value )
  const dateValue = dateObject.isValid() ? dateObject.toDate() : ``
  return (
    <DayPickerInput
      inputProps={ otherProps }
      value={ dateValue }
      formatDate={ formatDate }
      parseDate={ parseDate }
      clickUnselectsDay
      dayPickerProps={{
        disabledDays,
      }}
      format="L"
      placeholder={`dd/mm/yyyy`}
      dayPickerProps={{
        locale: 'en-gb',
        localeUtils: MomentLocaleUtils,
      }}
      onDayChange={ e => {
        // make a false event
        // • to be iso with “handleChange” function
        const falseEvent = {
          target: {
            type: `date`,
            getAttribute() { return otherProps.name },
            value: e || ``,
          }
        }
        onChange( falseEvent )
      } }
    />
  )
}
