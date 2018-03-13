import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import FullPage from '../../components/ui/layout-full-page.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList } from '../../components/quotations/secondary-nav-actions.jsx'

// TODO: should write quotation ID
// {formData.count && '-\u00A0'}
// {formData.count && (<span>PR { formData.count+350 }</span>)}
// TODO: should have a print button

// class EditQuotation extends Component {

//   static fetchData(store, params, cookies) {
//     return Promise.all([
//       store.dispatch( quotations.getOne(params, cookies) ),
//       store.dispatch( customers.getAll(params, cookies) ),
//     ])
//   }

//   render() {
//     const { props } = this
//     return (
//       <FullPage title="Edit Quotation" secondary={ButtonList} >
//         <div className="page__content">
//           <QuotationForm {...props} />
//         </div>
//       </FullPage>
//     )
//   }
// }

// export default EditQuotation

const EditQuotation = props => {
  return (
    <FullPage title="Edit Quotation" secondary={ButtonList} >
      <div className="page__content">
        <QuotationForm {...props} />
      </div>
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: EditQuotation,
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )

