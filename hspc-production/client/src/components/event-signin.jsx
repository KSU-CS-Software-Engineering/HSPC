
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import ParticipantService from '../_common/services/participant';
import EventService from '../_common/services/event';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../_common/assets/css/event-signin.css';

var currentView = null;
var selected = [];
var teamData = [];
var eventDate = '';

const selectStyles = {
    menu: base => ({
        ...base,
        zIndex: 100
    })
};

export default class EventSignIn extends Component {
    constructor(props) {
        super(props)
        this.statusMessages = React.createRef();
        this.state = {
            eventList: []
        }
    }

    /*
    * Returns a list of all events when the component is rendered.
    */
    componentDidMount = () => {
        eventDate = '';
        EventService.getAllEvents().then((response) => {
            if (response.statusCode === 200) {
                let body = JSON.parse(response.body);
                let events = [];
                for (let i = 0; i < body.length; i++)
                    events.push({
                        label: body[i].EventDate,
                        value: body[i].EventDate
                    });
                this.setState({ eventList: events });
            }
            else console.log("An error has occurred, Please try again.");
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Returns a list of teams matching the selected event date.
    */
    showRegisteredTeams = (date) => {
        eventDate = date;
        selected = [];
        ParticipantService.getAllParticipants().then((response) => {
            if (response.statusCode === 200) {
                let body = JSON.parse(response.body);
                let participants = [];
                for (let i = 0; i < body.length; i++) {
                    if (body[i].EventDate === eventDate) {
                        participants.push(
                            body[i]
                        );
                    }
                }
                teamData = participants;
                // populates the selected array with false values
                for (let i = 0; i < teamData.length; i++) selected.push(false);
                this.generateSignInTable(teamData);
            }
        }).catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Helper function for showRegisteredTeams. Generates the data as a table.
    */
    generateSignInTable(data) {
        const teams = [];
        data.forEach((team, index) => {
            teams.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{team.TeamName}</td>
                <td>{team.SchoolName}</td>
                <td>{team.StateCode}</td>
                <td>{team.QuestionLevel}</td>
                <td>{team.AdvisorID}</td>
                <td key={index}>
                    <input type="checkbox" onClick={this.handleCheckboxClick} data-index={index} />
                </td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>School</th>
                    <th>State</th>
                    <th>Level</th>
                    <th>Advisor</th>
                    <th>Arrived</th>
                </tr>
            </thead>
            <tbody>
                {teams}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Marks that a team has arrived.
    */
    handleCheckboxClick = (event) => {
        let index = event.target.getAttribute('data-index');
        if (selected[index] === false) selected[index] = true;
        else selected[index] = false;
        event.key = event.key + 1;
    }

    /*
    * Saves the information and updates the values in the database.
    */
    handleSaveChanges = () => {
        let presentTeams = [];
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === true) {
                presentTeams.push(teamData[i]);
            }
        }
        console.log(presentTeams); // use data to populate a scoreboard.
    }

    /*
    * Render the component UI
    */
    render() {
        return (
            <div id="field">
                <div id="sub-nav">
                    <h4 id="sub-nav-item">Event Date</h4>
                    <Select
                        id="dropdown"
                        styles={selectStyles}
                        placeholder="Select an Event Date"
                        options={this.state.eventList}
                        onChange={(e) => (this.showRegisteredTeams(e.label))}
                    />
                </div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {currentView}
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <RaisedButton
                            className="register-button"
                            label="Save Changes"
                            backgroundColor={'#00a655'}
                            labelColor={'white'}
                            onClick={() => this.handleSaveChanges()}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}