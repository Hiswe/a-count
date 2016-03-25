import React              from 'react';
import {
  Router, Route,
  IndexRoute, Redirect }  from 'react-router';

import * as test from '../views/test.jsx';
import Layout      from '../views/_layout.jsx';
import Home      from '../views/home.jsx';
import Settings  from '../views/settings.jsx';
// import QuotationList  from '../views/quotation-list.jsx';
// import InvoiceList    from '../views/invoice-list.jsx';


// app.get('/quotations', quotation.get);

// app.get('/quotation/:fakeId?',                    quotation.editOrCreate);

// app.get('/invoices', function (req, res, next) {
//   res.redirect('/');
// });
// app.get('/invoice/:fakeId',                       invoice.get);

// app.get('/customers',               customer.get);
// app.get('/customer/:customerId',    customer.edit);
// app.get('/customer',                customer.create);
// NTH: layout should be define in <Route path="/">

// <Route path="invoices" component={test.Test}>
//    <Redirect from="invoices" to="/" />
// </Route>
export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="quotations" component={test.QuotationHome} />
    <Route path="quotation(/:fakeId)" component={test.QuotationForm} />
    <Redirect from="invoices" to="/" />
    <Route path="customers" component={test.CustomerHome} />
    <Route path="customer">
      <IndexRoute component={test.Customer}/>
      <Route path=":customerId" component={test.CustomerForm} />
    </Route>

    <Route path="settings" component={Settings} />

  </Route>
);
