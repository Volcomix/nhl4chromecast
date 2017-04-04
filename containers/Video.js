import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { keyColor, headerHeight } from '../constants/styles'

class Video extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.appBar}>
            <TouchableOpacity
              style={styles.leftIcon}
              onPress={this.showGames}
            >
              <View style={styles.leftButton}>
                <Image
                  style={styles.icon}
                  source={require('../img/left.png')}
                />
                <Text style={[
                  styles.text,
                  styles.button,
                  styles.leftButtonText
                ]}>
                  Retour
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={[styles.text, styles.title]}>Vidéo</Text>
          </View>
        </View>
      </View>
    )
  }

  showGames = () => {
    const { dispatch } = this.props
    dispatch(NavigationActions.navigate({ routeName: 'Home' }))
  }
}

const styles = StyleSheet.create({
  container: {
  },
  header: {
    backgroundColor: 'rgba(247, 247, 247, 0.96)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  appBar: {
    height: headerHeight,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
  },
  title: {
    fontWeight: '600',
  },
  button: {
    color: keyColor,
  },
  leftButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButtonText: {
    paddingLeft: 7,
  },
  leftIcon: {
    position: 'absolute',
    left: 8,
    paddingTop: 20,
  },
  icon: {
    width: 13,
    height: 21,
    resizeMode: 'contain',
  },
})

export default connect()(Video)