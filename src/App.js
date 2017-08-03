import React, { Component } from 'react'
import { Route } from 'react-router'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
//import HomeIcon from 'material-ui/svg-icons/file/home';

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
const reduxStateToGameUIProps = (reduxState) => reduxState.currentGame
const BoundGameUI = connect(reduxStateToGameUIProps, {onGuess})(GameUI)

// Wire up signin
const BoundSignIn = connect(null, {onSignUp, onSignIn})(SignIn)

// Wire up lobby
const reduxStateToLobbyProps = (reduxState) => ({games: reduxState.games, currentUser: reduxState.currentUser})
const BoundLobbyUI = connect(reduxStateToLobbyProps, {onCreateGame})(LobbyUI)

class App extends Component {
  componentWillMount() {
    this.props.subscribe()
  }

  render() {
    return (
      <main className="App">
        <AppBar title="mindmaster™©" />
        <Route exact path='/'              component={BoundLobbyUI} />
        <Route exact path='/sign-in'       component={BoundSignIn} />
        <Route exact path='/games/:gameid' component={BoundGameUI} />
      </main>
    );
  }
}

// Wire up App
export default connect(null, {subscribe})(App)
