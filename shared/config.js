// isomorphic config
// • to keep it only server side but accessible from client
// • based on (here again)
//   https://reactjsnews.com/isomorphic-react-in-real-life#isomorphic-configuration

if ( process.env.BROWSER ) {
  module.exports = window.__CONFIG__
} else {
  module.exports = require('../server/config.js')
}
