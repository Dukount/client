import { combineReducers } from "redux"

import foodReducer from './foodReducer'
import calendarReducer from './calendarReducer'

const rootReducer = combineReducers({
  price: foodReducer,
  date: calendarReducer
})

export default rootReducer
