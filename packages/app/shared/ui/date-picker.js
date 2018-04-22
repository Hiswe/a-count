import React  from 'react'
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

export function DatePicker( props ) {
  const { handleDayChange, value, ...inputProps } = props
  // empty values should treated as invalid date
  // • maybe the serve doesn't send us a date all!
  const dateObject = moment( value || `` )
  const dateValue = dateObject.isValid() ? dateObject.toDate() : ``
  return (
    <DayPickerInput
      value={ dateValue }
      locale={ `fr` }
      formatDate={ formatDate }
      parseDate={ parseDate }
      clickUnselectsDay
      format="L"
      placeholder={ `dd/mm/yyyy` }
      inputProps={ inputProps }
      dayPickerProps={{
        disabledDays,
        locale:     `fr`,
        localeUtils: MomentLocaleUtils,
      }}
      onDayChange={ day => {
        handleDayChange && handleDayChange( {
          name: inputProps.name,
          value: day || ``,
        })
      } }
    />
  )
}
