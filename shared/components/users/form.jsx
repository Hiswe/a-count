import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as customers from '../../ducks/customers'
import { needRedirect } from '../_helpers.js'
import { Floating } from '../form.jsx'
import Field from '../ui/field.jsx'
// import { RenderError } from '../_utils.jsx'

class UserForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: this.props.current,
    }
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // const { params } = this.props.match
    // this.props.getOne( params )
  }

  componentWillReceiveProps(nextProps) {
    // const { history, current } = this.props
    // const next = nextProps.current

    // // update state on redux status change
    // if (current === next) return

    // // redirect if new customer
    // if ( needRedirect(current, next) ) history.push(`/customers/${next.id}`)

    // this.setState( (prevState, props) => {
    //   const updated = prevState.formData.merge( null, props.current )
    //   return { formData: updated }
    // })
  }

  handleSubmit( event ) {
    // event.preventDefault()
    // const result = serialize( event.target, { hash: true, empty: true } )
    // this.props.saveOne( result )
  }

  handleChange( event ) {
    const { target } = event
    const { value } = target
    const key = target.getAttribute(`name`)
    this.setState( prevState => {
      const updated = prevState.formData.set(key, value)
      return { formData: updated }
    })
  }

  render() {
    const { props, state } = this
    const { current } = props
    const { formData } = state

    // if ( current.error ) return ( <RenderError {...current} /> )

    return (
      <form
        method="post"
        action={`/users/${formData.id}`}
        onSubmit={this.handleSubmit}
        className="form form--profile"
      >
        <input type="hidden" name="id" value={formData.id} />
        <fieldset className="card" style={{gridColumn: `1 / span 2`}}>
          <h3 className="card__title">General Information</h3>
          <div className="card__content">
            <Field key="name" name="name" value={ formData.name } onChange={ e => this.handleChange(e) } />
          </div>
        </fieldset>
        <fieldset className="card" style={{gridColumn: `1 / span 2`}}>
          <h3 className="card__title">Default Product</h3>
        </fieldset>
        <fieldset className="card">
          <h3 className="card__title">Default Quotation</h3>
        </fieldset>
        <fieldset className="card">
          <h3 className="card__title">Default Invoice</h3>
        </fieldset>
        <div className="actions" style={{gridColumn: `1 / span 2`}}>
          <button className="btn" type="submit">save update</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    current: state.user.current,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    // getOne:   customers.getOne,
    // saveOne:  customers.saveOne,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)( UserForm )
