import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CardColorPicker.css'

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

export default CardColorPicker