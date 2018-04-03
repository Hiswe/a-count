import React, { PureComponent, Fragment } from 'react'
import { renderRoutes } from 'react-router-config'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'

import * as locales from '../locales'
import ErrorBoundary from './error-boundary.jsx'
import NavMain from './nav/main.jsx'
import Notifications from './notifications/list.jsx'

import './root.scss'

class Root extends React.Component {

  constructor( props ) {
    super( props )
  }

  render( ) {
    const { route, lang } = this.props

    // key is needed for dynamic language selection
    // • https://github.com/yahoo/react-intl/wiki/Components#dynamic-language-selection
    return (
      <IntlProvider locale={ lang } key={ lang } messages={ locales[ lang ] } >
        <Fragment>
          {/* React.StrictMode throw for any:
              • Connect component
              • Route
              • Switch
           */}
          {/* <React.StrictMode> */}
            <h1 className="main-logo">Concompte</h1>
            <NavMain />
            <ErrorBoundary>
              {/* child routes won't render without this */}
              {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
              { renderRoutes(route.routes) }
            </ErrorBoundary>
            <Notifications />
          {/* </React.StrictMode> */}
        </Fragment>
      </IntlProvider>
    )
  }
}

function state2props( state ) {
  const lang = state.account.get( `current.lang` )  || `en`
  return { lang }
}

export default connect( state2props )( Root )

