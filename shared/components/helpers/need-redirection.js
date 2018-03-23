// control if coming from a no ID model instance…
// …we update to an instance with ID
export default function checkRedirection( currentState, nextState ) {
  const isLoading = currentState.isLoading || nextState.isLoading
  if ( isLoading ) return false

  // want to change route if:
  // • the previous doesn't have an ID (creation)
  // • the next one has (successful creation!)
  const isSavedCreation = !currentState.id && nextState.id
  const isDifferentId = currentState.id !== nextState.id
  return isSavedCreation ? true : isDifferentId
}
