import React from 'react'

const Table = props => {
  const columns = props.columns.split(`,`)
  return (
    <table className={`table ${props.className}`} cellSpacing="0">
      <thead>
        <tr>
          { columns.map( (c, i) => (<th key={i}>{c.trim()}</th>) ) }
        </tr>
      </thead>
      <tbody>
        { props.children }
      </tbody>
      {/* TODO: add a possibility to add a tfoot */}
    </table>
  )
}

export default Table
