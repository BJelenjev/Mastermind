const GAME_JOINED = 'GAME_JOINED'

// https://gist.github.com/jed/982883
const uuid = function b(a){
  // this is code golf, so...
  // eslint-disable-next-line
  return a ? (a^Math.random()*16>>a/4).toString(16) : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
}

const INITIAL_GAME_STATE = {
  _id: uuid(),
  loss:    false,
  won:     false,
  started: false,
  colors: ["gray", "green", "red", "blue", "violet", "brown", "pink"],
  guesses: []
}

const GAME_UPDATED_PUSH = 'GAME_UPDATED_PUSH'
const GUESS_RECEIVED = 'GUESS_RECEIVED' // Used for mocked UI sans backend

const maybeUpdateGame = (currentGame, payload) => {
  if(currentGame._id === payload._id) {
    return Object.assign({}, currentGame, payload)
  } else {
    return currentGame
  }
}

export default (currentGame = INITIAL_GAME_STATE, {type, payload}) => {
  switch(type) {
    case GAME_JOINED :
      return Object.assign({}, payload)
    case GAME_UPDATED_PUSH :
      return maybeUpdateGame(currentGame, payload) // using a return to prevent fallthrough
    case GUESS_RECEIVED:
      const guesses = currentGame.guesses.concat(payload)
      return Object.assign({}, currentGame, {guesses})
    default:
      return currentGame
  }
}