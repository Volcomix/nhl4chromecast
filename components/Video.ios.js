import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
} from 'react-native'

class Video extends Component {
  render() {
    const { isFetching, game, onWatchPressed } = this.props
    const away = game.teams.away.team
    const home = game.teams.home.team
    return (
      <View style={styles.container}>
        <Text>
          {`${away.name} @ ${home.name}`}
        </Text>
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <Button
            title='Regarder'
            onPress={onWatchPressed}
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
})

export default Video