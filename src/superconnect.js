import { connect } from 'react-redux'

const identityFn = (entireReduxState) => entireReduxState

export default function(actionCreators) {
  return connect(identityFn, actionCreators)
}

