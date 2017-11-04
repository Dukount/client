import { StackNavigator } from 'react-navigation'

import Calendar from '../components/Calendar'
import FoodResult from '../components/FoodResult'
import FoodDetail from '../components/FoodDetail'

const Navigation = StackNavigator({
  CalendarScreen: { screen: Calendar },
  FoodResultScreen: { screen: FoodResult },
  FoodDetailScreen: { screen: FoodDetail }
}, {
  initialRouteName: 'CalendarScreen'
})

export default Navigation
