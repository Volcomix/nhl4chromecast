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
    const { isFetching, title, onWatchPressed } = this.props
    return (
      <View style={styles.container}>
        <Text>
          {title}
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