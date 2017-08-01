import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux'
import store from './store'
import GameUI from './GameUI';

import onGuess from './action-creators/guess-input-given'
const reduxStateToUIProps = ({currentGame}) => ({guesses: currentGame.guesses})
const actionCreatorProps = {onGuess}

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
