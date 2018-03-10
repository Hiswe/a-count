import Layout from './components/layout/index.jsx'
import Home from './components/home.jsx'
import Login from './components/login.jsx'
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
    component: Home,
  }, {
    path: `/login`,
    exact: true,
    component: Login,
  }, {
    path: `/register`,
    exact: true,
    component: Register,
  }, {
    path: `/quotations`,
    exact: true,
    component: QuotationsHome,
  }, {
    path: `/quotations/new`,
    exact: true,
    component: QuotationsForm,
  }, {
  path: `/quotations/:id`,
    exact: true,
    component: QuotationsForm,
  }, {
    path: `/customers`,
    exact: true,
    component: CustomersHome,
  }, {
    path: `/customers/new`,
    exact: true,
    component: CustomersForm,
  }, {
  path: `/customers/:id`,
    exact: true,
    component: CustomersForm,
  }, {
    path: `*`,
    component: NotFound,
  }],
}]

// for the `/quotations/:id/print`
//     and `/customers/:id/print`
// http://maxlapides.com/forcing-browsers-print-backgrounds/

export { routes as default}
