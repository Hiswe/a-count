import React from 'React';

import Layout         from './_layout.jsx';
import QuotationsList from './quotation-list.jsx';

var QuotationsHome = React.createClass({
  render: function() {
    return (
      <Layout>
        <h1>
          Quotations
          <a href="/quotation" className="btn-fab">+</a>
        </h1>
        <QuotationsList {...this.props} />
      </Layout>
    );
  }
});

export {QuotationsHome as default};
