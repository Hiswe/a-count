import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Main, Content} from '../layout/main.jsx'
import { PaperSheet, Party } from '../layout/paper-sheet.jsx'
import Form from '../ui/form.jsx'
import { Button } from '../ui/buttons.jsx'
import { Input, Textarea } from '../ui/field.jsx'

import './form.pres.scss'
export const BASE_CLASS = `customer-form`
export const FORM_ID    = BASE_CLASS

 export default function CustomerFormPres( props ) {
  const {
    isSaving,
    handleSubmit,
    handleFormChange,
    formData,
  } = props
  const isNew = formData.id == null
  const submitI18nId =  `customer.button.${isNew ? 'create' : 'update'}`

  return (
      <Form
        id={ `${BASE_CLASS}` }
        isSaving={ isSaving }
        onSubmit={ handleSubmit }
        onChange={ handleFormChange }
      >
      { formData.id && <input type="hidden" defaultValue={formData.id} name="id" />  }
      <Main>
        <Content>
          <div className={`${BASE_CLASS}__address`}>
            <fieldset>
              <Input
                name="name"
                label="field.name"
                value={ formData.name }
              />
              <Textarea
                name="address"
                label="field.address"
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
        </Content>
      </Main>
    </Form>
  )
}
