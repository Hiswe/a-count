import React from 'react';

var Empty = React.createClass({
  render: function () {
    return (
      <p>none (yet)</p>
    );
  }
});

var Amount         = React.createClass({
  render: function () {
    return (
      <p className="amount">
        {'€\u00A0'} <span>{this.props.value}</span>
      </p>
    );
  }
});

export {Empty, Amount};
