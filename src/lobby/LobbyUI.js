import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {connect} from 'react-redux'

import createGame from '../action-creators/create-game'
import store from '../store'

class LobbyGameItem extends PureComponent {
  static propTypes = {
    _id:           PropTypes.string,
    currentUsedId: PropTypes.string,
    ownerId:       PropTypes.string,
    players:       PropTypes.array,
    turn:          PropTypes.number,
    started:       PropTypes.string,
    loss:          PropTypes.boolean,
    createdAt:     PropTypes.boolean,
  }
  
  mayJoin() {
    return true
    
    const {currentUser, players} = this.props
    const {participantIds} = players.map((p) => p.userId)

    if(!currentUser) return false

    const myId = currentUser._id

    // Only allow joining if logged in 
    if(!myId) return false

    // Disallow if the game is done
    if(this.props.won || this.props.loss) return false

    // Allow if there is a slot for a player
    if(players.length < 2) return true

    // Allow re-joining a game that is still in progress
    if(participantIds.include(myId)) return true
    return false
  }
     
  render() {
    const gameUrl = `/games/${this.props._id}`
    const joinButton =  <Link to={ gameUrl }><RaisedButton label="Join/Continue" /></Link>
    return(
      <ListItem>
        Started <TimeAgo date={ this.props.createdAt }/>
        { this.mayJoin() ? joinButton : "Sign-in or create an account to join" }
      </ListItem>
    )
  }
}

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

    const gamesList = games.map((game, i) => <LobbyGameItem key={i + 1} {...game} />)
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
