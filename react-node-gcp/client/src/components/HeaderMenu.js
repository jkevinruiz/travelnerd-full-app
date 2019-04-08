import React from 'react';

import { Link } from 'react-router-dom';

/**
 * Renders/Displays website elements.
 */
class HeaderMenu extends React.Component {
  render () {
    return (
        <nav>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <Link to="/browse">
                <button>Browse</button>
            </Link>
            <Link to="/about">
                <button>About</button>
            </Link>
            <Link to="/upload">
                <button>Upload</button>
            </Link>
            <Link to="/">
                <button onClick={ this.props.logout }>Logout</button>
            </Link>
        </nav>
    );
  }
}

export default HeaderMenu;
