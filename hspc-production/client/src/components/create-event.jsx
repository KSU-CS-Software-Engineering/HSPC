import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import ReCAPTCHA from 'react-recaptcha';
import eventService from '../_common/services/event'
import '../_common/assets/css/create-event.css';

export default class CreateEvent extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.state = {
            eventLocation: '',
            eventDate: '',
            eventTime: '',
            description: '',
            isVerified: false
        }
    }

    /*
    * Creates a new event and adds the corresponding information to the database. 
    */
    handleRegister(event) {
        if (this.state.isVerified) {
            eventService.createEvent(this.state.eventLocation, this.state.eventDate, this.state.eventTime, this.state.description)
                .then((response) => {
                    if (response.statusCode === 201) {
                        this.statusMessages.current.showSuccess("Event Scheduled Successfully!");
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
                            onChange={(event, newValue) => this.setState({ eventLocation: newValue })}
                        />
                        <br />
                        <TextField
                            floatingLabelText="Date"
                            label="Event Date"
                            type="date"
                            defaultValue="Enter a Date"
                            onChange={(event, newValue) => this.setState({ eventDate: newValue })}
                        />
                        <br />
                        <TextField
                            floatingLabelText="Time"
                            label="Event Time"
                            type="time"
                            defaultValue="Enter a Time"
                            onChange={(event, newValue) => this.setState({ eventTime: newValue })}
                        />
                        <div className="text-field">
                            <textarea
                                placeholder="Descripton"
                                id="message"
                                className="form-control"
                                rows="5"
                                value={this.state.message}
                                onChange={e => this.setState({ description: e.target.value })}>
                            </textarea>
                        </div>
                        <div align="center">
                            <ReCAPTCHA
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
                            labelColor={'white'}
                            onClick={(event) => this.handleRegister(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div >
        );
    }
}