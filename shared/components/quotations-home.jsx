import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Empty } from './_utils.jsx'
import QuotationsTable from './quotations-list.jsx'
import * as quotations from '../ducks/quotations'

class QuotationsHome extends Component {

  static fetchData(store) {
    return store.dispatch( quotations.getAll() )
  }

  componentDidMount() {
    this.props.getAll()
  }

  render() {
    const { props } = this
    return (
      <div>
        <h1>
          Quotations
          <Link to="/quotations/new" className="btn-fab">+</Link>
        </h1>
        {props.hasQuotations ? <QuotationsTable /> : <Empty />}
      </div>
    )
  }

}

const mapStateToProp = (state) => {
  const quotations = state.quotations && state.quotations.list
  const hasQuotations = quotations && quotations.length
  return {
    hasQuotations,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAll: quotations.getAll,
  }, dispatch)
}

export default connect(mapStateToProp, mapDispatchToProps)(QuotationsHome)
