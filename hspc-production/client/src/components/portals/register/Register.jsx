import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import ReCAPTCHA from 'react-recaptcha';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import AuthService from '../../../_common/services/auth';
import './Register.css';

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.statusMessages = React.createRef();
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      accessLevel: '1',
      teamName: ' ',
      isVerified: false
    }
  }

  /**************************************************************************************
   * Handles the registration of users and adds the user information to the SQL database.
   * @param {*} event button event that handles submission of user information.
   **************************************************************************************/
  handleRegister(event) {
    if (this.state.isVerified) {
      if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '') {
        this.statusMessages.current.showError('Something went wrong. Please try again');
        return;
      }

      AuthService.register(this.state.teamName, this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.accessLevel)
        .then((response) => {
          if (response.statusCode === 201)
            this.statusMessages.current.showSuccess("Registration Complete!");
          else
            this.statusMessages.current.showError('Something went wrong. Please try again');
        })
        .catch((error) => {
          this.statusMessages.current.showError('Something went wrong. Please try again.');
        });
    } else {
      this.statusMessages.current.showError("Please verify that you are a human.");
    }
  }

  /**************************************************************************************
   * Handles switching between the Registration and Login pages.
   **************************************************************************************/
  handleSwitch() {
    this.props.history.push('/login');
  }

  /**************************************************************************************
  * Handle the changing of access level.
  **************************************************************************************/
  handleChange = (value, event) => {
    this.setState({ accessLevel: value }, () => {
      console.log("Access level changed.");
      if (this.state.accessLevel !== '1') {
        this.statusMessages.current.showError("If account is anything other than 'Student' it will be subjected to further review.");
      }
    });
  }

  /**************************************************************************************
  * Indicates successful loading of the captcha for debugging purposes
  **************************************************************************************/
  recaptchaLoaded() {
    console.log('captcha successfully loaded.');
  }

  /**************************************************************************************
  * Changes the verfied state to true following a verified captcha result.
  **************************************************************************************/
  verifyCallback(response) {
    if (response) {
      this.setState({ isVerified: true })
    }
    else {
      this.setState({ isVerified: false })
    }
  }

  /**************************************************************************************
   *  Renders the component UI.
  **************************************************************************************/
  render() {
    return (
      <div className="RegisterBox">
        <StatusMessages ref={this.statusMessages}></StatusMessages>
        <h2>New User?</h2>
        <p><b>Please fill out the information below.</b></p>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <TextField
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              onChange={(event, newValue) => this.setState({ firstName: newValue })}
            />
            <br />
            <TextField
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              onChange={(event, newValue) => this.setState({ lastName: newValue })}
            />
            <br />
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <p><br />Please select an account type.</p>
            <ToggleButtonGroup className="RoleSelect" type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1} onChange={this.handleChange.bind(this, 1)}>Student</ToggleButton>
              <ToggleButton value={2} onChange={this.handleChange.bind(this, 2)}>Volunteer</ToggleButton>
              <ToggleButton value={3} onChange={this.handleChange.bind(this, 3)}>Judge</ToggleButton>
              <ToggleButton value={4} onChange={this.handleChange.bind(this, 4)}>Advisor</ToggleButton>
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
              label="Create Account"
              style={{ margin: 15 }}
              backgroundColor={'#00a655'}
              labelColor={white}
              onClick={(event) => this.handleRegister(event)}
            />
            <p><b>Already have an account?</b></p>
            <RaisedButton
              className="LoginButton"
              label="Sign In"
              style={{ margin: 15 }}
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