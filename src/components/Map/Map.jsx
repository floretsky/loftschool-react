import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';

export class Map extends Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZmxvcmV0c2t5IiwiYSI6ImNrOTFubmQyNzAxanozZnA2N3kxYmMxdHgifQ.tHxWpRK8aIOTB1iQ0kdSPA',
      style: 'mapbox://styles/mapbox/streets-v11',
      container: this.container,
      zoom: [15],
      center: [30.335098, 59.93428],
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }
  render() {
    return (
      <>
        <div className="map-container">
          <div className="map" ref={(el) => (this.container = el)}></div>
        </div>
      </>
    );
  }
}
