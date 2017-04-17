import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from '../store/configureStore'
import GamesScreen from './GamesScreen'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <Route exact path="/" component={GamesScreen} />
      </Router>
    </MuiThemeProvider>
  </Provider>
)

export default App