'use strict';

// (PR|FA)AAMM-XXXX

var views   = {};
var updates = {};

//////
// VIEWS
//////

// take converted time as a basis
views.byTime =  {
  map: function(doc) {
    if (doc.type === 'invoice') {
      emit(doc.time.converted, doc.index.invoice);
    }
  }
};

views.byIndex =  {
  map: function(doc) {
    if (doc.type === 'invoice') {
      emit(~~doc.index.invoice, doc._id);
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
