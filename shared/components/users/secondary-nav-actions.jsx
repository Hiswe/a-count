import React, { Fragment } from 'react'

import { Button, BtnSecondary } from '../ui/buttons.jsx'
import { BASE_CLASS } from './form.pres.jsx'

export function ButtonSubmit( props ) {
  const { isSaving } = props
  const submitMsg = isSaving ? `updating…` : `update`
  return (
    <Button form={ BASE_CLASS } disabled={ isSaving } type="submit">
      { submitMsg }
    </Button>
  )
}
