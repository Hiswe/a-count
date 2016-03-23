'use strict';

require('babel-core/register')({
  presets: ['es2015', 'react'],
  ignore: function(filename) {
    if (/node_module/.test(filename)) return true;
    return /design-/.test(filename);
  },
});

require('./server.js');
