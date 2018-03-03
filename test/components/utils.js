import test from 'ava'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
const { shallow } = Enzyme

import { Amount } from '../../shared/components/_utils.jsx'

// Can't name the file _utils.js as AVA ignore files prefixed with an underscore
// https://github.com/avajs/ava#options

////////
// AMOUNT
////////

const amountTitle = `<Amount />`;
const amountWrapperClass = `.amount`
const amountValueClass = `${amountWrapperClass}__value`
const amountUnitClass = `${amountWrapperClass}__unit`

test( `${amountTitle} – basic structure`, t => {
  const component = shallow( <Amount /> )
  const wrapper = component.find( amountWrapperClass )
  t.is( wrapper.length, 1, `has the “${amountWrapperClass}” class` )
  const amount = wrapper.find( amountValueClass )
  t.is( amount.length, 1, `has an “${amountValueClass}” node` )
  const unit = wrapper.find( amountUnitClass )
  t.is( unit.length, 1, `has an “${amountUnitClass}” node` )
})

test( `${amountTitle} – render an error if empty one`, t => {
  const component = shallow( <Amount /> )
  t.is( component.find(amountValueClass).text(), `#error`, `without value, an error is shown` )
  t.is( component.find(amountUnitClass).text(), ``, `without value, unit is empty` )
})

test( `${amountTitle} – render an error if value isn't a number`, t => {
  const booleanComponent = shallow( <Amount value={true} /> )
  t.is( booleanComponent.find(amountValueClass).text(), `#error`, `without value, an error is shown` )
  t.is( booleanComponent.find(amountUnitClass).text(), ``, `without value, unit is empty` )
  const textComponent = shallow( <Amount value={`12.25`} /> )
  t.is( textComponent.find(amountValueClass).text(), `#error`, `without value, an error is shown` )
  t.is( textComponent.find(amountUnitClass).text(), ``, `without value, unit is empty` )
})

test( `${amountTitle} – render ok with a number`, t => {
  const component = shallow( <Amount value={12.25} /> )
  t.is( component.find(amountValueClass).text(), `12.25`, `the right value` )
  t.is( component.find(amountUnitClass).text(), `€`, `the right unit` )
})
