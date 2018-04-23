import { enforceNumber } from './compute-total'

export function getInputValue( target ) {
  const { name, checked, type } = target
  const value = type === `checkbox` ? checked
    : type === `number` ? enforceNumber( target.value )
    : target.value

  return {
    name,
    value,
  }
}
