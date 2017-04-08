import React, { Component } from 'react'
import { View, ActivityIndicator, ListView, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import { fetchGames } from '../actions/games'
import GameRow from './GameRow'

class Games extends Component {
  static navigationOptions = {
    title: ({ state: { params: { date } } }) => date.format('dddd D MMM'),
    header: ({ state: { params: { date } }, dispatch }) => {
      const previousDate = moment(date).subtract(1, 'day')
      const nextDate = moment(date).add(1, 'day')
      return {
        left: (
          <Button
            title={previousDate.format('D MMM')}
            onPress={() => dispatch(fetchGames(previousDate))}
          />
        ),
        right: (
          <Button
            title={nextDate.format('D MMM')}
            onPress={() => dispatch(fetchGames(nextDate))}
          />
        ),
        backTitle: 'Retour',
      }
    },
  }

  componentDidMount() {
    const { dispatch, navigation: { state: { params } }, date } = this.props
    if (date === undefined) {
      dispatch(fetchGames(params.date))
    }
  }

  render() {
    const { isFetching, games } = this.props
    return (
      <View style={styles.container}>
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <ListView
            dataSource={games}
            renderRow={game => <GameRow game={game} />}
            enableEmptySections={true}
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
  },
})

const gamesDataSource = new ListView.DataSource({
  rowHasChanged: (game1, game2) => game1.gamePk !== game2.gamePk
})

const mapStateToProps = ({ games }) => ({
  isFetching: games.isFetching,
  date: games.date,
  games: gamesDataSource.cloneWithRows(games.items),
})

export default connect(mapStateToProps)(Games)