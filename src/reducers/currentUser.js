const USER_SIGNED_IN ='USER_SIGNED_IN'
const USER_SIGNED_OUT = 'USER_SIGNED_OUT'
const AUTH_ERROR = 'AUTH_ERROR'

const USER_INFO_KEY = 'mastermind-ui-user'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case USER_SIGNED_IN :
      // Save the user info (the JWT auth token is saved by feathers-authentication-client)
      const {_id, email} = payload
      window.localStorage.setItem(USER_INFO_KEY, JSON.stringify({_id, email}))
      return Object.assign({}, {_id, email})
    case AUTH_ERROR :
      console.warn("Clearing the user info key due to AUTH_ERROR")
      window.localStorage.removeItem(USER_INFO_KEY)
      return null
    case USER_SIGNED_OUT :
      window.localStorage.removeItem(USER_INFO_KEY)
      return null
    default :
      return state
  }
}
