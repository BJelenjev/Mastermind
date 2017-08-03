import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

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
    const joinButton = this.mayJoin() ? <RaisedButton href="xxx" label="Join/Continue" /> : null
    return(
      <ListItem>
        Started <TimeAgo date={ this.props.createdAt }/> { joinButton }
      </ListItem>
    )
  }
}

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
        <List>
          <ListItem key="0" >
            <RaisedButton
              onClick={ this.createGame.bind(this) }
              primary={true}
              label="Create a game" />
          </ListItem>
        </List>
        <List>
          { games.map((game, i) => <LobbyGameItem key={i} {...game} />) }
        </List>
      </Paper>
    )
  }
}

export default LobbyUI
