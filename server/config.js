'use strict';

var rc            = require('rc');
var defaultConfig = require('../shared/default-config');

let config        = rc('concompte', defaultConfig);
const PORT        = config.PORT || process.env.PORT || 3000;
config.PORT       = PORT

export {config as default, PORT };
