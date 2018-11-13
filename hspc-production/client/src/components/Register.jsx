import React, { Component } from 'react'
import Axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import './Register.css';
import Login from './Login';
const style = { margin: 15 };


export default class Register extends Component {
    constructor(props){
      super(props);
      this.state={
        first_name:'',
        last_name:'',
        email:'',
        password:''
      }
    }

    // handles the adding of a new user to the database - fix
    handleClick(event){
        var apiBaseUrl = "http://localhost:3001";
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
        if(this.state.first_name == '' || this.state.last_name == ''
          || this.state.email == '' || this.state.password == ''){
            alert("Invalid input. Please try again.");
            return;
          }
        var self = this;
        var payload={
            "first_name": this.state.first_name,
            "last_name":this.state.last_name,
            "email":this.state.email,
            "password":this.state.password
        }
        
        // rest api? - fix
        Axios.post(apiBaseUrl+'/auth/register', payload)
        .then(function (response) {
          console.log(response);
          if(response.status == 201){
            alert("Registration Complete!");
            // redirect to login.
          }
        })
       .catch(function (error) {
         console.log(error);
       });
    }

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
             <RaisedButton 
                className="RegisterButton" 
                label="Create Account" 
                style={style} 
                backgroundColor={'#350B4F'} 
                labelColor={white} 
                onClick={(event) => this.handleClick(event)}
               />
            </div>
           </MuiThemeProvider>
        </div>
      );
    }
}