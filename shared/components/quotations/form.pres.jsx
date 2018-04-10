import React, {  Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Main, Meta, Content, ContentActions } from '../layout/main.jsx'
import { PaperSheet, Party, Reference, Mentions, Between } from '../layout/paper-sheet.jsx'
import Form from '../ui/form.jsx'
import { Button, BtnLink, BtnIcon } from '../ui/buttons.jsx'
import { Input, Textarea, Select } from '../ui/field.jsx'
import { Stepper } from '../ui/stepper.jsx'
import Icon from '../ui/svg-icons.jsx'
import { ProductTable, ProductLineEditable } from '../ui/table-product.jsx'
import ButtonCreateInvoice from './create-invoice-button.jsx'

import './form.pres.scss'
export const BASE_CLASS = `quotation-form`
export const FORM_ID    = BASE_CLASS

export default function QuotationFormPres( props ) {
  const {
    isSaving,
    user,
    customers,
    formData,
    customer,
    isNew,
    handle,
  } = props
  const { products } = formData
  const hasProducts = Array.isArray( products )
  const productsLength = hasProducts ? products.length : 0
  const submitI18nId =  `quotation.button.${isNew ? 'create' : 'update'}`

  return (
    <Form
      id={ FORM_ID }
      isSaving={ isSaving }
      onChange={ handle.formChange }
      onSubmit={ handle.submit }
    >
      <Main withMeta>
        <Meta>
          <div className={ `${BASE_CLASS}__meta` }>
            { !isNew && <input type="hidden" defaultValue={ formData.id } name="id" /> }
            <Stepper
              steps={ formData.steps }
              handleDayChange={ handle.dayChange }
            />
            <Select
              label="field.customer"
              name="customerId"
              value={ formData.customerId }
            >
              { customers.map( c => (
                  <option key={ c.id } value={ c.id }>{ c.name }</option>
                )
              )}
            </Select>
            <Input
              name="tax"
              label="field.tax"
              type="number"
              min="0"
              step="0.5"
              value={ formData.tax }
            />
          </div>
        </Meta>
        <Content>
          <PaperSheet>
            <Reference type="quotation" product={ formData } />
            <Between>
              <Party title="from" {...user} />
              <Party title="to" {...customer} />
            </Between>
            <Input
              name="name"
              label="field.subject"
              value={ formData.name }
            />
            <ProductTable
              products={ products }
              tax={ formData.tax }
              currency={ user.currency }
            >
              { hasProducts && products.map( (product, index) => {
                const isLast = index === productsLength - 1
                const fieldPath = `products[${ index }]`
                return (
                  <ProductLineEditable
                    key={ product._id }
                    fieldPath={ fieldPath }
                    product={ product }
                    currency={ user.currency }
                    isLast={ isLast }
                  >
                    { !isLast && (
                      <BtnIcon
                        link
                        onClick={ e => handle.productRemove(index, fieldPath) }
                        type="button"
                        svgId="delete"
                      />
                    ) }
                  </ProductLineEditable>
                )
              }) }
            </ProductTable>
            <Mentions content={ formData.quotationConfig.mentions }/>
          </PaperSheet>
          <ContentActions>
            <Button type="submit">
              <FormattedMessage id={ submitI18nId } />
            </Button>
            <ButtonCreateInvoice />
          </ContentActions>
        </Content>
      </Main>
    </Form>
  )
}
