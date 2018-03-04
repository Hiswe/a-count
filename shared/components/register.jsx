import React from 'react'

import { CardCentered } from './_utils.jsx'
import { InputWrapper } from './form.jsx'

const Register = () => {
  return (
    <CardCentered>
      <form method="post" action="/users/new">
        <h2>Register</h2>
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

export default Register
