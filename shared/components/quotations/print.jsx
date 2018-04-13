import React from 'react'
import { connect } from 'react-redux'

import { PaperSheet, Party, PartyUser, Reference, Between, Subject, Mentions } from '../layout/paper-sheet.jsx'
import { ProductTable, ProductLineDisplay } from '../ui/table-product.jsx'

function PrintQuotation( props ) {
  const { quotation } = props
  return (
    <PaperSheet print>
      <Reference type="quotation" product={ quotation } />
      <Between>
        <PartyUser />
        <Party title="to" people={ quotation.customer } />
      </Between>
      <Subject value={quotation.get(`name`)} />
      <ProductTable
        readOnly
        products={ quotation.get(`products`) }
        tax={ quotation.get(`tax`) }
      >
        {quotation.get(`products`).map( (product, index) =>  (
          <ProductLineDisplay
            key={ index }
            product={ product }
          />
        ))}
      </ProductTable>
      <Mentions content={ quotation.get(`quotationConfig.mentions`) } />
    </PaperSheet>
  )
}

function state2prop( state ) {
  const result = {
    quotation:  state.quotations.get(`current`),
  }
  return result
}

export default connect( state2prop )( PrintQuotation )
