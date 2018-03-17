import React from 'react'

import './knockout.scss'

export default function Knockout( props ) {
  const { meta, ...rest } = props
  return (
    <section className="knockout">
      { props.meta && (
        <header className="knockout__meta">{props.meta()}</header>
      )}
      <article className="knockout__content">
        { props.children }
      </article>
    </section>
  )
}
