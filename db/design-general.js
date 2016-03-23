'use strict';

// (PR|FA)AAMM-XXXX

var views   = {};
var updates = {};

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
};
