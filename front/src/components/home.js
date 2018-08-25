import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userTest } from '../actions/user';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import Button from '@material-ui/core/Button';


import Map from './map';

import './main.scss';

class Home extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  componentDidMount() {
    this.props.userTest();
  }

  sideList() {
    return (
      <div className={'list'}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
        <Divider />
        <List></List>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    const hasStore = user.load;
    return (
      <div className='main'>
        {/*HOME {hasStore ? 'has store' : 'ops there is a problem with the store'}*/}
        <AppBar position='absolute' className='app-bar'>
          <Toolbar variant="dense">
            Deliktum - Jobsity coding tournament
          </Toolbar>
        </AppBar>
        <Map/>
        <Drawer className='drawer' variant='permanent' anchor='right'>
          <div
            tabIndex={0}
          >
            {this.sideList()}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = {
  userTest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
