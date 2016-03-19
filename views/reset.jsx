import React from 'React';

var Reset = React.createClass({
  render: function() {
    return (
      <section>
        <h1>Reset</h1>
        <form method="post" action="/reset">
          <button className="btn" type="submit">yes sure</button>
        </form>
      </section>
    );
  }
});

export {Reset as default};
