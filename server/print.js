'use strict';

import * as Quotation from '../db/quotation'
import * as Customer  from '../db/customer'

function get(req, res, next) {
  let doc;
  Quotation
    .getByFakeId(req.params.fakeId)
    .then(function (body) {
      doc = body;
      return Customer.getByName(body.customer);
    })
    .then(function (customer) {
      res.render('print', {doc, customer: customer[0]});
    })
    .catch(next)
}

export { get };
