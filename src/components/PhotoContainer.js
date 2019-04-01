import React from 'react';
import EditPhotoDetails from './EditPhotoDetails.js';
import ViewPhoto from './ViewPhoto.js';
import GeolocateWrapper from './GeolocateWrapper.js';

class PhotoContainer extends React.Component {

	render() {

		let photoView = <ViewPhoto photos={this.props.photos} currentPhoto={this.props.currentPhoto} setViewState={this.props.setViewState} />;

		if (this.props.viewState === 'edit') {
			photoView = <EditPhotoDetails photos={this.props.photos} currentPhoto={this.props.currentPhoto} updatePhoto={this.props.updatePhoto} />;
		} else if (this.props.viewState === 'map') {
			photoView = <GeolocateWrapper photos={this.props.photos} currentPhoto={this.props.currentPhoto} />;
		}

		return (
			<section className="photoContainer">
				{photoView}
			</section>
		);
	}
}

export default PhotoContainer;
