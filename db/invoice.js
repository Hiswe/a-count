import  {view, atomic} from './index';

// can't just count if we want to delete a quotation…
function getNextId() {
  return view('invoice', 'byTime', {
    include_docs: false,
    reduce:       false,
    descending:   true,
    limit:        1
  }).then(function (body) {
    console.log(body);
    let rows  = body.rows;
    if (!rows.length) return Promise.resolve(0);
    return Promise.resolve(~~/\d*$/.exec(body.rows[0].id)[0] + 1);
  })
  ;
};

export { getNextId };
