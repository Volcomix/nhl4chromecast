import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import moment from 'moment'
import 'moment/locale/fr'

import configureStore from './store/configureStore'
import App from './containers/App'

moment.locale('fr')

class NHL4Chromecast extends Component {
  store = configureStore()

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('nhl4chromecast', () => NHL4Chromecast)
