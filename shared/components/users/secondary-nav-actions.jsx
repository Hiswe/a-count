import React, { Fragment } from 'react'

import { Button, BtnSecondary } from '../ui/buttons.jsx'
import { BASE_CLASS } from './form.pres.jsx'

export function ButtonSubmit( props ) {
  return <Button form={ BASE_CLASS } type="submit">update</Button>
}
