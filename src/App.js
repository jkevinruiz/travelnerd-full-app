import React, { Component } from 'react';
import HeaderApp from './components/HeaderApp.js';
import PhotoBrowser from './components/PhotoBrowser.js';
import * as cloneDeep from 'lodash/cloneDeep';
import { Route } from 'react-router-dom';
import * as JSZipUtils from 'jszip-utils';
import * as JSZip from 'jszip';
import FileSaver from 'file-saver';
import Home from './components/Home.js';
import About from './components/About.js';
import Favourites from './components/Favourites.js';

	
function urlToPromise(url) {
	return new Promise(function(resolve, reject) {
		JSZipUtils.getBinaryContent(url, function (err, data) {
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}
	

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = { photos: [], favourites: [] };
	}

	downloadFaves = () => {
		
		const favePhotos = this.state.photos.filter((p) => this.state.favourites.includes(p.id));
		const imgURL = 'https://storage.googleapis.com/funwebdev-3rd-travel/large/';
		const proxyURL = 'https://cors-anywhere.herokuapp.com/';
		
		var zip = new JSZip();
		
		favePhotos.forEach((p) => {
			let filePath = proxyURL + imgURL + p.path;
			zip.file(`Travel Image ${p.id}.jpg`, urlToPromise(filePath), {binary:true});
			console.log(`Zipped Travel Image ${p.id}.jpg`);
		});
		
		zip.generateAsync({type:"blob"})
			.then(function callback(blob) {

				// see FileSaver.js
				FileSaver.saveAs(blob, "faveImages.zip");
			});
	}

	addToFavourites = (id) => {
		
		if (!this.state.favourites.includes(id)){
			let prevState = this.state.favourites;
			this.setState( {favourites: [...prevState, id]}, this.saveFaves );
		}
		
		
	}
	
	saveFaves = () => {
		localStorage.setItem('favourites', JSON.stringify(this.state.favourites));
	}
	
	removeFromFavourites = (id) => {
		
		let oldFaves = [...this.state.favourites];
		let index = oldFaves.indexOf(id);
		oldFaves.splice(index, 1);
		this.setState( {favourites: oldFaves}, this.saveFaves );
		
	}
	
	updatePhoto = (id, photo) => {
		
		// Create deep clone of photo array from state using lodash
		const copyPhotos = cloneDeep(this.state.photos);
		
		// Find photo to update in cloned array
		const photoToReplace = copyPhotos.find( p => p.id === id);
		
		// replace photo fields with edited values
		photoToReplace.title = photo.title;
		photoToReplace.description = photo.description;
		photoToReplace.city = photo.city;
		photoToReplace.country = photo.country;
		photoToReplace.latitude = photo.latitude;
		photoToReplace.longitude = photo.longitude;
		
		//update state
		this.setState( {photos: copyPhotos});
	}
	
	deletePhoto = (id) => {
		let oldPhotos = [...this.state.photos];
		const index = oldPhotos.findIndex(p => p.id ===id)
		oldPhotos.splice(index, 1);
		this.setState( {photos: oldPhotos} );
	}
	
	logPhotos = () => {
		console.log(this.state.photos);
	}
	
	async componentDidMount() {
		if (localStorage.getItem('favourites') != null) {
			this.setState( {favourites: JSON.parse(localStorage.getItem('favourites'))} );
		}
		try {
			const url = "http://randyconnolly.com/funwebdev/services/travel/images.php";
			const response = await fetch(url);
			const jsonData = await response.json();
			this.setState( {photos: jsonData} );
		}
		catch (error) {
			console.error(error);
		}
	}
	
	render() {
		return (
			<div>
				<HeaderApp />
				<Route path='/' exact component={Home} />
				<Route path='/home' exact component={Home} />
				<Route path='/about' exact component={About} />
				<Route path='/browse' exact 
					render={ (props) => 
						<div>
							<Favourites
								photos={this.state.photos}
								favourites={this.state.favourites}
								removeFromFavourites={this.removeFromFavourites}
								downloadFaves={this.downloadFaves}
							/>
							<PhotoBrowser
								photos={this.state.photos}
								updatePhoto={this.updatePhoto}
								addToFavourites={this.addToFavourites}
								deletePhoto={this.deletePhoto}
							/>
						</div>
					}
				/>
			</div>
		);
	}
}

export default App;
