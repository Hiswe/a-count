import React from 'react';

import QuotationsList from './quotation-list.jsx';

var QuotationsHome = React.createClass({
  statics: {
    load: '/api/quotations',
  },
  render: function() {
    return (
      <div>
        <h1>
          Quotations
          <a href="/quotation" className="btn-fab">+</a>
        </h1>
        <QuotationsList {...this.props} />
      </div>
    );
  }
});

export {QuotationsHome as default};
