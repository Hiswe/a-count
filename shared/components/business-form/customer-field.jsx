import React from 'react'

const CustomerField = (props) => {
  const { customers, formData } = props
  return (
    <div className="input">
      <label className="item" htmlFor="customer">Customer</label>
      <datalist id="customer-list">
      { customers.list.map( (c, i) => (
        <option key={c.name} value={c.name} />
      )) }
      </datalist>
      <input className="field"
        id="customer" name="customer"
        list="customer-list"
        type="text"
        value={formData.customer}
      />
    </div>
  )
}

export { CustomerField as default }

