import React, { Component } from 'react'
import {
  Drawer, withStyles, List, ListItem, IconButton, ListItemText, ListItemIcon, Divider
} from '@material-ui/core'
import { AccessTime, ChevronLeft } from '@material-ui/icons'
import PropTypes from 'prop-types'
import * as store from '../store'
import connect from 'react-rimple'

class Nav extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  }

  render () {
    let { open, classes } = this.props
    return <Drawer
      open={open}
      variant='persistent'
      anchor='left'
      className={classes.drawer}
      classes={{
        paper: classes.paper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={this._closeNav}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List>
        {
          [['预约单', <AccessTime />, '/appointment-list']].map(([text, icon, link]) => (
            <ListItem button key={text} onClick={this._clickItem} data-target={link}>
              <ListItemIcon>{ icon }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  }

  _clickItem = ({ currentTarget }) => {
    store.navOpen.val(false)
  }

  _closeNav = () => {
    store.navOpen.val(false)
  }
}

export default connect({
  open: store.navOpen
})(withStyles(theme => ({
  drawer: {
    flexShrink: 0
  },
  paper: {
    width: '16rem'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}))(Nav))
