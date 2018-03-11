import React from 'react'

import Table from '../ui/table.jsx'

const ProductTable = props => {
  return (
    <Table columns="description, quantity, unit price, total, ">
      { props.children }
    </Table>
  )
}

export default ProductTable
