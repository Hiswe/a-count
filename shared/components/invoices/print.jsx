import React from 'react'
import { connect } from 'react-redux'

import { PaperSheet, Party, Reference, Mentions, Subject, Between } from '../layout/paper-sheet.jsx'
import { ProductTable, ProductLine } from '../ui/table-product.jsx'

function PrintInvoice( props ) {
  const { invoice, user } = props
  const currency = user.get(`currency`)
  return (
    <PaperSheet>
      <Reference type="invoice" product={ invoice } />
      <Between>
        <Party title="from" {...user} />
        <Party title="to" {...invoice.customer} />
      </Between>
      <Subject value={ invoice.get(`name`) } />
      <ProductTable readOnly
        products={ invoice.get(`products`) }
        tax={ invoice.get(`tax`) }
        currency={ currency }
      >
        {invoice.get(`products`).map( (product, index) =>  (
          <ProductLine
            readOnly
            key={ index }
            product={ product }
            currency={ currency }
          />
        ))}
      </ProductTable>
      <Mentions content={ invoice.get(`invoiceConfig.mentions`) } />
    </PaperSheet>
  )
}

function state2prop( state ) {
  return {
    invoice: state.invoices.get( `current` ),
    user   : state.account .get( `current` ),
  }
}

export default connect( state2prop )( PrintInvoice )
