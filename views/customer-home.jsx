import React    from 'React';

import Layout   from './_layout.jsx'
import {marked} from './_format'
import {Empty}  from './_utils';

var CustomerRow = React.createClass({
  render: function () {
    let url      = `/customer/${this.props.customer._id}`;
    let address  = { __html: marked(this.props.customer.address)};
    return (
      <tr>
        <td>
          <a href={url}>#{this.props.customer.name}</a>
        </td>
        <td dangerouslySetInnerHTML={address} />
      </tr>
    );
  }
});

var CustomerTable = React.createClass({
  render: function () {
    let body = this.props.customers.map( (c, i) => ( <CustomerRow key={i} customer={c} /> ) )
    return (
      <table className="table-pres" cellSpacing="0">
        <thead>
          <tr>
            <th>name</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    );
  }
});

var CustomerList = React.createClass({
  statics: {
    load: '/api/customers',
  },
  componentWillMount: function () {
    if (this.constructor.datas) this.props = this.constructor.datas;
  },
  render: function() {
    let hasCustomer = this.props.customers && this.props.customers.length;
    return (
      <div>
        <h1>
          Customers
          <a href="/customer" className="btn-fab">+</a>
        </h1>
        {hasCustomer ? <CustomerTable {...this.props} /> : <Empty />}
      </div>
    );
  }
});

export {CustomerList as default};
