import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import ReactMapboxGl from "react-mapbox-gl";
import { Cluster } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import Avatar from '@material-ui/core/Avatar';

import './main.scss';


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibXNlYmdmIiwiYSI6ImNqbDlvdHNmeTN3MGMzcXBnNncwMGplcmcifQ.-KesVlkYRfyHFnSNuG048A"
});

class MapComponent extends Component {
  getColor(pointCount) {
    if (pointCount <= 3) {
      return 'green';
    } else if (pointCount < 10) {
      return 'orange';
    }
    return 'red'
  };

  clusterMarker(coordinates, pointCount) {
    const color = this.getColor(pointCount);
    return (
      <Marker coordinates={coordinates}>
        <Avatar style={{
          backgroundColor: `${color}`,
        }}>{pointCount}</Avatar>
      </Marker>
    );
  };

  render() {
    const {coords, events} = this.props;
    const lat = coords && coords.latitude ? coords.latitude : -0.167;
    const long = coords && coords.longitude ? coords.longitude : -78.469;

    const features = events.map((event) => {
      return ({
        geometry: {
          coordinates: [event.coordinates.long, event.coordinates.lat],
        }
      });
    });

    return (
      <Map
        style= "mapbox://styles/mapbox/streets-v9"
        center= {[long, lat]}
        zoom = {[16]}
        containerStyle= {{
          height: "100vh",
        }}>
        <Cluster ClusterMarkerFactory={this.clusterMarker.bind(this)}>
          {
            features.map((feature, key) =>
              <Marker
                key={key}
                coordinates={feature.geometry.coordinates}
                >
                <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'}/>
              </Marker>
            )
          }
        </Cluster>
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
