import React, { PureComponent } from 'react'
import { renderRoutes } from 'react-router-config'
import { IntlProvider } from 'react-intl'

import * as locales from '../../locales'
import ErrorBoundary from '../error-boundary.jsx'
import NavMain from '../nav/main.jsx'
import Notifications from '../notifications/list.jsx'

import './root.scss'

class Root extends PureComponent {

  constructor( props ) {
    super( props )
  }

  render( ) {
    const { route } = this.props
    return (
      <IntlProvider locale={ `en` } messages={ locales.en } >
        <div id="react-wrapper">
            <h1 className="main-logo">Concompte</h1>
            <NavMain />
            <ErrorBoundary>
              {/* child routes won't render without this */}
              {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
              { renderRoutes(route.routes) }
            </ErrorBoundary>
            <Notifications />
        </div>
      </IntlProvider>
    )
  }
}

export default Root

