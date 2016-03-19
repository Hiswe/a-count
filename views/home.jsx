import React from 'React';

import QuotationsList from './quotation-list.jsx';

var Empty = React.createClass({
  render: function () {
    return (
      <p>none (yet)</p>
    );
  }
});

var Home = React.createClass({
  render: function() {
    console.log(this.props);
    let body = this.props.quotations.length ? <QuotationsList {...this.props} /> : <Empty />
    return (
      <section>
        <h1>
          Quotations
          <a href="/quotation" className="btn-circular">+</a>
        </h1>
        {body}
      </section>
    );
  }
});

export {Home as default};
