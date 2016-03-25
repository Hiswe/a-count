import React from 'React';

import Layout   from './_layout.jsx'

// http://stackoverflow.com/questions/28725125/using-react-js-statics-inside-class-methods
export const QuotationForm = React.createClass({
  render: function() {
    return (
      <p>Quotation Form</p>
    );
  }
});
export const Customer = React.createClass({
  render: function() {
    return (
      <p>Customer Blank Form</p>
    );
  }
});
export const CustomerForm = React.createClass({
  render: function() {
    return (
      <p>Customer Form</p>
    );
  }
});
export const Test = React.createClass({
  render: function() {
    return (
      <p>this is a test </p>
    );
  }
});

export {Test as default};
