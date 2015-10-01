module.exports = {
  _id: '_design/general',
  updates: {
    invoice: function (doc,req) {
      var body = JSON.parse(req.body);
      if (!doc) {
        var doc = {
          _id:    req.uuid,
          type:   'invoice',
          time:   {
            created: new Date()
          }
        };
      }

      doc.time.lastUpdate = new Date();
      doc.title       = body.title || doc.title || 'New Invoice from ' + new Date().toString();
      doc.customer    = body.customer || doc.customer || 'unknown customer!!';
      return[doc,toJSON(doc)];
    }
  },
  views: {
    invoice: {
      map: function(doc) {
        if (doc.type === 'invoice') {
          emit(doc.title, 1);
        }
      },
    },
  },
};
