import React from 'react';
import './EditPhotoDetails.css';
import MapContainer from './MapContainer.js';

class ViewPhotoMap extends React.Component {
		
	deg2rad = (deg) => {
		return deg * (Math.PI/180);
	}
	
	getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
		
		var R = 6371; // Radius of the earth in km
		
		var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
		
		var dLon = this.deg2rad(lon2-lon1); 
		
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
			
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			
			var d = R * c; // Distance in km
			
			return Math.round(d);
	}
	
	calcUserDistance = (photo) => {
		if (this.props.userLocated) {
			return this.getDistanceFromLatLonInKm(photo.latitude, photo.longitude, this.props.userLat, this.props.userLong) + " kilometers";
		} else {
			return 'Location unavailable.';
		}
	}
	
	render() {
		
		const id = this.props.currentPhoto;
	
		if (this.props.photos.length > 0) {
			const photo = this.props.photos.find( p => p.id === id);
			if (typeof photo !== 'undefined') {
				
				const userDistance = this.calcUserDistance(photo);
				
				return (
					<article className="singlePhotoView">
						<div className="detailsPhotoBox">
							<h1>{photo.title}</h1>
							<p><strong>Latitude:</strong> {photo.latitude}</p>
							<p><strong>Longitude:</strong> {photo.longitude}</p>
							<p><strong>Distance from user:</strong> {userDistance}</p>								
							<MapContainer
								latitude={photo.latitude}
								longitude={photo.longitude}
								photoTitle={photo.title}
							/>
						</div>
					</article>
				);
			} else {
				return (<h1 className="warning">Current photo doesn't match filter!</h1>);
			}
		} else {
			return null;
		}
	}
}

export default ViewPhotoMap;