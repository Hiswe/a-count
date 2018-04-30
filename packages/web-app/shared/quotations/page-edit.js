import   React              from 'react'
import { connect          } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet           } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher'
import * as quotations         from '../ducks/quotations'
import * as customers          from '../ducks/customers'
import      NavSecondary       from '../nav/secondary'
import {
  ButtonNew,
  ButtonList,
  ButtonPreview,
  ButtonSubmit,
} from '../nav/secondary-buttons'
import   QuotationForm            from './form'
import { FORM_ID                } from './form.pres'
import { CreateInvoice, ShowInvoice, ArchiveQuotation } from './buttons'

const TYPE = `quotations`

function EditQuotation( props ) {
  const { quotation, ...rest } = props
  const { id }      = props.match.params
  const reference   = quotation.get(`reference`)
  const titleProps  = { id:`page.quotations.edit`, values: {reference} }

  return (
    <React.Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonSubmit
          formId   = { FORM_ID }
          isSaving = { props.isSaving }
          label="_.save"
        />
        <ShowInvoice
          withMessage
          quotation={ quotation }
        />
        <ArchiveQuotation
          icon danger
          quotation={ quotation }
          form={ FORM_ID }
          label="quotation.button.archive"
        />
        <CreateInvoice
          quotation={ quotation }
          form={ FORM_ID }
        />
        <ButtonPreview
          type={ TYPE }
          id={ id }
          label="quotation.button.preview"
        />
        <ButtonList
          type={ TYPE }
          label="quotation.button.list"
        />
        <ButtonNew
          type={ TYPE }
          secondary
          icon
          label="quotation.button.new"
        />
      </NavSecondary>
      <QuotationForm {...rest} />
    </React.Fragment>
  )
}

function state2prop( state ) {
  return {
    quotation: state.quotations.get( `current` ),
    isSaving : state.quotations.get( `isSaving` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: EditQuotation,
  actionCreators: [
    quotations.getOne,
    customers.getAll,
  ],
}) )
