import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import submitGuess from '../action-creators/submit-guess'
import CardColorPicker from './CardColorPicker'
import Guess from './Guess'
import GameOutcome from './GameOutcome'

import './GameUI.css';

const NUM_CARDS = 4
const DICE = "🎲"

const Conditional = (props) => {
  if(!!props.if) {
    return props.children
  } else {
    return null
  }
}

// Handles the interface for an entire game
class GameUI extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    colors: PropTypes.array.required,
    submitGuess: PropTypes.function,
    guesses: PropTypes.array,
    gamePhase: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context)
    
    this.state = {selectedColorIndices: Array(NUM_CARDS).fill(0) }
  }

  submitGuess(evt) {
    const combination = [].concat(this.state.selectedColorIndices)
    // Call up with the combination
    this.props.submitGuess(this.props._id, combination)
    // Reset the selected colors back to gray cards. On next render
    // the color selection widgets are going to pick these values up
    // and reset themselves to gray.
    this.setState({selectedColorIndices: Array(NUM_CARDS).fill(0)})

    // By way of easter-egg/debugging ease (or for rapid play)
    // holding the Alt key while submitting will suppress this reset :-P
    if(evt.altKey) {
      this.setState({selectedColorIndices: combination})
    }
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
      return <CardColorPicker key={ cardIdx } selected={ ci } onColorPicked={ selected } colors={ this.props.colors } />
    })
    const doneSelecting = this.state.selectedColorIndices.filter((v) => v === 0).length === 0

    // Guesses arrive in chronological order, and are also sorted as such.
    // We show the last guess right below the input, so reverse them after
    const guesses = this.props.guesses.map((guess, i) => {
      return <Guess key={i} colors={ colors } {...guess} currentUser={ this.props.currentUser } />
    }).reverse()
    
    const playerIds = this.props.players.map((p) => p._id)
    const yourTurn = (this.props.turn % 2) === playerIds.indexOf(this.props.currentUser._id)
    const gameEnded = (this.props.gamePhase !== "inProgress")
    
    return (
      <div className="GameUI">
        <Conditional if={ !gameEnded }>
          <div className="pickers-and-try">
            { selectableSwatches }
            <Conditional if={ yourTurn }>
              <button onClick={ this.submitGuess.bind(this) } disabled={ !doneSelecting } className="SubmitGuess">
                <span role="img" aria-label="Guess">{ DICE }</span>
              </button>
            </Conditional>
          </div>
        </Conditional>
        <Conditional if= { gameEnded } >
            <GameOutcome didWin={this.props.gamePhase === "playerWon"} />
        </Conditional>
        { guesses }
      </div>
    );
  }
}


const extractCurrentGame = (rs) => ({...rs.currentGame, currentUser: rs.currentUser})
const ConnectedGameUI = connect(extractCurrentGame, {submitGuess})(GameUI)

export default GameUI
export {ConnectedGameUI}
