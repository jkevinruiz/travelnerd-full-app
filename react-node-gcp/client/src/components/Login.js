import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    console.log("Submitted")
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
               email: response.data.email,
               apikey: response.data.apikey,
               userID: response.data.id
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
      }
        return (
            <div>
                <HeaderApp />
                <div className="loginContainer">
                    <div className="loginBox">
                        <form className="loginForm">
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
                        <button type="submit" onClick={this.handleSubmit}>Login</button>
                        <Link to='/browse'><button> Cancel </button> </Link>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
