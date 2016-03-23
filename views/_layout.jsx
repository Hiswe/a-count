import React        from 'React';

var Layout = React.createClass({
  render: function() {
    return (
      <div id="react-wrapper">
        <header className="main-header">
          <ul>
            <li><a href="/">home</a></li>
            <li><a href="/quotations">quotations</a></li>
            <li><a href="/invoices">invoices</a></li>
            <li><a href="/customers">customers</a></li>
            <li><a href="/reset">config</a></li>
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
