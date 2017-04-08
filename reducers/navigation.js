import { NavigationActions } from 'react-navigation'

import * as types from '../constants/actionTypes'
import AppNavigator from '../navigators/AppNavigator'

const navigation = (state, action) => {
  switch (action.type) {
    case types.REQUEST_GAMES: return requestGames(state, action)
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

const defaultState = (state, action) => (
  AppNavigator.router.getStateForAction(action, state)
)

export default navigation