import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Clue.css'

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

export default Clue