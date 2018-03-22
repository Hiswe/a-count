import React, { Fragment } from 'react'

import { Button, BtnSecondary } from '../ui/buttons.jsx'
import { BASE_CLASS } from './form.pres.jsx'

export function ButtonList() {
  return <BtnSecondary to="/customers">list</BtnSecondary>
}

export function ButtonNew() {
  return <BtnSecondary to="/customers/new" className="btn-secondary">new</BtnSecondary>
}

export function ButtonSubmit( props ) {
  return <Button form={ BASE_CLASS } type="submit">update</Button>
}
