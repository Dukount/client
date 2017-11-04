import { combineReducers } from "redux"

import foodReducer from './foodReducer'
import calendar from './calendarReducer'

const rootReducer = combineReducers({
  date: calendar,
  price: foodReducer
})

export default rootReducer
