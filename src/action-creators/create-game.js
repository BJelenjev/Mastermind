import APIClient, { FEATHERS_AUTH_TOKEN_KEY } from '../api/client'
import {history} from '../store'
import joinGame from './join-game'

const GAME_CREATION_REQUESTED = 'GAME_CREATION_REQUESTED'
const GAME_CREATION_REJECTED = 'GAME_CREATION_REJECTED'
const GAME_CREATED = 'GAME_CREATED'
const GAME_JOINED = 'GAME_JOINED'

export default (newUserProperties) => {
  return (dispatch) => {
    dispatch({type: GAME_CREATION_REQUESTED, payload: {}})
    const client = new APIClient()
    client.app.authenticate({ storageKey: FEATHERS_AUTH_TOKEN_KEY })
      .then(() => {
        client.games().create({}).then((result) => {
          dispatch({type: GAME_CREATED, payload: result})
          dispatch(joinGame(result._id))
          history.push('/')
        }).catch((error) => {
          dispatch({type: GAME_CREATION_REJECTED, payload: error})
        })
      })
      
  }
}
