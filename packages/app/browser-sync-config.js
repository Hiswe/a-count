module.exports = {
  proxy       : `https://localhost:3443`,
  https       : true,
  open        : false,
  port        : 7000,
  ghostMode   : false,
  reloadDelay : 1000,
  files:      [
    `server/public/application-client.css`,
    `server/public/application-client*.js`,
  ],
}
