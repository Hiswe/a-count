import React, {  Fragment } from 'react'

import Main from '../layout/main.jsx'
import PaperSheet, { Party, Reference, Mentions } from '../layout/paper-sheet.jsx'
import Form from '../ui/form.jsx'
import { Button, BtnLink } from '../ui/buttons.jsx'
import { Input, Textarea, Select } from '../ui/field.jsx'
import Markdown from '../ui/markdown.jsx'
import Stepper, { Step } from '../ui/stepper.jsx'
import ProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'

import './form.pres.scss'

export const BASE_CLASS = `quotation-form`

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
  const { isSaving } = formData
  const { products } = formData
  const hasProducts = Array.isArray( products )
  const productsLength = hasProducts ? products.length : 0
  const submitMsg   = isSaving ? `saving…`
    : `${isNew ? 'Create' : 'Update'} quotation`

  return (
    <Form
      id={ `${BASE_CLASS}` }
      isSaving={ isSaving === true }
      onChange={ handleFormChange }
      onSubmit={ handleSubmit }
    >
      <Main
        meta={ () => (
          <div className={ `${BASE_CLASS}__meta` }>
            { !isNew && <input type="hidden" defaultValue={ formData.id } name="id" /> }
            <Stepper
              steps={ formData.steps }
              handleDayChange={ handleDayChange }
            />
            <Select darkBg
              label="customer"
              name="customerId"
              value={ formData.customerId }
              options={ customers }
            >
              { customers.map( c => (
                  <option key={ c.id } value={ c.id }>{ c.name }</option>
                )
              )}
            </Select>
            <Input darkBg
              name="tax"
              type="number"
              min="0"
              step="0.5"
              value={ formData.tax }
            />
          </div>
        ) }
        content={ () => (
          <Fragment>
            <PaperSheet>
              <Reference type="quotation" product={ formData } />
              <Party title="quotation from" {...user} />
              <Party title="quotation to" {...customer} />
              <Input
                name="name"
                value={ formData.name }
              />
              <ProductTable
                products={ products }
                tax={ formData.tax }
                currency={ user.defaultQuotation.currency }
              >
                { hasProducts && products.map( (product, index) => {
                  const isLast = index === productsLength - 1
                  const fieldPath = `products[${ index }]`
                  return (
                    <ProductLine
                      key={ product._id }
                      fieldPath={ fieldPath }
                      product={ product }
                      currency={ user.defaultQuotation.currency }
                    >
                      { !isLast && (
                        <BtnLink
                          onClick={ e => handleProductRemove(index, fieldPath) }
                          type="button"
                        >
                          remove
                        </BtnLink>
                      ) }
                    </ProductLine>
                  )
                }) }
              </ProductTable>
              <Mentions content={ user.defaultQuotation.mentions }/>
            </PaperSheet>
            <div className={ `${BASE_CLASS}__actions` }>
              <Button type="submit">{ submitMsg }</Button>
            </div>
          </Fragment>
        )}
      />
    </Form>
  )
}
