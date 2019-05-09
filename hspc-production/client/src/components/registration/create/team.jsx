import React, { Component } from 'react'
import StatusMessages from '../../../_common/components/status-messages/status-messages';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import ReCAPTCHA from 'react-recaptcha';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AddUser from './add-team-member';
import teamService from '../../../_common/services/team';
import UserService from '../../../_common/services/user';
import '../../../_common/assets/css/register-user.css';

/*
* @author: Daniel Bell
*/
export default class RegisterTeam extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {
            teamName: ' ',
            schoolName: ' ',
            schoolAddress: ' ',
            stateCode: ' ',
            questionLevel: 'Beginner',
            advisor: '',
            advisorEmail: this.props.advisor,
            isVerified: false,
            redirect: false
        }
    }

    /*
    * Retrieves the First and Last name of the advisor given the user's email address.
    */
    componentDidMount = () => {
        UserService.getAllUsers()
            .then((response) => {
                let data = JSON.parse(response.body);
                data.forEach((user) => {
                    if (user.Email === this.props.advisor) {
                        let name = (user.FirstName + " " + user.LastName);
                        this.setState({ advisor: name });
                    }
                });
            })
            .catch(() => {
                console.log("No users fonund");
            });
    }

    /*
    * Handles the registration of teams and adds the team information to the SQL database.
    */
    handleRegisterTeam = () => {
        if (this.state.isVerified) {
            if (this.state.teamName === '' || this.state.schoolName === '' || this.state.schoolAddress === '' || this.state.stateCode === '') {
                this.statusMessages.current.showError('Something went wrong. Please try again');
                return;
            }
            teamService.registerTeam(this.state.teamName, this.state.schoolName, this.state.schoolAddress, this.state.stateCode, this.state.questionLevel, this.state.advisor, this.state.advisorEmail)
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
    handleChange = (value) => {
        this.setState({ questionLevel: value });
    }

    /*
    * Indicates successful loading of the captcha for debugging purposes
    */
    recaptchaLoaded = () => {
        console.log('captcha successfully loaded.');
    }

    /*
    * Changes the verfied state to true following a verified captcha result.
    */
    verifyCallback = (response) => {
        if (response)
            this.setState({ isVerified: true })
        else
            this.setState({ isVerified: false })
    }

    /*
    * Auto-Redirect to the Add Users Page. By default, this renders the registration box. 
    */
    renderRedirect = () => {
        if (!this.state.redirect) {
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
                            <ToggleButtonGroup className="RoleSelect" type="radio" name="options" defaultValue={'Beginner'}>
                                <ToggleButton value={'Beginner'} onChange={this.handleChange.bind(this, 'Beginner')}>Beginner</ToggleButton>
                                <ToggleButton value={'Advanced'} onChange={this.handleChange.bind(this, 'Advanced')}>Advanced</ToggleButton>
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
                                labelColor={'#ffffff'}
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
    * Renders the component UI.
    */
    render() {
        return (
            <div>{this.renderRedirect()}</div>
        );
    }
}