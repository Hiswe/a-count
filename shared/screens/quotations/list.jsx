import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as quotations from '../../ducks/quotations'
import { Empty } from '../../components/_utils.jsx'
import QuotationsList from '../../components/quotations-list.jsx'
import FullPage from '../../components/ui/layout-full-page.jsx'

class Quotations extends Component {

  static fetchData(store, params, cookies) {
    return store.dispatch( quotations.getAll(params, cookies) )
  }

  componentDidMount() {
    this.props.getAll()
  }

  render() {
    const { props } = this
    return (
      <FullPage title="Quotations">
        <Link to="/quotations/new" className="btn-fab">+</Link>
        <QuotationsList {...props} />
      </FullPage>
    )
  }

}

const mapStateToProp = (state) => {
  const quotations = state.quotations && state.quotations.list
  const hasQuotations = quotations && quotations.length
  return {
    hasQuotations,
    quotations,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAll: quotations.getAll,
  }, dispatch)
}

export default connect(mapStateToProp, mapDispatchToProps)( Quotations )
