import React        from 'react'
import { connect }  from 'react-redux'
import { Link }     from 'react-router-dom'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import FullPage from '../components/ui/layout-full-page.jsx'

// import QuotationList  from './quotation-list.jsx'
// import InvoiceList    from './invoice-list.jsx'

{/* <Link to="/quotations/new" className="btn-circular">+</Link> */}

const Home = () => (
  <FullPage title="Home">
    <section>
      <h3>quotations
      </h3>
      {/* <QuotationList /> */}
    </section>
    <section>
      <h3>invoices</h3>
      {/* <InvoiceList /> */}
    </section>
  </FullPage>
)

// function mapStateToProp(state) {
//   if (!state.result || !state.result.quotations) return {ids: []}
//   return {
//     ids: state.result.quotations,
//   }
// }

// //
// let List = (props) => (
//   <div>
//     <h3>List</h3>
//     <ul>
//       {props.ids.map( id => <li key={id}>{id}</li>)}
//     </ul>
//   </div>
// )

// List = connect(mapStateToProp)(List)

// const Home =  () => (
//    <div>
//     <h1>Home</h1>
//     <section>
//       <h1>quotations
//       <a href="/quotation" className="btn-circular">+</a>
//       </h1>
//     </section>
//     <section>
//       <h1>invoices</h1>
//       <List />
//     </section>
//   </div>
// )

// export default connect()(Home)

// export { Home as default }

export default connect()( ConnectDataFetcher({
  Component: Home,
  actionCreators: [
  ],
}) )
