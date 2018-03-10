import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MainNav from './main-nav.jsx'
import * as auth from '../../ducks/auth'

class Layout extends Component {

  // always get the session
  static fetchData(store, params, cookies) {
    return store.dispatch( auth.get(params, cookies) )
  }

  componentDidMount() {
    this.props.getAuth()
  }

  render () {
    const { props } = this
    const { route } = props
    return (
      <div id="react-wrapper">
        <MainNav />
        <main role="main">
          {/* child routes won't render without this */}
          {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
          { renderRoutes(route.routes) }
        </main>
      </div>
    )
  }
}

const mapStateToProp = (state, ownProps) => {
  return {
    route: ownProps.route,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAuth: auth.get,
  }, dispatch)
}

export default connect( mapStateToProp, mapDispatchToProps)( Layout )

