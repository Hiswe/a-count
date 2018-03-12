import React, { Fragment } from 'react'

import * as compute from '../_compute.js'
import Table from '../ui/table.jsx'
import Amount from '../ui/amount.jsx'

const TotalFooter = props => {
  const { products, tax, currency  } = props
  const totals = compute.totals( products, tax )
  return (
    <Fragment>
      <tr>
        <td colSpan="3">Total net</td>
        <td><Amount value={totals.net} currency={props.currency} /></td>
        <td></td>
      </tr>
      <tr>
        <td colSpan="3">Taxes</td>
        <td><Amount value={totals.tax} currency={props.currency} /></td>
        <td></td>
      </tr>
      <tr>
        <td colSpan="3">Total with taxes</td>
        <td><Amount value={totals.all} currency={props.currency} /></td>
        <td></td>
      </tr>
    </Fragment>
  )
}

const ProductTable = props => {
  const { products, tax, currency } = props
  const canShowTotal = Array.isArray( products ) && Number.isFinite( tax )
  return (
    <Table
      columns="description, quantity, unit price, total, "
      footer={ canShowTotal ?
        <TotalFooter {...props} />
        : void(0)
      }
    >
      { props.children }
    </Table>
  )
}

export default ProductTable
