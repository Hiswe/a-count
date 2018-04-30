import React from 'react'

import { Input, Textarea } from '../ui/field'

export default function CustomerFormPres( props ) {
  const { formData } = props

  return (
    <div className="customer-fields">
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
    </div>
  )
}
