import React, { Component } from 'react';
import io from 'socket.io-client';
import StatusMessages from '../../_common/components/status-messages/status-messages.jsx';
import ScoreboardTile from './scoreboard-tile';
import '../../_common/assets/css/scoreboard.css';

var socket = io('http://localhost:8000');

export default class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.eventLive = false;
        this.state = {
            data: []
        }
        socket.on('broadcast', (data) => {
            console.log("Recieved:", data);
            this.setState({ data: data });
        });
    }

    /*
    * Handles the inital socket connection when the scoreboard page loads.
    */
    componentDidMount = () => {
        socket.emit('scoreboard', {});
    }

    /*
    * Handles the socket connection when prop data changes.
    */
    componentWillReceiveProps = () => {
        socket.emit('scoreboard', {});
    }

    /*
    * Handles the socket connection when the user leaves the scoreboard.
    */
    componentWillUnmount = () => {
        socket.emit('exit scoreboard', {});
    }

    /*
    * Generates an array of scoreboard tiles based of this.state.data values.
    */
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
        if(tiles.length > 0) 
            this.eventLive = true;
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
                {(!this.eventLive) ? <h4 id="no-event">No Active Event</h4> : null}
            </div>
        );
    };
}