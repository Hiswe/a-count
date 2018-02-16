import  {view, atomic}  from './index';
import {createBlank}    from '../shared/blank-business-form'
import * as compute     from '../shared/compute'
import  config          from '../shared/config';
const { defaultProduct,  tax} = config

////////
// UTILS
////////

let badType     = new Error('type unknow');
badType.status  = 500;
badType         = Promise.reject(badType);
function chekType(type) {
  return ['quotation', 'invoice'].indexOf(type) !== -1;
};

////////
// METHODS
////////

function getNextIndex(type) {
  if (!chekType(type)) return badType;
  return view(type, 'byTime', {
    include_docs: false,
    reduce:       false,
    descending:   true,
    limit:        1
  }).then(function (body) {
    let rows  = body.rows;
    if (!rows.length) return Promise.resolve(0);
    return Promise.resolve(~~body.rows[0].value + 1 );
  });
};

function getByFakeId(id, type) {
  if (!chekType(type)) return badType;
  id        = /\d*$/.exec(id);
  let index = ~~id - config[type].startingAt;
  return view(type, 'byIndex', {
    key: index,
  })
    .then(function (body) {
      if (!body.length) {
        let err     = new Error(`${type} not found`);
        err.status  = 404;
        return Promise.reject(err);
      }
      return Promise.resolve(body[0]);
    });
}

function getEmptyQuotation(index) {
  return getNextIndex('quotation')
    .then(function(index) {
      let net             = compute.linePrice(defaultProduct);
      let base            = createBlank(index);
      let emptyQuotation  = Object.assign(base, {
        tax,
        price: {
          net,
          taxes: compute.taxedPrice(net, tax),
          total: net + compute.taxedPrice(net, tax),
        },
        products: [ defaultProduct ]
      });
      return Promise.resolve(emptyQuotation);
    })
}

export {
  getNextIndex,
  getByFakeId,
  getEmptyQuotation,
}
