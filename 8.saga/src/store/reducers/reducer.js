import * as types from '../action-types'

let initialState = { number: 0 }
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        number: state.number + 1,
      }
    case types.DECREMENT:
      return {
        number: state.number - 1,
      }
    default:
      return state
  }
}
export default reducers
