import React, { Component } from 'React'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

import { fetchGames } from '../actions/games'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    const yesterday = moment().subtract(1, 'day')
    dispatch(fetchGames(yesterday))
  }

  render() {
    const { isFetching, gamesCount } = this.props
    return (
      <View style={styles.container}>
        <Text>
          {isFetching ? 'Fetching' : `Received ${gamesCount} games`}
        </Text>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  gamesCount: state.items.length
})

export default connect(mapStateToProps)(App)