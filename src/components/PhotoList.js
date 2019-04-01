import React from 'react';
import PhotoThumb from './PhotoThumb.js';
import PhotoFilterForm from './PhotoFilterForm';

class PhotoList extends React.Component {
	
	render() {
		if (this.props.photos.length > 0) {
			return (
				<article className="photos">
					<PhotoFilterForm
						filterCity={this.props.filterCity}
						filterCountry={this.props.filterCountry}
					/>
					{ this.props.photos.map( (p) => 
						<PhotoThumb
							photo={p}
							key={p.id}
							setCurrentPhoto={this.props.setCurrentPhoto} 
							setViewState={this.props.setViewState}
							addToFavourites={this.props.addToFavourites}
							deletePhoto={this.props.deletePhoto}
						/> ) }
				</article>
			);
		} else {
			return (
				<article className="photos">
					<PhotoFilterForm
						filterCity={this.props.filterCity}
						filterCountry={this.props.filterCountry}
					/>
					<h1>Y'ain't got photos!</h1>
				</article>
			);
		}
	}
}

export default PhotoList;