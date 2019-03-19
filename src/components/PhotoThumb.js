import React from 'react';

class PhotoThumb extends React.Component {
	
	handleViewClick = () => {
		this.props.setCurrentPhoto(this.props.photo.id);
		this.props.setViewState('view');
	}
	
	handleEditClick = () => {
		this.props.setCurrentPhoto(this.props.photo.id);
		this.props.setViewState('edit');
	}
	
	handleMapClick = () => {
		this.props.setCurrentPhoto(this.props.photo.id);
		this.props.setViewState('map');
	}
	
	handleDeleteClick = () => {
		this.props.deletePhoto(this.props.photo.id);
	}
	
	handleLikeClick = () => {
		this.props.addToFavourites(this.props.photo.id);
	}
	
	render() {
		const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/square-medium/${this.props.photo.path}`;
		return (
			<div className="photoBox" >
				<figure>
					<img src={imgURL} className="photoThumb" title={this.props.photo.title} alt={this.props.photo.title} />
					<button className="closeButton" onClick={ this.handleDeleteClick }>X</button>
				</figure>
				<div>
					<h3>{this.props.photo.title}</h3>
					<p>{this.props.photo.city}, {this.props.photo.country}</p>
					<button onClick={ this.handleViewClick }>View</button>
					<button onClick={ this.handleLikeClick }>❤</button>
					<button onClick={ this.handleEditClick }>Edit</button>
					<button onClick={ this.handleMapClick }>Map</button>
				</div>
			</div>
		);
	}
}

export default PhotoThumb;