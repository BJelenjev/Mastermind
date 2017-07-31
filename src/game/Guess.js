import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clue from './Clue'
import './Guess.css'

class Guess extends PureComponent {
  render() {
    const {colors, combination, numExact, numApprox} = this.props
    const swatches = combination.map((ci, i) => {
      return <div key={ i } className="ColorSwatch" style={ {backgroundColor: colors[ci]} } />
    })
    return(
      <div className="Guess">
        <div className="Swatches">
          {swatches}
        </div>
        <Clue numExact={numExact} numApprox={numApprox} />
      </div>
    )
  }
}

Guess.propTypes = {
  colors: PropTypes.array.isRequired,
  combination: PropTypes.array.isRequired,
  numExact: PropTypes.number.isRequired,
  numApprox: PropTypes.number.isRequired,
}

export default Guess