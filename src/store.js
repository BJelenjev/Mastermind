import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import reducers from './reducers'
const reducer = combineReducers(reducers)

const devTools = window.devToolsExtension ? window.devToolsExtension() : (v) => v

const enhancer = compose(
  applyMiddleware(ReduxThunk),
  devTools
)

const store = createStore(reducer, enhancer)

export default store
