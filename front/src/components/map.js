import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {geolocated} from 'react-geolocated';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import './main.scss';


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibXNlYmdmIiwiYSI6ImNqbDlvdHNmeTN3MGMzcXBnNncwMGplcmcifQ.-KesVlkYRfyHFnSNuG048A"
});

class MapComponent extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    const {coords} = this.props;
    const lat = coords && coords.latitude ? coords.latitude : -0.167;
    const long = coords && coords.longitude ? coords.longitude : -78.469;

    return (
      <Map
        style= "mapbox://styles/mapbox/streets-v9"
        center= {[long, lat]}
        zoom = {[16]}
        containerStyle= {{
          height: "100vh",
          width: "100vw"
        }}>
      </Map>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(MapComponent);
