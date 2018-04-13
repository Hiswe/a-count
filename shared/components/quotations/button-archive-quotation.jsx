import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import * as quotations from '../../ducks/quotations'
import { Button, BtnIcon } from '../ui/buttons.jsx'

function ButtonArchiveQuotation( props ) {
  const { quotation, archiveOne, isSaving, icon, ...others } = props
  if ( !quotation ) return null
  const id          = quotation.get(`id`         )
  const isAvailable = quotation.get(`_canBeArchived`)

  if ( !isAvailable ) return null
  const btnProps = {
    danger: true,
    onClick: event => {
      event.preventDefault()
      archiveOne({params: {id}})
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

function state2prop( state ) {
  return {
    isSaving: state.quotations.get( `isSaving` ),
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    archiveOne: quotations.archiveOne
  }, dispatch)
}

export default connect( state2prop, dispatch2prop )( ButtonArchiveQuotation )
