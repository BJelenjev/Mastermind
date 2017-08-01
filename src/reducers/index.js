const INITIAL_GAME_STATE = {inProgress: false, guesses: []}
export default {
  currentGame: (currentGame = INITIAL_GAME_STATE, {type, payload}) => {
    switch(type) {
      case 'GUESS_RECEIVED':
        const guesses = currentGame.guesses.concat(payload)
        return Object.assign({}, currentGame, {guesses})
      default:
        return currentGame
    }
  }
}
