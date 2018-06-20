import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Main, Meta, Content, ContentActions } from '../layout/main'
import * as Paper from '../layout/paper-sheet'
import { Form, FormActions } from '../ui/form'
import { Button, BtnIcon } from '../ui/buttons'
import { Input, Textarea, Select } from '../ui/field'
import { Stepper } from '../ui/stepper'
import Icon from '../ui/svg-icons'
import { ProductTable } from '../ui-table/products'
import { CreateInvoice, ShowInvoice, ArchiveQuotation } from './buttons'

import './form.pres.scss'
export const BASE_CLASS = `quotation-form`
export const FORM_ID = BASE_CLASS

export function QuotationFormPres(props) {
  const { isSaving, customers, formData, customer, isNew, handle } = props
  const { products } = formData
  const hasProducts = Array.isArray(products)
  const productsLength = hasProducts ? products.length : 0
  const submitI18nId = `quotation.button.${isNew ? 'create' : 'update'}`

  return (
    <Form
      id={FORM_ID}
      isSaving={isSaving}
      onChange={handle.formChange}
      onSubmit={handle.submit}
    >
      <Main>
        <Meta>
          <div className={`${BASE_CLASS}__meta`}>
            {!isNew && (
              <input type="hidden" defaultValue={formData.id} name="id" />
            )}
            <Stepper
              steps={formData.steps}
              handleDayChange={handle.dayChange}
            />
            <Select
              label="field.customer"
              name="customerId"
              value={formData.get(`customerId`)}
              options={customers}
              optionsKeys={{ value: `id`, label: `name` }}
            />
            <Input
              name="tax"
              label="field.tax"
              type="number"
              min="0"
              step="0.5"
              value={formData.get(`tax`)}
            />
          </div>
        </Meta>
        <Content>
          <Paper.Sheet>
            <Input name="name" label="field.subject" value={formData.name} />
            <ProductTable
              document={formData}
              handleRemove={handle.productRemove}
            />
            <Textarea
              name="mentions"
              label="field.mentions"
              value={formData.mentions || formData.quotationConfig.mentions}
            />
          </Paper.Sheet>
          <FormActions>
            <Button type="submit">
              <FormattedMessage id={submitI18nId} />
            </Button>
            <CreateInvoice quotation={formData} />
            <ShowInvoice quotation={formData} withMessage />
            <ArchiveQuotation danger quotation={formData} />
          </FormActions>
        </Content>
      </Main>
    </Form>
  )
}
