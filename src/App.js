import React, { Component } from 'react';
import './App.css';

import GameUI from './GameUI';
import BuildGuess from './BuildGuess'

let initialGuesses = [
  BuildGuess(true,  [1,2,3,4], 1, 2),
  BuildGuess(false, [6,3,1,4], 2, 2),
  BuildGuess(true,  [4,6,2,4], 0, 0),
]


class App extends Component {
  render() {
    return (
      <main className="App">
        <GameUI guesses={ initialGuesses } colors= { ["gray", "green", "red", "blue", "violet", "brown", "pink"] } />
      </main>
    );
  }
}

export default App;
