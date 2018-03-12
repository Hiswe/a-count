import React from 'react'

const RenderFakeId = props => {
  const { prefix = `PR`, startAt = -1000 , count } = props
  if ( !Number.isFinite(count) ) return null
  return (
    <span>{prefix}-{ count + startAt }</span>
  )
}

export default RenderFakeId
