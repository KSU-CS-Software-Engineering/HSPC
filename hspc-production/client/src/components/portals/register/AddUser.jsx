import React, { Component } from 'react'
import AuthService from '../../../_common/services/auth'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import './Register.css';

export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.refreshPage = this.refreshPage.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            accessLevel: '1',
            teamName: this.props.teamName,
        }
    }

    /*************************************************************************************
    * Handles the registration of users and adds the user information to the SQL database.
    * @param {*} event button event that handles submission of user information.
    *************************************************************************************/
    handleRegister(event) {
        console.log(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.teamName);
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '') {
            this.statusMessages.current.showError('Something went wrong. Please try again');
            return;
        }
        if(this.state.teamName === '' || this.state.teamName === undefined ){
            this.statusMessages.current.showError('Please Enter a Team Name.');
            return;
        }

        AuthService.register(this.state.teamName, this.state.firstName, this.state.lastName, this.state.email, this.state.phone, this.state.password, this.state.accessLevel)
            .then((response) => {
                if (response.statusCode === 201)
                    this.statusMessages.current.showSuccess("Registration Successful!");
                else
                    this.statusMessages.current.showError('Something went wrong. Please try again');
            })
            .catch((error) => {
                this.statusMessages.current.showError('Something went wrong. Please try again.');
            });
    }

    /*************************************************************************************
    * IN PROGRESS
    * Refreshes the page and removes any error messages.
    *************************************************************************************/
    refreshPage() {
        this.statusMessages.current.showError(null);
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
    }

    /**************************************************************************************
    * Renders the component UI.
    **************************************************************************************/
    render() {
        console.log(this.props.teamName);
        return (
            <div className="RegisterBox">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2>Add a Student</h2>
                <p><b>Please fill out the information below.</b></p>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <TextField
                            hintText="Enter a Team Name"
                            floatingLabelText="Team Name"
                            defaultValue={this.props.teamName}
                            onChange={(event, newValue) => this.setState({ teamName: newValue })}
                        />
                        <br />
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
                            hintText="Enter the Student's Phone #"
                            type="email"
                            floatingLabelText="Phone # (Optional)"
                            onChange={(event, newValue) => this.setState({ phone: newValue })}
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
                            onClick={this.refreshPage}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}