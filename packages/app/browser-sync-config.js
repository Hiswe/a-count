module.exports = {
  proxy       : `http://localhost:3000`,
  open        : false,
  port        : 7000,
  ghostMode   : false,
  reloadDelay : 1000,
  files:      [
    `server/public/application-client.css`,
    `server/public/application-client*.js`,
  ],
}
