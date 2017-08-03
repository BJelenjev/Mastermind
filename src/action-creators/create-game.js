import APIClient from '../api/client'
import history from '../history'
const GAME_CREATION_REQUESTED = 'GAME_CREATION_REQUESTED'
const GAME_CREATION_REJECTED = 'GAME_CREATION_REJECTED'
const GAME_CREATED = 'GAME_CREATED'
const GAME_JOINED = 'GAME_JOINED'

const enableLoadingState = function(){}
const disableLoadingState = function(){}

export default (newUserProperties) => {
  return (dispatch) => {
    dispatch({type: GAME_CREATION_REQUESTED, payload: {}})
    enableLoadingState()
    
    const client = new APIClient()
    client.games().create({}).then((result) => {
      dispatch({type: GAME_CREATED, payload: result})
      dispatch({type: GAME_JOINED,  payload: result})
      // redirect via history to the game page
      history.push(`/game/${result._id}`)
      disableLoadingState()
    }).catch((error) => {
      dispatch({type: GAME_CREATION_REJECTED, payload: error})
      disableLoadingState()
    })
  }
}

