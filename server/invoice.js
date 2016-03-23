import * as Invoice       from '../db/invoice';
import * as businessForm  from '../db/business-form';
// views
import {render}               from './_react';
import InvoiceForm            from '../views/invoice-form.jsx';

function get(req, res, next) {
  console.log('invoice get', req.params.fakeId);

  businessForm
    .getByFakeId(req.params.fakeId, 'invoice')
    .then(function (invoice) {
      res.render('_react-layout', {
        dom: render(InvoiceForm, {invoice}),
      });
    })
    .catch(next);
}

export { get };
