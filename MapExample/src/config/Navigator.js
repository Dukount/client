import {
  StackNavigator
} from 'react-navigation'

import Home from '../components/Home'
import DragFrom from '../components/DragFrom'
import DragTo from '../components/DragTo'
import Search from '../components/Search'
import Trafi from '../components/Trafi'
import Uber from '../components/Uber'

const Navigator = StackNavigator(
  {
    Home: {screen: Home},
    DragFrom: {screen: DragFrom},
    DragTo: {screen: DragTo},
    Search: {screen: Search},
    Trafi: {screen: Trafi},
    Uber: {screen: Uber}
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
