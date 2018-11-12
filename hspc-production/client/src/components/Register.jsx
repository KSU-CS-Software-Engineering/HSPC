import React, { Component } from 'react'
import Axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import './Register.css';
import Login from './Login';
const style = { margin: 15 };
//const sqlite3 = require('sqlite3').verbose();
//var dbFile = './master.db';
//var db = new sqlite3.Database(dbFile);

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
        var apiBaseUrl = "http://localhost:3001/api/";
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
        Axios.post(apiBaseUrl+'/register', payload)
        .then(function (response) {
          console.log(response);
          if(response.data.code == 200){
          // console.log("registration successfull");
            var loginscreen=[];
            loginscreen.push(<Login parentContext={this}/>);
            var loginmessage = "Not Registered yet. Please register an account.";
            self.props.parentContext.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                buttonLabel:"Register",
                isLogin:true
            });
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

/*
// use this to insert data into db
var create_user = db.prepare(
    'INSERT INTO `users` (`Phone`, `FirstName`, `LastName`, `Email`, 'Role') ' +
    'VALUES (?, ?, ?, ?, ?)'
);
var create_team = de.prepare(
    'INSERT INTO `team` (`TeamName`, `Level`, `SchoolID`) ' +
    'VALUES (?, ?, ?)'
);
var create_school = de.prepare(
    'INSERT INTO `school` (`Address`, `State`, `PostalCode`) ' +
    'VALUES (?, ?, ?)'
);
// example data
    create_user.run('1234567890', 'First', 'Last', 'some@example.com', 'Student');
    create_user.finalize();
    db.close();
*/