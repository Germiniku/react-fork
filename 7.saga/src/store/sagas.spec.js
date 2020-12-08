import test from 'tape'
import { delay, readFile } from './utils'
import { incrementAsync } from '../../docs/watchIncrementAsync'
import { call, cps, put } from 'redux-saga/effects'
import * as types from './action-types'
import readAsync from './sagas/readAsync'

test('incrementAsync saga test', function (assert) {
  let gen = incrementAsync()
  let v1 = gen.next().value
  assert.deepEqual(
    v1,
    call(delay, 1000),
    'should return a promise which was delayed 1000 milliseconds'
  )
  assert.deepEqual(gen.next().value, put({ type: types.INCREMENT }))
  assert.end()
})

test('readAsync saga test', function (assert) {
  let gen = readAsync()
  let v1 = gen.next().value
  assert.deepEqual(
    v1,
    cps(readFile, 'README.md'),
    'should return a callback file content'
  )
  assert.deepEqual(
    gen.next(),
    {value:undefined,done:true},
    "should done"
  )
  assert.end()
})
