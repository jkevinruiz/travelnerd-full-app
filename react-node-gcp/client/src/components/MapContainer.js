import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                lat: 0,
                lng: 0
            }
        }
    }

    /**
     * Renders/Displays website elements.
     */
    render() {
        const imgURL = `https://storage.googleapis.com/project-pixels/square/`;
        let photo = this.props.photos.find((obj) => obj.id === this.props.currentPhoto);
        //handles what happens when selected photo to display map does not exist.
        //Code from https://www.npmjs.com/package/google-maps-react
        if (photo != null) {
            return (
                <div className="mapContainer"> 
                    <div className="mapDetails">
                        <img src={imgURL+photo.filename} alt={photo.title} height="200" width="200"/>
                        <br></br>
                        <h2>{photo.title}</h2>
                        <p>Distance from User(KM): {this.calculateDistance(photo.location.latitude, photo.location.longitude)}</p>
                        <p>{photo.description}</p>
                        <p>{photo.location.city}, {photo.location.country}</p>
                        <button onClick={this.handleView}>View</button>
                        <button onClick={this.handleEdit}>Edit</button>
                    </div>
                    <div className="map">
                        <div className="mapInside">
                           <Map
                            key={photo.id}
                            style={{width: '100%', height: '23em'}} 
                            google={this.props.google} zoom={14}
                            initialCenter={{lat: Number(photo.location.latitude), lng: Number(photo.location.longitude) }}
                            onClick={this.onMapClicked}>
                
                           <Marker onClick={this.onMarkerClick}
                                name={'Current location'} />
        
                            </Map>  
                        </div>
                      
                    </div>
                </div>
                
            );
        } else {
            return (
                <div className="detailsPhotoBox">
                    <h1>Photo has been removed</h1>
                </div>
            );
        }
    }

    /**
     * This function calls a parent component function that changes the display from the map into the photo view of data.
     */
    handleView = () => {
        console.log("handleView");
        this.props.changeRenderView("view");
    }

    /**
     * This function calls a parent component function that changes the display from the map into the edit photo view of data.
     */
    handleEdit = () => {
        this.props.changeRenderView("edit");
    }

    /**
     * This function calculates the distance in km from user to selected location to map.
     * The code from https://www.movable-type.co.uk/scripts/latlong.html
     * @param lat1 - latitude of selected photo
     * @param lon1 - longitude of selected photo
     */
    calculateDistance = (lat1, lon1) => {
        let lat2 = this.state.currentLocation.lat;
        let lon2 = this.state.currentLocation.lng;
        //condition for what happens if the user does not allow access to share their location
        if (lat2 !== 0 && lon2 !== 0) {
            var R = 6371; // metres
            var φ1 = this.toRadians(lat1);
            var φ2 = this.toRadians(lat2);
            var Δφ = this.toRadians(lat2-lat1);
            var Δλ = this.toRadians(lon2-lon1);

            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            var d = R * c;
            d = Math.round(d);
        } else {
            d = "Unable to calculate distance.";
        }
        console.log("Distance = " + d);
        return d;
    }

    /**
     * This function calculates degrees into radians.
     * @param degrees - passed degree latitude or longitude value
     */
    toRadians = (degrees) => {
        return (degrees * Math.PI) / 180;
    }

    /**
     * This function activates once data and component is acquired and loaded into DOM.
     */
    componentDidMount () {
        // document.querySelector(".map").style.width = "50%";
        // document.querySelector(".map").style.height = "95%";

        // check for navigation in browser
        // if allowed set currentlocations coordinate
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                });
            },
            // this will set the state to false when the request for location is block/or denied
            (error) => {
                this.setState({allowLocation: "false"});
            }

            );
        } 
    }

    // componentDidUpdate () {
    //     document.querySelector(".map").style.width = "50%";
    //     document.querySelector(".map").style.height = "95%";
    // }

}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyA2D0aN4kPmylfSWkUIjg1TWm7qYAKd-oI")
})(MapContainer)