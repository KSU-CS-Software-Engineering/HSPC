import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import StatusMessages from '../../../_common/components/status-messages/status-messages.jsx';
import './Email.css'

export default class Email extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.statusMessages = React.createRef();
        this.state = {
            emailAll: false,
            email: '',
            subject: '',
            message: ''
        };
    }

    /**************************************************************************************
    *  IN PROGRESS
    *  Calls the API and passes email information.
    **************************************************************************************/
    handleSubmit() {
        alert("Did the thing!");
    }

    /**************************************************************************************
    *  Updates the state of emaillAll
    **************************************************************************************/
    handleChange() {
        if (this.state.emailAll === true) {
            this.setState({ emailAll: false });
            console.log("email all: false")
        }
        else {
            this.setState({ emailAll: true });
            console.log("email all: true");
        }
    }

    /**************************************************************************************
    *  Renders the component UI.
    **************************************************************************************/
    render() {
        return (
            <div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2>Create Email</h2>
                <p><b>Please fill out the information below.</b></p>
                <br />
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Form id="contact-form" method="POST">
                        <div className="form-group">
                            <p>Email Address</p>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                                disabled={this.state.emailAll}
                                onChange={(event, newValue) => this.setState({ email: newValue })}
                            />
                        </div>
                        <div className="form-group">
                            <p>Subject</p>
                            <input
                                id="subject"
                                type="text"
                                className="form-control"
                                onChange={(event, newValue) => this.setState({ subject: newValue })}
                            />
                        </div>
                        <div className="form-group">
                            <p>Message</p>
                            <textarea
                                id="message"
                                className="form-control"
                                rows="5"
                                onChange={(event, newValue) => this.setState({ message: newValue })}>
                            </textarea>

                        </div>
                        <div id="email-all">
                            <p><span>Email All? </span>
                                <input
                                    type="checkbox"
                                    checked={this.state.emailAll}
                                    onChange={this.handleChange}
                                />
                            </p>
                        </div>
                        <RaisedButton
                            id="SubmitButton"
                            label="Send Email"
                            style={{ margin: 15 }}
                            backgroundColor={'#00a655'}
                            labelColor={white}
                            onClick={(event) => this.handleSubmit(event)}
                        />
                    </Form>
                </MuiThemeProvider>
            </div >
        )
    }
}