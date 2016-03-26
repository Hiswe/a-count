import React      from 'React';

import {Floating} from './form.jsx';

var CreateBtn = React.createClass({
  render: function () {
    return ( <a className="btn-secondary" href="/customer">New Customer</a> );
  }
});

var CustomerForm = React.createClass({
  statics: {
    load: '/api/customer/:customerId',
  },
  render: function () {
    let hasCustomer = this.props.customer != null
    let customer    = this.props.customer || {}
    let formAction  = hasCustomer ? `/customer/${customer._id}` : '/customer'
    let submitMsg   = hasCustomer ? 'Update customer' : 'Create customer';
    let customerId  = hasCustomer ? (<input type="hidden" value={customer._id} name="id" />) : null;
    let secondaryAction = hasCustomer ? <CreateBtn /> : null;

    return (
      <section>
        <h1>Customer</h1>
        <form method="post" action={formAction}>
          {customerId}
          <fieldset>
            <Floating name="name" value={customer.name} />
            <Floating name="address" type="textarea" value={customer.address} />
          </fieldset>
          <div className="actions">
            <button className="btn" type="submit">{submitMsg}</button>
            {secondaryAction}
          </div>
        </form>
      </section>
    );
  }
});

export {CustomerForm as default};
