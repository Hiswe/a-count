import React from 'react'

const Empty = () => (
  <p>none (yet)</p>
)

const Amount = (props) => (
  <p className="amount">
    {'€\u00A0'} <span>{props.value}</span>
  </p>
)

export {
  Empty,
  Amount,
}
