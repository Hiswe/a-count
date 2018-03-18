import React, {  Fragment } from 'react'

import Field from '../ui/field.jsx'
import Knockout from '../layout/knockout.jsx'
import PaperSheet, { From, To } from '../layout/paper-sheet.jsx'
import NewProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'
import { Status } from '../business-form'
import Stepper, { Step } from '../ui/stepper.jsx'

import './form.scss'

export default function QuotationFormPres( props ) {
  const {
    user,
    customers,
    formData,
    isNew,
    handleChange,
    handleDayChange,
    handleProductRemove,
  } = props
  const { products } = formData
  const hasProducts = Array.isArray( products )
  const productsLength = hasProducts ? products.length : 0

  return (
    <Knockout
      meta={ () => (
        <div className="quotation-form__meta">
          { !isNew && <input type="hidden" defaultValue={formData.id} name="id" /> }
          <Stepper
            steps={ formData.steps }
            handleDayChange={ e => handleDayChange(e) }
          />
          <Field darkBg floatingLabel
            label="customer"
            name="customerId"
            value={ formData.customerId }
            type="select"
            options={ customers }
          />
          <Field darkBg floatingLabel
            name="tax"
            type="number"
            step="any"
            value={ formData.tax }
          />
        </div>
      ) }
      content={ () => (
        <Fragment>
          <PaperSheet>
            <From {...user} />
            <To name="customer name" />
            <Field floatingLabel
              name="name"
              value={ formData.name }
            />
            <NewProductTable products={ products } tax={20} >
              { hasProducts && products.map( (product, index) => {
                const isLast = index === productsLength - 1
                const fieldPath = `products[${ index }]`
                return (
                  <ProductLine
                    key={ index }
                    fieldPath={ fieldPath }
                    product={ product }
                  >
                    { !isLast && <button onClick={ e => handleProductRemove(index, fieldPath) } type="button">remove</button> }
                  </ProductLine>
                )
              }) }
            </NewProductTable>
          </PaperSheet>
          <div className="quotation-form__actions">
            <button className="btn" type="submit">{`${isNew ? 'Create' : 'Update'} quotation`}</button>
          </div>
        </Fragment>
      ) }
    />
  )
}
