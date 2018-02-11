import React              from 'react'
import { Switch, Redirect }  from 'react-router'
import { Route } from 'react-router-dom'

import Layout from '../views/_layout.jsx'
import Home           from '../views/home.jsx'

import QuotationHome  from '../views/quotations-home.jsx'
import QuotationForm  from '../views/quotation-form.jsx'

import InvoiceHome    from '../views/invoices-home.jsx';
import InvoiceForm    from '../views/invoice-form.jsx'

import CustomerHome   from '../views/customer-home.jsx'
import CustomerForm   from '../views/customer-form.jsx'

import Settings       from '../views/settings.jsx'
import _404           from '../views/404.jsx'

// wrap in a function for router to have access the state
const App = store => {

  // function onEnter(type) {
  //   const paramName = type === 'customers' ? 'customerId' : 'fakeId';

  //   return function (nextState, replace) {
  //     const state       = store.getState()
  //     const hasParam    = nextState.params[paramName] != null
  //     const isInvalidId = state.result[type].indexOf(nextState.params[paramName]) < 0
  //     if (hasParam && isInvalidId) return replace('/404')
  //   }
  // }

  // return (
  //   <p>
  //     hello world
  //   </p>
  // )

  // return (
  //   <Layout>
  //     <Switch>
  //     </Switch>
  //   </Layout>
  // )

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route path="/quotations" component={QuotationHome} />
        {/* <Route path="/quotation(/:fakeId)" component={QuotationForm} onEnter={onEnter('quotations')} /> */}
        <Route path="/quotation(/:fakeId)" component={QuotationForm} />

        <Route path="/invoices" component={InvoiceHome} />
        {/* <Route path="/invoice/:fakeId" component={InvoiceForm} onEnter={onEnter('invoices')} /> */}
        <Route path="/invoice/:fakeId" component={InvoiceForm} />

        <Route exact path="/customers" component={CustomerHome} />
        <Route exact path="/customers/new" component={CustomerForm} />
        {/* <Route path="/customer(/:customerId)" component={CustomerForm} onEnter={onEnter('customers')} /> */}

        <Route path="/settings" component={Settings} />
        <Route path="/404" component={_404} />
        <Route path="/*" component={_404} />
        {/* <Redirect path="*" to="/" /> */}
      </Switch>
    </Layout>
  )
}

export { App as default }
