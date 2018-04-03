import test from 'ava'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
const { shallow } = Enzyme

import { getSelectedIndex } from './stepper.jsx'

const title = `<Stepper>`

test( `${title} – getSelectedIndex utility method`, t => {
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
