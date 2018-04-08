import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import * as compute from '../utils/compute-total.js'
import Table from './table.jsx'
import { Amount, Markdown, FormatNumber } from './format.jsx'
import TextareaAutoResize from './textarea-auto-resize.jsx'

const BASE_CLASS = `product-total`

// only use defaultValue
// • handleChange is handled globally at the form level

export function ProductLineEditable( props ) {
  const { fieldPath, product } = props
  const total = compute.productTotal( product )

  return (
    <tr>
      <td>
        <input
          type="hidden"
          name={`${fieldPath}[_id]`}
          value={ product.get(`_id`) }
        />
        <TextareaAutoResize
          name={`${fieldPath}[description]`}
          defaultValue={ product.get(`description`) }
        />
      </td>
      <td className="is-number">
        <input
          type="number"
          min="0"
          step="0.25"
          name={ `${fieldPath}[quantity]` }
          defaultValue={ product.get(`quantity`) }
        />
      </td>
      <td className="is-number">
        <input
          type="number"
          min="0"
          step="0.5"
          name={ `${fieldPath}[price]` }
          defaultValue={ product.get(`price`) }
        />
      </td>
      <td className="is-total is-number">
        <Amount value={ total } />
      </td>
      <td className="is-action">
        { props.children }
      </td>
    </tr>
  )
}

export function ProductLineDisplay( props ) {
    const { fieldPath, product } = props
  const total = compute.productTotal( product )
  return (
    <tr>
      <td className="is-padded">
        <Markdown text={ product.description } />
      </td>
      <td className="is-number">
        <FormatNumber value={ product.quantity } minimumFractionDigits={2} />
      </td>
      <td className="is-number">
        <FormatNumber value={ product.price } minimumFractionDigits={2} />
      </td>
      <td className="is-total is-number">
        <Amount value={ total } />
      </td>
    </tr>
  )
}

function TotalFooter( props ) {
  const { products, tax, readOnly } = props
  const totals = compute.totals( products, tax )
  return (
    <tfoot className={ BASE_CLASS }>
      <tr className={`${BASE_CLASS}__line`}>
        <td colSpan="3">
          <p><FormattedMessage id="table.amount-ht"/></p>
        </td>
        <td>
          <Amount value={ totals.net } />
        </td>
        { !readOnly && <td className="is-action"></td> }
      </tr>
      <tr className={`${BASE_CLASS}__line`}>
        <td colSpan="3">
          <p><FormattedMessage id="table.amount-taxes"/></p>
        </td>
        <td>
          <Amount value={ totals.tax } />
        </td>
        { !readOnly && <td className="is-action"></td> }
      </tr>
      <tr className={`${BASE_CLASS}__line`}>
        <td colSpan="3">
          <p><FormattedMessage id="table.amount"/></p>
        </td>
        <td>
          <Amount value={ totals.all } />
        </td>
        { !readOnly && <td className="is-action"></td> }
      </tr>
    </tfoot>
  )
}

export function ProductTable( props ) {
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
