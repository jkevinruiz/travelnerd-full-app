import React from 'react';

import { Link } from 'react-router-dom';

/**
 * Renders/Displays website elements.
 */
const HeaderMenu = function (props) {
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
            <Link to="/login"> 
                <button>Login</button>
            </Link>
        </nav>
    );
}

export default HeaderMenu;