import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { Input, Textarea } from '../ui/field.jsx'

import './form.pres.scss'

export default function CustomerFormPres( props ) {
  const {
    isSaving,
    handle,
    formData,
    user,
    quotations,
    invoices,
  } = props
  const isNew = formData.id == null
  const submitI18nId =  `customer.button.${isNew ? 'create' : 'update'}`

  return (
    <Fragment>
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
    </Fragment>
  )
}
