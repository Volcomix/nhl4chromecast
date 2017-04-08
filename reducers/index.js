import { combineReducers } from 'redux'

import navigation from './navigation'
import authorization from './authorization'
import games from './games'
import media from './media'

const appReducer = combineReducers({
  navigation,
  authorization,
  games,
  media,
})

export default appReducer