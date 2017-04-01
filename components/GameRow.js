import React, { Component } from 'React'
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native'

import teamsImages from '../constants/teamsImages'

class GameRow extends Component {
  render() {
    const { game } = this.props
    const { teams: { away: { team: away }, home: { team: home } } } = game
    const awayImage = teamsImages[away.abbreviation.toLowerCase()]
    const homeImage = teamsImages[home.abbreviation.toLowerCase()]
    return (
      <TouchableHighlight onPress={() => { }}>
        <View style={styles.container}>
          <Image style={styles.image} source={awayImage} />
          <View style={styles.teamNames}>
            <Text style={styles.text}>{away.teamName}</Text>
            <Text style={styles.text}>{home.teamName}</Text>
          </View>
          <Image style={styles.image} source={homeImage} />
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7cc',
    paddingLeft: 4,
    paddingRight: 4,
  },
  teamNames: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 12,
    marginRight: 12,
  },
  text: {
    color: '#8e8e93'
  },
})

export default GameRow