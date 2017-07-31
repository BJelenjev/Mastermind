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
  }
  
  pickerWidget() {
    if(!this.state.isPicking) return null
    
    const numColors = this.props.colors.length
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
  render() {
    const selectableSwatches = Array(NUM_CARDS).fill(null).map((col, i) => {
      return <CardColorPicker key={ i } cardIdx={ i } colors={ this.props.colors } />
    })
    return (
      <div className="GameUI">
        <div className="CardColorPicker">
          { selectableSwatches }
        </div>
      </div>
    );
  }
}

export default GameUI;
