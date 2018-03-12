import React, { Fragment } from 'react'

import { formatDate } from '../_helpers.js'

import Field from '../ui/field.jsx'

const StatusLine = props => {
  const { step, onChange, value } = props
  return (
    <div className="status__item">
      <input type="hidden" name={step.key} value="false" />
      <Field
        type="checkbox"
        id={step.key} name={step.key}
        value="true"
        checked={value}
        onChange={onChange} />
      <div className="status__date">{ formatDate(value) }</div>
    </div>
  )
}

const Status = props => {
  const { formData, onChange } = props
  return (
    <div className="status">
    {
      Array.isArray(formData.steps) && formData.steps.map( step => (
        <StatusLine key={step.key} value={formData[step.key]} step={step} onChange={onChange} />
      ))
    }
    </div>
  )
}

export { Status as default }
