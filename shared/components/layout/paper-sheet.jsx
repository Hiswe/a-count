import React from 'react'

import { safeMarked } from '../_helpers'
import './paper-sheet.scss'

export default function PaperSheet( props ) {
  return (
    <div className="paper-sheet">
      { props.children }
    </div>
  )
}

export function Party( props ) {
  const { type, ...people } = props
  return (
    <aside className={`paper-sheet__party paper-sheet__party--${type}`}>
      <h4 className="paper-sheet__party-title">{ people.name }</h4>
      <Address content={ people.address} />
    </aside>
  )
}

function Address( props ) {
  const { content } = props
  if ( !content ) return (
    <p className="paper-sheet__party-address paper-sheet__party-address--empty">
      no address defined
    </p>
  )
  return (
    <div className="paper-sheet__party-address"
      dangerouslySetInnerHTML={{
        __html: safeMarked( content ),
      }}
    />
  )
}
