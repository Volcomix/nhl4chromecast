import React, { Component } from 'react'
import { StyleSheet, NativeModules } from 'react-native'
import { connect } from 'react-redux'

import CastButton from '../components/CastButton'
import Video from '../components/Video'

const GoogleCast = NativeModules.GoogleCastManager

class VideoScreen extends Component {
  static navigationOptions = {
    header: () => ({
      title: 'Vidéo',
      right: <CastButton style={styles.castButton} />,
    }),
  }

  render() {
    const { isFetching, game } = this.props
    return (
      <Video isFetching={isFetching} game={game} onWatchPressed={this.loadMedia} />
    )
  }

  loadMedia = () => {
    const { game, url, info, userToken } = this.props
    const away = game.teams.away.team
    const home = game.teams.home.team
    GoogleCast.loadMedia({
      title: `${away.teamName} @ ${home.teamName}`,
      thumbnailImageUrl: 'http://nhl.bamcontent.com/images/logos/400x400/chromecast/nhl.png',
      largeImageUrl: 'http://nhl.bamcontent.com/images/logos/1024x768/chromecast/nhl.png',
      url,
      contentType: 'video/mp4',
      duration: 0,
      customData: {
        authorization: userToken,
        contentId: game.gamePk,
        isLive: false,
        currentTime: 0,
        playbackContentId: info.mediaPlaybackId,
        playbackUrl: url,
      },
    })
  }
}

const styles = StyleSheet.create({
  castButton: {
    width: 24,
    height: 24,
    margin: 16,
  },
})

const mapStateToProps = ({ authorization, media }) => {
  return {
    isFetching: media.isFetching,
    game: media.game,
    url: media.url,
    info: media.info,
    userToken: authorization.userToken,
  }
}

export default connect(mapStateToProps)(VideoScreen)