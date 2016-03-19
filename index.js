'use strict';

require('babel-core/register')({
  presets: ['es2015', 'react'],
  // ignore:  ['./db/design-*.js'],
  ignore: function(filename) {
    if (/node_module/.test(filename)) return true;
    // console.log(filename, /design-/.test(filename));
    return /design-/.test(filename);
  },
});

require('./server.js');
