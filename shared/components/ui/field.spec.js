import test    from 'ava'
import crio    from 'crio'
import React   from 'react'
import Enzyme  from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { IntlProvider, intlShape } from 'react-intl'

import { Select } from './field.jsx'

// Enzyme config
Enzyme.configure({ adapter: new Adapter() })
const { shallow, mount } = Enzyme
// I18N config
const messages     = { 'select.label': `select combo box` }
const intlProvider = new IntlProvider({ locale: 'en', messages }, {})
const { intl }     = intlProvider.getChildContext()
const mountContext = {
  context:            { intl },
  childContextTypes:  { intl: intlShape },
}
// DATA
const selectData   = crio([`jean`, `jacques`, `alfred`].map( n => ({
  value: `id-${n}`, label: n,
})))

function mountSelect( props ) {
  return mount( <Select
    label="select.label"
    name="select"
    { ...props }
  />, mountContext )
}

test( `<select> should be able to specify custom keys for key/value`, t => {
  const testData = crio([{
    id:    `666`,
    name: `satan`,
  }])
  const select   = mountSelect( {
    value      : selectData.get(`[1].id`),
    options    : testData,
    optionsKeys: {value: `id`, label: `name`},
  })
  const options     = select.find(`option`)
  const firstOption = options.first()
  t.is( options.length, 1, `has the right amount of options` )
  t.is( firstOption.prop(`value`), testData.get(`[0].id`), `has the right value` )
  t.is( firstOption.text(), testData.get(`[0].name`), `has the right label` )
})

test( `<select> re-rendering`, t => {
  const select   = mountSelect( {
    value:    selectData.get(`[1].id`),
    options:  crio([]),
  })
  t.is( select.find(`option`).length, 0, `has no options to begin with` )

  select.setProps({options: selectData})
  t.is( select.find(`option`).length, 3, `has options` )
})
