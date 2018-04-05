import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import * as compute from '../utils/compute-total.js'
import Table from './table.jsx'
import { Amount, Markdown } from './format.jsx'
import TextareaAutoResize from './textarea-auto-resize.jsx'

import './table-product.scss'
const BASE_CLASS = `product-total`

// only use defaultValue
// • handleChange is handled globally at the form level

export function ProductLine( props ) {
  const { fieldPath, product, readOnly, currency } = props
  const total = compute.productTotal( product )
  return (
    <tr>
      <td>{
        readOnly ? <Markdown text={ product.description } />
          : <TextareaAutoResize
          name={`${fieldPath}[description]`}
          defaultValue={ product.description }
        />
      }</td>
      <td className="is-number">{
        readOnly ? <p>{ product.quantity }</p>
          : <input
        type="number" min="0" step="0.25"
        name={ `${fieldPath}[quantity]` }
        defaultValue={ product.quantity }
      />
      }
      </td>
      <td className="is-number">{
        readOnly ? <p>{ product.price }</p>
          : <input
            type="number"
            min="0"
            step="1"
            name={ `${fieldPath}[price]` }
            defaultValue={ product.price }
          />
      }</td>
      <td className="is-total is-number">
        <Amount value={ total } currency={ currency } />
      </td>
      {!readOnly && <td className="is-action">
        { props.children }
        </td>
      }
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
