import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import StatusMessages from '../_common/components/status-messages/status-messages';
import './Register.css';

//const apiBaseUrl = "http://localhost:3001";

/**
 * Summary. Processes user information and allows the user to instantly create a basic user account or request higher access.
 */
export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {

        }
    }

    /**
     * Renders the Registration Page component. Allows the user to switch between Login and Registration. 
     */
    render() {
        return (
            <div className="RegisterBox">
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2>Add Users</h2>
                <p><b>Please fill out the information below.</b></p>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <RaisedButton
                            className="RegisterButton"
                            label="Create Account"
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