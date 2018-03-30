import React from 'react'
import { FormattedMessage } from 'react-intl'

import { formatDate } from '../_helpers.js'
import Markdown from '../ui/markdown.jsx'

import './paper-sheet.scss'
const BASE_CLASS = `paper-sheet`

export default function PaperSheet( props ) {
  const { part } = props
  const className = [ BASE_CLASS ]
  if ( part ) className.push(`${BASE_CLASS}--part-${part}`)
  return (
    <div className={className.join(` `)}>
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
      <p className={`${PARTY_CLASS}-title`}>
        <FormattedMessage id={`paper-sheet.party.${ title }`} />
      </p>
      <h4 className={`${PARTY_CLASS}-name`}>{ people.name }</h4>
      <PartyAddress content={ people.address} PARTY_CLASS={PARTY_CLASS} />
    </aside>
  )
}

function PartyAddress( props ) {
  const { content, PARTY_CLASS } = props
  if ( !content ) return (
    <p className={`${PARTY_CLASS}-address ${PARTY_CLASS}-address--empty`}>
      <FormattedMessage id="paper-sheet.party.no-address" />
    </p>
  )
  return <Markdown text={content} />
}

export function Mentions( props ) {
  const { content } = props
  const MENTIONS_CLASS = `${BASE_CLASS}__mentions`
  return (
    <div className={`${MENTIONS_CLASS}`}>
      <Markdown text={content} />
    </div>
  )
}
