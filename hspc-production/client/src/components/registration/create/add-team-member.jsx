import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AuthService from '../../../_common/services/auth';
import TeamService from '../../../_common/services/team';
import UserService from '../../../_common/services/user';
import Select from 'react-select';
import '../../../_common/assets/css/register-user.css';

const selectStyles = {
    menu: base => ({
        ...base,
        zIndex: 100
    })
};

/*
* @author: Daniel Bell
*/
export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            accessLevel: '1',
            advisorEmail: this.props.advisor,
            teamName: this.props.teamName,
            teamList: [],
            show: false
        }
    }

    /*
    * Loads the values of registered teams and populates the dropdown.
    */
    componentDidMount = () => {
        TeamService.getAllTeams()
            .then((response) => {
                let body = JSON.parse(response.body);
                let teams = [];
                if (response.statusCode === 200 && this.state.advisorEmail === undefined) {
                    for (let i = 0; i < body.length; i++) {
                        teams.push({
                            label: body[i].TeamName,
                            value: body[i].TeamName
                        });
                    }
                }
                else if (response.statusCode === 200) {
                    for (let i = 0; i < body.length; i++) {
                        if (body[i].AdvisorEmail === this.state.advisorEmail) {
                            teams.push({
                                label: body[i].TeamName,
                                value: body[i].TeamName
                            });
                        }
                    }
                }
                else {
                    console.log("An error has occurred, Please try again.");
                }
                this.setState({ teamList: teams });
            }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Closes the Modal Component.
    */
    handleClose = () => {
        this.setState({ show: false });
    }

    /*
    * Renders the Modal component if there's a conflict in user registration.
    */
    handleShow = () => {
        this.setState({ show: true });
    }

    /*
    * Adds the value of 'teamName' to the database to user with the value 'email'
    */
    updateTeamValue = () => {
        UserService.addToTeam(this.state.teamName, this.state.email)
            .then((response) => {
                if (response.statusCode === 201) {
                    this.handleClose();
                    this.statusMessages.current.showSuccess("Account Successfully Updated!");
                }
            })
            .catch(() => {
                this.statusMessages.current.showError('Something went wrong. Please try again.');
            });
    }

    /*
    * Handles the registration of users and adds the user information to the database.
    */
    handleRegister() {
        AuthService.register(this.state.teamName, this.state.firstName, this.state.lastName, this.state.email, this.state.phone, this.state.password, this.state.accessLevel, '')
            .then((response) => {
                if (response.statusCode === 201)
                    this.statusMessages.current.showSuccess("Registration Successful!");
                else if (response.statusCode === 409) {
                    this.handleShow();
                }
                else{
                    this.statusMessages.current.showError(response.body.message);
                }
            })
            .catch(() => {
                this.statusMessages.current.showError('Something went wrong. Please try again.');
            });
    }

    /*
    * Generates an alpna-numeric, pseudo-random string for new users passwords. 
    * Inspired by: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    */
    generatePassword() {
        var password = "";
        var alphaNumerics = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++)
            password += alphaNumerics.charAt(Math.floor(Math.random() * alphaNumerics.length));
        return password;
    }

    /*
    * Renders the component UI.
    */
    render() {
        return (
            <div className="RegisterBox">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2>Add a Student</h2>
                <p><b>Please fill out the information below.</b></p>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <div id='search-list'>
                            <Select
                                styles={selectStyles}
                                placeholder="Enter a Team Name"
                                options={this.state.teamList}
                                onChange={opt => this.setState({ teamName: opt.label })}
                            />
                        </div>
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
                            labelColor={'#ffffff'}
                            onClick={(event) => this.handleRegister(event)}
                        />

                        <p><b>Add another student?</b></p>
                        <RaisedButton
                            className="AddStudentButton"
                            label="Next Student"
                            style={{ margin: 15 }}
                            backgroundColor={'#350B4F'}
                            labelColor={'#ffffff'}
                            onClick={this.refreshPage}
                        />
                    </div>
                </MuiThemeProvider>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>The account already exists, would you like to add this user to the team below?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button variant="primary" onClick={this.updateTeamValue}>Accept</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
