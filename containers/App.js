import React, { Component } from 'React'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native'

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
    const { isFetching, games } = this.props
    return (
      <View style={styles.container}>
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <ListView
            dataSource={games}
            renderRow={game => (
              <View>
                <Text>{game.teams.away.team.name}</Text>
                <Text>{game.teams.home.team.name}</Text>
              </View>
            )}
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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