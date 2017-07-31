import React, { Component } from 'react';
import './App.css';

import GameUI from './GameUI';
import Guess from './Guess'

let initialGuesses = [
  Guess(true, [1,2,3,4], 1, 2, 1),
  Guess(false, [6,3,1,4], 2, 2, 0)
]


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Guess them colors below</h2>
        </div>
        <main className="App-intro">
<GameUI guesses={ initialGuesses } colors= { ["gray", "green", "red", "blue", "violet", "brown", "pink"] } />
        </main>
      </div>
    );
  }
}

export default App;
