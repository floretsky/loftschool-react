import taxi from '../../common/taxi-from-above.png';
import * as turf from '@turf/turf';

export const drawRoute = (map, coordinates) => {
  var route = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coordinates,
        },
      },
    ],
  };

  // A single point that animates along the route.
  // Coordinates are initially set to origin.
  var point = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: coordinates[0],
        },
      },
    ],
  };

  var lineDistance = turf.lineDistance(route.features[0]);

  const arc = [];
  const steps = 1500;
  // Draw an arc between the `origin` & `destination` of the two points
  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    let segment = turf.along(route.features[0], i);
    arc.push(segment.geometry.coordinates);
  }

  // Update the route with calculated arc coordinates
  route.features[0].geometry.coordinates = arc;

  // Used to increment the value of the point measurement against the route.
  let counter = 0;
  let routeLength = arc.length - 1;

  map.addSource('route', {
    type: 'geojson',
    data: route,
  });

  map.addSource('point', {
    type: 'geojson',
    data: point,
  });

  map.addLayer({
    id: 'route',
    source: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#ffc617',
      'line-width': 8,
    },
  });

  map.loadImage(taxi, function (error, image) {
    if (error) throw error;
    map.addImage('taxi', image);

    map.addLayer({
      id: 'point',
      source: 'point',
      type: 'symbol',
      layout: {
        'icon-image': 'taxi',
        'icon-size': 0.15,
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });
  });

  function animate() {
    // Update point geometry to a new position based on counter denoting
    // the index to access the arc.
    point.features[0].geometry.coordinates =
      route.features[0].geometry.coordinates[counter];

    // Calculate the bearing to ensure the icon is rotated to match the route arc
    // The bearing is calculate between the current point and the next point, except
    // at the end of the arc use the previous point and the current point
    point.features[0].properties.bearing = turf.bearing(
      turf.point(
        route.features[0].geometry.coordinates[
          counter >= routeLength ? counter - 1 : counter
        ]
      ),
      turf.point(
        route.features[0].geometry.coordinates[
          counter >= routeLength ? counter : counter + 1
        ]
      )
    );

    map.flyTo({
      center: point.features[0].geometry.coordinates,
      zoom: 10,
      speed: 20,
    });

    // Update the source with this new data.
    if (map.getSource('point')) {
      map.getSource('point').setData(point);
    } else {
      return;
    }
    // Request the next frame of animation so long the end has not been reached.
    if (counter < routeLength) {
      requestAnimationFrame(animate);
    }

    counter = counter + 1;
  }

  counter = 0;
  animate(counter);
};
