import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

const routingMiddleware = routerMiddleware(browserHistory)
const reducer = combineReducers({ ...reducers,  routing: routerReducer })

const devTools = window.devToolsExtension ? window.devToolsExtension() : (f) => f

const enhancer = compose(
  applyMiddleware(routingMiddleware),
  applyMiddleware(ReduxThunk),
  devTools
)

const store = createStore(reducer, enhancer)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
