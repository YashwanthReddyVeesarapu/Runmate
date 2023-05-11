import React, { useState, useEffect, useRef } from "react";

import { DirectionsRenderer, useGoogleMap } from "@react-google-maps/api";

// Custom hook to access the 'google' object
function useGoogle() {
  const map = useGoogleMap();
  return map ? window.google : null;
}

const Directions = (props) => {
  // props: distance, startPoint, handleTotleDistance

  // service
  const directionsService = useRef(null);
  const google = useGoogle();

  // state
  const [randomLocations, setRandomLocations] = useState([]);
  const [finalDirections, setDirections] = useState(null);

  // check function

  const checkIfLegIsWalking = (leg) => {
    return leg.steps.every(
      (step) => step.travel_mode === google.maps.TravelMode.WALKING
    );
  };

  const processDirectionsResult = (result) => {
    const filteredLegs = result.routes[0].legs.filter(checkIfLegIsWalking);

    if (filteredLegs.length === result.routes[0].legs.length) {
      return result; // All legs are walkable, return the original result
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (google) {
      directionsService.current = new google.maps.DirectionsService();
    }
  }, [google]);

  // generate random locations

  const generateRandomLocations = () => {
    let locations = [];
    const radius = props.distance / 3;
    let numLocations = props.distance > 5 ? ((props.distance / 5) | 0) * 2 : 3;
    if (numLocations >= 25) numLocations = 24;
    const radiusInKm = radius * 1.60934; // Convert miles to kilometers

    for (let i = 0; i < numLocations; i++) {
      const lat =
        props.startPoint.lat + (Math.random() * 2 - 1) * (radiusInKm / 111.32);
      const lng =
        props.startPoint.lng +
        (Math.random() * 2 - 1) *
          (radiusInKm /
            (111.32 * Math.cos((props.startPoint.lat * Math.PI) / 180)));
      locations.push({ lat, lng });
    }

    locations = [props.startPoint, ...locations, props.startPoint];

    return locations;
  };

  // const generateRandomLocations = () => {

  //     const startPoint = props.startPoint;
  //     const dist = props.distance;

  //     const phi = Math.PI / 180 * ((120 - 60) * Math.random() + 60); // angle between leg1 and leg3
  //     const scale = 0.7; // straitline_distance/actual_distance
  //     const legDist = (scale * dist) / (2 + 2 * Math.sin(phi / 2));

  //     const calculateNewPoint = (angle) => {
  //         const lat =
  //             startPoint.lat +
  //             (legDist / 111.32) * Math.cos(angle) * Math.cos((startPoint.lat * Math.PI) / 180);
  //         const lng =
  //             startPoint.lng +
  //             (legDist / (111.32 * Math.cos((startPoint.lat * Math.PI) / 180))) * Math.sin(angle);

  //         return { lat, lng };
  //     };

  //     const theta = 2 * Math.random() * Math.PI;
  //     const point2 = calculateNewPoint(theta);
  //     const point3 = calculateNewPoint(theta + phi);

  //     return [props.startPoint, point2, point3, props.startPoint];

  // };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getDirections = async () => {
    if (!google || !directionsService.current) return;

    let directions = null;
    const maxAttempts = 10;
    const delayBetweenAttempts = 50; // in milliseconds

    for (let i = 0; i < maxAttempts; i++) {
      const locations = generateRandomLocations();
      const waypoints = locations.slice(1, -1).map((location) => ({
        location: new google.maps.LatLng(location.lat, location.lng),
        stopover: true,
      }));

      directionsService.current.route(
        {
          origin: new google.maps.LatLng(locations[0].lat, locations[0].lng),
          destination: new google.maps.LatLng(
            locations[locations.length - 1].lat,
            locations[locations.length - 1].lng
          ),
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.WALKING,
          avoidFerries: true,
          avoidHighways: true,
          avoidTolls: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            if (processDirectionsResult(result)) {
              let totalDistance = 0;
              const myroute = result.routes[0];
              for (let i = 0; i < myroute.legs.length; i++) {
                totalDistance += myroute.legs[i].distance.value;
              }

              totalDistance = totalDistance / 1000.0 / 1.60934;

              if (
                Math.abs(props.distance - totalDistance) <
                props.distance / 5
              ) {
                directions = result;
                props.handleTotleDistance(totalDistance);
              }
            }
          }
        }
      );

      if (directions) {
        return directions;
      }

      await sleep(delayBetweenAttempts);
    }

    //alert("No route found! Please try again.");
    props.handleTotleDistance(0);
    return null;
  };

  useEffect(() => {
    (async () => {
      const directions = await getDirections();
      if (directions) {
        setDirections(directions);
      }
    })();
  }, [props.distance]);

  useEffect(() => {
    if (finalDirections) {
      props.saveDirections(finalDirections);
    }
  }, [finalDirections]);

  return finalDirections ? (
    <DirectionsRenderer directions={finalDirections} />
  ) : null;
};

export default Directions;
