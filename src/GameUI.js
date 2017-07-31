import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CardColorPicker from './game/CardColorPicker'
import Guess from './game/Guess'

import './GameUI.css';

const NUM_CARDS = 4



class GameUI extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {selectedColorIndices: Array(NUM_CARDS).fill(0) }
  }

  submitGuess() {
    const selection = [].concat(this.state.selectedColorIndices)
    // Reset the selected colors back to gray cards. On next render
    // the color selection widgets are going to pick these values up
    // and reset themselves to gray
    this.setState({selectedColorIndices: Array(NUM_CARDS).fill(0)})
    
    if(this.props.onGuess) this.props.onGuess(selection)
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

    const guesses = this.props.guesses.map((guess, i) => {
      return <Guess key={i} colors={ colors } {...guess} />
    })
    
    return (
      <div className="GameUI">
        <div className="pickers-and-try">
          { selectableSwatches }
          <button onClick={ this.submitGuess.bind(this) } disabled={ !doneSelecting } className="SubmitGuess">
            Make a guess
          </button>
        </div>
        <hr />
        { guesses }
      </div>
    );
  }
}

export default GameUI;
