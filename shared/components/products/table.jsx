import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

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
        <td colSpan="3">
          <p><FormattedMessage id="table.amount-ht"/></p>
        </td>
        <td>
          <Amount
            value={ totals.net }
            currency={ props.currency }
          />
        </td>
        <td className="is-action"></td>
      </tr>
      <tr className={`${BASE_CLASS}__line`}>
        <td colSpan="3">
          <p><FormattedMessage id="table.amount-taxes"/></p>
        </td>
        <td>
          <Amount
            value={ totals.tax }
            currency={ props.currency }
          />
        </td>
        <td className="is-action"></td>
      </tr>
      <tr className={`${BASE_CLASS}__line`}>
        <td colSpan="3">
          <p><FormattedMessage id="table.amount"/></p>
        </td>
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
    {label: `table.header.description`},
    {label: `table.header.quantity`},
    {label: `table.header.unit-price`},
    {label: `table.amount`},
    {label: false, className: `is-action`},
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
