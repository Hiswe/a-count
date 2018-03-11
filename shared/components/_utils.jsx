import React from 'react'

const Empty = props => {
  const message = `none (yet)`
  if (props.colspan) {
    return (
      <tr>
        <td colSpan={props.colspan} style={{textAlign: `center`}}>{message}</td>
      </tr>
    )
  }
  return ( <p>{message}</p> )
}

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
  Empty,
  Amount,
  RenderError,
  RenderFakeId,
}
