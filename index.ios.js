import React, { Component } from 'React'
import { AppRegistry } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import moment from 'moment'
import 'moment/locale/fr'

import gamesReducer from './reducers/games'
import App from './containers/App'

moment.locale('fr')

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
