import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import userService from '../../../_common/services/user';
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
            message: '',
            addresslist: []
        };
    }

    /*************************************************************************************
    * Loads the values of registered email addresses.
    *************************************************************************************/
    componentDidMount() {
        userService.getAllUsers().then((response) => {
            if (response.statusCode === 200) {
                let body = JSON.parse(response.body);

                let users = [];
                for (let i = 0; i < body.length; i++) {
                    users.push(
                        body[i].Email
                    );
                }
                this.setState({
                    addresslist: users
                });
                console.log(this.state.addresslist);
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /**************************************************************************************
    *  IN PROGRESS
    *  Calls the API and passes email information.
    **************************************************************************************/
    handleSubmit() {
        if (this.state.emailAll) {
            console.log("Sent All");

            
        }
        else {
            console.log("Sent Once");
            
        }
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
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <p>Subject</p>
                            <input
                                id="subject"
                                type="text"
                                className="form-control"
                                value={this.state.subject}
                                onChange={e => this.setState({ subject: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <p>Message</p>
                            <textarea
                                id="message"
                                className="form-control"
                                rows="5"
                                value={this.state.message}
                                onChange={e => this.setState({ massage: e.target.value })}>
                            </textarea>
                        </div>
                        <div id="email-all">
                            <p><span>Email All </span>
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