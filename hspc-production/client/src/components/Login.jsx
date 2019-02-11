import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { white } from 'material-ui/styles/colors';
import StatusMessages from '../_common/components/status-messages/status-messages';
import authService from '../_common/services/auth';
import './Login.css';
import './Home';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {
            loggedIn: false,
            loginRedirectPath: '',
            email: '',
            password: ''
        }
    }

    /*************************************************************************************
    * Checks for matching user credentials and redirects the user to the proper portal.
    * @param {*} event 
    *************************************************************************************/
    handleClick(event) {
        authService.login(this.state.email, this.state.password).then((response) => {
            if (response.statusCode === 200) {
                let loginRedirectPath;
                switch (authService.authenticatedUser.accesslevel) {
                    case '1':
                        loginRedirectPath = '/student/studentdash'
                        break;
                    case '2':
                        loginRedirectPath = '/volunteer/volunteerdash'
                        break;
                    case '3':
                        loginRedirectPath = '/judge/judgedash'
                        break;
                    case '4':
                        loginRedirectPath = '/advisor/advisordash'
                        break;
                    case '5':
                        loginRedirectPath = '/admin/admindash'
                        break;
                    case '6':
                        loginRedirectPath = '/master/masterdash'
                        break;
                    default:
                        this.statusMessages.current.showError('Something went wrong. Please try again');
                        return;
                }
                this.setState({
                    loggedIn: true,
                    loginRedirectPath: loginRedirectPath
                });
            } else this.statusMessages.current.showError(response.body.message);
        }).catch((resErr) => this.statusMessages.current.showError('Something went wrong. Please try again'));
    }

    /*************************************************************************************
    * Handles switching between the Registration and Login pages.
    *************************************************************************************/
    handleSwitch = () => {
        this.props.history.push('/Register');
    }

    /*************************************************************************************
    * Renders the component UI.
    *************************************************************************************/
    render() {
        return (
            <div className="LoginBox">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <MuiThemeProvider>
                    <div>
                        <h2>Returning User?</h2>
                        <p>Please enter your username and password below.</p>
                        <TextField
                            hintText="Enter your Email"
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
                        <RaisedButton
                            className="LoginButton"
                            label="Sign In"
                            style={{ margin: 15 }}
                            backgroundColor={'#350B4F'}
                            labelColor={white}
                            onClick={(event) => this.handleClick(event)}
                        />
                        <RaisedButton
                            className="RegisterButton"
                            label="Register an Account"
                            style={{ margin: 15 }}
                            backgroundColor={'#00a655'}
                            labelColor={white}
                            onClick={this.handleSwitch}
                        />
                        <br />
                    </div>
                </MuiThemeProvider>
                {(this.state.loggedIn) ? <Redirect to={this.state.loginRedirectPath} /> : null}
            </div>
        )
    }
}

