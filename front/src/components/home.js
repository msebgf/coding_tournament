import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userTest } from '../actions/user';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Info from './info';
import Map from './map';
import {events} from '../helper/eventData';

import './main.scss';

class Home extends Component {
  componentDidMount() {
    this.props.userTest();
  }

  render() {
    const { user } = this.props;
    const hasStore = user.load;
    return (
      <div className='main'>
        {/*HOME {hasStore ? 'has store' : 'ops there is a problem with the store'}*/}
        <AppBar position='fixed' className='app-bar'>
          <Toolbar variant="dense">
            Deliktum - Jobsity coding tournament
          </Toolbar>
        </AppBar>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Map events={events}/>
          </Grid>
          <Grid className='side-bar' item xs={4}>
            <div>
              <Info events={events}/>
            </div>
          </Grid>
        </Grid>
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
