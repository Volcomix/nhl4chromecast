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
    const { isFetching, info, url } = this.props
    return (
      <View style={styles.container}>
        <Text>
          {formatFeed(info)}
        </Text>
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <Button
            title='Regarder'
            onPress={() => GoogleCast.loadMedia({
              title: formatFeed(info),
              subtitle: 'Sous-titre',
              url,
              contentType: 'video/m3u8',
              duration: 0,
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

const mapStateToProps = ({ media }) => ({
  isFetching: media.isFetching,
  info: media.info,
  url: media.url,
})

export default connect(mapStateToProps)(VideoScreen)