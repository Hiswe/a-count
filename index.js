'use strict';

require('babel-core/register')({
  presets: ['es2015', 'react'],
  ignore: function(filename) {
    if (/node_module/.test(filename)) return true;
    return /design-/.test(filename);
  },
});

var app = require('./server.js').default;

var server = app.listen(3000, function endInit() {
  console.log('Server is listening on port ', server.address().port);
});
