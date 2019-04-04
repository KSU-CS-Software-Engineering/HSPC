import React, { Component } from 'react'
import '../_common/assets/css/scoreboard.css';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import '../_common/assets/css/scoreboard.css';
import io from 'socket.io-client';

/*
* Renders the component UI.
*/
var currentView = null;
var socket = io('http://localhost:8000');

export default class Scoreboard extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    handleShowData = () => {
        socket.on('broadcast', function (data) {
            currentView = data;
            //this.setState({ data: data });
        });

    }

    /*
    * Renders the UI component.
    */
    render() {
        return (
            <div>
                <h2>Scoreboard Coming Soon</h2>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {this.handleShowData()}
                {currentView}

            </div>
        );
    };
}