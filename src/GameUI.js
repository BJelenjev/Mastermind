import React, { PureComponent } from 'react';
import './GameUI.css';

const GRAY = 0
const NUM_CARDS = 4

class CardColorPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPicking: false,
      selectedColorIndex: GRAY,
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

    if(this.props.colorSelected) {
      this.props.colorSelected(colorIdx)
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
class GameUI extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {selectedColors: Array(NUM_CARDS).fill(0) }
  }
  render() {
    const selectableSwatches = Array(NUM_CARDS).fill(null).map((col, cardIdx) => {
      const selected = (colorIdx) => {
        const newColors = [].concat(this.state.selectedColors)
        newColors[cardIdx] = colorIdx
        this.setState({selectedColors: newColors})
      }
      return <CardColorPicker key={ cardIdx } colorSelected={selected} colors={ this.props.colors } />
    })
    const selectionsMade = NUM_CARDS
    const combinationEntryComplete = this.state.selectedColors.filter((v) => v === 0).length === 0
    return (
      <div className="GameUI">
        <div className="CardColorPicker">
          { selectableSwatches }
        </div>
        <button onClick={ this.submitGuess.bind(this) } disabled={ !combinationEntryComplete} className="SubmitGuess">Try!</button>
      </div>
    );
  }
}

export default GameUI;
