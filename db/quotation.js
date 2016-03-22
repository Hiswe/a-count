import  {view, atomic}  from './index';
import  config          from '../server/config';

// can't just count if we want to delete a quotation…
function getNextIndex() {
  return view('quotation', 'byTime', {
    include_docs: false,
    reduce:       false,
    descending:   true,
    limit:        1
  }).then(function (body) {
    let rows  = body.rows;
    if (!rows.length) return Promise.resolve(0);
    return Promise.resolve(~~body.rows[0].value + 1 );
  })
  ;
};

function getByFakeId(id) {
  id        = /\d*$/.exec(id);
  let index = ~~id - config.quotation.startingAt;
  return view('quotation', 'byIndex', {
    key: index,
  })
    .then(function (body) {
      if (!body.length) {
        let err     = new Error('quotation not found');
        err.status  = 404;
        return Promise.reject(err);
      }
      return Promise.resolve(body[0]);
    });
}

function getAllActive() {
  return view('quotation', 'byTime', {descending: true})
}

export {
  getNextIndex,
  getByFakeId,
  getAllActive
};
