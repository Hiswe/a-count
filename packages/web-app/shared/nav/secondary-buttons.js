import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import { BtnIcon, Button } from '../ui/buttons'

export function ButtonList( props ) {
  const { type, ...rest } = props
  return (
    <BtnIcon
      secondary
      to={`/${props.type}`}
      svgId="view-list"
      {...rest}
    />
  )
}

export function ButtonPreview( props ) {
  const { type, id, ...rest } = props
  return (
    <BtnIcon
      secondary
      to={`/${type}/${ id }/preview`}
      svgId="receipt"
      { ...rest }
    />
  )
}

export function ButtonPrint( props ) {
  return (
    <BtnIcon
      secondary
      svgId="print"
      onClick={ event => window.print() }
      label="_.print"
      {...props}
    />
  )
}
export { ButtonPrint as Print }

export function ButtonEdit( props ) {
  const { type, document, ...rest } = props
  const isArchived  = document.get( `archivedAt` )
  if ( isArchived ) return null
  const id          = document.get( `id` )
  return (
    <BtnIcon
      to={`/${type}/${ id }`}
      svgId="edit"
      { ...rest }
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
export { ButtonNew as New }

export function ButtonSubmit( props ) {
  const { isSaving, formId, ...rest } = props
  const iconId = isSaving ? `block` : `save`
  return (
    <BtnIcon
      form={ formId }
      disabled={ isSaving }
      type="submit"
      svgId={ iconId }
      {...rest}
    />
  )
}
