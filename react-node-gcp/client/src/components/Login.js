import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import './Login.css';
import HeaderApp from "./HeaderApp"



class Login extends Component {
    render() {
        return (
            <div className="loginContainer">
            <HeaderApp />
                <div className="loginBox">
                    <form className="loginForm">
                    <label><strong>Username</strong></label>
                    <input type="text" placeholder="Enter username here"/>

                    <label><strong>Password </strong></label>
                    <input type="text" placeholder="Enter password here"/>

                    </form>
                    <button type="submit">Login</button>
                    <Link to='/browse'><button> cancel </button> </Link> 
                </div>
            </div>
        );
    }
}

export default Login;