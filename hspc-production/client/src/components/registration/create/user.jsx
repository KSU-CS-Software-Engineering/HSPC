import React, { Component } from 'react'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ReCAPTCHA from 'react-recaptcha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AuthService from '../../../_common/services/auth';
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import '../../../_common/assets/css/register-user.css';

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
      phone: '',
      accessLevel: '1',
      requestLevel: '',
      teamName: '',
      isVerified: false
    }
  }

  /*
  * Handles the registration of users and adds the user information to the SQL database.
  */
  handleRegister(event) {
    if (this.state.isVerified) {
      if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '') {
        this.statusMessages.current.showError('Something went wrong. Please try again');
        return;
      }
      AuthService.register(this.state.teamName, this.state.firstName, this.state.lastName, this.state.email, this.state.phone, this.state.password, this.state.accessLevel, this.state.requestLevel)
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

  /*
  * Handle the changing of access level.
  */
  handleChange = (value, event) => {
    this.setState({ accessLevel: value }, () => {
      console.log("Access level changed.");
      if (this.state.accessLevel !== '1') {
        this.setState({ requestLevel: value, accessLevel: '1' }, () => {
          this.statusMessages.current.showError("Selections Other Than 'Student' Will be Subjected to Further Review.");
        });
      }
    });
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

  /*
  * Renders the component UI.
  */
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
            <TextField
              hintText="Enter your Phone #"
              floatingLabelText="Phone Number (Optional)"
              onChange={(event, newValue) => this.setState({ phone: newValue })}
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
                sitekey="6LdB8YoUAAAAAL5OtI4zXys_QDLidEuqpkwd3sKN"
                render="explicit"
                onloadCallback={this.recaptchaLoaded}
                verifyCallback={this.verifyCallback}
              />
            </div>
            <br />
              <RaisedButton
                id="submit-button"
                label="Create Account"
                backgroundColor={'#00a655'}
                labelColor={'white'}
                onClick={(event) => this.handleRegister(event)}
              />
            </div>
        </MuiThemeProvider>
      </div>
    );
  }
}