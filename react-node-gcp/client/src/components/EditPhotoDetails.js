import React from 'react';
import './EditPhotoDetails.css';


class EditPhotoDetails extends React.Component {

    /**
     * Renders/Displays website elements.
     */
    render() {
        const id = this.props.currentPhoto;
        const imgURL = `https://storage.googleapis.com/project-pixels/large/`;

        // just in case, handle missing photos in the props
        if ( this.props.photos.length > 0 ) {
            // find the object with this id
            const photo = this.props.photos.find( p => p.id === id );
            if (photo != null) {
                console.log(photo);
                return(
                    <article className="details">
                        <div className="detailsPhotoBox">
                            <form className="photoForm">
                                {/* <legend>Edit Photo Details</legend> */}
                                <img src={imgURL+photo.filename} alt={ photo.title } />
                                <br></br>
                                <label>Title</label>
                                <input type="text" name="title" value={ photo.title } onChange={ this.handleChange } />
                                <br></br>
                                <label>Description</label>
                                <input type="text" name="description" value={ photo.description } onChange={ this.handleChange } />
                                <br></br>
                                <div className="location">
                                    <span>
                                        <label>City</label>
                                        <input type="text" data="location" name="city" value={ photo.location.city } onChange={ this.handleChange }/>
                
                                        <label>Country</label>
                                        <input type="text" data="location" name="country" value={ photo.location.country } onChange={ this.handleChange } />
                                        
                                        <label>ISO</label>
                                        <input type="number" data="exif" name="iso" value={photo.exif.iso} onChange={ this.handleChange } ></input>
                                    </span>    
                                    <span>
                                        <label>latitude</label>
                                        <input type="number" data="location" name="latitude" value={ photo.location.latitude } onChange={ this.handleChange } />
                
                                        <label>longitude</label>
                                        <input type="number" data="location" name="longitude" value={ photo.location.longitude } onChange={ this.handleChange } />
                                    </span>
                                    <span>
                                        <label>Shot with: </label>
                                        <input type="text" data="exif" name="make" value={photo.exif.make} onChange={ this.handleChange } ></input>

                                        <label>Model</label>
                                        <input type="text" data="exif" name="model" value={photo.exif.model} onChange={ this.handleChange } ></input>
                                        
                                        <label>Exposure: </label>
                                        <input type="text" data="exif" name="exposure_time" value={photo.exif.exposure_time} onChange={ this.handleChange } ></input>
                                        

                                    </span>
                                    <span>
                                        <label>Aperture</label>
                                        <input type="text" data="exif" name="aperture" value={photo.exif.aperture} onChange={ this.handleChange } ></input>
                                        
                                        <label>Focal length: </label>
                                        <input type="text" data="exif" name="focal_length" value={photo.exif.focal_length} onChange={ this.handleChange } ></input>
                                    </span>                           
                                </div>
                            </form>
                            {/* <label id="editTwoBtn">  </label> */}
                            <button onClick={this.handleView}>View</button>
                            {/* <label id="editTwoBtn">  </label> */}
                            <button onClick={this.handleMap} >Map</button> 
                        </div>
                    </article>
                );
            } else {
                return (
                        <div className="detailsPhotoBox">
                            <h1>Photo Removed</h1>
                        </div>
                );
            }
        } else {
            return null;
        }
    }

    /**
     * This function calls the function using props from a parent component to change information to be displayed into View data.
     */
    handleView = () => {
        this.props.changeRenderView("view");
    }

    /**
     * This function calls the function using props from a parent component to change information to be displayed into Map data.
     */
    handleMap = () => {
        this.props.changeRenderView("map");
    }

    /**
     * This function updates the Photo's information based on the changes in the user places in the input fields.
     * @param e - event parameter
     */
    handleChange = (e) => {
        // find the current photo in our photo array
        const id = this.props.currentPhoto;
        const photo = this.props.photos.find( p => p.id === id );
        const name = e.currentTarget.name;

        // update the photo using these 3 steps ...

        // 1. make a clone of the current photo object
        const clonedPhoto = { ...photo };

        // 2. update value of field that just changed
        if (!e.currentTarget.getAttribute('data'))
            clonedPhoto[name] = e.currentTarget.value;
        else 
            clonedPhoto[e.currentTarget.getAttribute('data')][name] = e.currentTarget.value;

        // 3. tell parent (or above) to update the state for this photo
        this.props.updatePhoto(this.props.currentPhoto, clonedPhoto);
    }

    defaultImage = () => {
        this.props.defaultImage();
    }
}

export default EditPhotoDetails;