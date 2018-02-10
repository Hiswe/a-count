import React        from 'react'
import { connect }  from 'react-redux'
import { Link } from 'react-router-dom'

import { Floating } from './form.jsx'

const CreateBtn = () =>  (
  <Link to="/customers/new" className="btn-secondary">New Customer</Link>
)

function mapStateToProps(state, ownProps) {
  const customerId  = void 0
  const newCustomer = typeof customerId === 'undefined'
  const submitMsg   = newCustomer ? 'Create customer' : 'Update customer'
  if (newCustomer) {
    return {
      formAction: '/customers/new',
      newCustomer,
      submitMsg,
      customer: {},
    }
  }
  const customer = state.entities.customers[customerId]
  return {
    formAction: `/customer/${customer._id}`,
    newCustomer,
    submitMsg,
    customer,
  }
}

let CustomerForm = (props) => (
  <section>
    <form method="post" action={props.formAction}>
      <h1>Customer</h1>
      {props.newCustomer ? null : <input type="hidden" value={props.customer._id} name="id" />  }
      <fieldset>
        <Floating key="name" name="name" value={props.customer.name} />
        <Floating key="address" name="address" type="textarea" value={props.customer.address} />
      </fieldset>
      <div className="actions">
        <button className="btn" type="submit">{props.submitMsg}</button>
        {props.newCustomer ? null : <CreateBtn />}
      </div>
    </form>
  </section>
)

export default connect(mapStateToProps)(CustomerForm)
