import   React                 from 'react'
import { FormattedMessage    } from 'react-intl'
import { connect             } from 'react-redux'
import   ReactResizeDetector   from 'react-resize-detector'
import   className             from 'classnames'

import { Day, Markdown } from '../ui/format'

import './paper-sheet.scss'
const BASE_CLASS = `paper-sheet`

class PaperSheet extends React.PureComponent {

  constructor( props ) {
    super( props )
    this.state = {
      hasOverflow: false,
    }
    this.onResize = this.onResize.bind(this)
  }

  // this is done only for print purpose
  // • Chrome doesn't handle well `break-inside` with `flexbox`
  // • But we need flexbox to have a nice presentation if there is a single page
  // • thus the size check: 1120px is ± 297mm
  onResize(width, height) {
    this.setState( prevState => ({
      hasOverflow: height > 1120,
    }))
  }

  render() {
    const { props, state } = this
    const { part, preview } = props
    const COMP_CLASS = className( BASE_CLASS, {
      [`${BASE_CLASS}--part-${part}`]: part,
      [`${BASE_CLASS}--preview-mode`]: preview,
      [`${BASE_CLASS}--preview-mode-no-flex`]: state.hasOverflow,
    })
    return (
      <div className={`${BASE_CLASS}-size-wrapper`}>
        <div className={ COMP_CLASS }>
          { props.children }
        </div>
        {preview && (
          <ReactResizeDetector handleHeight onResize={this.onResize} />
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
  const { content } = props
  const MENTIONS_CLASS = `${BASE_CLASS}__mentions`
  return (
    <div className={`${MENTIONS_CLASS}`}>
      <Markdown text={content} />
    </div>
  )
}
