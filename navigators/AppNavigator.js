import { StackNavigator } from 'react-navigation'
import moment from 'moment'

import Games from '../containers/Games'
import Video from '../containers/Video'
import Login from '../containers/Login'

const AppNavigator = StackNavigator(
  {
    Games: { screen: Games },
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