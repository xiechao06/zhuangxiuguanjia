import React, { Component } from 'react'
import Nav from './components/Nav'
import MainAppBar from './components/MainAppBar'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import connect from 'react-rimple'
import * as store from './store'

class Main extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
  }

  render () {
    let { classes, open } = this.props
    return <React.Fragment>
      <Nav />
      <MainAppBar classes={{
        appBar: classNames(classes.appBar, {
          [classes.appBarShift]: open
        }) }} />

    </React.Fragment>
  }
}

export default connect({
  open: store.navOpen
})(withStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: 'calc(100% - 16rem)',
    marginLeft: '16rem',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}))(Main))
