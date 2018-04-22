import test    from 'ava'
import React   from 'react'
import Enzyme  from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { IntlProvider, intlShape } from 'react-intl'

import {
  Stepper,
  CHECKED_CLASS,
  RADIO_CLASS,
} from './stepper'

Enzyme.configure({ adapter: new Adapter() })
const { shallow, mount } = Enzyme
const value    = `2018-04-02 13:09:29.564+02`
// https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme
const messages = { 'foo.label': `foo`, 'bar.label': `bar`, }
const intlProvider = new IntlProvider({ locale: 'en', messages }, {})
const { intl }     = intlProvider.getChildContext()

function getMountedStepper( initialSteps ) {
  return mount( <Stepper steps={ initialSteps } />, {
    context:            { intl },
    childContextTypes:  { intl: intlShape },
  })
}

test( `<stepper> getSelectedIndex static method`, t => {
  const { getSelectedIndex } = Stepper
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
  const stepper   = getMountedStepper([
    { key: `foo`, label: `foo.label` },
    { key: `bar`, label: `bar.label` },
  ])
  t.false( stepper.find(`.${CHECKED_CLASS}`).exists(), `doesn't have “all check” class` )
  const children    = stepper.find( `Step` )
  t.is( children.length, 2, `has the right amount of steps` )
  const firstChild  = children.first()
  t.true( firstChild.prop( `checked` ), `first one is selected` )
  const secondChild = children.last()
  t.false( secondChild.prop( `checked` ), `second one isn't selected` )
})

test( `<stepper> with first values`, t => {
  const stepper     = getMountedStepper([
    { key: `foo`, label: `foo.label`, value },
    { key: `bar`, label: `bar.label` },
  ])
  t.false( stepper.find(`.${CHECKED_CLASS}`).exists(), `doesn't have “all check” class` )
  const children    = stepper.find( `Step` )
  const firstChild  = children.first()
  t.false( firstChild.prop( `checked` ), `first one isn't selected` )
  const secondChild = children.last()
  t.true( secondChild.prop( `checked` ), `second one is selected` )
})

test( `<stepper> with all values`, t => {
  const stepper     = getMountedStepper([
    { key: `foo`, label: `foo.label`, value },
    { key: `bar`, label: `bar.label`, value },
  ])
  t.true(stepper.find(`.${CHECKED_CLASS}`).exists(), `have “all check” class` )
  const children    = stepper.find( `Step` )
  const firstChild  = children.first()
  t.false( firstChild.prop( `checked` ), `first one isn't selected` )
  const secondChild = children.last()
  t.false( secondChild.prop( `checked` ), `second one isn't selected` )
})

test.only( `<stepper> behave as expected on multiple rendering`, t => {
  let firstCheckbox
  let secondCheckbox
  const initialSteps   = [
    { key: `foo`, label: `foo.label`},
    { key: `bar`, label: `bar.label`},
  ]
  const updatedSteps   = [
    { key: `foo`, label: `foo.label`, value},
    { key: `bar`, label: `bar.label`},
  ]
  function updateInput( stepper ) {
    const steps    = stepper.find( `Step` )
    firstCheckbox  = steps.first().find(`.${ RADIO_CLASS }`)
    secondCheckbox = steps.last ().find(`.${ RADIO_CLASS }`)
  }
  const stepper   = getMountedStepper( initialSteps )
  updateInput( stepper )
  t.true ( firstCheckbox .prop( `checked` ), `on first render: first one is selected`     )
  t.false( secondCheckbox.prop( `checked` ), `on first render: second one isn't selected` )

  stepper.setProps({ steps: updatedSteps})
  updateInput( stepper )
  t.false( firstCheckbox .prop( `checked` ), `on second render: first one isn't selected` )
  t.true ( secondCheckbox.prop( `checked` ), `on second render: second one is selected`   )

  stepper.unmount()
  stepper.mount()
  stepper.setProps({ steps: initialSteps})
  updateInput( stepper )
  t.true ( firstCheckbox .prop( `checked` ), `on first render: first one is selected`     )
  t.false( secondCheckbox.prop( `checked` ), `on first render: second one isn't selected` )
})
