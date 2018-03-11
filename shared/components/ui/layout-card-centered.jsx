import React from 'react'

const CardCentered = props => (
  <main className="main main--with-card">
    <div className="card">
      { props.title && (<h2 className="card__title">{props.title}</h2>) }
      <div className="card__content">
        { props.children }
      </div>
    </div>
  </main>
)

export default CardCentered
