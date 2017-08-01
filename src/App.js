import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import './App.css';
import { connect } from 'react-redux'
import GameUI from './game/GameUI'
import SignIn from './user/SignIn'

// Bind GameUI to Redux
import onGuess  from './action-creators/guess-input-given'
import onSignUp from './action-creators/sign-up'
import onSignIn from './action-creators/sign-in'

const reduxStateToUIProps = (reduxState) => ({guesses: reduxState.currentGame.guesses})
const actionCreatorProps =  {onGuess}
const BoundGameUI = connect(reduxStateToUIProps, actionCreatorProps)(GameUI)
const BoundSignIn = connect(null, {onSignUp, onSignIn})(SignIn)

class App extends Component {
  render() {
    return (
      // <Route exact path='/games/:gameid' component={BoundGameUI} />
      <main className="App">
        <Route exact path='/sign-in' component={BoundSignIn} />
        <BoundGameUI colors= { ["gray", "green", "red", "blue", "violet", "brown", "pink"] } />
      </main>
    );
  }
}

export default App;
