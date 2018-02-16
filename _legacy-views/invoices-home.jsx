import React from 'react'

import InvoiceList from './invoice-list.jsx'

// var QuotationsHome = React.createClass({
//   statics: {
//     load: '/api/invoices',
//   },
//   render: function() {

const QuotationsHome = props => {
  return (
    <div>
      <h1>
        Invoices
      </h1>
      <InvoiceList {...props} />
    </div>
  )
}

export { QuotationsHome as default }
