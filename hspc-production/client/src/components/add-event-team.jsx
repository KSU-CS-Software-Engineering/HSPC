import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import TeamService from '../_common/services/team';
import EventService from '../_common/services/event';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import participantService from '../_common/services/participant';

var currentView = null;
var selected = [];

const selectStyles = {
    menu: base => ({
        ...base,
        zIndex: 100
    })
};

export default class AddEventTeam extends Component {
    constructor(props) {
        super(props);
        this.statusMessages = React.createRef();
        this.state = {
            teamTable: [],
            userTable: [],
            eventList: []
        };
    }

    /*
    * Returns a list of all registered teams and events when the component is rendered.
    */
    componentDidMount = () => {
        TeamService.getAllTeams().then((response) => {
            console.log(JSON.parse(response.body));
            if (response.statusCode === 200) {
                this.setState({ teamTable: JSON.parse(response.body) }, () => {
                    this.generateTeamTable(); // helper function
                });
            }
            else console.log("An error has occurred, Please try again.");

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

                // populates the selected array with false values
                for (let i = 0; i < this.state.teamTable.length; i++) selected.push(false);

            }).catch(() => console.log('Something went wrong. Please try again'));
        }).catch(() => console.log('Something went wrong. Please try again'));
    }

    /*
    * Binds a registered team to a specific event date.
    */
    handleChange = (event) => {
        let index = event.target.getAttribute('data-index');

        if (selected[index] === false) {
            selected[index] = true
            console.log("team arrived");
        }
        else {
            selected[index] = false;
            console.log("team left");
        }
    }

    /*
    * Saves the information and updates the values in the database.
    */
    handleSaveChanges = () => {
        console.log(selected);
        let eventTeams = [];
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === true) {
                eventTeams.push(this.state.teamTable[i]);
            }
        }
        //console.log(eventTeams);
        //participantService.addParticipant();
    }

    /*
    * Helper function handleAddTeamToEvent. Generates the data as a table.
    */
    generateTeamTable() {
        const teams = [];
        console.log(this.state.teamTable);
        this.state.teamTable.forEach((team, index) => {
            teams.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{team.TeamName}</td>
                <td>{team.SchoolName}</td>
                <td>{team.SchoolAddress}</td>
                <td>{team.StateCode}</td>
                <td>{team.QuestionLevel}</td>
                <td>{team.AdvisorID}</td>
                <td key={index}>
                    <input type="checkbox" onClick={this.handleChange} data-index={index} />
                </td>
            </tr>);
        });
        currentView = <Table striped bordered condensed hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>School</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>Level</th>
                    <th>Advisor</th>
                    <th>Add Team</th>
                </tr>
            </thead>
            <tbody>
                {teams}
            </tbody>
        </Table>;
        this.forceUpdate();
    }

    /*
    * Renders the component UI.
    */
    render() {
        return (
            <div>
                <div id="sub-nav">
                    <h4 id="sub-nav-item">Event Date</h4>
                    <Select
                        id="dropdown"
                        styles={selectStyles}
                        placeholder="Select an Event Date"
                        options={this.state.eventList}
                        onChange={opt => this.setState({ teamName: opt.label })}
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