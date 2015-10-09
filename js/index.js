import $              from 'jquery';
import floatingLabel  from 'floating-label'

import products       from './products';


global.jQuery = $;
global.$      = $;

floatingLabel.init({
  floatingClassName: 'is-floating',
  delegateEvents: true,
});

products();
