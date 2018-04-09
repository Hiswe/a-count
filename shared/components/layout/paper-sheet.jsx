import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import { Date, Markdown } from '../ui/format.jsx'

import './paper-sheet.scss'
const BASE_CLASS = `paper-sheet`

export function PaperSheet( props ) {
  const { part, print } = props
  const className = [ BASE_CLASS ]
  if ( part ) className.push(`${BASE_CLASS}--part-${part}` )
  if ( print ) className.push(`${BASE_CLASS}--print-mode` )
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
      <h3 className={`${REF_CLASS}-type`}>
        <FormattedMessage id={`paper-sheet.reference.${ type }`} />
      </h3>
      <h4 className={`${REF_CLASS}-id`}>Ref. { reference }</h4>
      <p className={`${REF_CLASS}-date`}>
        <FormattedMessage id={`paper-sheet.reference.date`} />
        <Date value={ updatedAt } />
      </p>
    </header>
  )
}

export function Between( props ) {
  return (
    <div className={`${BASE_CLASS}__between`}>
      { props.children }
    </div>
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

export const PartyUser = connect(
  state => ({user: state.account.get(`current`)})
)( props => <Party title="from" {...props.user}/> )

function PartyAddress( props ) {
  const { content, PARTY_CLASS } = props
  if ( !content ) return (
    <p className={`${PARTY_CLASS}-address ${PARTY_CLASS}-address--empty`}>
      <FormattedMessage id="paper-sheet.party.no-address" />
    </p>
  )
  return <Markdown text={content} />
}

export function Subject( props ) {
  const COMP_CLASS = `${BASE_CLASS}__subject`
  return (
    <div className={ COMP_CLASS }>
      <span className={`${COMP_CLASS}-title`}>
        <FormattedMessage id="paper-sheet.subject" />
      </span>
      <span className={`${COMP_CLASS}-content`}>{ props.value}</span>
    </div>
  )
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
