import React from 'react'

const CardCentered = props => (
  <div className="card card--centered">
    <header className="card__in">
      { props.children }
    </header>
  </div>
)

const Empty = () => (
  <p>none (yet)</p>
)

const Amount = (props) => {
  const { value } = props
  const isValid = Number.isFinite( value )
  const unit = isValid ? `€` : ``
  const display = isValid ? value : `#error`
  return (
  <p className="amount">
    <span className="amount__unit">{unit}</span> <span className="amount__value">{display}</span>
  </p>
)}

const RenderError = (props) => {
  return (
    <div>
      <h1>An error has ocurred</h1>
      <p>{ props.message }</p>
    </div>
  )
}

const RenderFakeId = ({prefix = `PR`, startAt = 350 , count}) => {
  if ( !Number.isFinite(count) ) return null
  return (
    <span>{prefix}-{ count + startAt }</span>
  )
}

export {
  CardCentered,
  Empty,
  Amount,
  RenderError,
  RenderFakeId,
}
