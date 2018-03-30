import React, { Fragment } from 'react'
import moment from 'moment'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
// http://react-day-picker.js.org/docs/localization
import 'moment/locale/en-gb'
import 'moment/locale/fr'

import './date-picker.scss'

// using https://react-day-picker.js.org/

const disabledDays = {
  after: new Date(),
}

function DatePicker( props ) {
  const { handleDayChange, value, ...otherProps } = props
  const dateObject = moment( value )
  const dateValue = dateObject.isValid() ? dateObject.toDate() : ``
  return (
    <DayPickerInput
      inputProps={ otherProps }
      value={ dateValue }
      locale={ `fr` }
      formatDate={ formatDate }
      parseDate={ parseDate }
      clickUnselectsDay
      dayPickerProps={{
        disabledDays,
      }}
      format="L"
      placeholder={`dd/mm/yyyy`}
      dayPickerProps={{
        locale:     `fr`,
        localeUtils: MomentLocaleUtils,
      }}
      onDayChange={ day => {
        handleDayChange( {
          name: otherProps.name,
          value: day || ``,
        })
      } }
    />
  )
}

export default DatePicker
