import   React                 from 'react'
import { FormattedMessage    } from 'react-intl'
import { connect             } from 'react-redux'
import   ReactResizeDetector   from 'react-resize-detector'
import   className             from 'classnames'

import { Day, Markdown } from '../ui/format'

import './paper-sheet.scss'
const BASE_CLASS = `paper-sheet`
const A4_SIZE    = 1119 // ± px size of 297mm

function Pagination( props ) {
  const { pages } = props
  return (
    <div className="print-pagination">
      {Array.from({length: pages}).map( (v, page) => {
        return <div className="print-pagination__page" key={page}>page {page + 1}/{pages}</div>
      })}
    </div>
  )
}

class PaperSheet extends React.PureComponent {

  constructor( props ) {
    super( props )
    this.state = {
      pages: 0,
    }
    this.onResize = this.onResize.bind(this)
  }

  // this is done only for print purpose
  // • Chrome doesn't handle well `break-inside` with `flexbox`
  // • But we need flexbox to have a nice presentation if there is a single page
  // • thus the size check
  onResize(width, height) {
    // don't check page count if already checked
    if ( this.state.page > 0 ) return
    const pages       = Math.ceil( height / A4_SIZE )
    this.setState( prevState => ({
      pages,
    }))
  }

  render() {
    const { props, state }  = this
    const { part, preview } = props
    const COMP_CLASS = className( BASE_CLASS, {
      [`${BASE_CLASS}--part-${part}`]: part,
      [`${BASE_CLASS}--preview-mode`]: preview,
      [`${BASE_CLASS}--preview-mode-single-page`]: state.pages === 1,
      [`${BASE_CLASS}--preview-mode-multiple-pages`]: state.pages > 1,
    })
    return (
      <div className={`${BASE_CLASS}-size-wrapper`}>
        <div className={ COMP_CLASS }>
          { props.children }
        </div>
        {preview && (
          <>
            <ReactResizeDetector handleHeight onResize={this.onResize} />
            <Pagination pages={state.pages} />
          </>
        )}
      </div>
    )
  }
}

export { PaperSheet }
export { PaperSheet as Sheet }

export function Reference( props ) {
  const { type, product } = props
  const { sendAt, reference } = product
  const REF_CLASS = `${BASE_CLASS}__reference`
  return (
    <header className={REF_CLASS}>
      <h3 className={`${REF_CLASS}-type`}>
        <FormattedMessage id={`paper-sheet.reference.${ type }`} />
      </h3>
      <h4 className={`${REF_CLASS}-id`}>Ref. { reference }</h4>
      <p className={`${REF_CLASS}-date`}>
      {sendAt && (
        <>
          <FormattedMessage id={`paper-sheet.reference.date`} />
          <Day value={ sendAt } />
        </>
      )}
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
  const {
    title,
    people = {},
  } = props
  const PARTY_CLASS = `${BASE_CLASS}__party`
  const address     = people.address
  return (
    <aside className={`${PARTY_CLASS}`}>
      <p className={`${PARTY_CLASS}-title`}>
        <FormattedMessage id={`paper-sheet.party.${ title }`} />
      </p>
      <h4 className={`${PARTY_CLASS}-name`}>
        { people.name ? people.name : (
          <p className={`${PARTY_CLASS}-address ${PARTY_CLASS}-name--empty`}>
            <FormattedMessage id={`paper-sheet.party.no-name.${title}`}/>
          </p>
        )}
      </h4>
      { address ? <Markdown text={ address } /> : (
        <p className={`${PARTY_CLASS}-address ${PARTY_CLASS}-address--empty`}>
          <FormattedMessage id={`paper-sheet.party.no-address.${title}`} />
        </p>
      )}
    </aside>
  )
}

export const PartyUser = connect(
  state => ({user: state.account.get(`user`)})
)( props => <Party title="from" people={props.user}/> )

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
export { PartyUser as User }

export function Mentions( props ) {
  const { content }    = props
  const MENTIONS_CLASS = `${BASE_CLASS}__mentions`
  return (
    <div className={`${MENTIONS_CLASS}`}>
      <Markdown text={content} />
    </div>
  )
}
