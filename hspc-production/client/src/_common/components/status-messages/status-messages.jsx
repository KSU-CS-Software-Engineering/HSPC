import React from 'react';
import './status-messages.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorOccurred: false,
            successOccurred: false,
            errorMessage: '',
            successMessage: ''
        };
    }
    resetState = () => {
        this.setState({
            errorOccurred: false,
            successOccurred: false,
            errorMessage: '',
            successMessage: ''
        });
    }
    clearMessages = () => {
        this.setState({
            errorOccurred: false,
            successOccurred: false
        });
    }
    showError = (message) => {
        this.clearMessages();
        this.setState({
            errorMessage: message,
            errorOccurred: true
        });
    }
    showSuccess = (message) => {
        this.clearMessages();
        this.setState({
            successMessage: message,
            successOccurred: true
        });
    }
    render() {
        return (
            <div>
                {(this.state.errorOccurred || this.state.successOccurred) ?
                    <div className="status">
                        {this.state.errorOccurred ? <div className="error">{this.state.errorMessage}</div> : null}
                        {this.state.successOccurred ? <div className="success">{this.state.successMessage}</div> : null}
                    </div>
                    : null}
            </div>
        );
    }
}