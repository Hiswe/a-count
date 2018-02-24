import moment from 'moment'
import marked from 'marked'

// prevent error while passing unsupported marked data
const safeMarked = data => {
  if (typeof data !== 'string') return ''
  return marked(data)
}

function formatDate(data) {
  if (typeof data !== `string`) return ``
  const formatedDate = moment(data).format(`DD/MM/YY HH:mm:ss`)
  return formatedDate === `Invalid date` ? `` : formatedDate
}

// control if coming from no ID we update to ID
function needRedirect( currentState, nextState ) {
  const currentId = currentState.id
  const nextId = nextState.id
  const result = !currentId && nextId ? true
    : currentId === nextId
  return result
}

export {
  safeMarked,
  formatDate,
  needRedirect,
}
