import React, { Component } from 'React'
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native'

import teamsImages from '../constants/teamsImages'
import { touchableUnderlayColor, touchableOpacity } from '../constants/styles'

class GameRow extends Component {
  render() {
    const { game } = this.props
    const { teams: { away: { team: away }, home: { team: home } } } = game
    const awayImage = teamsImages[away.abbreviation.toLowerCase()]
    const homeImage = teamsImages[home.abbreviation.toLowerCase()]
    return (
      <TouchableHighlight
        underlayColor={touchableUnderlayColor}
        activeOpacity={touchableOpacity}
        onPress={() => { }}
      >
        <View style={styles.container}>
          <View style={styles.away}>
            <Image style={styles.image} source={awayImage} />
            <Text style={styles.text}>{away.teamName}</Text>
          </View>
          <View style={styles.home}>
            <Text style={styles.text}>{home.teamName}</Text>
            <Image style={styles.image} source={homeImage} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingLeft: 8,
    paddingRight: 8,
  },
  away: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  home: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
})

export default GameRow