import React, { Component } from 'react';

import './App.css';
import { connect } from 'react-redux'
import GameUI from './game/GameUI';

// Bind GameUI to Redux
import onGuess from './action-creators/guess-input-given'
const reduxStateToUIProps = (reduxState) => ({guesses: reduxState.currentGame.guesses})
const actionCreatorProps =  {onGuess}
const BoundGameUI = connect(reduxStateToUIProps, actionCreatorProps)(GameUI)

class App extends Component {
  render() {
    return (
      <main className="App">
        <BoundGameUI colors= { ["gray", "green", "red", "blue", "violet", "brown", "pink"] } />
      </main>
    );
  }
}

export default App;
