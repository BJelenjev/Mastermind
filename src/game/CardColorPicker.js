import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CardColorPicker.css'

const SWATCH_HEIGHT_STEP = 32

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

  pickerSwatches() {
    if(!this.state.isPicking) return null
    
    const swatches = this.props.colors.map((colorName, i) => {
      const topPos = (SWATCH_HEIGHT_STEP * (i-1)) + 'px' // off by one so that the default selection is not the default gray
      const s =  {backgroundColor: colorName, position: 'absolute', top: topPos}
      const acceptSelectionFunction = (event) => this.acceptSelection(event, i)
      return <div key={ i }
                  onClick={ acceptSelectionFunction }
                  className="swatch"
                  style={ s } />
    })
    
    return swatches
  }
  
  render() {
    const {colors} = this.props
    const {selectedColorIndex} = this.state
    
    const s =  {backgroundColor: colors[selectedColorIndex]}
    const abs = {position: 'absolute'}
    return (
      <div className="CardColorPicker" onClick={this.expandPicker.bind(this) } >
        <div className="swatch" style={s}/>
        <div className="variants" style={ abs }>
          { this.pickerSwatches() }
        </div>
      </div>
    )
  }
}

export default CardColorPicker