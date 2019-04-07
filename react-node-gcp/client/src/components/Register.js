import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
import HeaderApp from "./HeaderApp"
import axios from 'axios'

class Register extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
      redirectTo: null
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		console.log('sign-up handleSubmit, email: ')
		console.log(this.state.email)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/users/register', {
			email: this.state.email,
			password: this.state.password,
      password2: this.state.confirmPassword
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('email already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

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
                        placeholder="Enter email here"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />

                      <label><strong>Password </strong></label>
                      <input
                        type="password"
                        placeholder="Enter password here"
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />

                      <label><strong>Confirm Password </strong></label>
                      <input
                        type="password"
                        placeholder="Reenter password here"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                      />

                      </form>
                      <button type="submit" onClick={this.handleSubmit} >Register</button>
                      <Link to='/login'><button> Cancel </button> </Link>
                  </div>
              </div>
          </div>

        );
    }
}

export default Register;
