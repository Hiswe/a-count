import test    from 'ava'
import React   from 'react'
import Enzyme  from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { TableThead } from './table.header'

// Enzyme config
Enzyme.configure({ adapter: new Adapter() })
const { shallow, mount } = Enzyme

const COMPUTE_TITLE        = `static computeSortQuery –`
const { computeSortQuery } = TableThead

test(`${ COMPUTE_TITLE } set a new order DESC if previous wasn't same`, t => {
  const query = computeSortQuery( {}, `name` )
  t.is( query.sort, `name`, `has the new sort` )
  t.is( query.dir, `ASC`, `has the ASC direction` )
})

test(`${ COMPUTE_TITLE } switch dir if previous was same`, t => {
  const query = computeSortQuery( {sort: `name`, dir: `ASC`}, `name` )
  t.is( query.sort, `name`, `has the same sort` )
  t.is( query.dir, `DESC`, `switch for ASC to DESC` )
})

test(`${ COMPUTE_TITLE } revert to no ordering after ordering cycle is done`, t => {
  const query = computeSortQuery( {sort: `name`, dir: `DESC`}, `name` )
  t.is( query.sort, undefined, `has the no sort` )
  t.is( query.dir, undefined, `has no direction` )
})
