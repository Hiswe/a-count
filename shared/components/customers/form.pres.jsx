import React, { Fragment } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'

import Main from '../layout/main.jsx'
import { PaperSheet, Party } from '../layout/paper-sheet.jsx'
import Form from '../ui/form.jsx'
import { Button } from '../ui/buttons.jsx'
import { Input, Textarea } from '../ui/field.jsx'

import './form.pres.scss'
export const BASE_CLASS = `customer-form`

function CustomerFormPres( props ) {
  const {
    isSaving,
    handleSubmit,
    handleFormChange,
    formData,
    intl,
  } = props
  const isNew = formData.id == null
  const submitI18nId =  `customer.button.${isNew ? 'create' : 'update'}`

  return (
      <Form
        id={ `${BASE_CLASS}` }
        isSaving={ isSaving === true }
        onSubmit={ handleSubmit }
        onChange={ handleFormChange }
      >
      { formData.id && <input type="hidden" defaultValue={formData.id} name="id" />  }
      <Main
        content={() => (
          <Fragment>
            <div className={`${BASE_CLASS}__address`}>
              <fieldset>
                <Input
                  name="name"
                  label={intl.formatMessage({
                    id: `field.name`,
                    defaultMessage: `name`,
                  })}
                  value={ formData.name }
                />
                <Textarea
                  name="address"
                  label={intl.formatMessage({
                    id: `field.address`,
                    defaultMessage: `address`,
                  })}
                  value={ formData.address }
                />
              </fieldset>
              <PaperSheet part="top-right">
                <Party title="to" {...formData} />
              </PaperSheet>
            </div>
            <div className="actions">
              <Button type="submit">
                <FormattedMessage id={ submitI18nId } />
              </Button>
            </div>
          </Fragment>
        )}
      />
    </Form>
  )
}

export default injectIntl( CustomerFormPres )
