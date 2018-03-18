import React from 'react'

import './nav-secondary.scss'

const BASE_CLASS = `nav-secondary`

export default function NavSecondary( props ) {
  const { title, children } = props
  return (
    <header className={ BASE_CLASS }>
      { title && (
        <h2 className={`${BASE_CLASS}__title`}>{title}</h2>
      ) }
      { children && (
        <div className={`${BASE_CLASS}__actions`}>
          { children }
        </div>
      )}
    </header>
  )
}
