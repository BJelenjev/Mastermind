// src/api/client.js

import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import hooks from 'feathers-hooks'
import auth from 'feathers-authentication-client'
import io from 'socket.io-client/dist/socket.io'

export const FEATHERS_AUTH_TOKEN_KEY = 'mastermind-ui-auth-token'

const host = 'http://localhost:3030'
const socket = io(host, {transports: ['websocket']})

const feathersClient = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({storage: window.localStorage, storageKey: FEATHERS_AUTH_TOKEN_KEY}))

// Once instantiated the feathers client is going to hold a socketio connection and manage it. It is in our
// best interest that we only ever use one client, so _reuse_ the client in all the API instances we export as
// the constructor next.

class APIClient {
  constructor() {
    this.app = feathersClient
  }

  users() {
    return this.app.service('users')
  }

  games() {
    return this.app.service('games')
  }
  
  authenticate({ email, password }) {
    const authArgs = Object.assign({strategy: 'local'}, {email, password})
    return this.app.authenticate(authArgs).then((response) => {
      console.log("Verifying token", response)
      return this.app.passport.verifyJWT(response.accessToken);
    }).then((payload) => {
      return this.app.service('users').get(payload.userId);
    })
  }

  signOut() {
    return this.app.logout()
  }
}

export default APIClient
