import React, { Component } from 'react';
import * as cloneDeep from 'lodash/cloneDeep';
import { Route, Redirect } from 'react-router-dom';
import PhotoBrowser from './components/PhotoBrowser.js';
import Home from './components/Home.js';
import About from './components/About.js';
import _ from 'lodash';
import ImageUpload from './components/ImageUpload.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)

    // temp backup copy of photos
    this.state = {
      photos: [],
      favorites: [],
      temp: [],
      email: null,
      apikey: null,
      userID: null,
      loggedIn: false
    };
  }

componentWillMount() {
  if (this.getLoginSession() !== null) {
    console.log(this.getLoginSession());
    const session = this.getLoginSession();
    this.setState({
      loggedIn: session.loggedIn,
      email: session.email,
      apiKey: session.apiKey,
      userID: session.userID
    })
  }
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

  logout = () => {
    localStorage.removeItem("session_login");
    this.setState({
      loggedIn: false,
      email: null,
      apiKey: null,
      userID: null
    })
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
      axios.get('/user/').then(response => {
        console.log('Get user response: ')
        console.log(response.data)
        if (response.data.user) {
          console.log('Get User: There is a user saved in the server session: ')

          this.setState({
            loggedIn: true,
            email: response.data.user.email,
            apiKey: response.data.user.apikey,
            userID: response.data.user.id
          })
        } else {
          console.log('Get user: no user');
          this.setState({
            loggedIn: false,
            email: null,
            apiKey: null,
            userID: null
          })
        }
      })
    }
  /**
   * Renders/Displays website elements.
   */
  render() {
    return (
      <div>
        <Route path='/upload' exact
          render={ (props) => (
            this.state.loggedIn ? (
              <ImageUpload userEmail={ this.state.email } userID={ this.state.userID} />
            ) : (
              <Redirect to="/login"/>
            )
          )}
        />
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <Route path='/browse' exact
          render={ (props) => (
            this.state.loggedIn ? (
              <PhotoBrowser
                downloadFavorites={ this.downloadFavorites}
                removeFav={ this.removeFav}
                removePhoto={ this.removePhoto}
                favorites={ this.state.favorites}
                photos={ this.state.photos }
                updatePhoto={ this.updatePhoto }
                addPhotoToFavorites={ this.addPhotoToFavorites }
                updateDB={ this.updateDB }
                logout={ this.logout }
                userID={ this.state.userID}
              />
            ) : (
              <Redirect to="/login"/>
            )
          )}
        />
        <Route path='/about' exact component={About} />
        <Route
          path='/login'
          render={() =>
            <Login updateUser={this.updateUser} loginLocalStorage={this.loginLocalStorage}/>
          }
        />
        <Route path='/register' exact component={Register} />
      </div>

    );
  }

  /**
   * This function updates information of specific Photo Location selected.
   * @param id - the identification number of current Photo being edited
   * @param photo - input data associated with
   */
  updatePhoto = (id, photo) => {
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

    photoToReplace.exif.make = photo.exif.make;
    photoToReplace.exif.model = photo.exif.model;
    photoToReplace.exif.exposure_time = photo.exif.exposure_time;
    photoToReplace.exif.aperture = photo.exif.aperture;
    photoToReplace.exif.focal_length = photo.exif.focal_length;
    photoToReplace.exif.iso = photo.exif.iso;

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
    // console.log(photo);
    // console.log(this.state.userID);
    // console.log(photo.user.userid);

    // find photo in favorites

    // check if item is already in favorite && check if its their own image
    // if not add it
    if ( (!this.state.favorites.find (p => p.id === id)) && (photo.user.userid !== Number(this.state.userID ))) {
      // create copy of favorites
      const copyFavorites = cloneDeep(this.state.favorites);

      // push item into array
      copyFavorites.push(photo);

      // update state
      this.setState( { favorites: copyFavorites });

      // update local storage
      this.updateLocalStorage(copyFavorites);
    } else {
      console.log ("Photo already in favorites/ Cannot favorite your own image")
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

  loginLocalStorage = (data) => {
    localStorage.setItem('session_login', JSON.stringify(data));
  }

  getLoginSession = () => {
    return JSON.parse(localStorage.getItem('session_login'));
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

  updateDB = (id) => {
    let index = _.findIndex(this.state.photos, ['id', id]);

    if (index > -1) {
        // create copy of favorites
        const photo = this.state.photos.find ( p => p.id === id);
        console.log(id);
        console.log(photo);
        console.log(photo.exif.iso);
        const formData = new FormData();
        formData.append('title', photo.title);
        formData.append('description', photo.description);
        formData.append('country', photo.location.country);
        formData.append('city', photo.location.city);
        formData.append('latitude', photo.location.latitude);
        formData.append('longitude', photo.location.longitude);
        formData.append('exifiso', photo.exif.iso);
        formData.append('make', photo.exif.make);
        formData.append('model', photo.exif.model);
        formData.append('exposure_time', photo.exif.exposure_time);
        formData.append('aperture', photo.exif.aperture);
        formData.append('focal_length', photo.exif.focal_length);

        const config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

        axios.put("/api/image/" + id , formData, config)
            .then((response) => {
                console.log("updated image");
            })
            .catch((err) => {
                console.log(err);
            })

        // for(let property in copyPhotos) {
        //   console.log(property, copyPhotos[property]);
        // }
    }
  }


}

export default App;
