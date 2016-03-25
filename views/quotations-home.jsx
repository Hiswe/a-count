import React from 'React';

// import Layout         from './_layout.jsx';
import QuotationsList from './quotation-list.jsx';

// http://stackoverflow.com/questions/28725125/using-react-js-statics-inside-class-methods
var QuotationsHome = React.createClass({
  statics: {
    load: '/api/quotations',
  },
  componentWillMount: function () {
    if (this.constructor.datas) this.props = this.constructor.datas;
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
