import React, { Component } from 'react'
import { Button, ListView } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import Games from '../components/Games'
import { fetchGames } from '../actions/games'
import { showMedia } from '../actions/media'

class GamesScreen extends Component {
  static navigationOptions = {
    header: ({ state, dispatch }) => {
      const date = state.params.date
      const previousDate = moment(date).subtract(1, 'day')
      const nextDate = moment(date).add(1, 'day')
      return {
        title: date.format('dddd D MMM'),
        backTitle: 'Retour',
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
      }
    },
  }

  componentDidMount() {
    const { fetchGames, navigation, date } = this.props
    if (date === undefined) {
      fetchGames(navigation.state.params.date)
    }
  }

  render() {
    const { isFetching, games, showMedia } = this.props
    return (
      <Games isFetching={isFetching} games={games} onMediaSelected={showMedia} />
    )
  }
}

const gamesDataSource = new ListView.DataSource({
  rowHasChanged: (game1, game2) => game1.gamePk !== game2.gamePk
})

const mapStateToProps = ({ games }) => ({
  isFetching: games.isFetching,
  date: games.date,
  games: gamesDataSource.cloneWithRows(games.items),
})

export default connect(mapStateToProps, {
  fetchGames,
  showMedia,
})(GamesScreen)