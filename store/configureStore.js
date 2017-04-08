import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import appReducer from '../reducers'

const configureStore = preloadedState => createStore(
  appReducer,
  preloadedState,
  applyMiddleware(thunk)
)

export default configureStore