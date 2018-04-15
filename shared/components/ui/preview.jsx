import React from 'react'
import { connect } from 'react-redux'

import {
  PaperSheet,
  Party,
  PartyUser,
  Reference,
  Between,
  Subject,
  Mentions,
} from '../layout/paper-sheet.jsx'
import { ProductTable, ProductLineDisplay } from '../ui/table-product.jsx'

export function Preview( props ) {
  const { document, type } = props

  return (
    <PaperSheet preview>
      <Reference type={ type } product={ document } />
      <Between>
        <PartyUser />
        <Party title="to" people={ document.get(`customer`) } />
      </Between>
      <Subject value={ document.get(`name`)} />
      <ProductTable
        readOnly
        products={ document.get(`products`) }
        tax={ document.get(`tax`) }
      >
        {document.get(`products`).map( (product, index) =>  (
          <ProductLineDisplay
            key={ index }
            product={ product }
          />
        ))}
      </ProductTable>
      <Mentions content={ document.get(`${type}Config.mentions`) } />
    </PaperSheet>
  )
}
