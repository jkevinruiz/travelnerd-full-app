import React from 'react';

class ViewSinglePhoto extends React.Component {

    /**
     * Renders/Displays website elements.
     */
    render() {
        const id = this.props.currentPhoto;
        const imgURL = `https://storage.googleapis.com/project-pixels/large/`;
        if (this.props.photos.length > 0) {
            const photo = this.props.photos.find( p => p.id === id);
            if (photo != null) {
                return (
                    <article className="details">
                        <div className="detailsPhotoBox">
                            <div className="photoForm">
                                <img src={imgURL+photo.filename} alt={photo.title}/>
                                <br></br>
                                <h2>{photo.title}</h2>
                                <p>{photo.description}</p>
                                <p>{photo.location.city}, {photo.location.country}</p>
                                <button onClick={this.handleEdit}>Edit</button>
                                <button onClick={this.handleMap}>Map</button>
                                {this.handleEXIFDate(photo)}
                                {/* <span>
                                    <p>Shot with: {photo.exif.make}, {photo.exif.model}</p>
                                    <p>Exposure: {photo.exif.exposure_time}</p><p>Aperature: {photo.exif.aperature}</p>
                                </span> */}
                            </div>
                        </div>
                    </article>

                );
            } else {
                console.log("viewsinglephoto photo is null");
                return (
                        <div className="detailsPhotoBox">
                            <h1>Select Photo to display here</h1>
                        </div>
                );
            }
        } else {
            return null;
        }
    }

    /**
     * This function calls a parent component's function to change the data to be displayed into its edit mode.
     */
    handleEdit = () => {
        this.props.changeRenderView("edit");
    }

    /**
     * This function calls a parent component's function to change the data to be displayed into its map mode.
     */
    handleMap = () => {
        this.props.changeRenderView("map");
    }

    handleEXIFDate = (photo) => {
        var make = 'Not available';
        var model = 'Not available';
        var exposure = 'Not available';
        var aperture = 'Not available';
        var focalLength = 'Not available';
        var iso = 'Not available';
        

        if(photo.exif.make !== undefined) {
            make = photo.exif.make; 
        }
        if(photo.exif.model !== undefined) {
            model = photo.exif.model;
        }
        if(photo.exif.exposure_time !== undefined) {
            exposure = photo.exif.exposure_time;
        }
        if(photo.exif.aperture !== undefined) {
            aperture = photo.exif.aperture;
        }
        if(photo.exif.focal_length !== undefined) {
            focalLength = photo.exif.focal_length;
        }
        if(photo.exif.iso !== undefined) {
            iso = photo.exif.iso;
        }
        return(
            <div className="exifInfo"> 
                <p><strong>Shot with:</strong> {make}, {model}</p>
                <p><strong>Exposure:</strong> {exposure}, <strong>Aperture:</strong> {aperture}</p>
                <p><strong>Focal Length:</strong> {focalLength}, <strong>ISO:</strong> {iso}</p>
            </div>
        );
        
    }
}

export default ViewSinglePhoto;