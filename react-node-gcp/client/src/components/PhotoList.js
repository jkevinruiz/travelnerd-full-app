import React from 'react';
import PhotoThumb from './PhotoThumb';

class PhotoList extends React.Component {

    /**
     * Renders/Displays website elements.
     */
    render() {
        if (this.props.photos.length > 0 ) {
            return (
                <div className="photos">
                    <div className="list">
                        { this.props.photos.map( (p) => <PhotoThumb changeRenderView={this.props.changeRenderView} updateCurrentPhoto={this.props.updateCurrentPhoto} removeFav={this.props.removeFav} removePhoto={ this.props.removePhoto} photo={p} key={p.id} showImageDetails={ this.props.showImageDetails } addPhotoToFavorites={ this.props.addPhotoToFavorites } /> ) }
                    </div>
                </div>
            );
        } else {
            return null;
        }

    }

}

export default PhotoList;