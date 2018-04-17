import   React              from 'react'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import   classNames         from 'classnames'

import Icon from './svg-icons.jsx'

import './buttons.scss'
const BASE_CLASS = `button`

export function Button( props ) {
  const {
    className,
    to,
    secondary,
    linkAlike,
    danger,
    ...others
  } = props
  const COMP_CLASS = classNames( className, {
    [    BASE_CLASS              ]: true     ,
    [`${ BASE_CLASS }--link`     ]: linkAlike,
    [`${ BASE_CLASS }--secondary`]: secondary,
    [`${ BASE_CLASS }--danger`   ]: danger   ,
  })

  if ( to ) {
    return (
      <Link to={to} className={ COMP_CLASS } {...others} >
        { props.children }
      </Link>
    )
  }

  return (
    <button className={ COMP_CLASS } {...others} >
      { props.children }
    </button>
  )
}

const BTN_ICON_CLASS = `${BASE_CLASS}--icon`
export function BtnIcon( props ) {
  const {
    className,
    svgId,
    secondary,
    linkAlike,
    danger,
    label,
    ...others
  } = props
  const COMP_CLASS = classNames(className, {
    [   BTN_ICON_CLASS            ]: true     ,
    [`${BTN_ICON_CLASS}-secondary`]: secondary,
    [`${BTN_ICON_CLASS}-link`     ]: linkAlike,
    [`${BTN_ICON_CLASS}-danger`   ]: danger   ,
    [`${BTN_ICON_CLASS}--icon`    ]: className,
  })
  return (
    <Button
      className={ COMP_CLASS }
      {...others}
    >
      <Icon svgId={svgId} />
      { label && (
        <span className={`${BASE_CLASS}__notice`}>
          <FormattedMessage id={ label } />
        </span>
      )}
    </Button>
  )
}
