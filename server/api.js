import express from 'express';

import * as Quotation from '../db/quotation'
import * as Invoice   from '../db/invoice'

const api = express();

const apiRouting = {
  'GET /home': function () {
    return Promise
      .all([Quotation.getAllActive(), Invoice.getAllActive()])
        .then(function (results) {
          let [quotations, invoices] = results;
          return Promise.resolve({quotations, invoices});
        });
  },
  'GET /quotations': function () {
    return Quotation.getAllActive();
  },
  'GET /invoices': function () {
    return Invoice.getAllActive();
  },
  'GET /larve': function () {
    return Promise.reject(new Error('error test'));
  },
  'GET /:pouic?': function (params) {
    return Promise.resolve({
      pouic: params.pouic,
    })
  },
}

let bootApi = {};

Object.keys(apiRouting).forEach(function (key) {
  let [method, path]  = key.split(' ');
  method              = method.toLowerCase();
  let handler         = apiRouting[key];
  if (method === 'get') bootApi[`/api${path}`] = handler;
  console.log(method, path);

  api[method](path, function (req, res, next) {
    console.log(req.route.path);
    handler(req.params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  });
});

api.use(function (req, res, next) {
  res.sendStatus(404);
});

export {api as default, bootApi}
