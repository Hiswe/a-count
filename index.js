'use strict';

require('babel-core/register')({
  presets: ['es2015', 'react'],
  ignore: function(filename) {
    if (/node_module/.test(filename)) return true;
    return /design-/.test(filename);
  },
});

var config  = require('./server/config');
var app     = require('./server.js').default;

var server = app.listen(config.PORT, function endInit() {
  console.log('Server is listening on port', server.address().port);
});
