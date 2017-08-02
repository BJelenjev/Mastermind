import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Paper from 'material-ui/Paper';

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
import subscribe from './action-creators/subscribe'

import store from './store'

// Wire up GameUI
const reduxStateToGameUIProps = (reduxState) => ({guesses: reduxState.currentGame.guesses})
const BoundGameUI = connect(reduxStateToGameUIProps, {onGuess})(GameUI)

// Wire up signin
const BoundSignIn = connect(null, {onSignUp, onSignIn})(SignIn)

// Wire up lobby
const reduxStateToLobbyProps = (reduxState) => ({games: reduxState.games})
const BoundLobbyUI = connect(reduxStateToLobbyProps, {onCreateGame})(LobbyUI)

class App extends Component {
  componentWillMount() {
    console.log(store)
    store.dispatch((dispatchFn) => {
      dispatchFn({type: 'APP_MOUNTED', payload: null})
      subscribe()(dispatchFn)
    })
  }

  render() {
    return (
      // <Route exact path='/' component={LobbyUI} />
      // <Route exact path='/games/:gameid' component={BoundGameUI} />
      <main className="App">
        <BoundSignIn />
        <BoundLobbyUI />
        <Paper>
          <BoundGameUI colors= { ["gray", "green", "red", "blue", "violet", "brown", "pink"] } />
        </Paper>
      </main>
    );
  }
}

export default App;
