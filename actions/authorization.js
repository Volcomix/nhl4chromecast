import * as types from '../constants/actionTypes'

export const askLogin = () => ({
  type: types.ASK_LOGIN,
})

export const authorize = (username, password) => dispatch => {
  dispatch(requestUserToken())
  setTimeout(() => dispatch(receiveUserToken('666')), 2000)
}

const requestUserToken = () => ({
  type: types.REQUEST_USER_TOKEN,
})

const receiveUserToken = json => ({
  type: types.RECEIVE_USER_TOKEN,
  userToken: json
})