import React from 'react';

class FavoriteItem extends React.Component {

    /**
     * Renders/Displays website elements.
     */
    render() {
        // const imgURL = `https://storage.googleapis.com/funwebdev-3rdtravel/square-medium/${this.props.photo.path}`
        const imgURL = `https://storage.googleapis.com/funwebdev-3rd-travel/square-medium/${this.props.favorites.path}`;
        return (
            <div className="favoriteItem">
                <button onClick={this.handleRemoveFav}>X</button>
                <img src={ imgURL } title= {this.props.favorites.title} alt={ this.props.favorites.title } />
            </div>
        );
    }

    /**
     * This calls the function in the parent component to delete favorited photo from favorites array.
     */
    handleRemoveFav = () => {
        this.props.removeFav(this.props.favorites.id);
    }
}

export default FavoriteItem;