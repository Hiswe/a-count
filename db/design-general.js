'use strict';

// (PR|FA)AAMM-XXXX

var views   = {};
var updates = {};
var lists   = {};

//////
// VIEWS
//////

views.deleteAll = {
  map: function(doc) {
    if (doc.type === 'quotation' || doc.type === 'customer' || doc.type === 'invoice') {
      emit(doc._id, {
        _id: doc._id,
        _rev: doc._rev,
        _deleted: true
      });
    }
  },
};

views.getAll = {
  map: function(doc) {
    if (doc.type === 'quotation' || doc.type === 'customer' || doc.type === 'invoice') {
      emit(doc._id, doc);
    }
  },
};

//////
// LISTS
//////

// http://guide.couchdb.org/draft/transforming.html

// inside CouchDb for debug use log function:
//    log(…);
// http://couchdb.readthedocs.org/en/latest/query-server/javascript.html#log
lists.getState = function (head, req) {
  var result = {
    quotations: [],
    customers: [],
    invoices: []
  };
  while(row = getRow()){
    // var type = row.value.type;
    // if (type === 'quotation' || type === 'invoice') {
    //   row.value.index = row.value.index[type];
    // }
    delete row.value._rev
    result[row.value.type + 's'].push(row.value);
  }
  // http://couchdb.readthedocs.org/en/latest/query-server/javascript.html#getRow
  send(toJSON(result));
}

//////
// UPDATES
//////

//////
// EXPORTS
//////

module.exports = {
  _id:      '_design/general',
  updates:  updates,
  views:    views,
  // beware of the final S of listS
  lists:    lists,
};
