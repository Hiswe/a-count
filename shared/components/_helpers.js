import moment from 'moment'
import marked from 'marked'

// prevent error while passing unsupported marked data
export function safeMarked( data ) {
  if (typeof data !== 'string') return ''
  return marked( data, { breaks: true })
}

export const formatDate = data => {
  if (typeof data !== `string`) return ``
  const formatedDate = moment(data).format(`DD/MM/YY HH:mm:ss`)
  return formatedDate === `Invalid date` ? `` : formatedDate
}

// control if coming from a no ID model instance…
// …we update to an instance with ID
export const needRedirect = ( currentState, nextState )  => {
  const currentId = currentState.id
  const nextId = nextState.id
  const result = !currentId && nextId ? true
    : currentId !== nextId
  return result
}
