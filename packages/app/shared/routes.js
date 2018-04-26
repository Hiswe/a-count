import authenticationRequired from './authentication-required'
import authenticationForbidden from './authentication-forbidden'

import Root from './layout/root'

import Login       from './account/page-login'
import Register    from './account/page-register'
import SetPassword from './account/page-set-password'
import Forgot      from './account/page-forgot'
import Reset       from './account/page-reset'
import Settings    from './account/page-settings'

import Home from './home/page-home'

import ArchiveList      from './archive/page-list'
import ArchiveQuotation from './archive/page-quotation'
import ArchiveInvoice   from './archive/page-invoice'

import QuotationsList    from './quotations/page-list'
import QuotationsNew     from './quotations/page-new'
import QuotationsEdit    from './quotations/page-edit'
import QuotationsPreview from './quotations/page-preview'

import InvoicesList    from './invoices/page-list'
import InvoicesEdit    from './invoices/page-edit'
import InvoicesPreview from './invoices/page-preview'

import CustomersList from './customers/page-list'
import CustomerNew   from './customers/page-new'
import CustomerEdit  from './customers/page-edit'

import NotFound from './page-not-found'

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
    path: `/account/set-password`,
    exact: true,
    component: authenticationForbidden( SetPassword ),
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
    path: `/archives`,
    exact: true,
    component: authenticationRequired( ArchiveList ),
  }, {
    path: `/archives/quotations/:id`,
    exact: true,
    component: authenticationRequired( ArchiveQuotation ),
  }, {
    path: `/archives/invoices/:id`,
    exact: true,
    component: authenticationRequired( ArchiveInvoice ),
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
