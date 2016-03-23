import React from 'React';

import Layout   from './_layout.jsx'

var Reset = React.createClass({
  render: function() {
    return (
      <Layout>
        <h1>Reset</h1>
        <form method="post" action="/reset">
          <button className="btn" type="submit">yes sure</button>
        </form>
      </Layout>
    );
  }
});

export {Reset as default};
