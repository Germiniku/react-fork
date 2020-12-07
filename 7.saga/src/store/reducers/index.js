import { combineReducers } from 'redux'
import reducer from './reducer'
import user from './user'
let reducers = combineReducers({ reducer, user })

export default reducers
