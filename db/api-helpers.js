export const VERSION = `1.0.0`
export const NAME    = `concompte API`

export const formatResponse = (payload = {}) => ({
  version:  VERSION,
  name:     NAME,
  payload,
})
