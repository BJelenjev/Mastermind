import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import joinGame from '../action-creators/join-game'
import {ConnectedGameUI} from './GameUI'

const onGuess = (combo) => console.log(combo)

// Will either load the game UI for currentGame OR will call the action to join the game
class GamePlaceholder extends PureComponent {
  constructor(props, context) {
    super(props, context)
  }
  
  componentDidMount() {
    const requestedGameId = this.props.params.gameId
    const currentGameId   = this.props.currentGame._id
    if(requestedGameId !== currentGameId) {
      console.log("Need to join first: ", requestedGameId, currentGameId)
      this.props.joinGame(requestedGameId)
    } else {
      console.log("All OK, current game is correct", requestedGameId, currentGameId)
    }
  }

  
  render() {
    if((this.props.params || {}).gameId === this.props.currentGame._id) {
      return <ConnectedGameUI />
    } else {
      return <h3>Still joining this one</h3>
    }
  }
}

const IDENTITY = ((reduxState) => reduxState)
export default connect(IDENTITY, {joinGame})(GamePlaceholder)