import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { formatFeed } from '../utils/gameUtils'

class Video extends Component {
  static navigationOptions = {
    title: 'Vidéo',
  }

  render() {
    const { params: { game, media } } = this.props.navigation.state
    const { teams: { away: { team: away }, home: { team: home } } } = game
    return (
      <View style={styles.container}>
        <Text>
          {away.name} - {home.name}
        </Text>
        <Text>
          {formatFeed(media)}
        </Text>
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

export default Video