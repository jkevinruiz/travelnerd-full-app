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
                                <span>
                                    <p>EXIF Data</p>
                                    <p>`Make: ${photo.exif.make}`</p>
                                </span>
                            </div>
                        </div>
                    </article>

                );
            } else {
                console.log("viewsinglephoto photo is null");
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


}

export default ViewSinglePhoto;