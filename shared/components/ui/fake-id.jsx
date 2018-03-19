import React from 'react'

const RenderFakeId = props => {
  const { prefix = `PR`, startAt = -1000 , count } = props
  if ( !Number.isFinite(count) ) return `#`
  return (
    <span>{prefix.toUpperCase()}-{ count + startAt }</span>
  )
}

export default RenderFakeId
