import authenticationRequired from './authentication-required.jsx'
import authenticationForbidden from './authentication-forbidden.jsx'

import Root from './components/root.jsx'

import Login from './pages/account/login.jsx'
import Register from './pages/account/register.jsx'
import Forgot from './pages/account/forgot.jsx'
import Reset from './pages/account/reset.jsx'
import Settings from './pages/account/settings.jsx'

import Home from './pages/home.jsx'

import QuotationsList from './pages/quotations/list.jsx'
import QuotationsNew from './pages/quotations/new.jsx'
import QuotationsEdit from './pages/quotations/edit.jsx'
import QuotationsPrint from './pages/quotations/print.jsx'

import InvoicesList from './pages/invoices/list.jsx'
import InvoicesEdit from './pages/invoices/edit.jsx'
import InvoicesPrint from './pages/invoices/print.jsx'

import CustomersList from './pages/customers/list.jsx'
import CustomerNew from './pages/customers/new.jsx'
import CustomerEdit from './pages/customers/edit.jsx'

import NotFound from './pages/not-found.jsx'

const routes = [{
  component: Root,
  routes: [{
    path: `/account/login`,
    exact: true,
    component: authenticationForbidden( Login ),
  }, {
    path: `/account/register`,
    exact: true,
    component: authenticationForbidden( Register ),
  }, {
    path: `/account/forgot`,
    exact: true,
    component: authenticationForbidden( Forgot ),
  }, {
    path: `/account/reset`,
    exact: true,
    component: authenticationForbidden( Reset ),
  }, {
    path: `/`,
    exact: true,
    component: authenticationRequired( Home ),
  }, {
    path: `/account/settings`,
    exact: true,
    component: authenticationRequired( Settings ),
  }, {
    path: `/quotations`,
    exact: true,
    component: authenticationRequired( QuotationsList ),
  }, {
    path: `/quotations/new`,
    exact: true,
    component: authenticationRequired( QuotationsNew ),
  }, {
  path: `/quotations/:id`,
    exact: true,
    component: authenticationRequired( QuotationsEdit ),
  }, {
    path: `/quotations/:id/print`,
    exact: true,
    component: authenticationRequired( QuotationsPrint ),
  }, {
    path: `/invoices`,
    exact: true,
    component: authenticationRequired( InvoicesList ),
  }, {
  path: `/invoices/:id`,
    exact: true,
    component: authenticationRequired( InvoicesEdit ),
  }, {
    path: `/invoices/:id/print`,
    exact: true,
    component: authenticationRequired( InvoicesPrint ),
  }, {
    path: `/customers`,
    exact: true,
    component: authenticationRequired( CustomersList ),
  }, {
    path: `/customers/new`,
    exact: true,
    component: authenticationRequired( CustomerNew ),
  }, {
  path: `/customers/:id`,
    exact: true,
    component: authenticationRequired( CustomerEdit ),
  }, {
    path: `*`,
    component: NotFound,
  }],
}]

export default routes
