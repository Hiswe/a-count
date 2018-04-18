import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher.js'
import * as invoices           from '../ducks/invoices'
import      NavSecondary       from '../nav/secondary.jsx'
import {
  ButtonList,
  ButtonPreview,
  ButtonSubmit,
} from '../nav/secondary-buttons.jsx'
import InvoiceForm        , { FORM_ID } from './form.jsx'
import { ShowQuotation, ArchiveInvoice } from './buttons.jsx'

const TYPE = `invoices`

function EditInvoice( props ) {
  const { id        } = props.match.params
  const { invoice   } = props
  const   reference   = invoice.get( `reference` )
  const titleProps  = { id:`page.invoices.edit`, values: {reference} }

  return (
    <React.Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonSubmit
          formId={ FORM_ID }
          isSaving={ props.isSaving }
          label="_.save"
        />
        <ArchiveInvoice
          icon danger
          form={ FORM_ID }
          invoice={ invoice }
          label="invoices.button.archive"
        />
        <ShowQuotation />
        <ButtonPreview
          type={ TYPE }
          id={ id }
          label="invoices.button.preview"
        />
        <ButtonList
          type={ TYPE }
          label="invoices.button.list"
        />
      </NavSecondary>
      <InvoiceForm />
    </React.Fragment>
  )
}

function state2prop( state ) {
  return {
    invoice : state.invoices.get( `current`  ),
    isSaving: state.invoices.get( `isSaving` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: EditInvoice,
  actionCreators: [
    invoices.getOne,
  ],
}) )
