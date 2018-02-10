import React from 'react';

import QuotationsList from './quotation-list.jsx';

// var QuotationsHome = React.createClass({
//   statics: {
//     load: '/api/quotations',
//   },
//   render: function() {

const QuotationsHome = props => {
  return (
    <div>
      <h1>
        Quotations
        <a href="/quotation" className="btn-fab">+</a>
      </h1>
      <QuotationsList {...props} />
    </div>
  )
}

export { QuotationsHome as default }
