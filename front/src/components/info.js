import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import { startReport } from '../actions/event';

import './main.scss';

class Info extends Component {
  state = {
    reportStarted: false,
  };

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

  startReport() {
    this.props.startReport();
    this.setState({
      reportStarted: !this.state.reportStarted,
    })
  }

  renderReportSteps(){
    if (this.props.selectedLocation) {
      return (
        <div className='report-steps'>
          2. Selecciona el tipo de incidente
        </div>
      );
    }

    return(
      <div className='report-steps'>
        1. Selecciona la ubicacion del incidente
      </div>
    );
  }

  render() {
    return (
      <div className='content'>
        <div className='events-list'>
          {this.state.reportStarted ? this.renderReportSteps() :
            <List >
              {this.renderRecentEvents(this.props.events)}
            </List>
          }
        </div>
        <Button
          onClick={this.startReport.bind(this)}
          className='report-button'
          variant='contained'
          color={this.state.reportStarted ? 'secondary' : 'primary'}>
          {this.state.reportStarted ? 'CANCELAR' : 'REPORTAR'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { event } = state;
  return {
    location: event.selectedLocation,
  };
};

const mapDispatchToProps = {
  startReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(Info);
