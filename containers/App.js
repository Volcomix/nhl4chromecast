import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import GamesScreen from './GamesScreen'

const App = () => (
  <Router>
    <Route exact path="/" component={GamesScreen} />
  </Router>
)

export default App