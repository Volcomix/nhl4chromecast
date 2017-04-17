import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'

const GameRow = ({ game, onGamePressed }) => {
  const away = game.teams.away.team
  const home = game.teams.home.team
  return (
    <ListItem
      style={styles.container}
      innerDivStyle={styles.listItem}
      leftIcon={
        <img
          style={styles.image}
          src={`img/${away.abbreviation.toLowerCase()}.png`}
        />
      }
      rightIcon={
        <img
          style={styles.image}
          src={`img/${home.abbreviation.toLowerCase()}.png`}
        />
      }
      onTouchTap={onGamePressed}
    >
      <div style={styles.teamNames}>
        <span>{away.teamName}</span>
        <span>{home.teamName}</span>
      </div>
    </ListItem>
  )
}

const styles = {
  container: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  listItem: {
    padding: '16px 56px',
  },
  teamNames: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  image: {
    width: 32,
    height: 32,
    margin: 8,
  },
}

export default GameRow