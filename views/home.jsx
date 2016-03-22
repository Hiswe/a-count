import React from 'React';

import QuotationList  from './quotation-list.jsx';
import InvoiceList    from './invoice-list.jsx';

// in HOMEPAGE there will be more tables
var Home = React.createClass({
  render: function() {
    return (
      <section>
        <h1>
          Quotations
          <a href="/quotation" className="btn-circular">+</a>
        </h1>
        <QuotationList quotations={this.props.quotations} />
        <h1>
          Invoices
        </h1>
        <InvoiceList invoices={this.props.invoices} />
      </section>
    );
  }
});

export {Home as default};
