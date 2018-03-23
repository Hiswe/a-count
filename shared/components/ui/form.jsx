import React from 'react'

import './form.scss'
export const BASE_CLASS = `form`

export default function Form( props ) {
  const { id, className, isSaving, children, ...others } = props
  const FORM_CLASS = [ BASE_CLASS, id ]
  if ( isSaving ) FORM_CLASS.push( `${BASE_CLASS}--is-saving` )
  if ( className ) FORM_CLASS.push( className )

  return (
    <form
      id={ id }
      method="post"
      className={ FORM_CLASS.join(` `) }
      { ...others }
    >
      { children }
    </form>
  )
}
