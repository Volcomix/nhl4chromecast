import React, { Component } from 'react'
import { connect } from 'react-redux'

import Login from '../components/Login'
import { authorize } from '../actions/authorization'

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Authentification',
  }

  render() {
    const { isInProgress, authorize } = this.props
    return (
      <Login isInProgress={isInProgress} onLoginPressed={authorize} />
    )
  }
}

const mapStateToProps = ({ authorization }) => ({
  isInProgress: authorization.isInProgress,
})

export default connect(mapStateToProps, {
  authorize,
})(LoginScreen)