import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as user from '../ducks/user'
import MainNav from '../components/layout/main-nav.jsx'
import Notifications from '../components/layout/notifications.jsx'
import ErrorBoundary from '../components/error-boundary.jsx'

// class Layout extends Component {

//   // always get the session
//   static fetchData({dispatch, params, cookies}) {
//     return dispatch( user.auth({params, cookies}) )
//   }

//   componentDidMount() {
//     this.dispatch( user.auth() )
//   }

//   render () {
//     const { props } = this
//     const { route } = props
//     return (
//       <div id="react-wrapper">
//         <h1 className="main-logo">Concompte</h1>
//         <MainNav />
//         <ErrorBoundary>
//           {/* child routes won't render without this */}
//           {/* https://www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
//           { renderRoutes(route.routes) }
//         </ErrorBoundary>
//         <Notifications />
//       </div>
//     )
//   }
// }

// const mapStateToProp = (state, ownProps) => {
//   return {
//     route: ownProps.route,
//   }
// }

const Layout = props => {
  const { route } = props
  return (
    <div id="react-wrapper">
      <h1 className="main-logo">Concompte</h1>
      <MainNav />
      <ErrorBoundary>
        {/* child routes won't render without this */}
        {/* https:www.npmjs.com/package/react-router-config#renderroutesroutes-extraprops-- */}
        { renderRoutes(route.routes) }
      </ErrorBoundary>
      <Notifications />
    </div>
  )
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     auth: user.auth,
//   }, dispatch)
// }

// export default connect( mapStateToProp, mapDispatchToProps)( Layout )
// export default connect( mapStateToProp )( Layout )
export default Layout

