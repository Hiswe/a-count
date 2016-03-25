import React from 'React';

import QuotationList  from './quotation-list.jsx';
import InvoiceList    from './invoice-list.jsx';

var Home = React.createClass({
  statics: {
    load: '/api/home',
  },
  componentWillMount: function () {
    if (this.constructor.datas) this.props = this.constructor.datas;
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
        <InvoiceList invoices={this.props.invoices} />
      </div>
    );
  }
});

export {Home as default};
