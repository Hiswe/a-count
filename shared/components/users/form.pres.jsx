import React, { Fragment } from 'react'

import Main from '../layout/main.jsx'
import PaperSheet, { Party } from '../layout/paper-sheet.jsx'
import Field from '../ui/field.jsx'
import ProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'

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

  return (
    <form
      method="post"
      action={`/users/${formData.id}`}
      onChange={ handleFormChange }
      onSubmit={ handleSubmit }
      className="form form--profile"
    >
      <Main
        content={() => (
          <Fragment>
            <input type="hidden" name="id" defaultValue={formData.id} />
            <fieldset className="card" style={{gridColumn: `1 / span 2`}}>
              <h3 className="card__title">General Information</h3>
              <div className="card__content">
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
            </fieldset>
            <PaperSheet>
              <input type="hidden" name="defaultProduct[id]" defaultValue={defaultProduct.id} />
              <Party type="user" {...formData} />
              <Party type="customer" {...customerExample} />
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
            </PaperSheet>
            <fieldset className="card">
              <h3 className="card__title">Default Quotation</h3>
              <div className="card__content">
                <input
                  type="hidden"
                  name="defaultQuotation[id]"
                  defaultValue={defaultQuotation.id}
                />
                <Field
                  name="defaultQuotation[tax]"
                  label="tax"
                  value={ defaultQuotation.tax }
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
                <Field
                  name="defaultQuotation[mentions]"
                  label="mentions"
                  value={ defaultQuotation.mentions }
                  type="textarea"
                />
              </div>
            </fieldset>
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

