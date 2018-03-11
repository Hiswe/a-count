import React, { Fragment } from 'react'

const FullPage = props => (
  <Fragment>
    <header className="page__header">
      { props.title && (<h2 className="page__title">{props.title}</h2>) }
      { props.secondary && (<div className="page__secondary-nav-actions">{props.secondary()}</div>)}
    </header>
    <main className="main main--with-page page">
      <div className="page__content">
        { props.children }
      </div>
    </main>
  </Fragment>
)

export default FullPage
