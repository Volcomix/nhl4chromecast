import { StackNavigator } from 'react-navigation'
import moment from 'moment'

import GamesScreen from '../containers/GamesScreen'
import LoginScreen from '../containers/LoginScreen'
import VideoScreen from '../containers/VideoScreen'

const AppNavigator = StackNavigator(
  {
    Games: { screen: GamesScreen },
    Login: { screen: LoginScreen },
    Video: { screen: VideoScreen },
  },
  {
    initialRouteParams: {
      date: moment().subtract(1, 'day')
    }
  }
)

export default AppNavigator