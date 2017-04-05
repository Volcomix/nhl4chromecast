import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

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
          {this.formatFeed(media)}
        </Text>
      </View>
    )
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    alignItems: 'center',
  },
})

export default Video