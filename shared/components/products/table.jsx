import React, { Fragment } from 'react'

import * as compute from '../utils/compute-total.js'
import Table from '../ui/table.jsx'
import Amount from '../ui/amount.jsx'

const TotalFooter = props => {
  const { products, tax } = props
  const totals = compute.totals( products, tax )
  return (
    <Fragment>
      <tr>
        <td colSpan="3"><p>Total net</p></td>
        <td>
          <Amount
            value={ totals.net }
            currency={ props.currency }
          />
        </td>
        <td></td>
      </tr>
      <tr>
        <td colSpan="3"><p>Taxes</p></td>
        <td>
          <Amount
            value={ totals.tax }
            currency={ props.currency }
          />
        </td>
        <td></td>
      </tr>
      <tr>
        <td colSpan="3"><p>Total with taxes</p></td>
        <td>
          <Amount
            value={ totals.all }
            currency={ props.currency }
          />
        </td>
        <td></td>
      </tr>
    </Fragment>
  )
}

const ProductTable = props => {
  const { products, tax, currency } = props
  return (
    <Table
      columns="description, quantity, unit price, total, "
      footer={ <TotalFooter {...props} /> }
    >
      { props.children }
    </Table>
  )
}

export default ProductTable
