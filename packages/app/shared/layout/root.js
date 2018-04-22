import   React          from 'react'
import { renderRoutes } from 'react-router-config'
import { IntlProvider } from 'react-intl'
import { connect      } from 'react-redux'
import { Helmet       } from 'react-helmet'

import      config        from '../isomorphic-config'
import * as locales       from '../locales'
import      ErrorBoundary from '../error-boundary'
import      NavMain       from '../nav/main'
import      Notifications from '../notifications/list'

import './root.scss'

class Root extends React.PureComponent {

  constructor( props ) {
    super( props )
  }

  render( ) {
    const { route, lang } = this.props

    // key is needed for dynamic language selection
    // • https://github.com/yahoo/react-intl/wiki/Components#dynamic-language-selection
    return (
      <IntlProvider locale={ lang } key={ lang } messages={ locales[ lang ] } >
        <React.Fragment>
          {/* React.StrictMode throw for any:
              • Connect component
              • Route
              • Switch
           */}
          {/* <React.StrictMode> */}
            <Helmet
              defaultTitle={ config.APP_NAME }
              titleTemplate={`${config.APP_NAME} – %s`}
              meta={[
                {
                  'http-equiv': `Content-Language`,
                  content: lang,
                },
                {
                  'http-equiv': `X-UA-Compatible`,
                  content: `IE=edge`,
                },
                {
                  name:    `viewport`,
                  content: `width=device-width, initial-scale=1.0`,
                },
              ]}
            >
              <html lang={ lang } />
              <link rel="stylesheet" href="/concompte.css" />
              <link rel="icon" href="/favicon.png" type="image/png" />
            </Helmet>
            <h1 className="main-logo">Concompte</h1>
            <NavMain />
            <ErrorBoundary>
              {/* child routes won't render without this */}
              {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
              { renderRoutes(route.routes) }
            </ErrorBoundary>
            <Notifications />
          {/* </React.StrictMode> */}
        </React.Fragment>
      </IntlProvider>
    )
  }
}

function state2props( state ) {
  const lang = state.account.get( `user.lang` )  || `en`
  return { lang }
}

export default connect( state2props )( Root )

