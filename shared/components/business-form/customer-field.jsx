import React from 'react'

{/* <datalist id="customer-list">
{ customers.list.map( (c, i) => (
  <option key={c.name} value={c.name} />
)) }
</datalist>
<input className="field"
  id="customerName" name="customerName"
  list="customer-list"
  onChange={props.onChange}
  type="text"
  value={formData.customerName}
/> */}

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

