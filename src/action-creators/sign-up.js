import APIClient from '../api/client'
import {history} from '../store'
import signIn from './sign-in'

const USER_SIGNUP_REQUESTED = 'USER_SIGNUP_REQUESTED'
const USER_SIGNUP_ACCEPTED = 'USER_SIGNUP_ACCEPTED'
const USER_SIGNUP_REJECTED = 'USER_SIGNUP_REJECTED'
const USER_SIGNED_IN = 'USER_SIGNED_IN'

export default (newUserProperties) => {
  return (dispatch) => {
    dispatch({type: USER_SIGNUP_REQUESTED, payload: newUserProperties})
    const client = new APIClient()
    client.users().create(newUserProperties).then((result) => {
      dispatch({type: USER_SIGNUP_ACCEPTED})
      dispatch(signIn(newUserProperties))
      history.push('/')
    }).catch((error) => {
      dispatch({type: USER_SIGNUP_REJECTED, payload: error.toString()})
    })
  }
}

