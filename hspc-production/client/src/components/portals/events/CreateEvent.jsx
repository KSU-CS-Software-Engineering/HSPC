import React, { Component } from 'react'
//import Axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import ReCAPTCHA from 'react-recaptcha';

/**
 * Summary. Processes user information and allows the user to instantly create a basic user account or request higher access.
 */
export default class CreateEvent extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            location: '',
            time: '',
            date: '',
            isVerified: false
        }
    }

    /**
   * Handles the registration of teams and adds the team information to the SQL database.
   * @param {*} event button event that handles submission of user information.
   */
    handleRegister(event) {
        console.log("Event Added");
        /*
        if (this.state.isVerified) {
            var apiBaseUrl = "http://localhost:3001";
            console.log("values", this.state.first_name, this.state.last_name, this.state.email, this.state.password);
            if (this.state.first_name === '' || this.state.last_name === ''
                || this.state.email === '' || this.state.password === '') {
                this.statusMessages.current.showError('Something went wrong. Please try again');
                return;
            }

            var payload = {
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "email": this.state.email,
                "password": this.state.password,
                "accesslevel": this.state.accesslevel
            }

            // Rest API call. Creates a new column in the users table in the database and adds cooresponding payload values.
            Axios.post(apiBaseUrl + '/auth/register', payload)
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
        } else {
            this.statusMessages.current.showError("Please verify that you are a human.");
        }*/
    }

    /*
    * Handles switching between the Registration and Login pages.
    */
    handleSwitch() {
        this.props.history.push('/login');
    }

    /*
    * Handle the changing of access level.
    */
    handleChange = (value, event) => {
        this.setState({ questionlevel: value });
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
        if (response) {
            this.setState({ isVerified: true })
        }
        else {
            this.setState({ isVerified: false })
        }
    }

    /**
     * Renders the Registration Page component. Allows the user to switch between Login and Registration. 
     */
    render() {
        return (
            <div className="RegisterBox">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2>Schedule Event</h2>
                <p><b>Please fill out the information below.</b></p>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <TextField
                            hintText="Enter a Location"
                            floatingLabelText="Location"
                            onChange={(event, newValue) => this.setState({ team_name: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter a Start Time"
                            floatingLabelText="Time"
                            onChange={(event, newValue) => this.setState({ school_name: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter a Date"
                            floatingLabelText="Date"
                            onChange={(event, newValue) => this.setState({ address: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your State"
                            floatingLabelText="State"
                            onChange={(event, newValue) => this.setState({ state: newValue })}
                        />

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
                            label="Register Event"
                            style={{ margin: 15 }}
                            backgroundColor={'#00a655'}
                            labelColor={white}
                            onClick={(event) => this.handleRegister(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}