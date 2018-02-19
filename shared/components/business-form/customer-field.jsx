import React from 'react'

// TODO this should fetch the customers itself
// TODO we should be able to create a new customer from here

const CustomerField = props => {
  const { customers, formData } = props
  return (
    <div className="input">
      <label className="item" htmlFor="customerId">Customer</label>
      <select name="customerId" id="customerId" onChange={props.onChange} value={formData.customerId}>
        { customers.list.map( (c, i) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        )) }
      </select>

    </div>
  )
}

export { CustomerField as default }

