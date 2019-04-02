import React from 'react';
import FavouriteItem from './FavouriteItem.js';

class Favourites extends React.Component {

	constructor(props) {
		super(props);
		this.state = { toggle: "showFaves" };
	}

	handleDownloadClick = () => {
		this.props.downloadFaves();
	}

	handleToggleClick = () => {

		if (this.state.toggle === "showFaves") {
			this.setState({ toggle: "hideFaves" });
		} else {
			this.setState({ toggle: "showFaves" });
		}

	}

	render() {

		if (this.props.favourites !== null) {
			const favePhotos = this.props.photos.filter((p) => this.props.favourites.includes(p.id));
			return (
				<div className={`faveWrapper ${this.state.toggle}`}>
					<div onClick={this.handleToggleClick} className="faveToggle">Show/Hide</div>
					<article className="favorites">
						<div className="faveText">
							<p>❤ Favourites</p>
							<p className="dlText" onClick={this.handleDownloadClick}><span className="dlIcon">⮋</span> Download</p>
						</div>
						{ favePhotos.map( (p) =>
							<FavouriteItem
								photo={p}
								key={p.id}
								removeFromFavourites={this.props.removeFromFavourites}
							/> ) }
					</article>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default Favourites;
