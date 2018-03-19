import React, {  Fragment } from 'react'

import Main from '../layout/main.jsx'
import PaperSheet, { Party } from '../layout/paper-sheet.jsx'
import Field from '../ui/field.jsx'
import Stepper, { Step } from '../ui/stepper.jsx'
import NewProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'

import './form.scss'

export default function QuotationFormPres( props ) {
  const {
    user,
    customers,
    formData,
    customer,
    isNew,
    handleFormChange,
    handleSubmit,
    handleDayChange,
    handleProductRemove,
  } = props
  const { products } = formData
  const hasProducts = Array.isArray( products )
  const productsLength = hasProducts ? products.length : 0

  return (
    <form
      method="post"
      className="quotation-form"
      onChange={ handleFormChange }
      onSubmit={ handleSubmit }
    >
      <Main
        meta={ () => (
          <div className="quotation-form__meta">
            { !isNew && <input type="hidden" defaultValue={formData.id} name="id" /> }
            <Stepper
              steps={ formData.steps }
              handleDayChange={ handleDayChange }
            />
            <Field darkBg
              label="customer"
              name="customerId"
              value={ formData.customerId }
              type="select"
              options={ customers }
            />
            <Field darkBg
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
              <Party type="user" {...user} />
              <Party type="customer" {...customer} />
              <Field
                name="name"
                value={ formData.name }
              />
              <NewProductTable products={ products } tax={ formData.tax } >
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
        )}
      />
    </form>
  )
}
