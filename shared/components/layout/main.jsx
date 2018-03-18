import React from 'react'

import './main.scss'

const BASE_CLASS = `main`

// use render props
// • https://medium.com/tandemly/im-breaking-up-with-higher-order-components-44b0df2db052#0294
export default function Knockout( props ) {
  const { meta, content } = props
  const className = [ BASE_CLASS ]

  if ( meta ) className.push( `${BASE_CLASS}--has-meta` )

  return (
    <main role="main" className={ className.join(` `) }>
      { meta && (
        <header className={`${BASE_CLASS}__meta`}>
          { meta() }
        </header>
      )}
      { content && (
        <article className={`${BASE_CLASS}__content`}>
          { content() }
        </article>
      )}
    </main>
  )
}
