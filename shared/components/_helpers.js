import moment from 'moment'

export function formatDate( data, format = `DD/MM/YY HH:mm:ss` ) {
  if (typeof data !== `string`) return ``
  const formatedDate = moment(data).format( format )
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
