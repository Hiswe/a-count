import React from 'react'

const BASE_CLASS = `fake-id`

export function computeFakeId( { prefix = `FAKED_`, startAt = -1000 , count } ) {
  if ( !Number.isFinite(count) ) return `#`
  return `${ prefix }${ count + startAt }`
}

export default function RenderFakeId( props ) {
  return (
    <span className={BASE_CLASS}>{ computeFakeId(props) }</span>
  )
}
