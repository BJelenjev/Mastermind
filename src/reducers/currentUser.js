const USER_SIGNED_IN ='USER_SIGNED_IN'
const USER_SIGNED_OUT = 'USER_SIGNED_OUT'
const AUTH_ERROR = 'AUTH_ERROR'

const USER_INFO_KEY = 'mastermind-ui-user'
const currentUser = JSON.parse(window.localStorage.getItem(USER_INFO_KEY) || 'null')

export default (state = currentUser, { type, payload } = {}) => {
  switch (type) {
  case USER_SIGNED_IN :
      // Save the user info (the JWT auth token is saved by feathers-authentication-client)
      const {userId, email} = payload
      window.localStorage.setItem(USER_INFO_KEY, JSON.stringify({userId, email}))
      return Object.assign({}, {userId, email})
    case AUTH_ERROR :
      // not handled actually...
    case USER_SIGNED_OUT :
      window.localStorage.removeItem(USER_INFO_KEY)
      return null

    default :
      return state
  }
}
