import React, { Fragment } from 'react'

import * as compute from '../_compute.js'
import Table from '../ui/table.jsx'
import Amount from '../ui/amount.jsx'

const TotalFooter = props => {
  const { products, tax } = props
  const isValidTax      = Number.isFinite( tax )
  const isValidProducts = Array.isArray( products )
  const canShowTotal = isValidTax && isValidProducts
  const errorMessage = canShowTotal ? false
    : isValidTax ? `invalid product`
    : `invalid tax`
  const totals = canShowTotal ? compute.totals( products, tax )
    : { net: false, tax: false, all: false }
  return (
    <Fragment>
      <tr>
        <td colSpan="3"><p>Total net</p></td>
        <td>
          <Amount
            value={ totals.net }
            currency={ props.currency }
            errorMessage={ errorMessage }
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
            errorMessage={ errorMessage }
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
            errorMessage={ errorMessage }
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
