import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as types from '../src/store/action-types'
import { delay } from '../src/store/utils'

export function* incrementAsync() {
  // yield call(delay, 1000)
  let { code, data, error } = yield call(delay, 1000)
  if (code === 0) {
    yield put({ type: types.INCREMENT })
  } else {
    alert(error)
  }
}

export function* watchIncrementAsync() {
  // 监听每一次的ASYNC_INCREMENT动作
  yield takeEvery(types.ASYNC_INCREMENT, incrementAsync)
}
