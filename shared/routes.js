import authenticationRequired from './authentication-required.jsx'
import authenticationForbidden from './authentication-forbidden.jsx'

import Layout from './components/layout/index.jsx'
import Home from './components/home.jsx'
import Login from './screens/login.jsx'
import Register from './components/register.jsx'
import QuotationsHome from './components/quotations-home.jsx'
import QuotationsForm from './components/quotations-form.jsx'
import CustomersHome from './components/customers-home.jsx'
import CustomersForm from './components/customers-form.jsx'
import NotFound from './components/not-found.jsx'

const routes = [{
  component: Layout,
  routes: [{
    path: `/`,
    exact: true,
    component: authenticationRequired( Home ),
  }, {
    path: `/login`,
    exact: true,
    component: authenticationForbidden( Login ),
  }, {
    path: `/register`,
    exact: true,
    component: authenticationForbidden( Register ),
  }, {
    path: `/quotations`,
    exact: true,
    component: authenticationRequired( QuotationsHome ),
  }, {
    path: `/quotations/new`,
    exact: true,
    component: authenticationRequired( QuotationsForm ),
  }, {
  path: `/quotations/:id`,
    exact: true,
    component: authenticationRequired( QuotationsForm ),
  }, {
    path: `/customers`,
    exact: true,
    component: authenticationRequired( CustomersHome ),
  }, {
    path: `/customers/new`,
    exact: true,
    component: authenticationRequired( CustomersForm ),
  }, {
  path: `/customers/:id`,
    exact: true,
    component: authenticationRequired( CustomersForm ),
  }, {
    path: `*`,
    component: NotFound,
  }],
}]

// for the `/quotations/:id/print`
//     and `/customers/:id/print`
// http://maxlapides.com/forcing-browsers-print-backgrounds/

export { routes as default}
