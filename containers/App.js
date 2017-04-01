import React, { Component } from 'React'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ListView,
  Text,
  Image,
} from 'react-native'

import { fetchGames } from '../actions/games'
import teamsImages from '../constants/teamsImages'

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
            renderRow={this.renderGame}
          />
        }
      </View>
    )
  }

  renderGame = game => {
    const { teams: { away: { team: away }, home: { team: home } } } = game
    const awayImage = teamsImages[away.abbreviation.toLowerCase()]
    const homeImage = teamsImages[home.abbreviation.toLowerCase()]
    return (
      <View style={styles.game}>
        <Image source={awayImage} />
        <Text>{away.teamName}</Text>
        <Text>{home.teamName}</Text>
        <Image source={homeImage} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingTop: 24,
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 4,
  },
  game: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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