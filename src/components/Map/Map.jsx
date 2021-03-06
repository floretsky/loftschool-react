import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

import Order from '../Order/Order.jsx';
import { drawRoute } from './drawRoute';
import { clearRoute } from '../../modules/Route/actions';
import { ACCESS_TOKEN } from '../../const/index';

import { StyledMap, StyledMapContainer } from './StyledMap';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ coords, isOrdered, clearRoute, history }) => {
  const [map, setMap] = useState(null);
  const mapRefContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapRefContainer }) => {
      const map = new mapboxgl.Map({
        accessToken: ACCESS_TOKEN,
        style: 'mapbox://styles/mapbox/light-v10',
        container: mapRefContainer.current,
        zoom: [15],
        center: [30.335098, 59.93428],
      });

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapRefContainer });
  }, [map]);

  useEffect(() => {
    if (isOrdered && coords.length && map) {
      drawRoute(map, coords);
    }
  }, [map, isOrdered, coords]);

  const reset = () => {
    map.removeLayer('route');
    map.removeSource('route');
    map.removeLayer('point');
    map.removeSource('point');
    clearRoute();
  };

  return (
    <>
      <StyledMapContainer>
        <Order history={history} reset={reset} isOrdered={isOrdered} />
        <StyledMap
          data-testid="map"
          ref={(el) => (mapRefContainer.current = el)}
        ></StyledMap>
      </StyledMapContainer>
    </>
  );
};

Map.propTypes = {
  coords: PropTypes.array,
  isOrdered: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  coords: state.route.coords,
  isOrdered: state.route.isOrdered,
});

const mapDispatchToProps = {
  clearRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
