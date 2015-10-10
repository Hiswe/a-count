import $              from 'jquery';
// import floatingLabel  from 'floating-label'

import products       from './products.js';
import floatingLabel  from './floating-label.js';

global.jQuery = $;
global.$      = $;

// floatingLabel.init({
//   floatingClassName: 'is-floating',
//   delegateEvents: true,
// });

products();
floatingLabel();
