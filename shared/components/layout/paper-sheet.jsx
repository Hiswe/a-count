import React from 'react'

import './paper-sheet.scss'

export default function PaperSheet( props ) {
  return (
    <div className="paper-sheet">
      { props.children }
    </div>
  )
}

export function From( props ) {
  return (
    <aside className="paper-sheet__from">
      <h4>{ props.name }</h4>
      <div></div>
    </aside>
  )
}

export function To( props ) {
  return (
    <aside className="paper-sheet__to">
      <h4>{ props.name }</h4>
      <div></div>
    </aside>
  )
}
