module.exports = {
  _id: '_design/general',
  updates: {
    quotation: function (doc,req) {
      var body = JSON.parse(req.body);
      if (!doc) {
        var doc = {
          _id:    req.uuid,
          type:   'quotation',
          time:   {
            created: new Date()
          }
        };
      }

      doc.time.lastUpdate = new Date();
      doc.title       = body.title || doc.title || 'New quotation at ' + new Date().toString();
      doc.customer    = body.customer || doc.customer || 'unknown customer!!';
      return[doc,toJSON(doc)];
    }
  },
  views: {
    quotation: {
      map: function(doc) {
        if (doc.type === 'quotation') {
          emit(doc.title, 1);
        }
      },
    },
  },
};
