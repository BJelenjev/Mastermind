import React, {PureComponent} from 'react';
import './GameOutcome.css'

const TROPHY = "🏆"
const SAD = '🤔'

const Win = (props) => {
  return (
    <div className="GameOutcome Win">
    {
        Array(Number(props.numSlots)).fill(null).map(() => {
        return <div className='ico'><span role="img" aria-label="trophy">{ TROPHY }</span></div>
      })
    }
    </div>
  )
}

const Loss = (props) => {
  return (
    <div className="GameOutcome Loss">
    {
      Array(Number(props.numSlots)).fill(null).map(() => {
        return <div className='ico'><span role="img" aria-label="lost">{ SAD }</span></div>
      })
    }
    </div>
  )
}

class GameOutcome extends PureComponent {
  render() {
    if(this.props.didWin) {
      return <Win numSlots="4" />
    } else {
      return <Loss numSlots="4" />
    }
  }
}

export default GameOutcome