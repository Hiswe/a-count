import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Button, BtnSecondary } from '../ui/buttons.jsx'

export function ButtonList( props ) {
  return <BtnSecondary to="/quotations">list</BtnSecondary>
}

export function ButtonNew( props ) {
  return <BtnSecondary to="/quotations/new">new</BtnSecondary>
}

export function ButtonSubmit( props ) {
  return <Button form={ props.form } type="submit">save</Button>
}

