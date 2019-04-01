import React from 'react';
import './EditPhotoDetails.css';

class ViewPhoto extends React.Component {

	handleEditClick = () => {
		this.props.setViewState('edit');
	}

	handleMapClick = () => {
		this.props.setViewState('map');
	}

	render() {

		const id = this.props.currentPhoto;
		const imgURL = 'https://storage.googleapis.com/funwebdev-3rd-travel/large/';
		if (this.props.photos.length > 0) {
			const photo = this.props.photos.find( p => p.id === id);
			if (typeof photo !== 'undefined') {
				return (
					<article className="singlePhotoView">
						<div className="detailsPhotoBox">
							<h1>{photo.title}</h1>
							<img src={imgURL+photo.path} alt={photo.title} />
							<h2>Description</h2>
							<p>{photo.description}</p>
							<p><strong>Country:</strong> {photo.country}</p>
							<p><strong>City:</strong> {photo.city}</p>
							<button onClick={this.handleEditClick}>Edit</button>
							<button onClick={this.handleMapClick}>Map</button>
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

export default ViewPhoto;
