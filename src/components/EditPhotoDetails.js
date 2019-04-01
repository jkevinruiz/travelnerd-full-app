import React from 'react';
import './EditPhotoDetails.css';

class EditPhotoDetails extends React.Component {

	handleChange = e => {

		console.log(e.currentTarget.value);
		console.log(e.currentTarget.name);

		// find the current photo in our photo array
		const id = this.props.currentPhoto;
		const photo = this.props.photos.find( p => p.id === id);

		// update the photo using 3 steps
		// 1. Make a clone of the current photo object
		const clonedPhoto = { ...photo };

		// 2. Update value of field that just changed
		clonedPhoto[e.currentTarget.name] = e.currentTarget.value;

		console.log(clonedPhoto);

		// 3. Tell parent (or above) to update the state for this photo
		 this.props.updatePhoto(this.props.currentPhoto, clonedPhoto);
	}

	validateLatLong = e => {
		let isNum = RegExp('/D/').test(e.currentTarget.value);
		console.log(isNum);
		return isNum;
	}

	render() {

		const id = this.props.currentPhoto;
		const imgURL = 'https://storage.googleapis.com/funwebdev-3rd-travel/medium/';
		if (this.props.photos.length > 0) {
			const photo = this.props.photos.find( p => p.id === id);
			if (typeof photo !== 'undefined') {
				return (
					<article className="details">
						<div className="detailsPhotoBox">
							<form className="photoForm">
								<legend>Edit Photo Details</legend>
								<img src={imgURL+photo.path} alt={photo.title} />

								<label>Title</label>
								<input
									type='text'
									name='title'
									value={photo.title}
									onChange={this.handleChange}
								/>

								<label>Description</label>
								<input
									type='text'
									name='description'
									value={photo.description}
									onChange={this.handleChange}
								/>

								<label>City</label>
								<input
									type='text'
									name='city'
									value={photo.city}
									onChange={this.handleChange}
								/>

								<label>Country</label>
								<input
									type='text'
									name='country'
									value={photo.country}
									onChange={this.handleChange}
								/>

								<label>Latitude</label>
								<input
									type='number'
									name='latitude'
									value={photo.latitude}
									onChange={this.handleChange}
								/>

								<label>Longitude</label>
								<input
									type='number'
									name='lonigtude'
									value={photo.longitude}
									onChange={this.handleChange}
								/>

							</form>
						</div>
					</article>
				);
			} else {
				return (<h1 className="warning">Current photo doesn't match filter! (or it got deleted)</h1>);
			}
		} else {
			return null;
		}
	}
}

export default EditPhotoDetails;
