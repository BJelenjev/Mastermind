import API from '../api/client'

export const SUBSCRIBED_TO_GAMES_SERVICE = 'SUBSCRIBED_TO_GAMES_SERVICE'
export const GAME_CREATED_PUSH = 'GAME_CREATED_PUSH'
export const GAME_UPDATED_PUSH = 'GAME_UPDATED_PUSH'
export const GAME_REMOVED_PUSH = 'GAME_REMOVED_PUSH'
export const GAMES_FETCHED = 'GAMES_FETCHED'
export const GAMES_REQUESTED = "GAMES_REQUESTED"

const api = new API()
const games = api.games()

const updateCurrentGame = (gameProperties) => true
const updateGamesList = (gamesArray) => true
 
export default () => {
  return (dispatch) => {
    games.on('created', (game) => dispatch({type: GAME_CREATED_PUSH, payload: game}))
    games.on('updated', (game) => dispatch({type: GAME_UPDATED_PUSH, payload: game}))
    games.on('patched', (game) => dispatch({type: GAME_UPDATED_PUSH, payload: game}))
    games.on('removed', (game) => dispatch({type: GAME_REMOVED_PUSH, payload: game}))

    dispatch({type: SUBSCRIBED_TO_GAMES_SERVICE})

    // Retreive the game list imperatively to seed it with rows
    games.find().then((gameListPage) => {
      dispatch({type: GAMES_FETCHED, payload: gameListPage.data})
    }).catch((err) => {
      console.error(err)
    })
    dispatch({type: GAMES_REQUESTED})
  }
}
