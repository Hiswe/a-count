import React from 'react'

const EmptyLine = props => {
  const message = `none (yet)`
  if (props.colspan) {
    return (
      <tr>
        <td colSpan={props.colspan} style={{textAlign: `center`}}>{message}</td>
      </tr>
    )
  }
  return ( <p>{message}</p> )
}

export default EmptyLine
