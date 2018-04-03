import test from 'ava'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { IntlProvider, intlShape } from 'react-intl'

// import messages from '../../locales/en.js'
import { Stepper, getSelectedIndex, CHECKED_CLASS } from './stepper.jsx'

Enzyme.configure({ adapter: new Adapter() })
const { shallow, mount } = Enzyme
const messages = {
  'stepper.foo.label': `foo`,
  'stepper.bar.label': `bar`,
}
const value = `2018-04-02 13:09:29.564+02`

// https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme
const intlProvider = new IntlProvider({ locale: 'en', messages }, {})
const { intl } = intlProvider.getChildContext()

test( `getSelectedIndex utility method`, t => {
  const noValues = [{value: ''}, {value: ''}, {value: ''}]
  t.is( getSelectedIndex(noValues), 0, `output 0 if no entry has a value` )
  const firstHaveValue = [{value: 'oui'}, {value: ''}, {value: ''}]
  t.is( getSelectedIndex(firstHaveValue), 1, `output 1 if the first entry has a value` )
  const untilSecond = [{value: 'oui'}, {value: 'oui'}, {value: ''}]
  t.is( getSelectedIndex(untilSecond), 2, `output 2 if the first & second entry has values` )
  const onlyThird = [{value: ''}, {value: ''}, {value: 'oui'}]
  t.is( getSelectedIndex(onlyThird), 0, `output 0 if the first is empty` )
  const firstAndThird = [{value: 'oui'}, {value: ''}, {value: 'oui'}]
  t.is( getSelectedIndex(firstAndThird), 1, `output 1 if the second is empty` )
  const all = [{value: 'oui'}, {value: 'oui'}, {value: 'oui'}]
  t.is( getSelectedIndex(all), 3, `output 3 if every thing has a value` )
})

test( `<stepper> component with empty values`, t => {
  const steps   = [
    { key: `foo`, label: `foo.label` },
    { key: `bar`, label: `bar.label` },
  ]
  const stepper     = shallow( <Stepper steps={ steps } /> )
  t.false( stepper.hasClass( CHECKED_CLASS ), `doesn't have “all check” class` )
  const children    = stepper.find( `Step` )
  t.is( children.length, 2, `has the right amount of steps` )
  const firstChild  = children.first()
  t.true( firstChild.prop( `checked` ), `first one is selected` )
  const secondChild = children.last()
  t.false( secondChild.prop( `checked` ), `second one isn't selected` )
})

test( `<stepper> with first values`, t => {
  const steps   = [
    { key: `foo`, label: `foo.label`, value },
    { key: `bar`, label: `bar.label` },
  ]
  const stepper     = shallow( <Stepper steps={ steps } /> )
  t.false( stepper.hasClass( CHECKED_CLASS ), `doesn't have “all check” class` )
  const children    = stepper.find( `Step` )
  const firstChild  = children.first()
  t.false( firstChild.prop( `checked` ), `first one isn't selected` )
  const secondChild = children.last()
  t.true( secondChild.prop( `checked` ), `second one is selected` )
})

test( `<stepper> with all values`, t => {
  const steps   = [
    { key: `foo`, label: `foo.label`, value },
    { key: `bar`, label: `bar.label`, value },
  ]
  const stepper     = shallow( <Stepper steps={ steps } /> )
  t.true( stepper.hasClass( CHECKED_CLASS ), `have “all check” class` )
  const children    = stepper.find( `Step` )
  const firstChild  = children.first()
  t.false( firstChild.prop( `checked` ), `first one isn't selected` )
  const secondChild = children.last()
  t.false( secondChild.prop( `checked` ), `second one isn't selected` )
})

test( `<stepper> behave good on multiple rendering`, t => {
  const initialSteps   = [
    { key: `foo`, label: `foo.label`},
    { key: `bar`, label: `bar.label`},
  ]
  const updatedSteps   = [
    { key: `foo`, label: `foo.label`, value},
    { key: `bar`, label: `bar.label`},
  ]
  const stepper   = mount( <Stepper steps={ initialSteps } />, {
    context:            { intl },
    childContextTypes:  { intl: intlShape },
  })
  let firstChild  = stepper.find( `Step` ).first()
  let secondChild = stepper.find( `Step` ).last()
  t.true( firstChild.prop( `checked` ), `on first render: first one is selected` )
  t.false( secondChild.prop( `checked` ), `on first render: second one isn't selected` )
  stepper.setProps({ steps: updatedSteps})
  firstChild  = stepper.find( `Step` ).first()
  secondChild = stepper.find( `Step` ).last()
  t.false( firstChild.prop( `checked` ), `on second render: first one isn't selected` )
  t.true( secondChild.prop( `checked` ), `on second render: second one is selected` )
  stepper.unmount()
  stepper.mount()
  stepper.setProps({ steps: initialSteps})
  firstChild  = stepper.find( `Step` ).first()
  secondChild = stepper.find( `Step` ).last()
  t.true( firstChild.prop( `checked` ), `on first render: first one is selected` )
  t.false( secondChild.prop( `checked` ), `on first render: second one isn't selected` )
})
