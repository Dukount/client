import {
  StackNavigator
} from 'react-navigation'

import Home from '../components/Home'
import Drag from '../components/Drag'
import Search from '../components/Search'
import Combine from '../components/Combine'

const Navigator = StackNavigator(
  {
    Home: {screen: Home},
    Drag: {screen: Drag},
    Search: {screen: Search},
    Combine: {screen: Combine}
  }, {
    initialRouteName: 'Home'
  }, {
    tabBarOptions: {
      style: {
        marginTop: 24
      }
    }
  }
)

export default Navigator
