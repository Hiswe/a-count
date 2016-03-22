import * as Invoice from '../db/invoice';
import * as businessForm from '../db/business-form';

function get(req, res, next) {
  businessForm
    .getByFakeId(req.params.fakeId, 'invoice')
    .then(function (couchResp) {
      console.log(couchResp);
    })

  return res.redirect('/');
}

export { get };
