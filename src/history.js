import createHistory from 'history/createBrowserHistory'
import store from './store'

const myHistory = createHistory()
const originalPush = myHistory.push.bind(myHistory)
myHistory.push = (url, ...rest) => {
  const ret = originalPush.call(url, ...rest)
  store.dispatch({type: 'LOCATION_CHANGED', payload: url})
  return ret
}

//export default myHistory

export default createHistory()
