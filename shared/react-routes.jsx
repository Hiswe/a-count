import React              from 'react'
import {
  Route,
  IndexRoute, Redirect }  from 'react-router'

import Layout         from '../views/_layout.jsx'
import Home           from '../views/home.jsx'

import QuotationHome  from '../views/quotations-home.jsx'
import QuotationForm  from '../views/quotation-form.jsx'

import InvoiceHome    from '../views/invoices-home.jsx';
import InvoiceForm    from '../views/invoice-form.jsx'

import CustomerHome   from '../views/customer-home.jsx'
import CustomerForm   from '../views/customer-form.jsx'

import Settings       from '../views/settings.jsx'
import _404           from '../views/404.jsx'
// <Redirect from="invoices" to="/" />

// wrap in a function for router to have access the state
function provideRouter(store) {
  function onEnter(type) {
    const paramName = type === 'customers' ? 'customerId' : 'fakeId';

    return function (nextState, replace) {
      const state       = store.getState()
      const hasParam    = nextState.params[paramName] != null
      const isUnvalidId = state.result[type].indexOf(nextState.params[paramName]) < 0
      if (hasParam && isUnvalidId) return replace('/404')
    }
  }

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />

      <Route path="quotations" component={QuotationHome} />
      <Route path="quotation(/:fakeId)" component={QuotationForm} onEnter={onEnter('quotations')} />

      <Route path="invoices" component={InvoiceHome} />
      <Route path="invoice/:fakeId" component={InvoiceForm} onEnter={onEnter('invoices')} />

      <Route path="customers" component={CustomerHome} />
      <Route path="customer(/:customerId)" component={CustomerForm} onEnter={onEnter('customers')} />

      <Route path="settings" component={Settings} />
      <Route path="404" component={_404} />
      <Route path="*" component={_404} />
    </Route>
  )
}

export { provideRouter as default }
