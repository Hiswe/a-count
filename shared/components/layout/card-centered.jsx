import React from 'react'

const CardCentered = props => (
  <div className="card card--centered">
    <div className="card__in">
      { props.title && (<h2 className="card__title">{props.title}</h2>) }
      <div className="card__content">
        { props.children }
      </div>
    </div>
  </div>
)

export default CardCentered
