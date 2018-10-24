import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Main, Meta, Content, ContentActions } from '../layout/main'
import * as Paper from '../layout/paper-sheet'
import { Form, FormActions } from '../ui/form'
import { Button, BtnIcon } from '../ui/buttons'
import * as Field from '../ui/field'
import { Stepper } from '../ui/stepper'
import Icon from '../ui/svg-icons'
import { ProductTable } from '../ui-table/products'
import { CreateInvoice, ShowInvoice, ArchiveQuotation } from './buttons'

import './form.pres.scss'
export const BASE_CLASS = `quotation-form`
export const FORM_ID = BASE_CLASS

export function QuotationFormPres(props) {
  const { isSaving, customers, formDraft, isNew, handle } = props
  const { products } = formDraft
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
              <input type="hidden" defaultValue={formDraft.id} name="id" />
            )}
            <Stepper
              steps={formDraft.steps}
              handleDayChange={handle.dayChange}
            />
            <Field.Select
              label="field.customer"
              name="customerId"
              value={formDraft.get(`customerId`)}
              options={customers}
              optionsKeys={{ value: `id`, label: `name` }}
            />
            <Field.Input
              name="tax"
              label="field.tax"
              type="number"
              min="0"
              step="0.5"
              value={formDraft.get(`tax`)}
            />
          </div>
        </Meta>
        <Content>
          <Paper.Sheet>
            <Field.Input
              name="name"
              label="field.subject"
              value={formDraft.name}
            />
            <ProductTable
              document={formDraft}
              handleRemove={handle.productRemove}
            />
            <Field.Textarea
              name="mentions"
              label="field.mentions"
              value={
                formDraft.get(`mentions`) ||
                formDraft.get(`quotationConfig.mentions`)
              }
            />
          </Paper.Sheet>
          <FormActions>
            <Button type="submit">
              <FormattedMessage id={submitI18nId} />
            </Button>
            <CreateInvoice quotation={formDraft} />
            <ShowInvoice quotation={formDraft} withMessage />
            <ArchiveQuotation danger quotation={formDraft} />
          </FormActions>
        </Content>
      </Main>
    </Form>
  )
}
