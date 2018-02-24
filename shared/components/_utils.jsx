import React from 'react'

const Empty = () => (
  <p>none (yet)</p>
)

const Amount = (props) => {
  const { value } = props
  const isValid = Number.isFinite( value )
  const unit = isValid ? `€\u00A0` : ``
  const display = isValid ? value : `#error`
  return (
  <p className="amount">
    {unit} <span>{display}</span>
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
  Empty,
  Amount,
  RenderError,
  RenderFakeId,
}
