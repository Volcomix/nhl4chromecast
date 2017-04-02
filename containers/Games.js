import React, { Component } from 'React'
import { View, ActivityIndicator, ListView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import GameRow from '../components/GameRow'
import { headerHeight } from '../constants/styles'

class Games extends Component {
  render() {
    const { isFetching, games } = this.props
    return (
      <View style={styles.container}>
        {isFetching ?
          <ActivityIndicator size='large' /> :
          <ListView
            contentInset={{ top: headerHeight }}
            contentOffset={{ y: -headerHeight }}
            dataSource={games}
            renderRow={game => <GameRow game={game} />}
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

const gamesDataSource = new ListView.DataSource({
  rowHasChanged: (game1, game2) => game1.gamePk !== game2.gamePk
})

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  games: gamesDataSource.cloneWithRows(state.items),
})

export default connect(mapStateToProps)(Games)