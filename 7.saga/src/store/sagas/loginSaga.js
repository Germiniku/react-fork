import {
  take,
  takeEvery,
  call,
  put,
  fork,
  cancel,
  cancelled,
} from 'redux-saga/effects'
import * as types from '../action-types'
import Api from './Api'

function* login(username, password) {
  try {
    Api.setItem('loading', 'true')
    const token = yield call(Api.login, username, password)
    // 如果token则登陆成功
    yield put({ type: types.LOGIN_SUCCESS, payload: token })
  } catch (error) {
    alert(error)
    yield put({ type: types.LOGIN_ERROR, error })
  } finally {
    // 正常结束或被取消结束最后执行释放资源的hooks
    if (yield cancelled()) {
      Api.setItem('loading', 'false')
    }
  }
}

export default function* () {
  while (true) {
    let {
      payload: { username, password },
    } = yield take(types.LOGIN)
    // let token = yield call(login, username, password)
    // task是一个任务对象
    // fork 开辟一个新的生成器，新的生成器不会阻塞当前任务流
    const task = yield fork(login, username, password)
    // if (token) {
    // 一旦登陆成功就开始监听退出的动作
    const action = yield take(types.LOGOUT)
    action.type === types.LOGOUT ? yield cancel(task) : null
    // 派发退出成功的动作，把token删掉
    yield put({ type: types.LOGOUT_SUCCESS })
    // }
  }
}
