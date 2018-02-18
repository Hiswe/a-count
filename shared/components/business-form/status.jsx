import React, { Fragment } from 'react'

import { Input, InputLabel } from '../form.jsx'

const StatusLine = props => {
  const { step, onChange, value } = props
  return (
    <div className="status__item">
      <Input
        type="checkbox"
        id={step.key} name={step.key}
        checked={value} disabled={value}
        onChange={onChange} />
      <div className="status__date">{step.done ? step.doneAt : ``}</div>
    </div>
  )
}


// http://react.tips/checkboxes-in-react/
// http://jsfiddle.net/BrownieBoy/Ltwaafqk/
// https://www.ctheu.com/2015/02/12/how-to-communicate-between-react-components/#using-the-same-callback-for-all-our-children

// https://www.peterbe.com/plog/onchange-in-reactjs

{/* <Input
            type="checkbox"
            id={step.key} name={step.key}
            checked={formData[step.key]} disabled={formData[step.key]}
            onChange={onChange} /> */}

{/* <StatusLine key={step.key} value={formData[step.key]} step={step} onChange={onChange} /> */}
const Status = props => {
  const { formData, onChange } = props
  return (
    <div className="status">
    {
      //
      formData.steps.map( step => {
        return (
          <div className="status__item" key={step.key}>
            <InputLabel id={step.key} label={step.name}>
              <input type="checkbox" id={step.key} name={step.key}
              checked={formData[step.key]} disabled={formData[step.key]}
              value={step.key}
              onChange={onChange} />
            </InputLabel>
            <div className="status__date">{step.done ? step.doneAt : ``}</div>
          </div>
        )
      })
    }
    </div>
  )
}

export { Status as default }
