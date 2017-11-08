import { combineReducers } from "redux"

import foodReducer from './foodReducer'
import calendar from './calendarReducer'
import MapReducer from './MapReducer'
import salaryReducer from './salaryReducer'
import listReducer from './listReducer'

const rootReducer = combineReducers({
  MapReducer,
  salaryReducer,
  date: calendar,
  price: foodReducer,
  listReducer
})

export default rootReducer
