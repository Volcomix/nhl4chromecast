import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
  NativeModules,
} from 'react-native'
import { connect } from 'react-redux'

import CastButton from '../components/CastButton'
import { formatFeed } from '../utils/gameUtils'

const GoogleCast = NativeModules.GoogleCastManager

class VideoScreen extends Component {
  static navigationOptions = {
    header: () => ({
      title: 'Vidéo',
      right: <CastButton style={styles.castButton} />,
    }),
  }

  render() {
    const { isFetching, game, info, url, userToken } = this.props
    const away = game.teams.away.team
    const home = game.teams.home.team
    const title = `${away.teamName} @ ${home.teamName}`
    return (
      <View style={styles.container}>
        <Text>
          {title}
        </Text>
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <Button
            title='Regarder'
            onPress={() => GoogleCast.loadMedia({
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
            })}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    alignItems: 'center',
  },
  castButton: {
    width: 24,
    height: 24,
    margin: 16,
  },
})

const mapStateToProps = ({ authorization, media }) => ({
  isFetching: media.isFetching,
  game: media.game,
  info: media.info,
  url: media.url,
  userToken: authorization.userToken,
})

export default connect(mapStateToProps)(VideoScreen)