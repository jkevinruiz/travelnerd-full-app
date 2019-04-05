import React from 'react';
import PhotoList from './PhotoList';
import EditPhotoDetails from './EditPhotoDetails';
import HeaderApp from './HeaderApp.js';
import Favorites from './Favorites.js';
import * as cloneDeep from 'lodash/cloneDeep';
import ViewSinglePhoto from './ViewSinglePhoto.js';
import MapContainer from './MapContainer.js';

class PhotoBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentPhoto: 50,
                       filteredPhoto: [],
                       renderView: "view",
                    };
    }

    /**
     * This function is a callback when data in state changes.
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.photos !== this.props.photos ){
             this.setState({ filteredPhoto: nextProps.photos} );
        }

    }

    /**
     * This function activates once data and component is acquired and loaded into DOM.
     */
    componentDidMount() {
        this.setState({ filteredPhoto: this.props.photos});
    }

    componentWillMount() {
    }

    /**
     * This function updates what photo is currently being viewed.
     */
    updateCurrentPhoto = () => {
        console.log(this.state.currentPhoto);
        this.setState({ currentPhoto: this.props.photos[0].id});
        console.log(this.state.currentPhoto);
    }

    /**
     * This function handles the state to determine what element component is to be displayed on website.
     */
    changeRenderView = (value) => {
        this.setState({renderView: value});
    }

    /**
     * This function changes the element component to be displayed on website.
     */
    viewEditMap = () => {

        let renderView = this.state.renderView;
        if (renderView === "edit")
            return (<EditPhotoDetails changeRenderView={this.changeRenderView} photos={this.props.photos} currentPhoto={this.state.currentPhoto} updatePhoto={this.props.updatePhoto} />);
        else if (renderView === "map")
            return (<MapContainer changeRenderView={this.changeRenderView} photos={this.props.photos} currentPhoto={this.state.currentPhoto} />);
        else 
            return (<ViewSinglePhoto changeRenderView={this.changeRenderView} photos={this.props.photos} currentPhoto={this.state.currentPhoto} />);
    }

    /**
     * This function filters photo thumbnails by selected country through manipulating state and arrays.
     * @param e - event object.
     */
    handleFilter = (e) => {
        let name = e.target.name;
        console.log(name);
        let value = e.target.value;
        console.log(value);
        let filtered = [];
        const tmp = cloneDeep(this.props.photos);
       
        if (name === "city") {
            if (value !== "default")
                filtered = tmp.filter(obj => obj.location.city === value);
            else
                filtered = tmp;
        } else {
            console.log("country filter");
            if (value !== "default") {
                filtered = tmp.filter(obj => obj.location.country === value);
                console.log(filtered);
             }
            else 
                filtered = tmp;
        }
        this.setState({filteredPhoto: filtered, currentPhoto: filtered[0].id});
    }

    /**
     * This function filters photo thumbnails by selected city.
     */
    uniqueCity = () => {
        const cities = this.props.photos.map( (p) => p.location.city);
        // creates a unique array of cities returning only unique ones
        const uniqueCities = [...new Set(cities)];
        // console.log(uniqueCities);
        return uniqueCities;
      }

    /**
     * This function filters photo thumbnails by selected country.
     */
    uniqueCountry = () => {
        const country = this.props.photos.map( (p) => p.location.country);
        // creates a unique array of countries returning only unique ones
        const uniqueCountry = [...new Set(country)];
        // console.log(uniqueCountry);
        return uniqueCountry;
    }

    /**
     * This function changes the current Photo being displayed by changing currentPhoto state.
     * @param id - id of the selected photo to view
     */
    showImageDetails = (id) => {
        this.setState( {currentPhoto: id });
        //console.log(this.state.currentPhoto);
    }

    /**
     * Renders/Displays website elements.
     */
    render() {
        return (
            <div>
                <HeaderApp />
                <Favorites downloadFavorites={this.props.downloadFavorites} favorites={this.props.favorites} removeFav={this.props.removeFav} />
                <div className="photoBrowser">
                    <div className="sorting">
                            <label>Filter by: </label>
                            <label>City: </label>
                            <select name="city" onChange={this.handleFilter} >
                                <option value="default" >default</option>
                                {this.uniqueCity().map( (p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <label> Country: </label>
                            <select name="country" onChange={this.handleFilter}>
                                <option value="default" >default</option>
                                {this.uniqueCountry().map( (p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                    </div>
                    <section className="container">
                        <PhotoList changeRenderView={this.changeRenderView} updateCurrentPhoto={this.updateCurrentPhoto} removeFav={this.props.removeFav} removePhoto={ this.props.removePhoto} photos={ this.state.filteredPhoto } showImageDetails={ this.showImageDetails } addPhotoToFavorites={ this.props.addPhotoToFavorites } />
                        {this.viewEditMap()}
                    </section>
                </div>
            </div>
        );
    }
}

export default PhotoBrowser;