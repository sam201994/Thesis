import firebase from '../../firebase';
import store from '../store';

export function updateUsers(users) {
  console.log('users updated', users);
  return {
    type: 'updating_location',
    payload: { users }
  }
}

export function getGroupLoc() {
  return firebase.database().ref().child('users')
  .on('value', snapshot => {
    return snapshot.val();
  });
};

export function geolocate() {
  function success(pos) {
    const user = firebase.auth().currentUser
      firebase.database().ref(`users/${user.uid}/coordinates`).set({
        latitude: pos.coords.lat,
        longitude: pos.coords.lng
      });
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 60000
  };

  navigator.geolocation.watchPosition(success, error, options);
}

export function getGeofence(coordinates) {
  const geoFences = store.getState().location.geoFences;
  for (let fence of geoFences) {
    const degrees = getDegrees(fence.radius);
    const latDiff = Math.abs(fence.latitude - coordinates.lat);
    const longDiff = Math.abs(fence.longitude - coordinates.lng);

    if (latDiff < degrees && longDiff < degrees) {
      return fence.name;
    }
  }
  return '';
}

function getDegrees(meters) {
  return meters / 100000;
}
