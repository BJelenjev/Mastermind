import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router'
import {ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

class GameItem extends PureComponent {
  static propTypes = {
    _id:           PropTypes.string,
    currentUsedId: PropTypes.string,
    ownerId:       PropTypes.string,
    players:       PropTypes.array,
    turn:          PropTypes.number,
    started:       PropTypes.string,
    loss:          PropTypes.boolean,
    won:          PropTypes.boolean,
    createdAt:     PropTypes.boolean,
  }
  
  mayJoin() {
    return true

    const {currentUser, players, won, loss} = this.props
    const {participantIds} = players.map((p) => p._id)

    // Disallow if the game is done
    if(won || loss) return false

    // Only allow joining if logged in 
    if(!currentUser) return false
    const myId = currentUser._id
    
    // Allow re-joining a game that is in progress
    if(participantIds.includes(myId)) return true

    // Allow if there is a slot for the current user
    if(players.length < 2) return true

    return false
  }
     
  render() {
    const gameUrl = `/games/${this.props._id}`
    const joinButton =  <Link to={ gameUrl }><RaisedButton label="Join/Continue" /></Link>
    return(
      <ListItem>
        Started <TimeAgo date={ this.props.createdAt }/>
        { this.mayJoin() ? joinButton : null }
      </ListItem>
    )
  }
}

export default GameItem