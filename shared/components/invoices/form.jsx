import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as invoices from '../../ducks/invoices'

class InvoiceForm extends Component {

  constructor( props ) {
    super( props )
  }

  render() {
    return null
  }
}

export default InvoiceForm
