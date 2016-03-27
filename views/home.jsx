import React from 'react';

import QuotationList  from './quotation-list.jsx';
import InvoiceList    from './invoice-list.jsx';

var Home = React.createClass({
  statics: {
    load: '/api/home',
  },
  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <section>
          <h1>quotations
          <a href="/quotation" className="btn-circular">+</a>
          </h1>
          <QuotationList quotations={this.props.quotations} />
        </section>
        <section>
          <h1>invoices</h1>
          <InvoiceList invoices={this.props.invoices} />
        </section>
      </div>
    );
  }
});

export {Home as default};
