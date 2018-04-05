import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './tabs.scss'
const BASE_CLASS = `react-tabs`

// TODO: replace the tabs by some radio
// • this way it will work without JS
export { Tab, Tabs, TabList, TabPanel }

export function TabListHeader( props ) {
  return (
    <header className={`${BASE_CLASS}__tab-list_header`}>
      { props.children }
    </header>
  )
}
