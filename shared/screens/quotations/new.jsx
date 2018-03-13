import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import * as customers from '../../ducks/customers'
import FullPage from '../../components/ui/layout-full-page.jsx'
import QuotationForm from '../../components/quotations/form.jsx'
import { ButtonList } from '../../components/quotations/secondary-nav-actions.jsx'

// class NewQuotation extends Component {

//   static fetchData(store, params, cookies) {
//     return Promise.all([
//       store.dispatch( quotations.getOne(params, cookies) ),
//       store.dispatch( customers.getAll(params, cookies) ),
//     ])
//   }

//   render() {
//     const { props } = this
//     return (
//       <FullPage title="New Quotation" secondary={ButtonList} >
//         <div className="page__content">
//           <QuotationForm {...props} />
//         </div>
//       </FullPage>
//     )
//   }
// }

const NewQuotation = props => {
  return (
    <FullPage title="New Quotation" secondary={ButtonList} >
      <div className="page__content">
        <QuotationForm {...props} />
      </div>
    </FullPage>
  )
}

export default connect()( ConnectDataFetcher({
  Component: NewQuotation,
  actionCreators: [
    customers.getAll,
    quotations.getOne,
  ],
}) )
