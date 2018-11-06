import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import React from 'react'
import connect from 'react-rimple'
import { account } from '../store'

const LoginRequiredRoute = function LoginRequiredRoute ({ render, component, account, ...rests }) {
  return <Route
    {...rests}
    render={function (props) {
      if (account) {
        if (typeof render === 'function') {
          return render()
        }
        return React.createElement(component, props)
      }
      return <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    }}
  />
}

LoginRequiredRoute.propTypes = {
  account: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired
}

export default connect({ account })(LoginRequiredRoute)
