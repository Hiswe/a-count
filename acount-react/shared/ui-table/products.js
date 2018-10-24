import   React              from 'react'
import   classNames         from 'classnames'
import { FormattedMessage } from 'react-intl'
import   PropTypes          from 'prop-types'
import   crio               from 'crio'

import * as compute              from '../utils/compute-total'
import * as Format               from '../ui/format'
import {    CheckBox           } from '../ui/field'
import {    TextareaAutoResize } from '../ui/textarea-auto-resize'
import {    BtnIcon            } from '../ui/buttons'
import * as Table                from './index'

// only use defaultValue
// • handleChange is handled globally at the form level
export function ProductLineEditable( props ) {
  const { product, isLast, index, handleRemove } = props
  const fieldPath = `products[${ index }]`
  const total     = compute.productTotal( product )
  return (
    <Table.Row>
      <Table.Cell>
        { !isLast && (
          <CheckBox
            name={ `${fieldPath}[checked]` }
            defaultChecked={ product.get(`checked`) }
          />
        )}
      </Table.Cell>
      <Table.Cell>
        <input
          type="hidden"
          name={`${fieldPath}[_id]`}
          value={ product.get(`_id`) }
        />
        <TextareaAutoResize
          name={`${fieldPath}[description]`}
          defaultValue={ product.get(`description`) }
          placeholder="product.place-holder"
        />
      </Table.Cell>
      <Table.Cell>
        <input
          type="number"
          min="0"
          step="0.25"
          name={ `${fieldPath}[quantity]` }
          defaultValue={ product.get(`quantity`) }
        />
      </Table.Cell>
      <Table.Cell>
        <input
          type="number"
          min="0"
          step="0.5"
          name={ `${fieldPath}[price]` }
          defaultValue={ product.get(`price`) }
        />
      </Table.Cell>
      <Table.Cell>
        <Format.Amount value={ total } />
      </Table.Cell>
      <Table.Cell>
        { !isLast && (
          <BtnIcon
            linkAlike
            onClick={ e => handleRemove(index, fieldPath) }
            type="button"
            svgId="delete"
          />
        )}
      </Table.Cell>
    </Table.Row>
  )
}
ProductLineEditable.propTypes = {
  index       : PropTypes.number.isRequired,
  product     : PropTypes.object.isRequired,
  isLast      : PropTypes.bool.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export function ProductLineDisplay( props ) {
  const { product } = props
  if ( !product.checked ) return null
  const total = compute.productTotal( product )
  return (
    <Table.Row>
      <Table.Cell />
      <Table.Cell type="text">
        <Format.Markdown text={ product.description } />
      </Table.Cell>
      <Table.Cell type="number">
        <Format.Num value={ product.quantity } minimumFractionDigits={2} />
      </Table.Cell>
      <Table.Cell type="number">
        <Format.Amount value={ product.price } />
      </Table.Cell>
      <Table.Cell type="amount">
        <Format.Amount value={ total } />
      </Table.Cell>
      <Table.Cell />
    </Table.Row>
  )
}
ProductLineDisplay.propTypes = {
  product: PropTypes.object.isRequired,
}

function ProductTotalFooter( props ) {
  const { readOnly, document } = props
  // don't show multiple totals if no taxes
  const hasTax = document.totalTax > 0
  // in readOnly mode we remove toggle/remove buttons
  const colSpan = readOnly ? 3 : 4
  return (
    <Table.Footer>
      { hasTax && (
        <React.Fragment>
          <Table.RowFooter>
            <Table.Cell colSpan={ colSpan } type="number">
              <FormattedMessage id="table.amount-ht"/>
            </Table.Cell>
            <Table.Cell type="amount">
              <Format.Amount value={ document.totalNet } />
            </Table.Cell>
            { !readOnly && <Table.Cell /> }
          </Table.RowFooter>
          <Table.RowFooter>
            <Table.Cell colSpan={ colSpan } type="number">
              <FormattedMessage id="table.amount-taxes"/>
            </Table.Cell>
            <Table.Cell type="amount">
              <Format.Amount value={ document.totalTax } />
            </Table.Cell>
            { !readOnly && <Table.Cell /> }
          </Table.RowFooter>
        </React.Fragment>
      )}
      <Table.RowFooter>
        <Table.Cell colSpan={ colSpan } type="number">
          <FormattedMessage id="table.amount"/>
        </Table.Cell>
        <Table.Cell type="amount">
          <Format.Amount value={ document.total } />
        </Table.Cell>
        { !readOnly && <Table.Cell /> }
      </Table.RowFooter>
    </Table.Footer>
  )
}
ProductTotalFooter.propTypes = {
  document    : PropTypes.object,
  readOnly    : PropTypes.bool,
}

const ProductsColumns = [
  {id: `toggle`      , label: false                      , type: `checkbox`     },
  {id: `description` , label: `table.header.description` , type: `input`        },
  {id: `quantity`    , label: `table.header.quantity`    , type: `input number` },
  {id: `price`       , label: `table.header.unit-price`  , type: `input number` },
  {id: `amount`      , label: `table.amount`             , type: `amount`       },
  {id: `remove`      , label: false                      , type: `action`       }
]

export function ProductTable( props ) {
  const {
    readOnly,
    document,
    handleRemove,
  } = props
  const products     = document.get(`products`)
  if ( !crio.isArray(products) ) return null
  const hideColumns  = readOnly ? [`toggle`, `remove`] : []
  const COMP_CLASS   = classNames( `table--product`, {
    [`table--print`]: readOnly,
  })
  const ProductLine     = readOnly ? ProductLineDisplay : ProductLineEditable
  const productsLength  = products.length
  return (
    <Table.Wrapper
      columns={ ProductsColumns }
      hideColumns={ hideColumns }
      className={ COMP_CLASS }
      footer={ <ProductTotalFooter {...props} /> }
    >
    { products.map( (product, index) => {
      return <ProductLine
        key={ product._id }
        index={ index }
        product={ product }
        isLast={ index === productsLength - 1 }
        handleRemove={ handleRemove }
      />
    })}
    </Table.Wrapper>
  )
}
ProductTable.defaultProps = {
  readOnly: false,
}
ProductTable.propTypes = {
  document    : PropTypes.object,
  readOnly    : PropTypes.bool,
  // handleRemove: PropTypes.function,
}
