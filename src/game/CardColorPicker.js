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
  
  // When we receive props from "above" it means a selection has been made,
  // whereby we reset the internal selection as well (back to gray)
  componentWillReceiveProps(newProps) {
    this.setState({selectedColorIndex: Number(newProps.selected)})
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
                  className="swatch"
                  onClick={ acceptSelectionFunction }
                  style={ s } />
    })
    
    return swatches
  }
  
  render() {
    const {colors} = this.props
    const {selectedColorIndex} = this.state
    
    return (
      <div className="CardColorPicker" onClick={this.expandPicker.bind(this) } >
        <div className="swatch" style={ {backgroundColor: colors[selectedColorIndex]} }/>
        <div className="variants" style={ {position: 'absolute'} }>
          { this.pickerSwatches() }
        </div>
      </div>
    )
  }
}

export default CardColorPicker