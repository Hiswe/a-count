import React, { Fragment } from 'react'

import Main from '../layout/main.jsx'
import PaperSheet, { Party, Reference } from '../layout/paper-sheet.jsx'
import Field from '../ui/field.jsx'
import Markdown from '../ui/markdown.jsx'
import ProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'

import './form.pres.scss'

const BASE_CLASS = `profile-form`
const customerExample = {
  name: `Customer name`,
  address: `123 6th St.
__Melbourne, FL 32904__
AUSTRALIA
`
}

export default function UserFormPres( props ) {
  const {
    formData,
    handleFormChange,
    handleSubmit,
  } = props
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

  const fakeProduct = {
    description: `a *product* example`,
    quantity: 2,
    price: defaultProduct.price,
  }

  return (
    <form
      method="post"
      action={`/users/${formData.id}`}
      onChange={ handleFormChange }
      onSubmit={ handleSubmit }
      className="form form--profile"
    >
      <input type="hidden" name="id" defaultValue={formData.id} />

      <Main content={() => (<Fragment>
        {/* USER */}
        <div className={`${BASE_CLASS}__user`}>
          <div className={`${BASE_CLASS}__user-example`}>
            <Party title="from" {...formData} />
          </div>
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
        <div  className={`${BASE_CLASS}__product`}>
          <input
            type="hidden"
            name="defaultQuotation[id]"
            defaultValue={defaultQuotation.id}
          />
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
              value={ defaultQuotation.tax }
            />
          </div>
          <div className={`${BASE_CLASS}__product-example`}>
            <ProductTable
              products={ [fakeProduct, defaultProduct] }
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
          </div>
        </div>
      </Fragment>)} />

      <Main
        content={() => (
          <Fragment>
            <Field
              name="defaultQuotation[mentions]"
              label="mentions"
              value={ defaultQuotation.mentions }
              type="textarea"
            />
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
            <PaperSheet>
              <input type="hidden" name="defaultProduct[id]" defaultValue={defaultProduct.id} />
              <Reference {...fakeQuotationReference} />
              <Party title="quotation from" {...formData} />
              <Party title="quotation to" {...customerExample} />
              <h3>Default Product</h3>
              <ProductTable
                products={ [defaultProduct] }
                tax={ defaultQuotation.tax }
                currency={ defaultQuotation.currency }
              >
                <ProductLine
                  fieldPath="defaultProduct"
                  product={ defaultProduct }
                  currency={ defaultQuotation.currency }
                />
              </ProductTable>
              <Markdown text={ defaultQuotation.mentions }/>
            </PaperSheet>
            <fieldset className="card">
              <h3 className="card__title">Default Invoice</h3>
              <div className="card__content">
                <input
                  type="hidden"
                  name="defaultInvoice[id]"
                  defaultValue={ defaultInvoice.id }
                />
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
                <Field
                  name="defaultInvoice[mentions]"
                  label="mentions"
                  value={ defaultInvoice.mentions }
                  type="textarea"
                />
              </div>
            </fieldset>
            <div className="actions" style={{gridColumn: `1 / span 2`}}>
              <button className="btn" type="submit">save update</button>
            </div>
          </Fragment>
        )}
      />
    </form>
  )
}

