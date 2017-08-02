import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import './App.css';
import { connect } from 'react-redux'
import GameUI from './game/GameUI'
import SignIn from './user/SignIn'
import LobbyUI from './lobby/LobbyUI'

// Bind GameUI to Redux
import onGuess  from './action-creators/guess-input-given'
import onSignUp from './action-creators/sign-up'
import onSignIn from './action-creators/sign-in'
import onCreateGame from './action-creators/create-game'

const reduxStateToUIProps = (reduxState) => ({guesses: reduxState.currentGame.guesses})
const actionCreatorProps =  {onGuess}
const BoundGameUI = connect(reduxStateToUIProps, actionCreatorProps)(GameUI)
const BoundSignIn = connect(null, {onSignUp, onSignIn})(SignIn)
const BoundLobbyUI = connect(null, {onCreateGame})(LobbyUI)

class App extends Component {
  render() {
    return (
      // <Route exact path='/' component={LobbyUI} />
      // <Route exact path='/games/:gameid' component={BoundGameUI} />
      <main className="App">
        <Route exact path='/sign-in' component={BoundSignIn} />
        <BoundLobbyUI />
        <BoundGameUI colors= { ["gray", "green", "red", "blue", "violet", "brown", "pink"] } />
      </main>
    );
  }
}

export default App;
