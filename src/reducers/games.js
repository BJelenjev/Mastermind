const GAME_CREATED = 'GAME_CREATED'
const GAME_CREATED_PUSH = 'GAME_CREATED_PUSH'
const GAME_UPDATED_PUSH = 'GAME_UPDATED_PUSH'
const GAMES_FETCHED = 'GAMES_FETCHED'

function upsert(games, game) {
  const ids = games.map((stored) => stored._id)
  if(ids.includes(game._id)) {   // Update
    return games.map((storedGame) => {
      if(storedGame._id === game._id) {
        return game
      } else {
        return storedGame
      }
    })
  } else { // Append
    return [].concat(games).concat([game])
  }
}
export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case GAMES_FETCHED :
      return [].concat(payload) // Replace the current state wholesale
    case GAME_CREATED :
      return upsert(state, payload)
    case GAME_CREATED_PUSH :
      return upsert(state, payload)
    case GAME_UPDATED_PUSH :
      return upsert(state, payload)
    default :
      return state
  }
}
