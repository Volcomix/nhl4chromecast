import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import { List, ListItem } from 'material-ui/List'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import GameRow from './GameRow'

class Games extends Component {
  state = {
    isDialogOpen: false,
    game: undefined,
  }

  render() {
    const { isFetching, games, onGamePressed } = this.props
    const { game } = this.state
    let title, media
    if (game !== undefined) {
      const away = game.teams.away.team
      const home = game.teams.home.team
      title = `${away.teamName} @ ${home.teamName}`
      media = game.content.media.epg.find(media => media.title === 'NHLTV')
    }
    return (
      <div style={styles.container}>
        {isFetching ?
          <CircularProgress /> :
          <List style={styles.list}>
            {games.map(game => (
              <GameRow
                key={game.gamePk}
                game={game}
                onGamePressed={this.handleGamePressed}
              />
            ))}
          </List>
        }
        <Dialog
          title={title}
          contentStyle={styles.dialog}
          actionsContainerStyle={styles.actions}
          actions={[<FlatButton
            label="Annuler"
            primary={true}
            onTouchTap={this.handleDialogClosed}
          />]}
          open={this.state.isDialogOpen}
          onRequestClose={this.handleDialogClosed}
        >
          <List>
            {media && media.items.map(feed => (
              <ListItem key={feed.guid} primaryText={this.formatFeed(feed)} />
            ))}
          </List>
        </Dialog>
      </div>
    )
  }

  handleGamePressed = game => {
    this.setState({ isDialogOpen: true, game })
  }

  handleDialogClosed = () => {
    this.setState({ isDialogOpen: false })
  }

  formatFeed = ({ feedName, mediaFeedType, callLetters }) => {
    if (feedName) {
      return feedName
    } else {
      let name = mediaFeedType[0] + mediaFeedType.slice(1).toLowerCase()
      if (callLetters) {
        return `${name} (${callLetters})`
      } else {
        return name
      }
    }
  }
}

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
    maxWidth: 400,
  },
  dialog: {
    maxWidth: 400,
    textAlign: 'center',
  },
  actions: {
    textAlign: 'center',
  },
}

export default Games