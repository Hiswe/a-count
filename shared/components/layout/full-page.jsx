import React, { Fragment } from 'react'

import './full-page.scss'

const FullPage = props => (
  <Fragment>
    <header className="page__header">
      { props.title && (<h2 className="page__title">{props.title}</h2>) }
      { props.secondary && (<div className="page__secondary-nav-actions">{ props.secondary() }</div>)}
    </header>
    <main className="main main--paper-form">
      { props.children }
    </main>
  </Fragment>
)

export default FullPage
