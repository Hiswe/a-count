import test from 'ava'

import fawo from './filter-array-with-object.js'

const testObject = {
  string: `bar`,
  emptyString: ``,
  number: 10,
  emptyNumber: 0,
  boolean: true,
  falseBoolean: false,
}

const modifiedObject =  Object.assign({}, testObject, {emptyString: `baz`})

const testArray = [
  {...testObject},
  {...modifiedObject},
  {...testObject},
]

test( `no default object & no array`, t => {
  t.deepEqual( fawo({}), [], `return an empty array`  )
})

test( `no default object`, t => {
  t.deepEqual( fawo({array: testArray}), testArray, `return the original array` )
})

test( `no array`, t => {
  t.deepEqual( fawo({defaultObject: testObject}), [], `return an empty array`  )
})

test( `regular case`, t => {
  let result = fawo({
    defaultObject: testObject,
    array: testArray,
  })
  t.deepEqual( result, [ modifiedObject ], `return only the modified object`  )
})

test( `coerce type`, t => {
  let modObj = Object.assign({}, testObject, {number: `10`})
  let result = fawo({
    defaultObject: testObject,
    array: [{...testObject}, modObj],
  })
  t.deepEqual( result, [], `return only the modified object`  )
})
