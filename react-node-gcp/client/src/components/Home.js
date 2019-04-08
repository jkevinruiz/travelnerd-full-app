import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    /**
     * Renders/Displays website elements.
     */
    render() {
        return (
            <div className="banner">
                <div>
                    <h1>Travel Nerd</h1>
                    <h3>Browse & Share</h3>
                    <p>
                        <Link to='/browse'>
                            <button>Browse</button>
                        </Link>
                        <Link to='/about'>
                            <button>About</button>
                        </Link>
                        {this.handleLogout()}
                        {console.log(this.props.getLoginSession())}
                    </p>
                </div>
            </div>
        );
    }

    handleLogout = () => {
        if (this.props.getLoginSession() == null) {
           return( <Link to='/login'>
            <button>Login</button>
            </Link>
            );
        } else {
            return( 
            <button onClick={this.props.logout}>Logout</button>
            );
        }
    }


}

export default Home;