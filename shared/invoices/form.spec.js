import path    from 'path'
import test    from 'ava'
import crio    from 'crio'
import React   from 'react'
import Enzyme  from 'enzyme'
import mock    from 'mock-require'
import Adapter from 'enzyme-adapter-react-16'
import { IntlProvider, intlShape } from 'react-intl'

import InvoiceForm from './form'

// Enzyme config
Enzyme.configure({ adapter: new Adapter() })
const { shallow, mount } = Enzyme
// I18N config
const messages     = {}
const intlProvider = new IntlProvider({ locale: 'en', messages }, {})
const { intl }     = intlProvider.getChildContext()

test( `STATIC – update payments`, t => {
  t.pass( `pouic` )
})
