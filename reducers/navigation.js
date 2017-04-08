import { NavigationActions } from 'react-navigation'

import * as types from '../constants/actionTypes'
import AppNavigator from '../navigators/AppNavigator'

const navigation = (state, action) => {
  switch (action.type) {
    case types.REQUEST_GAMES: return requestGames(state, action)
    case types.ASK_LOGIN: return askLogin(state, action)
    case types.REQUEST_MEDIA_URL: return showMedia(state)
    case types.RECEIVE_USER_TOKEN: return receiveUserToken(state, action)
    default: return defaultState(state, action)
  }
}

const requestGames = (state, action) => (
  AppNavigator.router.getStateForAction(
    NavigationActions.setParams({
      params: { date: action.date },
      key: state.routes[0].key,
    }),
    state
  )
)

const askLogin = (state, action) => (
  AppNavigator.router.getStateForAction(
    NavigationActions.navigate({ routeName: 'Login' }),
    state
  )
)

const showMedia = (state, action) => (
  AppNavigator.router.getStateForAction(
    NavigationActions.navigate({ routeName: 'Video' }),
    state
  )
)

const receiveUserToken = (state, action) => {
  if (action.media === undefined) {
    return defaultState(state, action)
  } else {
    return showMedia(state, action)
  }
}

const defaultState = (state, action) => (
  AppNavigator.router.getStateForAction(action, state)
)

export default navigation