import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import { createSagaMiddleware } from '../redux-saga'
import { rootSaga } from './sagas/counterSaga'


let sagaMiddleware = createSagaMiddleware()
let store = applyMiddleware(sagaMiddleware)(createStore)(reducers)
sagaMiddleware.run(rootSaga) // co库
export default store
