import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Games from '../components/Games'
import { fetchGames } from '../actions/games'
//import { showMedia } from '../actions/media'

class GamesScreen extends Component {

  componentDidMount() {
    const { fetchGames, date } = this.props
    if (date === undefined) {
      const yesterday = moment().subtract(1, 'day')
      fetchGames(yesterday)
    }
  }

  render() {
    const { isFetching, games, showMedia } = this.props
    return (
      <Games isFetching={isFetching} games={games} onMediaSelected={showMedia} />
    )
  }
}

const mapStateToProps = ({ games }) => ({
  isFetching: games.isFetching,
  date: games.date,
  games: games.items,
})

export default connect(mapStateToProps, {
  fetchGames,
  //showMedia,
})(GamesScreen)