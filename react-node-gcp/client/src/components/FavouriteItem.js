import React from 'react';

class FavouriteItem extends React.Component {
	
	handleCloseClick = () => {
		this.props.removeFromFavourites(this.props.photo.id);
	}
	
	render() {
		const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/square-medium/${this.props.photo.path}`;
		return (
			<div className="favoriteItem">
				<figure>
					<img src={imgURL} className="photoThumb" title={this.props.photo.title} alt={this.props.photo.title} />
					<button onClick={this.handleCloseClick} className="closeButton">X</button>
				</figure>
			</div>
		);
	}
}

export default FavouriteItem;