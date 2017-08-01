import APIClient from '../api/client'

export const USER_SIGNUP_REQUESTED = 'USER_SIGNUP_REQUESTED'
export const USER_SIGNUP_ACCEPTED = 'USER_SIGNUP_ACCEPTED'
export const USER_SIGNUP_REJECTED = 'USER_SIGNUP_REJECTED'

const enableLoadingState = function(){}
const disableLoadingState = function(){}

export default (newUserProperties) => {
  return (dispatch) => {
    dispatch({type: USER_SIGNUP_REQUESTED, payload: newUserProperties})
    enableLoadingState()
    const client = new APIClient()
    
    console.log(client)
    
    client.users().create(newUserProperties).then((result) => {
      console.log(result)
      dispatch({type: USER_SIGNUP_ACCEPTED, payload: result})
      disableLoadingState()
    }).catch((error) => {
      dispatch({type: USER_SIGNUP_REJECTED, payload: error})
      disableLoadingState()
    })
  }
}

