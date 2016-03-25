import React from 'React';

import Layout         from './_layout.jsx'
import QuotationList  from './quotation-list.jsx';
import InvoiceList    from './invoice-list.jsx';

// <InvoiceList invoices={this.props.invoices} />
var Home = React.createClass({
  statics: {
    load: '/api/home',
  },
  componentWillMount: function () {
    // console.log('----------- Home : componentWillMount', this.constructor.datas !=null);
    if (this.constructor.datas) this.props = this.constructor.datas;
  },
  render: function() {
    // console.log('----------- Home');
    // console.log(this.props);
    // console.log(this.constructor);
    return (
      <div>
        <h1>Home <a href="/quotation" className="btn-circular">+</a></h1>
        <QuotationList quotations={this.props.quotations} />
        <InvoiceList invoices={this.props.invoices} />
      </div>
    );
  }
});

export {Home as default};
