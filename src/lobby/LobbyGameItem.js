import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

class LobbyGameItem extends PureComponent {
  static propTypes = {
    _id:      PropTypes.string.required,
    players:  PropTypes.GAME_CREATED_PUSHd,
    turn:     PropTypes.number.required,
    started:  PropTypes.string.required,
  }
  
  render() {
    const mayJoin = this.props.players.length < 2
    const joinButton = mayJoin ? <RaisedButton label="Join" /> : null
    return(
      <li data-game-id={ this.props._id }>
        { joinButton }
      </li>
    )
  }
}

export default LobbyGameItem