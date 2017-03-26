import React, { Component } from 'React'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'

import gamesReducer from './reducers/games'
import App from './containers/App'

class NHL4Chromecast extends Component {
  render() {
    const store = createStore(gamesReducer, applyMiddleware(thunk))
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('nhl4chromecast', () => NHL4Chromecast)
