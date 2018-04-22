import test from 'ava'
import crio from 'crio'

import filter from './filter-array-with-object'

test( `no default object & no array`, t => {
  const result = filter({})
  t.true( crio.isArray(result),  `return a crio array` )
  t.is( result.length, 0, `return an empty array` )
})

test( `no default object`, t => {
  const array = crio([{foo: `bar`}])
  const result = filter({array})
  t.deepEqual( result, array, `return the original array` )
})

test( `no array`, t => {
  const defaultObject = crio({foo: `bar`})
  const result = filter({defaultObject})
  t.true( crio.isArray(result),  `return a crio array` )
  t.is( result.length, 0, `return an empty array` )
})

test( `no crio array`, t => {
  const defaultObject = crio({foo: `bar`} )
  const array = [{foo: `bar`}]
  const result = filter({defaultObject, array})
  t.true( crio.isArray(result),  `return a crio array` )
  t.is( result.length, 0, `return an empty array` )
})

test( `no crio default Object`, t => {
  const defaultObject = {foo: `bar`}
  const array = crio([{foo: `bar`}])
  const result = filter({defaultObject, array})
  t.deepEqual( result, array, `return original array` )
})

test( `regular case`, t => {
  const defaultObject = crio({foo: `bar`})
  const array = crio([{foo: `bar`}, {foo: `baz`}])
  const result = filter({defaultObject, array})
  t.true( crio.isArray(result), `return a crio array` )
  t.is( result.length, 1, `array has been filtered` )
  t.is( result.get(`[0].foo`), `baz`, `the right elements have been filtered` )
})

test( `coerce type`, t => {
  const defaultObject = crio({foo: `2`, howMuch: 2})
  const array = crio([{foo: 2, howMuch: `2`}])
  const result = filter({defaultObject, array})
  t.is( result.length, 0, `stringed number has been filtered` )
})

test( `only check default object keys`, t => {
  const defaultObject = crio({foo: `bar`})
  const array = crio([{foo: `bar`, id: 36}])
  const result = filter({defaultObject, array})
  t.is( result.length, 0, `even with an extraneous key, result is still filtered` )
})
