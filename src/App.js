import React, { Component } from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'

//import HomeIcon from 'material-ui/svg-icons/file/home';


import {history} from './store'

import './App.css';
import GamePlaceholder from './game/GamePlaceholder'
import SignIn from './user/SignIn'
import LobbyUI from './lobby/LobbyUI'

// Bind GameUI to Redux
import onSignUp from './action-creators/sign-up'
import onSignIn from './action-creators/sign-in'
import onCreateGame from './action-creators/create-game'
import subscribe from './action-creators/subscribe'
import maintainAuth from './action-creators/maintain-auth'

// Wire up signin
const BoundSignIn = connect(null, {onSignUp, onSignIn})(SignIn)

// Wire up lobby

class App extends Component {
  componentWillMount() {
    this.props.maintainAuth()
    this.props.subscribe()
  }
  
  render() {
    const navigateHome = () => history.push('/')
    const icos = {
      padding: '12px',
      background: 'white',
      cursor: 'pointer',
    }
    const homeIcon = <Link to='/'><FontIcon className="material-icons" style={ icos }>home</FontIcon></Link>
    return (
      <div className="App">
        <AppBar title="mindmaster™©" iconElementLeft={homeIcon} onLeftIconButtonTouchTap={ navigateHome } onTitleTouchTap={ navigateHome }/>
        
        { this.props.children }
      </div>
    )
  }
}

const BoundApp = connect(null, {subscribe, maintainAuth})(App)

class RouterWrapper extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={BoundApp}>
          <IndexRoute component={LobbyUI} />
        </Route>
        <Route path="/games/:gameId" component={BoundApp}>
          <IndexRoute component={GamePlaceholder} />
        </Route>
        <Route path="/sign-in" component={BoundApp}>
          <IndexRoute component={BoundSignIn} />
        </Route>
      </Router>
    )
  }
}

// Wire up App
export default RouterWrapper
