import test    from 'ava'
import React   from 'react'
import Enzyme  from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { IntlProvider, intlShape } from 'react-intl'

import { Tabs, TabList, Tab, TabPanel } from './tabs.jsx'

// Enzyme config
Enzyme.configure({ adapter: new Adapter() })
const { shallow, mount } = Enzyme
// I18N config
const messages     = {}
const intlProvider = new IntlProvider({ locale: 'en', messages }, {})
const { intl }     = intlProvider.getChildContext()
const mountContext = {
  context:            { intl },
  childContextTypes:  { intl: intlShape },
}

function mountTabs() {
  return mount(
  <Tabs>
    <TabList>
      <h1>foreign node</h1>
      <Tab>first</Tab>
      <Tab>second</Tab>
    </TabList>
    <TabPanel>first content</TabPanel>
    <TabPanel>second content</TabPanel>
  </Tabs>
  ,
  mountContext)
}

test(`<tabs> get the right generated HTML`, t => {
  const tabs  = mountTabs()
  const input = tabs.find( `input` )
  const tab   = tabs.find( `Tab` )
  t.is( input.length, tab.length, `has created the same amount of input than existing tabs` )
  t.is( input.first().prop(`id`) , tab.first().prop(`htmlFor`), `has the right id/for` )
  t.true( input.first().prop(`checked`), `first tab is selected` )
  t.false( input.last().prop(`checked`), `last tab isn't` )
})
