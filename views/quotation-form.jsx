import React        from 'react'
import { connect }  from 'react-redux'
import { Link }     from 'react-router-dom'

import {Input}                      from './form.jsx';
import {formatDate, id as formatId} from './_format';
import {
  Amount,
  getInformationsFromFakeId,
} from './_utils.jsx'
import {
  PrintBtn,
  Meta,
} from './business-form-meta.jsx'

import { Body } from  './business-form-body.jsx'

////////
// WHOLE PAGE
////////

let Actions = (props) => {
  let newQuot       = <a key="action-newQuot" href="/quotation" className="btn-fab">+</a>
  let convertRoute  = `/quotation/convert-to-invoice/${props.businessForm.id}`;
  let convert       = <button key="action-convert" className="btn-secondary" formAction={convertRoute} formMethod="post">Convert to invoice</button>;

  return (
    <div className="action">
      <button className="btn" type="submit" name="convertToInvoice" value="false">
        {props.isNew ? 'Create quotation' : 'Update quotation'}
      </button>
      {props.isNew ? null : ['\u00A0', newQuot, '\u00A0', convert]}
    </div>
  )
}

function mapActions(state, ownProps) {
  let infos = getInformationsFromFakeId(state, ownProps)
  return infos
}

Actions = connect(mapActions)(Actions)

// <input type="hidden" value={quotation.index.quotation} name="index[quotation]" />
// <input type="hidden" value={quotation.time.created} name="time[created]" />
// {isNew ? null : <input type="hidden" value={quotation._id} name="_id" /> }
// {isNew ? null : <input type="hidden" value={fakeId} name="fakeId" /> }

const HiddenInputs = (props) => (
  <div className="hidden-inputs">
  </div>
)

let QuotationForm = (props) => (
  <div>
    <header>
      <h1>
        {'Quotation\u00A0'}
      </h1>
      <PrintBtn {...props.params} />
    </header>
    <form method="post" action={props.formAction}>
      {props.isNew ? null : <HiddenInputs /> }
      <Meta {...props} />
      <Body {...props} />
      <Actions {...props.params} />
    </form>
  </div>
)

function mapQuotationForm(state, ownProps) {
  let infos = getInformationsFromFakeId(state, ownProps.params)
  return {
    isNew: infos.isNew,
    formAction: infos.isNew ? '/quotation' : `/quotation/${infos.businessForm.id}`
  }
}

export default connect(mapQuotationForm)(QuotationForm)
