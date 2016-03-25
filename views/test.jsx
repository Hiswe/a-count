import React from 'React';

import Layout   from './_layout.jsx'

// http://stackoverflow.com/questions/28725125/using-react-js-statics-inside-class-methods
// this.constructor.title
export const Home = React.createClass({
  statics: {
    title: 'home',
  },
  componentDidMount: function () {
    console.log('component Did Mount');
    return true;
  },
  render: function() {
    return (
      <p>Home page </p>
    );
  }
});
export const QuotationHome = React.createClass({
  render: function() {
    return (
      <p>Quotation Home</p>
    );
  }
});
export const QuotationForm = React.createClass({
  render: function() {
    return (
      <p>Quotation Form</p>
    );
  }
});
export const CustomerHome = React.createClass({
  render: function() {
    return (
      <p>Customer Home</p>
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
