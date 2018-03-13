import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../../ducks/customers'
import { needRedirect } from '../_helpers.js'
import Field from '../ui/field.jsx'

class CustomerForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formData: this.props.current,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const { history, current } = this.props
    const next = nextProps.current

    // update state on redux status change
    if (current === next) return

    // redirect if new customer
    if ( needRedirect(current, next) ) history.push(`/customers/${next.id}`)

    this.setState( (prevState, props) => {
      const updated = prevState.formData.merge( null, props.current )
      return { formData: updated }
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.saveOne( {body} )
  }

  handleChange(event) {
    const { target } = event
    const { value } = target
    const key = target.getAttribute(`name`)
    this.setState( (prevState) => {
      const updated = prevState.formData.set(key, value)
      return { formData: updated }
    })
  }

  render() {
    const { props, state } = this
    const { current } = props
    const { formData } = state

    return (
      <form method="post" onSubmit={this.handleSubmit}>
        {props.isNew ? null : <input type="hidden" defaultValue={formData.id} name="id" />  }
        <fieldset>
          <Field key="name" name="name" value={formData.name} onChange={this.handleChange}/>
          <Field key="address" name="address" type="textarea" value={formData.address} onChange={this.handleChange} />
        </fieldset>
        <div className="actions">
          <button className="btn" type="submit">{props.submitMsg}</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  const { current } = state.customers
  const isNew   = current.id == null
  const result  = {
    submitMsg: `${isNew ? 'Create' : 'Update'} customer`,
    isNew,
    current,
  }
  return result
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    // getOne:   customers.getOne,
    saveOne:  customers.saveOne,
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )( CustomerForm )
