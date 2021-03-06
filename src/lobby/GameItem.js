import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router'
import {ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

const DoneGame = (props) => {
  return (
    <ListItem>
      Match finished <TimeAgo date={ props.updatedAt }/>
    </ListItem>
  )
}

const JoinableGame = (props) => {
  const {_id, createdAt, owner} = props
  const gameUrl = `/games/${_id}`
  return(
    <ListItem>
      {owner.name} started <TimeAgo date={ createdAt }/>
      <Link to={ gameUrl }><RaisedButton label="Join/Continue" /></Link>
    </ListItem>
  )
}

const UnjoinableGame = (props) => {
  const {_id, createdAt, owner} = props
  const gameUrl = `/games/${_id}` // can be used later to spectate
  return(
    <ListItem>
      <b>{owner.name}</b> started <TimeAgo date={ createdAt }/>
    </ListItem>
  )
}

class GameItem extends PureComponent {
  static propTypes = {
    _id:           PropTypes.string,
    currentUser:   PropTypes.object,
    ownerId:       PropTypes.string,
    players:       PropTypes.array,
    turn:          PropTypes.number,
    started:       PropTypes.string,
    createdAt:     PropTypes.boolean,
  }
  
  mayJoin() {
    const {currentUser, players, won, loss} = this.props
    const participantIds = players.map((p) => p._id)

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
    if(this.props.gamePhase !== "inProgress") {
      return <DoneGame {...this.props} />
    }
    if(this.mayJoin()) {
      return <JoinableGame {...this.props} />
    }
    return <UnjoinableGame {...this.props} />
  }
}

export default GameItem