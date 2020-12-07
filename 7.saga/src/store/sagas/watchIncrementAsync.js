import { all, takeEvery, put, call, take, select } from 'redux-saga/effects'
import * as types from '../action-types'
import { delay } from '../utils'

export function* watchIncrementAsync() {
  for (let i = 0; i < 3; i++) {
    const action = yield take(types.ASYNC_INCREMENT)
    console.log(action)
    yield put({ type: types.INCREMENT })
  }
  alert('最多执行三次')
}

export function* watchAndLog() {
  while (true) {
    let action = yield take('*')
    console.log(action)
    // 如何在saga中获取最新的状态树
    let state = yield select()
    console.log(state)
  }
}

export function* rootSaga() {
  yield all([
    watchAndLog(), // 监听每个动作，当动作发生的时候打印日志
    watchIncrementAsync(), // 监听异步+1 的动作
  ])
}
