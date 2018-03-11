import React, { Component } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as auth from '../ducks/auth'
import CardCentered from '../components/ui/layout-card-centered.jsx'
import { InputWrapper } from '../components/form.jsx'

class Register extends Component {

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.register( {body} )
  }

  render() {
    const { props } = this

    return (
      <CardCentered title="Create an account">
        <form method="post" action="/register" onSubmit={ e => this.handleSubmit(e) } >
          <InputWrapper id="email" label="Email">
            <input className="input__field" id="email" name="email" type="email" />
          </InputWrapper>
          <InputWrapper id="password" label="Password">
            <input className="input__field" id="password" name="password" type="password" />
          </InputWrapper>
          <button className="btn" type="submit">Submit</button>
        </form>
      </CardCentered>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    register: auth.register,
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )( Register )
