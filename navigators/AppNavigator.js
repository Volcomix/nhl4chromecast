import { StackNavigator } from 'react-navigation'
import moment from 'moment'

import GamesScreen from '../containers/GamesScreen'
import Video from '../containers/Video'
import Login from '../containers/Login'

const AppNavigator = StackNavigator(
  {
    Games: { screen: GamesScreen },
    Video: { screen: Video },
    Login: { screen: Login },
  },
  {
    initialRouteParams: {
      date: moment().subtract(1, 'day')
    }
  }
)

export default AppNavigator