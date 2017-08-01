const INITIAL_GAME_STATE = {
  guesses: [],
}
export default {
  currentGame: (currentGame = INITIAL_GAME_STATE, {type, payload}) => {
    return Object.assign({}, currentGame)
  }
} // empty for now!
