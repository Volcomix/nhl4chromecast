import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { List } from 'material-ui/List'

import GameRow from './GameRow'

const Games = ({ isFetching, games, onMediaSelected }) => (
  <div style={styles.container}>
    {isFetching ?
      <CircularProgress /> :
      <List style={styles.list}>
        {games.map(game => (
          <GameRow key={game.gamePk} game={game} />
        ))}
      </List>
    }
  </div>
)

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 56,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'auto',
  },
  list: {
    flex: 1,
    alignSelf: 'flex-start',
    maxWidth: 600,
  },
}

export default Games