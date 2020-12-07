import * as types from '../action-types'
let initalState = {}

export default function (state = initalState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { token: action.payload }
    case types.LOGIN_ERROR:
      return { error: action.error }
    case types.LOGOUT_SUCCESS:
      return {}
    default:
      return state
  }
}
