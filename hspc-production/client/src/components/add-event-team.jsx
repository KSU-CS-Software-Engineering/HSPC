import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import StatusMessages from '../_common/components/status-messages/status-messages.jsx';
import TeamService from '../_common/services/team';
import EventService from '../_common/services/event';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import participantService from '../_common/services/participant';

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
        this.currentView = null;
        this.eventDate = '';
        this.selected = [];
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
        this.eventDate = '';
        TeamService.getAllTeams().then((response) => {
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
                for (let i = 0; i < this.state.teamTable.length; i++) this.selected.push(false);

            }).catch(() => console.log('Something went wrong. Please try again'));
        }).catch(() => console.log('Something went wrong. Please try again'));
    }

    /*
    * Binds a registered team to a specific event date.
    */
    handleCheckboxClick = (event) => {
        let index = event.target.getAttribute('data-index');
        if (this.selected[index] === false) this.selected[index] = true;
        else this.selected[index] = false;
        event.key = event.key + 1;
    }

    /*
    * Saves the information and updates the values in the database.
    */
    async handleSaveChanges() {
        let eventTeams = [];
        for (let i = 0; i < this.selected.length; i++)
            if (this.selected[i] === true) eventTeams.push(this.state.teamTable[i]);

        // data checks
        if (this.eventDate === '') return this.statusMessages.current.showError("Event Date Required");
        if (eventTeams.length < 1) return this.statusMessages.current.showError("No Teams Selected");

        for (let i = 0; i < eventTeams.length; i++) {
            await participantService.addParticipant(
                eventTeams[i].TeamName,
                eventTeams[i].SchoolName,
                eventTeams[i].StateCode,
                eventTeams[i].QuestionLevel,
                this.eventDate
            )
                .then((response) => {
                    if (response.statusCode === 201) return this.statusMessages.current.showSuccess("Teams Successfully Added To Event!");
                    else return this.statusMessages.current.showError('Something went wrong. Teams Selected May Already Be Added.');
                })
                .catch(() => {
                    this.statusMessages.current.showError('Something went wrong. Teams Selected May Already Be Added.');
                });
        }
    }

    /*
    * Helper function handleAddTeamToEvent. Generates the data as a table.
    */
    generateTeamTable() {
        const teams = [];
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
                    <input type="checkbox" onClick={this.handleCheckboxClick} data-index={index} />
                </td>
            </tr>);
        });
        this.currentView = <Table striped bordered condensed hover>
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
                <h2>Add Teams</h2>
                <p><b>Please fill out the information below.</b></p>
                <div id="sub-nav">
                    <p id="sub-nav-item"><b>Event Date</b></p>
                    <Select
                        id="dropdown"
                        styles={selectStyles}
                        placeholder="Select a Date"
                        options={this.state.eventList}
                        onChange={(e) => (this.eventDate = e.label)}
                    />
                </div>
                <StatusMessages ref={this.statusMessages}></StatusMessages>
                {this.currentView}
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