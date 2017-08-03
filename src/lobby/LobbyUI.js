import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {connect} from 'react-redux'

import GameItem from './GameItem'
import createGame from '../action-creators/create-game'
import store from '../store'


class LobbyUI extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.object,
    games: PropTypes.array,
    onCreateGame: PropTypes.function
  }

  createGame(evt) {
    evt.preventDefault()
    this.props.onCreateGame()
  }

  render() {
    const {games} = this.props
    
    const signinControls = <List>
        <ListItem key="0" >
          <Link to='/sign-in'>
            <RaisedButton primary={true} label="Sign in or create account to create a game" />
          </Link>
        </ListItem>
      </List>

    const createGameControls = <List>
      <ListItem key="0" >
          <RaisedButton
            onClick={ this.createGame.bind(this) }
            primary={true}
            label="Create a game" />
        </ListItem>
      </List>

    const gamesList = games.map((game, i) => <GameItem key={i + 1} {...game} />)
    const fade = {color: "rgb(200,200,200)"}
    const sadServer = <p style={ fade }>No games going on, it is very empty here.</p>

    return (
      <Paper>
        { this.props.currentUser ? createGameControls : signinControls }
        { games.length > 0 ? gamesList : sadServer }
      </Paper>
    )
  }
}

const reduxStateToLobbyProps = (reduxState) => ({games: reduxState.games, currentUser: reduxState.currentUser})
export default connect(reduxStateToLobbyProps, {onCreateGame: createGame})(LobbyUI)
export {LobbyUI}
