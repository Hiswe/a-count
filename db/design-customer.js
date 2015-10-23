'use strict';

// (PR|FA)AAMM-XXXX

var views   = {};
var updates = {};

//////
// VIEWS
//////

views.byName = {
  map: function(doc) {
    if (doc.type === 'customer') {
      emit(doc.name, 1);
    }
  },
};

//////
// UPDATES
//////

updates.create = function (doc, req) {
  var body = JSON.parse(req.body);
  if (!doc) {
    var doc = {
      type: 'customer',
      time: {
        created: new Date()
      }
    };
  }
  doc._id     = doc._id || body.id;
  doc.name    = body.name || doc.name;
  doc.address = body.address || doc.address || '';

  return [doc, toJSON(doc)];
}

//////
// EXPORTS
//////

module.exports = {
  _id:      '_design/customer',
  updates:  updates,
  views:    views,
};
