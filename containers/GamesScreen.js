import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
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
    let { date, isFetching, games, fetchGames, showMedia } = this.props
    if (date === undefined) {
      date = moment().subtract(1, 'day')
    }
    const previousDate = moment(date).subtract(1, 'day')
    const nextDate = moment(date).add(1, 'day')
    return (
      <div style={styles.container}>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup>
            <FlatButton
              label={previousDate.format('D MMM')}
              primary={true}
              onTouchTap={() => fetchGames(previousDate)}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={date.format('dddd D MMMM')} />
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton
              label={nextDate.format('D MMM')}
              primary={true}
              onTouchTap={() => fetchGames(nextDate)}
            />
          </ToolbarGroup>
        </Toolbar>
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