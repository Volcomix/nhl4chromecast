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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    alignSelf: 'flex-start',
  },
}

export default Games