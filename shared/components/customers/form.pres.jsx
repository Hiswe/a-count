import React, { Fragment } from 'react'

import Main from '../layout/main.jsx'
import PaperSheet, { Party } from '../layout/paper-sheet.jsx'
import { Button } from '../ui/buttons.jsx'
import Field from '../ui/field.jsx'

import './form.pres.scss'

export const BASE_CLASS = `customer-form`

export default function CustomerFormPres( props ) {
  const {
    handleSubmit,
    handleFormChange,
    formData,
  } = props
  const isNew = formData.id == null
  const submitMsg =  `${isNew ? 'Create' : 'Update'} customer`

  return (
      <form
        method="post"
        id={ `${BASE_CLASS}` }
        className={ `${BASE_CLASS}` }
        onSubmit={ handleSubmit }
        onChange={ handleFormChange }
      >
      { formData.id && <input type="hidden" defaultValue={formData.id} name="id" />  }
      <Main
        content={() => (
          <Fragment>
            <div className={`${BASE_CLASS}__address`}>
              <fieldset>
                <Field
                  name="name"
                  value={ formData.name }
                />
                <Field
                  name="address"
                  type="textarea"
                  value={ formData.address }
                />
              </fieldset>
              <PaperSheet part="top-right">
                <Party title="to" {...formData} />
              </PaperSheet>
            </div>
            <div className="actions">
              <Button type="submit"> { submitMsg }</Button>
            </div>
          </Fragment>
        )}
      />
    </form>
  )
}
