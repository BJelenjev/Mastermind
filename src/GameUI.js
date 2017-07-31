import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './GameUI.css';

const NUM_CARDS = 4

class CardColorPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPicking: false,
      selectedColorIndex: Number(props.selected), // If "undefined" is given it will become 0 (gray)
    }
  }
  
  expandPicker(evt) {
    if(this.state.isPicking) return
    evt.preventDefault()
    this.setState({isPicking: true})
  }
  
  acceptSelection(evt, colorIdx) {
    if(!this.state.isPicking) return
    
    evt.preventDefault()
    this.setState({isPicking: false, selectedColorIndex: colorIdx})

    if(this.props.onColorPicked) {
      this.props.onColorPicked(colorIdx)
    }
  }

  pickerWidget() {
    if(!this.state.isPicking) return null
    
    const heightStep = 60
    const swatches = this.props.colors.map((colorName, i) => {
      const topPos = (heightStep * (i + 1)) + 'px'
      const s =  {backgroundColor: colorName, position: 'absolute', top: topPos}
      const acceptSelectionFunction = (event) => this.acceptSelection(event, i)
      return <div key={ i } 
        onClick={ acceptSelectionFunction }
        className="ColorSwatch Selecting" style={ s }>
        </div>
    })
    
    return swatches
  }
  
  render() {
    const {colors} = this.props
    const {selectedColorIndex} = this.state
    
    const s =  {backgroundColor: colors[selectedColorIndex], position: 'relative'}
    return (
      <div className="CardColorPicker" onClick={this.expandPicker.bind(this) } >
        <div className="ColorSwatch Current" style={s}/>
        { this.pickerWidget() }
      </div>
    )
  }
}

class Clue extends PureComponent {
  render() {
    const {numExact, numApprox} = this.props
    const exactDots = Array(Number(numExact)).fill(null).map((_, i) => {
      return <div key={i} className="Dot Exactly" />
    })
    const looselyDots = Array(Number(numApprox)).fill(null).map((_, i) => {
      return <div key={i} className="Dot Loosely" />
    })
    
    return(
      <div className="Clue">
        {exactDots }
        {looselyDots }
      </div>
    )
  }
}

Clue.propTypes = {
  numExact: PropTypes.number.isRequired,
  numApprox: PropTypes.number.isRequired,
}

class GuessDisplay extends PureComponent {
  render() {
    const {colors, combination, numExact, numApprox} = this.props
    const swatches = combination.map((ci, i) => {
      return <div key={ i } className="ColorSwatch" style={ {backgroundColor: colors[ci]} } />
    })
    return(
      <div className="GuessDisplay">
        <div className="Swatches">
          {swatches}
        </div>
        <Clue numExact={numExact} numApprox={numApprox} />
      </div>
    )
  }
}

class GameUI extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {selectedColorIndices: Array(NUM_CARDS).fill(0) }
  }

  submitGuess() {
    const selection = [].concat(this.state.selectedColorIndices)
    // Reset the selected colors back to gray cards
    // TODO: this should be picked up by the widgets themselves via props, duuh
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
      return <GuessDisplay key={i} colors={ colors } {...guess} />
    })
    
    return (
      <div className="GameUI">
        <div className="CardColorPicker">
          { selectableSwatches }
        </div>
        <button onClick={ this.submitGuess.bind(this) } disabled={ !doneSelecting } className="SubmitGuess">Try!</button>
        <hr />
        { guesses }
      </div>
    );
  }
}

export default GameUI;
