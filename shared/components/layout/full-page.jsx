import React, { Fragment } from 'react'

const FullPage = props => (
  <Fragment>
    { props.title && (<h2 className="page__title">{props.title}</h2>) }
    <main className="main main--with-page page">
      <div className="page__content">
        { props.children }
      </div>
    </main>
  </Fragment>
)

export default FullPage
