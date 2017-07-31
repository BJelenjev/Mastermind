import React, { Component } from 'react';
import './App.css';

import GameUI from './GameUI';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Guess them colors below</h2>
        </div>
        <main className="App-intro">
          <GameUI colors= { ["gray", "green", "red", "blue", "violet", "brown", "pink"] } />
        </main>
      </div>
    );
  }
}

export default App;
