import { combineReducers } from "redux"

import foodReducer from './foodReducer'
import calendar from './calendarReducer'
import MapReducer from './MapReducer'

const rootReducer = combineReducers({
  MapReducer,
  date: calendar,
  price: foodReducer
})

export default rootReducer
