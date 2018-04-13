import React from 'react'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as quotations from '../../ducks/quotations'
import { Button, BtnIcon } from '../ui/buttons.jsx'
import { FORM_ID } from './form.pres.jsx'

function ButtonArchiveQuotation( props ) {
  const { id, archiveOne, isAvailable, isSaving, icon } = props
  if ( !isAvailable ) return null
  const btnProps = {
    danger: true,
    onClick: event => {
      event.preventDefault()
      archiveOne({params: {id}})
    },
    type: `submit`,
    form: FORM_ID,
    formMethod: `post`,
    formAction: `/quotations/${ id }/archive`,
    disabled: isSaving,
  }

  if ( icon ) return <BtnIcon svgId="archive" {...btnProps }/>

  return (
    <Button {...btnProps } >
      <FormattedMessage id="quotation.button.archive" />
    </Button>
  )
}

function state2prop( state ) {
  return {
    id          : state.quotations.get( `current.id` ),
    isAvailable : state.quotations.get( `current._canBeArchived` ),
    isSaving    : state.quotations.get( `isSaving` ),
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
      archiveOne: quotations.archiveOne
    }, dispatch)
}

export default connect( state2prop, dispatch2prop )( ButtonArchiveQuotation )
