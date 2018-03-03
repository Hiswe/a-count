import test from 'ava'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
const { shallow } = Enzyme

import { Input } from '../../shared/components/form.jsx'

////////
// INPUT
////////

const inputTitle = `<Input>`

const inputWrapperClass = `.input`
const inputLabelClass = `${inputWrapperClass}__label`
const inputFieldClass = `${inputWrapperClass}__field`

test( `${inputTitle} – basic structure`, t => {
  const component = shallow( <Input name="foo" value="bar" /> )
  const wrapper = component.find( inputWrapperClass )
  t.is( wrapper.length, 1, `has the “${inputWrapperClass}” class` )

  const label = component.find( inputLabelClass )
  t.is( label.length, 1, `has an “${inputLabelClass}” node` )
  t.is( label.type(), `label`, `“${inputLabelClass}” is a <label>` )
  t.is( label.prop(`htmlFor`), `foo`, `“${inputLabelClass}” has the right “for” attribute` )

  const field = component.find( inputFieldClass )
  t.is( field.length, 1, `has an “${inputFieldClass}” node` )
  t.is( field.type(), `input`, `“${inputFieldClass}” is an <input>` )
  t.is( field.prop(`name`), `foo`, `“${inputFieldClass}” has the right “name” attribute` )
  t.is( field.prop(`id`), `foo`, `“${inputFieldClass}” has the right “id” attribute` )
  t.is( field.prop(`value`), `bar`, `“${inputFieldClass}” has the right “value” attribute` )
})

test( `${inputTitle} – can set different id than name`, t => {
  const component = shallow( <Input name="foo" value="bar" id="baz" /> )

  const label = component.find( inputLabelClass )
  t.is( label.prop(`htmlFor`), `baz`, `“${inputLabelClass}” has the right “for” attribute` )

  const field = component.find( inputFieldClass )
  t.is( field.length, 1, `has an “${inputFieldClass}” node` )
  t.is( field.prop(`name`), `foo`, `“${inputFieldClass}” has the right “name” attribute` )
  t.is( field.prop(`id`), `baz`, `“${inputFieldClass}” has the right “id” attribute` )
})

test( `${inputTitle} – textarea`, t => {
  const component = shallow( <Input name="foo" value="bar" id="baz" type="textarea" /> )

  const field = component.find( inputFieldClass )
  t.is( field.length, 1, `has an “${inputFieldClass}” node` )
  t.is( field.type(), `textarea`, `“${inputFieldClass}” is a <textarea>` )
})

test( `${inputTitle} – select`, t => {
  const selectVal = [{id: `pouic`, name: `clapou`}, {id: `hiswe`, name: `halya`}]
  const component = shallow( <Input name="foo" entries={selectVal} value={selectVal[0].id} type="select" /> )

  const field = component.find( inputFieldClass )
  t.is( field.length, 1, `has an “${inputFieldClass}” node` )
  t.is( field.type(), `select`, `“${inputFieldClass}” is a <select>` )

  const options = field.find(`option`)
  t.is( options.length, 2, `<select> has 2 <option>` )
  t.is( options.at(0).key(), selectVal[0].id, `first option has the right key` )
  t.is( options.at(0).prop(`value`), selectVal[0].id, `first option has the right value` )
  t.is( options.at(0).text(), selectVal[0].name, `first option has the right text` )
  t.is( options.at(1).key(), selectVal[1].id, `second option has the right key` )
  t.is( options.at(1).prop(`value`), selectVal[1].id, `second option has the right value` )
  t.is( options.at(1).text(), selectVal[1].name, `second option has the right text` )

  const emptySelect = shallow( <Input name="foo" value={selectVal[0].id}type="select" /> )
  t.is( emptySelect.find(`option`).length, 0, `<select> has no <option> if entries not set` )

  const wrongDataSelect = shallow( <Input name="foo" entries={selectVal[0]} value={selectVal[0].id}type="select" /> )
  t.is( wrongDataSelect.find(`option`).length, 0, `<select> has no <option> if entries is not an array` )
})
