'use strict'

const normalizeString = string => {
  string = `${string}`
  return string.trim().toLowerCase()
}

export {
  normalizeString,
}
