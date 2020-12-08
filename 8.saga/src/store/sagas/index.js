import { all } from 'redux-saga/effects'
import counterSaga from './counterSaga'

/*
 * 1.rootSaga 入口saga 是用来组织和调用别的saga generator的
 * 2.监听saga 监听向仓库派发的动作的。如果监听到某些动作的话会通知worker去执行
 * 3.worker saga 真正干活的saga 真正执行任务的saga
 */

export default function* rootSaga() {
  yield all([counterSaga()])
}
