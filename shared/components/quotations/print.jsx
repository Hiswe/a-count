import React from 'react'
import { connect } from 'react-redux'

import { PaperSheet, Party, Reference, Mentions, Subject, Between } from '../layout/paper-sheet.jsx'
import ProductTable from '../products/table.jsx'
import ProductLine from '../products/line.jsx'

function PrintQuotation( props ) {
  const { quotation, user } = props
  return (
    <PaperSheet print>
      <Reference type="quotation" product={ quotation } />
      <Between>
        <Party title="from" {...user} />
        <Party title="to" {...quotation.customer} />
      </Between>
      <Subject value={quotation.name} />
      <ProductTable
        readOnly
        products={ quotation.products }
        tax={ quotation.tax }
        currency={ user.currency }
      >
        {quotation.products.map( (product, index) =>  (
          <ProductLine
            readOnly
            key={ index }
            product={ product }
            currency={ user.currency }
          />
        ))}
      </ProductTable>
      <Mentions content={ user.quotationConfig.mentions } />
    </PaperSheet>
  )
}

function state2prop( state ) {
  const { current } = state.quotations
  const result = {
    quotation:  current,
    user:       state.account.get( `current` ),
  }
  return result
}

export default connect( state2prop )( PrintQuotation )
