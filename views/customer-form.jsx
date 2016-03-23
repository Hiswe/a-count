import React    from 'React';

import {Floating} from './form.jsx';

var CreateBtn = React.createClass({
  render: function () {
    return ( <a className="btn-secondary" href="/customer">New Customer</a> );
  }
});

var CustomerForm = React.createClass({
  render: function () {
    let customer    = this.props.customer || {};
    console.log('CustomerForm', customer ? true : false);
    let formAction  = customer ? `/customer/${customer._id}` : '/customer'
    let submitMsg   = customer ? 'Update customer' : 'Create customer';
    let customerId  = customer ? (<input type="hidden" value={customer._id} name="id" />) : null;
    let secondaryAction = customer ? <CreateBtn /> : null;

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
