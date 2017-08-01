import API from '../../api'
import { loading, loadError, loadSuccess } from '../loading'

export const USER_SIGNUP_REQUESTED = 'USER_SIGNUP_REQUESTED'
export const USER_SIGNUP_ACCEPTED = 'USER_SIGNUP_ACCEPTED'

const api = new API()

const enableLoadingState = function(){}
const disableLoadingState = function(){}

export default (newUserProperties) => {
  return (dispatch) => {
    enableLoadingState()
    api.service('users')
      .create(user)
        .then((result) => {
          console.log(result)
          dispatch({type: USER_SIGNUP_ACCEPTED, {email: newUserProperties.email, userId: result})
          disableLoadingState()
        }).catch((error) => {
          dispatch(loading(false))
          disableLoadingState()
        })
      })
  }
}

