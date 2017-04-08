import { AsyncStorage } from 'react-native'

import * as types from '../constants/actionTypes'
import { askLogin } from './authorization'

export const showMedia = media => async (dispatch, getState) => {
  try {
    let userToken = getState().authorization.userToken
    if (userToken === undefined) {
      userToken = await AsyncStorage.getItem('userToken')
    }
    if (userToken === null) {
      dispatch(askLogin(media))
    } else {
      dispatch(fetchMediaUrl(media, userToken))
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchMediaUrl = (media, userToken) => async (dispatch, getState) => {
  dispatch(requestMediaUrl(media))
  const hostname = 'https://mf.svc.nhl.com'
  const options = getOptions(userToken)
  let { sessionKey } = getState().authorization
  if (sessionKey === undefined) {
    sessionKey = await AsyncStorage.getItem('sessionKey') || ''
  }
  const params = getParams(media, sessionKey)
  const url = `${hostname}/ws/media/mf/v2.4/stream?format=json&${params}`
  try {
    const response = await fetch(url, options)
    const json = await response.json()
    const sessionKey = json.session_key
    await AsyncStorage.setItem('sessionKey', sessionKey)
    dispatch(receiveMediaUrl(json))
  } catch (error) {
    console.error(error)
  }
}

const getOptions = userToken => ({
  headers: new Headers({
    'Content-type': 'text/xml; charset=utf-8',
    'User-Agent': 'NHL',
    'Cookie': `Authorization=${userToken}`
  }),
})

const getParams = (media, sessionKey) => {
  const params = {
    contentId: media.mediaPlaybackId,
    eventId: media.eventId,
    subject: 'LIVE_EVENT_COVERAGE',
    playbackScenario: 'HTTP_CLOUD_TABLET_60',
    platform: 'ANDROID',
    sessionKey: sessionKey,
    longitude: 45.211918,
    latitude: 2.714806,
    postalCode: 63610,
    country: 'FR',
    deviceId: '',
  }
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&')
}

const requestMediaUrl = media => ({
  type: types.REQUEST_MEDIA_URL,
  media,
})

const receiveMediaUrl = json => ({
  type: types.RECEIVE_MEDIA_URL,
  url: json
    .user_verified_event[0]
    .user_verified_content[0]
    .user_verified_media_item[0]
    .url,
})