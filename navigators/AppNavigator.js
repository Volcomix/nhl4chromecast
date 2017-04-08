import { StackNavigator } from 'react-navigation'
import moment from 'moment'

import GamesContainer from '../containers/GamesContainer'
import Video from '../containers/Video'
import Login from '../containers/Login'

const AppNavigator = StackNavigator(
  {
    Games: { screen: GamesContainer },
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