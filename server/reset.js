'use strict';

var db            = require('../db').db;

function get(req, res, next) {
  return res.render('reset');
}

function post(req, res, next) {
  db.view('general', 'all', getAllDone);

  function getAllDone(err, couchResp) {
    if (err) return next(err);
    var rows = couchResp.rows.map(function (row) {
      return row.value;
    });
    db.bulk({docs: rows}, deleteDone);
  }

  function deleteDone(err, couchResp) {
    if (err) return next(err);
    return res.status(302).redirect('/');
  }
}

module.exports = {
  get:  get,
  post: post,
};
