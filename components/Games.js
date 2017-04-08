import React, { Component } from 'react'
import { View, ActivityIndicator, ListView, StyleSheet } from 'react-native'

import GameRow from './GameRow'

class Games extends Component {
  render() {
    const { isFetching, games, showMedia } = this.props
    return (
      <View style={styles.container}>
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <ListView
            dataSource={games}
            renderRow={game => (
              <GameRow game={game} showMedia={showMedia} />
            )}
            enableEmptySections={true}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default Games