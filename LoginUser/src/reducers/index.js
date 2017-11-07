import { combineReducers } from "redux"

import userReducer from './userReducer'
import reducerRealm from './realmReducer'

const rootReducer = combineReducers({
  userReducer,
  reducerRealm
})

export default rootReducer
