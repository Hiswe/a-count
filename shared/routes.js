import Layout from './components/_layout.jsx'
import Home from './components/home.jsx'
import CustomerHome from './components/customer-home.jsx'
import CustomerForm from './components/customer-form.jsx'
import NotFound from './components/not-found.jsx'

const routes = [{
  component: Layout,
  routes: [{
    path: `/`,
    exact: true,
    component: Home,
  }, {
    path: `/customers`,
    exact: true,
    component: CustomerHome,
  }, {
    path: `/customers/new`,
    exact: true,
    component: CustomerForm,
  }, {
    path: `*`,
    component: NotFound,
  }],
}]

export { routes as default}
