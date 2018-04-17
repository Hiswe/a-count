import   React              from 'react'
import { Link             } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import   classNames         from 'classnames'

import Icon from './svg-icons.jsx'

import './buttons.scss'
const BASE_CLASS = `button`

export function Button( props ) {
  const { className, to, secondary, danger,...others } = props
  const COMP_CLASS = [ BASE_CLASS ]
  if ( className ) COMP_CLASS.push( className )
  if ( secondary ) COMP_CLASS.push( `${ BASE_CLASS }--secondary` )
  if ( danger ) COMP_CLASS.push( `${ BASE_CLASS }--danger` )

  if ( to ) {
    return (
      <Link to={to} className={ COMP_CLASS.join(` `) } {...others} >
        { props.children }
      </Link>
    )
  }

  return (
    <button className={ COMP_CLASS.join(` `) } {...others} >
      { props.children }
    </button>
  )
}

export function BtnLink( props ) {
  const { className, ...others } = props
  const btnClass = [ `${BASE_CLASS}--link` ]
  if ( className ) btnClass.push( className )
  return (
    <Button
      className={ btnClass.join(` `) }
      {...others}
    />
)}

const BTN_ICON_CLASS = `${BASE_CLASS}--icon`
export function BtnIcon( props ) {
  const {
    className,
    svgId,
    secondary,
    link,
    danger,
    label,
    ...others
  } = props
  const COMP_CLASS = classNames(className, {
    [   BTN_ICON_CLASS            ]: true     ,
    [`${BTN_ICON_CLASS}-secondary`]: secondary,
    [`${BTN_ICON_CLASS}-link`     ]: link     ,
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
