import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import { createSagaMiddleware } from 'redux-saga'
import { rootSaga } from './sagas/watchIncrementAsync'


let sagaMiddleware = createSagaMiddleware()
// let store = createStore(reducer);
let store = applyMiddleware(sagaMiddleware)(createStore)(reducers)
sagaMiddleware.run(rootSaga) // co库
export default store
