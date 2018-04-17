import authenticationRequired from './authentication-required.jsx'
import authenticationForbidden from './authentication-forbidden.jsx'

import Root from './layout/root.jsx'

import Login    from './account/page-login.jsx'
import Register from './account/page-register.jsx'
import Forgot   from './account/page-forgot.jsx'
import Reset    from './account/page-reset.jsx'
import Settings from './account/page-settings.jsx'

import Home from './home/page-home.jsx'

import QuotationsList    from './quotations/page-list.jsx'
import QuotationsNew     from './quotations/page-new.jsx'
import QuotationsEdit    from './quotations/page-edit.jsx'
import QuotationsPreview from './quotations/page-preview.jsx'

import InvoicesList    from './invoices/page-list.jsx'
import InvoicesEdit    from './invoices/page-edit.jsx'
import InvoicesPreview from './invoices/page-preview.jsx'

import CustomersList from './customers/page-list.jsx'
import CustomerNew   from './customers/page-new.jsx'
import CustomerEdit  from './customers/page-edit.jsx'

import NotFound from './page-not-found.jsx'

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
    path: `/quotations/:id/preview`,
    exact: true,
    component: authenticationRequired( QuotationsPreview ),
  }, {
    path: `/invoices`,
    exact: true,
    component: authenticationRequired( InvoicesList ),
  }, {
  path: `/invoices/:id`,
    exact: true,
    component: authenticationRequired( InvoicesEdit ),
  }, {
    path: `/invoices/:id/preview`,
    exact: true,
    component: authenticationRequired( InvoicesPreview ),
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
