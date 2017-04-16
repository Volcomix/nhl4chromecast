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
    const { isFetching, title } = this.props
    return (
      <Video isFetching={isFetching} title={title} onWatchPressed={this.loadMedia} />
    )
  }

  loadMedia = () => {
    const { title, game, info, url, userToken } = this.props
    GoogleCast.loadMedia({
      title,
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
  const away = media.game.teams.away.team
  const home = media.game.teams.home.team
  return {
    isFetching: media.isFetching,
    title: `${away.teamName} @ ${home.teamName}`,
    game: media.game,
    info: media.info,
    url: media.url,
    userToken: authorization.userToken,
  }
}

export default connect(mapStateToProps)(VideoScreen)