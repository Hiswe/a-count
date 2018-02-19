import React, { Fragment } from 'react'

import { Input } from '../form.jsx'
import { formatDate } from '../_format.js'

const StatusLine = props => {
  const { step, onChange, value } = props
  return (
    <div className="status__item">
      <input type="hidden" name={step.key} value="false" />
      <Input
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
  if (!Array.isArray(formData.steps)) return (<div className="status"></div>)
  return (
    <div className="status">
    {
      formData.steps.map( step => (
        <StatusLine key={step.key} value={formData[step.key]} step={step} onChange={onChange} />
      ))
    }
    </div>
  )
}

export { Status as default }
