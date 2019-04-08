import React from 'react';
import HeaderBar from './HeaderBar.js';
import HeaderMenu from './HeaderMenu.js';

/**
 * Renders/Displays website elements.
 */
class HeaderApp extends React.Component {
  render () {
    return (
        <header className="header">
            <HeaderBar />
            <HeaderMenu logout={ this.props.logout } />
        </header>
    );
  }
}

export default HeaderApp;
