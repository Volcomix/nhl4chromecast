import { combineReducers } from 'redux'

import authorization from './authorization'
import games from './games'
import media from './media'

const appReducer = combineReducers({
  authorization,
  games,
  media,
})

export default appReducer