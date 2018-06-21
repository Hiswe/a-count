import React from 'react'

import { Input, Textarea } from '../ui/field'

export default function CustomerFormPres(props) {
  const { formDraft } = props
  return (
    <div className="customer-fields">
      <Input name="name" label="field.name" value={formDraft.name} />
      <Textarea
        name="address"
        label="field.address"
        value={formDraft.address}
      />
    </div>
  )
}
