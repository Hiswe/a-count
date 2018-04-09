import React, { Fragment } from 'react'

import { Input, Textarea } from '../ui/field.jsx'

import './form.pres.scss'

export default function CustomerFormPres( props ) {
  const { formData } = props

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
