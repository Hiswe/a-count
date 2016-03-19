var React           = require('react');
var ReactDOMServer  = require('react-dom/server');

//----- REACT

function render(ReactComponent, data = {}) {
  let ReactElement = React.createFactory(ReactComponent);
  return ReactDOMServer.renderToString(ReactElement(data));
}

export {render};
