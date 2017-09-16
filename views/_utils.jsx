import React from 'react'

import { createBlank }  from '../shared/blank-business-form'

const Empty = () => (
  <p>none (yet)</p>
)

const Amount = (props) => (
  <p className="amount">
    {'€\u00A0'} <span>{props.value}</span>
  </p>
)
// var Amount         = React.createClass({
//   render: function () {
//     return (
//       <p className="amount">
//         {'€\u00A0'} <span>{this.props.value}</span>
//       </p>
//     );
//   }
// });

// used by react-redux to connect id Param & datas
function getInformationsFromFakeId(state, ownProps) {
  let isNew         = ownProps.fakeId == null
  let fakeId        = ownProps.fakeId
  let isInvoice     = !isNew && state.entities.invoices[fakeId] != null
  let isQuotation   = !isNew && !isInvoice
  let businessForm  = isNew ? createBlank() :
    state.entities[isInvoice ? 'invoices' : 'quotations'][fakeId]
  return {
    isNew,
    isInvoice,
    isQuotation,
    businessForm,
  }
}

// export {Empty, Amount}
export {
  Empty,
  Amount,
  getInformationsFromFakeId,
}
