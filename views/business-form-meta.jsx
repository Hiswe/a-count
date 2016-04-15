import React            from 'react'
import { connect }      from 'react-redux'
import { Link }         from 'react-router'

import { Input }        from './form.jsx'

import { createBlank }  from '../shared/blank-business-form'
import { formatDate }   from './_format'
import { getInformationsFromFakeId }   from './_utils'

// shared components between quotation & invoice form

////////
// PRINT BUTTON
////////

let PrintBtn = function (props) {
  if (props.isNew) return null
  return (
    <a key="print" href={`/print/${props.fakeId }`} className="btn">Print</a>
  )
}

PrintBtn = connect(getInformationsFromFakeId)(PrintBtn)

export {PrintBtn}

////////
// TOP LEFT BLOCK
////////

//----- CUSTOMER FIELD

let CustomerDataList = (props) => (
  <datalist id="customer-list">
    { props.customers.map( (c, i) => <option key={c.name} value={c.name} />) }
  </datalist>
)

function mapDataList(state) {
  return {
    customers: state.result.customers.map( id => state.entities.customers[id] )
  }
}

CustomerDataList = connect(mapDataList)(CustomerDataList)

let CustomerField = function (props) {
  return (
    <div className="input">
      <label className="item" htmlFor="customer">Customer</label>
      {props.isInvoice ? null : <CustomerDataList />}
      <input className="field" id="customer" name="customer" list="customer-list" type="text" defaultValue={props.businessForm.customer} />
    </div>
  )
}

CustomerField = connect(getInformationsFromFakeId)(CustomerField)

//----- STATUS

const StatusLine = (props) => (
  <div className="cell-1-4">
    <Input id={props.id} name={props.name} type="checkbox" checked={props.isFilled} disabled={props.isFilled} />
    <div>{props.time}</div>
  </div>
)


function mapStatus(state, ownProps) {
  let infos = getInformationsFromFakeId(state, ownProps)
  let steps = infos.isInvoice ? ['send', 'validated', 'signed', 'done'] :
    ['send', 'validated', 'signed', 'done']

  return {
    steps: steps.map((step) => ({
      id:       step,
      name:     `status[${step}]`,
      time:     formatDate(infos.businessForm.time[step]),
      isFilled: infos.businessForm.time[step] !== false,
    }))
  }
}

let Status = (props) => (
  <div className="row status-wrapper">
    {props.steps.map((step, i) => <StatusLine key={`status-${i}`} {...step} /> )}
  </div>
)

Status = connect(mapStatus)(Status)

////////
// TOP RIGHT BLOCK
////////

let Tax = (props) => (
  <Input name="tax" type="number" step="any" value={props.businessForm.tax} />
)

Tax = connect(getInformationsFromFakeId)(Tax)

////////
// WHOLE BLOCK
////////


const Meta = (props) => (
  <div className="row">
    <fieldset className="cell-2-3 card">
      <CustomerField {...props.params} />
      <Status {...props.params} />
    </fieldset>
    <fieldset className="cell-1-3 card">
      <Tax {...props.params} />
    </fieldset>
  </div>
)

export { Meta }
