import { put, take, takeEvery, delay, cps } from '../../redux-saga/effects'
import * as types from '../action-types'

// const delay = (ms) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(ms)
//     }, ms)
//   })

const delay = (ms, callback) => {
  setTimeout(() => {
    callback(ms)
  }, ms)
}

function* increment() {
  // let result = yield call(delay, 1000)
  // let result = yield delay(1000)
  let result = cps(delay, 1000)
  console.log(result)
  yield put({ type: types.INCREMENT })
}

function* first() {
  console.log('开始执行counterSaga')
  for (let i = 0; i < 3; i++) {
    const action = yield take(types.ASYNC_INCREMENT)
    console.log(action)
    yield increment()
  }
  alert('最多执行三次')
}
export default function* () {
  yield takeEvery(types.ASYNC_INCREMENT, increment)
}
