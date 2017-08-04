import APIClient, { FEATHERS_AUTH_TOKEN_KEY } from '../api/client'

import {history} from '../store'

export const GAME_JOIN_REQUESTED = 'GAME_JOIN_REQUESTED'
export const GAME_JOINED = 'GAME_JOINED'
export const GAME_JOIN_REJECTED = 'GAME_JOIN_REJECTED'
export const AUTH_ERROR = 'AUTH_ERROR'

const enableLoadingState = function(){}
const disableLoadingState = function(){}

function joinGame(id) {
  return (dispatch) => {
    dispatch({type: GAME_JOIN_REQUESTED,    payload: id})
    const params = {id: id, join: true}
    const client = new APIClient()
    client.app.authenticate({storageKey: FEATHERS_AUTH_TOKEN_KEY }).then(() => {
      client.games().patch(params.id, {join: true}).then((result) => {
        dispatch({type: GAME_JOINED,        payload: result})
        disableLoadingState()
      }).catch((error) => {
        dispatch({type: GAME_JOIN_REJECTED, payload: error.toString()})
        disableLoadingState()
      })
    }).catch((error) => {
        dispatch({type: AUTH_ERROR,         payload: error.toString()})
        dispatch({type: GAME_JOIN_REJECTED, payload: error.toString()})
        disableLoadingState()
    })
  }
}

export default joinGame