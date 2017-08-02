import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import LobbyGameItem from './LobbyGameItem'

class LobbyUI extends PureComponent {
  static propTypes = {
    games: PropTypes.array,
    onCreateGame: PropTypes.function
  }
  
  createGame(evt) {
    evt.preventDefault()
    this.props.onCreateGame()
  }
  render() {
    const games = (this.props.games || [])
    return (
      <Paper>
        <ul class="Games">
          { games.map((game) => <LobbyGameItem {...game} />) }
        </ul>

        <form onSubmit={ (evt) => evt.preventDefault() }>
          <RaisedButton
            onClick={ this.createGame.bind(this) }
            primary={true}
            label="Create a game" />
        </form>
      </Paper>
    )
  }
}

export default LobbyUI
