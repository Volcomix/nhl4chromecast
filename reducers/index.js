import { combineReducers } from 'redux'

import navigation from './navigation'
import authorization from './authorization'
import games from './games'

const appReducer = combineReducers({
  navigation,
  authorization,
  games,
})

export default appReducer