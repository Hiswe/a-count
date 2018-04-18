import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import './spinner.scss'
const BASE_CLASS = `spinner`
const DELAY      = 1000

export class Spinner extends React.PureComponent {

  constructor( props ) {
    super( props )
    this.state = {
      showSpinner: false,
    }
    this.showSpinner = this.showSpinner.bind( this )
  }

  componentDidMount() {
    this.timerId = setTimeout( this.showSpinner, DELAY )
  }

  componentWillUnmount() {
    this.timerId && clearTimeout( this.timerId )
    this.timerId = false
  }

  showSpinner() {
    this.timerId && this.setState( prevState => ({
      showSpinner: true,
    }))
  }

  render() {
    const COMP_CLASS = [ BASE_CLASS ]
    if ( this.state.showSpinner ) COMP_CLASS.push( `${BASE_CLASS}--is-loading` )
    return (
      <aside className={ COMP_CLASS.join(` `) }>
        <FormattedMessage id="spinner.loading" />
      </aside>
    )
  }
}

export default Spinner
