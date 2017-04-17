import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle,
} from 'material-ui/Toolbar'
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
      <div style={styles.container}>
        <Toolbar style={styles.toolbar} />
        <Games
          isFetching={isFetching}
          games={games}
          onMediaSelected={showMedia}
        />
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  toolbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    zIndex: 10,
  },
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