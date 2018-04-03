import React from 'react'

import './main.scss'
const BASE_CLASS = `main`

export function Main( props ) {
  const { withMeta   } =   props
  const   COMP_CLASS   = [ BASE_CLASS ]
  if ( withMeta ) COMP_CLASS.push( `${BASE_CLASS}--has-meta` )

  return (
    <main role="main" className={ COMP_CLASS.join(` `) }>
      { props.children }
    </main>
  )
}

export function Meta( props ) {
  return (
    <header className={`${BASE_CLASS}__meta`}>
      { props.children }
    </header>
  )
}

export function Content( props ) {
  return (
    <article className={`${BASE_CLASS}__content`}>
      { props.children }
    </article>
  )
}
