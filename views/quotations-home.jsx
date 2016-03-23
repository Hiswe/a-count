import React from 'React';

import QuotationsList from './quotation-list.jsx';

var QuotationsHome = React.createClass({
  render: function() {
    return (
      <section>
        <h1>
          Quotations
          <a href="/quotation" className="btn-fab">+</a>
        </h1>
        <QuotationsList {...this.props} />
      </section>
    );
  }
});

export {QuotationsHome as default};
