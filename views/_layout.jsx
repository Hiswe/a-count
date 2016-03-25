import React        from 'React';
import { Link }     from 'react-router';

var Layout = React.createClass({
  render: function() {
    // should use Link WITHOUT href when there is a react-router
    // https://github.com/reactjs/react-router/blob/master/modules/Link.js#L106
    // <li><Link to="/">home</Link></li>
    // <li><Link to="/" href="/">home</Link></li>
    return (
      <div id="react-wrapper">
        <header className="main-header">
          <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/quotations">quotations</Link></li>
            <li><Link to="/invoices">invoices</Link></li>
            <li><Link to="/customers">customers</Link></li>
            <li><Link to="/settings">settings</Link></li>
          </ul>
        </header>
        <main role="main">
          {this.props.children}
        </main>
      </div>
    );
  }
});

export {Layout as default};
