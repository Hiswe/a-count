import React from 'react'
import PropTypes from 'prop-types'
import { FormattedHTMLMessage } from 'react-intl'

import * as Paper from '../layout/paper-sheet'
import { Alert } from './alerts'
import { ProductTable } from '../ui-table/products'

export const BASE_CLASS = Paper.BASE_CLASS

export function Preview(props) {
  const { document, type, className } = props
  const products = document.get(`products`)
  if (!document || !products) return null
  const mentions =
    document.get(`mentions`) || document.get(`${type}Config.mentions`)

  return (
    <Paper.Sheet preview className={className}>
      <Paper.Reference type={type} product={document} />
      <Paper.Between>
        <Paper.PartyUser />
        <Paper.Party title="to" people={document.get(`customer`)} />
      </Paper.Between>
      <Paper.Subject value={document.get(`name`)} />
      <ProductTable readOnly document={document} />
      <Paper.Mentions type={type} content={mentions} />
    </Paper.Sheet>
  )
}

Preview.propTypes = {
  document: PropTypes.object.isRequired,
  type: PropTypes.oneOf([`quotation`, `invoice`]),
}

export function PrintingNotice() {
  return (
    <Alert warning className="printing-notice">
      <FormattedHTMLMessage id="_.print-notice" />
    </Alert>
  )
}
