import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import GamesScreen from './GamesScreen'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={GamesScreen} />
    </div>
  </Router>
)

export default App