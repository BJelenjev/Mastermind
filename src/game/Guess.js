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
    _playerId: PropTypes.string
  }

  render() {
    const {_playerId, colors, combination, numExact, numApprox, currentUser} = this.props
    const swatches = combination.map((ci, i) => {
      return <div key={ i } className="swatch" style={ {backgroundColor: colors[ci]} } />
    })
    const whoseTurn = (_playerId === currentUser._id) ? "yours" : "theirs"
    const cn = "Guess " + (this.props.className || '') + ' ' + whoseTurn
    return(
      <div className={ cn }>
        {swatches}
        <Clue numExact={numExact} numApprox={numApprox} />
      </div>
    )
  }
}

export default Guess