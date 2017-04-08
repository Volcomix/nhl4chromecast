import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { formatFeed } from '../utils/gameUtils'

class VideoScreen extends Component {
  static navigationOptions = {
    title: 'Vidéo',
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
          <Text>
            {url}
          </Text>
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
})

const mapStateToProps = ({ media }) => ({
  isFetching: media.isFetching,
  info: media.info,
  url: media.url,
})

export default connect(mapStateToProps)(VideoScreen)