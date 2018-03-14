import authenticationRequired from './authentication-required.jsx'
import authenticationForbidden from './authentication-forbidden.jsx'

import Root from './components/layout/root.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Home from './pages/home.jsx'
import UserEdit from './pages/users/edit.jsx'
import QuotationsList from './pages/quotations/list.jsx'
import QuotationsNew from './pages/quotations/new.jsx'
import QuotationsEdit from './pages/quotations/edit.jsx'
import CustomersList from './pages/customers/list.jsx'
import CustomerNew from './pages/customers/new.jsx'
import CustomerEdit from './pages/customers/edit.jsx'
import NotFound from './pages/not-found.jsx'

const routes = [{
  component: Root,
  routes: [{
    path: `/login`,
    exact: true,
    component: authenticationForbidden( Login ),
  }, {
    path: `/register`,
    exact: true,
    component: authenticationForbidden( Register ),
  }, {
    path: `/`,
    exact: true,
    component: authenticationRequired( Home ),
  }, {
    path: `/profile`,
    exact: true,
    component: authenticationRequired( UserEdit ),
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

// for the `/quotations/:id/print`
//     and `/customers/:id/print`
// http://maxlapides.com/forcing-browsers-print-backgrounds/

export default routes
