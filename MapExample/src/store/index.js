import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import RootReducer from '../reducers'

const middleware = applyMiddleware(logger, thunk )
const store = createStore(RootReducer, middleware)

export default store
