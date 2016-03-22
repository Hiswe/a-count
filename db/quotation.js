import  {view, atomic}  from './index';
import  config          from '../server/config';

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
  getByFakeId,
  getAllActive
};
