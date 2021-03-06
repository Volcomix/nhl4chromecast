import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  DatePickerIOS,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import { keyColor, headerHeight, actionBarHeight } from '../constants/styles'
import { fetchGames } from '../actions/games'

class DateHeader extends Component {

  state = {
    isDatePickerVisible: false,
    date: moment(),
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.date.isSame(this.props.date)) {
      this.setState({ date: nextProps.date })
    }
  }

  render() {
    const { isDatePickerVisible } = this.state
    let previousDate, nextDate
    if (!isDatePickerVisible) {
      const { date } = this.props
      previousDate = moment(date).subtract(1, 'day')
      nextDate = moment(date).add(1, 'day')
    }
    return (
      <View style={styles.container}>
        <View style={styles.appBar}>
          {isDatePickerVisible ? [
            <TouchableOpacity
              key='cancel'
              style={styles.leftButton}
              onPress={this.hideDatePicker}
            >
              <Text style={[styles.text, styles.button]}>
                Annuler
              </Text>
            </TouchableOpacity>,
            <Text
              key='title'
              style={[styles.text, styles.title]}
            >
              {this.props.date.format('dddd D MMM')}
            </Text>,
            <TouchableOpacity
              key='title-date'
              style={styles.rightButton}
              onPress={this.fetchSelectedGames}
            >
              <Text style={[styles.text, styles.title, styles.button]}>
                {this.state.date.format('D MMM')}
              </Text>
            </TouchableOpacity>
          ] : [
              <TouchableOpacity
                key='previous-date'
                style={styles.leftIcon}
                onPress={this.fetchPreviousGames}
              >
                <Image
                  style={styles.icon}
                  source={require('../img/left.png')}
                />
              </TouchableOpacity>,
              <TouchableOpacity
                key='title-button'
                onPress={this.showDatePicker}
              >
                <Text style={[styles.text, styles.title, styles.button]}>
                  {this.props.date.format('dddd D MMM')}
                </Text>
              </TouchableOpacity>,
              <TouchableOpacity
                key='next-date'
                style={styles.rightIcon}
                onPress={this.fetchNextGames}
              >
                <Image
                  style={[styles.icon, styles.mirrorX]}
                  source={require('../img/left.png')}
                />
              </TouchableOpacity>,
            ]}
        </View>
        {isDatePickerVisible ? [
          <DatePickerIOS
            key='date-picker'
            mode='date'
            date={this.state.date.toDate()}
            onDateChange={this.changeDate}
          />,
          <View
            key='date-picker-options'
            style={styles.actionBar}
          >
            <TouchableOpacity onPress={this.fetchYesterdayGames}>
              <Text style={[styles.text, styles.button]}>
                Hier
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.fetchTodayGames}>
              <Text style={[styles.text, styles.button]}>
                Aujourd'hui
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.fetchTomorrowGames}>
              <Text style={[styles.text, styles.button]}>
                Demain
              </Text>
            </TouchableOpacity>
          </View>,
        ] : undefined}
      </View>
    )
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true })
  }

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false,
      date: this.props.date
    })
  }

  changeDate = (date) => {
    this.setState({ date: moment(date) })
  }

  fetchSelectedGames = () => {
    this.fetchGames(this.state.date)
  }

  fetchPreviousGames = () => {
    const date = moment(this.props.date).subtract(1, 'day')
    this.fetchGames(date)
  }

  fetchNextGames = () => {
    const date = moment(this.props.date).add(1, 'day')
    this.fetchGames(date)
  }

  fetchYesterdayGames = () => {
    const date = moment().subtract(1, 'day')
    this.fetchGames(date)
  }

  fetchTodayGames = () => {
    const date = moment()
    this.fetchGames(date)
  }

  fetchTomorrowGames = () => {
    const date = moment().add(1, 'day')
    this.fetchGames(date)
  }

  fetchGames = (date) => {
    const { dispatch } = this.props
    dispatch(fetchGames(date))
    this.hideDatePicker()
  }
}

const styles = StyleSheet.create({
  container: {
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
    position: 'absolute',
    left: 16,
    paddingTop: 20,
  },
  rightButton: {
    position: 'absolute',
    right: 16,
    paddingTop: 20,
  },
  actionBar: {
    height: actionBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  leftIcon: {
    position: 'absolute',
    left: 8,
    paddingTop: 20,
  },
  rightIcon: {
    position: 'absolute',
    right: 8,
    paddingTop: 20,
  },
  icon: {
    width: 13,
    height: 21,
    resizeMode: 'contain',
  },
  mirrorX: {
    transform: [{ scaleX: -1 }]
  }
})

const mapStateToProps = ({ games: { date } }) => ({
  date: date || moment(),
})

export default connect(mapStateToProps)(DateHeader)