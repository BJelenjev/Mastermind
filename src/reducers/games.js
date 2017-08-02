const GAME_CREATED = 'GAME_CREATED'
const GAME_CREATED_PUSH = 'GAME_CREATED_PUSH'
const GAME_UPDATED_PUSH = 'GAME_UPDATED_PUSH'
const GAMES_FETCHED = 'GAMES_FETCHED'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case GAMES_FETCHED :
      return [].concat(payload) // Array of Game-shaped objects
    case GAME_CREATED :
      // do nothing, since the game that has been created just now is going
      // to be sent to us in a push update
      return state
    case GAME_CREATED_PUSH :
      return state.concat(payload)
    case GAME_UPDATED_PUSH :
      return state.map((localGame) => {
        if(localGame._id === payload._id) {
          return payload // from remote
        } else {
          return localGame
        }
      })
    default :
      return state
  }
}
