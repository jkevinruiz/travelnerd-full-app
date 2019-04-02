import React from 'react';
import {geolocated} from 'react-geolocated';
import ViewPhotoMap from './ViewPhotoMap.js';
 
class GeolocateWrapper extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <ViewPhotoMap photos={this.props.photos} currentPhoto={this.props.currentPhoto} userLocated={false}/>
        : this.props.coords
          ? <ViewPhotoMap userLat={this.props.coords.latitude} userLong={this.props.coords.longitude} photos={this.props.photos} currentPhoto={this.props.currentPhoto} userLocated={true}/>
          : <ViewPhotoMap photos={this.props.photos} currentPhoto={this.props.currentPhoto} userLocated={false}/>;
  }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeolocateWrapper);