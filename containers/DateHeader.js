import React, { Component } from 'React'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { keyColor, headerHeight } from '../constants/styles'

class DateHeader extends Component {
  render() {
    const { date } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.title}>
            {date && date.format('dddd Do MMMM')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(247, 247, 247, 0.96)',
    height: headerHeight,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: keyColor,
  },
})

const mapStateToProps = state => ({
  date: state.date,
})

export default connect(mapStateToProps)(DateHeader)