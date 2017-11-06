import { combineReducers } from "redux"

import foodReducer from './foodReducer'
import calendar from './calendarReducer'
import MapReducer from './MapReducer'
import salaryReducer from './salaryReducer'

const rootReducer = combineReducers({
  MapReducer,
  salaryReducer,
  date: calendar,
  price: foodReducer
})

export default rootReducer
