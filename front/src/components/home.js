import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userTest } from '../actions/user';
import Button from '@material-ui/core/Button';

class Home extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  componentDidMount() {
    this.props.userTest();
  }

  render() {
    const { user } = this.props;
    const hasStore = user.load;
    return (
      <div>
        HOME {hasStore ? 'has store' : 'ops there is a problem with the store'}
        <Button variant="contained" color="primary">
          Hello World
        </Button>
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
