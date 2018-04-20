import React     from 'react'
import className from 'classnames'

import './main.scss'
const BASE_CLASS = `main`

export function Main( props ) {
  const { withMeta, children   } =   props
  const   COMP_CLASS   = className({
    [ BASE_CLASS ]: true,
    [`${BASE_CLASS}--has-meta`]: React.Children.count( children ) > 1
  })
  return (
    <main role="main" className={ COMP_CLASS }>
      { props.children }
    </main>
  )
}
export { Main as Wrapper }

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

export function ContentActions( props ) {
  return (
    <div className={`${BASE_CLASS}__content_actions`}>
      { props.children }
    </div>
  )
}
