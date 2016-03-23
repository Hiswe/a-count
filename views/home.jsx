import React from 'React';

import Layout         from './_layout.jsx'
import QuotationList  from './quotation-list.jsx';
import InvoiceList    from './invoice-list.jsx';

var Home = React.createClass({
  render: function() {
    return (
      <Layout>
        <section>
          <h1>
            Quotations
            <a href="/quotation" className="btn-circular">+</a>
          </h1>
          <QuotationList quotations={this.props.quotations} />
        </section>
        <section>
          <h1>
            Invoices
          </h1>
          <InvoiceList invoices={this.props.invoices} />
        </section>
      </Layout>
    );
  }
});

export {Home as default};
