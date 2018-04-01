import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import * as compute from '../utils/compute-total.js'
import Table from '../ui/table.jsx'
import { Amount } from '../ui/format.jsx'

import './table.scss'
const BASE_CLASS = `product-total`

const TotalFooter = props => {
  const { products, tax, readOnly } = props
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
        { !readOnly && <td className="is-action"></td> }
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
        { !readOnly && <td className="is-action"></td> }
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
        { !readOnly && <td className="is-action"></td> }
      </tr>
    </tfoot>
  )
}

const ProductTable = props => {
  const { readOnly } = props
  const columns = [
    {label: `table.header.description`},
    {label: `table.header.quantity`},
    {label: `table.header.unit-price`},
    {label: `table.amount`},
  ]
  if ( !readOnly ) columns.push({label: false, className: `is-action`})
  const COMP_CLASS = [`table--product`]
  if ( readOnly ) COMP_CLASS.push( `table--print` )
  return (
    <Table
      columns={ columns }
      className={ COMP_CLASS.join(` `) }
      footer={ <TotalFooter {...props} /> }
    >
      { props.children }
    </Table>
  )
}

export default ProductTable
