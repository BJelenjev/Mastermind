import APIClient from '../api/client'

const USER_SIGNUP_REQUESTED = 'USER_SIGNUP_REQUESTED'
const USER_SIGNUP_ACCEPTED = 'USER_SIGNUP_ACCEPTED'
const USER_SIGNUP_REJECTED = 'USER_SIGNUP_REJECTED'
const USER_SIGNED_IN = 'USER_SIGNED_IN'

const enableLoadingState = function(){}
const disableLoadingState = function(){}

export default (newUserProperties) => {
  return (dispatch) => {
    dispatch({type: USER_SIGNUP_REQUESTED, payload: newUserProperties})
    enableLoadingState()
    const client = new APIClient()
    
    console.log(client)
    
    client.users().create(newUserProperties).then((result) => {
      dispatch({type: USER_SIGNUP_ACCEPTED, payload: result})
      dispatch({type: USER_SIGNED_IN,       payload: {via: 'signUp', userId: result._id, email: result.email}})
      disableLoadingState()
    }).catch((error) => {
      dispatch({type: USER_SIGNUP_REJECTED, payload: error})
      disableLoadingState()
    })
  }
}

