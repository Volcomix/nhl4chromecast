import * as types from '../constants/actionTypes'

const initialState = {
  isInProgress: false,
  userToken: undefined,
  sessionKey: undefined,
}

const authorization = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_USER_TOKEN: return requestUserToken(state)
    case types.RECEIVE_USER_TOKEN: return receiveUserToken(state, action)
    default: return state
  }
}

const requestUserToken = state => ({
  ...state,
  isInProgress: true,
})

const receiveUserToken = (state, action) => ({
  ...state,
  isInProgress: false,
  userToken: action.userToken,
})

export default authorization