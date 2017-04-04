import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import {
  addNavigationHelpers,
  createNavigationContainer,
  createNavigator,
  StackRouter,
} from 'react-navigation'
import moment from 'moment'
import 'moment/locale/fr'

import gamesReducer from './reducers/games'
import App from './containers/App'
import Video from './containers/Video'

moment.locale('fr')

class NHL4Chromecast extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

class AppNavigator extends Component {
  render() {
    return (
      <CustomNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    )
  }
}

AppNavigator = connect(state => ({ nav: state.nav }))(AppNavigator)

const CustomView = ({
  router,
  navigation,
}) => {
  const { routes, index } = navigation.state
  const ActiveScreen = router.getComponentForState(navigation.state)
  return (
    <ActiveScreen
      navigation={addNavigationHelpers({
        ...navigation,
        state: routes[index],
      })}
    />
  )
}

const CustomNavigator = createNavigationContainer(
  createNavigator(StackRouter({
    Home: { screen: App },
    Video: { screen: Video },
  }))(CustomView)
)

const navReducer = (state, action) => {
  const newState = CustomNavigator.router.getStateForAction(action, state)
  return newState || state
}

const appReducer = combineReducers({
  nav: navReducer,
  games: gamesReducer,
})

const store = createStore(appReducer, applyMiddleware(thunk))

AppRegistry.registerComponent('nhl4chromecast', () => NHL4Chromecast)
