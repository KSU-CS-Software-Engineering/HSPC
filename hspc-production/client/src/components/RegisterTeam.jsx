import React, { Component } from 'react'
import AddUser from './AddUser';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import StatusMessages from '../_common/components/status-messages/status-messages';
import ReCAPTCHA from 'react-recaptcha';
import './Register.css';
import AuthService from '../_common/services/auth'

/**
 * Summary. Processes user information and allows the user to instantly create a basic user account or request higher access.
 */
export default class RegisterTeam extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handleRegisterTeam = this.handleRegisterTeam.bind(this);
        this.state = {
            teamName: ' ',
            schoolName: ' ',
            schoolAddress: ' ',
            stateCode: ' ',
            questionLevel: '1',
            isVerified: false,
            redirect: false
        }
    }

    /**
     * Handles the registration of teams and adds the team information to the SQL database.
     * @param {*} event button event that handles submission of user information.
     */
    handleRegisterTeam(event) {
        if (this.state.isVerified) {
            console.log(this.state.teamName, this.state.schoolName, this.state.schoolAddress, this.state.stateCode, this.state.questionLevel);
            if (this.state.teamName === '' || this.state.schoolName === '' || this.state.schoolAddress === '' || this.state.stateCode === '') {
                this.statusMessages.current.showError('Something went wrong. Please try again');
                return;
            }
            AuthService.registerTeam(this.state.teamName, this.state.schoolName, this.state.schoolAddress, this.state.stateCode, this.state.questionLevel)
                .then((response) => {
                    if (response.statusCode === 201) {
                        this.statusMessages.current.showSuccess("Registration Complete!");
                        this.setState({ redirect: true });
                    }
                    else {
                        this.statusMessages.current.showError('Something went wrong. Please try again');
                    }
                })
                .catch((error) => {
                    this.statusMessages.current.showError('Something went wrong. Please try again.');
                });
        } else {
            this.statusMessages.current.showError("Please verify that you are a human.");
        }
    }

    /*
    * Handle the changing of access level.
    */
    handleChange = (value, event) => {
        this.setState({ questionLevel: value });
    }

    /*
    * Indicates successful loading of the captcha for debugging purposes
    */
    recaptchaLoaded() {
        console.log('captcha successfully loaded.');
    }

    /*
    * Changes the verfied state to true following a verified captcha result.
    */
    verifyCallback(response) {
        if (response)
            this.setState({ isVerified: true })
        else
            this.setState({ isVerified: false })
    }

    /**
     * Auto-Redirect to the Add Users Page. By default, this method renders the registration box. 
     */
    renderRedirect() {
        if (this.state.redirect === false) {
            return (
                <div className="RegisterBox" >
                    <StatusMessages ref={this.statusMessages}></StatusMessages>
                    <h2>New Team?</h2>
                    <p><b>Please fill out the information below.</b></p>
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <div>
                            <TextField
                                hintText="Enter your Team Name"
                                floatingLabelText="Team Name"
                                onChange={(event, newValue) => this.setState({ teamName: newValue })}
                            />
                            <br />
                            <TextField
                                hintText="Enter your School Name"
                                floatingLabelText="School Name"
                                onChange={(event, newValue) => this.setState({ schoolName: newValue })}
                            />
                            <br />
                            <TextField
                                hintText="Enter your School Address"
                                floatingLabelText="Address"
                                onChange={(event, newValue) => this.setState({ schoolAddress: newValue })}
                            />
                            <br />
                            <TextField
                                hintText="Enter your State"
                                floatingLabelText="State"
                                onChange={(event, newValue) => this.setState({ stateCode: newValue })}
                            />
                            <br />
                            <p><br />Please select an experience level.</p>
                            <ToggleButtonGroup className="RoleSelect" type="radio" name="options" defaultValue={1}>
                                <ToggleButton value={1} onChange={this.handleChange.bind(this, 'Beginner')}>Beginner</ToggleButton>
                                <ToggleButton value={2} onChange={this.handleChange.bind(this, 'Advanced')}>Advanced</ToggleButton>
                            </ToggleButtonGroup>
                            <br /><br />
                            <div align="center">
                                <ReCAPTCHA
                                    class="Captcha"
                                    sitekey="6LdB8YoUAAAAAL5OtI4zXys_QDLidEuqpkwd3sKN"
                                    render="explicit"
                                    onloadCallback={this.recaptchaLoaded}
                                    verifyCallback={this.verifyCallback}
                                />
                            </div>
                            <RaisedButton
                                className="RegisterButton"
                                label="Register Team"
                                style={{ margin: 15 }}
                                backgroundColor={'#00a655'}
                                labelColor={white}
                                onClick={(event) => this.handleRegisterTeam(event)}
                            />
                        </div>
                    </MuiThemeProvider>
                </div>
            )
        }
        else {
            return <AddUser teamName={this.state.teamName} />;
        }
    }

    /*
    * Renders either the Registration Box or the Add User
    */
    render() {
        return (
            <div>{this.renderRedirect()}</div>
        );
    }
}