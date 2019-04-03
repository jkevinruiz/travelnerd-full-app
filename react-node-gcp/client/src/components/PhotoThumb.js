import React from "react";

class PhotoThumb extends React.Component {

    /**
     * This function calls a few parent component's functions to remove photo from photo array, 
     * favorites array, and update current photo being displayed.
     */
    handleRemovePhoto = () => {
        this.props.removePhoto(this.props.photo.id);
        this.props.removeFav(this.props.photo.id);
        this.props.updateCurrentPhoto();
    }

    /**
     * This function calls a parent component's function to display selected thumbnail's information.
     */
    handleViewClick = () => {
        this.props.showImageDetails(this.props.photo.id);
    }

    /**
     * This function calls a parent component's function to add photo selected to favorites.
     */
    handleFavorites = () => {
        this.props.addPhotoToFavorites(this.props.photo.id);
    }

    /**
     * This function calls a parent component's function to change the data to be displayed into its edit mode.
     */
    handleEdit = () => {
        this.props.changeRenderView("edit");
    }

    /**
     * This function calls a parent component's function to change the data to be displayed into its view mode.
     */
    handleView = () => {
        this.props.changeRenderView("view");
    }

    /**
     * This function calls a parent component's function to change the data to be displayed into its map mode.
     */
    handleMap = () => {
        this.props.changeRenderView("map");
    }

    /**
     * Renders/Displays website elements.
     */
    render() {
        const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/square-medium/${ this.props.photo.path }`;
    
        return (
            <div className="photoBox" onClick= { this.handleViewClick }>
                <figure>
                    <img src={imgURL} className="photoThumb" title={ this.props.photo.title } alt={ this.props.photo.title } />
                </figure>

                <div className="photoBoxDetails">
                    <button className="close" onClick={this.handleRemovePhoto} >X</button>
                    <h3>{ this.props.photo.title }</h3>
                    <p>{ this.props.photo.city  }, { this.props.photo.country  }</p>
                    <button onClick={ this.handleView } >View</button>
                    <button onClick={ this.handleFavorites}> ❤ </button>
                    <button onClick={ this.handleMap}>Map</button>
                    <button onClick={ this.handleEdit}>Edit</button>              
                </div>
            </div>
        );
    }

}

export default PhotoThumb;