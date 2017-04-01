import React, { Component } from 'React'
import { connect } from 'react-redux'
import moment from 'moment'
import { View, ActivityIndicator, ListView, StyleSheet } from 'react-native'

import { fetchGames } from '../actions/games'
import GameRow from '../components/GameRow'

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
    const { isFetching, games } = this.props
    return (
      <View style={styles.container}>
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <ListView
            dataSource={games}
            enableEmptySections={true}
            renderRow={game => <GameRow game={game} />}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
})

const gamesDataSource = new ListView.DataSource({
  rowHasChanged: (game1, game2) => game1.gamePk !== game2.gamePk
})

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  games: gamesDataSource.cloneWithRows(state.items)
})

export default connect(mapStateToProps)(App)