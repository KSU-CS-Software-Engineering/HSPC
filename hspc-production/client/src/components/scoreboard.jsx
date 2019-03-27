import React, { Component } from 'react'
import '../_common/assets/css/scoreboard.css';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import '../_common/assets/css/scoreboard.css';

/*
* Renders the component UI.
*/
const currentView = null;

export default class Scoreboard extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    /*
    * Renders the UI component.
    */
    render() {
        return (
            <div>
                <h2>Scoreboard Coming Soon</h2>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {currentView}
            </div>
        );
    };
}