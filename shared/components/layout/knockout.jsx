import React from 'react'

import './knockout.scss'

// use render props
// • https://medium.com/tandemly/im-breaking-up-with-higher-order-components-44b0df2db052#0294
export default function Knockout( props ) {
  const { meta, content } = props
  return (
    <section className="knockout">
      { meta && (
        <header className="knockout__meta">
          { meta() }
        </header>
      )}
      { content && (
        <article className="knockout__content">
          { content() }
        </article>
      )

      }
    </section>
  )
}
