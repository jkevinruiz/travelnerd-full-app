import React, { Component } from 'react';
import * as cloneDeep from 'lodash/cloneDeep';
import { Route } from 'react-router-dom';
import PhotoBrowser from './components/PhotoBrowser.js';
import Home from './components/Home.js';
import About from './components/About.js';
import _ from 'lodash';
import Upload from './components/Upload.js';
import Login from './components/Login.js';


class App extends Component {
  constructor(props) {
    super(props);
    // temp backup copy of photos
    this.state = { photos: [], favorites: [], temp: [] };
  }

  /**
   * Asynchronous request for travel photo data.
   */
  async componentDidMount() {
    if (this.getLocalStorageFav() !== null) {
      this.setState({favorites: this.getLocalStorageFav()});
    }

    try {
      // const url = "https://randyconnolly.com/funwebdev/services/travel/images.php";
      // const response = await fetch(url);
      // const jsonData = await response.json();
      // this.setState( { photos: jsonData, temp: jsonData } );
      //const url = "https://randyconnolly.com/funwebdev/services/travel/images.php"
	    const url = "/api/images";
      const response = await fetch(url);
      const photoJson = await response.json();
      console.log(photoJson);

      this.setState({photos: photoJson, temp: photoJson});
    }
    catch (error) {
      console.error(error);
    }
  }

  /**
   * Renders/Displays website elements.
   */
  render() {
    return (
      <div>
        <Route path='/upload' exact component={Upload}></Route>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <Route path='/browse' exact 
          render={ (props) => 
          <PhotoBrowser
            downloadFavorites={ this.downloadFavorites}
            removeFav={ this.removeFav}
            removePhoto={ this.removePhoto}
            favorites={ this.state.favorites} 
            photos={ this.state.photos } 
            updatePhoto={ this.updatePhoto }  
            addPhotoToFavorites={ this.addPhotoToFavorites }

              />
           }
        />
        <Route path='/about' exact component={About} />
        <Route path='/login' exact component={Login} />
      </div>
     
    );
  }

  /**
   * This function updates information of specific Photo Location selected.
   * @param id - the identification number of current Photo being edited
   * @param photo - input data associated with 
   */
  updatePhoto = (id, photo) => {
    console.log("updating details");
    // Create a deep clone of photo array from state.
    // We will use a lodash function for that task.
    const copyPhotos = cloneDeep(this.state.photos);

    // find photo to update in cloned array
    const photoToReplace = copyPhotos.find( p => p.id === id);

    // replace photo fields with edited values
    photoToReplace.title = photo.title;
    photoToReplace.description = photo.description;
    photoToReplace.location.city = photo.location.city;
    photoToReplace.location.country = photo.location.country;
    photoToReplace.location.latitude = photo.location.latitude;
    photoToReplace.location.longitude = photo.location.longitude;

    // update state
    this.setState( { photos: copyPhotos } );
  }

  /**
   * This function updates state to add selected photo to favorites array.
   * @param id - id of the selected favorited photo
   */
  addPhotoToFavorites = (id) => {
    // find photo to add
    const photo = this.state.photos.find ( p => p.id === id);
    console.log(photo);

    // check if item is already in favorite
    // if not add it
    if (!this.state.favorites.find (p => p.id === id) ) {
      // create copy of favorites
      const copyFavorites = cloneDeep(this.state.favorites);
      
      // push item into array
      copyFavorites.push(photo);
      
      // update state
      this.setState( { favorites: copyFavorites });

      // update local storage
      this.updateLocalStorage(copyFavorites);
    } else {
      console.log ("Photo already in favorites")
    }
  }

  /**
   * This function removes photo selected from photos array.
   * @param id - this is the id of the photo to be removed
   */
  removePhoto = (id) => {
    let index = _.findIndex(this.state.photos, ['id', id]);
      
    if (index > -1) {
        // create copy of favorites
        const copyPhotos = cloneDeep(this.state.photos);
        //console.log(copyPhotos);
        // delete photo
        _.remove(copyPhotos, copyPhotos[index]);
        // update state
        this.setState({ photos: copyPhotos });
    }
  }

  /**
   * This function removes photo selected from favorites array.
   * @param id - this is the id of the favorited photo to be removed
   */
  removeFav = (id) => {
    let index = _.findIndex(this.state.favorites, ['id', id]);
    
    if (index > -1) {
        // create copy of favorites
        const copyFav = cloneDeep(this.state.favorites);
        //console.log(copyPhotos);
        // delete fav
        _.remove(copyFav, copyFav[index]);
        // update state
        this.setState({ favorites: copyFav });

        // update local storage
        this.updateLocalStorage(copyFav);
    }
  }

  /**
   * This function updates the local Storage to remember favorited photos of user.
   * @param data - array of favorited photos
   */
  updateLocalStorage = (data) => {
    localStorage.setItem('favorites', JSON.stringify(data));
  }

  /**
   * This function gets/acquires the local Storage of favorited photos of user.
   */
  getLocalStorageFav = () => {
    return JSON.parse(localStorage.getItem('favorites'));
  }

  /*
  * This function will large versions of favorited images
  * however due to CORS policy in order for the code to work in a localhost
  * environment, in chrome you would need to install the extension
  * https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
  * So far we have not found any alternative to these step
  */
  downloadFavorites = () => {
    const JSZip = require("jszip");
    const JSZipUtils = require('jszip-utils');
    const FileSaver = require("file-saver");
    const zip = new JSZip();
    const url = "https://storage.googleapis.com/project-pixels/large/";
    const proxy = 'https://cors-anywhere.herokuapp.com/';


    // Code from https://stuk.github.io/jszip/documentation/examples/downloader.html
    const image = function(url) {
      return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function(err, data) {
          if(err)
            reject(err);
          else
            resolve(data);
        });
      });
    }

    // iterates through favorites array and adds each image to zip
    for(let img of this.state.favorites) {
      console.log(proxy+url+img.filename);
      zip.file(img.title+".jpg", image(proxy + url + img.filename), {binary:true} );
    }

    // saves images as zip
    zip.generateAsync({type: "blob"})
    .then(function(content) {
      FileSaver.saveAs(content, "Favorites.zip");
    });
  }


}

export default App;
