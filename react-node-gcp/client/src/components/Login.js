import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
import HeaderApp from "./HeaderApp"
import axios from 'axios'


class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  //  this.props.updateUser = this.props.updateUser.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit')

    axios
      .post('/users/login', {
         email: this.state.email,
         password: this.state.password
     })
     .then(response => {
       console.log('login response: ')
       console.log(response)
       if (response.status === 200) {
           // update App.js state
           this.props.updateUser({
               loggedIn: true,
               email: response.data.user.email,
               apikey: response.data.user.apikey,
               userID: response.data.user.id
           })

           // create a session storage
           this.props.loginLocalStorage({
            loggedIn: true,
            email: response.data.user.email,
            apikey: response.data.user.apikey,
            userID: response.data.user.id
           })

           // update the state to redirect to home
           console.log("updating redirectTo");
           this.setState({
               redirectTo: '/'
           })
       }
   }).catch(error => {
       console.log('login error: ')
       console.log(error);

   })

  }

    render() {
      if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
      } else if (this.props.getLoginSession() !== null) {
        return <div className="loginContainer">
                <div className="loginBox">
                  <button onClick={this.props.logout}>Logout</button>
                  </div>
              </div>;
      } else 
        return (
            <div>
                <HeaderApp />
                <div className="loginContainer">
                    <div className="loginBox">
                        <form className="loginForm" onSubmit={this.handleSubmit}>
                        <label><strong>Email</strong></label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Enter email here"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />

                        <label><strong>Password </strong></label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter password here"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />

                        </form>
                        <button onClick={this.handleSubmit} type="submit">Login</button>
                        <Link to='/'><button> Cancel </button> </Link>
                        <p>New user? Register for an account:</p>
                            <Link to='/register'>
                                <button>Register</button>
                            </Link>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
