import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
  
const mapStyles = {
  width: '80%',
  height: '500px'
};

export class MapContainer extends React.Component {
	
	constructor(props) {
        super(props);
		this.state = {
			showingInfoWindow: false,  //Hides or the shows the infoWindow
			activeMarker: {},          //Shows the active marker upon click
			selectedPlace: {},			//Shows the infoWindow to the selected place upon a marker
		};
    }

	onMarkerClick = (props, marker, e) =>
		this.setState({
		selectedPlace: props,
		activeMarker: marker,
		showingInfoWindow: true
	});

	onClose = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

  render() {
    return (
		<Map 
			google={this.props.google}
			style={mapStyles}
			zoom={14}
			initialCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
			center={{ lat: this.props.latitude, lng: this.props.longitude }}
		>
			<Marker
				onClick={this.onMarkerClick}
				name={this.props.photoTitle}
				position={{ lat: this.props.latitude, lng: this.props.longitude }}
			/>
			<InfoWindow
				marker={this.state.activeMarker}
				visible={this.state.showingInfoWindow}
				onClose={this.onClose}
			>
				<div>
					<h4>{this.state.selectedPlace.name}</h4>
				</div>
			</InfoWindow>
			</Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyA2D0aN4kPmylfSWkUIjg1TWm7qYAKd-oI')
})(MapContainer)