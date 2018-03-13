import authenticationRequired from './authentication-required.jsx'
import authenticationForbidden from './authentication-forbidden.jsx'

import Root from './screens/root.jsx'
import Login from './screens/login.jsx'
import Register from './screens/register.jsx'
import Home from './screens/home.jsx'
import UserEdit from './screens/users/edit.jsx'
import QuotationsList from './screens/quotations/list.jsx'
import QuotationsNew from './screens/quotations/new.jsx'
import QuotationsEdit from './screens/quotations/edit.jsx'
import CustomersList from './screens/customers/list.jsx'
import CustomerNew from './screens/customers/new.jsx'
import CustomerEdit from './screens/customers/edit.jsx'
import NotFound from './screens/not-found.jsx'

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
