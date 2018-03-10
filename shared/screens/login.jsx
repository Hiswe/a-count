import React, { Component } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CardCentered from '../components/layout/card-centered.jsx'
import { InputWrapper } from '../components/form.jsx'
import * as auth from '../ducks/auth'

class Login extends Component {

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.login( {body} )
  }

  render() {
    return (
      <CardCentered title="login">
        <form method="post" action="/login" onSubmit={ e => this.handleSubmit(e) } >
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: auth.login,
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )( Login )
