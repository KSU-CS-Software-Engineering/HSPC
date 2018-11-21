import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import StudentDash from './StudentDash';
import './Login.css';

/**
 * Allows the user to a series of portals. The default portal is the basic student portal.
 */
export default class Login extends Component {
  constructor(props){
    super(props);
        this.state={
            username:'',
            password:''
        }
    }

  /**
   * Checks for matching user credentials and redirects the user to the proper portal.
   * @param {*} event 
   */
  handleClick(event){
    var apiBaseUrl = "http://localhost:3001";
    var self = this;
    var payload={
      "email":this.state.username,
      "password":this.state.password
    }

    // Rest API call. Verifies the user's login information and determines if the user has requested access.
    Axios.post(apiBaseUrl+'/auth/login', payload)
    .then(function (response){
            console.log(response);
            if(response.status == 200){
                console.log("Login successfull");
                // redirect to portal
            }
            else{
                console.log("Invalid Username/Password.");
                alert("Invalid Username/Password");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    /**
     * Handles switching between the Registration and Login pages.
     */
    handleSwitch(){
        this.props.history.push('/register');
    }

    /**
     * Renders the Login Page component. Allows the user to switch between Login and Registration.
     */
    render() {
        return (
        <div className="LoginBox">
            <MuiThemeProvider>
            <div>
            <h2>Returning User?</h2>
            <p>Please enter your username and password below.</p>
            <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange = {(event,newValue) => this.setState({username:newValue})}
            />
            <br/>
            <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <RaisedButton 
                className="LoginButton" 
                label="Sign In" 
                style={ {margin: 15} } 
                backgroundColor={'#350B4F'} 
                labelColor={white} 
                onClick={(event) => this.handleClick(event)}
            />
            <RaisedButton 
                className="RegisterButton" 
                label="Register an Account" 
                style={ {margin: 15} } 
                backgroundColor={'#00a655'} 
                labelColor={white} 
                onClick={this.handleSwitch.bind(this)}
            /> 
            <br />   
        </div>
        </MuiThemeProvider>
        </div>
        );
    }
}
