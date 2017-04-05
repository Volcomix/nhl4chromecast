import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import moment from 'moment'
import 'moment/locale/fr'

import gamesReducer from './reducers/games'
import Games from './containers/Games'
import Video from './containers/Video'

moment.locale('fr')

class NHL4Chromecast extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

const AppNavigator = StackNavigator(
  {
    Games: { screen: Games },
    Video: { screen: Video },
  },
  {
    initialRouteParams: {
      date: moment().subtract(1, 'day')
    }
  }
)

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state)
  return (newState ? newState : state)
}

const appReducer = combineReducers({
  nav: navReducer,
  games: gamesReducer,
})

const store = createStore(appReducer, applyMiddleware(thunk))

class AppWithNavigationState extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    )
  }
}

AppWithNavigationState = connect(state => ({
  nav: state.nav
}))(AppWithNavigationState)

AppRegistry.registerComponent('nhl4chromecast', () => NHL4Chromecast)
