import APIClient from '../api/client'
import history from '../store'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const enableLoadingState = function(){}
const disableLoadingState = function(){}

const client = new APIClient()

export default (inputProperties) => {
  return (dispatch) => {
    enableLoadingState()
    const {email, password} = inputProperties
    client.authenticate({email, password}).then((result) => {
        dispatch({type: USER_SIGNED_IN, payload: {via: 'signIn', userId: result._id, email:result.email}})
        history.push('/')
        disableLoadingState()
      })
      .catch((error) => {
        console.error(error)
        disableLoadingState()
      })
  }
}
