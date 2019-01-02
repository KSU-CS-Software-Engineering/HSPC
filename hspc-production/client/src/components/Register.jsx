import React, { Component } from 'react'
import Axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import './Register.css';

/**
 * Summary. Processes user information and allows the user to instantly create a basic user account or request higher access.
 */
export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      accesslevel: '1'
    }
  }

  /**
   * Handles the registration of users and adds the user information to the SQL database.
   * @param {*} event button event that handles submission of user information.
   */
  handleRegister(event){
      var apiBaseUrl = "http://localhost:3001";
      console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
      if(this.state.first_name === '' || this.state.last_name === ''
        || this.state.email === '' || this.state.password === ''){
          alert("Invalid input. Please try again.");
          return;
      }
      var payload={
          "first_name": this.state.first_name,
          "last_name":this.state.last_name,
          "email":this.state.email,
          "password":this.state.password,
          "accesslevel":this.state.accesslevel
      }
        
      // captcha goes here

      // Rest API call. Creates a new column in the users table in the database and adds cooresponding payload values.
      Axios.post(apiBaseUrl+'/auth/register', payload)
      .then(function (response) {
        console.log(response);
        if(response.status === 201){
          alert("Registration Complete!");
            // redirect to login.
          }
        })
      .catch(function (error) {
        console.log(error);
      });
    }

  /**
   * Handles switching between the Registration and Login pages.
   */
  handleSwitch(){
    this.props.history.push('/login');
  }

  /*
  * Handle the changing of access level.
  */
  handleChange = (value, event) => {
    this.setState({accesslevel: value}, () => {
      console.log("Access level changed.");
      if(this.state.accesslevel !== '1'){
        alert("If account is anything other than 'Student' it will be subjected to further review.");
      }
    });
  }

  /**
   * Renders the Registration Page component. Allows the user to switch between Login and Registration. 
   */
  render() {
    return (
      <div className="RegisterBox">
        <h2>New User?</h2>
        <p><b>Please fill out the information below.</b></p>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              onChange = {(event,newValue) => this.setState({first_name:newValue})}
            />
            <br/>
            <TextField
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange = {(event,newValue) => this.setState({last_name:newValue})}
            />
            <br/>
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange = {(event,newValue) => this.setState({email:newValue})}
            />
            <br/>
            <TextField
              type = "password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>
            <p><br />Please select an account type.</p>
            <ToggleButtonGroup className="RoleSelect" type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1} onChange={this.handleChange.bind(this, 1)}>Student</ToggleButton>
              <ToggleButton value={2} onChange={this.handleChange.bind(this, 2)}>Volunteer</ToggleButton>
              <ToggleButton value={3} onChange={this.handleChange.bind(this, 3)}>Judge</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <RaisedButton 
              className="RegisterButton" 
              label="Create Account" 
              style = { {margin: 15} }
              backgroundColor={'#00a655'} 
              labelColor={white} 
              onClick={(event) => this.handleRegister(event)}
            />
          </div>
          <div className="LoginSwitchBox">
            <p><br /><b>Already have an account?</b></p>
            <RaisedButton 
              className="LoginButton" 
              label="Sign In" 
              style = { {margin: 15} } 
              backgroundColor={'#350B4F'} 
              labelColor={white} 
              onClick={this.handleSwitch.bind(this)}
            />
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}