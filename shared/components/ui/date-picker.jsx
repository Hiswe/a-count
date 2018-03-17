import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'

import './date-picker.scss'

export default DatePicker

// https://momentjs.com/docs/#localized-formats

function DatePicker( props ) {
  return (
    <DayPickerInput
      {...props}
      formatDate={ formatDate }
      parseDate={ parseDate }
      format="L"
      placeholder={`dd/mm/yyyy`}
    />
  )
}
