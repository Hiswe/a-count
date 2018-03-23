import React, { Fragment } from 'react'

import Main from '../layout/main.jsx'
import PaperSheet, { Party, Reference, Mentions } from '../layout/paper-sheet.jsx'
import Form from '../ui/form.jsx'
import { Button } from '../ui/buttons.jsx'
import Field from '../ui/field.jsx'
import Markdown from '../ui/markdown.jsx'
import ProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'
import { ButtonSubmit } from'./secondary-nav-actions.jsx'

import './form.pres.scss'

export const BASE_CLASS = `profile-form`
const customerExample = {
  name: `Customer name`,
  address: `123 6th St.
__Melbourne, FL 32904__
AUSTRALIA
`
}

function UserFormTile( props ) {
  return (
    <h3 className={`${BASE_CLASS}__title`}>
      <span>{ props.title }</span>
    </h3>
  )
}

export default function UserFormPres( props ) {
  const {
    formData,
    handleFormChange,
    handleSubmit,
  } = props
  const { isSaving } = formData
  const {
    defaultProduct,
    defaultQuotation,
    defaultInvoice,
  } = formData
  const fakeQuotationReference = {
    type: `quotation`,
    product: {
      updatedAt: new Date().toUTCString(),
      reference: `${defaultQuotation.prefix}${defaultQuotation.startAt}`,
    },
  }
  const fakeInvoiceReference = {
    type: `invoice`,
    product: {
      updatedAt: new Date().toUTCString(),
      reference: `${defaultInvoice.prefix}${defaultInvoice.startAt}`,
    },
  }
  const fakeProduct = {
    description: `a *product* example`,
    quantity: 2,
    price: defaultProduct.price,
  }
  const fakeProducts = [
    fakeProduct,
    defaultProduct
  ]

  return (
    <Form
      id={ `${BASE_CLASS}` }
      action={ `/users/${formData.id}` }
      isSaving={ isSaving === true }
      onChange={ handleFormChange }
      onSubmit={ handleSubmit }
    >
      <input type="hidden" name="id" defaultValue={formData.id} />
      <input type="hidden" name="defaultQuotation[id]" defaultValue={ defaultQuotation.id } />
      <input type="hidden" name="defaultInvoice[id]" defaultValue={ defaultInvoice.id } />
      <input type="hidden" name="defaultProduct[id]" defaultValue={ defaultInvoice.id } />

      <Main content={() => (<Fragment>

        {/* USER */}
        <UserFormTile title="From information" />
        <div className={`${BASE_CLASS}__user`}>
          <PaperSheet part="top-left">
            <Party title="from" {...formData} />
          </PaperSheet>
          <div className={`${BASE_CLASS}__user-form`}>
            <Field
              name="name"
              value={ formData.name }
            />
            <Field
              name="address"
              value={ formData.address }
              type="textarea"
            />
          </div>
        </div>

        {/* PRODUCT */}
        <UserFormTile title="Default product information" />
        <div className={`${BASE_CLASS}__product`}>
          <div className={`${BASE_CLASS}__product-form`}>
            <Field
              name="defaultProduct[description]"
              label="description"
              type="textarea"
              value={ defaultProduct.description }
            />
            <Field
              name="defaultProduct[quantity]"
              label="quantity"
              type="number"
              value={ defaultProduct.quantity }
            />
            <Field
              name="defaultQuotation[tax]"
              label="tax"
              type="number"
              value={ defaultQuotation.tax }
            />
            <Field
              name="defaultQuotation[currency]"
              label="currency"
              type="select"
              options={[
                {id: `USD`, name: `USD`},
                {id: `EUR`, name: `EUR`},
              ]}
              value={ defaultQuotation.currency }
            />
          </div>
          <PaperSheet part="center">
            <ProductTable
              products={ fakeProducts }
              tax={ defaultQuotation.tax }
              currency={ defaultQuotation.currency }
            >
              <ProductLine readOnly
                product={ fakeProduct }
                currency={ defaultQuotation.currency }
              />
              <ProductLine readOnly
                product={ defaultProduct }
                currency={ defaultQuotation.currency }
              />
            </ProductTable>
          </PaperSheet>
        </div>

        {/* REFERENCES */}
        <UserFormTile title="Reference Format" />
        <p className={`${BASE_CLASS}__warning`}>
          Changing <strong>startAt number</strong> will change all the concerned type's references
          <br />
          Be cautious!
        </p>
        <div className={`${BASE_CLASS}__references`}>
          <dl className={`${BASE_CLASS}__references-section`}>
            <dt className={`${BASE_CLASS}__sub-title`}>
              Quotations
            </dt>
            <dd className={`${BASE_CLASS}__references-content`}>
              <div className={`${BASE_CLASS}__references-form`}>
                <Field
                  name="defaultQuotation[prefix]"
                  label="prefix"
                  value={ defaultQuotation.prefix }
                />
                <Field
                  name="defaultQuotation[startAt]"
                  label="start at"
                  value={ defaultQuotation.startAt }
                  type="number"
                  min="0"
                  step="1"
                />
              </div>
              <PaperSheet part="top-right">
                <Reference {...fakeQuotationReference} />
              </PaperSheet>
            </dd>
          </dl>
          <dl className={`${BASE_CLASS}__references-section`}>
            <dt className={`${BASE_CLASS}__sub-title`}>
              Invoices
            </dt>
            <dd className={`${BASE_CLASS}__references-content`}>
              <div className={`${BASE_CLASS}__references-form`}>
                <Field
                  name="defaultInvoice[prefix]"
                  label="prefix"
                  value={ defaultInvoice.prefix }
                />
                <Field
                  name="defaultInvoice[startAt]"
                  label="start at"
                  value={ defaultInvoice.startAt }
                  type="number"
                  min="0"
                  step="1"
                />
              </div>
              <PaperSheet part="top-right">
                <Reference {...fakeInvoiceReference} />
              </PaperSheet>
            </dd>
          </dl>
        </div>

        {/* MENTIONS */}
        <UserFormTile title="Mentions" />
        <div className={`${BASE_CLASS}__mentions`}>
          <Field
            name="defaultQuotation[mentions]"
            label="quotations mention"
            value={ defaultQuotation.mentions }
            type="textarea"
          />
          <PaperSheet part="bottom">
            <Mentions content={ defaultQuotation.mentions }/>
          </PaperSheet>
          <Field
            name="defaultInvoice[mentions]"
            label="invoice mention"
            value={ defaultInvoice.mentions }
            type="textarea"
          />
          <PaperSheet part="bottom">
            <Mentions content={ defaultInvoice.mentions }/>
          </PaperSheet>
        </div>
        <div className="actions" style={{gridColumn: `1 / span 2`}}>
          <Button type="submit">update</Button>
        </div>
      </Fragment>)} />
    </Form>
  )
}

