import React, { Component } from 'react';
import NewsService from '../_common/services/news';
import StatusMessages from '../_common/components/status-messages/status-messages';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../_common/assets/css/create-news.css';

export default class CreateNews extends Component {
    constructor(props) {
        super(props)
        this.handlePublisUpdate = this.handlePublisUpdate.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubheadingChange = this.handleSubheadingChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.statusMessages = React.createRef();
        this.state = {
            title: '',
            subheading: '',
            message: '',
            date: ''
        }
    }

    /*
    * Publishes the information to the homescreen.
    */
    handlePublisUpdate() {
        console.log("Newsletter updated");
        NewsService.createNews(this.state.title, this.state.subheading, this.state.message, this.state.date)
            .then((response) => {
                if (response.statusCode === 201) 
                    this.statusMessages.current.showSuccess("Article Published Successfully!");
                else if(response.statusCode === 400)
                    this.statusMessages.current.showError("Title, Message, and Date are Required.");
                else
                    this.statusMessages.current.showError('Something went wrong. Please try again.');
            })
            .catch((error) => {
                this.statusMessages.current.showError('Something went wrong. Please try again.');
            });
    }

    /*
    * Updates the value of this.state.title
    */
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    /*
    * Updates the value of this.state.subheading
    */
    handleSubheadingChange(event) {
        this.setState({ subheading: event.target.value });
    }

    /*
    * Updates the value of this.state.message
    */
    handleMessageChange(event) {
        this.setState({ message: event.target.value });
    }


    /*
    * Renders the component UI
    */
    render() {
        return (
            <div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                <h2>Create News</h2>
                <p><b>Please fill out the information below.</b><br />The following information will be shared on the home screen</p>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <form>
                            <p>Newsletter Title</p>
                            <input
                                type="text"
                                className="contact-form"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            />
                            <p>Subheading</p>
                            <input
                                type="text"
                                className="contact-form"
                                value={this.state.subheading}
                                onChange={this.handleSubheadingChange}
                            />
                            <p>Message</p>
                            <textarea
                                type="text"
                                rows="10"
                                className="contact-form"
                                value={this.state.message}
                                onChange={this.handleMessageChange}
                            />
                        </form>
                        <TextField
                            className="date-picker"
                            floatingLabelText="Date"
                            label="Event Date"
                            type="date"
                            defaultValue="Enter a Date"
                            onChange={(event, newValue) => this.setState({ date: newValue })}
                        />
                        <br />
                        <RaisedButton
                            className="submit-button"
                            label="Publish"
                            labelColor={'white'}
                            backgroundColor={'#00a655'}
                            onClick={(event) => this.handlePublisUpdate(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}