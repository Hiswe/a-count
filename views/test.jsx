// var React = require('React');
import React from 'React';

var TestBox = React.createClass({
  // displayName: 'TestBox',
  render: function() {
     return (
      <div className="commentList">
        Hello, world! I am a Test box.
      </div>
    );
  }
});

export {TestBox as default};
// export {init as default};
// module.exports = TestBox;
