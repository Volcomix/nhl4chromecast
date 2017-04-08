import { combineReducers } from 'redux'

import navigation from './navigation'
import games from './games'

const appReducer = combineReducers({
  navigation,
  games,
})

export default appReducer