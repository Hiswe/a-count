import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { FormattedMessage   } from 'react-intl'

import * as invoices       from '../ducks/invoices'
import { Button, BtnIcon } from '../ui/buttons'

//----- SHOW QUOTATION

function ButtonShowQuotation( props ) {
  const { quotationId, isSaving } = props
  if ( !quotationId ) return null
  return (
    <Button secondary
      to={`/quotations/${ quotationId }/preview` }
      disabled={ isSaving }
    >
      <FormattedMessage id="invoices.button.quotation" />
    </Button>
  )
}

export const ShowQuotation = connect(
  state => ({
    quotationId: state.invoices.get( `current.quotation.id` ),
    isSaving   : state.invoices.get( `isSaving` ),
  })
)( ButtonShowQuotation )

//----- ARCHIVE

function ButtonArchiveInvoice( props ) {
  const { invoice, archiveOne, isSaving, icon, ...others } = props
  if ( !invoice ) return null

  const archivedAt = invoice.get( `archivedAt` )
  if ( archivedAt ) return null

  const id       = invoice.get( `id` )
  const btnProps = {
    onClick: event => {
      event.preventDefault()
      archiveOne({id})
    },
    type      : `submit`                   ,
    formMethod: `post`                     ,
    formAction: `/invoices/${ id }/archive`,
    disabled  : isSaving                   ,
    ...others
  }
  if ( icon ) return <BtnIcon svgId="archive" {...btnProps }/>

  return (
    <Button {...btnProps } >
      <FormattedMessage id="invoices.button.archive" />
    </Button>
  )
}

export const ArchiveInvoice = connect(
  state => ({
    isSaving: state.invoices.get( `isSaving` ),
  }),
  dispatch => bindActionCreators({
    archiveOne: invoices.archiveOne,
  }, dispatch),
)( ButtonArchiveInvoice )
