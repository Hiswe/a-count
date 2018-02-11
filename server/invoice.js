// import * as Invoice       from '../db/invoice';
// import * as businessForm  from '../db/business-form';
// views
import InvoiceForm            from '../views/invoice-form.jsx';

function get(req, res, next) {
  // businessForm
  //   .getByFakeId(req.params.fakeId, 'invoice')
  //   .then(function (invoice) {
  //     res.render('_layout', {
  //       dom: render(InvoiceForm, {invoice}),
  //     });
  //   })
  //   .catch(next);

  res.render('_layout', {
    dom: render(InvoiceForm, {invoice: {}}),
  });
}

export { get };
