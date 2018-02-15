import React            from 'react'

const PrintBtn = (props)  => {
  if (!props.id) return null
  return (
    <a key="print" href={`/print/${props.id }`} className="btn">Print</a>
  )
}

export { PrintBtn as default }
