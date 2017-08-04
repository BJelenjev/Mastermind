import APIClient, { FEATHERS_AUTH_TOKEN_KEY } from '../api/client'
import jwtDecode from 'jwt-decode'

export const MAINTAIN_AUTH_REQUESTED = 'MAINTAIN_AUTH_REQUESTED'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_MAINTAINED = 'AUTH_MAINTAINED'

export default function() {
  return (dispatch) => {
    dispatch({type: MAINTAIN_AUTH_REQUESTED})
    const client = new APIClient()
    client.app.authenticate({storageKey: FEATHERS_AUTH_TOKEN_KEY }).then((authResult) => {
      dispatch({type: AUTH_MAINTAINED})
      // Repopulate currentUser with stuff...
      // const tokenStr = authResult.token
      // const userId =   jwtDecode(tokenStr).userId
      // console.log(userId)
      // dispatch({type: USER_SIGNED_IN, payload: {via:    'signIn', _id: result._id, email:  result.email }})
    }).catch((error) => {
      dispatch({type: AUTH_ERROR,         payload: error.toString()})
    })
  }
}
