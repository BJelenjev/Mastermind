import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Clue.css'

class Clue extends PureComponent {
  render() {
    const {numExact, numApprox} = this.props
    const numMissed = 4 - (numExact + numApprox)

    const exactDots = Array(Number(numExact)).fill(null).map((_, i) => {
      return <div key={i} className="Dot Exactly" />
    })
    const looselyDots = Array(Number(numApprox)).fill(null).map((_, i) => {
      return <div key={i} className="Dot Loosely" />
    })
    const missedDots =  Array(Number(numMissed)).fill(null).map((_, i) => {
      return <div key={i} className="Dot Missed" />
    })
    
    return(
      <div className="Clue">
        {exactDots }
        {looselyDots }
        {missedDots }
      </div>
    )
  }
}

Clue.propTypes = {
  numExact: PropTypes.number.isRequired,
  numApprox: PropTypes.number.isRequired,
}

export default Clue