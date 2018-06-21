import React from 'react'
import { renderRoutes } from 'react-router-config'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import config from './isomorphic-config'
import * as locales from './locales'
import ErrorBoundary from './error-boundary'
import NavMain from './nav/main'
import Notifications from './notifications/list'
import * as formDraft from './redux-ducks/form-draft'

import './react-application.scss'

class ReactApplication extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // dirty check of redirection
  static getDerivedStateFromProps(props, state) {
    if (!props.redirection) return null
    const { history, serverContext } = props
    // update static context for the server
    if (serverContext) {
      serverContext.status = 302
      serverContext.url = props.redirection
    }
    history.push(props.redirection)
    return null
  }

  render() {
    const { route, lang } = this.props

    // key is needed for dynamic language selection
    // • https://github.com/yahoo/react-intl/wiki/Components#dynamic-language-selection
    return (
      <IntlProvider locale={lang} key={lang} messages={locales[lang]}>
        <>
          {/* React.StrictMode throw for any:
              • Connect component
              • Route
              • Switch
           */}
          {/* <React.StrictMode> */}
          <Helmet
            defaultTitle={config.APP_NAME}
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
                name: `viewport`,
                content: `width=device-width, initial-scale=1.0`,
              },
            ]}
          >
            <html lang={lang} />
            <link rel="stylesheet" href={`/application-client.css`} />
            <link rel="icon" href="/favicon.png" type="image/png" />
          </Helmet>
          <h1 className="main-logo">{config.APP_NAME}</h1>
          <NavMain />
          <ErrorBoundary>
            {/* child routes won't render without this */}
            {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
            {renderRoutes(route.routes)}
          </ErrorBoundary>
          <Notifications />
          {/* </React.StrictMode> */}
        </>
      </IntlProvider>
    )
  }
}

function state2props(state) {
  return {
    lang: state.account.get(`user.lang`) || `en`,
    redirection: state.formDraft.get(`_redirection`) || false,
  }
}

function dispatch2prop(dispatch) {
  return bindActionCreators(
    {
      cleanRedirection: formDraft.cleanRedirection,
    },
    dispatch,
  )
}

export default connect(state2props)(ReactApplication)
