import { combineReducers } from "redux"

import foodReducer from './foodReducer'

const rootReducer = combineReducers({
  price: foodReducer
})

export default rootReducer