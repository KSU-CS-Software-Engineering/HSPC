import React, { Component } from 'react';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import ScoreboardTile from './scoreboard-tile';
import '../_common/assets/css/scoreboard.css';
import io from 'socket.io-client';

/*
* Renders the component UI.
*/
var socket = io('http://localhost:8000');

export default class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        socket.on('broadcast', (data) => {
            console.log("Recieved:", data);
            this.setState({ data: data });
        });
    }

    /*
    * Retrieves data from the scoreboard controller socket and sets its values to this.state.data.
    * NOTE: Currently resets all to 0 if tab closes.
    */
    componentDidMount = () => {
        socket.emit('scoreboard', {});
    }

    componentWillReceiveProps = () => {
        socket.emit('scoreboard', {});
    }

    componentWillUnmount = () => {
        socket.emit('exit scoreboard', {});
    }

    generateBoard = () => {
        var tiles = [];
        this.state.data.forEach((team, index) => {
            tiles.push(
                <ScoreboardTile
                    key={index}
                    questionNum={team.questionNum}
                    teamID={team.teamID}
                    timesClicked={team.timesClicked}
                    pointsAdded={team.pointsAdded}
                />);
        });
        return tiles;
    }

    /*
    * Renders the UI component.
    */
    render() {
        return (
            <div>
                <h2>Scoreboard</h2>
                <StatusMessages ref={this.statusMessages}></StatusMessages>

                <div className="grid">
                    {this.generateBoard()}
                </div>
            </div>
        );
    };
}