import React from 'react'
import { connect } from 'react-redux'

import { PaperSheet, Party, Reference, Between, Subject, Mentions } from '../layout/paper-sheet.jsx'
import { ProductTable, ProductLine } from '../ui/table-product.jsx'

function PrintQuotation( props ) {
  const { quotation, user } = props
  return (
    <PaperSheet print>
      <Reference type="quotation" product={ quotation } />
      <Between>
        <Party title="from" {...user} />
        <Party title="to" {...quotation.customer} />
      </Between>
      <Subject value={quotation.get(`name`)} />
      <ProductTable
        readOnly
        products={ quotation.get(`products`) }
        tax={ quotation.get(`tax`) }
        currency={ user.get(`currency`) }
      >
        {quotation.get(`products`).map( (product, index) =>  (
          <ProductLine
            readOnly
            key={ index }
            product={ product }
            currency={ user.get(`currency`) }
          />
        ))}
      </ProductTable>
      <Mentions content={ user.get(`quotationConfig.mentions`) } />
    </PaperSheet>
  )
}

function state2prop( state ) {
  const result = {
    quotation:  state.quotations.get(`current`),
    user:       state.account.get( `current` ),
  }
  return result
}

export default connect( state2prop )( PrintQuotation )
