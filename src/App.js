import React, { Component } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
//import HomeIcon from 'material-ui/svg-icons/file/home';

import {history} from './store'

import './App.css';
import GameUI from './game/GameUI'
import SignIn from './user/SignIn'
import LobbyUI from './lobby/LobbyUI'

// Bind GameUI to Redux
import onGuess  from './action-creators/guess-input-given'
import onSignUp from './action-creators/sign-up'
import onSignIn from './action-creators/sign-in'
import onCreateGame from './action-creators/create-game'
import subscribe from './action-creators/subscribe'


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
      <div className="App">
        <AppBar title="mindmaster™©" />
        { this.props.children }
      </div>
    )
  }
}

const ohai = (props) => <h1>Ohai</h1>
const BoundApp = connect(null, {subscribe})(App)

class RouterWrapper extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={BoundApp}>
          <IndexRoute component={BoundLobbyUI} />
        </Route>
        <Route path="/games/:gameId" component={BoundApp}>
          <IndexRoute component={BoundGameUI} />
        </Route>
        <Route path="/sign-in" component={BoundApp}>
          <IndexRoute component={BoundSignIn} />
        </Route>
      </Router>
    )
  }
}

// Wire up App
export default RouterWrapper
