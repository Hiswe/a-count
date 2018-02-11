import React        from 'react'
import { connect }  from 'react-redux'
import { Link }     from 'react-router-dom'

// import QuotationList  from './quotation-list.jsx'
// import InvoiceList    from './invoice-list.jsx'

const Home = () => (
  <div>
    <h1>Home</h1>
    <section>
      <h1>quotations
      {/* <Link to="/quotation" className="btn-circular">+</Link> */}
      </h1>
      {/* <QuotationList /> */}
    </section>
    <section>
      <h1>invoices</h1>
      {/* <InvoiceList /> */}
    </section>
  </div>
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

export { Home as default }
