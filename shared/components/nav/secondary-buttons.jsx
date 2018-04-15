import React from 'react'
import { FormattedMessage } from 'react-intl'

import { BtnIcon, Button } from '../ui/buttons.jsx'

export function ButtonList( props ) {
  return (
    <BtnIcon
      secondary
      to={`/${props.type}`}
      svgId="view-list"
    />
  )
}

export function ButtonPreview( props ) {
  return (
    <BtnIcon
      secondary
      to={`/${props.type}/${ props.id }/preview`}
      svgId="visibility"
    />
  )
}

export function ButtonEdit( props ) {
  return (
    <BtnIcon
      to={`/${props.type}/${ props.id }`}
      svgId="edit"
    />
  )
}

export function ButtonNew( props ) {
  const { type, icon, message,...others } = props
  const iconId = type === `customers` ? `person-add`
    : `note-add`

  const renderProps = { to: `/${type}/new` }
  if ( icon ) return <BtnIcon {...renderProps} svgId={ iconId } {...others} />
  return (
    <Button
      {...renderProps}
      {...others}
    >
      <FormattedMessage id={ message } />
    </Button>
  )
}

export function ButtonSubmit( props ) {
  const { isSaving, formId } = props
  const iconId = isSaving ? `block` : `save`
  return (
    <BtnIcon
      form={ formId }
      disabled={ isSaving }
      type="submit"
      svgId={ iconId }
    />
  )
}
