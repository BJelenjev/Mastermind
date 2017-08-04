import APIClient from '../api/client'
import {history} from '../store'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'
export const USER_SIGNIN_REJECTED = 'USER_SIGNIN_REJECTED'


export default (inputProperties) => {
  return (dispatch) => {
    const {email, password} = inputProperties
    const client = new APIClient()
    client.authenticate({email, password}).then((result) => {
      dispatch({type: USER_SIGNED_IN, payload: {_id: result._id, email:  result.email }})
      history.push('/')
    }).catch((error) => {
      dispatch({type: USER_SIGNIN_REJECTED, payload: error.toString()})
    })
  }
}
