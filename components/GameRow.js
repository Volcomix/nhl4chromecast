import React from 'react'
import { ListItem } from 'material-ui/List'

const GameRow = ({ game }) => {
  const away = game.teams.away.team
  const home = game.teams.home.team
  return (
    <ListItem
      innerDivStyle={styles.container}
      leftIcon={<img src={`img/${away.abbreviation.toLowerCase()}.png`} />}
      rightIcon={<img src={`img/${home.abbreviation.toLowerCase()}.png`} />}
    >
      <div style={styles.teamNames}>
        <span>{away.name}</span>
        <span>{home.name}</span>
      </div>
    </ListItem>
  )
}

const styles = {
  container: {
    padding: '16px 56px',
  },
  teamNames: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default GameRow