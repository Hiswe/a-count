import test from 'ava'

import filter from '../src/filter-array-with-object'

test(`no default object & no array`, t => {
  // @ts-ignore
  const result = filter({})
  t.true(Array.isArray(result), `return a crio array`)
  t.is(result.length, 0, `return an empty array`)
})

test(`no default object`, t => {
  const array = [{ foo: `bar` }]
  // @ts-ignore
  const result = filter({ array })
  t.deepEqual(result, array, `return the original array`)
})

test(`no array`, t => {
  const defaultObject = { foo: `bar` }
  // @ts-ignore
  const result = filter({ defaultObject })
  t.true(Array.isArray(result), `return an array`)
  t.is(result.length, 0, `array is empty`)
})

test(`regular case`, t => {
  const defaultObject = { foo: `bar` }
  const array = [{ foo: `bar` }, { foo: `baz` }]
  const result = filter({ defaultObject, array })
  t.true(Array.isArray(result), `return an array`)
  t.is(result.length, 1, `array has been filtered`)
  t.is(result[0].foo, `baz`, `the right elements have been filtered`)
})

test.only(`doesn't mutate default object`, t => {
  const defaultObject = { foo: `bar`, ok: true }
  const initialDefaultObject = { ...defaultObject }
  const array = [{ foo: `bar`, _id: `1` }, { foo: `baz`, _id: 2 }]
  const result = filter({ defaultObject, array })
  t.true(Array.isArray(result), `return an array`)
  t.is(result.length, 1, `array has been filtered`)
  t.is(result[0].foo, `baz`, `the right elements have been filtered`)
  t.deepEqual(
    initialDefaultObject,
    defaultObject,
    `keep the same default object`,
  )
})

test(`coerce type`, t => {
  const defaultObject = { foo: `2`, howMuch: 2 }
  const array = [{ foo: 2, howMuch: `2` }]
  const result = filter({ defaultObject, array })
  t.is(result.length, 0, `stringed number has been filtered`)
})

test(`only check default object keys`, t => {
  const defaultObject = { foo: `bar` }
  const array = [{ foo: `bar`, id: 36 }]
  const result = filter({ defaultObject, array })
  t.is(
    result.length,
    0,
    `even with an extraneous key, result is still filtered`,
  )
})
