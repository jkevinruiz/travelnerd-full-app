import React from 'react';
import PhotoList from './PhotoList.js';
import PhotoContainer from './PhotoContainer.js';

class PhotoBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentPhoto: 1, countryFilter: '', cityFilter: '', viewState: 'view'};
	}
	
	filterCity = (city) => {
		
		this.setState( {cityFilter: city} );
		
	}
	
	filterCountry = (country) => {
		
		this.setState( {countryFilter: country} );
		
	}
	
	matchesCity = (p) => {
		let matches;
		
		if(this.state.cityFilter.length > 0) {
			matches = p.city.toUpperCase().includes(this.state.cityFilter.toUpperCase());
		} else {
			matches = true;
		}
		return matches;
	}	
	
	matchesCountry = (p) => {
		let matches;
		
		if(this.state.countryFilter.length > 0) {
			matches = p.country.toUpperCase().includes(this.state.countryFilter.toUpperCase());
		} else {
			matches = true;
		}
		
		return matches;
	}
	
	setCurrentPhoto = (id) => {
		this.setState({ currentPhoto: id });
	}
	
	setViewState = (viewState) => {
		this.setState( {viewState: viewState} );
	}
	
	render() {
		const filteredPhotos = this.props.photos.filter(p => this.matchesCity(p) && this.matchesCountry(p));
		return (
			<section className="container">
				<PhotoList 
					photos={filteredPhotos} 
					setCurrentPhoto={this.setCurrentPhoto}
					addToFavourites={this.props.addToFavourites}
					filterCountry={this.filterCountry}
					filterCity={this.filterCity}
					deletePhoto={this.props.deletePhoto}
					setViewState={this.setViewState}
				/>
				<PhotoContainer
					photos={filteredPhotos} 
					currentPhoto={this.state.currentPhoto} 
					updatePhoto={this.props.updatePhoto}
					setViewState={this.setViewState} 
					viewState={this.state.viewState}
				/>
			</section>
		);
	}
}

export default PhotoBrowser;