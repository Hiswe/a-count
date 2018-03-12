import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import * as quotations from '../../ducks/quotations'
import FullPage from '../../components/ui/layout-full-page.jsx'
import { ButtonNew } from '../../components/quotations/secondary-nav-actions.jsx'
import QuotationsList from '../../components/quotations/list.jsx'


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
      <FullPage title="Quotations" secondary={ButtonNew}>
        <Link to="/quotations/new" className="btn-fab">+</Link>
        <div className="page__content">
          <QuotationsList {...props} />
        </div>
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
