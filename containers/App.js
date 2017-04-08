import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import AppNavigator from '../navigators/AppNavigator'

class App extends React.Component {
  render() {
    const { dispatch, navigation } = this.props
    return (
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state: navigation })}
      />
    )
  }
}

const mapStateToProps = ({ navigation }) => ({
  navigation,
})

export default connect(mapStateToProps)(App)