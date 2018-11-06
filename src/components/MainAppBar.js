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

  _openNav = () => {
    store.navOpen.val(true)
  }

  render () {
    const { classes, title, open, account } = this.props
    const { anchorEl, backToLogin } = this.state

    if (backToLogin) {
      return <Redirect to='/login' />
    }

    return (
      <div className={classes.root}>
        <AppBar position='static' className={classes.appBar}>
          <Toolbar>
            {
              !open && <IconButton
                className={classes.menuButton} color='inherit' aria-label='Menu'
                onClick={this._openNav}
              >
                <MenuIcon />
              </IconButton>
            }

            <Typography variant='subheading' color='inherit' className={classes.grow}>
              { title }
            </Typography>
            <div>
              <IconButton
                aria-owns={anchorEl ? 'menu-appbar' : undefined}
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
                open={!!anchorEl}
                onClose={this.handleClose}
              >
                <MenuItem>{ account.email }</MenuItem>
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
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  account: PropTypes.object.isRequired
}

export default connect({
  title: store.title,
  open: store.navOpen,
  account: store.account
})(withStyles(styles)(MainAppBar))
