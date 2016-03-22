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
      emit(doc.time.created, 1);
    }
  },
  reduce: function(keys, values, rereduce) {
    return sum(values);
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
