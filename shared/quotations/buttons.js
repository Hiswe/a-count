import   React                from 'react'
import { connect            } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage   } from 'react-intl'

import * as quotations            from '../ducks/quotations'
import {    Button    , BtnIcon } from '../ui/buttons'

//----- SHOW INVOICE

function ButtonShowInvoice( props ) {
  const {
    quotation,
    isSaving,
    withMessage,
    dispatch,
    ...rest
  } = props
  if ( !quotation ) return null

  const invoiceId = quotation.get(`invoiceId`)
  if ( !invoiceId ) return null
  const isInvoiceArchived = quotation.get(`invoice.archivedAt`)

  return (
    <Button secondary
      to={`/invoices/${ invoiceId }${isInvoiceArchived ? `/preview` : `` }` }
      disabled={ isSaving }
      {...rest}
    >
      {
        withMessage ? <FormattedMessage id="quotation.invoice.show" />
          : quotation.get(`invoice.reference`)
      }
    </Button>
  )
}

export const ShowInvoice = connect(
  state => ({
    isSaving : state.quotations.get( `isSaving` ),
  })
)( ButtonShowInvoice )

//----- CREATE INVOICE

function ButtonCreateInvoice( props ) {
  const { quotation, createInvoice, isSaving, ...others } = props
  if ( !quotation ) return null
  const id          = quotation.get(`id`         )
  const isAvailable = quotation.get(`_canCreateInvoice`)
  if ( !isAvailable ) return null

  const btnProps = {
    onClick: event => {
      event.preventDefault()
      createInvoice({ id })
    },
    type      : `submit`                     ,
    formMethod: `post`                       ,
    formAction: `/quotations/${ id }/create-invoice`,
    disabled  : isSaving                     ,
    ...others
  }
  return (
    <Button secondary
      {...btnProps}
    >
      <FormattedMessage id="quotation.invoice.create" />
    </Button>
  )
}

export const CreateInvoice = connect(
  state => ({
    isSaving : state.quotations.get( `isSaving` ),
  }),
  dispatch => bindActionCreators({
    createInvoice: quotations.createInvoice
  }, dispatch),
)( ButtonCreateInvoice )

//----- ARCHIVE

function ButtonArchiveQuotation( props ) {
  const { quotation, archiveOne, isSaving, icon, ...others } = props
  if ( !quotation ) return null

  const id          = quotation.get(`id`         )
  const isAvailable = quotation.get(`_canBeArchived`)
  if ( !isAvailable ) return null

  const btnProps = {
    onClick: event => {
      event.preventDefault()
      archiveOne({id})
    },
    type      : `submit`                     ,
    formMethod: `post`                       ,
    formAction: `/quotations/${ id }/archive`,
    disabled  : isSaving                     ,
    ...others
  }
  if ( icon ) return <BtnIcon svgId="archive" {...btnProps }/>

  return (
    <Button {...btnProps } >
      <FormattedMessage id="quotation.button.archive" />
    </Button>
  )
}

export const ArchiveQuotation = connect(
  state => ({
    isSaving: state.quotations.get( `isSaving` ),
  }),
  dispatch => bindActionCreators({
    archiveOne: quotations.archiveOne
  }, dispatch),
)( ButtonArchiveQuotation )
