import   React                  from 'react'
import   PropTypes              from 'prop-types'
import { connect              } from 'react-redux'
import { FormattedHTMLMessage } from 'react-intl'

import * as Paper from '../layout/paper-sheet'
import { Alert } from './alerts'
import { ProductTable } from '../ui-table/products'

export function Preview( props ) {
  const { document, type } = props
  const products = document.get(`products`)
  if ( !document || !products ) return null

  return (
    <Paper.Sheet preview>
      <Paper.Reference type={ type } product={ document } />
      <Paper.Between>
        <Paper.PartyUser />
        <Paper.Party title="to" people={ document.get(`customer`) } />
      </Paper.Between>
      <Paper.Subject value={ document.get(`name`)} />
      <ProductTable
        readOnly
        document={ document }
      />
      <Paper.Mentions content={ document.get(`${type}Config.mentions`) } />
    </Paper.Sheet>
  )
}

Preview.propTypes = {
  document: PropTypes.object.isRequired,
  type    : PropTypes.oneOf([`quotation`, `invoice`]),
}

export function PrintingNotice( props ) {
  return (
    <Alert warning className="printing-notice">
      <FormattedHTMLMessage id="_.print-notice" />
    </Alert>
  )
}
