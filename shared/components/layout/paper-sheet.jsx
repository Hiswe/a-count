import React from 'react'

import { formatDate } from '../_helpers.js'
import Markdown from '../ui/markdown.jsx'
import './paper-sheet.scss'

const BASE_CLASS = `paper-sheet`

export default function PaperSheet( props ) {
  return (
    <div className={BASE_CLASS}>
      { props.children }
    </div>
  )
}

export function Reference( props ) {
  const { type, product } = props
  const { updatedAt, reference } = product
  const REF_CLASS = `${BASE_CLASS}__reference`
  return (
    <header className={REF_CLASS}>
      <h3 className={`${REF_CLASS}-type`}>{ type }</h3>
      <h4 className={`${REF_CLASS}-id`}>Ref. { reference }</h4>
      <p className={`${REF_CLASS}-date`}>date: { formatDate(updatedAt, `DD/MM/YY`) }</p>
    </header>
  )
}

export function Party( props ) {
  const { title, ...people } = props
  const PARTY_CLASS = `${BASE_CLASS}__party`
  return (
    <aside className={`${PARTY_CLASS}`}>
      <p className={`${PARTY_CLASS}-title`}>{ title }</p>
      <h4 className={`${PARTY_CLASS}-name`}>{ people.name }</h4>
      <PartyAddress content={ people.address} />
    </aside>
  )
}

function PartyAddress( props ) {
  const { content } = props
  if ( !content ) return (
    <p className={`${BASE_CLASS}__party-address ${BASE_CLASS}__party-address--empty`}>
      no address defined
    </p>
  )
  return <Markdown text={content} />
}
