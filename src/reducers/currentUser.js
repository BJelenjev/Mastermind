const USER_SIGNED_IN ='USER_SIGNED_IN'
const USER_SIGNED_OUT = 'USER_SIGNED_OUT'
const AUTH_ERROR = 'AUTH_ERROR'

const FEATHERS_TOKEN_KEY = 'mastermind-ui'

const currentUser = JSON.parse(window.localStorage.getItem(FEATHERS_TOKEN_KEY) || 'null')

export default (state = currentUser, { type, payload } = {}) => {
  switch (type) {
    case USER_SIGNED_IN :
      window.localStorage.setItem(FEATHERS_TOKEN_KEY, JSON.stringify(payload))
      return Object.assign({}, payload)

    case AUTH_ERROR :
    case USER_SIGNED_OUT :
      window.localStorage.removeItem(FEATHERS_TOKEN_KEY)
      return null

    default :
      return state
  }
}
