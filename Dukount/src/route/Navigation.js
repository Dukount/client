import { StackNavigator } from 'react-navigation'

import Home from '../components/Home'
import Calendar from '../components/Calendar'
import TempResult from '../components/TempResult'
import FoodDetail from '../components/FoodDetail'
import FromLocation from '../components/Maps/FromLocation'
import ToLocation from '../components/Maps/ToLocation'
import PublicTransport from '../components/Maps/PublicTransport'
import Uber from '../components/Maps/Uber'
import FinalResult from '../components/FinalResult'
import Login from '../components/Login'
import Register from '../components/Register'


const Navigation = StackNavigator({
  Home: { screen: Home },
  CalendarScreen: { screen: Calendar },
  TempResultScreen: { screen: TempResult },
  FoodDetailScreen: { screen: FoodDetail },
  FromLocation: {screen: FromLocation},
  ToLocation: {screen: ToLocation},
  PublicTransport: {screen: PublicTransport},
  UberTransport: {screen: Uber},
  FinalResult: {screen: FinalResult},
  Login: {screen: Login},
  Register: {screen: Register},
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
})


export default Navigation
