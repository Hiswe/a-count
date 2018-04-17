import   React                from 'react'
import { bindActionCreators } from 'redux'
import { connect            } from 'react-redux'
import { FormattedMessage   } from 'react-intl'
import { Helmet             } from 'react-helmet'

import      ConnectDataFetcher from '../connect-data-fetcher.js'
import * as quotations         from '../ducks/quotations'
import * as customers          from '../ducks/customers'
import      NavSecondary       from '../nav/secondary.jsx'
import {
  ButtonList,
  ButtonSubmit,
} from '../nav/secondary-buttons.jsx'
import   QuotationForm   from './form.jsx'
import { FORM_ID       } from './form.pres.jsx'

const TYPE = `quotations`

function NewQuotation( props ) {
  const titleProps = { id: `page.quotations.new` }

  return (
    <React.Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonSubmit
          formId={FORM_ID}
          isSaving={ props.isSaving }
          label="quotation.button.create"
        />
        <ButtonList
          type={ TYPE }
          label="quotation.button.list"
        />
      </NavSecondary>
      <QuotationForm {...props} />
    </React.Fragment>
  )
}

function state2prop( state ) {
  const { isSaving } = state.quotations
  return { isSaving }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: NewQuotation,
  actionCreators: [
    customers.getAll,
    quotations.getOne,
  ],
}) )
