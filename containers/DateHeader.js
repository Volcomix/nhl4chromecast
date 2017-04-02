import React, { Component } from 'React'
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  DatePickerIOS,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import { keyColor, headerHeight } from '../constants/styles'
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
              {this.props.date.format('ddd Do MMM')}
            </Text>,
            <TouchableOpacity
              key='date'
              style={styles.rightButton}
              onPress={this.fetchGames}
            >
              <Text style={[styles.text, styles.title, styles.button]}>
                {this.state.date.format('D MMM')}
              </Text>
            </TouchableOpacity>
          ] :
            <TouchableOpacity onPress={this.showDatePicker}>
              <Text style={[styles.text, styles.title, styles.button]}>
                {this.props.date.format('dddd Do MMMM')}
              </Text>
            </TouchableOpacity>
          }
        </View>
        {isDatePickerVisible ? (
          <DatePickerIOS
            mode='date'
            date={this.state.date.toDate()}
            onDateChange={this.changeDate}
          />
        ) : undefined}
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

  fetchGames = () => {
    const { dispatch } = this.props
    dispatch(fetchGames(this.state.date))
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
})

const mapStateToProps = ({ date }) => ({
  date: date || moment(),
})

export default connect(mapStateToProps)(DateHeader)