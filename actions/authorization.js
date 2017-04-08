import { AsyncStorage } from 'react-native'

import * as types from '../constants/actionTypes'

const hostname = 'https://user.svc.nhl.com'

export const askLogin = media => ({
  type: types.ASK_LOGIN,
  media,
})

export const authorize = (username, password) => async (dispatch, getState) => {
  dispatch(requestUserToken())
  try {
    const userToken = await fetchUserToken(username, password)
    await AsyncStorage.setItem('userToken', userToken)
    const media = getState().media.info
    dispatch(receiveUserToken(userToken, media))
  } catch (error) {
    console.error(error)
  }
}

const fetchUserToken = async (username, password) => {
  const accessToken = await fetchAccessToken()
  const options = {
    headers: new Headers({
      'Authorization': accessToken,
      'Content-type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify({
      type: 'email-password',
      email: { address: username },
      password: { value: password },
    }),
  }
  const url = `${hostname}/v2/user/identity`
  const response = await fetch(url, options)
  return readAuthorizationCookie(response)
}

const fetchAccessToken = async () => {
  const applicationToken = 'd2ViX25obC12MS4wLjA6MmQxZDg0NmVhM2IxOTRhMThlZjQwYWM5ZmJjZTk3ZTM='
  const options = {
    headers: new Headers({
      Authorization: `Basic ${applicationToken}`,
    }),
    method: 'POST',
  }
  const url = `${hostname}/oauth/token?grant_type=client_credentials`
  const response = await fetch(url, options)
  const json = await response.json()
  return json.access_token
}

const readAuthorizationCookie = response => (
  response.headers
    .get('set-cookie')
    .split(';')
    .map(cookie => cookie.split('='))
    .map(([key, value]) => ({ key, value }))
    .find(({ key }) => key === 'Authorization')
    .value
)

const requestUserToken = () => ({
  type: types.REQUEST_USER_TOKEN,
})

const receiveUserToken = (userToken, media) => ({
  type: types.RECEIVE_USER_TOKEN,
  userToken,
  media,
})