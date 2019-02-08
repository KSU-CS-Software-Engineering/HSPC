import React, { Component } from 'react'
import Axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import StatusMessages from '../_common/components/status-messages/status-messages';
import './Register.css';

const apiBaseUrl = "http://localhost:3001";

/**
 * Summary. Processes user information and allows the user to instantly create a basic user account or request higher access.
 */
export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            accessLevel: '1',
            teamName: this.props.team_name,
            isVerified: false,
        }
    }

    /**
     * Handles the registration of users and adds the user information to the SQL database.
     * @param {*} event button event that handles submission of user information.
     */
    handleRegister(event) {
        console.log(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.teamName);
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '') {
            this.statusMessages.current.showError('Something went wrong. Please try again');
            return;
        }
        var dataPackage = {
            "teamName": this.state.teamName,
            "firstName": this.state.first_name,
            "lastName": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password,
            "accessLevel": this.state.accessLevel
        }
        Axios.post(apiBaseUrl + '/user/adduser', dataPackage)
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    this.statusMessages.current.showSuccess("Registration Complete!");
                }
                else
                    this.statusMessages.current.showError('Something went wrong. Please try again');
            })
            .catch((error) => {
                this.statusMessages.current.showError('Something went wrong. Please try again.');
            });
    }

    render() {
        return (
            <div className="RegisterBox">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2>Add a Student</h2>
                <p><b>Please fill out the information below.</b></p>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <TextField
                            hintText="Enter the Student's First Name"
                            floatingLabelText="First Name"
                            onChange={(event, newValue) => this.setState({ firstName: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter the Student's Last Name"
                            floatingLabelText="Last Name"
                            onChange={(event, newValue) => this.setState({ lastName: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter the Student's Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter a Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton
                            className="RegisterButton"
                            label="Add to Team"
                            style={{ margin: 15 }}
                            backgroundColor={'#00a655'}
                            labelColor={white}
                            onClick={(event) => this.handleRegister(event)}
                        />

                        <p><b>Add another student?</b></p>
                        <RaisedButton
                            className="AddStudentButton"
                            label="Next Student"
                            style={{ margin: 15 }}
                            backgroundColor={'#350B4F'}
                            labelColor={white}
                            onClick={this.forceUpdate}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}