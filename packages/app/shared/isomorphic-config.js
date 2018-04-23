// this is used as a fallback for test purpose
// • this prevent us to bundle the test files with webpack
const config = {
  API_URL:          `http://localhost:4040/v1`,
  API_COOKIE_NAME:  `test_api`,
  HOST_URL:         `http://localhost:3000`,
  APP_NAME:         `test-app`,
}
export default config
