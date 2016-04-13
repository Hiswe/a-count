import React        from 'react'
import { Link }     from 'react-router'
import { connect }  from 'react-redux'

import { marked }   from './_format'

const CustomerRow = function (props) {
  let customer = props.customer
  let url      = `/customer/${customer._id}`
  let address  = { __html: marked(customer.address)}
  return (
    <tr>
      <td>
        <Link to={url}>#{customer.name}</Link>
      </td>
      <td dangerouslySetInnerHTML={address} />
    </tr>
  )
}

let CustomerList = function (props) {
  let body = props.ids.map( (id, i) => (
    <CustomerRow key={id} customer={props.customers[id]} />
  ))
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
  )
}

function mapStateToProp(state) {
  return {
    ids:        state.result.customers,
    customers:  state.entities.customers,
  }
}

CustomerList = connect(mapStateToProp)(CustomerList)

export { CustomerList as default }
