import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import './main.scss';

class Info extends Component {
  renderRecentEvents(events) {
    return events.map((event) => {
      return (
        <div>
          <ListItem>
            <Avatar alt='icon' src='/thief.png'/>
            <ListItemText primary={`${event.description}`} secondary={`${moment(event.date).format('DD/MM/YYYY - HH:mm')}`}/>
          </ListItem>
          <Divider/>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='content'>
        <div className='events-list'>
          <List >
            {this.renderRecentEvents(this.props.events)}
          </List>
        </div>
        <Button className='report-button' variant='contained' color='primary'>
          REPORTAR
        </Button>
      </div>
    );
  }
}

export default Info;
