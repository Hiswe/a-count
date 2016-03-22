'use strict';

// (PR|FA)AAMM-XXXX

var views   = {};
var updates = {};

//////
// VIEWS
//////

views.byTime =  {
  map: function(doc) {
    if (doc.type === 'invoice') {
      emit(doc.time.converted, doc.index.invoice);
    }
  },
  reduce: function(keys, values, rereduce) {
    return sum(values);
  },
};

views.byIndex =  {
  map: function(doc) {
    if (doc.type === 'invoice') {
      emit(~~doc.index.quotation, doc._id);
    }
  },
};

//////
// UPDATES
//////


//////
// EXPORTS
//////

module.exports = {
  _id:      '_design/invoice',
  updates:  updates,
  views:    views,
};
