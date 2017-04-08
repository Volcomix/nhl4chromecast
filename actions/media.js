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
      dispatch(loadMedia(media))
    }
  } catch (error) {
    console.error(error)
  }
}

const loadMedia = media => ({
  type: types.LOAD_MEDIA,
  media,
})