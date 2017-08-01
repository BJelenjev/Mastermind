import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clue from './Clue'
import './Guess.css'

class Guess extends PureComponent {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    combination: PropTypes.array.isRequired,
    numExact: PropTypes.number.isRequired,
    numApprox: PropTypes.number.isRequired,
  }

  render() {
    const {colors, combination, numExact, numApprox} = this.props
    const swatches = combination.map((ci, i) => {
      return <div key={ i } className="swatch" style={ {backgroundColor: colors[ci]} } />
    })
    return(
      <div className="Guess">
        {swatches}
        <Clue numExact={numExact} numApprox={numApprox} />
      </div>
    )
  }
}

export default Guess