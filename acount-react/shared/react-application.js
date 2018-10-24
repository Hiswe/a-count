import React from 'react'
import { renderRoutes } from 'react-router-config'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { bindActionCreators } from 'redux'

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
  // • because the router isn't connected to the Redux store
  //   we need to redirect in a component
  static getDerivedStateFromProps(props, state) {
    const { history, staticContext, formDraft } = props
    const redirection = formDraft.get(`_redirection`)
    if (!redirection) return null
    // prevent infinite redirection if we're already on the right route
    if (history.location.pathname === redirection) {
      props.cleanRedirection()
      return null
    }
    // update static context for the server
    if (staticContext) {
      staticContext.status = 302
      staticContext.url = redirection
    }
    history.push(redirection)
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
          {/* <NavMain /> */}
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
    formDraft: state.formDraft,
  }
}

function dispatch2props(dispatch) {
  return bindActionCreators(
    {
      cleanRedirection: formDraft.cleanRedirection,
    },
    dispatch,
  )
}

export default connect(
  state2props,
  dispatch2props,
)(ReactApplication)
