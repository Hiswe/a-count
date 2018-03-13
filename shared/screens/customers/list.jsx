import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers.js'
import FullPage from '../../components/ui/layout-full-page.jsx'
import CustomersTable from '../../components/customers/list.jsx'
import { ButtonNew } from '../../components/customers/secondary-nav-actions.jsx'

// class Customers extends Component {

//   // static fetchData(store, params, cookies) {
//   //   return store.dispatch( customers.getAll(params, cookies) )
//   // }

//   // componentDidMount() {
//   //   this.props.getAll()
//   //   console.log( this.props )
//   // }

//   render() {
//     return (
//       <FullPage title="Customers" secondary={ ButtonNew }>
//         <Link to="/customers/new" className="btn-fab">+</Link>
//         <div className="page__content">
//           <CustomersTable />
//         </div>
//       </FullPage>
//     )
//   }
// }

// const mapStateToProp = (state) => {
//   const customers   = state.customers && state.customers.list
//   const hasCustomers = customers && customers.length
//   return {
//     hasCustomers,
//   }
// }

const Customers = props => {
  return (
    <FullPage title="Customers" secondary={ ButtonNew }>
      <Link to="/customers/new" className="btn-fab">+</Link>
      <div className="page__content">
        <CustomersTable />
      </div>
    </FullPage>
  )
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     getAll: customers.getAll,
//   }, dispatch)
// }

export default connect()( ConnectDataFetcher({
  Component: Customers,
  actionCreators: [
    customers.getAll
  ],
}) )
