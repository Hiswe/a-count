import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

import * as account from '../redux-ducks/account'
import { getInputValue } from '../utils/get-input-value'
import { Form } from '../ui/form'
import SettingFormPres from './settings.pres'

export const FORM_ID = `setting-form`

class SettingForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      formData: this.props.user,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  //----- EVENTS

  handleSubmit(event) {
    event.preventDefault()
    const body = serialize(event.target, { hash: true, empty: true })
    this.props.updateSettings({ body })
  }
  handleFormChange(event) {
    const { name, value } = getInputValue(event.target)
    this.setState(prevState => {
      return { formData: prevState.formData.set(name, value) }
    })
  }

  //----- RENDER

  render() {
    const { state, props } = this
    const { formData } = state
    return (
      <Form
        id={`${FORM_ID}`}
        action={`/account/settings`}
        isSaving={props.isSaving}
        onChange={this.handleFormChange}
        onSubmit={this.handleSubmit}
      >
        <input type="hidden" name="id" value={formData.get(`id`)} />
        <input
          type="hidden"
          name="quotationConfig[id]"
          value={formData.get(`quotationConfig.id`)}
        />
        <input
          type="hidden"
          name="invoiceConfig[id]"
          value={formData.get(`invoiceConfig.id`)}
        />
        <input
          type="hidden"
          name="productConfig[id]"
          value={formData.get(`productConfig.id`)}
        />
        <SettingFormPres formData={formData} />
      </Form>
    )
  }
}

function state2props(state) {
  return {
    user: state.account.get(`user`),
    isSaving: state.account.get(`isSaving`),
  }
}

function dispatch2props(dispatch) {
  return bindActionCreators(
    {
      updateSettings: account.updateSettings,
    },
    dispatch
  )
}

export default connect(
  state2props,
  dispatch2props
)(SettingForm)
