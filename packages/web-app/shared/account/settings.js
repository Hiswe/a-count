import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import serialize from 'form-serialize'

import * as account from '../redux-ducks/account'
import * as formDraft from '../redux-ducks/form-draft'
import { getInputValue } from '../utils/get-input-value'
import { Form } from '../ui/form'
import { Spinner } from '../ui/spinner'
import SettingFormPres from './settings.pres'

export const FORM_ID = `setting-form`

class SettingForm extends React.PureComponent {
  constructor(props) {
    super(props)

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
    const { props } = this
    const { name, value } = getInputValue(event.target)
    props.updateDraft(props.formDraft.set(name, value))
  }

  //----- RENDER

  render() {
    const { props } = this
    const { formDraft } = props
    if (formDraft.isLoading) return <Spinner />
    if (props.userId !== formDraft.get(`id`)) return <Spinner />

    return (
      <Form
        id={`${FORM_ID}`}
        action={`/account/settings`}
        isSaving={props.isSaving}
        onChange={this.handleFormChange}
        onSubmit={this.handleSubmit}
      >
        <input type="hidden" name="id" value={formDraft.get(`id`)} />
        <input
          type="hidden"
          name="quotationConfig[id]"
          value={formDraft.get(`quotationConfig.id`)}
        />
        <input
          type="hidden"
          name="invoiceConfig[id]"
          value={formDraft.get(`invoiceConfig.id`)}
        />
        <input
          type="hidden"
          name="productConfig[id]"
          value={formDraft.get(`productConfig.id`)}
        />
        <SettingFormPres formDraft={formDraft} />
      </Form>
    )
  }
}

function state2props(state) {
  return {
    userId: state.account.get(`user.id`),
    formDraft: state.formDraft,
    isSaving: state.account.get(`isSaving`),
  }
}

function dispatch2props(dispatch) {
  return bindActionCreators(
    {
      updateSettings: account.updateSettings,
      updateDraft: formDraft.updateDraft,
    },
    dispatch,
  )
}

export default connect(
  state2props,
  dispatch2props,
)(SettingForm)
