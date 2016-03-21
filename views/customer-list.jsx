import React    from 'React';

import {marked} from './_format'
import {Empty}  from './empty-listing';

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
  render: function() {
    let hasCustomer = this.props.customers.length;
    let body = hasCustomer ? <CustomerTable {...this.props} /> : <Empty />;
    return (
      <section>
        <h1>
          Customers
          <a href="/customer" className="btn-circular">+</a>
        </h1>
        {body}
      </section>
    );
  }
});

export {CustomerList as default};
