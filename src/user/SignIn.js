import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  margin: 'auto',
}

export class SignIn extends PureComponent {
  static propTypes = {
    onSignUp: PropTypes.func.isRequired,
    onSignIn: PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (this.props.signedIn) {
      // history.replace('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onSubmit) {
      // history.push('/')
    }
  }

  signUp(event) {
    const user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    }
    this.props.onSignUp(user)
  }

  signIn(event) {
    const user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    }
    this.props.onSignIn(user)
  }
  
  render() {
    const {role} = this.props || "signup"
    return (
      <Paper style={ dialogStyle }>
        <form onSubmit={ (evt) => evt.preventDefault() }>
          <div className="input">
            <TextField ref="email" type="email" hintText="Email address" />
          </div>
          <div className="input">
            <TextField ref="password" type="password" hintText="Password"  />
          </div>
          
          <FlatButton
            onClick={ this.signUp.bind(this) }
            label="Create account" />
          <RaisedButton
            style={ buttonStyle }
            onClick={ this.signIn.bind(this) }
            label="Sign in"
            primary={true} />
        </form>
      </Paper>
    )
  }
}

export default SignIn
