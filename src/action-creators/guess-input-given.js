import APIClient, { FEATHERS_AUTH_TOKEN_KEY } from '../api/client'

export const GUESS_INPUT_GIVEN = 'GUESS_INPUT_GIVEN'
export const GUESS_REJECTED_BY_SERVER = 'GUESS_REJECTED_BY_SERVER'
export const GUESS_ACCEPTED_BY_SERVER = 'GUESS_ACCEPTED_BY_SERVER'
export const AUTH_ERROR = 'AUTH_ERROR'

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export default (gameId, combination) => {
  return (dispatch) => {
    dispatch({type: GUESS_INPUT_GIVEN, combination})
    
    const client = new APIClient()
    
    client.app.authenticate({storageKey: FEATHERS_AUTH_TOKEN_KEY }).then(() => {
      client.games().patch(gameId, {guess: combination}).then((result) => {
        dispatch({type: GUESS_ACCEPTED_BY_SERVER}) // Sending the guess to the UI is handled by push
      }).catch((error) => {
        dispatch({type: GUESS_REJECTED_BY_SERVER, payload: error.toString()})
      })
    }).catch((error) => {
        dispatch({type: AUTH_ERROR,               payload: error.toString()})
        dispatch({type: GUESS_REJECTED_BY_SERVER, payload: error.toString()})
    })
  }
}

