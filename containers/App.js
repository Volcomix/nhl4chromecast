import React, { Component } from 'React'
import { connect } from 'react-redux'
import moment from 'moment'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

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
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <Text>Received {gamesCount} games</Text>
        }
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
})

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  gamesCount: state.items.length
})

export default connect(mapStateToProps)(App)