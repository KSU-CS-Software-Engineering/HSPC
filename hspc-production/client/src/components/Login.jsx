import React, { Component } from 'react'
import Axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import UploadScreen from './UploadScreen';
import './Login.css';
const style = { margin: 15, };

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    // handles the click event and checking of the database for a user match - fix
    handleClick(event){
        var apiBaseUrl = "http://localhost:3001/api/";
        var self = this;
        var payload={
        "email":this.state.username,
        "password":this.state.password
        }

        // rest api? - fix
        Axios.post(apiBaseUrl+'login', payload)
        .then(function (response) {
        console.log(response);
        if(response.data.code == 200){
            console.log("Login successfull");
            var uploadScreen=[];
            uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
            self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        }
        else if(response.data.code == 204){
            console.log("Username password do not match");
            alert("username password do not match")
        }
        else{
            console.log("Username does not exists");
            alert("Username does not exist");
        }
        })
            .catch(function (error) {
            console.log(error);
        });
    }

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
