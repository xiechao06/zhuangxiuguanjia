import React from 'react'
import PropTypes from 'prop-types'
import {
  withStyles, AppBar, Toolbar, Typography, IconButton,
  MenuItem, Menu
} from '@material-ui/core'
import connect from 'react-rimple'
import * as store from '../store'
import { Redirect } from 'react-router-dom'

import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class MainAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    backToLogin: false
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const { classes, title } = this.props
    const { anchorEl, backToLogin } = this.state
    const open = Boolean(anchorEl)

    if (backToLogin) {
      return <Redirect to='/login' />
    }

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='subheading' color='inherit' className={classes.grow}>
              { title }
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup='true'
                onClick={this.handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>我的信息</MenuItem>
                <MenuItem onClick={this.logout}>登出</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  logout = () => {
    store.clearAccount()
    store.account.val(null)
    this.setState({
      backToLogin: true
    })
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

export default connect({
  title: store.title
})(withStyles(styles)(MainAppBar))
