import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CardColorPicker from './CardColorPicker'
import Guess from './Guess'

import './GameUI.css';

const NUM_CARDS = 4

class GameUI extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {selectedColorIndices: Array(NUM_CARDS).fill(0) }
  }

  submitGuess() {
    const combination = [].concat(this.state.selectedColorIndices)
    // Call up with the combination
    this.props.onGuess(combination)
    // Reset the selected colors back to gray cards. On next render
    // the color selection widgets are going to pick these values up
    // and reset themselves to gray
    this.setState({selectedColorIndices: Array(NUM_CARDS).fill(0)})
  }
  
  render() {
    const currentIndices = this.state.selectedColorIndices
    const colors = this.props.colors
    const selectableSwatches = currentIndices.map((ci, cardIdx) => {
      const selected = (colorIdx) => {
        const newColors = [].concat(this.state.selectedColorIndices)
        newColors[cardIdx] = colorIdx
        this.setState({selectedColorIndices: newColors})
      }
      return <CardColorPicker key={ cardIdx } selected={ ci } onColorPicked={selected} colors={ this.props.colors } />
    })
    const doneSelecting = this.state.selectedColorIndices.filter((v) => v === 0).length === 0

    // Guesses arrive in chronological order, and are also sorted as such.
    // We show the last guess right below the input, so reverse them after
    const guesses = this.props.guesses.map((guess, i) => {
      console.log("Displaying guess ", i)
      return <Guess key={i} colors={ colors } {...guess} />
    }).reverse()
    
    return (
      <div className="GameUI">
        <div className="pickers-and-try">
          { selectableSwatches }
          <button onClick={ this.submitGuess.bind(this) } disabled={ !doneSelecting } className="SubmitGuess">
            <span role="img" aria-label="Guess">🎲</span></button>
        </div>
        { guesses }
      </div>
    );
  }
}

export default GameUI;