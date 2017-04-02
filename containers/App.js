import React, { Component } from 'React'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import { fetchGames } from '../actions/games'
import DateHeader from './DateHeader'
import Games from './Games'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    const yesterday = moment().subtract(1, 'day')
    dispatch(fetchGames(yesterday))
  }

  render() {
    return (
      <View style={styles.container}>
        <DateHeader />
        <Games />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(App)