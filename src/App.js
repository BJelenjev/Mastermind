import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux'
import store from './store'
import GameUI from './GameUI';

import BuildGuess from './BuildGuess'

let initialGuesses = [
  BuildGuess(true,  [1,2,3,4], 1, 2),
  BuildGuess(false, [6,3,1,4], 2, 2),
  BuildGuess(true,  [4,6,2,4], 0, 0),
]

const reduxStateToUIProps = ({currentGame}) => ({guesses: currentGame.guesses})
const actionCreatorProps = {
  onGuess: (combination) => {
    store.dispatch({type: "GUESS_INPUT", payload: combination})
  }
}

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
