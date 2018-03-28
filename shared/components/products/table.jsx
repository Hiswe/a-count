import React, { Fragment } from 'react'

import * as compute from '../utils/compute-total.js'
import Table from '../ui/table.jsx'
import Amount from '../ui/amount.jsx'

import './table.scss'
const BASE_CLASS = `product-total`

const TotalFooter = props => {
  const { products, tax } = props
  const totals = compute.totals( products, tax )
  return (
    <tfoot className={ BASE_CLASS }>
      <tr className={`${BASE_CLASS}__line`}>
        <td colSpan="3"><p>Total net</p></td>
        <td>
          <Amount
            value={ totals.net }
            currency={ props.currency }
          />
        </td>
        <td className="is-action"></td>
      </tr>
      <tr className={`${BASE_CLASS}__line`}>
        <td colSpan="3"><p>Taxes</p></td>
        <td>
          <Amount
            value={ totals.tax }
            currency={ props.currency }
          />
        </td>
        <td className="is-action"></td>
      </tr>
      <tr className={`${BASE_CLASS}__line`}>
        <td colSpan="3"><p>Total with taxes</p></td>
        <td>
          <Amount
            value={ totals.all }
            currency={ props.currency }
          />
        </td>
        <td className="is-action"></td>
      </tr>
    </tfoot>
  )
}

const ProductTable = props => {
  const { products, tax, currency } = props
  const columns = [
    {label: `description`},
    {label: `quantity`},
    {label: `unit price`},
    {label: `total`},
    {label: ``, className: `is-action`},
  ]
  return (
    <Table
      columns={ columns }
      footer={ <TotalFooter {...props} /> }
    >
      { props.children }
    </Table>
  )
}

export default ProductTable
