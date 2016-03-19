import React from 'React';

import TestBox from './test.jsx'

var TestWrapper = React.createClass({
  render: function() {
     return (
      <div className="test wrapper">
        <TestBox />
        <TestBox />
      </div>
    );
  }
});

export {TestWrapper as default};
